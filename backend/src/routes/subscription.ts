import { Router } from "express";
import SubsController from "../controllers/subscription";

export = () => {
  const router = Router();
  router.post("/", SubsController.addSubscription);
  router.get("/", SubsController.getSubscriptionByDid);
  return router;
};
