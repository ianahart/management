import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardDepartmentService } from '../dashboard-department.service';
import { IDepartment } from 'src/app/interfaces';
import { DashboardCourseService } from '../dashboard-course.service';

@Component({
  selector: 'app-dashboard-courses-modify',
  templateUrl: './dashboard-courses-modify.component.html',
  styleUrls: ['./dashboard-courses-modify.component.scss'],
})
export class DashboardCoursesModifyComponent implements OnInit {
  keys: string[] = [];
  departments: IDepartment[] = [];
  selectedDepartment = '';
  error = '';
  courseId = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dashboardCourseService: DashboardCourseService,
    private dashboardDepartmentService: DashboardDepartmentService
  ) {}

  modifyCourseForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(200)]],
    credits: ['', [Validators.required, Validators.maxLength(1)]],
    semester: ['', [Validators.required, Validators.maxLength(20)]],
    department: ['', [Validators.required, Validators.maxLength(200)]],
  });

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((paramsId) => {
      this.courseId = paramsId['id'];
    });
    this.retrieveCourse();
    this.generateDepartments();
  }

  retrieveCourse() {
    this.dashboardCourseService.retrieveCourse(this.courseId).subscribe(
      ({ credits, department, name, semester }) => {
        this.selectedDepartment = department.name;

        this.keys = Object.keys(department).filter((key) => key !== 'id');
        this.modifyCourseForm.patchValue({
          department: department.id.toString(),
        });
        this.modifyCourseForm.patchValue({ credits: credits.toString() });
        this.modifyCourseForm.patchValue({ semester });
        this.modifyCourseForm.patchValue({ name });
      },
      ({ error }) => {
        this.error = error.error;
      }
    );
  }
  generateDepartments() {
    this.dashboardDepartmentService
      .retrieveAllDepartments()
      .subscribe((departments) => {
        this.departments = departments;
      });
  }

  selectDepartment({ name, id }: IDepartment) {
    this.selectedDepartment = name;
    this.modifyCourseForm.patchValue({ department: id.toString() });
  }

  updateCourse(form: FormGroup) {
    if (this.modifyCourseForm.invalid) return;
    this.dashboardCourseService
      .updateCourse(this.courseId, form.value)
      .subscribe(
        ({ message }) => {
          if (message === 'success') {
            this.router.navigate(['/dashboard/courses']);
          }
        },
        ({ error }) => {
          this.error = error.error;
        }
      );
  }

  deleteCourse(event: Event) {
    event.preventDefault();
    this.dashboardCourseService.deleteCourse(this.courseId).subscribe(
      ({ message }) => {
        if (message === 'success') {
          this.router.navigate(['/dashboard/courses']);
        }
      },
      ({ error }) => {
        this.error = error.error;
      }
    );
  }
  get name() {
    return this.modifyCourseForm.get('name');
  }

  get credits() {
    return this.modifyCourseForm.get('credits');
  }

  get semester() {
    return this.modifyCourseForm.get('semester');
  }

  get department() {
    return this.modifyCourseForm.get('department');
  }
}
