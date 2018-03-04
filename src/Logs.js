// ====================================================
// ====================================================
// == Initialisation :  ===============================
// ====================================================
// ====================================================

// Package :
const fs = require('fs');
const utils = require('./Utils');
const config = require('./Config');

// Variables :
if (config.getDebugState() == "true") {
  var tweetsPath = "logs/tweets.txt";
  var errorsPath = "logs/errors.txt";
  var statusPath = "logs/status.txt";
} else {
  var tweetsPath = "/home/arthur/Tweether/src/logs/tweets.txt";
  var errorsPath = "/home/arthur/Tweether/src/logs/errors.txt";
  var statusPath = "/home/arthur/Tweether/src/logs/status.txt";
}

var timestamp = "=================================================\n" +
                "====> " + utils.getTodaysDate() + "  A  " + utils.getTimeWithSeconds() + " <==================\n" +
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
