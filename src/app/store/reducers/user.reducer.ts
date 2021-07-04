import { Action, createReducer, on } from '@ngrx/store';
import { User, UserState } from '../../models/user.model';
import { Credential } from '../../models/auth.model';
import * as userActions from '../actions/user.actions';

const defaultState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userReducer = createReducer(
  defaultState,
  on(userActions.AUTHENTICATED, (state: UserState, props: { user: User }) => ({
    user: props.user,
    error: null,
    loading: false,
  })),
  on(
    userActions.NOT_AUTHENTICATED,
    (state: UserState, props: { user: User | null }) => ({
      user: null,
      error: props.user?.error,
      loading: false,
    })
  ),
  on(userActions.LOGOUT, (_) => ({
    user: null,
    error: null,
    loading: true,
  })),
  on(userActions.LOGOUT_CONFIRM, (state: UserState) => ({
    ...state,
    loading: false,
  })),
  on(
    userActions.CRED_LOGIN,
    (state: UserState, props: { credential: Credential }) => ({
      ...state,
      loading: true,
    })
  ),
  on(userActions.GOOGLE_LOGIN, (state: UserState, props: any) => ({
    ...state,
    loading: true,
  })),
  on(userActions.AUTH_ERROR, (state: UserState, props: { error: Error }) => ({
    user: null,
    error: props.error.message,
    loading: false,
  }))
);

export const reducer = (state: UserState | undefined, action: Action) =>
  userReducer(state, action);
