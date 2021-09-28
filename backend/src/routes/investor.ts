import { Router } from "express";
import InvestorController from "../controllers/investor";
import { verifyReCaptcha } from "../middleware/recaptcha";
import {
  InvestorSchemaBody,
  InvestorSchemaPrams,
  InvestorSchemaQuery,
} from "../middleware/investorSchema";

import { validateRequestSchema } from "../middleware/validateRequestSchema";
import {
  verifySubscription,
  updateSubscription
} from "../middleware/subscription";

export = (hypersign) => {

  const router = Router();

  router.post(
    "/",
    verifyReCaptcha,
    hypersign.authorize.bind(hypersign),
    InvestorSchemaBody,
    validateRequestSchema,
    verifySubscription,
    InvestorController.addInvestor,
    updateSubscription
  );

  // TODO:  Integrate recaptcha
  router.post(
    "/add",
    hypersign.authorize.bind(hypersign),
    InvestorSchemaBody,
    validateRequestSchema,
    verifySubscription,
    InvestorController.addUpdateUser,
    (req, res, next) => {
      const { result } = req.body;
      const { isSubscribed } = result;
      // only update the subscription for the first time :  during ADD user.
      // from the second time (during UPDATE user), need not to update subscriptions: 
      if (!isSubscribed) {
        updateSubscription(req, res, next);
      }else{
        res.send(result);
      }
    }
  );

  router.get(
    "/",
    hypersign.authorize.bind(hypersign),
    InvestorController.getAllInvestor
  );

  router.get(
    "/:did",
    hypersign.authorize.bind(hypersign),
    InvestorSchemaPrams,
    validateRequestSchema,
    InvestorController.getInvestorByDID
  );

  router.put(
    "/:did",
    hypersign.authorize.bind(hypersign),
    InvestorSchemaPrams,
    InvestorSchemaQuery,
    InvestorSchemaBody,
    validateRequestSchema,
    InvestorController.updateInvestor
  );

  // Delete
  router.delete("/", (req, res) => {
    res.json({ message: "Hello World" });
  });

  return router;
};
