import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import { MenuData } from "@compass-ui/data";
import { differenceInYears, format } from "date-fns";

export class Utility {
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

    public static getToday(): string {
      return new Date().toJSON().slice(0, 10).replace(/-/g, '-');
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
  public static confirmMatchValidator(sourceControlName: string): ValidationErrors | null {
    
    let confirmControl: AbstractControl;
    let sourceControl: AbstractControl;

    return (control: AbstractControl) => {
      if (!control.parent) {
        return null;
      }

      confirmControl = control;
      sourceControl = confirmControl.parent?.get(sourceControlName)!;

      if (sourceControl.value?.toLocaleLowerCase() !==
        confirmControl.value?.toLocaleLowerCase()
      ) {
        return { notMatch: true };
      }

      return null;
    };
  }

/*  public static duplicate2Validator(...otherControlNames: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!!control.value) {
            let otherControls : any[] = otherControlNames.map((name:string) => {
                return (control.parent?.controls as { [key:string]: AbstractControl})[name]
            })

            let unique = 0
            otherControls.forEach(otherControl => {
                otherControl.valueChanges.subscribe(() => {
                    control.updateValueAndValidity();
                  });
                if (control.value != otherControl.value) unique++
            })

            return (unique == 2) ? null: {duplicate: true}
        }
        return null
    }
  } */

  public static duplicateValidator(...controlNames: string[]): ValidatorFn {
    return (group: any): ValidationErrors | null => {
        if (group.value) {
            // Look for duplicate answers
            let controls: FormControl[] = controlNames.map(name => group.get(name)) // get controls
            let set = new Set(controls.map(control => control.value)) // get values in set
            if (set.size == controls.length) return null; // check if dupes. if not, finish validator

            // invalid, return errors
            let invalidControls = new Set<AbstractControl>() // gather invalid controls with duped values
            controls.forEach(control => {
                if(set.has(control.value)) {
                    set.delete(control.value)
                }
                else {
                    invalidControls.add(control)
                }
            });
            let invalidNames: Set<string> = new Set() // gather names of invalid controls
            controlNames.forEach(name => {
                if (invalidControls.has(group.controls[name])) {
                    invalidNames.add(name)
                }
            })

            // return error object where keys are names of invalid controls
            let errors = Array.from(invalidNames).reduce((errs:Object,name:string) => { return { ...errs, [name]:true} } , {});
            return errors
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
    public static dateStartValidator(start: any): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (control.value) {
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
            if (control.value) {
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
    public static dateMaxValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (control.value) {
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
            if (control.value) {
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

    public static phoneNumberValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (control.value) {
                let numb = control.value.match(/\d/g);
                numb = numb.join("");
                return (numb.length < 10 || numb.length > 10)
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
