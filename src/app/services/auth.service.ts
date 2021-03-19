import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import firebase from 'firebase/app';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private store: Store<{ user: User }>,
  ) { }

  signIn(email: string, password: string): void {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUserData(result.user);
        this.router.navigate(['']);
      })
      .catch((error) => {
        // TODO: handle sign in error
      });
  }

  signUp(email: string, password: string): void {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.sendVerificationEmail();
        this.setUserData(result.user);
      })
      .catch((error) => {
        // TODO: handle signUp error
      });
  }

  sendVerificationEmail(): void {
    this.afAuth.currentUser
      .then((user) => user?.sendEmailVerification())
      .then(() => this.router.navigate(['verify-email-adress']))
      .catch((error) => {
        // TODO: handle sendVerificationEmail error
      });
  }

  forgotPassword(email: string) {
    this.afAuth
      .sendPasswordResetEmail(email)
      .then(() => {
        // TODO: show popup confirming email sent
      })
      .catch((error) => {
        // TODO: handle forgotPassword error
      });
  }

  googleAuth(): void {
    this.signInWithProvider(new firebase.auth.GoogleAuthProvider());
  }

  private signInWithProvider(provider: any): void {
    this.afAuth
      .signInWithPopup(provider)
      .then(() => {
        this.router.navigate(['']);
      })
      .catch((error) => {
        // TODO: handle signInWithProvider error
      });
  }

  private setUserData(user: any): void {
    if (!user) { return; }
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    userRef.set(userData, {
      merge: true,
    });
  }
}
