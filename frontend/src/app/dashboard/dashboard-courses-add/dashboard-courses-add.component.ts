import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardDepartmentService } from '../dashboard-department.service';
import { IDepartment } from 'src/app/interfaces';
import { DashboardCourseService } from '../dashboard-course.service';

@Component({
  selector: 'app-dashboard-courses-add',
  templateUrl: './dashboard-courses-add.component.html',
  styleUrls: ['./dashboard-courses-add.component.scss'],
})
export class DashboardCoursesAddComponent implements OnInit {
  keys: string[] = [];
  departments: IDepartment[] = [];
  selectedDepartment = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dashboardCourseService: DashboardCourseService,
    private dashboardDepartmentService: DashboardDepartmentService
  ) {}

  addCourseForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(200)]],
    credits: ['', [Validators.required, Validators.maxLength(1)]],
    semester: ['', [Validators.required, Validators.maxLength(20)]],
    department: ['', [Validators.required, Validators.maxLength(200)]],
  });

  ngOnInit(): void {
    this.dashboardDepartmentService
      .retrieveAllDepartments()
      .subscribe((departments) => {
        this.departments = departments as any;
        if (this.departments.length) {
          this.selectedDepartment = this.departments[0].name;
          this.addCourseForm.patchValue({
            department: this.departments[0].id.toString(),
          });
          this.keys = Object.keys(this.departments[0]).filter(
            (key) => key !== 'id'
          );
        }
      });
  }

  selectDepartment({ name, id }: IDepartment) {
    this.selectedDepartment = name;
    this.addCourseForm.patchValue({ department: id.toString() });
  }

  addCourse(form: FormGroup) {
    if (this.addCourseForm.invalid) return;
    this.dashboardCourseService.addCourse(form.value).subscribe(
      (message) => {
        if (message === 'success') {
          this.router.navigate(['dashboard/courses']);
        }
      },
      ({ error }) => {
        this.error = error.error;
      }
    );
  }

  get name() {
    return this.addCourseForm.get('name');
  }

  get credits() {
    return this.addCourseForm.get('credits');
  }

  get semester() {
    return this.addCourseForm.get('semester');
  }

  get department() {
    return this.addCourseForm.get('department');
  }
}
