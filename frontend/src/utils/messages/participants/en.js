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

    },
    TWITTER_FOLLOW: {

    },
    TWITTER_RETWEET: {

    }
}




module.exports = {
    EVENT,
    EVENT_ACTIONS
}