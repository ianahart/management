import { Component, OnInit } from '@angular/core';
import { staffState } from 'src/app/data';
import { IStaff } from 'src/app/interfaces';
import { DashboardStaffService } from '../dashboard-staff.service';
import { faXmark, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard-staffs',
  templateUrl: './dashboard-staffs.component.html',
  styleUrls: ['./dashboard-staffs.component.scss'],
})
export class DashboardStaffsComponent implements OnInit {
  faXmark = faXmark;
  faChevronRight = faChevronRight;

  page = 0;
  totalPages = 0;
  direction = 'next';
  staffs: IStaff[] = [];
  selectedStaff: IStaff = staffState;

  constructor(private dashboardStaffService: DashboardStaffService) {}

  ngOnInit(): void {
    this.retrieveAllStaff();
  }

  selectStaff(staff: IStaff) {
    this.selectedStaff = staff;
  }

  closeModal() {
    this.selectedStaff = staffState;
  }

  onPrev() {
    this.direction = 'prev';
    this.retrieveAllStaff();
  }

  onNext() {
    this.direction = 'next';
    this.retrieveAllStaff();
  }

  retrieveAllStaff() {
    this.dashboardStaffService
      .retrieveAllStaff(this.page, this.direction)
      .subscribe(({ staffs, page, total_pages }) => {
        this.staffs = staffs;
        this.page = page;
        this.totalPages = total_pages;
      });
  }
}
