// ====================================================
// ====================================================
// == Initialisation :  ===============================
// ====================================================
// ====================================================


// Packages :
const Twit = require('twit');
const getJSON = require('get-json')
// Autres fichiers :
const login = require('./Login');
const weather = require('./Weather');
const twitter = require('./Twitter');
const utils = require('./Utils');
const config = require('./Config');
const version = require('./Version');
const logs = require('./Logs');
const temp = require('./Temp');



// Création instance bot avec les tokens situés dans le fichier login :
//
//  module.exports = {
//    consumer_key:         'replace_by_consumer_key',
//    consumer_secret:      'replace_by_consumer_secret',
//    access_token:         'replace_by_access_token',
//    access_token_secret:  'replace_by_token_secret',
//    timeout_ms:           60*1000, // Optional
//  }
//

var T = new Twit(login);



// ====================================================
// ====================================================
// == Ecoute des Tweets :  ============================
// ====================================================
// ====================================================

var stream = T.stream('user');

stream.on('tweet', tweetEvent);

function tweetEvent(eventMsg) {

    /* On récupère les informations nécessaires
    à partir du Tweet qui a été envoyé au bot */
    var receiver = eventMsg.in_reply_to_screen_name;
    var message = eventMsg.text;
    var from = eventMsg.user.screen_name;
    var replyId = eventMsg.id_str;


    // Lorsque l'on tag le bot :
    if (receiver == config.getAccountName()) {

        console.log("@" + from + " message recu : " + message);

        // On vérifie que le message commence bien par le @ du bot
        if (message.startsWith("@" + config.getAccountName()) !=-1) {
            var text = message.replace('@' + config.getAccountName() + ' ',"");
            temp.whatsTheWeatherIn(text, from, replyId);
            console.log(text);
        }

    }


}