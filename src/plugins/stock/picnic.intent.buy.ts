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
    next();
}

function costStock(session:BotBuilder.Session, args: any, next: Function) {
    if(!args.response) {
        return session.endDialog('Okay I don\'t buy it');
    }
    session.dialogData.number = args.response;
    let amount = cost(session.dialogData.number);
    BotBuilder.Prompts.confirm(session, `The cost of the operation will be ${amount}, Are you sure ?`);
    next();
}

async function buyStock(session: BotBuilder.Session, args: any) {
    if(args.response === 'no'){
        return session.endDialog('Sure, I don\'t d it');
    }
    session.send(`Okey, I\'m going to buy ${session.dialogData.number} of it`);
    await sleep(3000);
    session.endDialog('Great, you have new stocks');
}

function sleep (time: any) {
    return new Promise (resolve => setTimeout(resolve, time));
}

function cost(stocks : number): number {
    let cost : number = 0;
    fs.readFile('quote.csv', (err, data) => {
            if (err) {
                console.log('ERROR: ', err);
            } else {
                let value = _.split(data.toString(), ',')[4];
                cost = Number(value) * stocks;
            }
    })
    return cost;
}