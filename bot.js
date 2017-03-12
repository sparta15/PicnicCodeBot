const restify = require('restify'),
      request = require('request'),
      stock = require('./stock.js'),
      botbuilder = require('botbuilder');

let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log('%s listening to %s', server.name, server.url);
});

let connector = new botbuilder.ChatConnector({
    appId: process.env.BOT_APP_ID,
    appPassword: process.env.BOT_APP_PASSWD
});
server.post('/api/messages', connector.listen());

let bot = new botbuilder.UniversalBot(connector, (session) => {
    session.endDialog("Sorry, I did not understand you");
});

const model = process.env.LUIS_MODEL;

bot.recognizer(new botbuilder.LuisRecognizer(model));

bot.dialog('picnic.intent.greeting', [
    (session, next) => {
        session.send('Hello, what\' your name?');
        let name = botbuilder.EntityRecognizer.findEntity
    },
    (session, results) => {
        session.userData.name = result.response;
        session.endDialog(`Hi ${session.userData.name}`);
    }
]).triggerAction({
    matches: 'picnic.intent.greeting'
});


bot.dialog('help', [
    (session) => {
        session.send('I am Stockito, you can ask me about whatever stock and I give you the value');
    }
]).triggerAction({
    matches: 'picnic.intent.help'
});

//Dialog to know price of value

bot.dialog('consultPrice', [
    (session, args, next) => {
        let intent = args.intent;
        let name = botbuilder.EntityRecognizer.findEntity(intent.entities, 'picnic.value.name');
        session.dialogData.stockacronym = stock.mapStock(name);
        session.send(`Okay, wait one second. I search about ${name}`);
    },
    (session, results) => {
        let price = stock.priceStock(session.dialogData.stockacronym);
        session.endDialog(`Price of ${session.dialogData.value}: ${price}`)
    }
]).triggerAction({
    matches: 'picnic.intent.consultPrice'
});
