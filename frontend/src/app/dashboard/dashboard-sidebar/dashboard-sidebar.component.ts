import { Component, OnInit } from '@angular/core';
import {
  faChalkboard,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.scss'],
})
export class DashboardSidebarComponent implements OnInit {
  faRightFromBracket = faRightFromBracket;
  faChalkboard = faChalkboard;

  constructor() {}

  ngOnInit(): void {}
}
