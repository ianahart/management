import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IClass } from 'src/app/interfaces';
import { DashboardClassService } from '../dashboard-class.service';

@Component({
  selector: 'app-dashboard-classes-modify',
  templateUrl: './dashboard-classes-modify.component.html',
  styleUrls: ['./dashboard-classes-modify.component.scss'],
})
export class DashboardClassesModifyComponent implements OnInit {
  classId = '';
  confirm = '';
  studentClass = {
    semester: '',
    course_name: '',
    student_name: '',
    id: 0,
    year: '',
  };
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dashboardClassService: DashboardClassService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.classId = params.get('id') as string;
    });

    this.dashboardClassService
      .retrieveClass(this.classId)
      .subscribe(({ student_class }) => {
        this.studentClass = student_class;
      });
  }

  handleOnChange(value: string) {
    this.confirm = value;
  }

  onDelete() {
    if (
      this.studentClass.course_name.toLowerCase() !==
      this.confirm?.toLowerCase()
    )
      return;

    this.dashboardClassService
      .deleteClass(this.studentClass.id)
      .subscribe(({ message }) => {
        if (message === 'success') {
          this.router.navigate(['dashboard/classes']);
        }
      });
  }
}
