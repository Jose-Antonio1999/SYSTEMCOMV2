import { IvyParser } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

//crypto
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { catchError, retry } from 'rxjs/internal/operators';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  encryptMessage(keys,value):any{
    const encrypt = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), keys);

    return encrypt.toString();
  }

  decryptMessage(keys,value):any{
    const decrypt = CryptoJS.AES.decrypt(value,keys);
    return decrypt.toString(CryptoJS.enc.Utf8);
  }



}


