import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: "compass-ui-forgot-password",
    templateUrl: "./forgot-password.component.html",
    styleUrls: ["./forgot-password.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent implements OnInit {
    constructor(
        private fb: FormBuilder,
        private router: Router
    ) {}

    basicInfoGroup!: FormGroup
    usernameMaxL = 64
    firstNameMaxL = 11
    lastNameMaxL = 14
    infoError = false

    ngOnInit(): void {
        this.basicInfoGroup = this.fb.group({
            username: ["", [Validators.required, Validators.maxLength(this.usernameMaxL)]],
            firstName: ["", [Validators.required, Validators.maxLength(this.firstNameMaxL)]],
            lastName: ["", [Validators.required, Validators.maxLength(this.lastNameMaxL)]]
        })

        // TODOAM7 load data (if needed)
    }

    isFieldInvalid(field: string): boolean {
        let control = this.basicInfoGroup.get(field)!
        if (this.infoError) return control.touched
        return !control.valid && control.touched
    }

    errorMap(field: string): string {
        let control = this.basicInfoGroup.get(field)!
        switch(field) {
            case "username": {
                if (control.errors?.required) {
                    return "sa_ERRrequired"
                }
                if (this.infoError) {
                    return "sa_ERRfieldWrong"
                }
                return ""
            }
            case "firstName": {
                if (control.errors?.required) {
                    return "sa_ERRrequired"
                }
                if (this.infoError) {
                    return "sa_ERRfieldWrong"
                }
                return ""
            }
            case "lastName": {
                if (control.errors?.required) {
                    return "sa_ERRrequired"
                }
                if (this.infoError) {
                    return "sa_ERRfieldWrong"
                }
                return ""
            }
            default: return ""
        }
    }

    cancel(): void {
        // navigate TODOAM7 go back to compass home page
    }

    next(): void {
        // touch all fields
        this.basicInfoGroup.markAllAsTouched()
        // check if valid
        if (!this.basicInfoGroup.valid) return
        if (this.infoError) return
        
        // check input is valid TODOAM7 mark infoError = true if wrong

        // navigate TODOAM7
    }
}
