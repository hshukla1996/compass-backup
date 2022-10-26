import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Utility } from "../../shared/utility";

@Component({
    selector: "compass-ui-verify-personal-info",
    templateUrl: "./verify-personal-info.component.html",
    styleUrls: ["./verify-personal-info.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerifyPersonalInfoComponent implements OnInit {
    constructor(
        private fb: FormBuilder,
        private router: Router
    ) {}

    verifyPersonalInfoGroup!: FormGroup
    ssnMinMaxL = 4
    ssnError = false;
    dobError = false;
    today = Utility.getToday()

    ngOnInit(): void {
        this.verifyPersonalInfoGroup = this.fb.group({
            dob: ["", [Validators.required, Utility.dateMaxValidator()]],
            last4ssn: ["", [Validators.required, Validators.minLength(this.ssnMinMaxL), Validators.maxLength(this.ssnMinMaxL)]]
        })

        // TODOAM3 load data (if needed)
    }

    isFieldInvalid(field: string): boolean {
        let control = this.verifyPersonalInfoGroup.get(field)!
        if (field == "last4ssn" && this.ssnError) return control.touched
        if (field == "dob" && this.dobError) return control.touched
        return !control.valid && control.touched
    }

    errorMap(field: string): string {
        let control = this.verifyPersonalInfoGroup.get(field)!
        switch(field) {
            case "dob": {
                if (control.errors?.required) {
                    return "sa_ERRrequired"
                }
                if (control.errors?.invalidDate) {
                    return "sa_ERRdateInPast"
                }
                if (this.dobError) {
                    return "sa_ERRfieldWrong"
                }
                return ""
            }
            case "last4ssn": {
                if (control.errors?.required) {
                    return "sa_ERRrequired"
                }
                if (control.errors?.minlength) {
                    return "sa_ERRminLength"
                }
                if (this.ssnError) {
                    return "sa_ERRfieldWrong"
                }
                return ""
            }
            default: {
                return ""
            }
        }
    }

    next(): void {
        // touch all fields
        this.verifyPersonalInfoGroup.markAllAsTouched()
        // check if valid
        if (!this.verifyPersonalInfoGroup.valid) return
        if (this.dobError || this.ssnError) return

        // check dob TODOAM3 mark dobError = true if wrong

        // check last4ssn TODOAM3 mark ssnError = true if wrong
        
        // submit data TODOAM3

        // navigate TODOAM3
    }

    tryAnotherVerifyMethod(): void {
        // navigate to verification method selection TODOAM3
    }
}
