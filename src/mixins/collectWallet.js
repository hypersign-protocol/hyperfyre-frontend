import {signMessage,fetchSigner } from "@wagmi/core";
import config from "../config"
async function signWallet() {
  try{
    let modalClose = false
    let address;
    const getDataFromLocalStorage = localStorage.getItem('wagmi.store')
    const parsed = JSON.parse(getDataFromLocalStorage).state.data.account    
    const getWalletConnect = localStorage.getItem('walletconnect')
    if(getWalletConnect !== null){
    const parsedData = JSON.parse(getWalletConnect)
    const isMetamask = parsedData.peerMeta.name    
    if(isMetamask === 'MetaMask'){
      if(/iPhone/i.test(navigator.userAgent)){
        const url = "metamask://dapp/google.co"
        const a = document.createElement("a");
        a.href = url;
        a.target = "_self";
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    }
    }        
    const signature = await signMessage
    ({
      message:config.wallet.message_sign
    })
    const signingKey = await fetchSigner()      
    const resolvedAddress = signingKey._address    
    if(parsed === resolvedAddress){
    modalClose = true  
    address = resolvedAddress       
    } 
    const userData = {
      address,
      signature,
      modalClose
    }
    return userData  
 }catch(e){  
  throw new Error (e.message)
 }           
}
export default signWallet;