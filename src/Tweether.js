// ====================================================
// ====================================================
// == Initialisation :  ===============================
// ====================================================
// ====================================================


// Packages :
const Twit = require('twit');
const getJSON = require('get-json')
// Autres fichiers :
const login = require('./Login');
const weather = require('./Weather');
const twitter = require('./Twitter');
const utils = require('./Utils');
const config = require('./Config');
const version = require('./Version');
const logs = require('./Logs');
const temp = require('./Temp');



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
// == MAIN :  =========================================
// ====================================================
// ====================================================

// Vérification état du programme
if (config.getState() == "on") {
  logs.logStatus("============================\nTweether " + version.getVersion() + " is starting...\n============================\n\n\n");
  main();
} else {
  logs.logStatus("\nTWEETHER S'EST ARRÊTÉ : OFF\n");
}





// ====================================================
// ====================================================
// == Récupération des followers :  ===================
// ====================================================
// ====================================================


// Fonction principale :
function main() {

  // Nom (@username) du bot :
  var id = {
    user_id: config.getAccountName()
  }


  // Récupération de la liste des followers du bot :
  T.get('followers/list', id, gotData);


  // Traitement des données :
  function gotData(err, data, response) {

    // LOG : Vérification erreur sur la requête GET (Twitter's API) :
    if (err) {
      logs.logError("Erreur (Twitter) récupération liste des followers : " + err);

      // Pas d'erreur :
    } else {

      // On boucle sur chaque followers du bot :
      for (var i = 0; i < data.users.length; i++) {

        // On vérifie que sa location est bien définie :
        if (data.users[i].location.length != 0) {

          // On transmet location & screen_name :
          temp.whatsTheWeatherIn(data.users[i].location, data.users[i].screen_name, "none");

          // Location non définie :
        } else {

          // LOG : Location non-définie pour @username :
          logs.logError("Erreur : pas de location définie pour : " + data.users[i].screen_name);

          // Envoie message d'erreur : activer localisation
          twitter.sendTweet("@" + data.users[i].screen_name + config.getErrorNoLoc(), "none");
          // LOG : Tweet d'erreur :
          logs.logTweet("@" + data.users[i].screen_name + config.getErrorNoLoc());

        }

      }

    }
  }

}