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
