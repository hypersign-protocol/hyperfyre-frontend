const config = {
    studioServer: {
        BASE_URL: process.env.VUE_APP_STUDIO_SERVER_BASE_URL
    },
    app: {
        name: process.env.VUE_APP_TITLE || "Dalmia Tracebil",
        decription: process.env.VUE_APP_DESC,
        version: process.env.VUE_APP_VERSION
    },
    recaptchaSiteKey: process.env.VUE_APP_RECAPTCHA_SITE_KEY,
    webWalletAddress: process.env.VUE_APP_WEBWALLET_URL,
}


export default config