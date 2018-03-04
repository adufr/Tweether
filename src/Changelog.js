// ====================================================
// ====================================================
// == Initialisation :  ===============================
// ====================================================
// ====================================================

// Packages :
const Twit = require('twit');
// Autres fichiers :
const login = require('./Login');
const twitter = require('./Twitter');
const version = require('./Version');
const logs = require('./Logs');

// Création instance bot avec les tokens situés dans le fichier login :
var T = new Twit(login);

// LOG : Démarrage du script :
logs.logStatus("============================\nTweether " + version.getVersion() + " is starting...\n============================\n\n\n");


// ====================================================
// ====================================================
// == Envoie du changelog :  ==========================
// ====================================================
// ====================================================

// Envoie du changelog :
twitter.sendTweet(version.getChangelog(), "none");
// LOG : Envoi du tweet :
logs.logTweet(version.getChangelog());