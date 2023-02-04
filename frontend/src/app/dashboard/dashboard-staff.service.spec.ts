import { TestBed } from '@angular/core/testing';

import { DashboardStaffService } from './dashboard-staff.service';

describe('DashboardStaffService', () => {
  let service: DashboardStaffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardStaffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
