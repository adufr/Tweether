// DEBUG : Permet de voir quand le bot démarre
console.log("Tweether 1.0-1 is starting... \n\n");


// On vérifie que les packages sont bien installés :
var Twit = require('twit');
var getJSON = require('get-json')
// On vérifie tout les fichiers de codes sont bien présents :
var config = require('./config');
// On déclare l'instance du bot avec les logins situés dans le fichier config
var T = new Twit(config);



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
          console.log("Pas de location définie pour : " + data.users[i].screen_name + "\n\n\n");
        }

      }

    }
  }

}


// Récupération de la météo :
function whatsTheWeatherIn(location, user) {


  // Traitement "location" & transformation en ville + pays :
  var temp = location.split(", ");
  var city = temp[0];
  var country = temp[1];


  // Chargement du lien :
  getJSON('http://api.openweathermap.org/data/2.5/forecast?q=' + city + ',' + country + '&units=metric&APPID=8445323e2d375eef7e097a6617b4af68', function(error, response){

    // On vérifire que l'on reçoit bien les données :
    if (error != null) {

      // DEBUG :
      console.log("ERREUR : réception données météo :\n" + error);

      // Les donneés ont bien été reçues :
    } else {

      // Fonction servant au calcul de l'heure actuelle :
      function addZero(i) {
          if (i < 10) {
              i = "0" + i;
          } return i;
      }

      // Construction du message :
      meteoTime = new Date();
      meteoTime = addZero(meteoTime.getHours()) + "h" + addZero(meteoTime.getMinutes());
      meteoCity = response.city.name;
      meteoCurrTemp = response.list[0].main.temp;
      meteoMinTemp = response.list[0].main.temp_min;
      meteoMaxTemp = response.list[0].main.temp_max;
      meteoClouds = response.list[0].clouds.all;
      meteoHumidity = response.list[0].main.humidity;
      meteoWindSpeed = response.list[0].wind.speed;

      // Traduction de la description :
      switch (response.list[0].weather[0].description) {

        case "light rain":
          meteoDesc = "Pluie légère";
        break;

        case "moderate rain":
          meteoDesc = "Pluie modérée";
        break;

        default:
          meteoDesc = 'ERREUR ! Description inconnue...';
      }

      // Traduction de l'angle de provenance du vent en direction :
      temp = response.list[0].wind.deg;
      if ((temp >= 0) && (temp < 22.5)) {
        meteoWindDir = "⬆️ Nord";
      } else if ((temp >= 22.5) && (temp <= 67.5)) {
        meteoWindDir = "↗️ Nord-Est";
      } else if ((temp > 67.5) && (temp < 112.5)) {
        meteoWindDir = "➡️ Est";
      } else if ((temp >= 112.5) && (temp <= 157.5)) {
        meteoWindDir = "↘️ Sud-Est";
      } else if ((temp > 157.5) && (temp < 202.5)) {
        meteoWindDir = "⬇️ Sud";
      } else if ((temp >= 202.5) && (temp <= 247.5)) {
        meteoWindDir = "↙️ Sud-Ouest";
      } else if ((temp > 247.5) && (temp < 292.5)) {
        meteoWindDir = "⬅️ Ouest";
      } else if ((temp >= 292.5) && (temp <= 337.5)) {
        meteoWindDir = "↖️ Nord-Ouest";
      } else if ((temp > 337.5) && (temp <= 360)) {
        meteoWindDir = "⬆️ Nord";
      } else {
        meteoWindDir = "Erreur !";
      }


      // Construction du message :
      meteo = "@" + user + "\n🌦️ Météo, " + meteoTime + " à " + meteoCity + " : " + meteoDesc + "\n\n"
            + "🌡️ Actuellement : " + meteoCurrTemp + "°C\n"
            + "🌡️ Min : " + meteoMinTemp + "°C - Max : " + meteoMaxTemp + "°C\n"
            + "☁️ Couvert à : " + meteoClouds + "%\n"
            + "💧 Humidité : " + meteoHumidity + "%\n"
            + "🌪️ " + meteoWindSpeed + " km/h - " + meteoWindDir;

      error = "@" + user + "\n⚠️ Une erreur est survenue !\n⚠️ Merci de contacter @Woosy__\n📝 https://github.com/Woosy/Tweether/issues/new";



      // Si il n'y a pas d'erreur :
      if (meteo.indexOf("ERREUR") == -1) {

        console.log(meteo + "\n\n\n");
        tweetIt(meteo);

        // Si le tweet contient une erreur :
      } else {

        console.log(error + "\n\n\n");
        tweetIt(error);

      }

    }


  })


}






// Envoie du tweet :
function tweetIt(meteo) {

  // Tweet a envoyer :
  var tweet = {
    status: meteo
  }


  // Construction du tweet via l'API de Twit :
  T.post('statuses/update', tweet, posted);


  // Callback (debug) :
  function posted(err, data, response) {
    if (err) {
      console.log("ERREUR : Envoi du tweet");
    } else {
      console.log("Le tweet a bien été envoyé !");
    }
  }

}
