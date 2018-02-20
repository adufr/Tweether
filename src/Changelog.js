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


// LOG : Démarrage du script :
logs.logStatus("============================\nTweether " + version.getVersion() + " is starting...\n============================\n\n\n");




// ====================================================
// ====================================================
// == Envoie du changelog :  ==========================
// ====================================================
// ====================================================


// Création instance bot avec les tokens situés dans le fichier login :
//
//  module.exports = {
//    consumer_key:         'replace_by_consumer_key',
//    consumer_secret:      'replace_by_consumer_secret',
//    access_token:         'replace_by_access_token',
//    access_token_secret:  'replace_by_token_secret',
//    timeout_ms:           60*1000, // Optional
//  }
//

var T = new Twit(login);


// Envoie du changelog :
twitter.sendTweet(version.getChangelog());
// LOG : Envoi du tweet :
logs.logTweet(version.getChangelog());
