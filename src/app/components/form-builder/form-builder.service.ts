import { Injectable } from '@angular/core';
import { FormFieldProperties } from './form-builder.component';
import {
    FormControl,
    FormGroup,
    ValidatorFn,
    Validators,
} from '@angular/forms';

export interface FormFieldGroup {
    fields: FormFieldProperties[];
}

@Injectable()
export class FormBuilderService {
    updateForm(fields: FormFieldProperties[], form: FormGroup) {
        fields.forEach(field => {
            const validators: ValidatorFn[] = [];
            const paramOrder = field.paramOrder.toString();

            if (field.regex) {
                validators.push(Validators.pattern(new RegExp(field.regex)));
            }
            if (field.required === 'Y') {
                validators.push(Validators.required);
            }
            if (field.maxLength) {
                validators.push(Validators.maxLength(field.maxLength));
            }
            if (field.minLength) {
                validators.push(Validators.minLength(field.minLength));
            }

            if (form.get(paramOrder)) {
                (form.get(paramOrder) as FormControl).clearValidators();
                (form.get(paramOrder) as FormControl).setValidators(validators);
            } else {
                if (field.inputtype === 'CHECKBOX') {
                    field.options &&
                        field.options.forEach(option => {
                            form.addControl(option.label, new FormControl(''));
                        });
                } else {
                    form.addControl(
                        field.paramOrder.toString(),
                        new FormControl('', { validators })
                    );
                }
            }
            if (
                field.inputtype === 'DROPDOWN' &&
                field.options &&
                field.options.length
            ) {
                (form.get(paramOrder) as FormControl).setValue(
                    field.options[0].value
                );
            }

            if (field.paramValue) {
                (form.get(paramOrder) as FormControl).setValue(
                    field.paramValue
                );
            }
        }, {});
    }
}
