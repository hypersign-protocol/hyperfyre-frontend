import { Request, Response, NextFunction } from "express";
import ApiError from "../error/apiError";
import { logger } from "../config";
import SubscriptionService from "../services/subscription.service";

const subscriptionService = new SubscriptionService();

async function addSubscription(req: Request, res: Response, next: NextFunction) {
  try {
    logger.info("SubscriptionController:: addSubscription() method start..");
    const {planId, userDid, subscritionDate, isActive, hasExpired, leftOverNoRequests } = req.body;

    logger.info(
      "SubscriptionController:: addSubscription(): before creating a new subscrption into db"
      );

    const newSub = await subscriptionService.add({planId, userDid, subscritionDate, isActive, hasExpired, leftOverNoRequests });
    res.send(newSub);
  } catch (e) {
    logger.error("SubscriptionController:: addSubscription(): Error " + e);
    next(ApiError.internal(e.message));
  } finally {
    logger.info("SubscriptionController:: addSubscription method ends.");
  }
}

async function getSubscriptionByDid(req: Request, res: Response, next: NextFunction) {
  try {    
    logger.info("SubscriptionController:: getSubscriptionByDid method start..");
    const { did }= req.query; // need to use from hypersign auth ... ///this is only for testing 
    const employeeList = await subscriptionService.list({ did });
    res.send(employeeList);
  } catch (e) {
    logger.error("SubscriptionController:: getSubscriptionByDid(): Error " + e);
    next(ApiError.internal(e.message));
  } finally {
    logger.info("SubscriptionController:: getSubscriptionByDid method ends.");
  }
}

export default {
  addSubscription,
  getSubscriptionByDid,
};
