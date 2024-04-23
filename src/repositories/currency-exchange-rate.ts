import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { CurrencyExchangeRate } from "../models/currency-exchange-rate";

const CurrencyExchangeRateRepository = dataSource.getRepository(CurrencyExchangeRate);

export default CurrencyExchangeRateRepository;