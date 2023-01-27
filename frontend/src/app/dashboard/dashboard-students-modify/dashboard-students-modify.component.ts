import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardStudentService } from 'src/app/dashboard-student.service';
import { IStudentForm } from 'src/app/interfaces';

@Component({
  selector: 'app-dashboard-students-modify',
  templateUrl: './dashboard-students-modify.component.html',
  styleUrls: ['./dashboard-students-modify.component.scss'],
})
export class DashboardStudentsModifyComponent implements OnInit {
  error = '';
  studentId: string | null = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dashboardStudentService: DashboardStudentService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.studentId = params.get('id');
    });
  }

  updateStudent(form: IStudentForm) {
    if (!this.studentId) return;
    return this.dashboardStudentService
      .updateStudent(this.studentId, form)
      .subscribe(
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
