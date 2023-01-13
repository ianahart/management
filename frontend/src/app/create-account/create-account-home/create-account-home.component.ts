import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatchPassword } from 'src/app/validators/match-password';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-create-account-home',
  templateUrl: './create-account-home.component.html',
  styleUrls: ['./create-account-home.component.scss'],
})
export class CreateAccountHomeComponent implements OnInit {
  constructor(private fb: FormBuilder, private matchPassword: MatchPassword) {}
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  passwordType = 'password';
  ngOnInit(): void {}

  createAccountForm = this.fb.group(
    {
      firstName: ['', [Validators.required, Validators.maxLength(75)]],
      lastName: ['', [Validators.required, Validators.maxLength(75)]],
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
    console.log('Form submitted.');
    console.log(this.createAccountForm.invalid);
    console.log(this.createAccountForm.value);
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
