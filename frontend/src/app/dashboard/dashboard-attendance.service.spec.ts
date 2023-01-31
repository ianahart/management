import { TestBed } from '@angular/core/testing';

import { DashboardAttendanceService } from './dashboard-attendance.service';

describe('DashboardAttendanceService', () => {
  let service: DashboardAttendanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardAttendanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
