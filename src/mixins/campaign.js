export default {
  data() {
    return {
      prizeTypes: [{ text: "Prize Card", value: "PRIZE_CARD" }],

      smartContractTypes: [
        { text: "Ethereum ERC20", value: "ETHEREUM_ERC20" },
        { text: "Ethereum ERC721", value: "ETHEREUM_ERC721" },
        { text: "Polygon ERC20", value: "MATIC_ERC20" },
        { text: "Polygon ERC721", value: "MATIC_ERC721" },
        { text: "Binance ERC20", value: "BINANCE_ERC20" },
        { text: "Binance ERC721", value: "BINANCE_ERC721" },
        { text: "Moon Beam ERC20", value: "MOONBEAM_ERC20" },
        { text: "Moon Beam ERC721", value: "MOONBEAM_ERC721" },
        { text: "Moon River ERC20", value: "MOONRIVER_ERC20" },
        { text: "Moon River ERC721", value: "MOONRIVER_ERC721" },
        { text: "Moon Alpha(testnet) ERC20", value: "MOON_ERC20" },
        { text: "Moon Alpha(testnet) ERC721", value: "MOON_ERC721" },
        { text: "Reef ERC20", value: "REEF_ERC20" },
        { text: "Reef ERC721", value: "REEF_ERC721" },
      ],

      socialTypes: [
        { text: "Twitter Follow", value: "TWITTER_FOLLOW" },
        { text: "Twitter Retweet", value: "TWITTER_RETWEET" },
        { text: "Telegram Join", value: "TELEGRAM_JOIN" },
        { text: "Discord Join", value: "DISCORD_JOIN" },
      ],

      walletTypes: [
        { text: "Ethereum", value: "BLOCKCHAIN_ETH" },
        { text: "Polygon", value: "BLOCKCHAIN_MATIC" },
        { text: "Binance Smart chain", value: "BLOCKCHAIN_BSC" },
        { text: "Harmony", value: "BLOCKCHAIN_ONE" },
        { text: "Avalanche", value: "BLOCKCHAIN_AVAX" },
        { text: "Reef", value: "BLOCKCHAIN_REEF" },
        { text: "Tezos", value: "BLOCKCHAIN_TEZ" },
      ],

      customTypes: [
        { text: "TEXT", value: "INPUT_TEXT" },
        { text: "NUMBER", value: "INPUT_NUMBER" },
        { text: "DATE", value: "INPUT_DATE" },
        { text: "LINK", value: "INPUT_HYPERLINK" },
        { text: "HYPERLINK", value: "HYPERLINK_URL" },
        { text: "INFO", value: "INFO_TEXT" },
      ],
    };
  },
};
