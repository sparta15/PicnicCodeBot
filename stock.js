'use strict'

const request = require('request'),
      _ = require('lodash');

const dictionary = {
    'APPLE' : 'APPL',
    "GOOGLE": 'GOOGL',
    "FACEBOOK" : "FB",
    "IBM": "IBM",
    'NIKE' : 'NKE'
};

module.exports = {
    mapStock,
    priceStock
};

function mapStock(stockName) {
    let stockacronym = _.findKey(dictionary, _.toUpper(stockName));
    return stockacronym;
};

function priceStock(stockacronym) {
    let quote = request.get(`http://finance.yahoo.com/d/quotes.csv?s=${stockacronym}&f=sb2b3jk`);
};


