import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { DashboardClassesAddComponent } from './dashboard-classes-add/dashboard-classes-add.component';
import { DashboardClassesModifyComponent } from './dashboard-classes-modify/dashboard-classes-modify.component';
import { DashboardClassesComponent } from './dashboard-classes/dashboard-classes.component';
import { DashboardCoursesAddComponent } from './dashboard-courses-add/dashboard-courses-add.component';
import { DashboardCoursesModifyComponent } from './dashboard-courses-modify/dashboard-courses-modify.component';
import { DashboardCoursesComponent } from './dashboard-courses/dashboard-courses.component';
import { DashboardDepartmentsAddComponent } from './dashboard-departments-add/dashboard-departments-add.component';
import { DashboardDepartmentsModifyComponent } from './dashboard-departments-modify/dashboard-departments-modify.component';
import { DashboardDepartmentsComponent } from './dashboard-departments/dashboard-departments.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardStudentsAddComponent } from './dashboard-students-add/dashboard-students-add.component';
import { DashboardStudentsModifyComponent } from './dashboard-students-modify/dashboard-students-modify.component';
import { DashboardStudentsComponent } from './dashboard-students/dashboard-students.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardHomeComponent,
    children: [
      {
        path: 'classes',
        component: DashboardClassesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'courses',
        component: DashboardCoursesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'departments',
        component: DashboardDepartmentsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'students',
        component: DashboardStudentsComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'courses/add',
    component: DashboardCoursesAddComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'departments/add',
    component: DashboardDepartmentsAddComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'students/add',
    component: DashboardStudentsAddComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'classes/add',
    component: DashboardClassesAddComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'courses/:id',
    component: DashboardCoursesModifyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'departments/:id',
    component: DashboardDepartmentsModifyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'students/:id',
    component: DashboardStudentsModifyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'classes/:id',
    component: DashboardClassesModifyComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
