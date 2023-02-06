import { FormGroup, ValidatorFn } from '@angular/forms'

export class NumberValidator {
    public static valueLessThan(controlName: string, controlNameLess: string): ValidatorFn {
        return function (group: FormGroup): {
            [key: string]: any | null;
        } {
            let control = group.controls[controlName];
            let controlLess = group.controls[controlNameLess];

            if (!control.value || !controlLess.value) {
                return;
            }
            controlLess.setErrors(null)
            if (control.value <= controlLess.value) {
                controlLess.setErrors({ max: true });
            }
            return null
        }
    }
}

