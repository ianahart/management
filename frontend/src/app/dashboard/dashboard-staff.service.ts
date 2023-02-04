import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import {
  ICreateStaffForm,
  IRetrieveAllStaffResponse,
  IRetrieveStaffMemberResponse,
} from '../interfaces';

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

  retrieveAllStaff(page: number, direction: string) {
    return this.http.get<IRetrieveAllStaffResponse>(`${this.baseURL}/staffs/`, {
      params: {
        page,
        direction,
      },
    });
  }

  retrieveStaffMember(id: number) {
    return this.http.get<IRetrieveStaffMemberResponse>(
      `${this.baseURL}/staffs/${id}/`
    );
  }

  updateStaff(id: number, form: ICreateStaffForm) {
    return this.http.patch<{ message: string }>(
      `${this.baseURL}/staffs/${id}/`,
      form
    );
  }
}
