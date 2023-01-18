import { FormControl } from '@angular/forms';

export interface IRefreshUserResponse {
  user: IUser;
}

export interface IDepartment {
  id: number;
  name: string;
}

export interface IRetrieveDepartmentResponse {
  message?: string;
  department: IDepartment;
}

export interface IRetrieveDepartmentsResponse {
  message?: string;
  page: number;
  total_pages: number;
  departments: IDepartment[];
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

export interface IUpdateDepartmentForm {
  name: FormControl<string | null>;
}

export interface IAddDepartmentForm {
  name: FormControl<string | null>;
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

export interface IUpdateDepartmentResponse {
  message?: string;
}

export interface IDeleteDepartmentResponse {
  message?: string;
}

export interface ILoginResponse {
  message?: string;
  tokens: ITokens;
  user: IUser;
}
