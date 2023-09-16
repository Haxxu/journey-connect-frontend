import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

// Custom validator function
export function allowedValuesValidator(allowedValues: string[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value && allowedValues.indexOf(control.value) === -1) {
      return { invalidVisibility: true };
    }
    return null;
  };
}

export function allowedValuesAsyncValidator(
  allowedValues: string[]
): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> => {
    return new Promise((resolve) => {
      if (control.value && allowedValues.indexOf(control.value) === -1) {
        resolve({ invalidValue: true });
      } else {
        resolve(null);
      }
    });
  };
}
