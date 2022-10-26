import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Utility } from "../shared/utility";

@Component({
    selector: "compass-ui-forgot-username",
    templateUrl: "./forgot-username.component.html",
    styleUrls: ["./forgot-username.component.scss"],
})
export class ForgotUsernameComponent implements OnInit {
    constructor(
        private fb: FormBuilder,
        private router: Router
    ) {}

    basicInfoGroup!: FormGroup
    usernameMaxL = 64
    firstNameMaxL = 11
    lastNameMaxL = 14
    infoError = false
    today = Utility.getToday()

    ngOnInit(): void {
        this.basicInfoGroup = this.fb.group({
            firstName: ["", [Validators.required, Validators.maxLength(this.firstNameMaxL)]],
            lastName: ["", [Validators.required, Validators.maxLength(this.lastNameMaxL)]],
            dob: ["", [Validators.required, Utility.dateMaxValidator()]]
        })

        // TODOAM8 load data (if needed)
    }

    isFieldInvalid(field: string): boolean {
        let control = this.basicInfoGroup.get(field)!
        if (this.infoError) return control.touched
        return !control.valid && control.touched
    }

    errorMap(field: string): string {
        let control = this.basicInfoGroup.get(field)!
        switch(field) {
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
            case "dob": {
                if (control.errors?.required) {
                    return "sa_ERRrequired"
                }
                if (control.errors?.invalidDate) {
                    return "sa_ERRdateInPast"
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
        // navigate TODOAM8 go back to compass home page
    }

    next(): void {
        // touch all fields
        this.basicInfoGroup.markAllAsTouched()
        // check if valid
        if (!this.basicInfoGroup.valid) return
        if (this.infoError) return
        
        // check input is valid TODOAM8 mark infoError = true if wrong

        // navigate TODOAM8
    }
}
