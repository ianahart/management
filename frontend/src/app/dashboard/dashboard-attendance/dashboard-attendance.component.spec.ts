import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAttendanceComponent } from './dashboard-attendance.component';

describe('DashboardAttendanceComponent', () => {
  let component: DashboardAttendanceComponent;
  let fixture: ComponentFixture<DashboardAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardAttendanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
