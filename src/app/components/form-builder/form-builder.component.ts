import { CommonModule } from '@angular/common';

import {
    ChangeDetectorRef,
    Component,
    HostBinding,
    Input,
} from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

export type FormFieldType =
    | 'NUMERIC'
    | 'CHECKBOX'
    | 'RADIO'
    | 'DROPDOWN'
    | 'STRING'
    | 'MOBILE'
    | 'EMAIL'
    | 'ACCOUNT_NAME'
    | 'ACCOUNT_NUMBER'
    | 'USERNAME'
    | 'DATE';

export interface FormFieldProperties {
    idName: string;
    label: string;
    maxLength: number | null;
    minLength: number | null;
    regex: string;
    inputtype: FormFieldType;
    required: 'Y' | 'N';
    placeHolder: string;
    options?: CommonOption[];
    paramOrder: number | string;
    // eslint-disable-next-line
    paramValue?: any;
    visible: boolean;
    code?: string;
    readonly?: boolean;
    Value?: string;
    maxDate?: Date;
}

export interface CommonOption {
    label: string;
    value: string;
    // eslint-disable-next-line
    data?: any;
}

@Component({
    selector: 'app-form-builder[formGroup]',
    templateUrl: './form-builder.component.html',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        BsDatepickerModule
    ],
})
export class FormBuilderComponent {

  datePickerConfig!: Partial<BsDatepickerConfig>;
    @HostBinding('[attr.hidden]')
    get hiddenAttribute(): string | null {
        return this.props?.visible === false ? '' : null;
    }

    private properties!: FormFieldProperties;
    isReadonly = false;
    disabled = false;

    @Input()
    formGroup!: FormGroup;

    @Input()
    set props(properties: FormFieldProperties) {
        this.properties = properties;
        if (properties && typeof properties.readonly === 'boolean') {
            this.readonly = properties.readonly;
        }

        this.changeDetector.detectChanges();
    }

    get props(): FormFieldProperties {
        return this.properties;
    }

    @Input()
    set isDisabled(isDisabled: boolean) {
        this.disabled = isDisabled;
    }

    @Input()
    set readonly(isReadonly: boolean) {
        this.isReadonly = isReadonly;
    }

    constructor(
        private changeDetector: ChangeDetectorRef,
    ) {}
    get customFormControl() {
        return this.formGroup.get(this.props.paramOrder.toString());
    }

    get minlengthValue() {
        return (
            this.customFormControl?.errors &&
            this.customFormControl?.errors['minlength'].requiredLength
        );
    }

    get maxlengthValue() {
        return (
            this.customFormControl?.errors &&
            this.customFormControl?.errors['maxlength'].requiredLength
        );
    }
}
