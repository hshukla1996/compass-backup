import { CdkAriaLive } from "@angular/cdk/a11y";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: "compass-ui-login-rba",
    templateUrl: "./login-rba.component.html",
    styleUrls: ["./login-rba.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginRbaComponent implements OnInit {
    constructor(
        private fb: FormBuilder,
        private router: Router
    ) {}

    verifyMethodGroup!: FormGroup
    email!: string
    isEmailViable!: boolean
    isSSNViable!: boolean

    ngOnInit(): void {
        this.verifyMethodGroup = this.fb.group({
            verifyMethod: ["", Validators.required]
        })

        // TODOAM3 load email, check if email and ssn are viable options
        this.email = "jo*****@email.com"
        this.isEmailViable = true
        this.isSSNViable = false
        
    }

    isFieldInvalid(field: string): boolean {
        let control = this.verifyMethodGroup.get(field)!
        return !control.valid && control.touched
    }

    errorMap(field: string): string {
        let control = this.verifyMethodGroup.get(field)!
        if (control.valid) return ""
        switch(field) {
            case "verifyMethod": {
                if (control.errors?.required) {
                    return "sa_ERRrequired"
                }
                return ""
            }
            default: return ""
        }
    }

    back(): void {
        // navigate TODOAM3 go back to home probably
    }

    next(): void {
        // touch all fields
        this.verifyMethodGroup.markAllAsTouched()
        // check if valid
        if (!this.verifyMethodGroup.valid) return
        
        // submit data TODOAM3

        // navigate TODOAM3
    }
}
