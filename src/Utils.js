// ====================================================
// ====================================================
// == Heure actuelle (au format hh:mm)  ===============
// ====================================================
// ====================================================

var getHour = function () {

  // Permet d'afficher 09h09 au lieu de 9h9 :
  function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    } return i;
  }

  time = new Date();
  return addZero(time.getHours()) + "h" + addZero(time.getMinutes());
}


// On rend les méthodes accessibles :
exports.getHour = getHour;






// ====================================================
// ====================================================
// == Heure actuelle (au format hh:mm:ss)  ===============
// ====================================================
// ====================================================

var getHourWithSeconds = function () {

  // Permet d'afficher 09h09:09 au lieu de 9h9:9 :
  function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    } return i;
  }

  time = new Date();
  return addZero(time.getHours()) + "h" + addZero(time.getMinutes() + ":" + addZero(time.getSeconds()));
}


// On rend les méthodes accessibles :
exports.getHourWithSeconds = getHourWithSeconds;





// ====================================================
// ====================================================
// == Date atuelle (au format jj/mm/aa)  ==============
// ====================================================
// ====================================================

var getTodaysDate = function () {

  // Permet d'afficher 01/01/18 au lieu de 1/1/18 :
  function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    } return i;
  }

  date = new Date();
  return addZero(date.getDate()) + "/" + addZero(date.getMonth()+1) + "/" + date.getFullYear();
}


// On rend les méthodes accessibles :
exports.getTodaysDate = getTodaysDate;





// ====================================================
// ====================================================
// == Traduction du pays ==============================
// ====================================================
// ====================================================

var tradPays = function (country) {

  switch (country) {
    // FRANCE
    case "France":
      country = ",FR";
      break;

    // BELGIQUE
    case "Belgique":
      country = ",BE";
      break;
    case "Belgium":
      country = ",BE";
      break;

    // CANADA & QUÉBEC
    case "Canada":
      country = ",CA";
      break;
    case "Quebec":
      country = ",CA";
      break;
    case "Québec":
      country = ",CA";
      break;

    // SUISSE
    case "Suisse":
      country = ",CH";
      break;
    case "Switzerland":
      country = ",CH";
      break;

    default:
      country = country;
  }

  return country;
}

// On rend la méthode accessible :
exports.tradPays = tradPays;
