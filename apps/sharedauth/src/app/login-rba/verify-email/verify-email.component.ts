import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: "compass-ui-verify-email",
    templateUrl: "./verify-email.component.html",
    styleUrls: ["./verify-email.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerifyEmailComponent implements OnInit {
    constructor(
        private fb: FormBuilder,
        private router: Router
    ) {}

    verifyEmailGroup!: FormGroup
    email!: string
    securityCodeMaxL = 6
    codeError = false

    ngOnInit(): void {
        this.verifyEmailGroup = this.fb.group({
            securityCode: ["", [Validators.required, Validators.maxLength(6)]]
        })

        // TODOAM3 load email
        this.email = "jo*****@email.com"
    }

    sendCodeAgain(): void {
        // TODOAM3 send security code again
    }

    isFieldInvalid(field: string): boolean {
        let control = this.verifyEmailGroup.get(field)!
        if (this.codeError) return control.touched
        return !control.valid && control.touched
    }

    errorMap(field: string): string {
        let control = this.verifyEmailGroup.get(field)!
        switch(field) {
            case "securityCode": {
                if (control.errors?.required) {
                    return "sa_ERRrequired"
                }
                if (this.codeError) {
                    return "sa_ERRfieldWrong"
                }
                return ""
            }
            default: return ""
        }
    }

    next(): void {
        // touch all fields
        this.verifyEmailGroup.markAllAsTouched()
        // check if valid
        if (!this.verifyEmailGroup.valid) return
        if (this.codeError) return

        // check security code TODOAM3 increase attempt count and mark codeError = true if wrong.
            // If user reaches 5, stop login process
        
        // submit data TODOAM3

        // navigate TODOAM3
    }

    tryAnotherVerifyMethod(): void {
        // navigate to verification method selection TODOAM3
    }
}
