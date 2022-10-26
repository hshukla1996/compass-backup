import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { IAddress, IChangeReportState, IHouseHoldInformation, IIndividualInformation, ILiheapCrisis, IProviders } from "../../+state/models/change-report/change-report.model";
import { ChangeReportStoreService } from "../../+state/store-service/change-report-store.service";
import { RoutePath } from "../../shared/route-strategies";
import { ReportChangesService } from "../report-changes.service";

@Component({
    selector: "compass-ui-liheap-crisis-summary",
    templateUrl: "./liheap-crisis-summary.component.html",
    styleUrls: ["./liheap-crisis-summary.component.scss"],
})
export class LiheapCrisisSummaryComponent implements OnInit {
    otherSourceForm: FormGroup | any;
    changeReportState!: IChangeReportState;
    householdInformation!: IHouseHoldInformation | any;
    residentAddress: IAddress | any;
    liheapCrisis!: ILiheapCrisis | any;
    individualInformation: IIndividualInformation[] | any;
    providers: IProviders | any;
    cancelCard!: string;
    constructor(private fb: FormBuilder, private router: Router, private reportChangesService: ReportChangesService, private storeService: ChangeReportStoreService) { }

    ngOnInit(): void {
        this.otherSourceForm = this.fb.group({
            provider: ['', [Validators.required]]
        });
        this.storeService.getAppData().subscribe((d) => {
            this.liheapCrisis = this.storeService.getILiheapCrisis();
            this.householdInformation = this.changeReportState.householdInformation;
            this.individualInformation = this.changeReportState.individualInformation ? this.changeReportState.individualInformation[0] : null;
            console.log("liheapCrisis" + this.liheapCrisis);
        })
    }

    onBack() {
        this.router.navigate([RoutePath.OTHER_HEATING_SOURCE_CHANGES])
    }

    onSubmit() {
        this.router.navigate([RoutePath.REPORT_SUMMARY])
    }
    editHeatingCrisis() {
        this.router.navigate([RoutePath.OTHER_HEATING_SOURCE_CHANGES])
    }
    CancelCrisis() {

    }
    onCancel(card: string) {
        this.cancelCard = card;

    }

    onCancelModal() {
        this.cancelCard = '';
    }
    onConfirmModal() {
        let reportState = { ...this.changeReportState };
        if (this.cancelCard === 'LIHEAP_CHANGES') {
            const householdInfo: any = { ...this.householdInformation };
            delete householdInfo.mailingAddress;
            delete householdInfo.residentAddress;
            reportState = {
                ...reportState,
                householdInformation: householdInfo
            }
        } else if (this.cancelCard === 'HOUSING_UTILITIES_CHANGES') {
            const householdInfo: any = { ...this.householdInformation };
            delete householdInfo.shelterAndUtilitiesExpense;
            reportState = {
                ...reportState,
                householdInformation: householdInfo
            }
        }

        this.storeService.updateChangeReportState(reportState);
        this.cancelCard = '';
    }
    attachSubmit() {

    }
    onEditNavigate(route: string) {
        // @ts-ignore
        this.router.navigate([RoutePath.HEATING_SOURCE_CRISIS]);
    }


}
