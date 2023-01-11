import { Buffer } from 'buffer';
import { MaxUint256 } from "@ethersproject/constants";
const bs58 = require('bs58')


function buf2hex(buffer) {
  // buffer is an ArrayBuffer
  return [...new Uint8Array(buffer)]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("");
}
export function ipfsHashToBytes32(ipfsHash) {
  const bytes = "0x" + buf2hex(bs58.decode(ipfsHash)).slice(4);  
  return bytes;
}
export function bytes32ToIpfsHash(bytes32Hex) {
  // Add our default ipfs values for first 2 bytes:
  // function:0x12=sha2, size:0x20=256 bits
  // and cut off leading "0x"
  const hashHex = "1220" + bytes32Hex.slice(2);
  const hashBytes = Buffer.from(hashHex, "hex");
  const hashStr = bs58.encode(hashBytes);  
  return hashStr;
}
export function getMaxApprove() {
  return MaxUint256.toString()
}