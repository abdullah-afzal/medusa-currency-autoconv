import {  
    type ScheduledJobConfig, 
    type ScheduledJobArgs,
    Logger
  }  from "@medusajs/medusa"
  import UpdateProductsPricesService from "../services/updateproductsprices"

  export default async function handler({ 
    container, 
    data, 
    pluginOptions,
  }: ScheduledJobArgs) {
      const updateproductsPricesservice = container.resolve<UpdateProductsPricesService>("updateproducstprices")
      const logger = container.resolve<Logger>("logger")

    logger.info("Starting update rates job...")
    await updateproductsPricesservice.updateProductsPrices()
    this.logger.info("Rates updated successfully")
  }
  
  export const config: ScheduledJobConfig = {
    name: "update-rates-once-a-day",
    schedule: "0 0 * * *",
    data: {},
  }