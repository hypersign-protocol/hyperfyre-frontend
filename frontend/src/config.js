const config = {
    studioServer: {
        BASE_URL: process.env.VUE_APP_STUDIO_SERVER_BASE_URL
    },
    app: {
        name: process.env.VUE_APP_TITLE || "Dalmia Tracebil",
        decription: process.env.VUE_APP_DESC,
        version: process.env.VUE_APP_VERSION
    },

}


export default config