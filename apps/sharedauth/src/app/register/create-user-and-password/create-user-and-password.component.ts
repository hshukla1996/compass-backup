import { ChangeDetectionStrategy, OnDestroy } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ValidationResult } from "angular-auth-oidc-client";
import { BehaviorSubject, debounceTime, distinct, distinctUntilChanged, map, Observable, Subscription, switchMap } from "rxjs";
import { Utility } from "../../shared/utility";

@Component({
    selector: "compass-ui-create-user-and-password",
    templateUrl: "./create-user-and-password.component.html",
    styleUrls: ["./create-user-and-password.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateUserAndPasswordComponent implements OnInit, OnDestroy {
    constructor(
        private fb: FormBuilder,
        private router: Router
    ) { }

    registerCreateUserGroup!: FormGroup;
    usernameMinL = 6;
    usernameMaxL = 64;
    passwordMaxL = 14;
    passwordMinL = 8;
    confirmPasswordMinL = this.passwordMinL;
    confirmPasswordMaxL = this.passwordMaxL
    name!: string[];
    passSub!: Subscription;
    confirmSub!: Subscription
    debounceTime: number = 1000

    ngOnInit(): void {
        this.registerCreateUserGroup = this.fb.group({
            username: ["", [Validators.required, this.usernameValidator(),
            Validators.minLength(this.usernameMinL), Validators.maxLength(this.usernameMaxL)]],
            password: ["", [Validators.required, this.passwordValidator()]],
            confirmPassword: ["", [Validators.required, Utility.confirmMatchValidator("password")]], // Utility.confirmMatchValidator("password")
            emailUserId: false
        });

        this.passSub = this.registerCreateUserGroup.get("username")!.valueChanges.subscribe(newValue => {
            this.registerCreateUserGroup.get("password")!.updateValueAndValidity();
        });
        this.confirmSub = this.registerCreateUserGroup.get("password")!.valueChanges.subscribe(() => {
            this.registerCreateUserGroup.get("confirmPassword")!.updateValueAndValidity();
          });

        // TODOAM load data and name
        this.name = ["John", "D", "Doe"];
    }

    ngOnDestroy():void {
        this.passSub.unsubscribe()
        this.confirmSub.unsubscribe()
    }

    usernameValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (control.value) {
                let value: string = control.value;
                let valid = /^[a-zA-Z0-9@_\.-]+$/.test(value)
                    && !value.includes(" ")
                    && /[a-zA-Z]/.test(value.charAt(0));
                if (!valid) return { invalidUsername: true };

                // TODOAM Find if dupe

            }
            return null;
        };
    }

    passwordValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (control.value) {
                let value = control.value
                let usernameControl: AbstractControl = control.parent?.get("username")!;

                let valid: boolean = !value.includes(" ");
                if (!valid) return { containsSpaces: true}
                
                this.name.forEach(namePart => {
                    valid = valid && !value.includes(namePart);
                });
                valid = valid && !value.includes(usernameControl.value);
                return (valid) ? null : { containsInfo: true }
            }
            return null;
        };
    }

    isFieldInvalid(field: string): boolean {
        let control = this.registerCreateUserGroup.get(field)!;
        return !control.valid && control.touched;
    }

    errorMap(field: string): string {
        let control = this.registerCreateUserGroup.get(field)!;
        if (control.valid) return "";
        switch (field) {
            case "username": {
                if (control.errors?.required) {
                    return "sa_ERRrequired";
                }
                if (control.errors?.minlength) {
                    return "sa_ERRminLength";
                }
                if (control.errors?.maxlength) {
                    return "sa_ERRmaxLength";
                }
                if (control.errors?.invalidUsername) {
                    return "sa_ERRinvalidUsername";
                }
                if (control.errors?.dupeUserName) {
                    return "sa_ERRusernameTaken";
                }
                return "";
            }
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
            default: return "";
        }
    }

    checkboxEmailUserIdChange(checked: boolean) {
        this.registerCreateUserGroup.patchValue({ emailUserId: checked });
    }

    back(): void {
        // navigate TODOAM go back to basic info probably
    }

    next(): void {
        // touch all fields
        this.registerCreateUserGroup.markAllAsTouched();
        // check if valid
        if (!this.registerCreateUserGroup.valid) return;
        console.log("VALID")
        // submit data TODOAM

        // navigate TODOAM
    }

    toLogin(): void {
        this.router.navigate(["/"]); // TODOAM go to login
    }
}
