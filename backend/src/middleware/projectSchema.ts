import { body, param, query } from "express-validator";
import { validateURL, validateDate } from "../utils/fields";

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
    .withMessage("projectName can not be null or empty"),
  body("logoUrl")
    .exists({ checkFalsy: true })
    .trim()
    .custom((value) => validateURL(value))
    .withMessage("logoUrl can not be null or empty"),

  body("fromDate")
    .exists({ checkFalsy: true })
    .trim()
    .custom((value) => validateDate(value))
    .withMessage("fromDate can not be null or empty"),
  body("toDate")
    .exists({ checkFalsy: true })
    .trim()
    .custom((value) => validateDate(value))
    .withMessage("toDate can not be null or empty"),

  body("twitterHandle")
    .exists({ checkFalsy: true })
    .trim()
    .withMessage("twitterHandle can not be null or empty"),
  body("telegramHandle")
    .exists({ checkFalsy: true })
    .trim()
    .withMessage("telegramHandle can not be null or empty"),
  body("twitterPostFormat")
    .exists({ checkFalsy: true })
    .trim()
    .withMessage("twitterPostFormat can not be null or empty"),

  body("projectStatus")
    .exists({ checkFalsy: true })
    .trim()
    .withMessage("projectStatus can not be null or empty"),
];
