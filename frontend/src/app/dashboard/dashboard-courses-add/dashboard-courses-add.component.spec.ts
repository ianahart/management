import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCoursesAddComponent } from './dashboard-courses-add.component';

describe('DashboardCoursesAddComponent', () => {
  let component: DashboardCoursesAddComponent;
  let fixture: ComponentFixture<DashboardCoursesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCoursesAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCoursesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
