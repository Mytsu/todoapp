import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  @Input() type!: string;
  @Output() googleSignInEvent = new EventEmitter<null>();
  @Output() formSubmitEvent = new EventEmitter<{
    email: string;
    password: string;
  }>();

  email = '';
  password = '';
  texts!: { formButton: string; googleButton: string };
  error: string | null = null;

  constructor() {}

  ngOnInit(): void {
    if (this.type === 'login') {
      this.texts = {
        formButton: 'Login',
        googleButton: 'Sign In with Google',
      };
    } /* if (this.type === 'signUp') **/ else {
      this.texts = {
        formButton: 'Sign Up',
        googleButton: 'Sign Up with Google',
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
