import * as dotenv from 'dotenv';
import * as path from 'path';
import * as restify from 'restify';
import * as botbuilder from 'botbuilder';
import plugin from './plugins/greeting/index'

// Load configuration in process.env from the .env file
dotenv.config();

let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log('%s listening to %s', server.name, server.url);
});

let connector = new botbuilder.ChatConnector({
    appId: process.env.BOT_APP_ID,
    appPassword: process.env.BOT_APP_PASSWD
});
server.post('/api/messages', connector.listen());

let bot = new botbuilder.UniversalBot(connector, (session: botbuilder.Session) => {
    session.endDialog("Sorry, I did not understand you");
});

const model = process.env.LUIS_MODEL;

bot.recognizer(new botbuilder.LuisRecognizer(model));

bot.library(plugin);

bot.dialog('help', [
    (session) => {
        session.endDialog('Need help?, try asking me something like: What is the value of Awesome strock? and I give you the value');
    }
]).triggerAction({
    matches: 'picnic.intent.help'
});