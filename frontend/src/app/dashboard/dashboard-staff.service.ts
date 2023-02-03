import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ICreateStaffForm } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class DashboardStaffService {
  private baseURL = 'http://localhost:4200/api/v1';

  constructor(private http: HttpClient) {}

  createStaff(form: ICreateStaffForm) {
    return this.http
      .post<{ message: string }>(`${this.baseURL}/staffs/`, form)
      .pipe(map((x) => x.message));
  }
}
