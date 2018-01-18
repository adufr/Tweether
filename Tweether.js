// ====================================================
// ====================================================
// == Initialisation :  ===============================
// ====================================================
// ====================================================


// Packages :
var Twit = require('twit');
var getJSON = require('get-json')
// Autres fichiers :
var login = require('./Login');
var weather = require('./Weather');
var twitter = require('./Twitter');
var utils = require('./Utils');
var config = require('./Config');
var version = require('./Version');
var logs = require('./Logs');



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
          whatsTheWeatherIn(data.users[i].location, data.users[i].screen_name);

          // Location non définie :
        } else {

          // LOG : Location non-définie pour @username :
          logs.logError("Erreur : pas de location définie pour : " + data.users[i].screen_name);

          // Envoie message d'erreur : activer localisation
          twitter.sendTweet("@" + data.users[i].screen_name + config.getErrorNoLoc());
          // LOG : Tweet d'erreur :
          logs.logTweet("@" + data.users[i].screen_name + config.getErrorNoLoc());

        }

      }

    }
  }

}







// ====================================================
// ====================================================
// == Récupération de la météo :  =====================
// ====================================================
// ====================================================


// Récupération de la météo :
function whatsTheWeatherIn(location, user) {


  // Traitement "location" & transformation en ville + pays :
  // Vérification : pays set ou non
  if (location.indexOf(",") == -1) {

    var city = location;
    var country = "";
    // Envoie d'un tweet d'erreur ciblé :
    // twitter.sendTweet("@" + user + config.getErrorNoCountry());
    // LOG : Tweet d'erreur :
    // logs.logTweet("@" + user + config.getErrorNoCountry());

  } else {
    var temp = location.split(", ");
    var city = temp[0];
    var country = temp[1];
  }


  // Récupération données météo (OpenWeatherMap's API) :
  getJSON('http://api.openweathermap.org/data/2.5/weather?q=' + city + utils.tradPays(country) + '&units=metric&APPID=8445323e2d375eef7e097a6617b4af68', function(miss, response){


    // ====================================================
    // == Préparation envoie de la météo :  ===============
    // ====================================================

    // Vérification réception des données :
    if (miss == null) {

      // Construction du tweet :
      meteoTime = utils.getHour();
      meteoCity = response.name;
      meteoCountry = response.sys.country;
      meteoCurrTemp = response.main.temp;
      meteoMinTemp = response.main.temp_min;
      meteoMaxTemp = response.main.temp_max;
      meteoClouds = response.clouds.all;
      meteoHumidity = response.main.humidity;
      meteoWindSpeed = response.wind.speed;


      // Traduction de la description :
      // + récupération de l'icône :
      weather.translateDesc(response.weather[0].description);

      // Traduction de l'angle de provenance du vent en direction :
      weather.getWindDir(response.wind.deg);


      // Assemblage du tweet :
      meteo = "@" + user + "\n\n️" + meteoIcon + " " + meteoCity + " (" + meteoCountry + ") : " + meteoDesc + " (" + meteoTime + ")\n\n"
            + "🌡️ Actuellement : " + Math.round(meteoCurrTemp) + "°C\n"
            + "🌡️ Min : " + Math.round(meteoMinTemp) + "°C - Max : " + Math.round(meteoMaxTemp) + "°C\n"
            + "☁️ Couvert à : " + meteoClouds + "%\n"
            + "💧 Humidité : " + meteoHumidity + "%\n"
            + "🌪️ " + meteoWindSpeed + " m/s - " + meteoWindDir + "\n\n"
            + weather.getMessage(meteoClouds, meteoCurrTemp) + " (" + version.getVersion() + ")";



      // Si le tweet ne contient pas "ERREUR" :
      if (meteo.indexOf("ERREUR") == -1) {

        // Envoie du Tweet :
        twitter.sendTweet(meteo);
        // LOG : Envoie du tweet :
        logs.logTweet(meteo);

      } else {

        // Envoie d'un tweet d'erreur :
        twitter.sendTweet("@" + user + config.getError());
        // LOG : Tweet d'erreur :
        logs.logTweet("@" + user + config.getError());

      }



      // ====================================================
      // == Donnés météo non reçues :  ======================
      // ====================================================

    } else {

      // Envoie d'un tweet d'erreur ciblé :
      twitter.sendTweet("@" + user + config.getErrorInvalidLoc());
      // LOG : Tweet d'erreur :
      logs.logTweet("@" + user + config.getErrorInvalidLoc());

    }


  })


}
