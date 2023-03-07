import { configureChains, createClient } from '@wagmi/core';
import { goerli, mainnet, polygon, polygonMumbai } from '@wagmi/core/chains';
// import { WalletConnectConnector } from '@wagmi/core/connectors/walletConnect';
import { EthereumClient, modalConnectors,walletConnectProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/html';
import { infuraProvider } from '@wagmi/core/providers/infura'
let web3modal;
const initWalletConnect = () => {
    const chains = [mainnet, goerli, polygonMumbai, polygon]
    const projectId = "fbfdbb1de5edf959542332ca2fd47946";

    // const wcConnector = new WalletConnectConnector({
    //     chains: chains,
    //     options: {
    //         version: '2',
    //         projectId,
    //     },
    // });

    // const { provider, webSocketProvider } = configureChains(chains, [walletConnectProvider({ projectId })]);
    // const wagmiClient = createClient({
    //     autoConnect: true,
    //     connectors: [wcConnector],
    //     provider,
    //     webSocketProvider,
    // });
    
    let { provider, webSocketProvider } = configureChains(chains, [walletConnectProvider({ projectId}),
        infuraProvider({ apiKey:  'ab66b962539745f9bc4abd4c5ee2a711'})]);        
    const wagmiClient = createClient({
        autoConnect: true,
        connectors: [...modalConnectors({ appName: 'Reward Dist Poc', chains })],
        provider,
        webSocketProvider,
    });     
    const ethereumClient = new EthereumClient(wagmiClient, chains)
    web3modal = new Web3Modal(
        { projectId, themeMode: 'dark', themeColor: 'blue', themeBackground: 'gradient' },
        ethereumClient
    );
};   

export { initWalletConnect, web3modal };


