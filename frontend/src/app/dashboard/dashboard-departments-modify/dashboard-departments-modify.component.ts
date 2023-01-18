import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardDepartmentService } from '../dashboard-department.service';

@Component({
  selector: 'app-dashboard-departments-modify',
  templateUrl: './dashboard-departments-modify.component.html',
  styleUrls: ['./dashboard-departments-modify.component.scss'],
})
export class DashboardDepartmentsModifyComponent implements OnInit {
  error = '';
  id: string | null = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dashboardDepartmentService: DashboardDepartmentService
  ) {}

  modifyForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(200)]],
  });

  updateDepartment(form: FormGroup): void {
    this.modifyForm.patchValue({ name: form.value.name });
    if (this.modifyForm.invalid) return;
    if (!this.id) return;
    this.dashboardDepartmentService
      .updateDepartment(this.id, this.modifyForm)
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

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    this.retrieveDepartment();
  }

  retrieveDepartment() {
    if (!this.id) return;
    return this.dashboardDepartmentService
      .retrieveDepartment(this.id)
      .subscribe(
        ({ department }) => {
          this.modifyForm.patchValue({ name: department.name });
        },
        (err) => {
          if (err) {
            this.error = 'Department does not exist.';
          }
        }
      );
  }

  deleteDepartment(e: Event) {
    e.preventDefault();
    if (!this.id) return;
    return this.dashboardDepartmentService.deleteDepartment(this.id).subscribe(
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
    return this.modifyForm.get('name');
  }
}
