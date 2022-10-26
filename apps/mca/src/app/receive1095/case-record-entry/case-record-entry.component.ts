import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { combineLatest, concat, forkJoin, merge, Observable, Subscription, withLatestFrom } from "rxjs";
import { IReceive1095FormState } from "../../+state/models/receive-1095-form/receive-1095-form.model";
import { Receive1095FormStoreService } from "../../+state/store-service/receive-1095-form-store.service";
import { RefDataStoreService } from "../../+state/store-service/ref-data-store.service";
import { RoutePath } from "../../shared/route-strategies";
import { TranslatePipe } from "@ngx-translate/core";
import { CWTextComponent } from "libs/ui/src/lib/cwText/cwText.component";
import { CwButtonComponent } from "libs/ui/src/lib/cw-button/cw-button.component";

@Component({
    selector: "compass-ui-case-record-entry",
    templateUrl: "./case-record-entry.component.html",
    styleUrls: ["./case-record-entry.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaseRecordEntryComponent implements OnInit, OnDestroy {

    constructor(
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private refStore: RefDataStoreService,
        private router: Router,
        private store: Receive1095FormStoreService
    ) {
        this.option1 = "1095caseOpt1";
        this.option2 = "1095caseOpt2";
        this.entryOptions = [this.option1, this.option2];
    }

    caseRecordGroup!: FormGroup;
    entryOptions!: string[];
    option1!: string;
    option2!: string;
    counties!: any;
    firstName!: string;
    phoneNumber = "18009865437";
    state!: IReceive1095FormState;
    stateSub!: Subscription;


    get entrySSN(): boolean {
        return this.caseRecordGroup.get("entryOption")?.value == this.option1;
    }
    get entryMCI(): boolean {
        return this.caseRecordGroup.get("entryOption")?.value == this.option2;
    }

    crMinMaxL = 7
    ssnMinMaxL = 11
    chipMinMaxL = 9
    mciMinMaxL = 9

    ngOnInit(): void {
        this.caseRecordGroup = this.fb.group({
            "entryOption": ['', Validators.required],
            "county": ['', Validators.required],
            "caseRecord": ['', [Validators.required, Validators.maxLength(this.crMinMaxL), Validators.minLength(this.crMinMaxL)]],
            "ssn": ['', Validators.required], // Validators.maxLength(this.ssnMinMaxL)
            "chipIdUci": ['', [Validators.required, Validators.maxLength(this.chipMinMaxL), Validators.minLength(this.chipMinMaxL)]],
            "mciMedEbt": ['', [Validators.required, Validators.maxLength(this.mciMinMaxL), Validators.minLength(this.mciMinMaxL)]],
            "phone": ['']
        });

        // get individual data from last form and assign to individual.firstname
        this.stateSub = combineLatest({ state: this.store.getReceive1095FormState(), counties: this.refStore.initCounties() })
            .subscribe(result => {
                let state = result.state;
                let counties = result.counties;
                this.state = state;
                this.counties = counties;

                this.firstName = state?.firstName!;
                this.caseRecordGroup.get("entryOption")?.patchValue(state?.entryOption);
                this.caseRecordGroup.get("county")?.patchValue(counties?.find(county => county?.id == this.state?.county)?.id);
                this.caseRecordGroup.get("caseRecord")?.patchValue(state?.caseRecord);
                this.caseRecordGroup.get("ssn")?.patchValue(state?.ssn);
                this.caseRecordGroup.get("chipIdUci")?.patchValue(state?.chipIdUci);
                this.caseRecordGroup.get("mciMedEbt")?.patchValue(state?.mciMedEbt);
                this.caseRecordGroup.get("phone")?.patchValue(sessionStorage.getItem("phone"))
                this.cd.detectChanges();
            });
        this.cd.detectChanges();
    }

    ngOnDestroy(): void {
        this.stateSub.unsubscribe();
    }

    isFieldInvalid(fieldName: string): boolean {
        let control = this.caseRecordGroup.controls[fieldName];
        return !control.valid && control.touched;
    }

    errorMap(fieldName: string): string {
        if (!this.isFieldInvalid(fieldName)) {
            return "";
        }
        switch (fieldName) {
            case "entryOption":
                if (this.caseRecordGroup.get(fieldName)?.errors?.required) {
                    return "1095fieldRequired";
                }
                break;
            case "county":
                if (this.caseRecordGroup.get(fieldName)?.errors?.required) {
                    return "1095fieldRequired";
                }
                break;
            case "caseRecord":
                if (this.caseRecordGroup.get(fieldName)?.errors?.required) {
                    return "1095fieldRequired";
                }
                if (this.caseRecordGroup.get(fieldName)?.errors?.minlength) {
                    return "1095fieldMinLength";
                }
                if (this.caseRecordGroup.get(fieldName)?.errors?.maxlength) {
                    return "1095fieldMaxLength";
                }
                break;
            case "ssn":
                if (this.caseRecordGroup.get(fieldName)?.errors?.required) {
                    return "1095fieldRequired";
                }
                if (this.caseRecordGroup.get(fieldName)?.errors?.minlength) {
                    return "1095fieldMinLength";
                }
                if (this.caseRecordGroup.get(fieldName)?.errors?.maxlength) {
                    return "1095fieldMaxLength";
                }
                if (this.caseRecordGroup.get(fieldName)?.errors?.ssnError) {
                    return this.caseRecordGroup.get(fieldName)?.errors?.ssnError;
                }
                break;
            case "chipIdUci":
                if (this.caseRecordGroup.get(fieldName)?.errors?.required) {
                    return "1095fieldRequired";
                }
                if (this.caseRecordGroup.get(fieldName)?.errors?.minlength) {
                    return "1095fieldMinLength";
                }
                if (this.caseRecordGroup.get(fieldName)?.errors?.maxlength) {
                    return "1095fieldMaxLength";
                }
                break;
            case "mciMedEbt":
                if (this.caseRecordGroup.get(fieldName)?.errors?.required) {
                    return "1095fieldRequired";
                }
                if (this.caseRecordGroup.get(fieldName)?.errors?.minlength) {
                    return "1095fieldMinLength";
                }
                if (this.caseRecordGroup.get(fieldName)?.errors?.maxlength) {
                    return "1095fieldMaxLength";
                }
                break;
            case "phone":
                if (this.caseRecordGroup.get(fieldName)?.errors?.required) {
                    return "1095fieldRequired";
                }
                return ""
            default:
                return "";
        }
        return "";
    }

    switchToSSN(): void {
        this.caseRecordGroup.get("entryOption")?.patchValue(this.entryOptions[0]);
    }

    switchToMCI(): void {
        this.caseRecordGroup.get("entryOption")?.patchValue(this.entryOptions[1]);
    }

    back(): void {
        this.router.navigate([RoutePath.RECEIVE_1095]);
    }

    next(): void {
        // touch controls
        this.caseRecordGroup.markAllAsTouched();
        // validate input
        if (!this.caseRecordGroup.get("entryOption")?.valid) return;
        if (this.entrySSN) {
            if (!this.caseRecordGroup.get("county")?.valid ||
                !this.caseRecordGroup.get("caseRecord")?.valid ||
                !this.caseRecordGroup.get("ssn")?.valid) return;

            // save data
            let updatedReceive1095FormState: IReceive1095FormState = {
                ...this.state,
                entryOption: this.caseRecordGroup.get("entryOption")?.value,
                county: this.caseRecordGroup.get("county")?.value,
                caseRecord: this.caseRecordGroup.get("caseRecord")?.value,
                ssn: this.caseRecordGroup.get("ssn")?.value
            };
            sessionStorage.setItem("phone", this.caseRecordGroup.get("phone")?.value)

            this.store.updateReceive1095FormState(updatedReceive1095FormState);
        }
        else if (this.entryMCI) {
            if (!this.caseRecordGroup.get("chipIdUci")?.valid ||
                !this.caseRecordGroup.get("mciMedEbt")?.valid) return;

            // save data
            let updatedReceive1095FormState: IReceive1095FormState = {
                ...this.state,
                entryOption: this.caseRecordGroup.get("entryOption")?.value,
                chipIdUci: this.caseRecordGroup.get("chipIdUci")?.value,
                mciMedEbt: this.caseRecordGroup.get("mciMedEbt")?.value,
            };

            this.store.updateReceive1095FormState(updatedReceive1095FormState);
        }

        // navigate
        this.router.navigate([RoutePath.RECEIVE_1095, RoutePath.TAX_YEAR_CONSENT]);
    }
}
