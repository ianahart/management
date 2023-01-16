import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-reset-password-home',
  templateUrl: './reset-password-home.component.html',
  styleUrls: ['./reset-password-home.component.scss'],
})
export class ResetPasswordHomeComponent implements OnInit {
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  passwordType = 'password';
  userId = 0;
  token = '';
  errors: string[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  resetPasswordForm = this.fb.group({
    password: ['', [Validators.required]],

    confirm_password: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe(({ uid, token }) => {
      this.userId = uid;
      this.token = token;
    });
  }

  passwordVisibility(value: string): void {
    this.passwordType = value;
  }

  onSubmit(): void {
    this.errors = [];
    if (this.resetPasswordForm.invalid) return;
    this.authService
      .resetPassword(this.resetPasswordForm, this.token, this.userId)
      .subscribe(
        (value) => {
          if (value === 'success') {
            this.router.navigate(['/']);
          }
        },
        ({ error }) => {
          for (let [_, val] of Object.entries(error)) {
            const err = val as string[];
            this.errors.push(err[0]);
          }
        }
      );
  }

  get password() {
    return this.resetPasswordForm.get('password');
  }

  get confirm_password() {
    return this.resetPasswordForm.get('confirm_password');
  }
}
