import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-home',
  templateUrl: './login-home.component.html',
  styleUrls: ['./login-home.component.scss'],
})
export class LoginHomeComponent implements OnInit {
  error = '';
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {}

  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  onSubmit(): void {
    this.error = '';
    if (this.loginForm.invalid) return;
    this.authService.login(this.loginForm).subscribe(
      ({ user, tokens }) => {
        this.authService.storeTokens(tokens);
        this.authService.setUser(user);
      },
      ({ error }) => {
        this.error = error.message;
      }
    );
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
