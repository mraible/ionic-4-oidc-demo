import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestorService } from './cordova/requestor.service';
import { SecureStorageService } from './cordova/secure-storage.service';
import { AuthService } from './auth.service';
import { AuthHttpService } from './auth-http.service';
import { AuthGuardService } from './auth-guard.service';
import { BrowserService } from './cordova/browser.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    BrowserService,
    RequestorService,
    SecureStorageService,
    AuthGuardService,
    AuthHttpService,
    AuthService
  ]
})
export class CoreModule { }
