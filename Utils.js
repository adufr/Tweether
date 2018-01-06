// Récupère l'heure actuelle (format hh:mm) :
var getHour = function () {

  function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    } return i;
  }

  time = new Date();
  return addZero(time.getHours()) + "h" + addZero(time.getMinutes());
}

// On rend la fonction visible pour les autres fichiers :
exports.getHour = getHour;
