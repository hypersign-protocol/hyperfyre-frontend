import PlanModel, { IPlan } from "../models/plan";

export default class Plan{
    constructor(){
        
    }

    add({ planName, description, totalNoOfRequests, price }): Promise<IPlan>{
        return new Promise(async (resolve, reject) => {
            const newPlan: IPlan = await PlanModel.create({ planName, description, totalNoOfRequests, price });
            resolve(newPlan);
        })
    }

    list(): Promise<Array<IPlan>>{
        return new Promise(async (resolve) => {
            const allPlans: Array<IPlan> = await PlanModel.find({});
            resolve(allPlans);
        })
    }

    getById({id}): Promise<IPlan>{
        return new Promise(async(resolve)=> {
            const plan: IPlan = await PlanModel.findById({ _id: id})
            resolve(plan);
        })
    }
}
