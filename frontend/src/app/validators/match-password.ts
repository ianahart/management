import { Injectable } from '@angular/core';
import {
  Validator,
  AbstractControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class MatchPassword implements Validator {
  validate(formGroup: AbstractControl<any, any>): ValidationErrors | null {
    const { password, confirmPassword } = formGroup.value;

    return password !== confirmPassword ? { passwordDontMatch: true } : null;
  }
}
