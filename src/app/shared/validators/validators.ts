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
