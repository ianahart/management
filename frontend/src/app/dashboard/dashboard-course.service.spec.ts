import { TestBed } from '@angular/core/testing';

import { DashboardCourseService } from './dashboard-course.service';

describe('DashboardCourseService', () => {
  let service: DashboardCourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardCourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
