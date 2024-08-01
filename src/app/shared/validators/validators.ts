import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function urlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const url = control.value as string;
    if (url && !url.startsWith('https://')) {
      return { invalidUrl: true };
    }
    return { invalidUrl: false };
  };
}

export function passwordValidator(password1: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password2 = control.value as string;
    if (password2 && !(password1 === password2)) {
      return { invalid: true };
    }
    return null;
  };
}

// Source: https://blog.bitsrc.io/implementing-confirm-password-validation-in-angular-with-custom-validators-6acd01cb0288
export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  return control.value.password1 === control.value.password2
    ? null
    : { PasswordNoMatch: true };
};
