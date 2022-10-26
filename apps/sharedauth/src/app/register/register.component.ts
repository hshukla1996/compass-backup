import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Utility } from "../shared/utility";

@Component({
    selector: "compass-ui-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
    constructor(
        private fb: FormBuilder,
        private router: Router
    ) {}

    registerBasicInfoGroup!: FormGroup
    firstNameMaxL = 11
    lastNameMaxL = 14
    emailMaxL = 60;
    confirmEmailMaxL = this.emailMaxL
    today = Utility.getToday()
    emailSub!: Subscription

    ngOnInit(): void {
        this.registerBasicInfoGroup = this.fb.group({
            firstName: ["", Validators.required],
            lastName: ["", Validators.required],
            dateOfBirth: ["", [Validators.required, Utility.dateMaxValidator()]],
            email: ["", Validators.email],
            confirmEmail: ["", [Validators.email, Utility.confirmMatchValidator('email')]]
        })
        this.emailSub = this.registerBasicInfoGroup.get("email")!.valueChanges.subscribe(change => {
            this.registerBasicInfoGroup.get("confirmEmail")?.updateValueAndValidity()
        })

        // TODOAM load data
    }

    ngOnDestroy(): void {
        this.emailSub.unsubscribe()
    }

    isFieldInvalid(field: string): boolean {
        let control = this.registerBasicInfoGroup.get(field)!
        return !control.valid && control.touched
    }

    errorMap(field: string): string {
        let control = this.registerBasicInfoGroup.get(field)!
        if (control.valid) return ""
        switch(field) {
            case "firstName": {
                if (control.errors?.required) {
                    return "sa_ERRrequired"
                }
                return ""
            }
            case "lastName": {
                if (control.errors?.required) {
                    return "sa_ERRrequired"
                }
                return ""
            }
            case "dateOfBirth": {
                if (control.errors?.required) {
                    return "sa_ERRrequired"
                }
                if (control.errors?.invalidDate) {
                    return "sa_ERRdateInPast"
                }
                return ""
            }
            case "email": {
                if (control.errors?.email) {
                    return "sa_ERRinvalidEmail"
                }
                return ""
            }
            case "confirmEmail": {
                if (control.errors?.email) {
                    return "sa_ERRinvalidEmail"
                }
                if (control.errors?.notMatch) {
                    return "sa_ERRconfirmEmailMismatch"
                }
                return ""
            }
            default: return ""
        }
    }

    back(): void {
        // navigate TODOAM go back to home probably
    }

    next(): void {
        // touch all fields
        this.registerBasicInfoGroup.markAllAsTouched()
        // check if valid
        if (!this.registerBasicInfoGroup.valid) return
        
        // submit data TODOAM

        // navigate TODOAM
    }

    toLogin(): void {
        this.router.navigate(["/"]) // TODOAM go to login
    }
}
