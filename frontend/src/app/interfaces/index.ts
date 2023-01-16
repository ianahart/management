import { FormControl } from '@angular/forms';

export interface IRefreshUserResponse {
  user: IUser;
}

export interface ICreateAccountForm {
  [index: string]: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ILoginForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

export interface IResetPasswordForm {
  password: FormControl<string | null>;
  confirm_password: FormControl<string | null>;
}

export interface ITokens {
  access_token: string;
  refresh_token: string;
}

export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  avatar_url: string;
}

export interface ILoginResponse {
  message?: string;
  tokens: ITokens;
  user: IUser;
}
