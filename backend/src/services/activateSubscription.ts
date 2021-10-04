import SubscriptionService from "./subscription.service";
import PlanService from "./plan.service";
import { ISubscription } from "../models/subscription";
import { IPlan } from "../models/plan";
import env from "dotenv";
import DB from "../dbConn";
import { logger } from "../config";

env.config();

async function activate(){
    try {
        logger.info("*******************************************")
        logger.info("**** Activating subscription start ********")
        logger.info(" ")
        logger.info(" ")
        logger.info(" ")

        const subscriptionId = process.env.SUBSCRIPTIONID;
        if(!subscriptionId) throw new Error("Please pass SUBSCRIPTIONID as env var");

        const subService = new SubscriptionService();
        const planService =  new PlanService();
        
        logger.info("     Fetching subscription for id = " + subscriptionId);
        const subInDb: ISubscription = await subService.getById({ id: subscriptionId});
        if(!subInDb)  throw new Error("No subscription found with id = " + subscriptionId);
        
        const { planId,  userDid } =  subInDb;

        logger.info("     Fetching plan with id " + planId);
        const plan: IPlan =  await planService.getById({id: planId});
        if(!plan)  throw new Error("No plan found with id = " + planId);

        const filter = { _id: subscriptionId, userDid }     
        const update = {
            leftOverNoRequests: plan.totalNoOfRequests,
            isActive: true // activate it
        };
        
        logger.info("     Updating subscriptions and usage tables");
        await subService.updateSubscription(filter, update);

        const updatedSubs = await subService.getById({ id: subscriptionId });
        const updatedUsage = await subService.usage({ did: userDid}) ;

        logger.info("         Usage : " + JSON.stringify(updatedUsage))
        logger.info("         Subscription : " + JSON.stringify(updatedSubs))
            
        logger.info(" ")
        logger.info(" ")
        logger.info(" ")
        logger.info("**** Activating subscription finished *****")
        logger.info("*******************************************")
    } catch(e) {
        logger.error(e)
    } finally {
        DB.closeConnection().then(() => {
            logger.info('Successfully closed connection from mongo database');
        })
    }
}   

DB.openConnection().then(x => {
    logger.info(x)
    activate();
}) 


