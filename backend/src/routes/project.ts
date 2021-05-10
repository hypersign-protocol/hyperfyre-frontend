import { Router } from "express";
import ProjectController from "../controllers/project";

export = (hypersign) => {
  const router = Router();

  router.post("/", ProjectController.addProject);

  router.put("/", ProjectController.updateProject);

  router.get("/", ProjectController.getAllProject);

  //Search

  router.get("/search/:id", ProjectController.searchProjectById);

  router.get("/:id", ProjectController.getProjectById);

  // Delete
  router.delete("/:id", ProjectController.deleteProjectById);

  return router;
};
