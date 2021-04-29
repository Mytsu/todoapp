import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  @Input() type!: string;
  @Output() googleSignInEvent = new EventEmitter<null>();
  @Output() formSubmitEvent = new EventEmitter<{
    email: string;
    password: string;
  }>();

  email = '';
  password = '';
  texts!: { formButton: string; googleButton: string };

  constructor() { }

  ngOnInit(): void {
    if (this.type === 'login') {
      this.texts = {
        formButton: 'Login',
        googleButton: 'Sign In with Google'
      };
    } else /* if (this.type === 'signUp') **/ {
      this.texts = {
        formButton: 'Sign Up',
        googleButton: 'Sign Up with Google'
      };
    }
  }

  googleButtonEvent(): void {
    this.googleSignInEvent.emit();
  }

  onSubmit(): void {
    const data = { email: this.email, password: this.password };
    this.formSubmitEvent.emit(data);
  }
}
