import Twit from "twit";
import Url from "url-parse";
import { tweeterConfig, logger } from "../config";
export default class TwitterService {
  tweeterClient: any;
  constructor() {
    this.tweeterClient = new Twit({...tweeterConfig});
  }
  
  getUserDetails(userId: string) {
    return new Promise( async(resolve, reject) => {
      const response = await this.tweeterClient.get("users/show", {
        user_id: userId ,
      });
      const { data } = response;

      if(!data) {
        reject("could not fetch user information from tweeter")
      }

      resolve({
        screen_name: data["screen_name"],
        name: data["name"],
        id: data["id_str"],
        description: data["description"],
      });
    });
  }

  validateTweetUrl(
    tweetUrl: string,
    loggedInUserId: string,
    tweetText: string,
    needUserDetails: boolean = false
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const url = new Url(tweetUrl);
        logger.info("Parsed tweetURl");
        const pathName = url.pathname;
        logger.info("pathName = " + pathName);
        if (!pathName) throw new Error("invalid tweeter url");
        const paths: Array<string> = pathName.split("/status");
        logger.info(paths);
        if (!paths || paths.length <= 0 ||  paths[1] == undefined ||  paths[1] == "") {
          throw new Error("invalid tweeter url");
        }

        const tweetId = paths[1].replace("/", "").trim();
        logger.info("tweetId = " + tweetId);

        const response = await this.tweeterClient.get("statuses/show", {
          id: tweetId,
        });
        const { data } = response;

        if (!data) {
          throw new Error("could not fetch tweet data");
        }

        if (!data["user"]) {
          throw new Error("no user details found");
        }

        if (data["user"]["id_str"] != loggedInUserId) {
          logger.info("this is someone else's tweet");
          throw new Error("this is someone else's tweet");
        }

        const text = data["text"];

        if (!text) {
          logger.info("no tweet found in id " + tweetId);
          throw new Error("no tweet found in id " + tweetId);
        }

        if (text.indexOf(tweetText) <= -1) {
          logger.info(
            "tweet did not match with tweet text for id " + tweetId
          );
          throw new Error(
            "tweet did not match with tweet text for id " + tweetId
          );
        }

        let returnObj = {};
        returnObj["hasTweetUrlVerified"] = true;
        if (needUserDetails) {
          returnObj["user"] = {
            screen_name: data["user"]["screen_name"],
            name: data["user"]["name"],
            id: data["user"]["id_str"],
            description: data["user"]["description"],
          };
        }
        logger.info(returnObj);
        resolve(returnObj);

      } catch (e) {
        logger.error(e.message);
        reject({
          hasTweetUrlVerified: false,
          error: e.message,
        });
      }
    });
  }

  get;
}
