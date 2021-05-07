import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { Observable, from } from 'rxjs';
import { User } from '../models/user.model';
import { Credential } from '../models/auth.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  signIn(auth: Credential): Observable<User> {
    return from(
      this.afAuth.signInWithEmailAndPassword(auth.email, auth.password)
    ).pipe(map((userCredential) => this.mapCredentials(userCredential)));
  }

  signUp(auth: Credential): Observable<User> {
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

  googleAuth(): Observable<User> {
    return this.signInWithProvider(new firebase.auth.GoogleAuthProvider());
  }

  logout(): Observable<void> {
    return from(this.afAuth.signOut());
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  private signInWithProvider(provider: any): Observable<User> {
    return from(this.afAuth.signInWithPopup(provider)).pipe(
      map((userCredential) => this.mapCredentials(userCredential))
    );
  }

  private mapCredentials(userCredential: firebase.auth.UserCredential): User {
    if (userCredential.user) {
      return new User(
        userCredential.user.uid,
        userCredential.user.email || undefined,
        userCredential.user.displayName || undefined,
        userCredential.user.photoURL || undefined,
        userCredential.user.emailVerified
      );
    }
    throw new Error('UserCredential is null');
  }
}
