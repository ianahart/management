import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDepartment, IStudentForm } from 'src/app/interfaces';
import { DashboardDepartmentService } from '../dashboard-department.service';
import { states } from 'src/app/data';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnInit {
  @Input() error = '';
  @Input() title = '';
  @Input() formType = '';

  @Output() submitEvent = new EventEmitter<any>();

  departments: IDepartment[] = [];
  selectedDepartment = 'Business';
  keys: string[] = [];
  states: { name: string; id: number }[] = states;
  selectedState = 'AL';

  constructor(
    private fb: FormBuilder,
    private dashboardDepartmentService: DashboardDepartmentService
  ) {}

  ngOnInit(): void {
    this.dashboardDepartmentService
      .retrieveAllDepartments()
      .subscribe((departments) => {
        this.departments = departments;
        if (this.departments.length) {
          this.selectedDepartment = this.departments[0].name;
          this.studentForm.patchValue({
            department: this.departments[0].id.toString(),
          });

          this.keys = Object.keys(this.departments[0]).filter(
            (key) => key !== 'id'
          );
        }
      });
  }

  studentForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(200)]],
    email: ['', [Validators.required, Validators.email]],
    gender: ['', [Validators.required, Validators.maxLength(20)]],
    department: ['', [Validators.required]],
    section: ['', [Validators.required]],
    dob: ['', [Validators.required]],
    address: this.fb.group({
      city: ['', [Validators.required]],
      street: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required]],
    }),
  });

  selectDepartment({ name, id }: IDepartment) {
    this.selectedDepartment = name;
    this.studentForm.patchValue({ department: id.toString() });
  }

  selectState({ name, id }: { name: string; id: number }) {
    this.selectedState = name;
    this.studentForm.patchValue({ address: { state: name } });
  }

  get dob() {
    return this.studentForm.get('dob');
  }

  onSubmit() {
    if (this.studentForm.invalid) return;
    this.submitEvent.emit(this.studentForm.value);
  }

  get section() {
    return this.studentForm.get('section');
  }

  get name() {
    return this.studentForm.get('name');
  }

  get email() {
    return this.studentForm.get('email');
  }

  get gender() {
    return this.studentForm.get('gender');
  }

  get department() {
    return this.studentForm.get('department');
  }

  get street() {
    return this.studentForm.get('address.street');
  }

  get state() {
    return this.studentForm.get('address.state');
  }

  get zip() {
    return this.studentForm.get('address.zip');
  }
  get city() {
    return this.studentForm.get('address.city');
  }
}
