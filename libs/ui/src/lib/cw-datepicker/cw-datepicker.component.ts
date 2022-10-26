import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnChanges, Output, QueryList, SimpleChanges, ViewChild, ViewChildren, } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { Utility } from 'apps/intake/src/app/shared/utilities/Utility';
import { getDate } from 'date-fns';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Component({
    selector: "compass-ui-cw-datepicker",
    templateUrl: "./cw-datepicker.component.html",
    styleUrls: ["./cw-datepicker.component.scss"],
})
export class CwDatepickerComponent implements AfterViewInit {
    @Input() fieldId: string = "";
    @Input() public textStyle: string = "";
    @Input() public labelClass: string = "";
    @Input() public datepickerClass: string = "";
    @Input() public requiredText: string = "";
    @Input() public hintClass: string = "";
    @Input() fieldTitle: string | undefined;
    @Input() label: string = "";
    @Input() disabled: boolean = false;
    @Input() showFieldHelpText: string = "";
    @Input() required: boolean = false;
    @Input() isVisible: boolean = true;
    @Input() isHidden: boolean = false;
    @Input() public helpText: string = "";
    @Input() public datepickerFormat: string = "";
    @Input() placeholder: string = "";
    @Input() minRange = "1000-01-01";
    @Input() maxRange = "9999-01-01";
    @Input() showError = false;
    @Input() formControlName!: string;
    @Input() errorMsg: string | undefined;
    @Input() displayError: boolean | undefined;
    @Output() inputModelChange = new EventEmitter<string>();
    control!: FormControl;
    dateFormGroup!: FormGroup;
    DATE_FORMAT_US = /^(\d{2})\/(\d{2})\/(\d{4})$/; // visual date format, mm/dd/yyyy

    @ViewChild('compassTextInput') compassTextInput!: HTMLInputElement;
    @ViewChild('duet_date_picker') picker!: any;

    onSearchChange(changedEvent: any) {
       this.compassTextInput.value = changedEvent.value;
        if (changedEvent.value) {
            this.inputModelChange.emit(changedEvent.value);
        }
    }

    constructor(private controlContainer: ControlContainer, private cd: ChangeDetectorRef) {}

    ngOnInit() { // ngOnInit, called when page loads
      this.requiredText="(required)"
      
      if (this.controlContainer && this.formControlName) { // get control
          this.control = this.controlContainer.control!.get(
              this.formControlName
          ) as FormControl;
          this.dateFormGroup = this.control.parent as FormGroup; // get formgroup
      }
      this.control.addValidators(Utility.isValidDate()); // add duet validator
    }

    triggerCall = true
    setMaxLength = () => { // TODO this is running infinitely, figure out how to stop
      if (this.triggerCall && this.picker && this.picker.children[0]) {
        this.triggerCall = false
        let inputElement: HTMLInputElement = this.picker!.children[0].children[0].children[0]
        inputElement.setAttribute("maxlength", "10")
        let value = this.control.value
        if (!value) return
        else if (value.match(Utility.DATE_FORMAT_DASH)) {
          value = Utility.formatDate(value)
          inputElement.value = value
          this.compassTextInput.value = value
        }
        else {
          inputElement.value = value
          this.compassTextInput.value = value
        }
      }
    }

    ngAfterViewInit(): void { // ngAfterViewInit, called after elements are rendered
      this.picker = this.picker.nativeElement; // get picker element from document
      let control = this.control; // local copy of formControl, needed in duet event listeneres
      let cd = this.cd
      let compassValue = this.compassTextInput; // local constant tied to compassTextInput, used in picker parse() and format()
      this.picker!.dateAdapter = { // adapter, used to setup behavior of picker
        parse(value = "", createDate: any) { // triggers whenever the input changes
          control.markAsTouched();
          cd.markForCheck()
          compassValue.value = value
          const matches = value.match(this.DATE_FORMAT_US);
          if (matches && matches[0].length == 10 && this.isValidDate(parseInt(matches[3]), parseInt(matches[1]) - 1, parseInt(matches[2]))) {
            return createDate(matches[3], matches[1], matches[2])
          }
          return;
        },
        format(date: any) { // triggers whenever the input is complete, or if the user goes directly from the input field to the modal
          if (compassValue.value != undefined) { // check if compassValue is available
            if (compassValue.value.length < 10) { // if compassValue is partial, return partial
              return compassValue.value
            }
            else if (compassValue.value.match(this.DATE_FORMAT_US)) { // if compassValue matches mm/dd/yyyy format, parse and check against date parameter
              let year = parseInt(compassValue.value.substring(6, 10));
              let month = parseInt(compassValue.value.substring(0, 2));
              let day = parseInt(compassValue.value.substring(3, 5));
              let compassValueDateFormat = new Date(year, month-1, day)
              if (compassValue.value !== compassValueDateFormat.toLocaleDateString()) { // if date parameter does not equal compassValue, then ignore date parameter
                return `${month < 10 ? '0' + (month) : (month)}/${day < 10 ? '0' + day : day}/${year}`
              }
            }
            else { // otherwise compassValue matches duet format yyyy-mm-dd
              let year = parseInt(control.value.substring(0, 4));
              let month = parseInt(control.value.substring(5, 7));
              let day = parseInt(control.value.substring(8, 10));
              let compassValueDateFormat = new Date(year, month-1, day)
              if (compassValue.value !== compassValueDateFormat.toLocaleDateString()) { // if date parameter does not equal compassValue, then ignore date parameter
                return `${month < 10 ? '0' + (month) : (month)}/${day < 10 ? '0' + day : day}/${year}`
              }
            }
          }
          // otherwise, compassValue.value is undefined and must be set. This runs when no data is populated and if the user selects date from modal
          compassValue.value = `${date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}/${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}/${date.getFullYear()}`
          return compassValue.value
        },
      }

      this.picker!.addEventListener("duetChange", (event: any) => { // trigger on modal select change
        this.compassTextInput.value = Utility.formatDate(event.detail.value); // update compassTextInput.value
        control.patchValue(event.detail.value); // patch new value to control
        this.cd.markForCheck()
      });

      let valueSub = this.control.valueChanges.subscribe(change => { // triggers if patchValue is called by parent component
        if (change === undefined || change === null) {
          this.compassTextInput.value = "";
          valueSub.unsubscribe() // stop valueChanges subscription
        }
        if (this.compassTextInput.value == undefined && change.length == 10) { // if field is empty and input is complete (patch by parent only)
          this.compassTextInput.value = Utility.formatDate(change) // update compassTextInput.value
          valueSub.unsubscribe() // stop valueChanges subscription
        }
      })

      let blurOccurredFlag = false
      this.picker!.addEventListener("duetBlur", (event: any) => { // triggers on input field blur
        this.control.markAsTouched() // mark field as touched
        this.cd.markForCheck()
        blurOccurredFlag = true // set blur flag to true
      })
      
      this.picker!.addEventListener("change", (event: any) => { // triggers on select change and input leave after change
        if (this.compassTextInput.value == undefined) { // handles if attribute is initial empty, triggers only if no patchValue on parent and on select change
          this.compassTextInput.value = "" // 
          valueSub.unsubscribe()
          if (!blurOccurredFlag) control.reset("")
          else {
            control.patchValue("")
            this.cd.markForCheck()
          }
        }
        else if (this.compassTextInput.value.length === 10) { // handles when date is valid, prevents error message from appearing on select change
          let year = parseInt(compassValue.value.substring(6, 10));
          let month = parseInt(compassValue.value.substring(0, 2));
          let day = parseInt(compassValue.value.substring(3, 5));
          let d = new Date(year, month-1, day)
          if (d.getFullYear() == year && d.getMonth() == month - 1 && d.getDate() == day) {
            control.patchValue(Utility.duetFormatDate(this.compassTextInput.value));
          }
          else {
            control.patchValue(compassValue.value, {emitEvent: false, emitModelToViewChange: false})
          }
          this.cd.markForCheck()
        }
        else if (this.compassTextInput.value.length === 0) { // handles when date is empty, prevents invalidDate error message so that required message can appear if needed, called on select change
          if (!blurOccurredFlag) control.reset("") // if field has not been touched before, reset
          else {
            control.patchValue("") // otherwise, only patch value as empty
            this.cd.markForCheck()
          }
        }
        else {
          control.patchValue(compassValue.value, {emitEvent: false, emitModelToViewChange: false})
        }
      });

      this.picker!.localization = { // localization settings
        buttonLabel: this.label,
        placeholder: "mm/dd/yyyy",
        selectedDateMessage: "Selected date is",
        prevMonthLabel: "Previous month",
        nextMonthLabel: "Next month",
        monthSelectLabel: "Month",
        yearSelectLabel: "Year",
        closeLabel: "Close window",
        calendarHeading: this.label,
        dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        locale: "en-US",
      }
      this.picker?.setAttribute('min', this.minRange); // set minimum date
      this.picker?.setAttribute('max', this.maxRange); // set maximum date
    }

    isValidDate(year: any, month: any, day: any) { // valid date used by parser, may be unnecessary
      var d = new Date(year, month, day);
      if (d.getFullYear() == year && d.getMonth() == month && d.getDate() == day) {
          return true;
      }
      return false;
  }

    ngOnDestroy(){ // leave page, release memory
      this.control.clearValidators();
      this.control.updateValueAndValidity();
    }
}
