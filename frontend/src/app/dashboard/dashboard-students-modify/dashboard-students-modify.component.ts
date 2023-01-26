import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-students-modify',
  templateUrl: './dashboard-students-modify.component.html',
  styleUrls: ['./dashboard-students-modify.component.scss'],
})
export class DashboardStudentsModifyComponent implements OnInit {
  error = '';
  constructor() {}

  ngOnInit(): void {}

  updateStudent(form: any) {}
}
