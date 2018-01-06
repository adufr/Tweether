// DEBUG : Permet de voir quand le bot démarre
console.log("Tweether 1.0-1 is starting... \n\n");


// On vérifie que les packages sont bien installés :
var Twit = require('twit');
var getJSON = require('get-json')
// On vérifie tout les fichiers de codes sont bien présents :
var login = require('./Login');
var weather = require('./Weather');
var twitter = require('./Twitter');
var utils = require('./Utils');

// On déclare l'instance du bot avec les logins situés dans le fichier config
var T = new Twit(login);




// Messages d'erreur :
error = "\n\n⚠️ Une erreur est survenue lors de l'envoi de votre bulletin météo !\n\n⚠️ Si le problème persiste, merci de contacter @ Woosy__\n📝 https://github.com/Woosy/Tweether/issues/new";
errorNoLoc = "\n\n⚠️ Une erreur est survenue lors de l'envoi de votre bulletin météo !\n⚠️ Vous n'avez pas défini de localisation sur votre page de profil !\n\n⚠️ Si le problème persiste, merci de contacter @ Woosy__\n📝 https://github.com/Woosy/Tweether/issues/new";
errorInvalidLoc = "\n\n⚠️ Une erreur est survenue lors de l'envoi de votre bulletin météo !\n⚠️ Veuillez indiquer une localisation valide !\n\n⚠️ Si le problème persiste, merci de contacter @ Woosy__\n📝 https://github.com/Woosy/Tweether/issues/new";






// Lancement du script
main();


// Fonction principale :
function main() {

  // Screen_name du bot :
  var id = {
    user_id: "Tweether01"
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
    getJSON('http://api.openweathermap.org/data/2.5/forecast?q=' + city + ',' + country + '&units=metric&APPID=8445323e2d375eef7e097a6617b4af68', function(error, response){

      // On vérifire que l'on reçoit bien les données :
      if (error != null) {


        // Envoie d'un tweet d'erreur ciblé :
        console.log("@" + user + errorInvalidLoc + "\n\n\n");
        twitter.sendTweet("@" + user + errorInvalidLoc);


        // Les donneés ont bien été reçues :
      } else {

        // Fonction servant au calcul de l'heure actuelle :
        function addZero(i) {
            if (i < 10) {
                i = "0" + i;
            } return i;
        }

        // Construction du message :
        meteoTime = utils.getHour();
        meteoCity = response.city.name;
        meteoCurrTemp = response.list[0].main.temp;
        meteoMinTemp = response.list[0].main.temp_min;
        meteoMaxTemp = response.list[0].main.temp_max;
        meteoClouds = response.list[0].clouds.all;
        meteoHumidity = response.list[0].main.humidity;
        meteoWindSpeed = response.list[0].wind.speed;


        // Traduction de la description :
        weather.translateDesc(response.list[0].weather[0].description);

        // Traduction de l'angle de provenance du vent en direction :
        weather.getWindDir(response.list[0].wind.deg);


        // Construction du message :
        meteo = "@" + user + "\n\n🌦️ Météo, " + meteoTime + " à " + meteoCity + " : " + meteoDesc + "\n\n"
              + "🌡️ Actuellement : " + meteoCurrTemp + "°C\n"
              + "🌡️ Min : " + meteoMinTemp + "°C - Max : " + meteoMaxTemp + "°C\n"
              + "☁️ Couvert à : " + meteoClouds + "%\n"
              + "💧 Humidité : " + meteoHumidity + "%\n"
              + "🌪️ " + meteoWindSpeed + " km/h - " + meteoWindDir;


        // Si il n'y a pas d'erreur :
        if (meteo.indexOf("ERREUR") == -1) {

          // Envoie du Tweet :
          console.log(meteo + "\n\n\n");
          twitter.sendTweet(meteo);

          // Si le tweet contient une erreur :
        } else {

          // Envoie d'un tweet d'erreur :
          console.log("@" + user + error + "\n\n\n");
          twitter.sendTweet("@" + user + error);

        }

      }


    })



    // Si la localisation n'est pas activée :
  } else {

    // Envoie message d'erreur : activer localisation
    twitter.sendTweet("@" + user + errorNoLoc);

  }


}
