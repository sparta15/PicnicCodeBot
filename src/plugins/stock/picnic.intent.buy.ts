import * as BotBuilder from 'botbuilder';
import * as fs from 'fs';
import * as _ from 'lodash';


// This dialog is managed by this discrete steps
export default [
    buyStock
];

async function buyStock(session: BotBuilder.Session, args: any) {
    session.send(`Okey, I\'m going to buy 5 of it`);
    await sleep(3000);
    session.endDialog('Great, you have new stocks');
}

function sleep (time: any) {
    return new Promise (resolve => setTimeout(resolve, time));
}