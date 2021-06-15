import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import * as UserActions from './store/actions/user.actions';
import { UserService } from './services/user.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar>
      <router-outlet></router-outlet>
    </app-navbar>
  `,
  styles: [``],
})
export class AppComponent implements OnInit {
  constructor(
    private userService: UserService,
    private store: Store<{ user: User }>
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  private loadUser(): void {
    this.userService.user
      .pipe(take(1))
      .subscribe((lsUser) =>
        lsUser.uid !== undefined && lsUser.uid !== ''
          ? this.store.dispatch(UserActions.AUTHENTICATED({ user: lsUser }))
          : this.store.dispatch(UserActions.NOT_AUTHENTICATED({ user: null }))
      );
  }
}
