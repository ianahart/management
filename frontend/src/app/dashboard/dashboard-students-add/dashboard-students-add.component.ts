import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { DashboardStudentService } from 'src/app/dashboard-student.service';
import { IStudentForm } from 'src/app/interfaces';

@Component({
  selector: 'app-dashboard-students-add',
  templateUrl: './dashboard-students-add.component.html',
  styleUrls: ['./dashboard-students-add.component.scss'],
})
export class DashboardStudentsAddComponent implements OnInit {
  error = '';
  constructor(
    private router: Router,
    private dashboardStudentService: DashboardStudentService
  ) {}

  ngOnInit(): void {}

  createStudent(form: IStudentForm) {
    this.dashboardStudentService.createStudent(form).subscribe(
      (message) => {
        if (message === 'success') {
          this.router.navigate(['dashboard/students']);
        }
      },
      ({ error }) => {
        this.error = error.error;
      }
    );
  }
}
