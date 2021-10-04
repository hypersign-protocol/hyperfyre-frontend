const EVENT = {
    BANNER: {

    },
    EVENT_IS_OVER: {

    },
    LOGIN: {
        SOCKET_INIT: "Connecting to auth server...",
        SOCKET_OPEN: "Connected to auth server...",
        SOCKET_ERROR: "Error while fetching the QR data :("
    },

}

const EVENT_ACTIONS = {
    INVALID_FIELD: {
        INVALID_INPUT: "Error: Field value is invalid"
    },
    INPUT_DATE: {
        INVALID_DATE_TIME: "Error: Invalid date time"
    },
    TELEGRAM_JOIN: {
        TELEGRAM_AUTH: "Error: Please authorize telegram to proceed",
        AUTH_FAILED: "Authentication Failed! Try again",
        FETCH_USERNAME_FAILED: "Could not fetch the username after telegram authentication",
        ERROR: "Error occurred: "
    },
    WENT_WRONG: "Error: Something Went Wrong",
    TWITTER_FOLLOW: {
        FOLLOW_FIRST: "Error: Please follow first",
        TWITTER_SCREENS_BLANK: "Error: Source or target twitter screen name is  blank",
    },
    TWITTER_RETWEET: {
        INVALID_RETWEET: "Error: Invalid retweet"
    }
}




module.exports = {
    EVENT,
    EVENT_ACTIONS
}