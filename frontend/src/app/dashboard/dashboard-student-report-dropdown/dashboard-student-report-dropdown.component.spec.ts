import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStudentReportDropdownComponent } from './dashboard-student-report-dropdown.component';

describe('DashboardStudentReportDropdownComponent', () => {
  let component: DashboardStudentReportDropdownComponent;
  let fixture: ComponentFixture<DashboardStudentReportDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardStudentReportDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardStudentReportDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
