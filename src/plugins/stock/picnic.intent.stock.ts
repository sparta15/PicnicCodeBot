import * as BotBuilder from 'botbuilder';
import * as request from 'request';
import * as fs from 'fs';
import * as _ from 'lodash';

const dictionary = [
    { key: 'TELEFONICA', value: 'TEF'},
    { key: 'APPLE', value: 'AAPL' },
    { key: 'GOOGLE', value: 'GOOGL' },
    { key: 'FACEBOOK', value: 'FB' },
    { key: 'IBM', value: 'IBM' },
    { key: 'NIKE',  value: 'NKE' }
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
    if (stockacronym.length === 0) {
        return session.endDialog('I don\'t know about this company');
    }
    session.dialogData.company = stockacronym[0].value;
    next();
};

function priceStock(session: BotBuilder.Session, args: any, next: Function) {
    let company = session.dialogData.company;
    let stream = request.get(`http://finance.yahoo.com/d/quotes.csv?s=${company}&f=sb2b3jk`)
                        .pipe(fs.createWriteStream('quote.csv'));

    stream.on('finish', () => {
        fs.readFile('quote.csv', (err, data) => {
            if (err) {
                console.log('ERROR: ', err);
            } else {
                let value = _.split(data.toString(), ',')[4];
                session.send(`The value of ${company} is : ${value}`);

                let attachment: BotBuilder.IAttachment = {
                    contentUrl: `https://chart.finance.yahoo.com/z?s=${company}&t=6m&q=l&l=on&z=s&p=m50,m100`,
                    contentType: 'image/png'
                };

                let msg = new BotBuilder.Message(session).attachments([attachment]);
                session.endDialog(msg);
            }
        })
    });
};
