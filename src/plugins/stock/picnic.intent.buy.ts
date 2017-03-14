import * as BotBuilder from 'botbuilder';
import * as fs from 'fs';
import * as _ from 'lodash';


// This dialog is managed by this discrete steps
export default [
    numberStock,
    costStock,
    buyStock
];

function numberStock(session: BotBuilder.Session, args:any, next: Function) {
    BotBuilder.Prompts.number(session, 'How many stocks do you want to buy?');
}

function costStock(session:BotBuilder.Session, args: any, next: Function) {
    if(!args.response) {
        return session.endDialog('Okay I don\'t buy it');
    }
    if(isNaN(args.response)) {
        return session.endDialog('This is not a valid number');
    }
    session.dialogData.number = args.respone;
    value(args.response, session);
}


async function buyStock(session: BotBuilder.Session, args: any) {
    if(!args.response) {
        return session.endDialog('Sure, I don\'t do it');
    }
    session.send(`Okey, I\'m going to buy it`);
    await sleep(3000);
    session.endDialog('Great, you have new stocks');
}

function sleep (time: any) {
    return new Promise (resolve => setTimeout(resolve, time));
}

function value(number: number, session: BotBuilder.Session): Promise<void> {
    return new Promise<void> (() => {
        fs.readFile('quote.csv', (err, data) => {
            if (err) {
                console.log('ERROR: ', err);
            } else {
                let value = Number(_.split(data.toString(), ',')[4]);
                let cost = number * value;
                BotBuilder.Prompts.confirm(session, `The cost of the operation will be ${cost}, Are you sure ?`);
            }
        });
    });
}