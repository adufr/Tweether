// ====================================================
// ====================================================
// == Initialisation :  ===============================
// ====================================================
// ====================================================

// Packages :
const Twit = require('twit');
const getJSON = require('get-json')
// Autres fichiers :
const weather = require('./Weather');
const twitter = require('./Twitter');
const version = require('./Version');
const utils = require('./Utils');
const config = require('./Config');
const logs = require('./Logs');


// ====================================================
// ====================================================
// == Récupération de la météo :  =====================
// ====================================================
// ====================================================

// Récupération de la météo :
function whatsTheWeatherIn(location, user, replyId) {

  // Traitement "location" & transformation en ville + pays :
  // Vérification : pays set ou non
  if (location.indexOf(",") == -1) {

    var city = location;
    var country = "";

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
      meteoTime = utils.getTime();
      meteoCity = response.name;
      meteoCountry = response.sys.country;
      meteoCurrTemp = response.main.temp;
      meteoMinTemp = response.main.temp_min;
      meteoMaxTemp = response.main.temp_max;
      meteoClouds = response.clouds.all;
      sunrise = utils.getTimeFromTimeStamp(response.sys.sunrise);
      sunset = utils.getTimeFromTimeStamp(response.sys.sunset);
      meteoWindSpeed = response.wind.speed;

      // Traduction de la description :
      // + récupération de l'icône :
      weather.translateDesc(response.weather[0].description);

      // Traduction de l'angle de provenance du vent en direction :
      weather.getWindDir(response.wind.deg);

      // Assemblage du tweet :
      meteo = "@" + user + " (version " + version.getVersion() + ")\n\n️" + meteoIcon + " " + meteoCity + " (" + meteoCountry + ") : " + meteoDesc + " (" + meteoTime + ")\n"
            + "🌡️ Actuellement : " + Math.round(meteoCurrTemp) + "°C\n\n"

            + "🌡️ Min : " + Math.round(meteoMinTemp) + "°C - Max : " + Math.round(meteoMaxTemp) + "°C\n"
            + "☁️ Couvert à : " + meteoClouds + "%\n"
            + "🌪️ " + meteoWindSpeed + " m/s - " + meteoWindDir + "\n\n"

            + "☀️ Lever : " + sunrise + "\n"
            + "🌒 Coucher : " + sunset + "\n";

      // Si le tweet ne contient pas "ERREUR" :
      if (meteo.indexOf("ERREUR") == -1) {

        if (replyId == "none") {

          // Envoie du Tweet :
          twitter.sendTweet(meteo, "none");
          // LOG : Envoie du tweet :
          logs.logTweet(meteo);

        } else {

          // Envoie du Tweet :
          twitter.sendTweet(meteo, replyId);
          // LOG : Envoie du tweet :
          logs.logTweet(meteo);

        }

      } else {

        if (replyId == "none") {

          // Envoie d'un tweet d'erreur :
          twitter.sendTweet("@" + user + config.getError(), "none");
          // LOG : Tweet d'erreur :
          logs.logTweet("@" + user + config.getError());

        } else {

          // Envoie d'un tweet d'erreur :
          twitter.sendTweet("@" + user + config.getError(), replyId);
          // LOG : Tweet d'erreur :
          logs.logTweet("@" + user + config.getError());

        }

      }

      // ====================================================
      // == Donnés météo non reçues :  ======================
      // ====================================================

    } else {

      if (replyId == "none") {

        // Envoie d'un tweet d'erreur ciblé :
        twitter.sendTweet("@" + user + config.getErrorInvalidLoc(), "none");
        // LOG : Tweet d'erreur :
        logs.logTweet("@" + user + config.getErrorInvalidLoc());

      } else {

        // Envoie d'un tweet d'erreur ciblé :
        twitter.sendTweet("@" + user + config.getErrorInvalidLoc(), replyId);
        // LOG : Tweet d'erreur :
        logs.logTweet("@" + user + config.getErrorInvalidLoc());

      }

    }

  })

}

// On rend la méthode accessible :
exports.whatsTheWeatherIn = whatsTheWeatherIn;