import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Utility } from "../../shared/utility";

@Component({
    selector: "compass-ui-new-email",
    templateUrl: "./new-email.component.html",
    styleUrls: ["./new-email.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewEmailComponent implements OnInit, OnDestroy {
    constructor(
        private fb: FormBuilder,
        private router: Router
    ) {}

    newEmailGroup!: FormGroup
    email!: string
    newEmailMaxL = 60
    confirmNewEmailMaxL = this.newEmailMaxL
    emailSub!: Subscription

    ngOnInit(): void {
        this.newEmailGroup = this.fb.group({
            newEmail: ["", [Validators.required, Validators.email, Validators.maxLength(this.newEmailMaxL)]],
            confirmNewEmail: ["", [Validators.required, Validators.email, Validators.maxLength(this.confirmNewEmailMaxL), Utility.confirmMatchValidator('newEmail')]]
        })
        this.emailSub = this.newEmailGroup.get("newEmail")!.valueChanges.subscribe(change => {
            this.newEmailGroup.get("confirmNewEmail")?.updateValueAndValidity()
        })

        // TODOAM5 load email
        this.email = "johndoe@email.com"
    }

    ngOnDestroy(): void {
        this.emailSub.unsubscribe()
    }

    isFieldInvalid(field: string): boolean {
        let control = this.newEmailGroup.get(field)!
        return !control.valid && control.touched
    }

    errorMap(field: string): string {
        let control = this.newEmailGroup.get(field)!
        if (control.valid) return ""
        switch(field) {
            case "newEmail": {
                if (control.errors?.required) {
                    return "sa_ERRrequired"
                }
                if (control.errors?.email) {
                    return "sa_ERRinvalidEmail"
                }
                return ""
            }
            case "confirmNewEmail": {
                if (control.errors?.required) {
                    return "sa_ERRrequired"
                }
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

    cancel(): void {
        // navigate TODOAM5 go back to MCA dashboard
    }

    submit(): void {
        // touch all fields
        this.newEmailGroup.markAllAsTouched()
        // check if valid
        if (!this.newEmailGroup.valid) return
        
        // submit changes TODOAM5

        // navigate TODOAM5 to confirmation screen
    }
}
