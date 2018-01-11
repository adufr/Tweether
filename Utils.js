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
