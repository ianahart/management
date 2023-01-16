import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password-home',
  templateUrl: './forgot-password-home.component.html',
  styleUrls: ['./forgot-password-home.component.scss'],
})
export class ForgotPasswordHomeComponent implements OnInit {
  serverError = '';
  directionTxt = '';
  isLoading = false;
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {}

  forgotPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  onSubmit() {
    this.serverError = '';
    this.directionTxt = '';
    if (this.forgotPasswordForm.invalid) return;
    if (!this.forgotPasswordForm.value.email) return;
    this.isLoading = true;

    this.authService
      .forgotPassword(this.forgotPasswordForm.value.email)
      .subscribe(
        () => {
          this.isLoading = false;
          this.directionTxt = 'Email has been sent.';
          this.forgotPasswordForm.reset();
        },
        ({ error }) => {
          this.isLoading = false;
          this.serverError = error.message;
        }
      );
  }

  get email() {
    return this.forgotPasswordForm.get('email');
  }
}
