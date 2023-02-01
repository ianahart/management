import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dayjs } from 'dayjs';
import { IRetrieveAttendeesResponse } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class DashboardAttendanceService {
  private baseURL = 'http://localhost:4200/api/v1';

  constructor(private http: HttpClient) {}

  onChangeDateAttendance(date: Dayjs, course: string) {
    return this.http.post<IRetrieveAttendeesResponse>(
      `${this.baseURL}/attendances/date/`,
      {
        date,
        course,
      }
    );
  }

  markAll(type: string, course: string, date: Dayjs) {
    return this.http.post(`${this.baseURL}/attendances/all/`, {
      type,
      course,
      date,
    });
  }

  markAttendance(
    status: boolean,
    course: string,
    date: Dayjs,
    student: number
  ) {
    return this.http.post(`${this.baseURL}/attendances/`, {
      student,
      course,
      status,
      date,
    });
  }

  retrieveStudentAttendances(course: string, date: Dayjs) {
    return this.http.post<IRetrieveAttendeesResponse>(
      `${this.baseURL}/attendances/initial/`,
      {
        course,
        date,
      }
    );
  }
}
