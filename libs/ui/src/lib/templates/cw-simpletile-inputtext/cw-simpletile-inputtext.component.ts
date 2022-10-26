import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'cw-simpletile-inputtext',
  templateUrl: './cw-simpletile-inputtext.component.html',
  styleUrls: ['./cw-simpletile-inputtext.component.scss']
})

export class CwSimpleTileInputText implements OnInit {
    @Input() simpleTileInputtextData: any;
    simpleTileInputtextForm: FormBuilder | any;
    inputValue: string = "";

    @Output() nextPage = new EventEmitter<string>();
    @Output() previousPage = new EventEmitter<boolean>();

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.simpleTileInputtextData['maxLength'] === "" ? this.simpleTileInputtextData['maxLength'] = 9999999 : '';
        if (this.simpleTileInputtextData['questionTextRequired'] || this.simpleTileInputtextData['labelRequired']) {
            this.simpleTileInputtextForm = this.fb.group({
                input: ['', [Validators.required, Validators.pattern(this.simpleTileInputtextData['pattern']), Validators.maxLength(this.simpleTileInputtextData['maxLength'])]]
            });
        }
        else {
            this.simpleTileInputtextForm = this.fb.group({
                input: ['', [Validators.pattern(this.simpleTileInputtextData['pattern']), Validators.maxLength(this.simpleTileInputtextData['maxLength'])]]
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
                if (this.simpleTileInputtextForm.get("input").errors?.pattern) {
                    return this.simpleTileInputtextData['patternMessage'];
                } 
                if (this.simpleTileInputtextForm.get("input").errors?.required) {
                     return this.simpleTileInputtextData['requiredMessage'];
                }
                if (this.simpleTileInputtextForm.get("input").errors?.maxlength) {
                    return this.simpleTileInputtextData['maxLengthMessage'] ;
                }
                break;
            default:
                return "";
                break;
        }
        return "";
    }

    isFieldValid(field: string) {
        console.log(this.simpleTileInputtextForm.get(field))
        return (this.simpleTileInputtextForm.get(field).status !== 'VALID' && (this.simpleTileInputtextForm.get(field).dirty || this.simpleTileInputtextForm.get(field).touched))
    }

    inputNext() {
        this.nextPage.emit(this.simpleTileInputtextForm.get('input').value);
    }

    inputBack() {
        this.previousPage.emit();
    }
}