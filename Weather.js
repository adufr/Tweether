// Traduction de la "description" vers le français :
var translateDesc = function (description) {

  switch (description) {

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
      meteoDesc = "angleête tropicale";
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

}

// On rend la fonction visible pour les autres fichiers :
exports.translateDesc = translateDesc;




// Traduction de l'angle en chaîne de caractère avec emoticone :
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
    meteoWindDir = "Erreur !";
  }

}

// On rend la fonction visible pour les autres fichiers :
exports.getWindDir = getWindDir;
