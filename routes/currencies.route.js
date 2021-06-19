const express = require('express');
const router = express.Router();
const controller = require('../controllers/currencies.controller');


router
    .get('/', controller.getCurrencies)
    .put('/', controller.recountCurrencies)


module.exports = router;
