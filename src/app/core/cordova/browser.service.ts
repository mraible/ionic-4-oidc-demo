import { CordovaBrowser } from 'ionic-appauth/lib/cordova';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserService extends CordovaBrowser {
}
