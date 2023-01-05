import Web3 from 'web3'

async function loadWeb3()  {    
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum);
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