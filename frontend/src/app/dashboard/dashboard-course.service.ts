import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs';
import { IAddCourseForm, ICreateCourseResponse } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class DashboardCourseService {
  private baseURL = 'http://localhost:4200/api/v1';

  constructor(private http: HttpClient) {}

  addCourse(form: FormGroup<IAddCourseForm>) {
    return this.http
      .post<ICreateCourseResponse>(`${this.baseURL}/courses/`, form)
      .pipe(map((x) => x.message));
  }
}
