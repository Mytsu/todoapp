export interface IUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  loading?: boolean;
  error?: string;
}

export class User implements IUser {
  loading?: boolean;
  error?: string;
  constructor(
    public uid: string = '',
    public email: string = '',
    public displayName: string = 'GUEST',
    public photoURL: string = '',
    public emailVerified: boolean = false,
  ) {}
}
