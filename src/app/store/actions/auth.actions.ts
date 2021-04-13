import { createAction, props } from '@ngrx/store';

const GET_USER = createAction(
  '[Auth] Get user',
  props<{ payload?: { email: string; password: string } }>());
const AUTHENTICATED = createAction(
  '[Auth] Authenticated',
  props<{ payload?: any }>()
);
const NOT_AUTHENTICATED = createAction(
  '[Auth] Not Authenticated',
  props<{ payload?: any }>()
);
const GOOGLE_LOGIN = createAction(
  '[Auth] Google login attempt',
  props<{ payload?: any }>()
);
const LOGOUT = createAction(
  '[Auth] Logout',
  props<{ payload?: any }>());
const AUTH_ERROR = createAction(
  '[Auth] Error',
  props<{ payload?: any }>()
);

export {
  GET_USER,
  AUTHENTICATED,
  NOT_AUTHENTICATED,
  GOOGLE_LOGIN,
  LOGOUT,
  AUTH_ERROR
};
