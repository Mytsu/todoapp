import { Component, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, UserState } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Output() userLogoutEvent = new EventEmitter<null>();
  user$!: Observable<User>;

  constructor(private store: Store<{ user: UserState }>) {
    this.user$ = this.store
      .select((state) => state.user)
      .pipe(map((state) => (state.user ? state.user : new User())));
  }

  logout() {
    this.userLogoutEvent.emit();
  }
}
