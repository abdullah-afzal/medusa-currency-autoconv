import { CurrencyExchangeRate } from "../models/currency-exchange-rate";
export interface PluginOptions {
    api_key: string;
    SupportedCurrencies:string[]
    manualRates:Partial<CurrencyExchangeRate>[]
    Buffer:number
    BaseCurrency:string;
}