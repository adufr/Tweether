// DEBUG : Permet de voir quand le bot démarre
console.log("Tweether 1.0-1 is starting... \n\n");


// On vérifie que les packages sont bien installés :
var Twit = require('twit');
var getJSON = require('get-json')
// On vérifie tout les fichiers de codes sont bien présents :
var login = require('./login');
// On déclare l'instance du bot avec les logins situés dans le fichier config
var T = new Twit(login);




// Messages d'erreur :
error = "\n\n⚠️ Une erreur est survenue lors de l'envoie de votre bulletin météo !\n\n⚠️ Si le problème persiste, merci de contacter @ Woosy__\n📝 https://github.com/Woosy/Tweether/issues/new";
errorNoLoc = "\n\n⚠️ Une erreur est survenue lors de l'envoie de votre bulletin météo !\n⚠️ Vous n'avez pas défini de localisation sur votre page de profil !\n\n⚠️ Si le problème persiste, merci de contacter @ Woosy__\n📝 https://github.com/Woosy/Tweether/issues/new";
errorInvalidLoc = "\n\n⚠️ Une erreur est survenue lors de l'envoie de votre bulletin météo !\n⚠️ Veuillez indiquer une localisation valide !\n\n⚠️ Si le problème persiste, merci de contacter @ Woosy__\n📝 https://github.com/Woosy/Tweether/issues/new";






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
        tweetIt("@" + user + errorInvalidLoc);


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

          // Group 2XX : Thunderstorm
          case "thunderstorm with light rain":
            meteoDesc = "Orage avec légères averses";
          break;

          case "thunderstorm with rain":
            meteoDesc = "Orage avec pluie";
          break;

          case "thunderstorm with heavy rain":
            meteoDesc = "Orage avec grosses averses";
          break;

          case "light thunderstorm":
            meteoDesc = "Orage léger";
          break;

          case "thunderstorm":
            meteoDesc = "Orage";
          break;

          case "heavy thunderstorm":
            meteoDesc = "Gros orage";
          break;

          case "ragged thunderstorm":
            meteoDesc = "Orage irrégulier";
          break;

          case "thunderstorm with light drizzle":
            meteoDesc = "Orage avec légère bruine";
          break;

          case "thunderstorm with drizzle":
            meteoDesc = "Orage avec bruine";
          break;

          case "thunderstorm with heavy drizzle":
            meteoDesc = "Orage avec bruine a forte intensité";
          break;



          // Group 3XX : Drizzle
          case "light intensity drizzle":
            meteoDesc = "Bruine légère";
          break;

          case "drizzle":
            meteoDesc = "Bruine";
          break;

          case "heavy intensity drizzle":
            meteoDesc = "Bruine a forte intensité";
          break;

          case "light intensity drizzle rain":
            meteoDesc = "Bruine légère et pluie";
          break;

          case "drizzle rain":
            meteoDesc = "Bruine et pluie";
          break;

          case "heavy intensity drizzle rain":
            meteoDesc = "Bruine a forte intensité et pluie";
          break;

          case "shower rain and drizzle":
            meteoDesc = "Bruine a forte intensité et pluie";
          break;

          case "heavy shower rain and drizzle":
            meteoDesc = "Bruine a forte intensité et grosses averses";
          break;

          case "shower drizzle":
            meteoDesc = "Bruine a forte intensité";
          break;





          // Group 5XX : rain
          case "light rain":
            meteoDesc = "Légères averses";
          break;

          case "moderate rain":
            meteoDesc = "Averses modérées";
          break;

          case "heavy intensity rain":
            meteoDesc = "Averses";
          break;

          case "very heavy rain":
            meteoDesc = "Grosses averses";
          break;

          case "Extreme rain":
            meteoDesc = "Averses extremes";
          break;

          case "freezing rain":
            meteoDesc = "Pluie gelée";
          break;

          case "light intensity shower rain":
            meteoDesc = "Légères averses";
          break;

          case "shower rain":
            meteoDesc = "Averses modérées";
          break;

          case "heavy intensity shower rain":
            meteoDesc = "Grosses averses";
          break;

          case "ragged shower rain":
            meteoDesc = "Pluie intermittente";
          break;


          // Group 6XX : Snow
          case "light snow":
            meteoDesc = "Faibles tombées de neige";
          break;

          case "snow":
            meteoDesc = "Averses neigeuses";
          break;

          case "heavy snow":
            meteoDesc = "Grosses averses neigeuses";
          break;

          case "sleet":
            meteoDesc = "Averses de neige fondue";
          break;

          case "shower sleet":
            meteoDesc = "Grosses averses de neige fondue";
          break;

          case "light rain and snow":
            meteoDesc = "Faible mélange pluie/neige";
          break;

          case "rain and snow":
            meteoDesc = "Mélange pluie/neige";
          break;

          case "light shower snow":
            meteoDesc = "Faible averses neigeuses";
          break;

          case "shower snow":
            meteoDesc = "Averses neigeuses";
          break;

          case "heavy shower snow":
            meteoDesc = "Grosses averses neigeuses";
          break;



          // Group 7XX : Atmosphere
          case "mist":
            meteoDesc = "Brume";
          break;

          case "smoke":
            meteoDesc = "Fumée";
          break;

          case "haze":
            meteoDesc = "Brume";
          break;

          case "sand, dust whirls":
            meteoDesc = "Tourbillons de poussière";
          break;

          case "fog":
            meteoDesc = "Brouillard";
          break;

          case "sand":
            meteoDesc = "Sable";
          break;

          case "volcanic ash":
            meteoDesc = "Poussière volcanique";
          break;

          case "squalls":
            meteoDesc = "Bourrasques";
          break;

          case "tornado":
            meteoDesc = "Tornades";
          break;


          // Group 80X : Clear & Clouds
          case "clear sky":
            meteoDesc = "Ciel dégagé";
          break;

          case "few clouds":
            meteoDesc = "Ciel peu nuageux";
          break;

          case "scattered clouds":
            meteoDesc = "Nuages dispersés";
          break;

          case "broken clouds":
            meteoDesc = "Nuages dispersés";
          break;

          case "overcast clouds":
            meteoDesc = "Ciel couvert";
          break;


          // Group 90X : Extreme
          case "tornado":
            meteoDesc = "Tornades";
          break;

          case "tropical storm":
            meteoDesc = "Tempête tropicale";
          break;

          case "hurricane":
            meteoDesc = "Ouragan";
          break;

          case "cold":
            meteoDesc = "Froid";
          break;

          case "hot":
            meteoDesc = "Chaud";
          break;

          case "windy":
            meteoDesc = "Venteux";
          break;

          case "hail":
            meteoDesc = "Grêle";
          break;


          // AUTRES
          default:
            meteoDesc = 'ERREUR ! Description inconnue...';
        }

        // Traduction de l'angle de provenance du vent en direction :
        temp = response.list[0].wind.deg;
        if ((temp >= 0) && (temp < 22.5)) {
            meteoWindDir = "⬇️ Nord";
          } else if ((temp >= 22.5) && (temp <= 67.5)) {
            meteoWindDir = "↙️ Nord-Est";
          } else if ((temp > 67.5) && (temp < 112.5)) {
            meteoWindDir = "⬅️ Est";
          } else if ((temp >= 112.5) && (temp <= 157.5)) {
            meteoWindDir = "↖️ Sud-Est";
          } else if ((temp > 157.5) && (temp < 202.5)) {
            meteoWindDir = "⬆️ Sud";
          } else if ((temp >= 202.5) && (temp <= 247.5)) {
            meteoWindDir = "↗️ Sud-Ouest";
          } else if ((temp > 247.5) && (temp < 292.5)) {
            meteoWindDir = "➡️ Ouest";
          } else if ((temp >= 292.5) && (temp <= 337.5)) {
            meteoWindDir = "↘️ Nord-Ouest";
          } else if ((temp > 337.5) && (temp <= 360)) {
            meteoWindDir = "⬇️ Nord";
          } else {
            meteoWindDir = "Erreur !";
        }


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
          tweetIt(meteo);

          // Si le tweet contient une erreur :
        } else {

          // Envoie d'un tweet d'erreur :
          console.log("@" + user + error + "\n\n\n");
          tweetIt("@" + user + error);

        }

      }


    })



    // Si la localisation n'est pas activée :
  } else {

    // Envoie message d'erreur : activer localisation
    tweetIt("@" + user + errorNoLoc);

  }


}






// Envoie du tweet :
function tweetIt(meteo) {

  // Tweet a envoyer :
  var tweet = {
    status: meteo
  }


  // Construction du tweet via  l'API de Twit :
  T.post('statuses/update', tweet, posted);


  // Callback (debug) :
  function posted(err, data, response) {
    if (err) {
      console.log("Le tweet n'a pas été envoyé : " + err + "\n\n============================\n\n");
    } else {
      console.log("Le tweet a bien été envoyé !");
    }
  }

}
