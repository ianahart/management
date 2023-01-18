import { TestBed } from '@angular/core/testing';

import { DashboardDepartmentService } from './dashboard-department.service';

describe('DashboardDepartmentService', () => {
  let service: DashboardDepartmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardDepartmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
