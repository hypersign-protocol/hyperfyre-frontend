import { Router } from "express";
import InvestorController from "../controllers/investor";

export = () => {

  const router = Router();

  router.post("/issue", InvestorController.issueCredential);

  router.get("/credential", InvestorController.getCredential);
  
 return router;  

}


