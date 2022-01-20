import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import { UserDocument } from 'src/app/shared/models/user';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, OnDestroy {
  ui: firebaseui.auth.AuthUI;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService,
    private ngZone: NgZone) {

  }

  ngOnInit() {
    this.afAuth.app
    .then(app => {
      const uiConfig = {
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
          }
        ],
        callbacks: {
          signInSuccessWithAuthResult: this
          .onSignInSuccessful
          .bind(this)
        }
      };

      this.ui = new firebaseui.auth.AuthUI(app.auth());
      this.ui.start('#firebaseui-auth-container', uiConfig);

      this.ui.disableAutoSignIn();
    });
  }

  ngOnDestroy() {
    this.ui.delete();
  }

  onSignInSuccessful(result: any) {
    this.authService.onSignInSuccessful(result.user)
    .subscribe((userDoc: UserDocument | undefined) => {
      if (userDoc && userDoc.clinic?.id) {
        //has a clinic and navigate to dashboard
        this.ngZone.run(() => {
          this.router.navigate(['/dashboard']);
        });
      } else if (userDoc && userDoc.clinic == null) {
        //does not have a clinic, navigate to onboarding page
        alert('No clinic');
        this.router.navigate(['/clinic-onboarding'])
      }
    });

    return false;
  }
}
