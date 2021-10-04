import PlanModel, { IPlan } from '../models/plan';
import { logger } from '../config';

export default class Plan {
  constructor() {
    // do nothing
  }

  async add({ planName, description, totalNoOfRequests, price }): Promise<IPlan> {
    const newPlan: IPlan = await PlanModel.create({ planName, description, totalNoOfRequests, price });
    return newPlan;
  }

  async list(): Promise<Array<IPlan>> {
    const allPlans: Array<IPlan> = await PlanModel.find({});
    return allPlans;
  }

  async getById({ id }): Promise<IPlan> {
    const plan: IPlan = await PlanModel.findById({ _id: id });
    return plan;
  }
}
