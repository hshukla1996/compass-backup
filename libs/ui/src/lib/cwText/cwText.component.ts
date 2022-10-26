import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, ValidatorFn, ValidationErrors, AbstractControl, Validators } from '@angular/forms';


@Component({
  selector: 'compass-ui-text',
  templateUrl: './cwText.component.html',
  styleUrls: ['./cwText.component.scss']
})


export class CWTextComponent {
  @Input() FormGroup: FormGroup | any;

  @Input() fieldType: string = '';
  @Input() fieldLabel: string = '';

  @Input() fieldId: string = '';

  @Input() requiredIndicator: boolean = false;

  @Input() fieldHelpText: string = '';

  @Input() fieldTitle: string | undefined;

  @Input() errorText: string = '';

  @Input() requiredText: string = '(required)';

  @Input() placeHolderText: string = '';
  @Input() isVisible:boolean = true;
  validValue: boolean = true;

  @Input() errorMsg: string | undefined;

  @Input() displayError: boolean | undefined;

  @Input() maxLength: number = 9999999;

  @Input() minLength: number = 0;

  @Input() type = "text";

  @Input() isReadOnly: boolean = false;

  @Input() rows: string = '';
  @Input() isBackSlashAllowed: boolean = false;
  @Output() inputModelChange = new EventEmitter<string>();
  @Output() setValidator = new EventEmitter<boolean>();

  restrictInputLength: string = '';

  minInputLength: string = '';
  @Input() phoneNumber: boolean = false;

  constructor() {

  }

  ngOnInit() {
    this.restrictInputLength = this.maxLength.toString();
    this.minInputLength = this.minLength.toString();
    if (this.type == "ssn") {
      this.FormGroup?.get(this.fieldId).addValidators(this.ssnValidator())
    }
    else this.FormGroup?.addControl(this.fieldId, new FormControl(''));

  }

  previousValue: string = ''
  textChange(event: any) {
    let changedEvent = event.target
    if (!!changedEvent.value) {
      let valid = this.handleAutofill(event, this.previousValue)
      if (!valid) return false
      this.inputModelChange.emit(changedEvent.value);
      this.previousValue = changedEvent.value;
      return true
    }
    else if (changedEvent.value === '') this.previousValue = changedEvent.value
    return false
  }

  private handleAutofill(event: any, previousValue: string): boolean {
    let valid;
      switch(this.type) {
        case "currency": {
          valid = this.pasteRestrictCurrency({target: event.target, value: event.target.value})
          break;
        }
        case "currentFormat": {
          valid = this.pasteRestrictCurrencyFormat({target: event.target, value: event.target.value})
          break;
        }
        default: {
          valid = this.checkPaste({target: event.target,value: event.target.value})
          break;
        }
      }

      if (!valid) {
        event.target.value = previousValue
      }

      return valid
  }

  ssnValidator() : ValidatorFn {
    return this.checkSSN.bind(this)
  }

  checkSSN(ssn: AbstractControl): ValidationErrors | null {
    let isError = false
    let txt = ""
    if (ssn.value && ssn.value[0] === '9') {
      isError = ssn.value[0] === '9' ? true : false;
      txt = ssn.value[0] === '9' ? 'SSN can’t start with a 9' : '';
    }
    else if (ssn.value && ssn.value[0] === '0' && ssn.value[1] === '0' && ssn.value[2] === '0') {
      isError = ssn.value[0] === '0' && ssn.value[1] === '0' && ssn.value[2] === '0' ? true : false;
      txt = ssn.value[0] === '0' && ssn.value[1] === '0' && ssn.value[2] === '0' ? 'SSN can’t start with 000' : '';
    }
    else if (ssn.value && ssn.value[0] === '6' && ssn.value[1] === '6' && ssn.value[2] === '6') {
      isError = ssn.value[0] === '6' && ssn.value[1] === '6' && ssn.value[2] === '6' ? true : false;
      txt = ssn.value[0] === '6' && ssn.value[1] === '6' && ssn.value[2] === '6' ? 'SSN can’t have first 3 digits of 666' : '';
    }
    else if (ssn.value && ssn.value[4] === '0' && ssn.value[5] === '0') {
      isError = ssn.value[4] === '0' && ssn.value[5] === '0' ? true : false;
      txt = ssn.value[4] === '0' && ssn.value[5] === '0' ? 'SSN can’t have 4th and 5th digits as zeroes' : '';
    }
    else if (ssn.value &&ssn.value[7] === '0' && ssn.value[8] === '0' && ssn.value[9] === '0' && ssn.value[10] === '0') {
      isError = ssn.value[7] === '0' && ssn.value[8] === '0' && ssn.value[9] === '0' && ssn.value[10] === '0' ? true : false;
      txt = ssn.value[7] === '0' && ssn.value[8] === '0' && ssn.value[9] === '0' && ssn.value[10] === '0' ? 'SSN can’t have last 4 digits as zeroes' : '';
    }
    else if (ssn.value && ssn.value[0] === '0' && ssn.value[1] === '7' && ssn.value[2] === '8' &&
            ssn.value[4] === '0' && ssn.value[5] === '5' && ssn.value[7] === '1' &&
            ssn.value[8] === '1' && ssn.value[9] === '2' && ssn.value[10] === '0') {
              isError = ssn.value[0] === '0' && ssn.value[1] === '7' && ssn.value[2] === '8' &&
                                ssn.value[4] === '0' && ssn.value[5] === '5' && ssn.value[7] === '1' &&
                                ssn.value[8] === '1' && ssn.value[9] === '2' && ssn.value[10] === '0' ? true : false;
              txt = ssn.value[0] === '0' && ssn.value[1] === '7' && ssn.value[2] === '8' &&
                             ssn.value[4] === '0' && ssn.value[5] === '5' && ssn.value[7] === '1' &&
                             ssn.value[8] === '1' && ssn.value[9] === '2' && ssn.value[10] === '0' ? 'SSN can’t be 078051120' : '';
    }
    else if (ssn.value && ssn.value.replaceAll(/[^0-9]/g, '').length === 0) {
      let hasRequired = ssn.hasValidator(Validators.required) && ssn.touched
      isError = (hasRequired) ? true: false;
      txt = (hasRequired) ? 'This field is required' : '';
    }
    else if (ssn.value && ssn.value.replaceAll(/[^0-9]/g, '').length < 9) {
      isError = true;
      txt = 'SSN must be 9 characters in length';
    }
    else {
      isError = false;
      txt = '';
    }
    this.displayError = isError
    this.errorText = txt
    this.setValidator.emit(this.displayError);
    return (isError) ? { ssnError: txt} : null
  }

  public checkPaste(paste: any) {
    if (!!paste.clipboardData || !!paste.value) {
      let pasteInput: string = paste.clipboardData?.getData('text/plain') ?? paste.value
      let valid = true
      Array.from(pasteInput).forEach(c => {
        valid = valid && this.omit_special_char({
          keyCode: c.charCodeAt(0),
          charCode: c.charCodeAt(0), 
          target: paste.target
        })
      })
      return valid
    }
    return false
  }

  public omit_special_char(event: any) {
    if (this.fieldType === 'numberType') {
      var k;
      k = event.charCode;
      const value = event.target.value;
      const startIndex = event.target.selectionStart

      return (k > 47 && k < 58);
    }
    else if (this.fieldType === 'alphaOnly') {
      var inp = String.fromCharCode(event.keyCode);
      if (/[a-zA-Z]/.test(inp)) {
        return true;
      }
      else {
        return false;
      }
    }
   else if (this.fieldType === 'documentIdType') {
      var inp = String.fromCharCode(event.keyCode);
      if (/[a-zA-Z0-9]/.test(inp)) {
        return true;
      }
      else {
        return false;
      }
    }
    else   if (this.fieldType === 'nameType') {
      var k;
      k = event.charCode;
      const value = event.target.value;
      const startIndex = event.target.selectionStart


      return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 45 || k == 39 || k == 32 || k == 92);
    }
    else   if (this.fieldType === 'absentNameType') {
      var k;
      k = event.charCode;
      return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 45 || k == 39 || k == 32 || k == 92 || k == 46);
    }
    else if (this.fieldType === 'absentEmployerNameType') {
      var charCode;
      charCode = event.charCode;
      return (
        (charCode > 47 && charCode < 58) ||
        (charCode > 64 && charCode < 91) ||
        (charCode > 96 && charCode < 123) ||
        charCode == 39 ||
        charCode == 40 ||
        charCode == 41 ||
        charCode == 45 ||
        charCode == 44 ||
        charCode == 92
    );
    }
    else if (this.fieldType === 'referralsaddressType') {
      var k;
      k = event.charCode;
      const value = event.target.value;
      const startIndex = event.target.selectionStart


      return ((k > 64 && k < 91) || (k > 96 && k < 123) || (k > 47 && k < 58) || k == 46 || k == 35 || k == 41 || k == 40 || k == 38 || k == 64 || k == 39 || k == 92 || k == 45 || k== 32);
    }
    else if (this.fieldType === 'cityType') {
      var k;
      k = event.charCode;
      const value = event.target.value;
      const startIndex = event.target.selectionStart
      return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 39 || k == 92 || k == 45);
    }
    else if (this.fieldType === 'middleIType') {
      var k;
      k = event.charCode;
      const value = event.target.value;
      const startIndex = event.target.selectionStart
      return ((k > 64 && k < 91) || (k > 96 && k < 123));
    }
    else if (this.fieldType === 'securityQueType') {
      var k;
      k = event.charCode;
      const value = event.target.value;
      const startIndex = event.target.selectionStart
      return ((k > 64 && k < 91) || (k > 96 && k < 123) || (k > 47 && k < 58) || k == 32);
    }

    else if (this.fieldType === "addressType") {
      var v;
      v = event.charCode;
      const value = event.target.value;
      const startIndex = event.target.selectionStart;

      return ((v > 64 && v < 91) || (v > 96 && v < 123) || (v > 47 && v < 58) || v == 44 || v == 32);
    }
    else if (this.fieldType === "emailType") {
      var v;
      v = event.charCode;
      const value = event.target.value;
      const startIndex = event.target.selectionStart;

      return ((v > 63 && v < 91) || (v > 96 && v < 123) || (v > 47 && v < 58) || v == 46 || v == 45 || v == 95);
    }
    else if (this.fieldType === "payType") {
      var v;
      v = event.charCode;
      const value = event.target.value;
      const startIndex = event.target.selectionStart;

      return ((v > 47 && v < 58) || v == 46 || v == 92);
    }
    else if (this.fieldType === "streetType") {
        const v = event.charCode;
        const inp = String.fromCharCode(v);
        return /[#/0-9a-zA-Z\s,-]/.test(inp);
    } 
    else if (this.fieldType === "prevStreetType") {
      var charCode;
      charCode = event.charCode;
      const value = event.target.value;
      const startIndex = event.target.selectionStart;
      return ((charCode > 47 && charCode < 58) || (charCode > 64 && charCode < 91)
                || (charCode > 96 && charCode < 123) || charCode == 35
                || charCode == 47 || charCode == 45 || charCode == 32)
    }
    else if (this.fieldType === "countyHType") {
        var v;
        v = event.charCode;
        const value = event.target.value;
        const startIndex = event.target.selectionStart;

        return (v > 64 && v < 91) || (v > 96 && v < 123) || v == 92 || v == 45 || v == 39;
    } 
    else if (this.fieldType === "countyType") {
        var v;
        v = event.charCode;
        const value = event.target.value;
        const startIndex = event.target.selectionStart;

      return ((v > 64 && v < 91) || (v > 96 && v < 123) || v == 39);
    }
    else if(this.fieldType === "numbersOnly"){
      let inp = String.fromCharCode(event.keyCode);
      return /[0-9]/.test(inp)
    }
    else if(this.fieldType === "eformNumber"){
      let inp = String.fromCharCode(event.keyCode);
      return /[0-9RrWw]/.test(inp)
    }
    else if (this.fieldType === "alphaNumbOnly"){
       var inp = String.fromCharCode(event.keyCode);

        return /[A-Za-z0-9]/.test(inp);
    } else if (this.fieldType === "nameParts") {
        var v;
        v = event.charCode;
        var inp = String.fromCharCode(v);

        return /[\\'a-zA-Z-]/.test(inp);
    } else if (this.fieldType === "zipCode") {
        var v;
        v = event.charCode;
        var inp = String.fromCharCode(v);

        return /\d/.test(inp);
    } else if (this.fieldType === "orgType") {
        var inp = String.fromCharCode(event.keyCode);
        return /[\\'0-9a-zA-Z\s-]/.test(inp);
    } else if (this.fieldType === "schoolType") {
        var inp = String.fromCharCode(event.keyCode);
        return /[\\'a-zA-Z\s-]/.test(inp);
    } else if (this.fieldType === "payType") {
        var inp = String.fromCharCode(event.keyCode);
        return /[\\0-9\-]/.test(inp);
    }
    return true
  }

  public pasteRestrictCurrency(paste: any) {
    if (!!paste.clipboardData || !!paste.value) {
      let pasteInput: string = paste.clipboardData?.getData('text/plain') ?? paste.value
      let valid = true
      Array.from(pasteInput).forEach(c => {
        valid = valid && this.restrictCurrency({
          keyCode: c.charCodeAt(0),
          which: c.charCodeAt(0),
          preventDefault: paste.preventDefault
        })
      })
      return valid
    }
    return false
  }
  public restrictCurrency(e: any) {
    var charCode = (e.which) ? e.which : e.keyCode;

    if (charCode != 46 && charCode > 31

      && (charCode < 48 || charCode > 57)) {

      e.preventDefault();

      return false;

    }

    return true;

  }

  public pasteRestrictCurrencyFormat(paste: any) {
    if (!!paste.clipboardData || !!paste.value) {
      let pasteInput: string = paste.clipboardData?.getData('text/plain') ?? paste.value
      let valid = true
      Array.from(pasteInput).forEach(c => {
        valid = valid && this.restrictCurrencyFormat({
          keyCode: c.charCodeAt(0),
          which: c.charCodeAt(0),
          target: paste.target,
          preventDefault: paste.preventDefault
        })
      })
      return valid
    }
    return false
  }
  restrictCurrencyFormat(e: any) {
    const value = e.target.value;
    if (e.keyCode == 92 && value.indexOf("\\") > -1 && this.isBackSlashAllowed) return false;
    if (e.keyCode == 92 && value.indexOf("\\") == -1 && this.isBackSlashAllowed) return true;
    const isValidNumber = this.restrictCurrency(e);
    if (!isValidNumber) return false;
    const startIndex = e.target.selectionStart;
    const selectionEnd = e.target.selectionEnd;


    if (e.keyCode == 46 && value.indexOf('.') == -1){
      e.target.value=(value=='')?value+'0':value;
      return true
    }
    if (e.keyCode == 46 && value.indexOf('.') > -1) {
      if (startIndex != selectionEnd) {
        e.target.value = "0";
      }
      else return false;
    };

    if (value != '' && value != undefined) {
      const index = value.indexOf('.')
      if (index > -1) {
        const str = value.substring(index + 1, value.length);
        const prevStr = value.substring(0, index);

        if (startIndex != selectionEnd) {
          return true;
        }
        if (startIndex != null && startIndex <= index) {

          if (prevStr.length >= this.maxLength) {
            return false;
          }

        }
        if (str.length >= 2 && selectionEnd == startIndex && startIndex > index) {
          return false;
        }
      }
      else {
        if (startIndex != selectionEnd) return true;
        else if (value.length >= this.maxLength) return false
      }

    }

    return true;

  }
  //This function add 2 zero after decimal point if user dont enter value after decimal point.
  //Remove extra zeros if user enter amout start with 0 (For e.g. 0000000 to 0)
  changeValue(e: any) {

    const value = e.target.value;
    if (value != '' && value != undefined && value.length > 0) {
      const index = value.indexOf('.')
      if (index > -1) {
        const str = value.substring(index + 1);
        const prevStr = value.substring(0, index);
        switch (str.length) {
          case 0:
            this.FormGroup.controls[this.fieldId].setValue(prevStr + '.00')

            break;
          case 1:
            this.FormGroup.controls[this.fieldId].setValue(prevStr + "." + str + '0')

            break;
        }


      }
      else {

        if (value.length > 0) {
          const isFirstZero = value[0] === '0';
          if (isFirstZero) this.FormGroup.controls[this.fieldId].setValue('0')
        }
      }
    }

    e.preventDefault()
  }
  ngOnDestroy(){
    this.FormGroup.controls[this.fieldId].clearValidators();
    this.FormGroup.controls[this.fieldId].updateValueAndValidity();
  }
}

