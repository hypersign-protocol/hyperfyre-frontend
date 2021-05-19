import { Router } from "express";
import InvestorController from "../controllers/investor";
import { verifyReCaptcha } from "../middleware/recaptcha";
export = (hypersign) => {

  const router = Router();

  router.post("/", verifyReCaptcha, hypersign.authorize.bind(hypersign), InvestorController.addInvestor);
  
  router.get("/", InvestorController.getAllInvestor);
  
  router.get("/:did", hypersign.authorize.bind(hypersign), InvestorController.getInvestorByDID);
  
  router.put("/:did", InvestorController.updateInvestor);

  // Delete
  router.delete("/", (req, res) => {
    res.json({ message: "Hello World" });
  });
  
 return router;  

}


