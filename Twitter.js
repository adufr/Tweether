// On déclare l'instance du bot avec les logins situés dans le fichier config
var Twit = require('twit');
var login = require('./Login');
var T = new Twit(login);


// Envoie d'un Tweet (message créé & formaté au préalable) :
var sendTweet = function (message) {

  // Tweet a envoyer :
  var tweet = {
    status: message
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

// On rend la fonction visible pour les autres fichiers :
exports.sendTweet = sendTweet;
