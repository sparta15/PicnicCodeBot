import * as BotBuilder from 'botbuilder';
import * as request from 'request';
import * as fs from 'fs';
import * as _ from 'lodash';

const dictionary = [
    { key: 'APPLE', value: 'AAPL' },
    { key: 'GOOGLE', value: 'GOOGL' },
    { key: 'FACEBOOK', value: 'FB' },
    { key: 'IBM', value: 'IBM' },
    { key: 'NKE',  value: 'NIKE' }
];

// This dialog is managed by this discrete steps
export default [
    mapStock,
    priceStock
];

function mapStock(session: BotBuilder.Session, args: any, next:Function) {
    let stockName = BotBuilder.EntityRecognizer.findEntity(args.intent.entities, 'company');
    let upper = _.toUpper(stockName.entity);
    let stockacronym = dictionary.filter((item) => {
        return item.key === upper;
    });
    session.dialogData.company = stockacronym[0].value;
    next();
};

function priceStock(session: BotBuilder.Session, args: any, next: Function) {
    let stream = request.get(`http://finance.yahoo.com/d/quotes.csv?s=${session.dialogData.company}&f=sb2b3jk`)
                        .pipe(fs.createWriteStream('quote.csv'));
    stream.on('finish', () => { fs.readFile('quote.csv', (err, data) => {
                                    if(err) console.log('ERROR: ', err);
                                    else {
                                        let value = _.split(data.toString(), ',')[4];
                                        session.endDialog(`The value of ${session.dialogData.company} is : ${value}`);
                                    }
                              })}
};
