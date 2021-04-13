import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authpage',
  template: `<app-auth
    [type]="type"
    (formSubmitEvent)="formSubmitEvent($event)"
    (googleSignInEvent)="(googleSignInEvent)"
  >
  </app-auth>`,
  styles: [``],
})
export class AuthPageComponent implements OnInit {
  type!: string;

  constructor(private router: Router) {}

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
  }

  formSubmitEvent($event: { email: string; password: string }) {
    // dispatch login/signup event
  }
}
