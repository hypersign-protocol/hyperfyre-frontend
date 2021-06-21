import { Router } from "express";
import { logger } from "../config";
import ApiError from '../error/apiError';
import TwitterService from "../services/twitter.service";
import { validateRequestSchema } from "../middleware/validateRequestSchema";
import {
  TweeterSchemaBody,
  TweeterSchemaPrams,
} from "../middleware/tweeter";
export = (hypersign) => {
  const router = Router();
  const tService =  new TwitterService();

  router.post(
    "/verify",
    hypersign.authorize.bind(hypersign),
    TweeterSchemaBody,
    validateRequestSchema,
    async (req, res, next) => {
      try{
        logger.info("Inside tweeer verify");
        const { tweetUrl, userId, tweetText, needUserDetails } =  req.body;
        logger.info({ tweetUrl, userId, tweetText, needUserDetails });
        logger.info("Before calling tService.validateTweetUrl")
        const verifedData: any = await tService.validateTweetUrl(tweetUrl, userId, tweetText, needUserDetails);
        logger.info("After calling tService.validateTweetUrl " + JSON.stringify(verifedData))
        res.send(verifedData);
      }catch(e){
        logger.error("InvestorController:: addInvestor(): Error " + e);
        next(ApiError.internal(e));
      }
    }
  );

  router.get(
    "/user/:userId",
    hypersign.authorize.bind(hypersign),
    TweeterSchemaPrams,
    validateRequestSchema,
    async (req, res, next) => {
      try{
        const { userId } =  req.params;
        console.log(userId)
        const userDetails = await tService.getUserDetails(userId);
        res.send(userDetails);
      }catch(e){
        logger.error("InvestorController:: addInvestor(): Error " + e);
        next(ApiError.internal(e.message));
      }
    }
  );

  return router;
};

