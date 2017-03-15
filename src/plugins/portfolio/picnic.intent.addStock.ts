import * as BotBuilder from 'botbuilder';
import * as fs from 'fs';
import * as _ from 'lodash';


// This dialog is managed by this discrete steps
export default [
    amountStock,
    addStock
];

function addStock(session: BotBuilder.Session, args: any, next: Function) {
    let stockName = BotBuilder.EntityRecognizer.findEntity(args.intent.entities, 'company');
    if(stockName.entity.length === 0) {

    }
}

function amountStock(session: BotBuilder.Session, args: any, next: Function) {
    
}
