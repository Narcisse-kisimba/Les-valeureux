# COMPLEXE SCOLAIRE LES VALEUREUX — Système de gestion scolaire

Application web complète (Next.js + Supabase) pour la gestion du Complexe Scolaire
Les Valeureux (Camp Massard, Manika-Kolwezi, Lualaba, RDC).

**Modules inclus dans cette première version, entièrement fonctionnels (vraie base de
données, aucun bouton factice) :**
- Site vitrine (page d'accueil avec identité de l'école)
- Connexion sécurisée par rôles (Supabase Auth)
- Tableau de bord avec statistiques réelles (élèves, présences, paiements, plaintes)
- Gestion des élèves (ajout + liste, numéro d'élève auto-généré)
- Gestion des paiements (ajout + reçu auto-généré)
- Gestion des plaintes
- Journal d'activité (audit_logs)
- Sécurité par ligne (Row Level Security) selon le rôle

**Le schéma de base de données (`supabase/migrations/0001_init.sql`) contient déjà
TOUTES les tables demandées** (enseignants, personnel, classes, présences, documents,
notifications, corbeille, paramètres, etc.) — prêtes à être connectées à de nouveaux
modules au fur et à mesure, en suivant exactement le même modèle que les modules
Élèves / Paiements / Plaintes ci-dessus.

---

## 1. Créer le dépôt GitHub

1. Va sur https://github.com → **New repository** → nomme-le `les-valeureux`.
2. Sur ton ordinateur : décompresse ce projet, puis :
   ```bash
   cd les-valeureux
   git init
   git add .
   git commit -m "Version initiale"
   git branch -M main
   git remote add origin https://github.com/TON-COMPTE/les-valeureux.git
   git push -u origin main
   ```

## 2. Créer le projet Supabase (gratuit)

1. Va sur https://supabase.com → **New project**.
2. Choisis un nom (`les-valeureux`), un mot de passe de base de données, une région
   proche (Europe).
3. Le plan **Free** suffit largement pour démarrer (500 Mo de base de données, 1 Go de
   stockage de fichiers, 50 000 utilisateurs actifs/mois).

## 3. Créer la base de données

1. Dans Supabase → onglet **SQL Editor**.
2. Colle et exécute le contenu de `supabase/migrations/0001_init.sql`.
3. Puis exécute `supabase/migrations/0002_rls.sql`.

## 4. Récupérer les clés

Dans Supabase → **Project Settings → API** :
- `Project URL`
- `anon public key`

## 5. Configurer les variables d'environnement

1. Renomme `.env.example` en `.env.local`.
2. Remplis :
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxxxxxxxxx
   ```

## 6. Tester en local (optionnel mais recommandé)

```bash
npm install
npm run dev
```
Ouvre http://localhost:3000

## 7. Déployer gratuitement sur Vercel

1. Va sur https://vercel.com → connecte ton compte GitHub.
2. **Add New Project** → sélectionne le dépôt `les-valeureux`.
3. Dans **Environment Variables**, ajoute les deux mêmes variables qu'à l'étape 5.
4. Clique sur **Deploy**. Le plan **Hobby** de Vercel est gratuit.
5. Ton site sera en ligne sur une adresse du type `les-valeureux.vercel.app`.

## 8. Créer le premier compte administrateur

1. Dans Supabase → **Authentication → Users → Add user**, crée un utilisateur avec
   ton email et un mot de passe.
2. Copie son `UID`.
3. Dans **SQL Editor**, exécute (en remplaçant l'UID) :
   ```sql
   insert into profiles (id, full_name, role_id)
   values ('UID-COPIÉ-ICI', 'Administrateur Général', 1); -- 1 = super_admin
   ```
4. Connecte-toi sur `/login` avec cet email et ce mot de passe.

## 9. Tester le système

- Va sur `/dashboard` → vérifie que les statistiques s'affichent (à zéro au début).
- Ajoute un élève depuis `/dashboard/eleves`.
- Enregistre un paiement depuis `/dashboard/paiements`.
- Dépose une plainte depuis `/dashboard/plaintes`.
- Vérifie dans Supabase → **Table Editor** que les données apparaissent bien.

## 10. Mise en production

- Ajoute une année scolaire dans la table `school_years` (ex. `2026-2027`,
  `is_current = true`) et quelques `classes` avant d'inscrire les élèves.
- Personnalise `settings.school_info` si les coordonnées changent.
- Chaque nouveau module (Enseignants, Personnel, Présences, Rapports PDF/Excel...)
  se construit sur le même modèle que `app/dashboard/eleves/` : une page serveur qui
  lit Supabase, un petit composant client pour le formulaire d'ajout.

---

## Rôles disponibles (table `roles`)

| Rôle | Ce qu'il peut faire (RLS déjà en place) |
|---|---|
| super_admin | Tout gérer, y compris comptes et permissions |
| admin | Gérer élèves, enseignants, personnel, classes |
| direction | Consulter statistiques, présences, plaintes |
| secretaire | Enregistrer/modifier les élèves |
| comptable | Gérer les paiements et frais |
| enseignant | Gérer les présences de ses classes |
| personnel | Accès limité |
| eleve / parent | Consultation de leurs propres informations |

## Aucun service payant obligatoire
Supabase (plan Free) + Vercel (plan Hobby) + GitHub (gratuit) = hébergement complet
sans coût, adapté à ce projet.
