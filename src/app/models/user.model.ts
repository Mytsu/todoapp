export interface IUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  loading: boolean;
  error: any;
  todos?: string[];
}

export interface UserState {
  user: User | null;
  loading: boolean;
  error: any | null;
}

export class User implements IUser {
  constructor(
    public uid: string = '',
    public email: string = '',
    public displayName: string = 'GUEST',
    public photoURL: string = '',
    public emailVerified: boolean = false,
    public loading: boolean = false,
    public error: any = null,
    public todos: string[] = []
  ) {}
}
