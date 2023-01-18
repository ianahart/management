import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  IAddDepartmentForm,
  IUpdateDepartmentForm,
  IRetrieveDepartmentsResponse,
  IRetrieveDepartmentResponse,
  IUpdateDepartmentResponse,
  IDeleteDepartmentResponse,
} from '../interfaces';
import { FormGroup } from '@angular/forms';
import { map, pluck } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DashboardDepartmentService {
  private baseURL = 'http://localhost:4200/api/v1';

  constructor(private http: HttpClient) {}

  addDepartment(form: FormGroup<IAddDepartmentForm>) {
    return this.http
      .post<string>(`${this.baseURL}/departments/`, form.value)
      .pipe(pluck('message'));
  }

  retrieveDepartments(page: number, direction: string) {
    return this.http.get<IRetrieveDepartmentsResponse>(
      `${this.baseURL}/departments/`,
      {
        params: { page, direction },
      }
    );
  }
  retrieveDepartment(id: string) {
    return this.http.get<IRetrieveDepartmentResponse>(
      `${this.baseURL}/departments/${id}/`
    );
  }

  updateDepartment(id: string, form: FormGroup<IUpdateDepartmentForm>) {
    return this.http
      .patch<IUpdateDepartmentResponse>(
        `${this.baseURL}/departments/${id}/`,
        form.value
      )
      .pipe(map((x) => x?.message));
  }

  deleteDepartment(id: string) {
    return this.http
      .delete<IDeleteDepartmentResponse>(`${this.baseURL}/departments/${id}/`)
      .pipe(map((x) => x?.message));
  }
}
