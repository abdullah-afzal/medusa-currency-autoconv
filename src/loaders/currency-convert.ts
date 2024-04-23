import {
    ConfigModule,
    MedusaContainer,
    Logger
  } from "@medusajs/medusa"
import UpdateProductsPricesService from "../services/updateproductsprices"

export default async (
container: MedusaContainer,
config: ConfigModule
): Promise<void> => {
 const logger = container.resolve<Logger>("logger")
logger.info("products prices update started...")
 const updateproducstpricesservice= container.resolve<UpdateProductsPricesService>("updateproductspricesService") 
 await updateproducstpricesservice.updateProductsPrices()
logger.info("products prices updated successfully")
}   
