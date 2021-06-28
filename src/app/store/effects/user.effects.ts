import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
} from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import * as UserActions from '../actions/user.actions';
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
          catchError((error) => of(UserActions.AUTH_ERROR(error)))
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
          catchError((error) => of(UserActions.AUTH_ERROR(error)))
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
          catchError((error) => of(UserActions.AUTH_ERROR(error)))
        )
      )
    )
  );

  authError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.AUTH_ERROR),
        tap((state) => console.error('[Auth] UserState error: ' + state.error))
      ),
    { dispatch: false }
  );

  authenticated$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.AUTHENTICATED),
        /* tap((state) => {
          console.log('[UserEffect] authenticated, user: ' + state.user.uid);
        }), */
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) {}
}
