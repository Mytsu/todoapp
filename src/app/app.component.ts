import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AUTHENTICATED,
  LOGOUT,
  NOT_AUTHENTICATED,
} from './store/actions/user.actions';
import { DB_LOAD_INIT } from './store/actions/todo.actions';
import { UserService } from './services/user.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar (userLogoutEvent)="logout()">
      <router-outlet></router-outlet>
    </app-navbar>
  `,
  styles: [``],
})
export class AppComponent implements OnInit {
  constructor(
    private userService: UserService,
    private store: Store<{ user: User }>,
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  logout(): void {
    this.store.dispatch(LOGOUT());
  }

  private loadUser(): void {
    this.userService.user.subscribe((lsUser) => {
      if (lsUser.uid) {
        this.store.dispatch(AUTHENTICATED({ user: lsUser }));
        this.store.dispatch(DB_LOAD_INIT());
      } else {
        this.store.dispatch(NOT_AUTHENTICATED({ user: null }));
      }
    });
  }
}
