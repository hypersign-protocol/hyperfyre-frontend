import { Router } from "express";
import InvestorController from "../controllers/investor";

export = (hypersign) => {

  const router = Router();

  router.post("/", hypersign.authorize.bind(hypersign), InvestorController.addInvestor);
  
  router.get("/", InvestorController.getAllInvestor);
  
  router.get("/:did", hypersign.authorize.bind(hypersign), InvestorController.getInvestorByDID);
  
  router.put("/:did", InvestorController.updateInvestor);

  router.post("/issue", InvestorController.issueCredential);

  // Delete
  router.delete("/", (req, res) => {
    res.json({ message: "Hello World" });
  });
  
 return router;  

}


