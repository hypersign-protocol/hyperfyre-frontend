import validURL from 'valid-url';

export function isValidURL(str: string): boolean {   
  const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str) || validURL.isUri(str);// 
}

export function validateDate(date: any): Promise<boolean>{
  return new Promise((resolve, reject) => {
    if(isNaN(Date.parse(date))){
      reject(false);
    }
    resolve(true);
  })
}


export function notLessThanCurrent(dateTime : string): Promise<boolean>{
  return new Promise((resolve, reject) => {
    if(new Date().toISOString() > new Date(dateTime).toISOString()){
      reject("You can not set from date time before present time");
    }
    resolve(true);
  })
}
