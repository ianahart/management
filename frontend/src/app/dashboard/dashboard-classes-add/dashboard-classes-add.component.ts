import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardStudentService } from 'src/app/dashboard-student.service';
import { ICourse, IStudent } from 'src/app/interfaces';
import { DashboardClassService } from '../dashboard-class.service';
import { DashboardCourseService } from '../dashboard-course.service';

@Component({
  selector: 'app-dashboard-classes-add',
  templateUrl: './dashboard-classes-add.component.html',
  styleUrls: ['./dashboard-classes-add.component.scss'],
})
export class DashboardClassesAddComponent implements OnInit {
  error = '';
  coursePage = 0;
  courseDirection = 'next';
  courseTotalPages = 0;
  courses: ICourse[] = [];
  selectedCourse = 'Choose Course';
  studentPage = 0;
  studentDirection = 'next';
  studentTotalPages = 0;
  students: IStudent[] = [];
  selectedStudent = 'Choose Student';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dashboardClassService: DashboardClassService,
    private dashboardStudentService: DashboardStudentService,
    private dashboardCourseService: DashboardCourseService
  ) {}

  ngOnInit(): void {
    this.retrieveStudents();
    this.retrieveCourses();
  }

  addClassForm = this.fb.group({
    semester: ['', [Validators.required]],
    student: ['', [Validators.required]],
    course: ['', [Validators.required]],
  });

  selectStudent(student: IStudent) {
    this.selectedStudent = student.name;
    this.addClassForm.patchValue({ student: student.id.toString() });
  }

  selectCourse(course: ICourse) {
    this.selectedCourse = course.name;
    this.addClassForm.patchValue({ course: course.id.toString() });
  }

  loadMore(value: string) {
    value === 'student' ? this.retrieveStudents() : this.retrieveCourses();
  }

  retrieveCourses() {
    this.dashboardCourseService
      .retrieveCourses(this.coursePage, this.courseDirection)
      .subscribe(({ items, total_pages, page }) => {
        this.courses = [...this.courses, ...items];
        this.coursePage = page;
        this.courseTotalPages = total_pages;
        if (total_pages === page) return;
      });
  }

  retrieveStudents() {
    this.dashboardStudentService
      .retrieveStudents(this.studentPage, this.studentDirection)
      .subscribe(({ items, total_pages, page }) => {
        this.students = [...this.students, ...items];
        this.studentPage = page;
        this.studentTotalPages = total_pages;
        if (total_pages === page) return;
      });
  }

  addClass(form: any) {
    if (form.invalid) {
      return;
    }
    this.dashboardClassService.createClass(form.value).subscribe(
      (message) => {
        if (message === 'success') {
          this.router.navigate(['dashboard/classes']);
        }
      },
      ({ error }) => {
        this.error = error.error;
      }
    );
  }

  get semester() {
    return this.addClassForm.get('semester');
  }
}
