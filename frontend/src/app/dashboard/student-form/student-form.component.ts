import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDepartment, IStudentForm } from 'src/app/interfaces';
import { DashboardDepartmentService } from '../dashboard-department.service';
import { states } from 'src/app/data';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardStudentService } from 'src/app/dashboard-student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnInit {
  @Input() btnText = '';
  @Input() error = '';
  @Input() title = '';
  @Input() formType = '';

  @Output() submitEvent = new EventEmitter<any>();

  departments: IDepartment[] = [];
  selectedDepartment = 'Business';
  keys: string[] = [];
  states: { name: string; id: number }[] = states;
  selectedState = 'AL';
  studentId = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dashboardStudentService: DashboardStudentService,
    private dashboardDepartmentService: DashboardDepartmentService
  ) {}

  ngOnInit(): void {
    if (this.formType === 'update') {
      this.activatedRoute.params.subscribe((paramsId) => {
        this.studentId = paramsId['id'];
      });
    }
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
    this.populateForm();
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

  deleteStudent(event: Event) {
    event.preventDefault();
    this.dashboardStudentService
      .deleteStudent(this.studentId)
      .subscribe((message) => {
        if (message === 'success') {
          this.router.navigate(['dashboard/students']);
        }
      });
  }

  populateForm() {
    if (this.studentId === 0) return;
    this.dashboardStudentService.retrieveStudent(this.studentId).subscribe(
      (student) => {
        this.studentForm.patchValue({ name: student.name });
        this.studentForm.patchValue({ email: student.email });
        this.studentForm.patchValue({ gender: student.gender });
        console.log(student.department.id.toString());

        this.studentForm.patchValue({ section: student.section.toString() });
        this.studentForm.patchValue({ dob: student.dob });
        this.studentForm.patchValue({ address: { city: student.city } });
        this.studentForm.patchValue({ address: { street: student.street } });
        this.studentForm.patchValue({ address: { state: student.state } });
        this.selectedState = student.state;
        this.studentForm.patchValue({ address: { zip: student.zip } });
        this.studentForm.patchValue({
          department: student.department.id.toString(),
        });
        this.selectedDepartment = student.department.name;
      },
      ({ error }) => {
        this.error = error.error;
      }
    );
  }

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
