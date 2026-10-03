/* Service worker — Ordonnances & Courriers SMHEP
   Stratégie : réseau d'abord pour le document (afin de récupérer les mises à
   jour), cache d'abord pour les ressources fixes. Tout est pré-enregistré à
   l'installation, l'application fonctionne donc entièrement hors connexion.

   Après chaque modification d'index.html, incrémenter VERSION ci-dessous :
   c'est ce qui déclenche la proposition de mise à jour sur les appareils. */

const VERSION = 'smhep-v7';

const FICHIERS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable.png',
  './icon-180.png'
];

self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(VERSION).then(function(c){
      return Promise.all(FICHIERS.map(function(f){
        return c.add(new Request(f, {cache: 'reload'})).catch(function(){});
      }));
    })
  );
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys()
      .then(function(cles){
        return Promise.all(cles.filter(function(k){ return k !== VERSION; })
                              .map(function(k){ return caches.delete(k); }));
      })
      .then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener('message', function(e){
  if(e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', function(e){
  const req = e.request;
  if(req.method !== 'GET') return;

  const url = new URL(req.url);
  if(url.origin !== self.location.origin) return;

  /* Navigation : réseau d'abord, repli sur la copie enregistrée. */
  if(req.mode === 'navigate'){
    e.respondWith(
      fetch(req)
        .then(function(rep){
          const copie = rep.clone();
          caches.open(VERSION).then(function(c){ c.put('./index.html', copie); });
          return rep;
        })
        .catch(function(){
          return caches.match('./index.html').then(function(r){
            return r || caches.match('./');
          });
        })
    );
    return;
  }

  /* Ressources : cache d'abord. */
  e.respondWith(
    caches.match(req).then(function(r){
      if(r) return r;
      return fetch(req).then(function(rep){
        if(rep && rep.status === 200 && rep.type === 'basic'){
          const copie = rep.clone();
          caches.open(VERSION).then(function(c){ c.put(req, copie); });
        }
        return rep;
      });
    })
  );
});
