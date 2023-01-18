import { Component, OnInit } from '@angular/core';
import { IDepartment } from 'src/app/interfaces';
import { DashboardDepartmentService } from '../dashboard-department.service';

@Component({
  selector: 'app-dashboard-departments',
  templateUrl: './dashboard-departments.component.html',
  styleUrls: ['./dashboard-departments.component.scss'],
})
export class DashboardDepartmentsComponent implements OnInit {
  constructor(private dashboardDepartmentService: DashboardDepartmentService) {}
  page = 0;
  totalPages = 0;
  direction = 'next';
  departments: IDepartment[] = [];

  ngOnInit(): void {
    this.paginate();
  }

  paginate() {
    this.dashboardDepartmentService
      .retrieveDepartments(this.page, this.direction)
      .subscribe(({ departments, page, total_pages }) => {
        this.departments = departments;
        this.page = page;
        this.totalPages = total_pages;
      });
  }

  onNext(): void {
    this.direction = 'next';
    this.paginate();
  }

  onPrev(): void {
    this.direction = 'prev';
    this.paginate();
  }
}
