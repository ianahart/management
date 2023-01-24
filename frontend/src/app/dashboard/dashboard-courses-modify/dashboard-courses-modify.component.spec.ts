import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCoursesModifyComponent } from './dashboard-courses-modify.component';

describe('DashboardCoursesModifyComponent', () => {
  let component: DashboardCoursesModifyComponent;
  let fixture: ComponentFixture<DashboardCoursesModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCoursesModifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCoursesModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
