
// Note:  This will check only for http and https  schem and 
// will reject other schmes. For example, www.example.com, javascript:void(0) are invalid urls
// This voilates RFC3986 (https://tools.ietf.org/html/rfc3986)
export function isValidURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}

// Note: string including numbers are concidered valid text
// for example, texts like 1231WEWEW12312, qweqw12qw, q2q2e33r3 are valid
export function isValidText(str){
    if (str.match(/^[a-zA-Z0-9 ]*[a-z][a-zA-Z0-9]*$/)) {	
        return true;
    }else {        
        return false
    }
}

// Note: this will check is str is undefined, null, " ", "" 
export function isEmpty(str){
    if(str == " "){
      return true
    }
    if(!str){
        return true
    }
    return false
}
