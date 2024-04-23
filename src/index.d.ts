declare module '@everapi/freecurrencyapi-js' {



    enum CurrencyCode {

        EUR = 'EUR',
        USD = 'USD',
        JPY = 'JPY',
        BGN = 'BGN',
        CZK = 'CZK',
        DKK = 'DKK',
        GBP = 'GBP',
        HUF = 'HUF',
        PLN = 'PLN',
        RON = 'RON',
        SEK = 'SEK',
        CHF = 'CHF',
        ISK = 'ISK',
        NOK = 'NOK',
        HRK = 'HRK',
        RUB = 'RUB',
        TRY = 'TRY',
        AUD = 'AUD',
        BRL = 'BRL',
        CAD = 'CAD',
        CNY = 'CNY',
        HKD = 'HKD',
        IDR = 'IDR',
        ILS = 'ILS',
        INR = 'INR',
        KRW = 'KRW',
        MXN = 'MXN',
        MYR = 'MYR',
        NZD = 'NZD',
        PHP = 'PHP',
        SGD = 'SGD',
        THB = 'THB',
        ZAR = 'ZAR'
    }
    
    interface CurrencyResponse {
        meta: any
        data:Record<CurrencyCode, number> ;
    }

    export default class Freecurrencyapi {
        constructor(apiKey: string);
        latest(baseCurrency: Currency, targetCurrencies: Currency[]): Promise<CurrencyResponse>;
    }
}