// ====================================================
// ====================================================
// == Initialisation :  ===============================
// ====================================================
// ====================================================

// Packages :
const Twit = require('twit');
// Autres fichiers :
const login = require('./Login');
const twitter = require('./Twitter');
const config = require('./Config');
const temp = require('./Temp');

// Création instance bot avec les tokens situés dans le fichier login :
var T = new Twit(login);


// ====================================================
// ====================================================
// == Ecoute des Tweets :  ============================
// ====================================================
// ====================================================

// Création du stream :
var stream = T.stream('user');
stream.on('tweet', tweetEvent);

function tweetEvent(eventMsg) {

    /* On récupère les informations nécessaires
    à partir du Tweet qui a été envoyé au bot */
    var receiver = eventMsg.in_reply_to_screen_name;
    var message = eventMsg.text;
    var from = eventMsg.user.screen_name;
    var tweetId = eventMsg.id_str;

    // Lorsque l'on tag le bot :
    if (receiver == config.getAccountName()) {

        // On vérifie que le message commence bien par le @ du bot
        if (message.startsWith("@" + config.getAccountName()) !=-1) {
            var text = message.replace('@' + config.getAccountName() + ' ',"");
            temp.whatsTheWeatherIn(text, from, tweetId);
            twitter.favTweet(tweetId);
        }

    }

}