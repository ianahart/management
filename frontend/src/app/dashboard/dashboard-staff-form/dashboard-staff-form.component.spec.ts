import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStaffFormComponent } from './dashboard-staff-form.component';

describe('DashboardStaffFormComponent', () => {
  let component: DashboardStaffFormComponent;
  let fixture: ComponentFixture<DashboardStaffFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardStaffFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardStaffFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
