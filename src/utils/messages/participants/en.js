const EVENT = {
    BANNER: {

    },
    PROFILE: {
        TEXT_COPIED: "Text copied to clipboard",
        ERROR_WHILE_COPYING: "Error in copying text: "
    },
    EVENT_IS_OVER: {

    },
    LOGIN: {
        SOCKET_INIT: "Connecting to auth server...",
        SOCKET_OPEN: "Connected to auth server...",
        SOCKET_ERROR: "Error while fetching the QR data :("
    },

}

const ACTIONS = {
    UPDATE_FAILED: "Could not update the action",
    NO_ACTION_FOUND: "No actions found with user",
    SOME_ERROR: "Some error occurred"
}
const EVENT_ACTIONS = {
    UNAUTHENTICATED: "Please login to proceed",
    INVALID_INPUT: "Field value is invalid",
    URL_NOT_VISITED: "Please visit the link",
    WENT_WRONG: "Something Went Wrong",
    ERROR: "Error occurred: ",
    ALREADY_AUTHERIZED:"You are already authorized. Please proceed to perform action.",
    TWITTER_AUTH_AGAIN:"Authentication failed Please authorize Twitter again",
    INPUT_DATE: {
        INVALID_DATE_TIME: "Invalid date time"
    },
    TELEGRAM_JOIN: {
        TELEGRAM_AUTH: "Please authorize telegram to proceed",
        AUTH_FAILED: "Authentication Failed! Try again",
        FETCH_USERNAME_FAILED: "Could not fetch the username after telegram authentication",
        JOIN_TG: "Please Join and then try again",
        ASK_ADMIN_TO_SET_GROUPID: "Please ask organizer to set proper group username at the admin panel or make sure you added the bot to your channel or group"
    },
    DISCORD_JOIN: {
        DISCORD_AUTH: "Please authorize discord to proceed",
        AUTH_FAILED: "Authentication Failed! Try again",
    },
    TWITTER_FOLLOW: {
        TWITTER_AUTH: "Please authorize and follow",
        FOLLOW_FIRST: "Please follow first",
        TWITTER_SCREENS_BLANK: "Source or target twitter screen name is blank",
    },
    TWITTER_RETWEET: {
        INVALID_RETWEET: "Invalid repost",
        TWITTER_RETWEET_AUTH: "Please authorize and give Repost URL",
        ENTER_RETWEET_URL: "Please enter Repost URL"
    },
    GITHUB_PR:{
        GITHUB_AUTH:"Please authorize and give GitHub PR URL",
        GITHUB_PR_EMPTY:"Please Enter your GitHub PR URL",
        INVALID_GITHUB_PR_URL:"Invalid GitHub PR URL",
        AUTH_AGAIN: "Authentication failed Please authorize GitHub again"
    },
    ETH: {
        INVALIDWEB3: "Web3 provider not found. Please install Metamask wallet",
        INVALID_SIG: "Invalid signature",
        CONNECT_METAMASK: "Connect your metamask wallet",
        INSUFFICIENT_BALANCE: "Insufficient balance"
    },
    REEF: {
        CONNECT_REEF_WALLET: "Connect your reef wallet by selecting address options"
    },
    COSMOS:{
        CONNECT_KEPLR_WALLET: "Connect your Keplr Wallet"
    },
    SUBS: {
        SUBS_NOTIFICATION: "Click On Subscribe Notification"
    }
}




module.exports = {
    EVENT,
    EVENT_ACTIONS,
    ACTIONS,
}