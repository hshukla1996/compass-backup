import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: "compass-ui-change-security-questions",
    templateUrl: "./change-security-questions.component.html",
    styleUrls: ["./change-security-questions.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeSecurityQuestionsComponent implements OnInit {
    constructor(
        private fb: FormBuilder,
        private router: Router
    ) {}

    verifyGroup!: FormGroup
    passwordMaxL = 14
    passwordError = false;

    ngOnInit(): void {
        // TODOAM4 load data (such as first name, last name, and username)
        let firstName="John"
        let lastName = "Doe"
        let username = "johndoe123"

        this.verifyGroup = this.fb.group({
            firstName,
            lastName,
            username,
            password: ["", [Validators.required, Validators.maxLength(this.passwordMaxL)]]
        })
    }

    isFieldInvalid(field: string): boolean {
        let control = this.verifyGroup.get(field)!
        if (this.passwordError) return control.touched
        return !control.valid && control.touched
    }

    errorMap(field: string): string {
        let control = this.verifyGroup.get(field)!
        switch(field) {
            case "password": {
                if (control.errors?.required) {
                    return "sa_ERRrequiredPass"
                }
                if (this.passwordError) {
                    return "sa_ERRfieldWrong"
                }
                return ""
            }
            default: return ""
        }
    }

    cancel(): void {
        // navigate TODOAM4 go back to MCA dashboard
    }

    next(): void {
        // touch all fields
        this.verifyGroup.markAllAsTouched()
        // check if valid
        if (!this.verifyGroup.valid) return
        if (this.passwordError) return
        
        // check password TODOAM4 increase attempt count and mark passwordError = true if wrong.
            // If user reaches 5, stop login process

        // navigate TODOAM4
    }
}
