import Twit from "twit";
import Url from "url-parse";
import { tweeterConfig, logger } from "../config";

export default class TwitterService {
  tweeterClient: any;
  constructor() {
    this.tweeterClient = new Twit({ ...tweeterConfig });
  }

  /**
   * Fetches user details using id_str
   * @param userId
   * @returns user detials
   */
  async getUserDetails(userId: string): Promise<Object> {
    const response = await this.tweeterClient.get("users/show", {
      user_id: userId,
    });
    const { data } = response;

    if (!data) {
      throw new Error("could not fetch user information from tweeter");
    }

    return {
      screen_name: data["screen_name"],
      name: data["name"],
      id: data["id_str"],
      description: data["description"],
    };
  }

  getTweetIDFromUrl(tweetUrl): string {
    if (!tweetUrl) throw new Error("tweetUrl can not be blank");

    //const t = tweetUrl.trim();
    const url = new Url(tweetUrl);
    logger.info("Parsed tweetURl");
    const pathName = url.pathname;
    logger.info("pathName = " + pathName);
    if (!pathName) throw new Error("invalid tweeter url");

    const paths: Array<string> = pathName.split("/status");
    logger.info(paths);
    if (
      !paths ||
      paths.length <= 0 ||
      paths[1] == undefined ||
      paths[1] == ""
    ) {
      throw new Error("invalid tweeter url");
    }

    const tweetId = paths[1].replace("/", "").trim();

    return tweetId;
  }

  /**
   * Validate tweet url and returns user detials as well
   * Note: DEPRECIATED: Not using this one because users were facing problem with tweet url
   * @param tweetUrl tweet url
   * @param loggedInUserId id_str
   * @param tweetText tweeted text
   * @param needUserDetails returns
   * @returns object
   */
  async validateTweetUrl_old(
    tweetUrl: string,
    loggedInUserId: string,
    tweetText: string,
    needUserDetails = false,
    checkIfFollowed = false,
    sourceScreenName = ""
  ): Promise<Object> {
    try {
      // const url = new Url(tweetUrl);
      // logger.info("Parsed tweetURl");
      // const pathName = url.pathname;
      // logger.info("pathName = " + pathName);
      // if (!pathName) throw new Error("invalid tweeter url");
      // const paths: Array<string> = pathName.split("/status");
      // logger.info(paths);
      // if (!paths || paths.length <= 0 ||  paths[1] == undefined ||  paths[1] == "") {
      //   throw new Error("invalid tweeter url");
      // }

      const tweetId = this.getTweetIDFromUrl(tweetUrl); // paths[1].replace("/", "").trim();
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

      if (!data["is_quote_status"]) {
        if (text.indexOf(tweetText) <= -1) {
          logger.info("tweet did not match with tweet text for id " + tweetId);
          throw new Error(
            "tweet did not match with tweet text for id " + tweetId
          );
        }
      } else {
        const quotedTweetId = data["quoted_status_id_str"];
        let t = tweetText;
        t = t.split("/status/")[1].split("?")[0];
        // const tweetId = this.getTweetIDFromUrl(tweetUrl)
        if (quotedTweetId != t) {
          logger.info("invalid tweet; make sure you quoted our tweet");
          throw new Error("invalid tweet; make sure you quoted our tweet");
        }
      }

      const returnObj = {};
      returnObj["hasTweetUrlVerified"] = true;
      if (needUserDetails) {
        returnObj["user"] = {
          screen_name: data["user"]["screen_name"],
          name: data["user"]["name"],
          id: data["user"]["id_str"],
          description: data["user"]["description"],
        };
      }

      if (needUserDetails && checkIfFollowed) {
        const followed = await this.hasFollowed(
          sourceScreenName,
          returnObj["user"]["screen_name"]
        );
        returnObj["user"]["followed"] = {
          to: sourceScreenName,
          hasFollowed: followed,
        };
      }

      logger.info(returnObj);
      return returnObj;
    } catch (e) {
      logger.error(e.message);
      return {
        hasTweetUrlVerified: false,
        error: e.message,
      };
    }
  }

  /**
   * Validate tweet url and returns user detials as well
   * @param tweetUrl tweet url
   * @param loggedInUserId id_str
   * @param tweetText tweeted text
   * @param needUserDetails returns
   * @returns object
   */
  async validateTweetUrl(
    tweetUrl: string,
    loggedInUserId: string,
    tweetText: string,
    needUserDetails = false,
    checkIfFollowed = false,
    sourceScreenName = ""
  ): Promise<Object> {
    const userDetailsFromTwitter = await this.getUserDetails(loggedInUserId);
    const returnObj = {};
    returnObj["hasTweetUrlVerified"] = true;
    if (needUserDetails) {
      returnObj["user"] = userDetailsFromTwitter;
    }

    if (needUserDetails && checkIfFollowed) {
      const followed = await this.hasFollowed(
        sourceScreenName,
        returnObj["user"]["screen_name"]
      );
      returnObj["user"]["followed"] = {
        to: sourceScreenName,
        hasFollowed: followed,
      };
    }

    logger.info(returnObj);
    return returnObj;
  }

  /**
   * Verifes whether target follows source
   * @param sourceScreenName user who get followed
   * @param targetScreenName user who follows
   * @returns boolean
   */
  async hasFollowed(
    sourceScreenName: string,
    targetScreenName: string
  ): Promise<boolean> {
    const response = await this.tweeterClient.get("friendships/show", {
      source_screen_name: sourceScreenName,
      target_screen_name: targetScreenName,
    });
    const { data } = response;

    if (!data) {
      throw new Error("could not fetch friendship information");
    }

    const { relationship } = data;

    if (!relationship) {
      throw new Error("no relationship found");
    }

    const { source, target } = relationship;
    if (!source || !target) {
      throw new Error("no source or target object found");
    }

    if (source.followed_by && target.following) {
      return true;
    } else {
      return false;
    }
  }
}
