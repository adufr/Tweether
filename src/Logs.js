// ====================================================
// ====================================================
// == Initialisation :  ===============================
// ====================================================
// ====================================================

// Package :
const fs = require('fs');
const utils = require('./Utils');
const config = require('./Config');


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
  fs.appendFileSync(config.getTweetsLogPath(), text, "UTF-8", {'flags': 'a+'});

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
  fs.appendFileSync(config.getErrorsLogPath(), text, "UTF-8", {'flags': 'a+'});

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
  fs.appendFileSync(config.getStatusLogPath(), text, "UTF-8", {'flags': 'a+'});

}

// On rend la méthode accessible :
exports.logStatus = logStatus;
