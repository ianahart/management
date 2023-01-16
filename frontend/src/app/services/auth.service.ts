import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, catchError, of, pluck, tap } from 'rxjs';
import { userState } from '../data';
import {
  ICreateAccountForm,
  ILoginForm,
  ILoginResponse,
  IRefreshUserResponse,
  IResetPasswordForm,
  ITokens,
  IUser,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL = 'http://localhost:4200/api/v1';
  private user: IUser = userState;
  public loggedIn$ = new BehaviorSubject<boolean | null>(null);

  constructor(private http: HttpClient) {}

  createAccountFixKeys(form: ICreateAccountForm) {
    const createAccountForm: any = {};

    for (let prop in form) {
      const arr = prop.split('');
      const formattedProp = arr
        .map((char) => {
          if (char === char.toUpperCase()) {
            char = '_' + char.toLowerCase();
          }
          return char;
        })
        .join('');
      createAccountForm[formattedProp] = form[prop];
    }

    return createAccountForm;
  }

  createAccount(form: ICreateAccountForm) {
    const createAccountForm = this.createAccountFixKeys(form);
    return this.http
      .post<string>(`${this.baseURL}/auth/create-account/`, createAccountForm)
      .pipe(pluck('message'));
  }

  storeTokens(tokens: ITokens) {
    localStorage.setItem('tokens', JSON.stringify(tokens));
  }

  removeTokens() {
    localStorage.removeItem('tokens');
  }

  setUser(user: IUser) {
    this.user = user;
  }

  getTokens() {
    if (localStorage.getItem('tokens')) {
      return JSON.parse(localStorage.getItem('tokens') || '');
    }
  }

  syncUser() {
    const tokens = this.getTokens();
    return this.http
      .get<IRefreshUserResponse>(`${this.baseURL}/account/refresh/`, {
        headers: { Authorization: `Bearer ${tokens?.access_token}` },
      })
      .pipe(
        tap(() => {
          if (tokens) {
            this.loggedIn$.next(true);
          } else {
            this.loggedIn$.next(false);
          }
        })
      );
  }

  refreshToken() {
    const tokens = this.getTokens();
    return this.http
      .post<any>(`${this.baseURL}/auth/refresh/`, {
        refresh: tokens.refresh_token,
      })
      .pipe(
        tap((token) => {
          tokens.access_token = token.access;
          this.storeTokens(tokens);
        }),
        catchError((error) => {
          this.logout();
          return of(false);
        })
      );
  }

  logout() {
    const tokens = this.getTokens();
    return this.http
      .post<string>(`${this.baseURL}/auth/logout/`, {
        refresh_token: tokens.refresh_token,
      })
      .pipe(
        tap(() => this.loggedIn$.next(false)),
        pluck('message')
      );
  }

  login(form: FormGroup<ILoginForm>) {
    return this.http
      .post<ILoginResponse>(`${this.baseURL}/auth/login/`, form.value)
      .pipe(tap(() => this.loggedIn$.next(true)));
  }

  forgotPassword(email: string) {
    return this.http.post(`${this.baseURL}/auth/forgot-password/`, { email });
  }

  resetPassword(
    form: FormGroup<IResetPasswordForm>,
    token: string,
    userId: number
  ) {
    return this.http
      .post<string>(`${this.baseURL}/auth/reset-password/${userId}/`, {
        password: form.value.password,
        confirm_password: form.value.confirm_password,
        token,
      })
      .pipe(pluck('message'));
  }
}
