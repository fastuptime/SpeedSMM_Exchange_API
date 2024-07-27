module.exports = async (currency) => {
    try {
        let r = await axios.get(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`);
        if (r.data.error) {
            console.log(r.data.error);
            return;
        }
        r = r.data;
        const exchangeRate = await ExchangeRate.findOne({ currency: currency });
        if (exchangeRate) {
            await ExchangeRate.updateOne({ currency: currency }, { rates: r[currency], date: r.date });
            console.log(`Updated ${currency} exchange rate`);
        } else {
            await ExchangeRate.create({ currency: currency, rates: r[currency], date: r.date });
            console.log(`Created ${currency} exchange rate`);
        }
    } catch (error) {
        console.log(error);   
    }
}