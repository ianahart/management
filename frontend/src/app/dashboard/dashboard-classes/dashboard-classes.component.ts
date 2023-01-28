import { Component, OnInit } from '@angular/core';
import { IClass } from 'src/app/interfaces';
import { DashboardClassService } from '../dashboard-class.service';

@Component({
  selector: 'app-dashboard-classes',
  templateUrl: './dashboard-classes.component.html',
  styleUrls: ['./dashboard-classes.component.scss'],
})
export class DashboardClassesComponent implements OnInit {
  constructor(private dashboardClassService: DashboardClassService) {}
  error = '';
  page = 0;
  totalPages = 0;
  classes: IClass[] = [];
  direction = 'next';
  keys: string[] = [];
  studentClass = '';

  ngOnInit(): void {
    this.retrieveClasses();
  }

  onPrev() {
    this.direction = 'prev';
    this.retrieveClasses();
  }

  onNext() {
    this.direction = 'next';
    this.retrieveClasses();
  }

  captureInput(input: string) {
    this.studentClass = input;
  }

  resetPagination() {
    this.page = 0;
    this.totalPages = 0;
    this.direction = 'next';
  }

  search() {
    if (this.studentClass.trim().length === 0) return;
    this.resetPagination();
    this.error = '';
    this.dashboardClassService
      .searchClass(this.studentClass, this.page, this.direction)
      .subscribe(
        ({ items, page, total_pages }) => {
          this.page = page;
          this.classes = items;
          this.totalPages = total_pages;
          if (this.classes.length) {
            this.keys = Object.keys(this.classes[0]);
          }
          this.studentClass = '';
        },
        ({ error }) => {
          this.error = error.error;
        }
      );
  }

  retrieveClasses() {
    this.dashboardClassService
      .retrieveClasses(this.page, this.direction)
      .subscribe(({ items, total_pages, page }) => {
        this.classes = items;
        this.totalPages = total_pages;
        this.page = page;
        if (this.classes.length) {
          this.keys = Object.keys(this.classes[0]);
        }
      });
  }
}
