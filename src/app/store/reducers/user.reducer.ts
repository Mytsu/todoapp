import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.model';
import * as userActions from '../actions/user.actions';

const defaultUser: User = new User();

const authReducer = createReducer(
  defaultUser,
  on(userActions.AUTHENTICATED, (state: User, props: { user: User }) => ({
    ...props.user,
    error: undefined,
    loading: false,
  })),
  on(userActions.NOT_AUTHENTICATED, (state: User, props: { user: User }) => ({
    ...defaultUser,
    error: props.user.error,
    loading: false,
  })),
  on(userActions.LOGOUT, (_) => ({
    ...defaultUser,
    error: undefined,
    loading: true,
  })),
  on(userActions.LOGOUT_CONFIRM, (state: User) => ({
    ...state,
    loading: false
  })),
  on(userActions.CRED_LOGIN, (state: User, props: any) => ({
    ...state,
    loading: true,
  })),
  on(userActions.GOOGLE_LOGIN, (state: User, props: any) => ({
    ...state,
    loading: true,
  })),
  on(userActions.AUTH_ERROR, (state: User, props: any) => ({
    ...state,
    error: props.error,
    loading: false,
  }))
);

export const reducer = (state: User | undefined, action: Action) =>
  authReducer(state, action);
