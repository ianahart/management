import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  //@ts-ignore
  loggedIn$: BehaviorSubject<boolean>;

  constructor(private authService: AuthService) {
    //@ts-ignore
    this.loggedIn$ = this.authService.loggedIn$;
  }

  ngOnInit() {
    const tokens = localStorage.getItem('tokens');
    if (tokens === 'null' || tokens === null) {
      this.loggedIn$.next(false);
      return;
    }
    this.authService.syncUser().subscribe((response) => {
      this.authService.setUser(response.user);
    });
  }
}
