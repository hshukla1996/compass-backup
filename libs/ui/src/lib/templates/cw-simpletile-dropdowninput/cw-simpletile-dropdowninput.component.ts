import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApplyNowStoreService } from "../../../../../../apps/intake/src/app/apply-now/apply-now-store-service";

@Component({
  selector: 'cw-simpletile-dropdowninput',
  templateUrl: './cw-simpletile-dropdowninput.component.html',
  styleUrls: ['./cw-simpletile-dropdowninput.component.scss']
})

export class CwSimpleTileDropdownInput implements OnInit {
    @Input() simpleTileDropdownInputData: any;
    simpleTileDropdownInputForm: FormBuilder | any;
    inputValue: any;
    dropdownInputValue: string[] = [];


    @Output() nextPage = new EventEmitter<Array<string>>();
    @Output() previousPage = new EventEmitter<boolean>();

    constructor(
        private fb: FormBuilder,
        private service: ApplyNowStoreService) {}

    ngOnInit(): void {
        this.simpleTileDropdownInputData['maxLength'] === "" ? this.simpleTileDropdownInputData['maxLength'] = 9999999 : '';
        if (this.simpleTileDropdownInputData['questionTextRequired']) {
            this.simpleTileDropdownInputForm = this.fb.group({
                dropdown: ["", Validators.required],
                input: ["", [Validators.required, Validators.pattern(this.simpleTileDropdownInputData['pattern']), Validators.maxLength(this.simpleTileDropdownInputData['maxLength'])]]
            });
        }
        else if (this.simpleTileDropdownInputData['dropDownLabelRequired']) {
             this.simpleTileDropdownInputForm = this.fb.group({
                dropdown: ["", Validators.required],
                input: ["", [Validators.pattern(this.simpleTileDropdownInputData['pattern']), Validators.maxLength(this.simpleTileDropdownInputData['maxLength'])]]
            });
        }
        else if (this.simpleTileDropdownInputData['inputLabelReqired']) {
            this.simpleTileDropdownInputForm = this.fb.group({
                dropdown: "",
                input: ["", [Validators.required, Validators.pattern(this.simpleTileDropdownInputData['pattern']), Validators.maxLength(this.simpleTileDropdownInputData['maxLength'])]]
            });
        }
        else {
            this.simpleTileDropdownInputForm = this.fb.group({
                dropdown: "",
                input: ["", [Validators.pattern(this.simpleTileDropdownInputData['pattern']), Validators.maxLength(this.simpleTileDropdownInputData['maxLength'])]]
            });
        }
    }

    GetValue(value: string) {
        this.inputValue = value;
    }

    OnlyNumberAllowed(event: { which: any; keyCode: any }): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    errorMap(field: string) {
         if (!this.isFieldValid(field)) {
            return "";
        }
        switch (field) {
            case "input":
                if (this.simpleTileDropdownInputForm.get("input").errors?.pattern) {
                    return this.simpleTileDropdownInputData['patternMessage'];
                } 
                if (this.simpleTileDropdownInputForm.get("input").errors?.required) {
                     return this.simpleTileDropdownInputData['inputRequiredMessage'];
                }
                if (this.simpleTileDropdownInputForm.get("input").errors?.maxlength) {
                    return this.simpleTileDropdownInputData['maxLengthMessage'] ;
                }
                break;
            case "dropdown": 
                if (this.simpleTileDropdownInputForm.get("dropdown").errors.required) {
                     return this.simpleTileDropdownInputData['dropdownRequiredMessage'];
                }
                break;
            default:
                return "";
                break;
        }
        return "";
    }

    isFieldValid(field: string) {
       if (field === 'input') {
            return (this.simpleTileDropdownInputForm.get(field).status !== 'VALID' && (this.simpleTileDropdownInputForm.get(field).dirty || this.simpleTileDropdownInputForm.get(field).touched))
        }
        if (field === 'dropdown') {
            return (this.simpleTileDropdownInputForm.get(field).status !== "VALID" && this.simpleTileDropdownInputForm.get(field).touched)
        }
    }

    next() {
        this.service.validateAllFormFields(this.simpleTileDropdownInputForm);
        if (this.simpleTileDropdownInputForm.get('dropdown').value !== '') {
            this.dropdownInputValue.push(this.simpleTileDropdownInputForm.get('dropdown').value);
        }
        if (this.simpleTileDropdownInputForm.get('input').value !== '') {
            this.dropdownInputValue.push(this.simpleTileDropdownInputForm.get('input').value);
        }
        if (this.dropdownInputValue.length > 0) {
            this.nextPage.emit(this.dropdownInputValue);
        }
    }

    back() {
        this.previousPage.emit();
    }
}