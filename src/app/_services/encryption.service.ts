import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {SECRET_KEY} from '../_models/constants.interface'

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor() { }

  encrypt(value: any): any {
    let word = CryptoJS.enc.Utf8.parse(value);
    return CryptoJS.enc.Base64.stringify(word)//SECRET_KEY).toString();
  }

  decrypt(textToDecrypt: any):any {

    //let words = CryptoJS.enc.Base64.parse(textToDecrypt);
    return CryptoJS.AES.decrypt(textToDecrypt, SECRET_KEY).toString(CryptoJS.enc.Utf8) //CryptoJS.enc.Utf8.stringify(words); // SECRET_KEY).toString(CryptoJS.enc.Utf8);
  }
}
