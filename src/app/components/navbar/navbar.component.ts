import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../models/auth.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user$!: Observable<User>;

  constructor(private store: Store<{ auth: AuthState }>) {
    this.user$ = this.store.select(state => (state.auth.user));
  }

  ngOnInit(): void { }

}
