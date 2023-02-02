import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DashboardStudentService } from 'src/app/dashboard-student.service';
import { debounce } from 'lodash';
import { IClass, IStudent, IStudentName } from 'src/app/interfaces';
import { studentState } from 'src/app/data';
import {
  faUser,
  faEnvelope,
  faCalendarPlus,
  faCakeCandles,
  faLocationPin,
  faCity,
  faRoad,
  faStreetView,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard-student-reports',
  templateUrl: './dashboard-student-reports.component.html',
  styleUrls: ['./dashboard-student-reports.component.scss'],
})
export class DashboardStudentReportsComponent implements OnInit {
  faCity = faCity;
  faUser = faUser;
  faRoad = faRoad;
  faEnvelope = faEnvelope;
  faStreetView = faStreetView;
  faLocationPin = faLocationPin;
  faCakeCandles = faCakeCandles;
  faCalendarPlus = faCalendarPlus;

  error = '';
  page = 0;
  totalPages = 0;
  direction = 'next';
  isListOpen = false;
  studentNames: IStudentName[] = [];
  studentClasses: IClass[] = [];
  student: IStudent = studentState;
  isSelectDropDownOpen = false;
  selectedStudentName: IStudentName = { id: 0, name: '' };

  constructor(private dashboardStudentService: DashboardStudentService) {}

  ngOnInit(): void {}

  searchTerm = new FormControl('');

  debouncedSearchStudent = debounce(() => this.searchStudent(), 400);

  openSelectDropDown(isOpen: boolean) {
    this.isSelectDropDownOpen = isOpen;
  }

  selectStudentName(student: IStudentName) {
    this.searchTerm.setValue(student.name);
    this.selectedStudentName = student;
    this.openSelectDropDown(false);
  }

  onKeyDown(event: Event) {
    if (this.searchTerm?.value && this.searchTerm.value.length == 1) {
      this.openSelectDropDown(false);
    }
    this.error = '';
    const input = (event.target as HTMLInputElement).value;
    this.searchTerm.setValue(input);
    this.debouncedSearchStudent();
  }

  retrieveSearchedStudent() {
    if (this.selectedStudentName.id === 0) return;
    console.log('submit');

    this.dashboardStudentService
      .retrieveSearchedStudent(this.selectedStudentName.id)
      .subscribe(
        ({ student, classes }) => {
          this.student = student;
          this.studentClasses = classes;
          this.selectedStudentName = { id: 0, name: '' };
          this.searchTerm.setValue('');
        },
        (err) => {
          console.log(err);
        }
      );
  }

  searchStudent() {
    if (!this.searchTerm.value) return;
    this.studentNames = [];
    this.dashboardStudentService
      .searchStudent(this.searchTerm.value, this.page, this.direction)
      .subscribe(
        ({ page, total_pages, student_names }) => {
          this.page = page;
          this.totalPages = total_pages;
          this.studentNames = student_names;
          this.openSelectDropDown(true);
        },
        ({ error }) => {
          this.error = error.error;
          this.openSelectDropDown(false);
        }
      );
  }
}
