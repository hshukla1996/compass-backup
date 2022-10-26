import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: "compass-ui-active-case",
    templateUrl: "./active-case.component.html",
    styleUrls: ["./active-case.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveCaseComponent implements OnInit {
    constructor(
        private fb: FormBuilder,
        private router: Router
    ) {}

    activeCaseGroup!: FormGroup

    ngOnInit(): void {
        this.activeCaseGroup = this.fb.group({
            isHeadOnActiveCase: ["", Validators.required]
        })

        // TODOAM2 load data (if needed)
    }

    isFieldInvalid(field: string): boolean {
        let control = this.activeCaseGroup.get(field)!;
        return !control.valid && control.touched;
    }

    errorMap(field: string): string {
        let control = this.activeCaseGroup.get(field)!;
        switch (field) {
            case "isHeadOnActiveCase": {
                if (control.errors?.required) {
                    return "sa_ERRrequired"
                }
                return ""
            }
            default: return "";
        }
    }

    back(): void {
        // navigate TODOAM2 go back to case connect (or i think active case) probably
    }

    next(): void {
        // touch all fields
        this.activeCaseGroup.markAllAsTouched();
        // check if valid
        if (!this.activeCaseGroup.valid) return;
        // submit data TODOAM

        // navigate TODOAM2 go to connect case if user has no active case, go to paperless if active case provided
    }

    toLogin(): void {
        this.router.navigate(["/"]) // TODOAM2 go to login
    }
}
