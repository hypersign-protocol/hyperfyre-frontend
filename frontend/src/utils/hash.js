const  shajs = require('sha.js');

const  aesjs = require('aes-js')


const CTR = aesjs.ModeOfOperation.ctr

function sha256hash (input) {
    return shajs('sha256').update(input).digest()
  }
  
function sha256hashStr(input){
  return aesjs.utils.hex.fromBytes(sha256hash(input));
}

module.exports = {
    sha256hashStr
}
