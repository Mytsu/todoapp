import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { Observable, from } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Credential } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  signIn(cred: Credential): Observable<User> {
    return from(
      this.afAuth
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() =>
          this.afAuth.signInWithEmailAndPassword(cred.email, cred.password)
        )
    ).pipe(map((userCredential) => this.mapCredentials(userCredential)));
  }

  signUp(cred: Credential): Observable<User> {
    const cred$ = from(
      this.afAuth
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() =>
          this.afAuth.createUserWithEmailAndPassword(cred.email, cred.password)
        )
    ).pipe(map((userCredential) => this.mapCredentials(userCredential)));
    return cred$;
  }

  sendVerificationEmail(): void {
    this.afAuth.currentUser
      .then((user) => {
        user?.sendEmailVerification();
        this.router.navigate(['verify-email-adress']);
      })
      .catch((error) => {
        // TODO: handle sendVerificationEmail error
      });
  }

  forgotPassword(email: string) {
    this.afAuth.sendPasswordResetEmail(email);
  }

  googleAuth(): Observable<User> {
    return this.signInWithProvider(new firebase.auth.GoogleAuthProvider());
  }

  logout(): Observable<void> {
    return from(this.afAuth.signOut());
  }

  get user(): Observable<User> {
    return this.afAuth.authState.pipe(
      first(),
      map((user) => {
        if (!user) {
          return new User();
        } else {
          return new User(
            user.uid,
            user.email ? user.email : '',
            user.displayName ? user.displayName : '',
            user.photoURL ? user.photoURL : '',
            user.emailVerified
          );
        }
      })
    );
  }

  private signInWithProvider(
    provider: firebase.auth.AuthProvider
  ): Observable<User> {
    return from(
      this.afAuth
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => this.afAuth.signInWithPopup(provider))
    ).pipe(map((userCredential) => this.mapCredentials(userCredential)));
  }

  private mapCredentials(userCredential: firebase.auth.UserCredential): User {
    if (userCredential.user) {
      return new User(
        userCredential.user.uid,
        userCredential.user.email || '',
        userCredential.user.displayName || '',
        userCredential.user.photoURL || '',
        userCredential.user.emailVerified
      );
    }
    throw new Error('UserCredential is null');
  }
}
