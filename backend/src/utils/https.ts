import httpsLocalhost from 'https-localhost';
import { whitelist } from '../config';

// Ref: https://github.com/daquinoaldo/https-localhost#use-as-module
export function getCerts(): Promise<any> {
  return new Promise((resolve, reject) => {
    httpsLocalhost()
      .getCerts()
      .then((cert) => {
        resolve(cert);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

// Ref: https://www.npmjs.com/package/cors
export function corsOptionsDelegate(req, callback): void {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
}

export function getRandomArbitrary(min, max): Number {
  return Math.ceil(Math.random() * (max - min) + min);
}
