import PlanModel, { IPlan } from "../models/plan";

export default class Plan{
    constructor(){
        
    }

    add({ planName, totalNoOfRequests, price }): Promise<IPlan>{
        return new Promise(async (resolve, reject) => {
            const newPlan: IPlan = await PlanModel.create({ planName, totalNoOfRequests, price });
            resolve(newPlan);
        })
    }

    list(): Promise<Array<IPlan>>{
        return new Promise(async (resolve) => {
            const allPlans: Array<IPlan> = await PlanModel.find({});
            resolve(allPlans);
        })
    }
}
