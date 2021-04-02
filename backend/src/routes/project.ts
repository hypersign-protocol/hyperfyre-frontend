import { Router } from "express";
import ProjectController from "../controllers/project";

const router = Router();

router.post("/", ProjectController.addProject);

router.get("/", ProjectController.getAllProject);

router.get("/:id", ProjectController.getProjectById);

// Delete
router.delete("/", (req, res) => {
  res.json({ message: "Hello World" });
});

export default router;
