const EVENT = {
    BANNER: {

    },
    PROFILE:{
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
    INVALID_INPUT: "Error: Field value is invalid",
    WENT_WRONG: "Error: Something Went Wrong",
    ERROR: "Error occurred: ",
    INPUT_DATE: {
        INVALID_DATE_TIME: "Error: Invalid date time"
    },
    TELEGRAM_JOIN: {
        TELEGRAM_AUTH: "Error: Please authorize telegram to proceed",
        AUTH_FAILED: "Authentication Failed! Try again",
        FETCH_USERNAME_FAILED: "Could not fetch the username after telegram authentication",
    },
    DISCORD_JOIN: {
        DISCORD_AUTH: "Error: Please authorize telegram to proceed",
        AUTH_FAILED: "Authentication Failed! Try again",
    },
    TWITTER_FOLLOW: {
        FOLLOW_FIRST: "Error: Please follow first",
        TWITTER_SCREENS_BLANK: "Error: Source or target twitter screen name is  blank",
    },
    TWITTER_RETWEET: {
        INVALID_RETWEET: "Error: Invalid retweet"
    },
    ETH: {
        INVALIDWEB3: "Web3 provider not found. Please install Metamask wallet",
        INVALID_SIG: "Invalid signature"
    }
}




module.exports = {
    EVENT,
    EVENT_ACTIONS,
    ACTIONS
}