const { get } = require("axios");

const getExchRate = async (from, to) => {
    let URL_FROM = `http://api.fixer.io/latest?base=${from}`;
    return get(URL_FROM).then(res => res.data.rates[to]);
};

const getCountries = async (currCode) => {
    const URL_COUNTRIES = `https://restcountries.eu/rest/v2/currency/${currCode}`;
    return get(URL_COUNTRIES).then(res => res.data.map( country => country.name));
};

const convertCurrency = async (from, to, amount) => {
    const countries = await getCountries(to);
    const rate = await getExchRate(from, to);
    const exchAmount = amount * rate;
    return `${amount} ${from} vale 💰💰💰  ${exchAmount} ${to}. ${to} pode ser utilizado: ${countries.join(', ')}`;
};

convertCurrency('USD', 'BRL', 1999).then(status => console.log(status));