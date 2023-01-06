import Web3 from 'web3'

async function loadWeb3(inDecimal)  {    
    if(window.ethereum){      
     const chain = Web3.utils.toHex(inDecimal);     
      window.web3 = new Web3(window.ethereum);
      const chainIdd = await window.ethereum.request({ method: "eth_chainId" });      
      if(chainIdd !== chain){
      try {
       const res = await window.ethereum.request({
          method:'wallet_switchEthereumChain',
          params: [{ chainId: chain }],
        })
        console.log(res)
      }catch(switchError) {        
        if(switchError.code === 4902) {
              try{               
                switch (chain) {                  
                  case '0x1':
                    await window.ethereum.request({
                      method: "wallet_addEthereumChain",
                      params: [
                        {
                          chainId: "0x1",
                          chainName: "Ethereum Mainnet",
                          rpcUrls: [
                            "https://mainnet.infura.io/v3/",
                          ],
                          blockExplorerUrls: ["https://etherscan.io"],
                          nativeCurrency: {
                            symbol: "ETH",
                            decimals: 18,
                          },
                        },
                      ],
                    }); 
                    break
                  case '0x89':                    
                    await window.ethereum.request({
                      method: "wallet_addEthereumChain",
                      params: [
                        {
                          chainId: "0x89",
                          chainName: "Polygon mainnet",
                          rpcUrls: [
                            "https://polygon-rpc.com/",
                          ],
                          blockExplorerUrls: ["https://polygonscan.com"],
                          nativeCurrency: {
                            symbol: "MATIC",
                            decimals: 18,
                          },
                        },
                      ],
                    }); 
                    break
                    case '0x5':
                      await window.ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: [
                          {
                            chainId: "0x5",
                            chainName: "Goerli test network",
                            rpcUrls: [
                              "https://goerli.infura.io/v3/",
                            ],
                            blockExplorerUrls: ["https://goerli.etherscan.io"],
                            nativeCurrency: {
                              symbol: "GoerliETH",
                              decimals: 18,
                            },
                          },
                        ],
                      }); 
                    break;                                  
                }
                
              } catch(addError){
                console.log(addError)
              }    
        }
      }
      }
      await window.ethereum.request({ method: "eth_requestAccounts" });      
      return window.web3;
    }else if(window.web3){
      window.web3 = new Web3(window.web3.currentProvider);
      return window.web3;
    }else{
      window.alert("Non-Ethereum browser detected");
      return null;
    }
}

export default loadWeb3;