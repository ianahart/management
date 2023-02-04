import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ICourse, IDepartment, IStaff } from 'src/app/interfaces';
import { DashboardCourseService } from '../dashboard-course.service';
import { DashboardDepartmentService } from '../dashboard-department.service';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { DashboardStaffService } from '../dashboard-staff.service';
import { ActivatedRoute } from '@angular/router';

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
  staffId = 0;

  @Input() error = '';
  @Input() formType = '';
  @Input() btnText = '';
  @Input() title = '';

  @Output() submitEvent = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private dashboardDepartmentService: DashboardDepartmentService,
    private dashboardCourseService: DashboardCourseService,
    private dashboardStaffService: DashboardStaffService
  ) {}

  ngOnInit(): void {
    if (this.formType === 'update') {
      this.activatedRoute.params.subscribe((paramsId) => {
        this.staffId = paramsId['id'];
      });
      this.retrieveStaffMember();
    }

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

  patchValues(staff_member: IStaff) {
    console.log(staff_member.department.name);
    this.selectedDepartment = staff_member.department.name;

    this.selectDepartment(staff_member.department);
    this.keys = Object.keys(staff_member.department).filter((d) => d !== 'id');

    console.log(staff_member.department);
    this.staffForm.patchValue({
      name: staff_member.name,
      email: staff_member.email,
      contact: staff_member.contact,
      department: staff_member.department.id.toString(),
    });
    this.selectedCourses = staff_member.courses;
  }

  retrieveStaffMember() {
    this.dashboardStaffService.retrieveStaffMember(this.staffId).subscribe(
      ({ staff_member }) => {
        this.patchValues(staff_member);
      },
      (err) => {
        this.error = 'This staff member does not exist.';
      }
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
        if (this.departments.length && this.formType === 'create') {
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
