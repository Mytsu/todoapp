import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { Observable, from } from 'rxjs';
import { IUser } from '../models/user.model';
import { Credential } from '../models/auth.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
  ) {}

  signIn(auth: Credential): Observable<IUser> {
    return from(
      this.afAuth.signInWithEmailAndPassword(auth.email, auth.password)
    ).pipe(map((userCredential) => this.mapCredentials(userCredential)));
  }

  signUp(auth: Credential): Observable<IUser> {
    const cred = from(
      this.afAuth.createUserWithEmailAndPassword(auth.email, auth.password)
    );
    return cred.pipe(
      map((userCredential) => this.mapCredentials(userCredential))
    );
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

  googleAuth(): Observable<IUser> {
    return this.signInWithProvider(new firebase.auth.GoogleAuthProvider());
  }

  logout(): Observable<void> {
    return from(this.afAuth.signOut());
  }

  private signInWithProvider(provider: any): Observable<IUser> {
    return from (this.afAuth
      .signInWithPopup(provider)
      ).pipe(map((userCredential) => this.mapCredentials(userCredential)));;
  }

  private mapCredentials(userCredential: firebase.auth.UserCredential): IUser {
    if (userCredential.user) {
      return {
        uid: userCredential.user?.uid,
        email: userCredential.user?.email || '',
        displayName: userCredential.user?.displayName || '',
        photoURL: userCredential.user?.photoURL || '',
        emailVerified: userCredential.user?.emailVerified,
      };
    }
    throw new Error('UserCredential is null');
  }
}
