import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardSidebarComponent } from './dashboard-sidebar/dashboard-sidebar.component';
import { DashboardClassesComponent } from './dashboard-classes/dashboard-classes.component';

@NgModule({
  declarations: [DashboardHomeComponent, DashboardSidebarComponent, DashboardClassesComponent],
  imports: [CommonModule, DashboardRoutingModule, FontAwesomeModule],
})
export class DashboardModule {}
