import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDepartmentsModifyComponent } from './dashboard-departments-modify.component';

describe('DashboardDepartmentsModifyComponent', () => {
  let component: DashboardDepartmentsModifyComponent;
  let fixture: ComponentFixture<DashboardDepartmentsModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardDepartmentsModifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardDepartmentsModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
