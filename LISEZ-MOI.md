# Ordonnances & Courriers — SMHEP

Application web installable (PWA) pour produire des ordonnances et des courriers
confraternels sur papier à en-tête SMHEP / HNIA Sainte-Anne, et les exporter en PDF.

## Contenu du dossier

| Fichier | Rôle |
|---|---|
| `index.html` | L'application entière : interface, référentiels, mise en page A4, logos et signature encodés dans le fichier. |
| `manifest.webmanifest` | Décrit l'application au système : nom, icônes, couleurs, mode autonome. |
| `sw.js` | Service worker : enregistre l'application sur l'appareil pour un fonctionnement hors connexion. |
| `icon-192.png`, `icon-512.png` | Icônes standard. |
| `icon-maskable.png` | Icône adaptée aux masques Android (ronde, carrée, goutte…). |
| `icon-180.png` | Icône pour l'écran d'accueil iOS. |

Les sept fichiers doivent rester **dans le même répertoire**. Ne pas les renommer :
`manifest.webmanifest` et `sw.js` sont appelés par leur nom.

## Pourquoi un hébergement est indispensable

Une application installable exige une origine sécurisée : `https://` ou `localhost`.
Ouvert depuis la mémoire du téléphone (`file://`), `index.html` reste parfaitement
fonctionnel, mais le navigateur refuse d'enregistrer le service worker et ne propose
donc **ni installation, ni icône autonome, ni dictée intégrée**.

Un hébergement est également ce qui permet les mises à jour : vous remplacez le fichier
en ligne, l'application installée se met à jour toute seule.

## Mise en ligne — GitHub Pages (gratuit, ~10 minutes)

1. Créez un compte sur `github.com`, puis un dépôt : **New repository**.
   Nom au choix (par exemple `ordonnances`), visibilité **Public**, puis **Create**.
2. Sur la page du dépôt : **Add file → Upload files**. Sélectionnez les sept fichiers
   ci-dessus **en une seule fois** (pas le dossier lui-même : les fichiers doivent se
   trouver à la racine). Validez par **Commit changes**.
3. Onglet **Settings → Pages**. Sous *Build and deployment*, choisissez
   *Deploy from a branch*, branche **main**, dossier **/ (root)**, puis **Save**.
4. Attendez une à deux minutes, rechargez la page : GitHub affiche l'adresse publique,
   de la forme `https://votre-compte.github.io/ordonnances/`.

Le dépôt étant public, n'y déposez jamais de donnée de patient. L'application ne
transmet rien : tout est calculé dans le navigateur, et rien n'est enregistré en dehors
de l'appareil.

## Installation sur le téléphone

1. Ouvrez l'adresse `https://…` dans **Chrome** sur Android.
2. Le bouton **Installer l'application** apparaît en bas du formulaire, section
   *Application*. À défaut : menu **⋮ → Installer l'application** ou
   **Ajouter à l'écran d'accueil**.
3. L'icône rejoint l'écran d'accueil et s'ouvre en plein écran, sans barre d'adresse.

Sur iPhone, Safari : **Partager → Sur l'écran d'accueil**. iOS n'expose pas de bouton
d'installation dans la page.

Après la première ouverture, l'application fonctionne **hors connexion**.

## Ordonnance sécurisée

La case *Ordonnance sécurisée* de la section « Prescription médicamenteuse » adapte la
rédaction aux règles françaises applicables aux stupéfiants et assimilés : titre dédié,
sexe et date de naissance du patient, taille et poids si nécessaire, numéro
d'ordonnancier, durée maximale, mention du chevauchement, et carré indiquant le nombre
de médicaments prescrits en toutes lettres. Le bouton **Écrire en toutes lettres**
convertit les lignes cochées — « OXYCODONE 5 mg : 1 comprimé toutes les 12 heures »
devient « OXYCODONE cinq milligrammes : un comprimé toutes les douze heures ».
Relisez systématiquement : la conversion est automatique.

**Ce que l'application ne peut pas faire.** Le support lui-même est réglementé : papier
filigrané blanc naturel sans azurant optique, mentions pré-imprimées en bleu,
numérotation de lot, carré en micro-lettres. Il provient d'un imprimeur agréé et ne peut
pas être produit par une imprimante. Deux usages sont donc possibles :

- **Sans ordonnancier** : le document imprimé sert de brouillon de rédaction ou de copie
  pour le dossier. Il n'a pas la valeur d'une ordonnance sécurisée.
- **Sur ordonnancier pré-imprimé** : cochez *Impression sur ordonnancier sécurisé
  pré-imprimé*. L'en-tête et le pied sont masqués et le texte descend du décalage indiqué
  (45 mm par défaut). **Faites un essai sur une feuille blanche superposée à votre
  ordonnancier avant le premier usage réel** et ajustez le décalage : je n'ai aucun moyen
  de connaître la géométrie exacte de votre carnet. Le nombre de médicaments est alors
  imprimé en clair, à reporter à la main dans le carré pré-imprimé.

## Signataire

Un seul signataire : le Médecin en Chef Jean MORIN, RPPS 10005236129, avec sa signature
numérisée. Les signatures précédentes ont été retirées du fichier, pas seulement de la
liste : elles ne sont plus distribuées avec l'application.

La colonne latérale du papier à en-tête SMHEP n'a pas été modifiée : elle reste
l'en-tête officiel du service et continue de lister le chef de service et ses adjoints.

## Sécurité : la signature est dans le fichier

`index.html` contient la signature numérisée et le RPPS. Tout hébergement web rend ce
fichier téléchargeable par quiconque dispose de l'adresse — y compris sur GitHub Pages
avec un dépôt privé : le site publié reste public, seul le code source est masqué.
Restreindre l'accès au site lui-même exige GitHub Enterprise Cloud, ou un hébergement
doté d'une couche d'authentification.

Options, de la plus sûre à la moins sûre :

1. **Hébergement à accès restreint** (authentification avant d'accéder à la page).
2. **Retirer la signature numérisée** : décocher *Utiliser la signature manuscrite
   scannée*, imprimer, signer à la main. Le bloc d'identification reste imprimé.
3. **Adresse publique non diffusée** : le moins protecteur — une adresse n'est pas un
   secret.

## Certificats et attestations

Dans l'onglet *Courriers*, le sélecteur **Type de document** propose le courrier
confraternel, le certificat médical et l'attestation médicale. Le document se compose
alors ainsi : titre centré, formule « Je soussigné(e), <nom>, <qualité>, RPPS <numéro>,
certifie / atteste … », constatations, mentions de fin, puis « Fait à <lieu>, le
<date> » et signature. L'accord au féminin est automatique selon le signataire.

Onze tournures sont pré-enregistrées : constatations, coups et blessures avec ITT, non
contre-indication au sport, contre-indication temporaire, dispense d'EPS, reprise,
aptitude à la plongée, transport aérien, présence en consultation, suivi médical, remise
de documents. Toutes restent modifiables.

Les formulations respectent la règle de fond : le médecin n'atteste que ce qu'il a
personnellement constaté, les faits rapportés par le patient étant introduits par
« qui déclare ». **L'arrêt de travail et le certificat de décès relèvent de formulaires
dédiés et ne sont pas produits par cette application.** La durée d'incapacité totale de
travail au sens pénal a des conséquences judiciaires directes : elle reste entièrement
votre appréciation.

## Imagerie

Chaque examen ajouté forme une carte autonome : l'examen, son **indication propre**,
ses **commentaires au radiologue** et son **délai propre**. Une ordonnance distincte est
produite par carte, automatiquement — prescrire une échographie et une IRM donne deux
ordonnances, chacune ne portant que son examen, son indication et ses commentaires.

Les commentaires s'impriment en italique sous l'indication. Dix formulations fréquentes
sont proposées en un geste : restitution du compte rendu, examen comparatif, allergie à
l'iode, insuffisance rénale, matériel implanté et compatibilité IRM, grossesse à
éliminer, clichés en charge ou dynamiques.

Le délai choisi sous la liste s'applique aux examens ajoutés ensuite ; il reste
modifiable carte par carte. La case *Regrouper tous les examens sur une seule
ordonnance* reste disponible pour le cas où plusieurs examens relèvent d'une même
question clinique : un seul document, indication et commentaires imprimés en retrait
sous chaque examen.

## Saisie des dates

Les dates se tapent au clavier au format **JJ/MM/AAAA** ; les barres obliques
s'insèrent toutes seules. Le bouton calendrier à droite du champ reste disponible et
alimente le même champ.

La date de naissance est facultative : laissée vide, elle n'apparaît sur aucun document.
Une date incomplète ou inexistante — 31/02 par exemple — est signalée sous le champ et
n'est pas imprimée non plus : mieux vaut aucune date qu'une date fausse sur une
ordonnance. L'âge n'est calculé que sur une date complète et valide.

## Export PDF

Bouton **PDF** → *Ouvrir l'impression*. Dans la fenêtre Android :

- Destination : **Enregistrer au format PDF**
- Format **A4**, marges **Aucune**
- Cocher **Graphiques d'arrière-plan** (sans quoi le filet bleu et le code-barres
  disparaissent)

Si la fenêtre d'impression ne s'ouvre pas depuis l'application autonome, utilisez le
bouton de secours *afficher dans le navigateur* proposé dans la même boîte de dialogue,
puis imprimez depuis Chrome.

## Dictée vocale

Deux voies, dans cet ordre de fiabilité :

1. **Le micro du clavier Gboard**, dans n'importe quel champ. Fonctionne hors connexion
   et ne dépend pas de l'application.
2. **Les boutons 🎙 intégrés**, qui gèrent la ponctuation dictée (« virgule », « point »,
   « deux points », « à la ligne », « nouveau paragraphe »). Sur Chrome, cette
   reconnaissance passe par un serveur distant : elle **ne fonctionne pas hors
   connexion** et demande l'autorisation du microphone.

## Publier une mise à jour

1. Modifiez `index.html`.
2. Dans `sw.js`, incrémentez la ligne `const VERSION = 'smhep-v1';` → `'smhep-v2'`.
   Sans ce changement, les appareils continueront de servir l'ancienne copie enregistrée.
3. Remplacez les deux fichiers sur GitHub.

À la prochaine ouverture avec du réseau, un bandeau jaune propose la mise à jour.

## Responsabilité

Les modèles de prescription sont des trames de rédaction, sans posologie pré-remplie.
Le contenu clinique, les doses et les indications relèvent entièrement du prescripteur
qui signe le document.
