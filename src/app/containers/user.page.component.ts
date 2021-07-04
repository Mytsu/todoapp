import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as UserActions from '../store/actions/user.actions';
import { User } from '../models/user.model';
import { Credential } from '../models/auth.model';

@Component({
  selector: 'app-userpage',
  template: `<app-user
    [type]="type"
    (formSubmitEvent)="formSubmitEvent($event)"
    (googleSignInEvent)="googleSignInEvent()"
  >
  </app-user>`,
  styles: [``],
})
export class UserPageComponent implements OnInit {
  type!: string;

  constructor(private router: Router, private store: Store<{ user: User }>) {}

  ngOnInit() {
    const route = this.router
      .parseUrl(this.router.url)
      .toString()
      .replace('/', '');
    if (route === 'login') {
      this.type = 'login';
    } else {
      this.type = 'signup';
    }
  }

  navigate(url: string) {
    this.router.navigate([url]);
  }

  googleSignInEvent() {
    this.store.dispatch(UserActions.GOOGLE_LOGIN());
    this.navigate('');
  }

  formSubmitEvent($event: Credential) {
    this.store.dispatch(UserActions.CRED_LOGIN({ credential: $event }));
    this.navigate('');
  }
}
