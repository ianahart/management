import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDepartmentsAddComponent } from './dashboard-departments-add.component';

describe('DashboardDepartmentsAddComponent', () => {
  let component: DashboardDepartmentsAddComponent;
  let fixture: ComponentFixture<DashboardDepartmentsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardDepartmentsAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardDepartmentsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
