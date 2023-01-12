import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountHomeComponent } from './create-account-home.component';

describe('CreateAccountHomeComponent', () => {
  let component: CreateAccountHomeComponent;
  let fixture: ComponentFixture<CreateAccountHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAccountHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAccountHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
