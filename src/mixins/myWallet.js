import { configureChains, createClient } from '@wagmi/core';
import { goerli, mainnet, polygon, polygonMumbai } from '@wagmi/core/chains';
// import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect';
import { EthereumClient, w3mConnectors,w3mProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/html';
import config from "../config"
let web3modal;
const initWalletConnect = () => {
    const chains = [mainnet, goerli, polygonMumbai, polygon]
    const projectId = config.walletConnect.WALLETCONNECT_PROJECT_ID;

//below commented code is for walletConnect v2. Since wallets like metamask, rainbow,etc have not yet integrated v2.

    // const wcConnector = new WalletConnectConnector({
    //     chains: chains,
    //     options: {
    //         version: 2,
    //         projectId,
    //     },
    // });

    // const { provider, webSocketProvider } = configureChains(chains, [w3mProvider({ projectId })]);
    // const wagmiClient = createClient({
    //     autoConnect: true,
    //     connectors: [wcConnector],
    //     provider,
    //     webSocketProvider,
    // });
    
    let { provider, webSocketProvider } = configureChains(chains, [w3mProvider({ projectId})]);        
    const wagmiClient = createClient({
        autoConnect: true,
        connectors: w3mConnectors({ projectId, version: 1, chains }),        
        provider,
        webSocketProvider,
    });     
    const ethereumClient = new EthereumClient(wagmiClient, chains)
    web3modal = new Web3Modal(
        { projectId},
        ethereumClient
    );
};   

export { initWalletConnect, web3modal };