import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';
import { AuthActions, IAuthAction } from 'ionic-appauth';
import { catchError, skipWhile, take } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  template: '<p>Signing in...</p>'
})
export class AuthCallbackPage implements OnInit {

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.authService.AuthorizationCallBack(this.router.url).catch(console.error);
    this.authService.authObservable
      .pipe(
        catchError( err => {
          if ( err.status === 401 ) {
            console.log('Login failure');
          } else {
            console.log('Caught Error in Auth Observable ' + err);
          }
          const ignore: IAuthAction = { action: AuthActions.SignInFailed, tokenResponse: null };
          return of(ignore);
        }),
        skipWhile(action => action.action !== AuthActions.SignInSuccess
        && action.action !== AuthActions.SignInFailed), take(1))
      .subscribe(
        (action) => {
          console.log('Event caught ' + AuthActions);
          if (action.action === AuthActions.SignInSuccess) {
            this.navCtrl.navigateRoot('home');
          } else {
            this.navCtrl.navigateRoot('landing');
          }
        },
        err => {
          console.log('Caught Error in Auth Observable Setup' + err);
        });
  }

}
