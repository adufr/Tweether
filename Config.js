// Nom du compte :
var accountName = "Tweether01";

// Messages d'erreur :
var error = "\n\n⚠️ Une erreur est survenue lors de l'envoi de votre bulletin météo !\n\n⚠️ Si le problème persiste, merci de contacter @ Woosy__\n📝 https://github.com/Woosy/Tweether/issues/new";
var errorNoLoc = "\n\n⚠️ Une erreur est survenue lors de l'envoi de votre bulletin météo !\n⚠️ Vous n'avez pas défini de localisation sur votre page de profil !\n\n⚠️ Si le problème persiste, merci de contacter @ Woosy__\n📝 https://github.com/Woosy/Tweether/issues/new";
var errorInvalidLoc = "\n\n⚠️ Une erreur est survenue lors de l'envoi de votre bulletin météo !\n⚠️ Veuillez indiquer une localisation valide !\n\n⚠️ Si le problème persiste, merci de contacter @ Woosy__\n📝 https://github.com/Woosy/Tweether/issues/new";




// On créer les methodes pour récupérer les variables
var getAccountName = function() {
  return accountName;
}

var getError = function() {
  return error;
}

var getErrorNoLoc = function() {
  return errorNoLoc;
}

var getErrorInvalidLoc = function() {
  return errorInvalidLoc;
}





// On rend les fonctions visibles pour les autres fichiers :
exports.getAccountName = getAccountName;
exports.getError = getError;
exports.getErrorNoLoc = getErrorNoLoc;
exports.getErrorInvalidLoc = getErrorInvalidLoc;
