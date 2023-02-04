import { Component, OnInit } from '@angular/core';
import { ICreateStaffForm } from 'src/app/interfaces';
import { DashboardStaffService } from '../dashboard-staff.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-staffs-add',
  templateUrl: './dashboard-staffs-add.component.html',
  styleUrls: ['./dashboard-staffs-add.component.scss'],
})
export class DashboardStaffsAddComponent implements OnInit {
  error = '';
  constructor(
    private router: Router,
    private dashboardStaffService: DashboardStaffService
  ) {}

  ngOnInit(): void {}

  createStaff(form: ICreateStaffForm) {
    this.error = '';
    this.dashboardStaffService.createStaff(form).subscribe(
      (message) => {
        if (message === 'success') {
          this.router.navigate(['dashboard/staffs']);
        }
      },
      ({ error }) => {
        this.error = error.error;
      }
    );
  }
}
