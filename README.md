# 🌿 Green Data Pro — Documentation Technique & Architectural Developpeur

> **Plateforme Agricole de Gestion d'Exploitations, de Champs et de Suivi de Production**  
> *Documentation technique intégrale, exhaustive et ultra-détaillée pour la maintenance, le développement et l'évolution du projet.*

---

## 📋 Table des Matières

1. [Aperçu du Projet & Vision](#-aperçu-du-projet--vision)
2. [Architecture Globale & Stack Technique](#-architecture-globale--stack-technique)
3. [Structure Complète du Projet (Arborescence)](#-structure-complète-du-projet-arborescence)
4. [Schéma & Modélisation de la Base de Données (Prisma ORM)](#-schéma--modélisation-de-la-base-de-données-prisma-orm)
5. [Architecture d'Authentification & Sécurité (Clerk)](#-architecture-dauthentification--sécurité-clerk)
6. [Documentation des Server Actions (`action.ts`)](#-documentation-des-server-actions-actionts)
7. [Routes API & Gestion des Fichiers Média (`/api/upload`)](#-routes-api--gestion-des-fichiers-média-apiupload)
8. [Documentation Complète des Pages & Routes Application](#-documentation-complète-des-pages--routes-application)
9. [Bibliothèque de Composants UI Réutilisables](#-bibliothèque-de-composants-ui-réutilisables)
10. [Contrats de Types TypeScript (`type.ts`)](#-contrats-de-types-typescript-typets)
11. [Installation, Configuration & Déploiement](#-installation-configuration--déploiement)
12. [Guide de Maintenance & Évolutivité Futurs](#-guide-de-maintenance--évolutivité-futurs)

---

## 🚀 Aperçu du Projet & Vision

**Green Data Pro** est une application web Next.js 15 moderne dédiée à la gestion d'exploitations agricoles. Elle permet aux agriculteurs, ingénieurs agronomes, techniciens et investisseurs de :
- 📍 **Cartographier et répertorier leurs champs agricoles** avec localisation GPS interactive (Google Maps) et photos.
- 📊 **Créer et suivre des Comptes d'Exploitation** (productions végétales, animales ou de transformation).
- 📅 **Planifier et suivre les Opérations agricoles** (dates prévues vs réelles, suivi des coûts prévus et réels, calcul des écarts budgétaires).
- 📈 **Visualiser le calendrier d'opérations** via des diagrammes de Gantt interactifs.
- 💰 **Gérer les charges fixes et dépenses de l'exploitation**.

---

## 🏗️ Architecture Globale & Stack Technique

### Diagramme d'Architecture Système

```mermaid
graph TD
    Client[Navigateur Client / React 19] -->|Requêtes HTTP / Page Routing| NextServer[Serveur Next.js 15 App Router]
    
    subgraph Authentification & Sécurité
        Middleware[middleware.ts / Clerk Middleware] -->|Vérification Session| AuthProvider[Clerk Provider API]
    end
    
    NextServer --> Middleware
    
    subgraph Logique Métier & Serveur
        ServerActions[action.ts / Server Actions]
        APIUpload[app/api/upload/route.ts]
    end
    
    NextServer --> ServerActions
    NextServer --> APIUpload
    
    subgraph Stockage & Données
        PrismaClient[lib/prisma.ts / Prisma ORM]
        PostgreSQL[(Base de Données PostgreSQL)]
        LocalStorage[public/uploads/ - Photos Champs]
    end
    
    ServerActions --> PrismaClient
    PrismaClient --> PostgreSQL
    APIUpload --> LocalStorage
```

### Stack Technologique

| Composant | Technologie | Version | Rôle |
|---|---|---|---|
| **Framework Web** | Next.js (App Router) | 15.5.4 | Framework Fullstack React avec Server Components & Server Actions |
| **Bibliothèque UI** | React | 19.1.0 | Bibliothèque de composant d'interface utilisateur |
| **Langage** | TypeScript | 5.x | Typage statique rigoureux et sécurisé |
| **ORM & DB** | Prisma ORM & PostgreSQL | 6.16.3 | Gestion de base de données relationnelle & typage automatique |
| **Authentification** | Clerk (@clerk/nextjs) | 6.33.1 | Gestion complète des identités, sessions et profils utilisateurs |
| **Design & Styles** | TailwindCSS v4 + DaisyUI | 4.x / 5.1.26 | Composants UI élégants, thèmes (Nord/Light/Dark) et utilitaires CSS |
| **Animations** | Framer Motion | 12.23.22 | Micro-animations fluides, transitions de modals et cartes |
| **Cartographie** | Google Maps API | 2.20.7 | Sélection interactive des coordonnées GPS des champs |
| **Visualisation** | React Google Charts | 5.2.1 | Rendu du diagramme de Gantt pour la planification d'opérations |
| **Notifications** | React Toastify | 11.0.5 | Retours visuels utilisateur (Succès, Erreur, Information) |
| **Icônes** | Lucide React | 0.544.0 | Système d'icônes vectorielles modernes |

---

## 📂 Structure Complète du Projet (Arborescence)

```text
green-data-pro/
├── action.ts                      # Server Actions (CRUD Utilisateurs, Champs, Comptes, Opérations, Charges)
├── type.ts                        # Définitions des interfaces et types TypeScript globaux
├── middleware.ts                  # Middleware de protection de routes Clerk Auth
├── next.config.ts                 # Configuration Next.js (TurboPack, images, etc.)
├── package.json                   # Dépendances et scripts de build/dev
├── tsconfig.json                  # Configuration TypeScript
├── eslint.config.mjs              # Règle d'analyse statique ESLint
├── postcss.config.mjs             # Configuration PostCSS (Tailwind v4)
├── lib/
│   └── prisma.ts                  # Singleton du client Prisma ORM
├── prisma/
│   ├── schema.prisma              # Schéma de base de données PostgreSQL
│   └── migrations/                # Historique des migrations SQL
├── public/
│   ├── uploads/                   # Dossier d'enregistrement des photos de champs téléversées
│   ├── champs.jpeg                # Image par défaut de fallback pour les champs
│   └── favicon.ico                # Icône de l'application
└── app/
    ├── globals.css                # Styles globaux et variables de thèmes DaisyUI/Tailwind
    ├── layout.tsx                 # Root Layout (ClerkProvider, thèmes, polices Geist)
    ├── page.tsx                   # Page d'accueil / Dashboard
    ├── api/
    │   └── upload/
    │       └── route.ts           # Route API (POST / DELETE) pour l'upload d'images
    ├── champs/
    │   └── page.tsx               # Page de création et gestion des champs agricoles (Form + Map + List)
    ├── totalChamps/
    │   └── page.tsx               # Galerie globale sous forme de cartes de tous les champs
    ├── compteExploitation/
    │   └── page.tsx               # Vue d'ensemble des comptes d'exploitation avec Modals (Detail, Edit)
    ├── creationCompteExploitaton/
    │   └── page.tsx               # Formulaire guidé de création d'un compte d'exploitation
    ├── operations/
    │   └── page.tsx               # Suivi opérationnel par compte d'exploitation (Coûts, Statuts)
    ├── chargesFixes/
    │   └── page.tsx               # Module de gestion des dépenses et charges fixes
    ├── gantt/
    │   └── page.tsx               # Diagramme de Gantt interactif pour le calendrier agricole
    ├── sign-in/
    │   └── [[...sign-in]]/
    │       └── page.tsx           # Page d'authentification Connexion Clerk
    ├── sign-up/
    │   └── [[...sign-up]]/
    │       └── page.tsx           # Page d'inscription Clerk
    └── components/                # Composants UI Réutilisables
        ├── Wrapper.tsx            # Wrapper de mise en page avec ToastContainer & NavBar
        ├── NavBar.tsx             # Barre de navigation responsive avec menu mobile & sync Clerk
        ├── Google_Maps.tsx        # Composant carte Google Maps avec sélecteur de marqueur
        ├── Selection_champ.tsx    # Composant dropdown de sélection dynamique de champs
        ├── ProductImage.tsx       # Composant avatar image avec masque squircle
        ├── ConfirmDialog.tsx      # Modal de confirmation pour les actions destructives
        ├── Message_Dialog.tsx     # Modal de dialogue et d'information utilisateur
        ├── detailModal.tsx        # Modal d'affichage détaillé d'un compte d'exploitation
        ├── updateModal.tsx        # Modal d'édition des comptes d'exploitation (EditModal)
        ├── EditCompteModal.tsx    # Variante alternative de modal de modification
        └── EmptyState.tsx         # Composant d'état vide avec icône animée
```

---

## 🗄️ Schéma & Modélisation de la Base de Données (Prisma ORM)

Le fichier [`prisma/schema.prisma`](file:///d:/Travaux_Moise/optimisation/green-data-pro/prisma/schema.prisma) définit le modèle de données PostgreSQL.

### Diagramme Entité-Association (ERD)

```mermaid
erDiagram
    Role {
        ADMIN ADMIN
        INGENIEUR INGENIEUR
        TECHNICIEN TECHNICIEN
        INVESTISSEUR INVESTISSEUR
    }

    Profile ||--o{ Champ : "possède"
    Profile ||--o{ CompteExploitation : "gère"
    Profile ||--o{ Operation : "exécute"
    Profile ||--o{ ChargesFixes : "enregistre"

    Champ ||--o{ CompteExploitation : "rattaché à"
    CompteExploitation ||--o{ Operation : "contient"

    Profile {
        String id PK
        String clerkId UK
        String email UK
        String nom
        String prenom
        Role role
        DateTime createdAt
        DateTime updatedAt
    }

    Champ {
        String id PK
        String village
        String superficie
        String nom
        String coordonnees
        String imageUrl
        String clerkRef FK
        DateTime createdAt
        DateTime updatedAt
    }

    CompteExploitation {
        String id PK
        String champId FK
        String numeroProduit
        String superficie
        String typeProduction
        String nomChamp
        String clerkRef FK
        DateTime dateDebut
        DateTime dateFin
        String nomProduit
        DateTime createdAt
        DateTime updatedAt
    }

    Operation {
        String id PK
        String compteExploitationId FK
        String nom
        String description
        DateTime dateDebutPrevu
        DateTime dateFinPrevu
        DateTime dateDebutReel
        DateTime dateFinReel
        String commentaire
        Float coutPrevu
        Float coutReel
        Float ecart
        Boolean statut
        String clerkRef FK
        DateTime createdAt
        DateTime updatedAt
    }

    ChargesFixes {
        String id PK
        String clerkRef FK
        String nom
        String description
        Float montant
        DateTime createdAt
        DateTime updatedAt
    }
```

### Description Détaillée des Tables

1. **`Profile`** :
   - Stocke les informations des utilisateurs synchronisés depuis Clerk.
   - Champ clé `clerkId` unique servant de référence étrangère (`clerkRef`) dans toutes les autres tables.
   - Rôles disponibles via Enum : `ADMIN`, `INGENIEUR`, `TECHNICIEN`, `INVESTISSEUR`.

2. **`Champ`** :
   - Représente une parcelle agricole.
   - Contient le nom du champ, le village, la superficie (en hectares), les coordonnées GPS (`lat,lng`), et l'URL de la photo de couverture.
   - Relation `SetNull` lors de la suppression du profil utilisateur.

3. **`CompteExploitation`** :
   - Représente un cycle de production agricole sur un champ donné.
   - Champs majeurs : `numeroProduit`, `typeProduction` (ex: végétale, animale, transformation), `dateDebut`, `dateFin`, `nomProduit`.
   - Lié directement à un `Champ` et possède une cascade `SetNull`.

4. **`Operation`** :
   - Tâche ou étape culturale associée à un compte d'exploitation.
   - Suivi prévisionnel vs réel : `dateDebutPrevu`, `dateFinPrevu`, `dateDebutReel`, `dateFinReel`, `coutPrevu`, `coutReel`, `ecart`.
   - `statut` (Boolean) : `false` = En cours, `true` = Terminé.
   - Suppression en cascade (`onDelete: Cascade`) si le `CompteExploitation` est supprimé.

5. **`ChargesFixes`** :
   - Dépenses de structure ou charges récurrentes de l'exploitation (bâtiments, matériel, assurances).

---

## 🔒 Architecture d'Authentification & Sécurité (Clerk)

L'authentification est gérée par **Clerk Next.js** (`@clerk/nextjs`).

1. **Protection par Middleware** ([`middleware.ts`](file:///d:/Travaux_Moise/optimisation/green-data-pro/middleware.ts)) :
   - Seules les routes `/sign-in(.*)` et `/sign-up(.*)` sont publiques.
   - Toutes les autres routes de l'application (dashboard, champs, comptes, opérations, etc.) nécessitent une session authentifiée active via `auth.protect()`.

2. **Synchronisation Automatique du Profil Utilisateur** :
   - Lors de chaque chargement de la barre de navigation ([`NavBar.tsx`](file:///d:/Travaux_Moise/optimisation/green-data-pro/app/components/NavBar.tsx)), le hook `useUser()` récupère la session Clerk et invoque la Server Action `checkUser()`.
   - Si l'utilisateur n'existe pas encore dans la table PostgreSQL `Profile`, un enregistrement est automatiquement créé avec le rôle par défaut `ADMIN`.

---

## 🛠️ Documentation des Server Actions (`action.ts`)

Le fichier [`action.ts`](file:///d:/Travaux_Moise/optimisation/green-data-pro/action.ts) regroupe l'ensemble de la logique métier exécutée sur le serveur.

### 👤 1. Gestion des Utilisateurs

#### `checkUser(email: string, nom: string, prenom: string, clerkId: string)`
- **Rôle** : Vérifie l'existence de l'utilisateur dans PostgreSQL et crée son profil s'il est nouveau.
- **Paramètres** : `email`, `nom`, `prenom`, `clerkId`.
- **Rétroaction** : Crée une entrée dans `Profile` avec rôle `ADMIN`.

#### `getUser(clerkId: string)`
- **Rôle** : Recherche un utilisateur par son identifiant Clerk.
- **Retour** : Objet `Profile` ou `undefined`.

---

### 🌾 2. Gestion des Champs Agricoles

#### `createChamps(userId: string, formData: ChampFormData)`
- **Rôle** : Enregistre un nouveau champ rattaché à l'utilisateur.
- **Validation** : Vérifie la présence du nom, village et superficie. Assigne l'image par défaut `./champs.jpeg` si aucune n'est fournie.

#### `getChampsByUser(userId: string): Promise<ChampFormData[] | undefined>`
- **Rôle** : Récupère la liste de tous les champs appartenant à un utilisateur, triés par date de création décroissante.

#### `updateChamp(formData: ChampFormData)`
- **Rôle** : Met à jour les informations d'un champ (nom, village, superficie, coordonnées GPS).

#### `deleteChamp(champId: string)`
- **Rôle** : Supprime définitivement un champ par son ID.

---

### 📋 3. Gestion des Comptes d'Exploitation

#### `createCompteExploitation(userId: string, champId: string, formData: CompteExploitationFrom)`
- **Rôle** : Crée un compte d'exploitation rattaché à un champ et à un profil.
- **Convertit** : Les chaînes de dates `dateDebut` et `dateFin` en objets `Date` Prisma.

#### `updateCompExploitation(id: string, editForm: EditForm)`
- **Rôle** : Met à jour un compte d'exploitation existant avec les nouvelles dates et informations de production.

#### `deleteCompteExploitation(id: string)`
- **Rôle** : Supprime un compte d'exploitation.

#### `getCompteExploitationById(userId: string)`
- **Rôle** : Récupère la totalité des comptes d'exploitation de l'utilisateur en incluant les relations associées (`champ`, `profile`, `operations`).

---

### ⚙️ 4. Gestion des Opérations Agricoles

#### `createOperation(userId: string, compteId: string, formData: OperationForm)`
- **Rôle** : Enregistre une opération (semis, fertilisation, récolte, etc.) liée à un compte d'exploitation.

#### `updateOperation(operationId: string, userId: string, formData: OperationForm)`
- **Rôle** : Met à jour une opération (coûts réels, dates réelles, statut d'achèvement).

#### `getOperationsByCompte(userId: string, compteExploitationId: string)`
- **Rôle** : Récupère les opérations spécifiques à un compte d'exploitation donné.

#### `deleteOperation(operationId: string, userId: string)`
- **Rôle** : Supprime une opération spécifique.

---

### 💰 5. Gestion des Charges Fixes

#### `creationCharge(userId: string, formData: ChargesFixesForm)`
- **Rôle** : Enregistre une charge fixe avec nom, description et montant positif.

#### `getChargesFixes(userId: string)`
- **Rôle** : Liste les charges fixes créées par l'utilisateur.

#### `updateChargeFixe(id: string, formData: ChargesFixesForm)`
- **Rôle** : Modifie une charge fixe enregistrée.

#### `deleteChargeFixe(id: string)`
- **Rôle** : Supprime une charge fixe.

---

## 📡 Routes API & Gestion des Fichiers Média (`/api/upload`)

Le fichier [`app/api/upload/route.ts`](file:///d:/Travaux_Moise/optimisation/green-data-pro/app/api/upload/route.ts) gère le stockage local des images téléversées.

### Endpoints API

#### `POST /api/upload`
- **Description** : Reçoit un fichier image via `FormData`.
- **Traitement** :
  1. Extrait le fichier image et le convertit en buffer.
  2. Crée le dossier `public/uploads/` sur le disque s'il n'existe pas.
  3. Génère un nom de fichier unique sécurisé avec `crypto.randomUUID()`.
  4. Écrit le fichier sur le disque dans `public/uploads/<uuid>.<ext>`.
- **Réponse HTTP 200** : `{ "success": true, "path": "/uploads/<uuid>.<ext>" }`.

#### `DELETE /api/upload`
- **Description** : Supprime un fichier image du disque local lors de la suppression ou modification d'un champ.
- **Payload JSON** : `{ "path": "/uploads/<filename>" }`.
- **Réponse HTTP 200** : `{ "success": true, "message": "Image supprimee avec succes" }`.

---

## 🖥️ Documentation Complète des Pages & Routes Application

### 1. Dashboard principal (`/`)
- **Fichier** : [`app/page.tsx`](file:///d:/Travaux_Moise/optimisation/green-data-pro/app/page.tsx)
- **Rôle** : Page d'accueil de l'application encapsulée dans le composant `Wrapper`.

### 2. Gestion des Champs (`/champs`)
- **Fichier** : [`app/champs/page.tsx`](file:///d:/Travaux_Moise/optimisation/green-data-pro/app/champs/page.tsx)
- **Fonctionnalités** :
  - Formulaire de création / édition de champ avec prévisualisation en temps réel de la photo et des données.
  - Bouton d'ouverture de la carte Google Maps interactive pour fixer la géolocalisation.
  - Upload d'image de terrain vers `/api/upload`.
  - Liste dynamique des champs enregistrés avec possibilité d'édition rapide et de suppression.

### 3. Galerie globale des Champs (`/totalChamps`)
- **Fichier** : [`app/totalChamps/page.tsx`](file:///d:/Travaux_Moise/optimisation/green-data-pro/app/totalChamps/page.tsx)
- **Fonctionnalités** :
  - Affichage sous forme de grille de cartes élégantes avec effet de survol (zoom).
  - Badge indiquant le village et overlay dégradé sur la photo de couverture.
  - Dialogue de confirmation avant suppression irréversible.

### 4. Comptes d'Exploitation (`/compteExploitation`)
- **Fichier** : [`app/compteExploitation/page.tsx`](file:///d:/Travaux_Moise/optimisation/green-data-pro/app/compteExploitation/page.tsx)
- **Fonctionnalités** :
  - Cartes Glassmorphism avec distinction des types de production (Végétale, Animale, Transformation).
  - Ouverture de la Modal de détails (`DetailModal`) affichant l'intégralité des données croisées (Profil, Champ, Opérations).
  - Modal d'édition interactive (`EditModal`).
  - Redirection vers le module des opérations filtrées par `compteId`.

### 5. Assistant de Création de Compte d'Exploitation (`/creationCompteExploitaton`)
- **Fichier** : [`app/creationCompteExploitaton/page.tsx`](file:///d:/Travaux_Moise/optimisation/green-data-pro/app/creationCompteExploitaton/page.tsx)
- **Fonctionnalités** :
  - Sélecteur dynamique de champ basé sur les parcelles de l'utilisateur.
  - Choix du type de production, des dates de début et de fin.
  - Bouton de validation avec état de chargement.

### 6. Suivi des Opérations (`/operations`)
- **Fichier** : [`app/operations/page.tsx`](file:///d:/Travaux_Moise/optimisation/green-data-pro/app/operations/page.tsx)
- **Fonctionnalités** :
  - Récupération de l'identifiant du compte via l'URL (`?compteId=...`).
  - Formulaire de création d'opération avec dates prévues, coût estimé (FCFA) et description.
  - Liste des opérations avec badges d'état (`En cours` / `Terminé`).
  - État vide (`EmptyState`) si aucune opération n'est associée.

### 7. Charges Fixes (`/chargesFixes`)
- **Fichier** : [`app/chargesFixes/page.tsx`](file:///d:/Travaux_Moise/optimisation/green-data-pro/app/chargesFixes/page.tsx)
- **Fonctionnalités** : Module de suivi budgétaire des dépenses fixes de l'exploitation.

### 8. Diagramme de Gantt (`/gantt`)
- **Fichier** : [`app/gantt/page.tsx`](file:///d:/Travaux_Moise/optimisation/green-data-pro/app/gantt/page.tsx)
- **Fonctionnalités** : Rendu visuel chronologique des activités et dépendances des tâches à l'aide de `react-google-charts`.

---

## 🧩 Bibliothèque de Composants UI Réutilisables

1. **`Wrapper`** ([`app/components/Wrapper.tsx`](file:///d:/Travaux_Moise/optimisation/green-data-pro/app/components/Wrapper.tsx)) :
   - Englobe toutes les pages, fournit le container de notifications `ToastContainer` et la barre de navigation `NavBar`.

2. **`NavBar`** ([`app/components/NavBar.tsx`](file:///d:/Travaux_Moise/optimisation/green-data-pro/app/components/NavBar.tsx)) :
   - Barre de navigation réactive. Bascule entre affichage desktop et tiroir mobile slide-in. Inclut le bouton profil Clerk `UserButton`.

3. **`SelectionnerChamp`** ([`app/components/Selection_champ.tsx`](file:///d:/Travaux_Moise/optimisation/green-data-pro/app/components/Selection_champ.tsx)) :
   - Menu déroulant réutilisable chargeant dynamiquement les champs enregistrés de l'utilisateur connecté.

4. **`CarteGoogle`** ([`app/components/Google_Maps.tsx`](file:///d:/Travaux_Moise/optimisation/green-data-pro/app/components/Google_Maps.tsx)) :
   - Utilise `@react-google-maps/api` pour afficher une carte et placer un marqueur de coordonnées.

5. **`ProductImage`** ([`app/components/ProductImage.tsx`](file:///d:/Travaux_Moise/optimisation/green-data-pro/app/components/ProductImage.tsx)) :
   - Composant d'image avec masque squircle et optimisation `next/image`.

6. **`ConfirmDialog`** ([`app/components/ConfirmDialog.tsx`](file:///d:/Travaux_Moise/optimisation/green-data-pro/app/components/ConfirmDialog.tsx)) :
   - Fenêtre modale générique de confirmation pour la suppression de données.

7. **`MessageDialog`** ([`app/components/Message_Dialog.tsx`](file:///d:/Travaux_Moise/optimisation/green-data-pro/app/components/Message_Dialog.tsx)) :
   - Modal de message d'avertissement ou d'information.

8. **`DetailModal`** ([`app/components/detailModal.tsx`](file:///d:/Travaux_Moise/optimisation/green-data-pro/app/components/detailModal.tsx)) :
   - Modal animé (Framer Motion) affichant l'intégralité des informations d'un compte d'exploitation (Responsable, Dates, Superficie, Photo du champ, Liste des opérations).

9. **`EditModal`** ([`app/components/updateModal.tsx`](file:///d:/Travaux_Moise/optimisation/green-data-pro/app/components/updateModal.tsx)) :
   - Modal de modification pré-remplie pour la mise à jour d'un compte d'exploitation.

10. **`EmptyState`** ([`app/components/EmptyState.tsx`](file:///d:/Travaux_Moise/optimisation/green-data-pro/app/components/EmptyState.tsx)) :
    - Affichage visuel avec icône animée Lucide lorsqu'aucune donnée n'est disponible.

---

## 📝 Contrats de Types TypeScript (`type.ts`)

Le fichier [`type.ts`](file:///d:/Travaux_Moise/optimisation/green-data-pro/type.ts) définit la structure rigoureuse des données transmises entre le client et le serveur.

```typescript
export type ChampFormData = {
  id?: string;
  nom?: string;
  village?: string;
  superficie?: string;
  coordonnees?: string;
  imageUrl?: string;
};

export type CompteExploitationFrom = {
  id?: string;
  numeroProduit?: string;
  nomProduit?: string;
  nomChamp?: string;
  superficie?: string;
  typeProduction?: string;
  dateDebut?: string;
  dateFin?: string;
  dateCreation?: Date;
};

export type CompteExploitationFull = CompteExploitationFrom & {
  champ: {
    id: string;
    nom: string;
    village: string;
    superficie: string;
    coordonnees: string | null;
    imageUrl?: string;
  };
  profile: {
    id: string;
    nom: string;
    prenom: string;
    email: string;
    role: string;
  } | null;
  operations: {
    id: string;
    type: string;
    date: string;
  }[];
};

export type EditForm = {
  nomProduit?: string;
  numeroProduit?: string;
  superficie?: string;
  champId?: string;
  champName?: string;
  dateDebut?: string;
  dateFin?: string;
  typeProduction?: string;
};

export type OperationForm = {
  id?: string;
  compteExploitationId: string;
  nomOperation?: string;
  description?: string;
  dateDebutPrevu?: string;
  dateFinPrevu?: string;
  dateDebutReel?: string;
  dateFinReel?: string;
  commentaire?: string;
  coutPrevu?: number;
  coutReel?: number;
  ecart?: number;
  statut?: boolean;
};

export type ChargesFixesForm = {
  id?: string;
  nom: string;
  description?: string;
  montant: number;
};
```

---

## ⚙️ Installation, Configuration & Déploiement

### 1. Prérequis
- **Node.js** v18.x ou v20.x
- **PostgreSQL** (base de données locale ou distante via Supabase, Neon, Railway)
- Un compte **Clerk** (pour les clés d'API d'authentification)

### 2. Configuration des Variables d'Environnement (`.env`)

Créez un fichier `.env` à la racine du projet :

```env
# Base de Données PostgreSQL
DATABASE_URL="postgresql://utilisateur:motdepasse@localhost:5432/greendatapro?schema=public"

# Keys Authentification Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# URLs de redirection Clerk
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

### 3. Installation et Initialisation de la Base de Données

```bash
# Installation des dépendances
npm install

# Génération du client Prisma
npx prisma generate

# Exécution des migrations PostgreSQL
npx prisma migrate dev --name init
```

### 4. Lancement en Mode Développement

```bash
npm run dev
```
L'application sera accessible sur [http://localhost:3000](http://localhost:3000).

### 5. Build et Déploiement en Production

```bash
# Compiler le bundle de production
npm run build

# Démarrer le serveur de production
npm run start
```

---

## 🛡️ Guide de Maintenance & Évolutivité Futurs

### Recommandations pour l'Évolution de l'Application

1. **Migration des Uploads vers un Cloud Storage (S3 / Cloudinary)** :
   - *État actuel* : Les images sont enregistrées localement dans `public/uploads/`.
   - *Amélioration* : Remplacer l'écriture locale dans [`app/api/upload/route.ts`](file:///d:/Travaux_Moise/optimisation/green-data-pro/app/api/upload/route.ts) par un envoi vers Amazon S3 ou Cloudinary pour garantir le passage à l'échelle sur des architectures Serverless (Vercel/AWS).

2. **Dynamisation du Diagramme de Gantt** :
   - *État actuel* : Le composant Gantt ([`app/gantt/page.tsx`](file:///d:/Travaux_Moise/optimisation/green-data-pro/app/gantt/page.tsx)) contient des données de démonstration statiques.
   - *Amélioration* : Invoquer `getOperations()` depuis `action.ts` et formater dynamiquement le tableau `data` transmis à `Chart`.

3. **Calcul d'Écart Automatisé dans les Opérations** :
   - Mettre à jour `updateOperation` pour calculer automatiquement `ecart = coutReel - coutPrevu` lors du changement de statut vers `Terminé`.

---

*Documentation rédigée pour l'équipe technique de Green Data Pro.*
