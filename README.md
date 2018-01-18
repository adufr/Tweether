# Qu'est-ce que Tweether ?

Tweether est un compte Twitter géré par un programme, qui a pour but de donner 2 bulletins météo par jour à chacun de ses followers, en fonction de la ville définie sur son profil.

Tweether est également le premier petit projet que j'ai développé en JavaScript.

Retrouvez le ici : https://twitter.com/Tweether01

## Fonctionnement

Tweether est entièrement écrit en JavaScript, et utilise la technologie Node.js.
Mais il utilise également :
* l'[API de Twitter](https://developer.twitter.com/en/docs) (avec Twit)
* l'[API d'OpenWeatherMap](https://openweathermap.org/api) (avec Get-Json)

### Prérequis

Afin de fonctionner, vous devrez donc installer Node.js sur votre machine et installer les paquets [Twit](https://github.com/ttezel/twit) et [Get-Json](https://github.com/zeke/get-json)

```
npm install twit --save
npm install get-json --save
```

### Déploiement

Actuellement Tweether ne se présente que sous la forme d'un script, qui s'execute tous les jours grâce à une tâche planifiée. Ainsi, sous linux, pour executer le script, il vous suffit de taper
```
node Tweether.js
```
Ou bien vous pouvez sous linux, créer un tâche planifiée
```
crontab -e

// Ici, s'executera tout les jours à 06h15
15 06 * * * node chemin/de/votre/fichier.js
```


## Auteurs

* **Arthur Dufour** - *Projet initial* - [Woosy](https://github.com/Woosy)

Jetez également un coup d'oeil à la liste des [contributeurs](https://github.com/woosy/tweether/contributors) pour voir qui a participé à ce projet.

## License

Ce projet est sous license MIT. 
