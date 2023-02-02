import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss'],
})
export class DashboardOverviewComponent implements OnInit {
  adminName = '';
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const { first_name, last_name } = this.authService.getUser();
    this.adminName = `${first_name} ${last_name}`;
  }
}
