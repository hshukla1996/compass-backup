import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'compass-ui-cw-textbox',
  templateUrl: './cw-textbox.component.html',
  styleUrls: ['./cw-textbox.component.scss']
})
export class CwTextboxComponent {
    @Input() FormGroup: FormGroup | any;
    @Input() fieldName!: string;
    @Input() requiredIndicator!: boolean;
    @Input() errorText!: string;

    @Input() fieldId: string = '';
    @Input() textClass: string = '';
    @Input() textBoxClass: string = '';
    @Input() requiredText: string = '';
    @Input() pattern: string = '';
    @Input() label: string = '';
    @Input() text: any = '';
    @Input() textValue: string = '';
    @Input() disabled: boolean = false;
    @Input() maxLength: number = 0;
    @Input() minLength: number = 0;
    @Input() labelClass: string = '';
    @Input() hintClass: string = '';
    @Input() required: boolean = false;
    @Input() readOnly: boolean = false;
    @Input() isHidden: boolean = false;
    @Input() helpText: string = '';
    @Input() placeholder: string = '';
    @Input() showFieldHelpText: boolean = true;
    @Input() showError = false;
    @Input() formControlName!: string;
    @Output() inputModelChange = new EventEmitter<string>();
    restrictInputLength: string = '';
    minInputLength: string = '';
    validValue: boolean = true;

    ngOnInit() {
        this.restrictInputLength = this.maxLength.toString();
        this.minInputLength = this.minLength.toString();
        // this.FormGroup.addControl(this.fieldName, new FormControl(''))
    }

    textChange(changedEvent: any) {
        if (changedEvent.value) {
            this.inputModelChange.emit(changedEvent.value);
        }
    }
    changeInput() {
        this.validValue = (this.FormGroup.controls[this.fieldName].value != '') ? true : false;
    }
}