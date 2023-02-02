import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import {
  IRetrieveSearchedStudentResponse,
  IRetrieveStudentResponse,
  IRetrieveStudentsResponse,
  ISearchRetrieveStudentNameResponse,
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

  updateStudent(id: string | null, form: IStudentForm) {
    return this.http
      .patch<{ message: string }>(`${this.baseURL}/students/${id}/`, { form })
      .pipe(map((x) => x.message));
  }

  deleteStudent(id: number) {
    return this.http
      .delete<{ message: string }>(`${this.baseURL}/students/${id}/`)
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

  searchStudent(term: string, page: number, direction: string) {
    return this.http.post<ISearchRetrieveStudentNameResponse>(
      `${this.baseURL}/students/search/`,
      {
        term,
        page,
        direction,
      }
    );
  }

  retrieveSearchedStudent(id: number) {
    return this.http.get<IRetrieveSearchedStudentResponse>(
      `${this.baseURL}/students/search/${id}/`
    );
  }
}
