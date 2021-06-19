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
}

module.exports = new CurrenciesController();
