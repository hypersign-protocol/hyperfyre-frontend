import PlanService from "./plan.service";
import planJson from "./plans.json";
import env from "dotenv";
import DB from "../dbConn";
import { logger } from "../config";

env.config();

function bootstrapPlans(){
    try{
        logger.info("*******************************************")
        logger.info("**** Bootstraping plans start ********")
        logger.info(" ")
        logger.info(" ")
        logger.info(" ")

        const planService =  new PlanService();
        if(planJson){
            if(planJson.length > 0){
                planJson.forEach(plan => {
                    planService.add({...plan});
                })
            }
        }else{
            throw new Error("No plan found");
        }
        logger.info(" ")
        logger.info(" ")
        logger.info(" ")
        logger.info("**** Bootstraping plans finished *****")
        logger.info("*******************************************")
    }catch(e){
        logger.error(e)
    } finally {
        DB.closeConnection().then(() => {
            logger.info('Successfully closed connection from mongo database');
        });
    }
}   


DB.openConnection().then(x => {
    logger.info(x)
    bootstrapPlans();
}) 




