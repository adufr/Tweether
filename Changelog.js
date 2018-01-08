// On vérifie que les packages sont bien installés :
var Twit = require('twit');
var getJSON = require('get-json')
// On vérifie tout les fichiers de codes sont bien présents :
var login = require('./Login');
var weather = require('./Weather');
var twitter = require('./Twitter');
var utils = require('./Utils');
var config = require('./Config');


// DEBUG : Permet de voir quand le bot démarre
console.log("============================\nTweether " + config.getVersion() + " is starting...\n============================\n\n\n");


// On déclare l'instance du bot avec les logins situés dans le fichier config
var T = new Twit(login);



// On envoie le changelog :
twitter.sendTweet(config.getChangelog());
console.log(config.getChangelog() + "\n\n\n");
