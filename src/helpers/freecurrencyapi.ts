
class Freecurrencyapi {
    baseUrl = 'https://api.freecurrencyapi.com/v1/';
    headers = {};
    constructor(apiKey = '') {
        this.headers = {
            apikey: apiKey
        };
    }

    async call (endpoint, params = {}) {
        const paramString = new URLSearchParams({
            ...params
        }).toString();

        const response = await fetch(`${this.baseUrl}${endpoint}?${paramString}`, { headers: this.headers });
        const data = await response.json();
        return data;
    }
    
    status () {
        return this.call('status');
    }

    currencies (params) {
        return this.call('currencies', params);
    }

    latest (params) {
        params.base_currency = params.base_currency.toUpperCase();
        params.currencies = params.currencies.map((currency) => currency.toUpperCase());
        return this.call('latest', params);
    }

    historical (params) {
        return this.call('historical', params);
    }

}

export default Freecurrencyapi;
