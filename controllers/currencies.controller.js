const currenciesService = require('../services/currencies.service')

class CurrenciesController{
    constructor() {
        // this.get = this.get.bind(this)
    }

    service = currenciesService;

    getCurrencies = async (req, res)  => {
        res
            .status(200)
            .send(await this.service.getCurrenciesTable())
    }
    recountCurrencies = (req, res) => {
        res
            .status(200)
            .send(this.service.recountCurrencies(req.body['curAbbreviation'], req.body['curQuantity']))
    }
}

module.exports = new CurrenciesController();
