import { Injectable, NgZone } from '@angular/core';

import { IonicAuth, IAuthConfig } from 'ionic-appauth';
import { RequestorService } from './cordova/requestor.service';
import { BrowserService } from './cordova/browser.service';
import { SecureStorageService } from './cordova/secure-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends IonicAuth  {
  authConfig : IAuthConfig = {
    identity_client: 'myAuthApp',
    identity_server: 'http://192.168.0.1/',
    redirect_url: 'myAuthApp://appAuth', 
    scopes: 'openid profile offline_access myAuthApp.api',
    usePkce: true,
    end_session_redirect_url: 'myAuthApp://endSession',
    auth_extras: {
      'access_type': 'offline'
    }
  }
  
  constructor(
    requestor : RequestorService,
    secureStorage : SecureStorageService,
    browser : BrowserService,
    private ngZone: NgZone,
  ){
    super(browser, secureStorage, requestor);
  }

  public async startUpAsync() {
    (<any>window).handleOpenURL = (callbackUrl) => {  
      this.ngZone.run(() => {
          this.handleCallback(callbackUrl);
      });
    };

    super.startUpAsync();
  }

  private handleCallback(callbackUrl: string): void {
    if ((callbackUrl).indexOf(this.authConfig.redirect_url) === 0){
      this.AuthorizationCallBack(callbackUrl);
    }
    
    if ((callbackUrl).indexOf(this.authConfig.end_session_redirect_url) === 0){
      this.EndSessionCallBack();
    }
  }
}
