import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardClassesModifyComponent } from './dashboard-classes-modify.component';

describe('DashboardClassesModifyComponent', () => {
  let component: DashboardClassesModifyComponent;
  let fixture: ComponentFixture<DashboardClassesModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardClassesModifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardClassesModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
