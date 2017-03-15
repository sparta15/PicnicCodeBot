import * as dotenv from 'dotenv';
import * as path from 'path';
import * as restify from 'restify';
import * as botbuilder from 'botbuilder';
import greeting from './plugins/greeting/index'

// Load configuration in process.env from the .env file
dotenv.config();

//Create the server that will be use to receive messages
let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log('%s listening to %s', server.name, server.url);
});

let connector = new botbuilder.ChatConnector({
    appId: process.env.BOT_APP_ID,
    appPassword: process.env.BOT_APP_PASSWD
});

server.post('/api/messages', connector.listen());

//Create bot and give a defalt messages
let bot = new botbuilder.UniversalBot(connector, (session: botbuilder.Session) => {
    session.endDialog("Sorry, I did not understand you");
});

const model = process.env.LUIS_MODEL;

//Integration with LUIS
bot.recognizer(new botbuilder.LuisRecognizer(model));

// Set default locale
bot.set('localizerSettings', {
    botLocalePath: path.join(__dirname, '..', 'locale'),
    defaultLocale: 'en-us'
});

//Add library to use plugin greeting
bot.library(greeting);