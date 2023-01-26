import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStudentsModifyComponent } from './dashboard-students-modify.component';

describe('DashboardStudentsModifyComponent', () => {
  let component: DashboardStudentsModifyComponent;
  let fixture: ComponentFixture<DashboardStudentsModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardStudentsModifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardStudentsModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
