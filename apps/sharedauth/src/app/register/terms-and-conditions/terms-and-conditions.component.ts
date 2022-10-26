import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: "compass-ui-terms-and-conditions",
    templateUrl: "./terms-and-conditions.component.html",
    styleUrls: ["./terms-and-conditions.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TermsAndConditionsComponent implements OnInit {
    constructor(
        private router: Router
    ) {}

    registerTCSGroup: FormGroup = new FormGroup({})

    ngOnInit(): void {}

    back(): void {
        // navigate TODOAM go back to paperless screen
    }

    register(): void {
        // touch all fields
        this.registerTCSGroup.markAllAsTouched();
        // check if valid
        if (!this.registerTCSGroup.valid) return;
        // submit data TODOAM

        // navigate TODOAM
    }

    toLogin(): void {
        this.router.navigate(["/"]) // TODOAM go to login
    }
}
