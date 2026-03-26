# CBX — Système de Gestion des CRA

Projet de TP Full-Stack : Application de gestion des Comptes Rendus d'Activité (CRA) pour les consultants et administrateurs de la société CBX.

## Stack Technique

- Frontend : Angular 18 (Standalone Components), Angular Material, RxJS.

- Backend : Spring Boot 3.4, Spring Data JPA, Hibernate.

- Sécurité : Spring Security, Password Encoding (BCrypt).

- Base de données : H2 Database (In-Memory pour les tests).

- Outils : Lombok, Maven, TypeScript.

## Fonctionnalités

### Administrateur

- Authentification sécurisée avec rôle `ADMIN`
- Gestion des collaborateurs : création, modification, activation/désactivation et suppression
- Gestion des missions : création, modification et suppression
- Visualisation des CRA soumis
- Validation ou refus des CRA avec motif de rejet
- Tableau de bord avec indicateurs clés : nombre de collaborateurs, CRA à valider, intercontrats

### Collaborateur

- Authentification sécurisée avec rôle `COLLABORATOR`
- Consultation du tableau de bord personnel
- Affichage de la mission actuelle ou de l'état d'intercontrat
- Consultation du statut du CRA du mois en cours
- Saisie et soumission du CRA pendant la fenêtre autorisée
- Activation initiale du compte avec définition du mot de passe

## Installation

### Prérequis

- Java 17 ou supérieur

- Node.js 18+ & Angular CLI

- Maven

Cloner le repo puis ouvrir le dossier du projet dans VS Code.

**Démarrage Rapide**

**1. Lancer le Backend**

```sh
cd backend
./mvnw spring-boot:run
```

L'API sera disponible sur http://localhost:8080

**2. Lancer le Frontend**

```sh
cd frontend/app
npm install
ng serve
```

L'application sera disponible sur http://localhost:4200

## Comptes de test

**Administrateur**

- Email : admin@cbx.fr
- Mot de passe : admin123

**Collaborateurs seedés**

- alice@cbx.fr
- bob@cbx.fr
- Mot de passe : password123

## Base H2

La console H2 est accessible à l'adresse suivante :

- URL : http://localhost:8080/h2
- JDBC URL : jdbc:h2:mem:testdb
- Utilisateur : sa
- Mot de passe : password
