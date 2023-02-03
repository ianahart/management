import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ICourse, IDepartment } from 'src/app/interfaces';
import { DashboardCourseService } from '../dashboard-course.service';
import { DashboardDepartmentService } from '../dashboard-department.service';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard-staff-form',
  templateUrl: './dashboard-staff-form.component.html',
  styleUrls: ['./dashboard-staff-form.component.scss'],
})
export class DashboardStaffFormComponent implements OnInit {
  faXmark = faXmark;

  courses: ICourse[] = [];
  departments: IDepartment[] = [];
  selectedDepartment = '';
  keys: string[] = [];
  page = 0;
  totalPages = 0;
  label = 'Courses';
  selectedItem = '';
  selectedCourse = '';
  selectedCourses: ICourse[] = [];

  @Input() error = '';
  @Input() formType = '';
  @Input() btnText = '';
  @Input() title = '';

  @Output() submitEvent = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private dashboardDepartmentService: DashboardDepartmentService,
    private dashboardCourseService: DashboardCourseService
  ) {}

  ngOnInit(): void {
    this.retrieveDepartments();
    this.retrieveCourses();
  }

  staffForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required, Validators.maxLength(200)]],
    contact: [
      '',
      [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
    ],
    department: ['', [Validators.required]],
  });

  selectDepartment({ name, id }: IDepartment) {
    this.selectedDepartment = name;
    this.staffForm.patchValue({ department: id.toString() });
  }

  deselectCourse(course: ICourse) {
    this.selectedCourses = this.selectedCourses.filter(
      (c) => c.id !== course.id
    );
  }

  selectCourse(course: ICourse) {
    this.selectedCourse = course.name;
    const exists = this.selectedCourses.find((c) => c.name === course.name);
    if (exists) return;
    if (this.selectedCourses.length === 4) return;
    this.selectedCourses = [...this.selectedCourses, course];
  }

  loadMore(value: string) {
    this.retrieveCourses();
  }

  retrieveCourses() {
    this.dashboardCourseService
      .retrieveCourses(this.page, 'next')
      .subscribe(({ items, total_pages, page }) => {
        this.courses = [...this.courses, ...items];
        if (this.courses.length) {
          this.selectedCourse = this.courses[0].name;
        }
        this.page = page;
        this.totalPages = total_pages;
        if (total_pages === page) return;
      });
  }

  retrieveDepartments() {
    this.dashboardDepartmentService
      .retrieveAllDepartments()
      .subscribe((departments) => {
        this.departments = [...this.departments, ...departments];
        if (this.departments.length) {
          this.selectDepartment(this.departments[0]);
          this.keys = Object.keys(this.departments[0]).filter(
            (d) => d !== 'id'
          );
        }
      });
  }

  onSubmit() {
    if (this.staffForm.invalid) return;
    if (this.selectedCourses.length === 0) return;
    const values = {
      ...this.staffForm.value,
      courses: [...this.selectedCourses],
    };
    this.submitEvent.emit(values);
  }

  get email() {
    return this.staffForm.get('email');
  }

  get name() {
    return this.staffForm.get('name');
  }

  get contact() {
    return this.staffForm.get('contact');
  }
}
