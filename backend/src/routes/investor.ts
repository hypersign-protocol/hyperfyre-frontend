import { Router } from "express";
import InvestorController from "../controllers/investor";

const router = Router();

router.post("/", InvestorController.addInvestor);

router.get("/", InvestorController.getAllInvestor);

router.get("/:did", InvestorController.getInvestorByDID);

// Delete
router.delete("/", (req, res) => {
  res.json({ message: "Hello World" });
});

export default router;
