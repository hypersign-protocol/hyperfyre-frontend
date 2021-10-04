import { body, param } from "express-validator";
import { isValidURL } from "../utils/fields";

export const TweeterSchemaPrams = [
    param("userId")
      .exists({ checkFalsy: true })
      .trim()
      .withMessage("UserId can not be null or empty"),
  ];
  
  export const TweeterSchemaBody = [
  
    // verify this as well
    body("tweetText")
      .exists({ checkFalsy: true })
      .trim()
      .withMessage("TweetText can not be null or empty"),
  
    body("userId")
      .exists({ checkFalsy: true })
      .trim()
      .withMessage("UserId can not be null or empty"),
    
    body("tweetUrl")
      .exists({ checkFalsy: true })
      .trim()
      .custom((value) => isValidURL(value))
      .withMessage("Invalid re-tweet url"),
  ];

  export const TweeterFollowerBody = [
    body("sourceScreenName")
    .exists({ checkFalsy: true })
    .trim()
    .withMessage("SourceScreenName can not be null or empty"),

   body("targetScreenName")
    .exists({ checkFalsy: true })
    .trim()
    .withMessage("TargetScreenName can not be null or empty"),
  ]
  