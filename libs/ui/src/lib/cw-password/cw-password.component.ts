import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'compass-ui-password',
    templateUrl: './cw-password.component.html',
    styleUrls: ['./cw-password.component.scss']
  })
  export class CwPasswordComponent {
    constructor(private fb: FormBuilder) { }

    @Input() textClass: string = '';
    @Input() labelClass: string = '';
    @Input() requiredIndicator!: boolean;
    @Input() label: string = '';
    @Input() pattern: string = '';
    @Input() required: boolean = false;
    @Input() passwordClass: string = '';
    @Input() isHidden: boolean = false;
    @Input() readOnly: boolean = false;
    @Input() disabled: boolean = false;
    @Input() errorText!: string;
    @Input() passwordfieldId: string = '';
    @Input() showFieldHelpText: boolean = true;
    @Input() helpText: string = '';
    @Input() hintClass: string = '';
    @Input() passwordValue: string = '';
    @Input() FormGroup: FormGroup | any;
    @Input() simpleTileCheckboxData: any;
    @Input() fieldId: string = '';
    @Input() requiredText: string = '(required)';
    @Input() fieldLabel: string = '';
    @Input() fieldType: string = '';
    @Input() maxLength: number = 9999999;



    formSubmitAttempt: boolean = false;

    showPassword: boolean = false;

  
    @Output() inputModelChange = new EventEmitter<string>();

    minInputLength: number = 8;
    maxInputLength: number = 14;
    validValue: boolean = true;  
    @Input() displayError: boolean | undefined;


    ngOnInit(){
        this.FormGroup?.addControl(this.passwordfieldId, new FormControl(''));
    }
    
 
    textChange(changedEvent: any) {
        if (changedEvent.value) {
            this.inputModelChange.emit(changedEvent.value);
        }
    }

    showHidePassword(){
        this.showPassword = !this.showPassword;
    }
  }