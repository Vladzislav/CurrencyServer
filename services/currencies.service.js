request = require('request-promise')
const fs = require("fs")
require('dotenv').config()


class CurrenciesService {
    getCurrenciesTable = async () => {
        const currencies = await request({uri: process.env.CURRENCIES_LINK, method: 'GET'});
        const currenciesNames = await request({uri: process.env.CURRENCIES_NAMES_LINK, method: 'GET'});

        const curTableBYN = JSON.parse(currencies).map(currency => {
            if(currency['Cur_Scale'] !== 1) {
                let curName = JSON.parse(currenciesNames)['main']['ru']['numbers']['currencies'][currency['Cur_Abbreviation']]['displayName'];
                curName = curName[0].toUpperCase() + curName.slice(1);

                return {curAbbreviation: currency['Cur_Abbreviation'],
                    curName,
                    curRate: (currency['Cur_OfficialRate']/currency['Cur_Scale']).toFixed(4)};
                    // curRate: (currency['Cur_OfficialRate']/currency['Cur_Scale'])};
            }
            else{
                return {curAbbreviation: currency['Cur_Abbreviation'],
                    curName: currency['Cur_Name'],
                    curRate: currency['Cur_OfficialRate'].toFixed(4)};
            }
        })
        curTableBYN.push({curAbbreviation:'BYN', curName: 'Белорусский рубль', curRate: 1});

        fs.writeFileSync("currenciesTable.json", JSON.stringify(curTableBYN), 'utf-8');

        return this.recountCurrencies('USD', 1);

    }

    recountCurrencies = (curAbbreviation, curQuantity) => {
        const curTable = JSON.parse(fs.readFileSync("currenciesTable.json", "utf-8"))

        const mainCurRate = curTable.find(currency => {
            return currency['curAbbreviation'] === curAbbreviation;
        })['curRate'];

        return curTable.map(currency => {
            const currentCurrencyRate = currency['curRate'];
            currency['curRate'] = parseFloat((curQuantity*mainCurRate/currentCurrencyRate).toFixed(4));
            return currency;
        })
    }
}

module.exports = new CurrenciesService();
