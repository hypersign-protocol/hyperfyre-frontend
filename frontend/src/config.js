import {urlSanitizer} from "../src/mixins/fieldValidationMixin"
const config = {
    studioServer: {
        BASE_URL: urlSanitizer(process.env.VUE_APP_STUDIO_SERVER_BASE_URL,true)
    },
    app: {
        name: process.env.VUE_APP_TITLE,
        decription: process.env.VUE_APP_DESC,
        version: process.env.VUE_APP_VERSION
    },
    recaptchaSiteKey: process.env.VUE_APP_RECAPTCHA_SITE_KEY,
    webWalletAddress: urlSanitizer(process.env.VUE_APP_WEBWALLET_URL,false),
    mobileWalletAddress: urlSanitizer(process.env.VUE_APP_MOBILEWALLET_URL,false),
    websocketUrl: urlSanitizer(process.env.VUE_APP_SERVER_WEBSOCKET_URL,true),
    auth0Domain:urlSanitizer(process.env.VUE_APP_AUTH0_DOMAIN,false),
    auth0ClinetId: process.env.VUE_APP_AUTH0_CLIENT_ID,
    telegramBotId: process.env.VUE_APP_TELEGRAM_BOT_ID,
    eventActionType: {
        INPUT_TEXT: "INPUT_TEXT",
        INPUT_NUMBER :"INPUT_NUMBER",
        TWITTER_FOLLOW :"TWITTER_FOLLOW",
        TWITTER_RETWEET :"TWITTER_RETWEET",
        TELEGRAM_JOIN :"TELEGRAM_JOIN",
        BLOCKCHAIN_ETH: "BLOCKCHAIN_ETH",
        BLOCKCHAIN_TEZ: "BLOCKCHAIN_TEZ",
        ETHEREUM_ERC20:"ETHEREUM_ERC20",
        ETHEREUM_ERC721:"ETHEREUM_ERC721" 
    }
}

export default config