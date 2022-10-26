import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'compass-ui-censored',
    templateUrl: './cw-censored.component.html',
    styleUrls: ['./cw-censored.component.scss']
  })
  export class CwCensoredComponent {
    constructor(private fb: FormBuilder) { }

    @Input() textClass: string = '';
    @Input() labelClass: string = '';
    @Input() requiredIndicator!: boolean;
    @Input() pattern: string = '';
    @Input() required: boolean = false;
    @Input() passwordClass: string = '';
    @Input() isHidden: boolean = false;
    @Input() readOnly: boolean = false;
    @Input() disabled: boolean = false;
    @Input() errorText!: string;
    @Input() showFieldHelpText: boolean = true;
    @Input() helpText: string = '';
    @Input() hintClass: string = '';
    @Input() value: string = '';
    @Input() FormGroup: FormGroup | any;
    @Input() simpleTileCheckboxData: any;
    @Input() fieldId: string = '';
    @Input() requiredText: string = '(required)';
    @Input() fieldLabel: string = '';
    @Input() fieldType: string = '';
    @Input() maxLength: number = 9999999;

    showPassword: boolean = false;

  
    @Output() inputModelChange = new EventEmitter<string>();

    @Input() displayError: boolean | undefined;


    ngOnInit(){
        this.FormGroup?.addControl(this.fieldId, new FormControl(''));
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