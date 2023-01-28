import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardClassSelectComponent } from './dashboard-class-select.component';

describe('DashboardClassSelectComponent', () => {
  let component: DashboardClassSelectComponent;
  let fixture: ComponentFixture<DashboardClassSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardClassSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardClassSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
