import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatchPassword } from 'src/app/validators/match-password';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-create-account-home',
  templateUrl: './create-account-home.component.html',
  styleUrls: ['./create-account-home.component.scss'],
})
export class CreateAccountHomeComponent implements OnInit {
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  passwordType = 'password';
  errors: string[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private matchPassword: MatchPassword,
    private authService: AuthService
  ) {}
  ngOnInit(): void {}

  createAccountForm = this.fb.group(
    {
      firstName: ['', [(Validators.required, Validators.maxLength(200))]],
      lastName: ['', [(Validators.required, Validators.maxLength(200))]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}$'
          ),
        ],
      ],

      confirmPassword: ['', [Validators.required]],
    },
    {
      validator: [this.matchPassword.validate],
    }
  );

  onSubmit(): void {
    this.errors = [];
    if (this.createAccountForm.invalid) {
      return;
    }

    this.authService.createAccount(this.createAccountForm.value).subscribe(
      (value) => {
        if (value === 'success') {
          this.router.navigate(['/']);
        }
      },
      ({ error }) => {
        for (const [_, val] of Object.entries(error.errors)) {
          this.errors.push(val as string);
        }
      }
    );
  }

  toggleVisibility(type: string): void {
    this.passwordType = type;
  }

  get firstName() {
    return this.createAccountForm.get('firstName');
  }

  get lastName() {
    return this.createAccountForm.get('lastName');
  }

  get email() {
    return this.createAccountForm.get('email');
  }
  get password() {
    return this.createAccountForm.get('password');
  }

  get confirmPassword() {
    return this.createAccountForm.get('confirmPassword');
  }
}
