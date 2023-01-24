import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
  ],
})
export class DashboardModule {}
