import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs';
import {
  IAddCourseForm,
  ICourse,
  ICreateCourseResponse,
  IDeleteCourseResponse,
  IRetrieveCourseResponse,
  IRetrieveCoursesResponse,
  IUpdateCourseForm,
  IUpdateCourseResponse,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class DashboardCourseService {
  private baseURL = 'https://cms-nstat.netlify.app/api/v1'

  constructor(private http: HttpClient) {}

  retrieveCourse(id: number) {
    return this.http
      .get<IRetrieveCourseResponse>(`${this.baseURL}/courses/${id}/`)
      .pipe(map((x) => x.course));
  }

  addCourse(form: FormGroup<IAddCourseForm>) {
    return this.http
      .post<ICreateCourseResponse>(`${this.baseURL}/courses/`, form)
      .pipe(map((x) => x.message));
  }

  retrieveCourses(page: number, direction: string) {
    return this.http.get<IRetrieveCoursesResponse>(`${this.baseURL}/courses/`, {
      params: { page, direction },
    });
  }

  searchCourse(value: string, page: number, direction: string) {
    return this.http.post<IRetrieveCoursesResponse>(
      `${this.baseURL}/courses/search/`,
      { value },
      { params: { page, direction } }
    );
  }

  updateCourse(id: number, form: IUpdateCourseForm) {
    return this.http.patch<IUpdateCourseResponse>(
      `${this.baseURL}/courses/${id}/`,
      form
    );
  }

  deleteCourse(id: number) {
    return this.http.delete<IDeleteCourseResponse>(
      `${this.baseURL}/courses/${id}/`
    );
  }
}
