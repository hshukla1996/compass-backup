import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "compass-ui-cw-simpletile-terms-and-conditions",
    templateUrl: "./cw-simpletile-terms-and-conditions.component.html",
    styleUrls: ["./cw-simpletile-terms-and-conditions.component.scss"],
})
export class CwSimpletileTermsAndConditionsComponent implements OnInit {
    @Input() FormGroup!: FormGroup

    constructor() {}

    ngOnInit(): void {
        let agreeToControl = new FormControl(false, Validators.requiredTrue)
        this.FormGroup.addControl("agreeTo", agreeToControl)
    }

    isFieldInvalid(field: string): boolean {
        let control = this.FormGroup.get(field)!
        return !control.valid && control.touched
    }

    onEventChange(checked: boolean): void {
        this.FormGroup.get("agreeTo")?.patchValue(checked);
    }
}
