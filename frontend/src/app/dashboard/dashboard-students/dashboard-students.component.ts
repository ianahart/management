import { Component, OnInit } from '@angular/core';
import { DashboardStudentService } from 'src/app/dashboard-student.service';
import { IStudent } from 'src/app/interfaces';

@Component({
  selector: 'app-dashboard-students',
  templateUrl: './dashboard-students.component.html',
  styleUrls: ['./dashboard-students.component.scss'],
})
export class DashboardStudentsComponent implements OnInit {
  student = '';
  page = 0;
  direction = 'next';
  students: IStudent[] = [];
  totalPages = 0;
  keys: string[] = [];
  course = '';
  error = '';

  constructor(private dashboardStudentService: DashboardStudentService) {}

  ngOnInit(): void {
    this.paginate();
  }

  paginate() {
    this.dashboardStudentService
      .retrieveStudents(this.page, this.direction)
      .subscribe(
        ({ page, total_pages, items }) => {
          this.page = page;
          this.totalPages = total_pages;
          this.setStudents(items);
          if (this.students.length) {
            this.keys = Object.keys(this.students[0]);
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onNext() {
    this.direction = 'next';
    this.paginate();
  }

  onPrev() {
    console.log('prev');
    this.direction = 'prev';
    this.paginate();
  }

  setStudents(items: IStudent[]) {
    this.students = items.map((item) => {
      // @ts-ignore
      item.department = item.department.name;
      return item;
    });
  }
}
