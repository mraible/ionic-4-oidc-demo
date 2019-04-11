import { Platform } from '@ionic/angular';
import { Injectable, NgZone } from '@angular/core';

import { IonicAuth } from 'ionic-appauth';
import { StorageService } from './angular/storage.service';
import { RequestorService } from './angular/requestor.service';
import { CordovaBrowser, CordovaRequestor, CordovaSecureStorage } from 'ionic-appauth/lib/cordova';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends IonicAuth {

  constructor(requestor: RequestorService, storage: StorageService,
              private platform: Platform, private ngZone: NgZone) {
    super((platform.is('cordova')) ? new CordovaBrowser() : undefined,
      (platform.is('cordova')) ? new CordovaSecureStorage() : storage,
      (platform.is('cordova')) ? new CordovaRequestor() : requestor);

    this.addConfig();
  }

  public async startUpAsync() {
    if (this.platform.is('cordova')) {
      (<any>window).handleOpenURL = (callbackUrl) => {
        this.ngZone.run(() => {
          this.handleCallback(callbackUrl);
        });
      };
    }

    super.startUpAsync();
  }

  private addConfig() {
    const clientId = '0oak8qpmhim2MmwF20h7';
    const issuer = 'https://dev-737523.oktapreview.com/oauth2/default';
    const scopes = 'openid profile offline_access';

    if (this.platform.is('cordova')) {
      this.authConfig = {
        identity_client: clientId,
        identity_server: issuer,
        redirect_url: 'com.oktapreview.dev-737523:/callback',
        scopes: scopes,
        usePkce: true,
        end_session_redirect_url: 'com.oktapreview.dev-737523:/logout',
      };
    } else {
      this.authConfig = {
        identity_client: clientId,
        identity_server: issuer,
        redirect_url: 'http://localhost:8100/implicit/callback',
        scopes: scopes,
        usePkce: true,
        response_type: 'code',
        end_session_redirect_url: 'http://localhost:8100/implicit/logout',
      };
    }
  }

  private handleCallback(callbackUrl: string): void {
    if ((callbackUrl).indexOf(this.authConfig.redirect_url) === 0) {
      // todo: don't ignore promise or refactor
      this.AuthorizationCallBack(callbackUrl);
    }

    if ((callbackUrl).indexOf(this.authConfig.end_session_redirect_url) === 0) {
      this.EndSessionCallBack();
    }
  }
}
