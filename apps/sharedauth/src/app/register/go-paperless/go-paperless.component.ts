import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: "compass-ui-go-paperless",
    templateUrl: "./go-paperless.component.html",
    styleUrls: ["./go-paperless.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoPaperlessComponent implements OnInit {
    constructor(
        private fb: FormBuilder,
        private router: Router
    ) {}

    paperlessGroup!: FormGroup

    ngOnInit(): void {
        this.paperlessGroup = this.fb.group({
            receiveNotices: ["", Validators.required]
        })

        // TODOAM load data
    }

    isFieldInvalid(field: string): boolean {
        let control = this.paperlessGroup.get(field)!;
        return !control.valid && control.touched;
    }

    errorMap(field: string): string {
        let control = this.paperlessGroup.get(field)!;
        switch (field) {
            case "receiveNotices": {
                if (control.errors?.required) {
                    return "sa_ERRrequired"
                }
                return ""
            }
            default: return "";
        }
    }

    back(): void {
        // navigate TODOAM go back to case connect (or i think active case) probably
    }

    next(): void {
        // touch all fields
        this.paperlessGroup.markAllAsTouched();
        // check if valid
        if (!this.paperlessGroup.valid) return;
        // submit data TODOAM

        // navigate TODOAM
    }

    toLogin(): void {
        this.router.navigate(["/"]) // TODOAM go to login
    }
}
