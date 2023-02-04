import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStaffsComponent } from './dashboard-staffs.component';

describe('DashboardStaffsComponent', () => {
  let component: DashboardStaffsComponent;
  let fixture: ComponentFixture<DashboardStaffsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardStaffsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardStaffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
