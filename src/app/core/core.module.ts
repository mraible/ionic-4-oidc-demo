import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CordovaRequestorService } from './cordova/cordova-requestor.service';
import { SecureStorageService } from './cordova/secure-storage.service';
import { AuthService } from './auth.service';
import { AuthHttpService } from './auth-http.service';
import { AuthGuardService } from './auth-guard.service';
import { BrowserService } from './cordova/browser.service';
import { StorageService } from './angular/storage.service';
import { RequestorService } from './angular/requestor.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    BrowserService,
    RequestorService,
    CordovaRequestorService,
    SecureStorageService,
    StorageService,
    AuthGuardService,
    AuthHttpService,
    AuthService
  ]
})
export class CoreModule { }
