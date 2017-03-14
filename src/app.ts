import * as dotenv from 'dotenv';
import * as path from 'path';
import * as restify from 'restify';
import * as BotBuilder from 'botbuilder';
import greeting from './plugins/greeting/index'
import help from './plugins/help/index'
import stock from './plugins/stock/index'

// Load configuration in process.env from the .env file
dotenv.config();

let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log('%s listening to %s', server.name, server.url);
});

let connector = new BotBuilder.ChatConnector({
    appId: process.env.BOT_APP_ID,
    appPassword: process.env.BOT_APP_PASSWD
});
server.post('/api/messages', connector.listen());

let bot = new BotBuilder.UniversalBot(connector, (session: BotBuilder.Session) => {
    session.endDialog("Sorry, I did not understand you");
});

const model = process.env.LUIS_MODEL;

bot.recognizer(new BotBuilder.LuisRecognizer(model));

// Set default locale
bot.set('localizerSettings', {
    botLocalePath: path.join(__dirname, '..', 'locale'),
    defaultLocale: 'en-us'
});

bot.library(greeting);
bot.library(help);
bot.library(stock);