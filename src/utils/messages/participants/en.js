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
    UPDATE_FAILED: "Error: could not update the action",
    NO_ACTION_FOUND: "Error: no actions found with user",
    SOME_ERROR: "Error: some error occurred"
}
const EVENT_ACTIONS = {
    UNAUTHENTICATED: "Error: Please login to proceed",
    INVALID_INPUT: "Error: Field value is invalid",
    URL_NOT_VISITED: "Error: Please visit the link",
    WENT_WRONG: "Error: Something Went Wrong",
    ERROR: "Error occurred: ",
    ALREADY_AUTHERIZED:"You are already authorized. Please proceed to perform action.",
    INPUT_DATE: {
        INVALID_DATE_TIME: "Error: Invalid date time"
    },
    TELEGRAM_JOIN: {
        TELEGRAM_AUTH: "Error: Please authorize telegram to proceed",
        AUTH_FAILED: "Authentication Failed! Try again",
        FETCH_USERNAME_FAILED: "Could not fetch the username after telegram authentication",
        JOIN_TG: "Please Join and then try again",
        ASK_ADMIN_TO_SET_GROUPID: "Please ask organizer to set proper group username at the admin panel or make sure you added the bot to your channel or group"
    },
    DISCORD_JOIN: {
        DISCORD_AUTH: "Error: Please authorize discord to proceed",
        AUTH_FAILED: "Authentication Failed! Try again",
    },
    TWITTER_FOLLOW: {
        TWITTER_AUTH: "Error: Please authorize and follow",
        FOLLOW_FIRST: "Error: Please follow first",
        TWITTER_SCREENS_BLANK: "Error: Source or target twitter screen name is  blank",
    },
    TWITTER_RETWEET: {
        INVALID_RETWEET: "Error: Invalid retweet"
    },
    GITHUB_PR:{
        GITHUB_AUTH:"Error: Please authorize and give GitHub PR URL",
        GITHUB_PR_EMPTY:"Error: Please Enter your GitHub PR URL",
        INVALID_GITHUB_PR_URL:"Error: Invalid GitHub PR URL"
    },
    ETH: {
        INVALIDWEB3: "Web3 provider not found. Please install Metamask wallet",
        INVALID_SIG: "Invalid signature",
        CONNECT_METAMASK: "Connect your metamask wallet",
        INSUFFICIENT_BALANCE: "Insufficient balance"
    },
    REEF: {
        CONNECT_REEF_WALLET: "Connect your reef wallet by selcting address options"
    },
    SUBS: {
        SUBS_NOTIFICATION: "Click On Subscribe Notificaion"
    }
}




module.exports = {
    EVENT,
    EVENT_ACTIONS,
    ACTIONS,
}