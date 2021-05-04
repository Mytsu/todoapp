import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import * as UserActions from '../actions/user.actions';
import { User } from '../../models/user.model';
import { Credential } from '../../models/auth.model';

@Injectable()
export class UserEffects {
  credLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.CRED_LOGIN),
      map((action) => action.credential),
      exhaustMap((cred: Credential) =>
        this.userService.signIn(cred).pipe(
          map((user) => UserActions.AUTHENTICATED({ user })),
          catchError((error) =>
            of(UserActions.AUTH_ERROR((new User().error = error)))
          )
        )
      )
    )
  );

  googleLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.GOOGLE_LOGIN),
      exhaustMap(() =>
        this.userService.googleAuth().pipe(
          map((user) => UserActions.AUTHENTICATED({ user })),
          catchError((error) =>
            of(UserActions.AUTH_ERROR((new User().error = error)))
          )
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.LOGOUT),
      exhaustMap(() =>
        this.userService.logout().pipe(
          map(() => UserActions.LOGOUT_CONFIRM()),
          catchError((error) =>
            of(UserActions.AUTH_ERROR((new User().error = error)))
          )
        )
      )
    )
  );

  authenticated$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.AUTHENTICATED),
        tap(() => this.router.navigate(['/list']))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router
  ) {}
}
