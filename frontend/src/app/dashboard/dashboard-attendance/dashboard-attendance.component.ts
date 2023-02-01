import { Component, OnInit } from '@angular/core';
import { IAttendee, ICourse } from 'src/app/interfaces';
import { DashboardCourseService } from '../dashboard-course.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardAttendanceService } from '../dashboard-attendance.service';
import * as utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import * as dayjs from 'dayjs';
@Component({
  selector: 'app-dashboard-attendance',
  templateUrl: './dashboard-attendance.component.html',
  styleUrls: ['./dashboard-attendance.component.scss'],
})
export class DashboardAttendanceComponent implements OnInit {
  error = '';
  coursePage = 0;
  courseDirection = 'next';
  courseTotalPages = 0;
  courses: ICourse[] = [];
  attendees: IAttendee[] = [];
  selectedCourse = 'Choose Course';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dashboardCourseService: DashboardCourseService,
    private dashboardAttendanceService: DashboardAttendanceService
  ) {}

  ngOnInit(): void {
    this.retrieveCourses();
  }
  // @ts-ignore
  date = new FormControl(dayjs.utc());
  attendanceForm = this.fb.group({
    course: ['', [Validators.required]],
  });

  onCheckBoxChange(event: any, studentId: number) {
    this.attendees = this.attendees.map((attendee) => {
      if (attendee.student.id === studentId) {
        attendee.status = event.target.checked;
      }
      return attendee;
    });
    this.markAttendance(
      event.target.checked,
      this.attendanceForm.get('course')?.value ?? '',
      studentId
    );
  }

  markAttendance(checked: boolean, course: string, studentId: number) {
    if (!this.date.value) return;
    this.dashboardAttendanceService
      .markAttendance(checked, course, this.date.value, studentId)
      .subscribe();
  }

  onDateChange() {
    this.attendees = [];
    const course = this.attendanceForm.get('course')?.value ?? '';
    if (!this.date.value) return;
    return this.dashboardAttendanceService
      .onChangeDateAttendance(this.date.value, course)
      .subscribe(({ attendees }) => {
        this.attendees = attendees;
      });
  }

  selectCourse(course: ICourse) {
    this.selectedCourse = course.name;
    this.attendanceForm.patchValue({ course: course.id.toString() });
    console.log(dayjs.utc());
    this.date.patchValue(dayjs.utc());
  }

  loadMore(value: string) {
    if (value !== 'student') {
      this.retrieveCourses();
    }
  }

  onSubmit() {
    if (this.attendanceForm.invalid) return;
    const course = this.attendanceForm.get('course')?.value;
    if (!course || !this.date.value) return;
    this.dashboardAttendanceService
      .retrieveStudentAttendances(course, this.date.value)
      .subscribe(({ attendees }) => {
        this.attendees = attendees;
      });
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

  markAll(type: string) {
    const course = this.attendanceForm.get('course')?.value;
    if (!course || !this.date.value) return;
    this.attendees.map((attendee) => {
      attendee.status = type === 'present' ? true : false;
    });
    this.dashboardAttendanceService
      .markAll(type, course, this.date.value)
      .subscribe();
  }

  formattedDate() {
    return dayjs.utc().format('DD-MM-YYYY');
  }

  get course() {
    return this.attendanceForm.get('course');
  }
}
