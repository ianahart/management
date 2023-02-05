import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import {
  IChartsResponse,
  ICreateClassForm,
  IRetrieveClassesResponse,
  IRetrieveClassResponse,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class DashboardClassService {
  private baseURL = 'https://cms-nstat.netlify.app/api/v1/'

  constructor(private http: HttpClient) {}

  chartsClass() {
    return this.http.get<IChartsResponse>(`${this.baseURL}/classes/charts/`);
  }

  retrieveClass(id: string) {
    return this.http.get<IRetrieveClassResponse>(
      `${this.baseURL}/classes/${id}/`
    );
  }

  deleteClass(id: number) {
    return this.http.delete<{ message: string }>(
      `${this.baseURL}/classes/${id}/`
    );
  }

  createClass(form: ICreateClassForm) {
    return this.http
      .post<{ message: string }>(`${this.baseURL}/classes/`, form)
      .pipe(map((x) => x.message));
  }

  searchClass(value: string, page: number, direction: string) {
    return this.http.post<IRetrieveClassesResponse>(
      `${this.baseURL}/classes/search/`,
      { value },
      { params: { page, direction } }
    );
  }

  retrieveClasses(page: number, direction: string) {
    return this.http.get<IRetrieveClassesResponse>(`${this.baseURL}/classes/`, {
      params: {
        page,
        direction,
      },
    });
  }
}
