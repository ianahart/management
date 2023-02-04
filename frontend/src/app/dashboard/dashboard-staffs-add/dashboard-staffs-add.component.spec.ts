import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStaffsAddComponent } from './dashboard-staffs-add.component';

describe('DashboardStaffsAddComponent', () => {
  let component: DashboardStaffsAddComponent;
  let fixture: ComponentFixture<DashboardStaffsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardStaffsAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardStaffsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
