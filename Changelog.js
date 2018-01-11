// On vérifie que les packages sont bien installés :
var Twit = require('twit');
var getJSON = require('get-json')
// On vérifie tout les fichiers de codes sont bien présents :
var login = require('./Login');
var weather = require('./Weather');
var twitter = require('./Twitter');
var utils = require('./Utils');
var config = require('./Config');
var version = require('./Version');


// DEBUG : Permet de voir quand le bot démarre
console.log("============================\nTweether " + version.getVersion() + " is starting...\n============================\n");


// On déclare l'instance du bot avec les logins situés dans le fichier config
var T = new Twit(login);



// On envoie le changelog :
twitter.sendTweet(version.getChangelog());
console.log(version.getChangelog());
