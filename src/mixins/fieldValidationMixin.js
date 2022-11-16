// Note:  This will check only for http and https  schem and
// will reject other schmes. For example, www.example.com, javascript:void(0) are invalid urls
// This voilates RFC3986 (https://tools.ietf.org/html/rfc3986)
import validURL from "valid-url";
export function isValidURL(str) {
    // const pattern = new RegExp(
    //   "^(https?:\\/\\/)?" + // protocol
    //   "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    //   "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    //   "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    //   "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
    //     "(\\#[-a-z\\d_]*)?$",
    //   "i"
    // ); // fragment locator
    return /*!!pattern.test(str) ||*/ validURL.isUri(str); //
}

//twitter username contains only 15 characters including alphabets,numbers[0-9] and underscore
export function isValidTwitterUsername(str) {
    if (!str.match(/^[a-zA-Z0-9_]{1,15}$/)) {
        return true;
    } else {
        return false;
    }
}

//telegram username contains only numbers[0-9], alphabets and underscore 
//for telegram there is no limit mentioned for username as mentioned in twitter username 
export function isValidTelegramName(str) {
    if (!str.match(/^[a-zA-Z0-9_]{1,}$/)) {
        return true;
    } else {
        return false;
    }
}

// Note: string including numbers are concidered valid text
// for example, texts like 1231WEWEW12312, qweqw12qw, q2q2e33r3 are valid
export function isValidText(str) {
    if (str.match(/^[a-zA-Z0-9 ]*[a-z][a-zA-Z0-9]*$/)) {
        return true;
    } else {
        return false;
    }
}

export function isValidSlug(str) {
    if (str.match(/^([a-z0-9])*(-([a-z0-9])*)*$/)) {
        return true
    } else {
        return false
    }
}
// Note: this will check is str is undefined, null, " ", ""
export function isEmpty(str) {
    if (str == " ") {
        return true;
    }
    if (!str) {
        return true;
    }
    return false;
}
export function isContractValid(str) {
    if (str.match(/^0x[a-fA-F0-9]{40}$/)) {
        return true;
    } else {
        return false;
    }
}
export function isdiscordLink(str) {
    if (!str.includes('https://discord.')) {
        return true
    }
}
export function isNum(str) {
    if (str.match(/^[1-9]\d*$/)) {
        return true
    } else {
        return false
    }
}
export function isretweetUrl(str) {
    if (!str.match(/https:\/\/twitter\.com\/.*\/status\/[0-9]+/)) {
        return true
    }
}
export function isGithubUrl(str){
    if(!str.includes('https://github.com/')){
        return true;
    } else {
        return false;
    }
}
export function isDate(date) {
    if (!date) {
        return false;
    }
    return new Date(date) !== "Invalid Date" && !isNaN(new Date(date));
}

export function truncate(str, limit) {
    if (!str) {
        return
    }

    if (!limit) {
        return
    }

    // if less than limit then do nothing
    if (str.length <= limit) {
        return str;
    }

    const eachLen = Math.floor(limit / 3); //  we need to 3 parts
    const firstPart = str.substr(0, eachLen);
    const lastPart = str.slice(-eachLen);
    return firstPart + " ... " + lastPart;
}

export function checkTitle(arr, prop) {

    const actionTitle = arr.map(item => item[prop] !== "");
    return actionTitle;

}

export function checkValue(arr, prop) {

    const actionValue = arr.map(item => item[prop] !== "");
    return actionValue;

}
export function isFloat(n) {
    const parsedNumber = parseFloat(n)
    if(parsedNumber === parsedNumber && parsedNumber % 1 !== 0){
        return true;
    }else{
        return false;
    }
    }
export function urlSanitizer(url, endsWith) {
    switch (endsWith) {
        case true:
            {
                if (url.endsWith("/")) {
                    return url;
                } else {
                    return url + "/";
                }
            }
        case false:
            {
                if (url.endsWith("/")) {
                    return url.slice(0, -1);
                } else {
                    return url;
                }
            }
        default:
            return url;
    }
}

export function ifSpaceExists(str) {
    str= str.trim()
    str = str.split(' ')
    if (str.length > 1) {
       return true
    }
    else return false 
  }