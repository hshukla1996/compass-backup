import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
    selector: "compass-ui-terms-and-conditions",
    templateUrl: "./terms-and-conditions.component.html",
    styleUrls: ["./terms-and-conditions.component.scss"],
})
export class TermsAndConditionsComponent implements OnInit {
    constructor() {}

    loginTCSGroup: FormGroup = new FormGroup({})

    ngOnInit(): void {

    }

    back(): void {
        // TODOAM3 navigate back probably to device type
    }

    submit(): void {
        // touch all fields
        this.loginTCSGroup.markAllAsTouched()
        // check if valid
        if (!this.loginTCSGroup.valid) return
        
        // submit data TODOAM3

        // navigate TODOAM3 go to MCA dashbord
    }
}
