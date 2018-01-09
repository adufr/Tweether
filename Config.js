// Nom du compte :
var accountName = "Tweether01";

// Messages d'erreur :
var error = "\n\n⚠️ Une erreur est survenue lors de l'envoi de votre bulletin météo !\n\n⚠️ Si le problème persiste, merci de contacter @ Woosy__\n📝 https://github.com/Woosy/Tweether/issues/new";
var errorNoLoc = "\n\n⚠️ Une erreur est survenue lors de l'envoi de votre bulletin météo !\n⚠️ Vous n'avez pas défini de localisation sur votre page de profil !\n\n⚠️ Si le problème persiste, merci de contacter @ Woosy__\n📝 https://github.com/Woosy/Tweether/issues/new";
var errorInvalidLoc = "\n\n⚠️ Une erreur est survenue lors de l'envoi de votre bulletin météo !\n⚠️ Veuillez indiquer une localisation valide !\n\n⚠️ Si le problème persiste, merci de contacter @ Woosy__\n📝 https://github.com/Woosy/Tweether/issues/new";

// Changelog :
var version = "v0.5-1";
var changelog = "📢🆕 Tweether passe en version " + version + " !\n\n📝 Changelog :\n🔘 Ajout système de changelog\n🔘 Icône dynamique pour la météo\n🔘 La température est désormais arrondie\n🔘 Optimisation du code\n\n⚠️ Si vous rencontrez un bug : contactez Woosy__ !\n📝 https://github.com/Woosy/Tweether/issues/new";
    // Ajout        ->   🔘
    // Modification ->   🔘
    // Suppression  ->   ⚪️




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


var getVersion = function() {
  return version;
}

var getChangelog = function() {
  return changelog;
}




// On rend les fonctions visibles pour les autres fichiers :
exports.getAccountName = getAccountName;
exports.getError = getError;
exports.getErrorNoLoc = getErrorNoLoc;
exports.getErrorInvalidLoc = getErrorInvalidLoc;

exports.getVersion = getVersion;
exports.getChangelog = getChangelog;
