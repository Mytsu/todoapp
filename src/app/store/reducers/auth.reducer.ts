import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.model';
import { AuthState } from '../../models/auth.model';
import * as authActions from '../actions/auth.actions';

const defaultUser: User = {
  uid: '',
  email: '',
  displayName: 'GUEST',
  photoURL: '',
  emailVerified: false
};

const initialState = {
  user: defaultUser,
  loading: false,
  error: null,
};

const authReducer = createReducer(
  initialState,
  on(authActions.GET_USER,
    ((state: AuthState, props: any) => (
      { ...state, loading: true }))),
  on(authActions.AUTHENTICATED,
    ((state: AuthState, props: any) => (
      { ...state, user: props.user, loading: false }))),
  on(authActions.NOT_AUTHENTICATED,
    ((state: AuthState, props: any) => (
      { ...state, user: defaultUser, error: null, loading: false }))),
  on(authActions.LOGOUT,
    ((state: AuthState, props: any) => (
      { ...state, user: defaultUser, error: null, loading: true }))),
  on(authActions.GOOGLE_LOGIN,
    ((state: AuthState, props: any) => (
      { ...state, loading: true }))),
  on(authActions.AUTH_ERROR,
    ((state: AuthState, props: any) => (
      { ...state, error: props.error, loading: false }))),
);

export const reducer = (state: AuthState | undefined, action: Action) =>
  authReducer(state, action);
