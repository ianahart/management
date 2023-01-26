import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStudentsAddComponent } from './dashboard-students-add.component';

describe('DashboardStudentsAddComponent', () => {
  let component: DashboardStudentsAddComponent;
  let fixture: ComponentFixture<DashboardStudentsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardStudentsAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardStudentsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
