# Nextflix
Produit par ***Lucky MARTY, Mathieu VIDOT & Jonathan MARTIN***
Projet école pour __travailler ses méthodes des tests et déploiement sur des instances de PROD__ en assurant une évolutivité et des choix de technologies adapté aux outils actuel de l'informatique.

| | |
|----|---------|
| Thème | NetFlix |
| Technologies | SQLLite3 + Tmdb + AdonisJS |
| Front | ReactJS |
| Back | NodeJS |

## Initialisation
- Confrontation des langages souhaitées apportant une richesse culturelle et une facilité de développement : TypeScript + JavaScript
- Choix du framework AdonisJS disposant de composant permettant d'optimiser nos tests unitaire et qui favorise un déploiemen et une évolutilité accessible au long du projet.
- Organisation de notre architecture logicielle (décomposition via API REST du back-end)
- Création d'une base de données locale et facile à manipuler pour ne pas dissocier la communication entre le serveur SSH et celui de BDD : Sqllite3
- Build complet du projet via GitHub
- Travail du design et de la réponse à la problèmatique donnée suivant le cahier des charges fonctionnel énuméré avec une deadline de 4 jours de développement 
- Test unitaire et déploiement avec l'utilisation de GitHub Pages


# Organisation
- API pour la communication entre le back et le front-end
- Gestion de clé par utilisateur pour n'avoir qu'un seul compte intérrogeant l'API de Tmdb
- Utilisation de l'ORM, l'authentification pour les migrations SQL
- Organisation du travail via la méthode Scrum et sprint synchronisé.

## Installation et configuration

### Front 
```
npm install
npm run build
``` 

### Back
```
npm install
npm run build (x2 front et back-end)
``` 

