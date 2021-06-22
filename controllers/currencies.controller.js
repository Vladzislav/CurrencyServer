const currenciesService = require('../services/currencies.service')

class CurrenciesController{

    service = currenciesService;

    getCurrencies = async (req, res)  => {
        res
            .status(200)
            .send(await this.service.getCurrenciesTable(req.body.list))
    }
    recountCurrencies = (req, res) => {
        res
            .status(200)
            .send(this.service.recountCurrencies(req.body['curAbbreviation'], req.body['curQuantity'], req.body.list))
    }
}

module.exports = new CurrenciesController();
