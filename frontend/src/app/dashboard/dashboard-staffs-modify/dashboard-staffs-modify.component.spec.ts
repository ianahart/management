import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStaffsModifyComponent } from './dashboard-staffs-modify.component';

describe('DashboardStaffsModifyComponent', () => {
  let component: DashboardStaffsModifyComponent;
  let fixture: ComponentFixture<DashboardStaffsModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardStaffsModifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardStaffsModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
