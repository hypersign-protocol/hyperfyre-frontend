import SubscriptionModel, { ISubscription } from "../models/subscription";
import UsageModel, { IUsage } from "../models/usage";

export default class Subscription{
    constructor(){
        
    }

    async upInsertUsage({ userDid, totalAvailable, totalUsed = 0, updateParam = {} }){
        const filter = { userDid };
        const usageInDb:IUsage = await UsageModel.where(filter).findOne();
        if(!usageInDb){
            // insert
            UsageModel.create({
                userDid, totalAvailable, totalUsed
            })
        }else{
            // update
            let update; 
            if(Object.keys(updateParam).length === 0){
                update = { $set: { totalAvailable: usageInDb.totalAvailable + totalAvailable }};
            }else{
                update = { $set: updateParam};
            }
            
            await UsageModel.updateOne(filter,  update);
        }
    }
    
    add({planId, userDid, subscriptionDate, isActive, hasExpired, leftOverNoRequests}): Promise<ISubscription>{
        return new Promise(async (resolve, reject) => {
            try{
                const newPlan: ISubscription = await SubscriptionModel.create({
                    planId, userDid, subscriptionDate, isActive, hasExpired, leftOverNoRequests          
                });

                this.upInsertUsage({ userDid, totalAvailable: leftOverNoRequests});

                resolve(newPlan);
            }catch(e){
                reject(e)
            }
        })
    }

    list({did}): Promise<Array<ISubscription>>{
        return new Promise(async (resolve, reject) => {
            try{
                const allSubscriptionForUser: Array<ISubscription> = await SubscriptionModel.where({userDid: did}).find();
                resolve(allSubscriptionForUser);
            }catch(e){
                reject(e)
            }
        })
    }

    usage({did}): Promise<IUsage>{
        return new Promise(async (resolve, reject) => {
            try{
                const usage: IUsage = await UsageModel.where({userDid: did}).findOne();
                resolve(usage);
            }catch(e){
                reject(e)
            }
        })
    }

}
