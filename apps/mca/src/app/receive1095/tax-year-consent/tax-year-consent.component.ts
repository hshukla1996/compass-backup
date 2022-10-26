import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { routerCancelAction } from "@ngrx/router-store";
import { TranslatePipe } from "@ngx-translate/core";
import { Observable, Subscription } from "rxjs";
import { IReceive1095FormState } from "../../+state/models/receive-1095-form/receive-1095-form.model";
import { Receive1095FormStoreService } from "../../+state/store-service/receive-1095-form-store.service";
import { RoutePath } from "../../shared/route-strategies";

@Component({
    selector: "compass-ui-tax-year-consent",
    templateUrl: "./tax-year-consent.component.html",
    styleUrls: ["./tax-year-consent.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaxYearConsentComponent implements OnInit, OnDestroy {
    constructor(
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private router: Router,
        private store: Receive1095FormStoreService
    ) { }

    state!: IReceive1095FormState;
    stateSub!: Subscription;
    taxYearGroup!: FormGroup;
    years!: number[];

    ngOnInit(): void {
        this.taxYearGroup = this.fb.group({
            "taxYear": ['', Validators.required],
            "consent": [false, Validators.requiredTrue]
        });

        this.stateSub = this.store.getReceive1095FormState().subscribe(state => {
            this.state = state;
            this.taxYearGroup.get("taxYear")?.patchValue(state.taxYear);
            this.cd.detectChanges();
        });

        let currentYear = new Date().getFullYear();
        this.years = [currentYear - 1, currentYear - 2, currentYear - 3, currentYear - 4];
        this.cd.detectChanges();
    }

    ngOnDestroy(): void {
        this.stateSub.unsubscribe();
    }

    consent(checked: boolean): void {
        this.taxYearGroup.get("consent")?.patchValue(checked);
    }

    isFieldInvalid(fieldName: string): boolean {
        let control = this.taxYearGroup.controls[fieldName];
        return !control.valid && control.touched;
    }

    errorMap(fieldName: string): string {
        if (!this.isFieldInvalid(fieldName)) {
            return "";
        }
        switch (fieldName) {
            case "taxYear":
                if (this.taxYearGroup.get(fieldName)?.errors?.required) {
                    return "1095fieldRequired";
                }
                break;
            case "consent":
                if (this.taxYearGroup.get(fieldName)?.errors?.required) {
                    return "1095fieldRequired";
                }
                break;
        }
        return "";
    }

    submit(): void {
        // touch controls
        this.taxYearGroup.markAllAsTouched();
        // validate form
        if (!this.taxYearGroup.valid) return;

        // save data
        let updatedReceive1095FormState: IReceive1095FormState = {
            ...this.state,
            taxYear: this.taxYearGroup.get("taxYear")?.value
        };
        this.store.updateReceive1095FormState(updatedReceive1095FormState);

        // TODORW submit data 

        // TODORW check if submit was successful. If so, clear state

        // navigate after submit
        this.router.navigate([RoutePath.HOME]);
    }

    back(): void {
        // navigate back
        this.router.navigate([RoutePath.RECEIVE_1095, RoutePath.CASE_RECORD_ENTRY]);
    }
}
