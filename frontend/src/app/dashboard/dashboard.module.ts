import { NgModule } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardSidebarComponent } from './dashboard-sidebar/dashboard-sidebar.component';
import { DashboardClassesComponent } from './dashboard-classes/dashboard-classes.component';
import { DashboardDepartmentsComponent } from './dashboard-departments/dashboard-departments.component';
import { DashboardDepartmentsAddComponent } from './dashboard-departments-add/dashboard-departments-add.component';
import { DashboardDepartmentsModifyComponent } from './dashboard-departments-modify/dashboard-departments-modify.component';
import { DashboardFormComponent } from './dashboard-form/dashboard-form.component';
import { DashboardCoursesComponent } from './dashboard-courses/dashboard-courses.component';
import { DashboardCoursesAddComponent } from './dashboard-courses-add/dashboard-courses-add.component';
import { DashboardSelectComponent } from './dashboard-select/dashboard-select.component';
import { DashboardTableComponent } from './dashboard-table/dashboard-table.component';
import { DashboardCoursesModifyComponent } from './dashboard-courses-modify/dashboard-courses-modify.component';
import { DashboardStudentsComponent } from './dashboard-students/dashboard-students.component';
import { DashboardStudentsAddComponent } from './dashboard-students-add/dashboard-students-add.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { DashboardStudentsModifyComponent } from './dashboard-students-modify/dashboard-students-modify.component';
import { DashboardClassesAddComponent } from './dashboard-classes-add/dashboard-classes-add.component';
import { DashboardClassSelectComponent } from './dashboard-class-select/dashboard-class-select.component';
import { DashboardClassesModifyComponent } from './dashboard-classes-modify/dashboard-classes-modify.component';

@NgModule({
  declarations: [
    DashboardHomeComponent,
    DashboardSidebarComponent,
    DashboardClassesComponent,
    DashboardDepartmentsComponent,
    DashboardDepartmentsAddComponent,
    DashboardDepartmentsModifyComponent,
    DashboardFormComponent,
    DashboardCoursesComponent,
    DashboardCoursesAddComponent,
    DashboardSelectComponent,
    DashboardTableComponent,
    DashboardCoursesModifyComponent,
    DashboardStudentsComponent,
    DashboardStudentsAddComponent,
    StudentFormComponent,
    DashboardStudentsModifyComponent,
    DashboardClassesAddComponent,
    DashboardClassSelectComponent,
    DashboardClassesModifyComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class DashboardModule {}
