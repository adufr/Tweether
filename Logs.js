// ====================================================
// ====================================================
// == Initialisation :  ===============================
// ====================================================
// ====================================================


// Package :
var fs = require('fs');
var utils = require('./Utils');

// Variables :
var tweetsPath = "/home/arthur/Tweether/logs/tweets.txt";
var errorsPath = "/home/arthur/Tweether/logs/errors.txt";
var statusPath = "/home/arthur/Tweether/logs/status.txt";

var timestamp = "=================================================\n" +
                "====> " + utils.getTodaysDate() + "  A  " + utils.getHour() + " <=====================\n" +
                "=================================================\n";





// ====================================================
// ====================================================
// == Log des Tweets :  ===============================
// ====================================================
// ====================================================

var logTweet = function (text) {

  text = timestamp + text + "\n\n\n\n";

  // Écrit à la suite du fichier (le créer si il n'existe pas) :
  fs.appendFileSync(tweetsPath, text, "UTF-8", {'flags': 'a+'});

}

// On rend la méthode accessible :
exports.logTweet = logTweet;





// ====================================================
// ====================================================
// == Log des erreurs :  ===============================
// ====================================================
// ====================================================

var logError = function (text) {

  text = timestamp + text + "\n\n\n\n";

  // Écrit à la suite du fichier (le créer si il n'existe pas) :
  fs.appendFileSync(errorsPath, text, "UTF-8", {'flags': 'a+'});

}

// On rend la méthode accessible :
exports.logError = logError;




// ====================================================
// ====================================================
// == Log du status :  ===============================
// ====================================================
// ====================================================

var logStatus = function (text) {

  text = timestamp + text + "\n\n\n\n";

  // Écrit à la suite du fichier (le créer si il n'existe pas) :
  fs.appendFileSync(statusPath, text, "UTF-8", {'flags': 'a+'});

}

// On rend la méthode accessible :
exports.logStatus = logStatus;
