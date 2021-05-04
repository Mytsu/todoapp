import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';
import { Credential } from '../../models/auth.model';

const AUTHENTICATED = createAction(
  '[Auth] Authenticated',
  props<{ user: User }>()
);
const NOT_AUTHENTICATED = createAction(
  '[Auth] Not Authenticated',
  props<{ user: User }>()
);
const CRED_LOGIN = createAction(
  '[Auth] Credential login attempt',
  props<{ credential: Credential }>()
);
const GOOGLE_LOGIN = createAction(
  '[Auth] Google login attempt'
);
const LOGOUT = createAction(
  '[Auth] Logout'
);
const LOGOUT_CONFIRM = createAction(
  '[Auth] Logout Confirm'
);
const AUTH_ERROR = createAction(
  '[Auth] Error',
  props<{ error: Error }>()
);

export {
  AUTHENTICATED,
  NOT_AUTHENTICATED,
  CRED_LOGIN,
  GOOGLE_LOGIN,
  LOGOUT,
  LOGOUT_CONFIRM,
  AUTH_ERROR
};
