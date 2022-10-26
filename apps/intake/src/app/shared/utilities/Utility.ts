import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import { MenuData } from "@compass-ui/data";
import { differenceInYears, format } from "date-fns";


import { IHouseHold } from "../../apply-now/household/household-model";
import { REQUIREDOPTIONALCONTSTANTS } from "../constants/Individual_Programs_Constants";
export class Utility {
    static DATE_FORMAT_US = /^(\d{2})\/(\d{2})\/(\d{4})$/
    static DATE_FORMAT_DASH = /^(\d{4})-(\d{2})-(\d{2})$/

    /**
     * This will calculate the age from date of birth using date-fns library.
     * @param dateOfBirth
     * @returns
     */
    public static getAge(dateOfBirth: string | undefined): number {
        return differenceInYears(
            new Date(),
            new Date(dateOfBirth as unknown as Date)
        );
    }

    /**
     * This will return the gender code based on text
     * @param genderText
     * @returns
     */
    public static getGenderCode(genderText: string): string {
        switch (genderText) {
            case "Female":
            case "F":
                return "F";
            case "Male":
            case "M":
                return "M";
            default:
                return "";
        }
    }

    /**
     * This will return the Date in particular format
     * @param date
     * @param dateFormat
     * @returns
     */
    public static getDateInFormat(date: Date, dateFormat: string): string {
        return date ? format(date, dateFormat) : "";
    }

    /**
     * This will return the Label text shown in cards
     * @param person
     * @returns
     */
    public static getLabelText(person: IHouseHold): string {
        return `${person.firstName as string} ${
            person.midName ? (person.midName as string) : ""
        } ${person.lastName as string}
            ${person.suffix ? (person.suffix as string) : ""} ${Utility.getAge(
            person.dateOfBirth
        )}`;
    }
    public static getDisabledMenuForNav(menu: MenuData): MenuData {
        //  const oldMenu = this.menuData.menuItems;
        let newMenuItems = menu.menuItems.map((i, index) => {
            const newMenuItem = { ...i };
            const newClass = "pe-none text-info completed";
            newMenuItem.link = "";
            newMenuItem.status = "completed";
            newMenuItem.class = newClass;
            return newMenuItem;
        });

        return { ...menu, menuItems: newMenuItems };
    }
    public static capitalize = (s: string) =>
        (s && s[0].toUpperCase() + s.slice(1)) || "";
    private static clearValidator(formGroup: any, fields: any[]) {
        fields.forEach((item: any) => {
            formGroup.get(item).removeValidators(Validators.required);
        });
        return formGroup;
    }
  public static ConfirmEmailValidator(confirmEmailInput: string) {
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

    public static maxAmountValidator(maxAmount: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (control.value) {
                const check = parseInt(control.value);
                return check > maxAmount ? { invalidAmount: true } : null;
            }
            return null;
        };
    }
    public static isValidDate(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (control.value === undefined || control.value === null) return null;
            if (control.value.length === 0) return null;
            if (control.value.length < 10) return { duetInvalidDate: true };
            if (control.value.match(/^(\d{4})-(\d{2})-(\d{2})$/)) {
                let year = control.value.substring(0, 4);
                let month = control.value.substring(5, 7);
                let day = control.value.substring(8, 10);
                var d = new Date(year, (month-1), day);
                if (d.getFullYear() == year && d.getMonth() == month - 1 && d.getDate() == day) {
                    return null;
                }
                return { duetInvalidDate: true }
            }
            else {
                const DATE_FORMAT_US = /^(\d{2})\/(\d{2})\/(\d{4})$/;
                if (!control.value.match(DATE_FORMAT_US)) return { duetInvalidDate: true }
                let year = parseInt(control.value.substring(6, 10));
                let month = parseInt(control.value.substring(0, 2));
                let day = parseInt(control.value.substring(3, 5));
                var d = new Date(year, (month-1), day);
                if (d.getFullYear() == year && d.getMonth() == month - 1 && d.getDate() == day) {
                    return null;
                }
                return { duetInvalidDate: true }
            }
            return null;
        };
    }
    public static dateStartValidator(start: any): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (control.value && (control.value.match(Utility.DATE_FORMAT_US) || control.value.match(Utility.DATE_FORMAT_DASH))) {
                const check = control.value.replaceAll("-", "/");
                const date = new Date(check);
                const endday = new Date(start);
                endday.setHours(0, 0, 0, 0);
                date.setHours(0, 0, 0, 0);
                const dateTense =
                    date < endday
                        ? "previous"
                        : date < endday
                        ? "past"
                        : "present";
                return dateTense === "previous" ? { invalidDate: true } : null;
            }
            return null;
        };
    }
    public static dateEndValidator(endDate: any): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (control.value && (control.value.match(Utility.DATE_FORMAT_US) || control.value.match(Utility.DATE_FORMAT_DASH))) {
                const check = control.value.replaceAll("-", "/");
                const date = new Date(check);
                const endday = new Date(endDate);
                endday.setHours(0, 0, 0, 0);
                date.setHours(0, 0, 0, 0);
                const dateTense =
                    date > endday
                        ? "future"
                        : date < endDate
                        ? "past"
                        : "present";
                return dateTense === "future" ? { invalidDate: true } : null;
            }
            return null;
        };
    }
    public static ssnValidator():ValidatorFn{

      return (control: AbstractControl): ValidationErrors | null => {
        if (control.value) {
          const check = control.value;
          return check !== '078051120' && check.test( /^(?!(000|666|9))(\d{3}-?(?!(00))\d{2}-?(?!(0000))\d{4,})$/) ? null : { invalidSSN: true };
        }
        return null;
      };
    }
    public static dateMaxValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (control.value && (control.value.match(Utility.DATE_FORMAT_US) || control.value.match(Utility.DATE_FORMAT_DASH))) {
                const check = control.value.replaceAll("-", "/");
                const date = new Date(check);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                date.setHours(0, 0, 0, 0);
                const dateTense =
                    date > today ? "future" : date < today ? "past" : "present";
                return dateTense === "future" ? { invalidDate: true } : null;
            }
            return null;
        };
    }
    public static dateMinValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (control.value && (control.value.match(Utility.DATE_FORMAT_US) || control.value.match(Utility.DATE_FORMAT_DASH))) {
                const check = control.value.replaceAll("-", "/");
                const date = new Date(check);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                date.setHours(0, 0, 0, 0);
                const dateTense =
                    date < today
                        ? "previous"
                        : date < today
                        ? "past"
                        : "present";
                return dateTense === "previous" ? { invalidDate: true } : null;
            }
            return null;
        };
    }
    private static setValidator(formGroup: any, fields: any[]) {
        fields.forEach((item: any) => {
            formGroup.get(item).setValidators(Validators.required);
        });
        return formGroup;
    }
    private static requiredOptionalProgramsExist(
        selectedPrograms: string[],
        conditionalPrograms: string[],
        requiredPrograms: string[]
    ) {
        let programRequiredOptionalFlag = null as any;

        programRequiredOptionalFlag = this.areProgramsExist(
            selectedPrograms,
            requiredPrograms
        )
            ? REQUIREDOPTIONALCONTSTANTS.REQ
            : this.areProgramsExist(selectedPrograms, conditionalPrograms)
            ? REQUIREDOPTIONALCONTSTANTS.OPT
            : null;
        return programRequiredOptionalFlag;
    }
    public static areProgramsExist(
        selectedPrograms: string[],
        conditionalPrograms: string[]
    ) {
        if (selectedPrograms.length == 0) return false;

        return conditionalPrograms.some((value) => {
            return selectedPrograms.indexOf(value) !== -1;
        });
    }
    public static setOrClearValidators(
        requiredOrOptionalValidatorField: RequiredOrOptionalValidatorField
    ) {
        const isRequiredOrOptionalFlag = this.requiredOptionalProgramsExist(
            requiredOrOptionalValidatorField.selectedPrograms,
            requiredOrOptionalValidatorField.conditionalPrograms as string[],
            requiredOrOptionalValidatorField.requiredPrograms as string[]
        );
        if (
            isRequiredOrOptionalFlag == REQUIREDOPTIONALCONTSTANTS.REQ ||
            isRequiredOrOptionalFlag == REQUIREDOPTIONALCONTSTANTS.NULL
        ) {
            this.setValidator(
                requiredOrOptionalValidatorField.formGroup,
                requiredOrOptionalValidatorField.requiredFields
            );
        } else if (isRequiredOrOptionalFlag == REQUIREDOPTIONALCONTSTANTS.OPT) {
            const clearFields = [
                ...requiredOrOptionalValidatorField.requiredFields,
            ];
            requiredOrOptionalValidatorField.requiredFields = [];
            requiredOrOptionalValidatorField.formGroup = Utility.clearValidator(
                requiredOrOptionalValidatorField.formGroup,
                clearFields
            );
        }
    }
    public static setOrClearValidatorForFieldWithDifferntPrograms(
        requiredOrOptionalValidatorField: RequiredOrOptionalValidatorField
    ) {
        const requiredFields =
            requiredOrOptionalValidatorField?.fields as FormValidatorField[];
        let clearFields = [] as any;
        let requiredField = [] as any;
        let optionalField = [] as any;
        requiredFields.forEach((field: FormValidatorField) => {
            const isRequiredOrOptionalFlag = this.requiredOptionalProgramsExist(
                requiredOrOptionalValidatorField.selectedPrograms,
                field.optionalProgram,
                field.requiredProgram as string[]
            );
            if (isRequiredOrOptionalFlag == REQUIREDOPTIONALCONTSTANTS.REQ) {
                requiredField.push(field.fieldName);
            } else if (
                isRequiredOrOptionalFlag == REQUIREDOPTIONALCONTSTANTS.OPT ||
                isRequiredOrOptionalFlag == REQUIREDOPTIONALCONTSTANTS.NULL
            ) {
                clearFields.push(field.fieldName);
            }
            if (isRequiredOrOptionalFlag == REQUIREDOPTIONALCONTSTANTS.OPT) {
                optionalField.push(field.fieldName);
            }
        });
        if (requiredField.length > 0)
            requiredOrOptionalValidatorField.formGroup = this.setValidator(
                requiredOrOptionalValidatorField.formGroup,
                requiredField
            );

        if (clearFields.length > 0)
            requiredOrOptionalValidatorField.formGroup = this.clearValidator(
                requiredOrOptionalValidatorField.formGroup,
                clearFields
            );
        requiredOrOptionalValidatorField.requiredFields = requiredField;
        requiredOrOptionalValidatorField.optionalFields = optionalField;
    }
    public static getYesNoValue(value: string) {
        if (value !== null && value !== undefined && value !== "") {
            const _ch = value.charAt(0).toUpperCase();
            switch (_ch) {
                case "Y":
                    return "Yes";
                case "N":
                    return "No";
                default:
                    return "";
            }
        }
        return "";
    }

    public static formatDate(date: any) {
        if (date) {
            const [year, month, day] = date.split("-");

            const result = [month, day, year].join("/");
            return result;
        }
        return date;
    }

    public static duetFormatDate(date: any) {
        if (date === undefined || date === null) return date;
        else return date.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");
    }

    public static phoneNumberValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (control.value) {
                let numb = control.value.match(/\d/g);
                if (!numb) return null;
                numb = numb.join("");
                return (numb.length > 0 && numb.length < 10)
                    ? { invalidNumber: true }
                    : null;
            }
            return null;
        };
    }

    public static zipCodeValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (control.value) {
                let numb = control.value.match(/\d/g);
                if (!numb) return null;
                numb = numb.join("");
                return (numb.length < 5)
                    ? { invalidNumber: true }
                    : null;
            }
            return null;
        };
    }
}
export interface RequiredOrOptionalValidatorField {
    fields?: FormValidatorField[],
    requiredFields:any,
    optionalFields:any,
    selectedPrograms: string[],
    conditionalPrograms?: string[],
    requiredPrograms?: string[],
    formGroup: FormGroup,

}
export interface FormValidatorField{
    fieldName:string,
    optionalProgram:string[],
    requiredProgram:string[]
}
