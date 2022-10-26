import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RoutePath } from "../../shared/route-strategies";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportChangesService } from "../report-changes.service";
import { ChangeReportStoreService } from "../../+state/store-service/change-report-store.service";
import { IHouseHoldInformation } from "../../+state/models/change-report/change-report.model";
@Component({
    selector: "compass-ui-heating-source-crisis",
    templateUrl: "./heating-source-crisis.component.html",
    styleUrls: ["./heating-source-crisis.component.scss"],
})
export class HeatingSourceCrisisComponent implements OnInit {
    constructor(private router: Router, private fb: FormBuilder, private reportChangesService: ReportChangesService, private storeService: ChangeReportStoreService) { }
    heatingCrisisForm: FormGroup | any;
    householdInformation!: IHouseHoldInformation | any;
    ngOnInit(): void {
        this.heatingCrisisForm = this.fb.group({
            electric: [''],
            other: [''],
        });

        this.heatingCrisisForm.
            patchValue({
                electric: this.storeService.getShelterAndUtilityDetails()?.isElectricType,
                other: this.storeService.getShelterAndUtilityDetails()?.isOtherType,
            })
        this.storeService.getAppData().subscribe((d) => {
        })

    }

    onBack() {
        this.router.navigate([RoutePath.LIHEAP_CASH_INFORMATION]);
    }
    onNext() {
        const updateHeatingDetails = {
            isElectricType: this.heatingCrisisForm.get("electric").value,
            isOtherType: this.heatingCrisisForm.get("other").value,
            mortgageOrRentAmount: this.storeService.getShelterAndUtilityDetails()?.mortgageOrRentAmount,
            isHeatingAndCoolingType: null,
            isGasType: this.storeService.getShelterAndUtilityDetails()?.isGasType,
            isPhoneAndInternetType: this.storeService.getShelterAndUtilityDetails()?.isPhoneAndInternetType,
            otherTypeComments: ''
        }
        const updatedHousehold: any = {
            residentAddress: this.householdInformation?.residentAddress,
            mailingAddress: this.householdInformation?.mailingAddress,
            householdContactInformation: this.householdInformation?.householdContactInformation,
            shelterAndUtilitiesExpense: updateHeatingDetails,
            resources: this.householdInformation?.resources,
            otherCommunications: this.householdInformation?.otherCommunications

        };
        this.storeService.updateHouseHoldDetails({
            ...updatedHousehold
        });
        this.router.navigate([RoutePath.ELECTRIC_HEATING_SOURCE_CHANGES])
    }
} 
