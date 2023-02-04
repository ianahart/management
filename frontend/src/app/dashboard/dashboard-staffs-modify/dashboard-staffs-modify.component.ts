import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICreateStaffForm } from 'src/app/interfaces';
import { DashboardStaffService } from '../dashboard-staff.service';

@Component({
  selector: 'app-dashboard-staffs-modify',
  templateUrl: './dashboard-staffs-modify.component.html',
  styleUrls: ['./dashboard-staffs-modify.component.scss'],
})
export class DashboardStaffsModifyComponent implements OnInit {
  error = '';
  staffId = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dashboardStaffService: DashboardStaffService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.staffId = params['id'];
    });
  }

  updateStaff(form: ICreateStaffForm) {
    this.dashboardStaffService.updateStaff(this.staffId, form).subscribe(
      ({ message }) => {
        if (message === 'success') {
          this.router.navigate(['dashboard/staffs']);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
