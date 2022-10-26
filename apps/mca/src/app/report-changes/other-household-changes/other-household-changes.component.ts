import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { IChangeReportState } from "../../+state/models/change-report/change-report.model";
import { ChangeReportStoreService } from "../../+state/store-service/change-report-store.service";
import { RoutePath } from "../../shared/route-strategies";
import { ReportChangesService } from "../report-changes.service";

@Component({
    selector: "compass-ui-other-household-changes",
    templateUrl: "./other-household-changes.component.html",
    styleUrls: ["./other-household-changes.component.scss"],
})
export class OtherHouseholdChangesComponent implements OnInit {
    newJobForm: FormGroup | any;
    displayError: boolean = false;
    error: string = "Description is not entered";
    changeReportState!: IChangeReportState;
    constructor(private router: Router, private fb: FormBuilder,
        private reportChangesService: ReportChangesService, private storeService: ChangeReportStoreService) { }

    ngOnInit(): void {
        this.newJobForm = this.fb.group({
            description: ['']
        });
        this.storeService.getAppData().subscribe((d) => {
            this.changeReportState = { ...d };
            if (this.changeReportState.householdInformation) {
                this.newJobForm.get('description').setValue(this.changeReportState.householdInformation.otherHouseholdChanges)
            }
        });
    }

    onBack() {
        this.router.navigate([RoutePath.PREGNANCY_OTHER_HOUSEHOLD]);
    }

    onNext() {
        if (!this.newJobForm.get('description').value) {
            this.displayError = true;
        } else {
            this.storeService.updateOtherHouseholdChanges(this.newJobForm.get('description').value);
            this.reportChangesService.navigateToNextHouseholdChange('OTHER_HOUSEHOLD_CHANGES');
        }
    }

}
