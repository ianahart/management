import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardClassesAddComponent } from './dashboard-classes-add.component';

describe('DashboardClassesAddComponent', () => {
  let component: DashboardClassesAddComponent;
  let fixture: ComponentFixture<DashboardClassesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardClassesAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardClassesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
