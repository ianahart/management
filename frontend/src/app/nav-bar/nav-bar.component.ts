import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  //@ts-ignore
  loggedIn$: BehaviorSubject<boolean>;

  constructor(private authService: AuthService) {
    //@ts-ignore
    this.loggedIn$ = this.authService.loggedIn$;
  }

  ngOnInit(): void {}
}
