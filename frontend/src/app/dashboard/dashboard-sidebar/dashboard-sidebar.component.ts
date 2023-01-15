import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faChalkboard,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { userState } from 'src/app/data';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.scss'],
})
export class DashboardSidebarComponent implements OnInit {
  faRightFromBracket = faRightFromBracket;
  faChalkboard = faChalkboard;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLogout(): void {
    this.authService.logout().subscribe((value) => {
      console.log(value);
      if (value === 'success') {
        this.authService.removeTokens();
        this.authService.setUser(userState);
        this.router.navigate(['/']);
      }
    });
  }
}
