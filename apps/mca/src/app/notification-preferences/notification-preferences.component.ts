import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export function ConfirmEmailValidator(confirmEmailInput: string) {
  let confirmEmailControl: FormControl;
  let emailControl: FormControl;

  return (control: FormControl) => {
    if (!control.parent) {
      return null;
    }

    if (!confirmEmailControl) {
      confirmEmailControl = control;
      emailControl = control.parent.get(confirmEmailInput) as FormControl;
      emailControl.valueChanges.subscribe(() => {
        confirmEmailControl.updateValueAndValidity();
      });
    }

    if (emailControl.value?.toLocaleLowerCase() !==
      confirmEmailControl.value?.toLocaleLowerCase()
    ) {
      return { notMatch: true };
    }

    return null;
  };
}

export function checkboxGroupValidator() {
  return (formGroup: FormGroup) => {
    const checkedKeys = Object.keys(formGroup.controls).filter((key) => formGroup.controls[key].value);

    if (checkedKeys.length === 0) { return { requireCheckboxesToBeChecked: true }; }

    return null;
  };
}

@Component({
  selector: 'compass-ui-notification-preferences',
  templateUrl: './notification-preferences.component.html',
  styleUrls: ['./notification-preferences.component.css']
})
export class NotificationPreferencesComponent implements OnInit {
  languageSelected = "";
  isTextUpdate: boolean = false;
  renewalReminder: boolean = false;
  verifReminder: boolean = false;
  childcareReminder: boolean = false;
  showEmailField: boolean = false;
  receiveTextMessagesSelection: boolean = false;
  receiveEmailsSelection: boolean = false;
  getEmail = "";
  confirm = "";
  notificationPreferencesForm: FormGroup | any;
  termsConditions: boolean = false;


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.notificationPreferencesForm = this.fb.group({
      languagePreference: ['', Validators.required],
      receiveTextMessages: ['', Validators.required],
      reminderChk: this.fb.array([], [Validators.required]),
      phone: ['', [Validators.required, Validators.minLength(10)]],
      receiveEmails: ['', Validators.required],
      email: ['', Validators.email],
      confirmEmail: ["", [Validators.email, ConfirmEmailValidator('email')]],
      terms: ['', Validators.required]
    });


  }

  checkboxChange(e: any) {
    const checkArray: FormArray = this.notificationPreferencesForm.get('reminderChk') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  selectedLanguage(value: any) {
    switch (value) {
      case 'en':
        this.languageSelected = "English";
        break;
      case 'es':
        this.languageSelected = "Spanish";
        break;

      default:
        this.languageSelected = "";
    }
    return "";

  }

  isTextNotifUpdate(update: boolean) {
    this.isTextUpdate = update;
    this.receiveTextMessagesSelection = true;
    if (!update) {
      this.notificationPreferencesForm
        .get("reminderChk")
        .clearValidators();
      this.notificationPreferencesForm
        .get("phone")
        .clearValidators();
    }
    this.isFieldValid('receiveTextMessages');
  }

  onCheckboxChange(value: { checked: any; }) {
    if (value.checked) {
      this.termsConditions = true;
    } else {
      this.termsConditions = false;
    }

  }

  isEmailPreferencesSelected(clicked: boolean) {
    this.showEmailField = clicked;
    this.receiveEmailsSelection = true;
    this.isFieldValid('receiveEmails');
  }

  GetEmail(value: string) {
    this.getEmail = value;
  }

  getConfirmEmail(value: string) {
    this.confirm = value;
  }

  OnlyNumberAllowed(event: { which: any; keyCode: any }): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }


  isFieldValid(field: string): boolean {
    if (field == "receiveTextMessages") {
      if (this.receiveTextMessagesSelection) {
        return false;
      }
    }

    if (field == "reminderChk") {
      if (this.notificationPreferencesForm.controls['reminderChk'].errors?.['required']) {
        return true;
      }
    }

    if (field == "terms") {
      if (this.termsConditions) {
        return false;
      }
    }

    if (field == "receiveEmails") {
      if (this.receiveEmailsSelection) {
        return false;
      }
    }
    return (
      this.notificationPreferencesForm.get(field)?.status !== "VALID" &&
      this.notificationPreferencesForm.get(field)?.touched
    );
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {

        this.validateAllFormFields(control);
      }
    });
  }

  onSubmit() {
    if (this.notificationPreferencesForm.valid) {   
      // TODO:   
    } else {
      this.validateAllFormFields(this.notificationPreferencesForm);
    }
  }
}
