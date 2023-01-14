import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, pluck, tap } from 'rxjs';
import { userState } from '../data';
import {
  ICreateAccountForm,
  ILoginForm,
  ILoginResponse,
  IRefreshUserResponse,
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

  login(form: FormGroup<ILoginForm>) {
    return this.http
      .post<ILoginResponse>(`${this.baseURL}/auth/login/`, form.value)
      .pipe(tap(() => this.loggedIn$.next(true)));
  }
}
