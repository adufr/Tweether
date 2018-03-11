// ====================================================
// ====================================================
// == Initialisation :  ===============================
// ====================================================
// ====================================================

// Packages :
const Twit = require('twit');
// Autres fichiers :
const login = require('./Login');
const logs = require('./Logs');

// Création instance bot avec les tokens situés dans le fichier login :
var T = new Twit(login);


// ====================================================
// ====================================================
// == Envoie de Tweets :  =============================
// ====================================================
// ====================================================

var sendTweet = function (message, replyId) {

  // Vérification longueur :
  // (uniquement utile pour l'envoi manuel du changelog)
  if (message.length <= 320) {

    // Envoi du tweet via Twit
    if (replyId == "none") {
      var tweet = {
        status: message
      }
    } else {
      var tweet = {
        status: message,
        in_reply_to_status_id: replyId
      }
    }

    T.post('statuses/update', tweet, posted);

    // Callback :
    function posted(err, data, response) {
      if (err) {
        // LOG : Erreur lors de l'envoi du tweet :
        logs.logError("Erreur : le tweet n'a pas été posté : " + err);
      }
    }

  } else {

    // DEBUG : Annulation de l'envoi : on prévient directement l'administrateur dans la console :
    console.log("\n\nERREUR : Le tweet dépasse 280 caractères !\n==========================================\n\n\n\n");

  }

}

// On rend la méthode accessible :
exports.sendTweet = sendTweet;


// ====================================================
// ====================================================
// == Fav' un tweet :  ================================
// ====================================================
// ====================================================

var favTweet = function (tweet) {

  var fav = {
    id: tweet
  }

  T.post('favorites/create', fav, posted);

  // Callback :
  function posted(err, data, response) {
    if (err) {
      // LOG : Erreur lors de l'envoi du tweet :
      logs.logError("Erreur : le fav' n'a pas été posté : " + err);
    }
  }

}

// On rend la méthode accessible :
exports.favTweet = favTweet;