const express = require('express');
const router = express.Router();
const controller = require('../controllers/currencies.controller');


router
    .put('/list', controller.getCurrencies)
    .put('/recount', controller.recountCurrencies)


module.exports = router;
