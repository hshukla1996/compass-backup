import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { IHouseHoldInformation, IIndividualInformation } from "../../+state/models/change-report/change-report.model";
import { ChangeReportStoreService } from "../../+state/store-service/change-report-store.service";
import { RoutePath } from "../../shared/route-strategies";
import { ReportChangesService } from "../report-changes.service";

@Component({
    selector: "compass-ui-liheap-cash-information",
    templateUrl: "./liheap-cash-information.component.html",
    styleUrls: ["./liheap-cash-information.component.scss"],
})
export class LiheapCashInformationComponent implements OnInit {
    form: FormGroup | any;
    householdInformation!: IHouseHoldInformation | null;
    individualInformation!: IIndividualInformation[] | null;
    constructor(private router: Router, private fb: FormBuilder, 
        private reportChangeService: ReportChangesService, private storeService: ChangeReportStoreService) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            household: ['', [Validators.required]],
            child: ['', [Validators.required]]
        });
        this.householdInformation = this.storeService.getHouseholdInformation();
        this.individualInformation = this.storeService.getIndividualInformation();
    }

    isFieldValid(field: string): boolean {
        return (this.form.get(field).status !== 'VALID' && (this.form.get(field).dirty || this.form.get(field).touched))

    }

    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return '';
        }
        switch (field) {
            case "household":
                if (this.form.get(field).errors?.required) {
                    return "The question is not answered";
                }
                break;
            case "child":
                if (this.form.get(field).errors?.required) {
                    return "The question is not answered";
                }
                break;
        }
        return "";
    }

    onNext() {
        this.reportChangeService.validateAllFormFields(this.form);
        // if (this.form.valid) {
            this.router.navigate([RoutePath.HEATING_SOURCE_CRISIS]);
        // }
    }

    onBack() {
        this.router.navigate([RoutePath.LIHEAP_CONFIRMATION]);
    }
}
