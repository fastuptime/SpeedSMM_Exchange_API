global.axios = require('axios');
global.cron = require('node-cron');
global.express = require('express');
global.app = express();
global.currencys = require('./currency.json');
global.mongoose = require('mongoose');
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/exchangeRate', { useNewUrlParser: true, useUnifiedTopology: true });

const exchangeRateSchema = new mongoose.Schema({
    currency: String,
    date: String,
    rates: Object
}, { timestamps: true });

global.ExchangeRate = mongoose.model('ExchangeRate', exchangeRateSchema);

const ratesFilter = (rates) => {
    rates = JSON.parse(JSON.stringify(rates));
    for (let key in rates) {
        if(!currencys.includes(key.toUpperCase())) {
            delete rates[key];
        }
    }
    return rates;
}

app.use((req, res, next) => {
    if (req.query.key !== 'YOUR_API_KEY') {
        res.json({ status: 'error', message: 'Invalid API key' });
        return;
    }
    next();
});

app.get('/exchange', async (req, res) => {
    try {
        const exchangeRate = await ExchangeRate.find();
        res.json(exchangeRate.map(e => ({
            date: e.date,
            currency: e.currency,
            rates: ratesFilter(e.rates)
        })));
    } catch (error) {
        res.json({ status: 'error', message: error });
    }
});

app.get('/exchange/:currency', async (req, res) => {
    try {
        const exchangeRate = await ExchangeRate.findOne({ currency: req.params.currency });
        if (!exchangeRate) {
            res.json({ status: 'error', message: 'Currency not found' });
            return;
        }
        
        res.json({ date: exchangeRate.date, currency: exchangeRate.currency, rates: ratesFilter(exchangeRate.rates) });
    } catch (error) {
        res.json({ status: 'error', message: error });
    }
});


(async () => {
    const checkLastUpdate = async (currency) => {
        const exchangeRate = await ExchangeRate.findOne({ currency: currency });
        if (!exchangeRate) {
            require('./update')(currency);
            return;
        }
        const date = new Date(exchangeRate.createdAt);
        date.setDate(date.getDate() + 1);
        if (date < new Date()) {
            require('./update')(currency);
        }
    }

    currencys.forEach(currency => {
        checkLastUpdate(currency.toLowerCase());
        cron.schedule('0 0 * * *', () => {
            checkLastUpdate(currency.toLowerCase());
        });
    });
})();

cron.schedule('0 */6 * * *', () => {
    currencys.forEach(currency => {
        require('./update')(currency.toLowerCase());
    });
});

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', reason.stack || reason);
});

process.on('uncaughtException', (error) => {
    console.log('Uncaught Exception thrown', error);
});

app.listen(PORT, () => {
    console.log(`SpeedSMM Exchange Rate API is running on port ${PORT}`);
});
