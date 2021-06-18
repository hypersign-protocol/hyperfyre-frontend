import { Router } from "express";
import ProjectController from "../controllers/project";

import {
  ProjectSchemaBody,
  ProjectSchemaPrams,
} from "../middleware/projectSchema";

import { validateRequestSchema } from "../middleware/validateRequestSchema";

export = (hypersign) => {
  const router = Router();

  router.post(
    "/",
    hypersign.authorize.bind(hypersign),
    // ProjectSchemaBody,
    // validateRequestSchema,
    ProjectController.addProject
  );

  router.put(
    "/",
    hypersign.authorize.bind(hypersign),
    // ProjectSchemaBody,
    // validateRequestSchema,
    ProjectController.updateProject
  );

  router.get(
    "/",
    hypersign.authorize.bind(hypersign),
    ProjectController.getAllProject
  );

  router.get(
    "/:id",
    (req, res, next) => {
      const { isPublic } = req.query;
      if (isPublic) {
        next();
      } else {
        hypersign.authorize(req, res, next);
      }
    },
    // ProjectSchemaPrams,
    // validateRequestSchema,
    ProjectController.getProjectById
  );

  // Delete
  router.delete(
    "/:id",
    hypersign.authorize.bind(hypersign),
    // ProjectSchemaPrams,
    // validateRequestSchema,
    ProjectController.deleteProjectById
  );

  return router;
};
