request = require('request-promise')
const fs = require("fs")

function currCalc(curAbbreviation, curQuantity, curTable) {
    const mainCurRate = curTableBYN.find(currency => {
        return currency['curAbbreviation'] === 'USD';
    })['curRate'];
    const curTableUSD = curTableBYN.map(currency => {
        const currentCurrencyRate = currency['curRate'];
        currency['curRate'] = (1*mainCurRate/currentCurrencyRate).toFixed(4);
        return currency;
    })
}


class CurrenciesService {
    getCurrencies = async () => {

        const currencies = await request({uri: 'https://www.nbrb.by/API/ExRates/Rates?Periodicity=0&parammode=2', method: 'GET'});
        const currenciesNames = await request({uri: 'https://raw.githubusercontent.com/unicode-cldr/cldr-numbers-modern/master/main/ru/currencies.json', method: 'GET'});

        const curTableBYN = JSON.parse(currencies).map(currency => {
            if(currency['Cur_Scale'] !== 1) {
                let curName = JSON.parse(currenciesNames)['main']['ru']['numbers']['currencies'][currency['Cur_Abbreviation']]['displayName'];
                curName = curName[0].toUpperCase() + curName.slice(1);

                return {curAbbreviation: currency['Cur_Abbreviation'], curName, curRate: (currency['Cur_OfficialRate']/currency['Cur_Scale']).toFixed(4)};
            }
            else{
                return {curAbbreviation: currency['Cur_Abbreviation'], curName: currency['Cur_Name'], curRate: currency['Cur_OfficialRate'].toFixed(4)};
            }
        })

        curTableBYN.push({curAbbreviation:'BYN', curName: 'Белорусский рубль', curRate: 1});

        fs.writeFileSync("currenciesTable.json", JSON.stringify(curTableBYN), 'utf-8')

        // currCalc();

        //
        const mainCurRate = curTableBYN.find(currency => {
            return currency['curAbbreviation'] === 'USD';
        })['curRate'];
        const curTableUSD = curTableBYN.map(currency => {
            const currentCurrencyRate = currency['curRate'];
            currency['curRate'] = (1*mainCurRate/currentCurrencyRate).toFixed(4);
            return currency;
        })
        //
        this.recountCurrencies()
        return curTableUSD;
    }

    recountCurrencies = (req) => {
        const curTable = JSON.parse(fs.readFileSync("currenciesTable.json", "utf-8"))

        const mainCurRate = curTable.find(currency => {
            return currency['curAbbreviation'] === req.body['curAbbreviation'];
        })['curRate'];

        const curTableResult = curTable.map(currency => {
            const currentCurrencyRate = currency['curRate'];
            currency['curRate'] = (req.body['curQuantity']*mainCurRate/currentCurrencyRate).toFixed(4);
            return currency;
        })
        return curTableResult;
    }
}

module.exports = new CurrenciesService();
