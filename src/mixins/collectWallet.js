import {signMessage,fetchSigner } from "@wagmi/core";
import config from "../config"
async function signWallet() {
  try{
    let modalClose = false
    let address;
    const getDataFromLocalStorage = localStorage.getItem('wagmi.store')
    const parsed = JSON.parse(getDataFromLocalStorage).state.data.account 
    console.log(parsed)
    const getWalletConnect = localStorage.getItem('walletconnect')
    if(getWalletConnect !== null){
      console.log(getWalletConnect)
    console.log(JSON.parse(getWalletConnect).accounts[0])
    const parsedData = JSON.parse(getWalletConnect)
    const isMetamask = parsedData.peerMeta.name
    console.log(isMetamask)
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
    console.log(resolvedAddress)  
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
  console.log(e.message)
  throw new Error (e.message)
 }           
}
function iOS(){
  return [    
    'iPhone',   
  ].includes(navigator.platform)
}
export default signWallet;