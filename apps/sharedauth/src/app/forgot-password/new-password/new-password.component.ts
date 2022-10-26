import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Utility } from "../../shared/utility";

@Component({
    selector: "compass-ui-new-password",
    templateUrl: "./new-password.component.html",
    styleUrls: ["./new-password.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewPasswordComponent implements OnInit, OnDestroy {
    constructor(
        private fb: FormBuilder,
        private router: Router
    ) {}

    newPasswordGroup!: FormGroup
    confirmSub!: Subscription
    name!: string[]
    username!: string
    passwordMaxL = 14;
    passwordMinL = 8;
    confirmPasswordMinL = this.passwordMinL;
    confirmPasswordMaxL = this.passwordMaxL

    ngOnInit(): void {
        this.newPasswordGroup = this.fb.group({
            password: ["", [Validators.required, this.passwordValidator(), Validators.maxLength(this.passwordMaxL)]],
            confirmPassword: ["", [Validators.required, Utility.confirmMatchValidator("password")]],
        })
        this.confirmSub = this.newPasswordGroup.get("password")!.valueChanges.subscribe(() => {
            this.newPasswordGroup.get("confirmPassword")!.updateValueAndValidity();
          });

          // TODOAM7 get name and username
          this.name = ["John", "D", "Doe"];
          this.username = "johndoe123!"
    }

    ngOnDestroy():void {
        this.confirmSub.unsubscribe()
    }

    passwordValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (control.value) {
                let value = control.value

                let valid: boolean = !value.includes(" ");
                if (!valid) return { containsSpaces: true}
                
                this.name.forEach(namePart => {
                    valid = valid && !value.includes(namePart);
                });
                valid = valid && !value.includes(this.username);
                return (valid) ? null : { containsInfo: true }
            }
            return null;
        };
    }

    isFieldInvalid(field: string): boolean {
        let control = this.newPasswordGroup.get(field)!
        return !control.valid && control.touched
    }

    errorMap(field: string): string {
        let control = this.newPasswordGroup.get(field)!
        if (control.valid) return ""
        switch(field) {
            case "password": {
                if (control.errors?.required) {
                    return "sa_ERRrequiredPass";
                }
                if (control.errors?.pattern) {
                    return "sa_ERRinvalidPassword";
                }
                if (control.errors?.containsInfo) {
                    return "sa_ERRpasswordContainsInfo";
                }
                if (control.errors?.containsSpaces) {
                    return "sa_ERRinvalidPassword"
                }
                return "";
            }
            case "confirmPassword": {
                if (control.errors?.required) {
                    return "sa_ERRrequiredConfPass";
                }
                if (control.errors?.pattern) {
                    return "sa_ERRinvalidPassword";
                }
                if (control.errors?.notMatch) {
                    return "sa_ERRconfirmPasswordMismatch";
                }
                return "";
            }
            default: return ""
        }
    }

    back(): void {
        // navigate TODOAM7 go back to answer security questions
    }

    submit(): void {
        // touch all fields
        this.newPasswordGroup.markAllAsTouched()
        // check if valid
        if (!this.newPasswordGroup.valid) return
        
        // submit changes TODOAM7

        // navigate TODOAM7
    }
}
