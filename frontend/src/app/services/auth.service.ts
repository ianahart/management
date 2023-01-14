import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pluck } from 'rxjs';
import { ICreateAccountForm } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL = 'http://localhost:4200/api/v1';
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
}
