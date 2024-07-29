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
