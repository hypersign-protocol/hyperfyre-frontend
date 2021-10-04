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
    BLOCKCHAIN_ETH_AND_TEZ: {
        INVALID_FIELD: "Error: Field value is invalid"
    },
    INPUT_DATE: {

    },
    INPUT_NUM: {

    },
    INPUT_TEXT: {

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