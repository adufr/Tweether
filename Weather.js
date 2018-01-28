// ====================================================
// ====================================================
// == Traduction & Récupération de l'icône :  =========
// ====================================================
// ====================================================


var translateDesc = function (description) {

  switch (description) {

    // Group 2XX : Thunderstorm
    case "thunderstorm with light rain":
      meteoDesc = "Orage avec légères averses";
      meteoIcon = "⛈️";
    break;

    case "thunderstorm with rain":
      meteoDesc = "Orage avec pluie";
      meteoIcon = "⛈️";
    break;

    case "thunderstorm with heavy rain":
      meteoDesc = "Orage avec grosses averses";
      meteoIcon = "⛈️";
    break;

    case "light thunderstorm":
      meteoDesc = "Orage léger";
      meteoIcon = "🌩️";
    break;

    case "thunderstorm":
      meteoDesc = "Orage";
      meteoIcon = "🌩️";
    break;

    case "heavy thunderstorm":
      meteoDesc = "Gros orage";
      meteoIcon = "🌩️";
    break;

    case "ragged thunderstorm":
      meteoDesc = "Orage irrégulier";
      meteoIcon = "🌩️";
    break;

    case "thunderstorm with light drizzle":
      meteoDesc = "Orage avec légère bruine";
      meteoIcon = "⛈️";
    break;

    case "thunderstorm with drizzle":
      meteoDesc = "Orage avec bruine";
      meteoIcon = "⛈️";
    break;

    case "thunderstorm with heavy drizzle":
      meteoDesc = "Orage avec bruine a forte intensité";
      meteoIcon = "⛈️";
    break;



    // Group 3XX : Drizzle
    case "light intensity drizzle":
      meteoDesc = "Bruine légère";
      meteoIcon = "🌧️";
    break;

    case "drizzle":
      meteoDesc = "Bruine";
      meteoIcon = "🌧️";
    break;

    case "heavy intensity drizzle":
      meteoDesc = "Bruine a forte intensité";
      meteoIcon = "🌧️";
    break;

    case "light intensity drizzle rain":
      meteoDesc = "Bruine légère et pluie";
      meteoIcon = "🌧️";
    break;

    case "drizzle rain":
      meteoDesc = "Bruine et pluie";
      meteoIcon = "🌧️";
    break;

    case "heavy intensity drizzle rain":
      meteoDesc = "Bruine a forte intensité et pluie";
      meteoIcon = "🌧️";
    break;

    case "shower rain and drizzle":
      meteoDesc = "Bruine a forte intensité et pluie";
      meteoIcon = "🌧️";
    break;

    case "heavy shower rain and drizzle":
      meteoDesc = "Bruine a forte intensité et grosses averses";
      meteoIcon = "🌧️";
    break;

    case "shower drizzle":
      meteoDesc = "Bruine a forte intensité";
      meteoIcon = "🌧️";
    break;





    // Group 5XX : rain
    case "light rain":
      meteoDesc = "Légères averses";
      meteoIcon = "🌧️";
    break;

    case "moderate rain":
      meteoDesc = "Averses modérées";
      meteoIcon = "🌧️";
    break;

    case "heavy intensity rain":
      meteoDesc = "Averses";
      meteoIcon = "🌧️";
    break;

    case "very heavy rain":
      meteoDesc = "Grosses averses";
      meteoIcon = "🌧️";
    break;

    case "Extreme rain":
      meteoDesc = "Averses extremes";
      meteoIcon = "🌧️";
    break;

    case "freezing rain":
      meteoDesc = "Pluie gelée";
      meteoIcon = "🌧️";
    break;

    case "light intensity shower rain":
      meteoDesc = "Légères averses";
      meteoIcon = "🌧️";
    break;

    case "shower rain":
      meteoDesc = "Averses modérées";
      meteoIcon = "🌧️";
    break;

    case "heavy intensity shower rain":
      meteoDesc = "Grosses averses";
      meteoIcon = "🌧️";
    break;

    case "ragged shower rain":
      meteoDesc = "Pluie intermittente";
      meteoIcon = "🌧️";
    break;


    // Group 6XX : Snow
    case "light snow":
      meteoDesc = "Faibles tombées de neige";
      meteoIcon = "🌨️";
    break;

    case "snow":
      meteoDesc = "Averses neigeuses";
      meteoIcon = "🌨️";
    break;

    case "heavy snow":
      meteoDesc = "Grosses averses neigeuses";
      meteoIcon = "🌨️";
    break;

    case "sleet":
      meteoDesc = "Averses de neige fondue";
      meteoIcon = "🌨️";
    break;

    case "shower sleet":
      meteoDesc = "Grosses averses de neige fondue";
      meteoIcon = "🌨️";
    break;

    case "light rain and snow":
      meteoDesc = "Faible mélange pluie/neige";
      meteoIcon = "🌨️";
    break;

    case "rain and snow":
      meteoDesc = "Mélange pluie/neige";
      meteoIcon = "🌨️";
    break;

    case "light shower snow":
      meteoDesc = "Faible averses neigeuses";
      meteoIcon = "🌨️";
    break;

    case "shower snow":
      meteoDesc = "Averses neigeuses";
      meteoIcon = "🌨️";
    break;

    case "heavy shower snow":
      meteoDesc = "Grosses averses neigeuses";
      meteoIcon = "🌨️";
    break;



    // Group 7XX : Atmosphere
    case "mist":
      meteoDesc = "Brume";
      meteoIcon = "☁️";
    break;

    case "smoke":
      meteoDesc = "Fumée";
      meteoIcon = "☁️";
    break;

    case "haze":
      meteoDesc = "Brume";
      meteoIcon = "☁️";
    break;

    case "sand, dust whirls":
      meteoDesc = "Tourbillons de poussière";
      meteoIcon = "🌪️";
    break;

    case "fog":
      meteoDesc = "Brouillard";
      meteoIcon = "☁️";
    break;

    case "sand":
      meteoDesc = "Sable";
      meteoIcon = "🌪️";
    break;

    case "volcanic ash":
      meteoDesc = "Poussière volcanique";
      meteoIcon = "☁️";
    break;

    case "squalls":
      meteoDesc = "Bourrasques";
      meteoIcon = "🌪️";
    break;

    case "tornado":
      meteoDesc = "Tornades";
      meteoIcon = "🌪️";
    break;


    // Group 80X : Clear & Clouds
    case "clear sky":
      meteoDesc = "Ciel dégagé";
      meteoIcon = "☀️";
    break;

    case "few clouds":
      meteoDesc = "Ciel peu nuageux";
      meteoIcon = "🌤️";
    break;

    case "scattered clouds":
      meteoDesc = "Nuages dispersés";
      meteoIcon = "🌤️";
    break;

    case "broken clouds":
      meteoDesc = "Nuages dispersés";
      meteoIcon = "🌤️";
    break;

    case "overcast clouds":
      meteoDesc = "Ciel couvert";
      meteoIcon = "☁️";
    break;


    // Group 90X : Extreme
    case "tornado":
      meteoDesc = "Tornades";
      meteoIcon = "🌪️";
    break;

    case "tropical storm":
      meteoDesc = "Tempête tropicale";
      meteoIcon = "🌪️";
    break;

    case "hurricane":
      meteoDesc = "Ouragan";
      meteoIcon = "🌪️";
    break;

    case "cold":
      meteoDesc = "Froid";
      meteoIcon = "❄️";
    break;

    case "hot":
      meteoDesc = "Chaud";
      meteoIcon = "☀️";
    break;

    case "windy":
      meteoDesc = "Venteux";
      meteoIcon = "🌪️";
    break;

    case "hail":
      meteoDesc = "Grêle";
      meteoIcon = "❄️";
    break;


    // AUTRES
    default:
      meteoDesc = "Une erreur est survenue";
      meteoIcon = "❌";
  }

}

// On rend la méthode accessible :
exports.translateDesc = translateDesc;



// ====================================================
// ====================================================
// == Traduction de l'angle en message avec emoji :  ==
// ====================================================
// ====================================================


var getWindDir = function (angle) {

  if ((angle >= 0) && (angle < 22.5)) {
    meteoWindDir = "⬇️ Nord";
  } else if ((angle >= 22.5) && (angle <= 67.5)) {
    meteoWindDir = "↙️ Nord-Est";
  } else if ((angle > 67.5) && (angle < 112.5)) {
    meteoWindDir = "⬅️ Est";
  } else if ((angle >= 112.5) && (angle <= 157.5)) {
    meteoWindDir = "↖️ Sud-Est";
  } else if ((angle > 157.5) && (angle < 202.5)) {
    meteoWindDir = "⬆️ Sud";
  } else if ((angle >= 202.5) && (angle <= 247.5)) {
    meteoWindDir = "↗️ Sud-Ouest";
  } else if ((angle > 247.5) && (angle < 292.5)) {
    meteoWindDir = "➡️ Ouest";
  } else if ((angle >= 292.5) && (angle <= 337.5)) {
    meteoWindDir = "↘️ Nord-Ouest";
  } else if ((angle > 337.5) && (angle <= 360)) {
    meteoWindDir = "⬇️ Nord";
  } else {
    meteoWindDir = "Direction indéterminée";
  }

}

// On rend la méthode accessible :
exports.getWindDir = getWindDir;




// ====================================================
// ====================================================
// == Message de fin (dépendant de divers paramètres ==
// ====================================================
// ====================================================


var getMessage = function(meteoClouds, meteoCurrTemp) {

  // ~ Temporaire ~
  if (meteoCurrTemp > 30) {
    return "Il fait chaud : pensez à bien vous hydrater !";
  } else

  if ((meteoCurrTemp < 3) && (meteoCurrTemp > -2)) {
    return "Attention : risque de verglas !";
  } else {
    return "Rien de particulier !"
  }

}

// On rend la méthode accessible :
exports.getMessage = getMessage;
