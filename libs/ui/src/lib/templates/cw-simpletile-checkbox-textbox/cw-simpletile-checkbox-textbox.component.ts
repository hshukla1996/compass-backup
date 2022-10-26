import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { INCOME_CURRENTJOB_EMPLOYERNAME_REQUIRED_PROGRAM } from 'apps/intake/src/app/shared/constants/Individual_Programs_Constants';

@Component({
  selector: 'cw-simpletile-checkbox-textbox',
  templateUrl: './cw-simpletile-checkbox-textbox.component.html',
  styleUrls: ['./cw-simpletile-checkbox-textbox.component.scss']
})

export class CwSimpleTileCheckboxTextBox implements OnInit {

  @Input() simpleTileCheckboxData: any;
  @Input() selectedItems: any;
  @Input() otherNameText: string = '';
  @Input() textBoxHeadingText: string = '';
  simpleTileCheckboxTextBoxForm: FormBuilder | any;
  selectedUserids: number[] = [];
  formSubmitAttempt: boolean = false;
  @Output() nextPage = new EventEmitter<{}>();
  @Output() previousPage = new EventEmitter<boolean>();
  @Input() validators: ValidatorFn[] = [];
  public displayTextbox = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    setTimeout(() => {
      this.selectedUserids = this.selectedItems || [];
    }, 10);
    this.simpleTileCheckboxTextBoxForm = this.fb.group({
      checkbox: this.fb.array([]),
      otherName: [this.otherNameText, this.validators]
    });
  }

  ngOnChanges(): void {
    this.displayTextbox = this.simpleTileCheckboxData['questionAnswers'].findIndex((x: any) => x.isDisplayTextbox && x.isChecked) > -1
  };

  onCheckboxChange(index: number, e: any) {
    const c_index = this.simpleTileCheckboxData['questionAnswers'].findIndex((ans: any) => ans.id == index);
    const data = this.simpleTileCheckboxData['questionAnswers'].find((ans: any) => ans.id == index);
    if (data.isDisplayTextbox) {
      if (e.checked) {
        this.displayTextbox = true;
      }
      else {
        this.displayTextbox = false;
        this.simpleTileCheckboxTextBoxForm.controls['otherName'].value = '';
        this.simpleTileCheckboxTextBoxForm.controls['otherName'].setErrors(null);
      }
    }

    if (e.checked) {
      this.selectedUserids = Object.assign([], this.selectedUserids);
      this.selectedUserids.push(index);
    }
    else {
      this.selectedUserids = this.selectedUserids.filter((id) => id.toString() !== index.toString())
    }

    this.simpleTileCheckboxData['questionAnswers'] = [...this.simpleTileCheckboxData['questionAnswers'].map((item: any, inde: any) => ((inde == c_index) ? { ...item, isChecked: e.checked } : { ...item }))];
  }

  back() {
    this.previousPage.emit();
  }

  next() {
    if (this.simpleTileCheckboxTextBoxForm.valid) {
      this.formSubmitAttempt = true;
      if (this.simpleTileCheckboxData['isRequired'] && this.selectedUserids.length > 0) {
        this.formSubmitAttempt = false;
        this.nextPage.emit({ 'selectedUserId': this.selectedUserids, 'name': this.simpleTileCheckboxTextBoxForm.controls['otherName'].value });
      }

      if (!this.simpleTileCheckboxData['isRequired'] && this.selectedUserids.length >= 0) {
        this.formSubmitAttempt = false;
        this.nextPage.emit({ 'selectedUserId': this.selectedUserids, 'name': this.simpleTileCheckboxTextBoxForm.controls['otherName'].value });
      }
    }
  }

  isFieldValid(field: string): boolean {
    if (this.simpleTileCheckboxTextBoxForm.get(field).status !== "VALID") {
    }
    return (
      this.simpleTileCheckboxTextBoxForm.get(field).status !== "VALID" &&
      this.simpleTileCheckboxTextBoxForm.get(field).touched
    );
  }

  errorMap(field: string) {
    if (!this.isFieldValid(field)) {
      return "";
    }

    switch (field) {
      case "otherName":
        if (
          this.simpleTileCheckboxTextBoxForm.get("otherName")
            .errors.maxlength
        ) {
          return "Name should be less than 26 characters";
        }

        if (
          this.simpleTileCheckboxTextBoxForm.get("otherName")
            .errors.pattern
        ) {
          return "Please enter valid characters in Name field";
        }
        break;
      default:
        return "";
        break;
    }
    return "";
  }
}