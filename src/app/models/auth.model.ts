import { User } from './user.model';

export interface AuthState {
  user: User;
  loading: boolean;
  error: any;
}
