import SubscriptionService from "./subscription.service";
import PlanService from "./plan.service";
import { ISubscription } from "../models/subscription";
import { IPlan } from "../models/plan";

const subService = new SubscriptionService();
const planService =  new PlanService();

async function activate(){
    console.log("*******************************************")
    console.log("**** Activating subscription start ********")
    
    const subscriptionId = process.env.SUBSCRIPTIONID;
    if(!subscriptionId) throw new Error("Please pass SUBSCRIPTIONID as env var");

    console.log("     Fetching subscription for id = " + subscriptionId);
    const subInDb: ISubscription = await subService.getById({ id: subscriptionId});
    if(!subInDb)  throw new Error("No subscription found with id = " + subscriptionId);
    
    const { planId ,  userDid } =  subInDb;

    console.log("     Fetching plan with id " + planId);
    const plan: IPlan =  await planService.getById({id: planId});
    if(!plan)  throw new Error("No plan found with id = " + planId);

    const filter = { _id: subscriptionId, userDid }     
    const update = {
        leftOverNoRequests: plan.totalNoOfRequests,
        isActive: true // activate it
    };
    
    console.log("     Updating subscriptions and usage tables");
    const subcrip = await subService.updateSubscription(filter, update);
    if(!subcrip) throw new Error("Could not update subscription and usage tables");

    console.log("     " + JSON.stringify(subcrip));
    console.log("**** Activating subscription finished *****")
    console.log("*******************************************")
}   

activate();


