import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardDepartmentService } from '../dashboard-department.service';
@Component({
  selector: 'app-dashboard-departments-add',
  templateUrl: './dashboard-departments-add.component.html',
  styleUrls: ['./dashboard-departments-add.component.scss'],
})
export class DashboardDepartmentsAddComponent implements OnInit {
  error = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dashboardDepartmentService: DashboardDepartmentService
  ) {}

  addDepartmentForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(200)]],
  });

  ngOnInit(): void {}

  onSubmit(): void {
    this.error = '';
    if (this.addDepartmentForm.invalid) return;

    this.dashboardDepartmentService
      .addDepartment(this.addDepartmentForm)
      .subscribe(
        (message) => {
          if (message === 'success') {
            this.router.navigate(['/dashboard/departments']);
          }
        },
        ({ error }) => {
          this.error = error.error;
        }
      );
  }

  get name() {
    return this.addDepartmentForm.get('name');
  }
}
