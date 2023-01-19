import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { DashboardClassesComponent } from './dashboard-classes/dashboard-classes.component';
import { DashboardCoursesAddComponent } from './dashboard-courses-add/dashboard-courses-add.component';
import { DashboardCoursesComponent } from './dashboard-courses/dashboard-courses.component';
import { DashboardDepartmentsAddComponent } from './dashboard-departments-add/dashboard-departments-add.component';
import { DashboardDepartmentsModifyComponent } from './dashboard-departments-modify/dashboard-departments-modify.component';
import { DashboardDepartmentsComponent } from './dashboard-departments/dashboard-departments.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';

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
    path: 'departments/:id',
    component: DashboardDepartmentsModifyComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
