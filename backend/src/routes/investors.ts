import { Router } from "express";
import InvestorController from "../controllers/investor";

export = (hypersign) => {

  const router = Router();

  router.post("/issue",  hypersign.authorize.bind(hypersign), InvestorController.issueCredential);

  router.get("/credential",  hypersign.authorize.bind(hypersign), InvestorController.getCredential);
  
 return router;  

}


