import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => this.actions$.pipe(
    oftype(AuthActions.GET_USER), exhaustMap(action => this.authService.signIn(action.email, action.password))
  ))

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) { }
}
