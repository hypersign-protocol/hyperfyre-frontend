const config = {
    studioServer: {
        BASE_URL: process.env.VUE_APP_STUDIO_SERVER_BASE_URL
    },
    app: {
        name: process.env.VUE_APP_TITLE,
        decription: process.env.VUE_APP_DESC,
        version: process.env.VUE_APP_VERSION
    },
    recaptchaSiteKey: process.env.VUE_APP_RECAPTCHA_SITE_KEY,
    webWalletAddress: process.env.VUE_APP_WEBWALLET_URL,
    mobileWalletAddress: process.env.VUE_APP_MOBILEWALLET_URL,
    websocketUrl: process.env.VUE_APP_SERVER_WEBSOCKET_URL,
    auth0Domain: process.env.VUE_APP_AUTH0_DOMAIN,
    auth0ClinetId: process.env.VUE_APP_AUTH0_CLIENT_ID,
    telegramBotId: process.env.VUE_APP_TELEGRAM_BOT_ID,
    eventActionType: {
        INPUT_TEXT: "INPUT_TEXT",
        INPUT_NUMBER :"INPUT_NUMBER",
        TWITTER_FOLLOW :"TWITTER_FOLLOW",
        TWITTER_RETWEET :"TWITTER_RETWEET",
        TELEGRAM_JOIN :"TELEGRAM_JOIN",
        BLOCKCHAIN_ETH: "BLOCKCHAIN_ETH",
        BLOCKCHAIN_TEZ: "BLOCKCHAIN_TEZ"   
    }
}

export default config