import SubscriptionModel, { ISubscription } from '../models/subscription';
import { IPlan } from '../models/plan';
import UsageModel, { IUsage } from '../models/usage';
import PlanService from './plan.service';
// import planList from "./plans.json";

export default class Subscription {
  plan;
  constructor() {
    this.plan = new PlanService();
  }

  async upInsertUsage({ userDid, totalAvailable, totalUsed = 0, updateUsed = false }): Promise<void> {
    const filter = { userDid };
    const usageInDb: IUsage = await UsageModel.where(filter).findOne();
    if (!usageInDb) {
      // insert
      UsageModel.create({
        userDid,
        totalAvailable,
        totalUsed,
      });
    } else {
      // update
      let update;
      if (!updateUsed) {
        update = {
          $set: { totalAvailable: usageInDb.totalAvailable + totalAvailable },
        };
      } else {
        update = { $set: { totalUsed: usageInDb.totalUsed + 1 } };
      }

      await UsageModel.updateOne(filter, update);
    }
  }

  async add({ planId, userDid, subscriptionDate, isActive, hasExpired, leftOverNoRequests }): Promise<ISubscription> {
    const planInDb: IPlan = await this.plan.getById({ id: planId });

    // we only allow 1 freemium subscription
    if (planInDb.planName === 'Freemium') {
      const subscriptionWithFreemiumPlans: Array<ISubscription> = await this.list({ userDid, planId });
      if (subscriptionWithFreemiumPlans && subscriptionWithFreemiumPlans.length >= 1) {
        throw new Error('You can not opt for more than one freemium plan');
      }
    }

    let newSubscription: ISubscription = await SubscriptionModel.create({
      planId,
      userDid,
      subscriptionDate,
      isActive,
      hasExpired,
      leftOverNoRequests,
    });

    // in case of freemium, activate the subscription right away
    if (planInDb.planName === 'Freemium') {
      // updated usage and subscriptioin
      const filter = {
        _id: newSubscription['_id'],
        userDid,
      };
      const update = {
        leftOverNoRequests,
        isActive: true, // activate it
      };
      newSubscription = await this.updateSubscription(filter, update);
    }

    return newSubscription;
  }

  async updateSubscription(filter, update): Promise<ISubscription> {
    const subcrip: ISubscription = await SubscriptionModel.findByIdAndUpdate(filter['_id'], update);
    this.upInsertUsage({
      userDid: filter['userDid'],
      totalAvailable: update['leftOverNoRequests'],
    });
    return subcrip;
  }

  async list(filter): Promise<Array<ISubscription>> {
    const allSubscriptionForUser: Array<ISubscription> = await SubscriptionModel.where(filter).find();
    return allSubscriptionForUser;
  }

  async getById({ id }): Promise<ISubscription> {
    const plan: ISubscription = await SubscriptionModel.findById({ _id: id });
    return plan;
  }

  async usage({ did }): Promise<IUsage> {
    const usage: IUsage = await UsageModel.where({ userDid: did }).findOne();
    return usage;
  }

  async verify({ did }): Promise<boolean> {
    if (!did) throw new Error('Invalid did');
    // check if
    // owner has active subscriptions or not
    const subscriptionList: Array<ISubscription> = await this.list({
      userDid: did,
      isActive: true,
    });
    if (!subscriptionList) {
      throw new Error('Could not fetch subscription for admin did ' + did);
    }
    if (subscriptionList.length === 0) {
      return false;
    }

    // has some requests left or not
    const usage: IUsage = await this.usage({ did });
    if (!usage) {
      throw new Error('Could not fetch usage for admin did ' + did);
    }

    if (usage.totalUsed >= usage.totalAvailable) {
      return false;
    }

    return true;
  }
}
