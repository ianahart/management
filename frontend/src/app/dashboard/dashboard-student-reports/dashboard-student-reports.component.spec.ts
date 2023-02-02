import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStudentReportsComponent } from './dashboard-student-reports.component';

describe('DashboardStudentReportsComponent', () => {
  let component: DashboardStudentReportsComponent;
  let fixture: ComponentFixture<DashboardStudentReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardStudentReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardStudentReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
