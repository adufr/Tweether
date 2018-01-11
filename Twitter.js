// ====================================================
// ====================================================
// == Initialisation :  ===============================
// ====================================================
// ====================================================


// Packages :
var Twit = require('twit');
// Autres fichiers :
var login = require('./Login');


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



// ====================================================
// ====================================================
// == Envoie de Tweets :  =============================
// ====================================================
// ====================================================


var sendTweet = function (message) {


  // Vérification longueur :
  // (uniquement utile pour l'envoi manuel du changelog)
  if (message.length <= 280) {


    // Envoi du tweet via Twit
    var tweet = {
      status: message
    }

    T.post('statuses/update', tweet, posted);

    // Callback :
    function posted(err, data, response) {
      if (err) {
        // LOG : Erreur lors de l'envoi du tweet :
        console.log("Le tweet n'a pas été posté : " + err + "\n\n============================\n\n");
      } else {
        // LOG: Tweet envoyé avec succès
        console.log("Le tweet a bien été posté !");
      }
    }


  } else {

    // DEBUG : Annulation de l'envoi : on prévient directement l'administrateur dans la console :
    console.log("\n\nERREUR : Le tweet dépasse 280 caractères !\n==========================================\n\n\n\n");

  }

}


// On rend la méthode accessible :
exports.sendTweet = sendTweet;
