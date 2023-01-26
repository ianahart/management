import { Component, OnInit } from '@angular/core';
import { ICourse } from 'src/app/interfaces';
import { DashboardCourseService } from '../dashboard-course.service';

@Component({
  selector: 'app-dashboard-courses',
  templateUrl: './dashboard-courses.component.html',
  styleUrls: ['./dashboard-courses.component.scss'],
})
export class DashboardCoursesComponent implements OnInit {
  constructor(private dashboardCourseService: DashboardCourseService) {}

  page = 0;
  direction = 'next';
  totalPages = 0;
  courses: ICourse[] = [];
  keys: string[] = [];
  course = '';
  error = '';

  ngOnInit(): void {
    this.paginate();
  }

  captureInput(input: string) {
    this.course = input;
  }

  resetPagination() {
    this.page = 0;
    this.totalPages = 0;
    this.direction = 'next';
  }

  search() {
    this.resetPagination();
    this.error = '';
    this.dashboardCourseService
      .searchCourse(this.course, this.page, this.direction)
      .subscribe(
        ({ items, page, total_pages }) => {
          this.page = page;
          this.totalPages = total_pages;
          this.setCourses(items);
          if (this.courses.length) {
            this.keys = Object.keys(this.courses[0]);
          }
          this.course = '';
        },
        ({ error }) => {
          this.error = error.error;
        }
      );
  }

  paginate() {
    this.dashboardCourseService
      .retrieveCourses(this.page, this.direction)
      .subscribe(({ items, page, total_pages }) => {
        this.page = page;
        this.totalPages = total_pages;
        this.setCourses(items);
        if (this.courses.length) {
          this.keys = Object.keys(this.courses[0]);
        }
      });
  }

  setCourses(items: ICourse[]) {
    this.courses = items.map((item) => {
      // @ts-ignore
      item.department = item.department.name;
      return item;
    });
  }

  onNext() {
    this.direction = 'next';
    this.paginate();
  }

  onPrev() {
    this.direction = 'prev';
    this.paginate();
  }
}
