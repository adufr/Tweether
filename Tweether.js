// On vérifie que les packages sont bien installés :
var Twit = require('twit');
var getJSON = require('get-json')
// On vérifie tout les fichiers de codes sont bien présents :
var login = require('./Login');
var weather = require('./Weather');
var twitter = require('./Twitter');
var utils = require('./Utils');
var config = require('./Config');


// DEBUG : Permet de voir quand le bot démarre
console.log("============================\nTweether " + config.getVersion() + " is starting...\n============================\n\n\n");


// On déclare l'instance du bot avec les logins situés dans le fichier config
var T = new Twit(login);




// Lancement du script
main();




// Fonction principale :
function main() {

  // Screen_name du bot :
  var id = {
    user_id: config.getAccountName()
  }


  // Listing des followers du bot :
  T.get('followers/list', id, gotData);

  function gotData(err, data, response) {
    // DEBUG : Vérification erreur sur la requête GET :
    if (err) {
      console.log("ERREUR : Get followers list : " + err);

      // Pas d'erreur :
    } else {

      // On boucle sur chaque followers du bot :
      for (var i = 0; i < data.users.length; i++) {

        // On vérifie que sa location est bien définie :
        if (data.users[i].location.length != 0) {

          // On transmet location & screen_name :
          whatsTheWeatherIn(data.users[i].location, data.users[i].screen_name);

          // Si la location n'est pas définie :
        } else {

          // DEBUG :
          console.log("Pas de location définie pour : " + data.users[i].screen_name + "\n\n\n");
          whatsTheWeatherIn("noloc", data.users[i].screen_name);

        }

      }

    }
  }

}


// Récupération de la météo :
function whatsTheWeatherIn(location, user) {


  // Si la localisation est bien mise en place :
  if (location != "noloc") {


    // Traitement "location" & transformation en ville + pays :
    var temp = location.split(", ");
    var city = temp[0];
    var country = temp[1];



    // Chargement du lien :
    getJSON('http://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + country + '&units=metric&APPID=8445323e2d375eef7e097a6617b4af68', function(miss, response){

      // On vérifire que l'on reçoit bien les données :
      if (miss != null) {


        // Envoie d'un tweet d'erreur ciblé :
        console.log("@" + user + config.getErrorInvalidLoc() + "\n\n\n");
        twitter.sendTweet("@" + user + config.getErrorInvalidLoc());


        // Les donneés ont bien été reçues :
      } else {

        // Construction du message :
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

        // Traduction de l'angle de provenance du vent en di  rection :
        weather.getWindDir(response.wind.deg);


        // Construction du message :
        meteo = "@" + user + "\n\n️" + meteoIcon + " " + meteoCity + " (" + meteoCountry + ") : " + meteoDesc + " (" + meteoTime + ")\n\n"
              + "🌡️ Actuellement : " + Math.round(meteoCurrTemp) + "°C\n"
              + "🌡️ Min : " + Math.round(meteoMinTemp) + "°C - Max : " + Math.round(meteoMaxTemp) + "°C\n"
              + "☁️ Couvert à : " + meteoClouds + "%\n"
              + "💧 Humidité : " + meteoHumidity + "%\n"
              + "🌪️ " + meteoWindSpeed + " m/s - " + meteoWindDir + "\n\n"
              + weather.getMessage(meteoClouds, meteoCurrTemp) + " (" + config.getVersion() + ")";


        // Si il n'y a pas d'erreur :
        if (meteo.indexOf("ERREUR") == -1) {

          // Envoie du Tweet :
          console.log(meteo + "\n\n\n");
          twitter.sendTweet(meteo);

          // Si le tweet contient une erreur :
        } else {

          // Envoie d'un tweet d'erreur :
          console.log("@" + user + config.getError() + "\n\n\n");
          twitter.sendTweet("@" + user + config.getError());

        }

      }


    })



    // Si la localisation n'est pas activée :
  } else {

    // Envoie message d'erreur : activer localisation
    twitter.sendTweet("@" + user + config.getErrorNoLoc());

  }


}
