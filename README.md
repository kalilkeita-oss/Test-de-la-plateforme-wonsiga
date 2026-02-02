# 🧪 Tests Automatisés - Plateforme Wonsiga

Ce dépôt contient les scripts de tests end-to-end réalisés avec **Cypress** pour la plateforme Wonsiga.

## 🚀 Scénarios de tests inclus

1. **Authentification (`auth_wonsiga.cy.js`)** : Vérification de la connexion avec des identifiants valides, gestion des erreurs et récupération de mot de passe.
2. **Gestion des Chauffeurs (`driver_wonsiga.cy.js`)** : Automatisation du module de gestion du personnel de conduite.
3. **Gestion des Véhicules (`Vehicule_wonsiga.cy.js`)** : Test complet du cycle de vie (Création et Suppression d'un véhicule).

## 🛠️ Installation et Exécution

Pour lancer les tests sur votre machine :

1. Cloner le projet :
   `git clone https://github.com/kalilkeita-oss/Test-de-la-plateforme-wonsiga.git`
2. Installer les dépendances :
   `npm install`
3. Ouvrir l'interface Cypress :
   `npx cypress open`
4. Lancer les tests en mode console :
   `npx cypress run`

---

**Développé par :** Ibrahima Kalil Keita
**Contact Chef de projet :** iibtelibah@gmail.com
