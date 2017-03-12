const restify = require('restify'),
      request = require('request'),
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
        session.send('Tell me what I can do for you');
    }
]).triggerAction({
    matches: 'picnic.intent.help'
})

//Dialog to know price of value

bot.dialog('consultPrice', [
    (session, args, next) => {
        let intent = args.intent;
        let name = botbuilder.EntityRecognizer.findEntity(intent.entities, 'picnic.value.name');
        let value = session.dialogData.value = {
            name: name ? name.entity : null
        };
    },

    (session, results, next) => {
        let value = session.dialogData.value;
    },
    (session, results) => {
        let price
        request("")
        session.endDialog(`Price of ${session.dialogData.value}: ${price}`)
    }
]).triggerAction({
    matches: 'picnic.intent.consultPrice'
})
*/
