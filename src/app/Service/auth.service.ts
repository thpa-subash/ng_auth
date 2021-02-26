import { User } from './user';
import firebase from 'firebase/app';
import { Injectable, NgZone } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userState: any;
  errorMessage: any;

  constructor(
    private afs: AngularFirestore,
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.firebaseAuth.authState.subscribe((user) => {
      if (user) {
        this.userState = user;
        localStorage.setItem('user', JSON.stringify(this.userState));
        this.router.navigate(['dashboard']);
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }
  SignIn(email, password) {
    return this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((value) => {
        this.ngZone.run(() => {
          console.log(value);
          if (value.user.emailVerified == true) {
            this.router.navigate(['dashboard']);
            console.log(value);
          } else {
            this.SendVerificationMail();
          }
        });
        this.SetUserData(value.user);
        console.log('Nice, it worked!');
      })
      .catch((err) => {
        console.log('Something went wrong:', err.message);
        this.errorMessage = err.message;
      });
  }
  SignUp(email: string, password: string) {
    return this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((value) => {
        this.SendVerificationMail();
        this.SetUserData(value.user);
        console.log('Success!', value);
      })
      .catch((err) => {
        console.log('Something went wrong:', err.message);
        this.errorMessage = err.message;
      });
  }
  SendVerificationMail() {
    return this.firebaseAuth.currentUser
      .then((u) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['email-verification']);
      });
  }
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    // return user !== null && user.emailVerified !== false ? true : false;
    return user !== null;
  }
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }
  AuthLogin(provider) {
    return this.firebaseAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        this.errorMessage = error;
      });
  }
  FacebookAuth() {
    return this.FAuthLogin(new firebase.auth.FacebookAuthProvider());
  }

  // Auth logic to run auth providers
  FAuthLogin(provider) {
    return this.firebaseAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        console.log(error);
        this.errorMessage = error;
      });
  }
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userState: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userState, {
      merge: true,
    });
  }
  errorData() {
    return this.errorMessage;
  }
  logout() {
    return this.firebaseAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
