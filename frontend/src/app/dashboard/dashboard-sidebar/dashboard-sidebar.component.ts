import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faChalkboard,
  faChalkboardUser,
  faRightFromBracket,
  faBuildingColumns,
  faGripVertical,
  faAward,
  faUser,
  faHouse,
  faXmark,
  faBars,
  faBookOpenReader,
} from '@fortawesome/free-solid-svg-icons';
import { userState } from 'src/app/data';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.scss'],
})
export class DashboardSidebarComponent implements OnInit {
  faUser = faUser;
  faBars = faBars;
  faXmark = faXmark;
  faAward = faAward;
  faHouse = faHouse;
  faChalkboard = faChalkboard;
  faGripVertical = faGripVertical;
  faChalkboardUser = faChalkboardUser;
  faBookOpenReader = faBookOpenReader;
  faBuildingColumns = faBuildingColumns;
  faRightFromBracket = faRightFromBracket;

  isLinksShowing = true;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLogout(): void {
    this.authService.logout().subscribe(
      (value) => {
        if (value === 'success') {
          this.authService.removeTokens();
          this.authService.setUser(userState);
          this.router.navigate(['/']);
        }
      },
      (err) => {
        this.authService.removeTokens();
        this.authService.setUser(userState);
        this.router.navigate(['/']);
      }
    );
  }

  setIsLinkShowing(isShowing: boolean) {
    this.isLinksShowing = isShowing;
  }
}
