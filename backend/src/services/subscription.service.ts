import SubscriptionModel, { ISubscription } from "../models/subscription";

export default class Subscription{
    constructor(){
        
    }

    
    add({planId, userDid, subscriptionDate, isActive, hasExpired, leftOverNoRequests}): Promise<ISubscription>{
        return new Promise(async (resolve, reject) => {
            try{
                const newPlan: ISubscription = await SubscriptionModel.create({
                    planId, userDid, subscriptionDate, isActive, hasExpired, leftOverNoRequests          
                });
                resolve(newPlan);
            }catch(e){
                reject(e)
            }
        })
    }

    list({did}): Promise<Array<ISubscription>>{
        return new Promise(async (resolve, reject) => {
            try{
                const allSubscriptionForUser: Array<ISubscription> = await SubscriptionModel.where({did: did}).find();
                resolve(allSubscriptionForUser);
            }catch(e){
                reject(e)
            }
        })
    }
}
