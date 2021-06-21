const express = require('express');
const bodyParser = require('body-parser');
const currenciesRouter = require('./routes/currencies.route');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/currencies', currenciesRouter);

app.listen(3001, () => {
    console.log('Server started at port:3001')
})
