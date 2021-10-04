import { body, param, query } from "express-validator";
import { isValidURL, validateDate, notLessThanCurrent } from "../utils/fields";

export const ProjectSchemaPrams = [
  param("id")
    .exists({ checkFalsy: true })
    .trim()
    .withMessage("id can not be null or empty"),
];

export const ProjectSchemaBody = [
  body("projectName")
    .exists({ checkFalsy: true })
    .trim()
    .withMessage("Event name is null or empty"),
  
  body("logoUrl")
    .exists({ checkFalsy: true })
    .trim()
    .custom((value) => isValidURL(value))
    .withMessage("Banner Url is invalid or empty"),

  body("fromDate")
    .exists({ checkFalsy: true })
    .trim()
    .custom((value) => validateDate(value))
    .withMessage("FromDate is invalid or empty"),

  body("toDate")
    .exists({ checkFalsy: true })
    .trim()
    .custom((value) => validateDate(value))
    .withMessage("ToDate is invlaid or empty"),

  body("actions")
  .isArray()
  .withMessage("Actions must be an array"),

  body("projectStatus")
    .exists()
    .isBoolean()
    .withMessage("EventStatus must be a boolean"),
];
