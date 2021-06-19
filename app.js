const express = require('express');
const bodyParser = require('body-parser');
const currenciesRouter = require('./routes/currencies.route');
// require('dotenv').config()

const app = express();
app.use(bodyParser.json());
app.use('/currencies', currenciesRouter);

app.listen(3000, () => {
    console.log('Server started at port:3000')
})
// console.log(process.env.CURRENCIES_LINK)
