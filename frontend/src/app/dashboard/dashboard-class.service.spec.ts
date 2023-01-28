import { TestBed } from '@angular/core/testing';

import { DashboardClassService } from './dashboard-class.service';

describe('DashboardClassService', () => {
  let service: DashboardClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
