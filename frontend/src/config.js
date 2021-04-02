import EnvProvider from 'jvjr-docker-env'
const hsdk = require('lds-sdk')

const config = {
    studioServer: {
        BASE_URL: EnvProvider.value('STUDIO_SERVER_BASE_URL'),
        AUTH_CHALLENGE_EP: EnvProvider.value('STUDIO_SERVER_AUTH_CHALLENGE_EP') || "api/auth/challenge",
        AUTH_LOGIN_EP: EnvProvider.value('STUDIO_SERVER_AUTH_LOGIN_EP') || "api/auth/login"
    },
    app: {
        name: EnvProvider.value('TITLE') || "Dalmia Tracebil",
        decription: EnvProvider.value('DESC'),
        version: EnvProvider.value('VERSION')
    },

}


export default config