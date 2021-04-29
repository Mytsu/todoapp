import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Credential } from '../models/auth.model';

@Component({
  selector: 'app-authpage',
  template: `<app-auth
    [type]="type"
    (formSubmitEvent)="formSubmitEvent($event)"
    (googleSignInEvent)="googleSignInEvent()"
  >
  </app-auth>`,
  styles: [``],
})
export class AuthPageComponent implements OnInit {
  type!: string;

  constructor(private router: Router, private store: Store) {}

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

  googleSignInEvent() {
    // dispatch provider signin event
    console.log('[googleSignInEvent] emit');
  }

  formSubmitEvent($event: Credential) {
    // dispatch login/signup event
    console.log('[formSubmitEvent] emit');
    console.log($event);
  }
}
