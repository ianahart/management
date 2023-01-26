import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import {
  IRetrieveStudentResponse,
  IRetrieveStudentsResponse,
  IStudent,
  IStudentForm,
} from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class DashboardStudentService {
  private baseURL = 'http://localhost:4200/api/v1';

  constructor(private http: HttpClient) {}

  createStudent(form: IStudentForm) {
    return this.http
      .post<{ message: string }>(`${this.baseURL}/students/`, form)
      .pipe(map((x) => x.message));
  }

  retrieveStudent(id: number) {
    return this.http
      .get<IRetrieveStudentResponse>(`${this.baseURL}/students/${id}/`)
      .pipe(map((x) => x.student));
  }

  retrieveStudents(page: number, direction: string) {
    return this.http.get<IRetrieveStudentsResponse>(
      `${this.baseURL}/students/`,
      {
        params: {
          page,
          direction,
        },
      }
    );
  }
}
