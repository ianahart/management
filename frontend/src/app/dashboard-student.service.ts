import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IRetrieveStudentsResponse, IStudentForm } from './interfaces';

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
