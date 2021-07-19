import SubscriptionModel, { ISubscription } from "../models/subscription";

export default class Subscription{
    constructor(){
        
    }

    
    add({planId, userDid, subscritionDate, isActive, hasExpired, leftOverNoRequests}): Promise<ISubscription>{
        return new Promise(async (resolve, reject) => {
            const newPlan: ISubscription = await SubscriptionModel.create({
                planId, userDid, subscritionDate, isActive, hasExpired, leftOverNoRequests          
            });
            resolve(newPlan);
        })
    }

    list({did}): Promise<Array<ISubscription>>{
        return new Promise(async (resolve) => {
            const allSubscriptionForUser: Array<ISubscription> = await SubscriptionModel.where({did: did}).find();
            resolve(allSubscriptionForUser);
        })
    }
}
