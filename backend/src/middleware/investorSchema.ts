import { body, param, query } from "express-validator";
import Web3 from "web3";

function validateEthAddress(address) {
  return new Promise((resolve, reject) => {
    try {
      const addr = Web3.utils.toChecksumAddress(address);
      resolve(true);
    } catch (error) {
      reject("invalid eth address");
    }
  });
}

export const InvestorSchemaQuery = [
  query("projectId")
    .exists({ checkFalsy: true })
    .trim()
    .withMessage("Event Id can not be null or empty"),
];

export const InvestorSchemaPrams = [
  param("did")
    .exists({ checkFalsy: true })
    .trim()
    .withMessage("DID can not be null or empty"),
];

export const InvestorSchemaBody = [
  body("projectId")
    .exists({ checkFalsy: true })
    .trim()
    .withMessage("EventId can not be null or empty"),

  body("actions")    
    .isArray()
    .withMessage("actions must be an array"),
];
