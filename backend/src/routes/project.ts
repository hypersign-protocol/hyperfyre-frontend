import { Router } from "express";
import ProjectController from "../controllers/project";

export = (hypersign) => {
  const router = Router();

  router.post("/", hypersign.authorize.bind(hypersign), ProjectController.addProject);

  router.put("/", hypersign.authorize.bind(hypersign), ProjectController.updateProject);

  router.get("/", hypersign.authorize.bind(hypersign), ProjectController.getAllProject);

  router.get("/:id", (req, res, next) => {
      const { isPublic } = req.query;
      if(isPublic){
          next();
      }else{
        hypersign.authorize(req, res, next);
      }
  } , ProjectController.getProjectById);

  // Delete
  router.delete("/:id", hypersign.authorize.bind(hypersign), ProjectController.deleteProjectById);

  return router;
};
