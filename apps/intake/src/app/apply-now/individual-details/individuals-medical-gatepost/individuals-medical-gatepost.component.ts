import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild,} from "@angular/core";
import { MenuItemState } from "../../../shared/menu-item-state";
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import { Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { IGeneralDetails, IHouseHoldGeneralDetails,} from "../general-details/state/general-details-model";
import { IApplyNowState, Programs } from "../../+state/apply-now.models";
import { Subscription } from "rxjs";
import { RoutePath } from "../../../shared/route-strategies";
import { IHouseHold } from "../../household/household-model";
import { AppStoreService } from "../../../app-store-service";
import { UtilService } from "../../../shared/services/util.service";
import {ScreenQueueUtil} from "./individuals-medical-gatepost.path";
import { ScreenQueueUtil as individualSituationsGatePostQueue } from "../individuals-gatepost/individuals-gatepost.paths";
import JsonData from './individuals-medical-gatepost.json'

@Component({
    selector: "compass-ui-individuals-medical-gatepost",
    templateUrl: "./individuals-medical-gatepost.component.html",
    styleUrls: ["./individuals-medical-gatepost.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndividualsMedicalGatepostComponent implements OnInit {
    jsonData: any;
    applyNowState: IApplyNowState | undefined;
    programSelected: any[] = [];

     constructor(
        private router: Router,
        private service: ApplyNowStoreService,
        private cd: ChangeDetectorRef,
        private queueService: ScreenQueueUtil,
        private indqueueService:individualSituationsGatePostQueue,
     ) {}

    ngOnInit(): void {
        this.jsonData = JsonData;
        this.service.getAppData().subscribe((d) => {
            this.applyNowState = { ...d };
            this.cd.detectChanges();
            this.programSelected = this.service.getProgramSelection || [];

            const gpServices =
                this.applyNowState.houseHoldDetails.individualMedicalSituations;

            JsonData.questionAnswers.forEach((service) => {
                if (gpServices.checked !== undefined && gpServices?.checked.indexOf(service.value) > -1) {
                    service.isYesChecked = true;
                    service.isNoChecked = false;
                }
                else if (gpServices.unchecked !== undefined && gpServices.unchecked.indexOf(service.value) > -1){
                      service.isYesChecked = false;
                      service.isNoChecked = true;
                }
            });
        });
        //Have a medical condition (including a disability), a chronic condition (such as arthritis), or an ongoing special health care need
        //R = HC, HA, MCR, MAR, CA, CAR, CI, CIR, MI
        //O = FS, FSR, ES, ESR
        if (
            this.programSelected.indexOf(Programs.HC) > -1 ||
            this.programSelected.indexOf(Programs.HA) > -1 ||
            this.programSelected.indexOf(Programs.MCR) > -1 ||
            this.programSelected.indexOf(Programs.MAR) > -1 ||
            this.programSelected.indexOf(Programs.CA) > -1 ||
            this.programSelected.indexOf(Programs.CAR) > -1 ||
            this.programSelected.indexOf(Programs.CI) > -1 ||
            this.programSelected.indexOf(Programs.CIR) > -1 ||
            this.programSelected.indexOf(Programs.MI) > -1
        ) {
            JsonData.questionAnswers[0].isRequired = true;
            JsonData.questionAnswers[0].show = true;
        }
        else if (
            this.programSelected.indexOf(Programs.FS) > -1 ||
            this.programSelected.indexOf(Programs.FSR) > -1 ||
            this.programSelected.indexOf(Programs.ES) > -1 ||
            this.programSelected.indexOf(Programs.ESR) > -1
        ) {
            JsonData.questionAnswers[0].show = true;
        }
        else {
            JsonData.questionAnswers[0].show = false;
        }
        //Have a medical condition that requires health sustaining medication
        //R = HA, MAR, MI
        //O = FS, FSR
        if (
            this.programSelected.indexOf(Programs.HA) > -1 ||
            this.programSelected.indexOf(Programs.MAR) > -1 ||
            this.programSelected.indexOf(Programs.MI) > -1
        ) {
            JsonData.questionAnswers[1].isRequired = true;
            JsonData.questionAnswers[1].show = true;
        }
        else if (
            this.programSelected.indexOf(Programs.FS) > -1 ||
            this.programSelected.indexOf(Programs.FSR) > -1
        ) {
            JsonData.questionAnswers[1].show = true;
        }
        else {
            JsonData.questionAnswers[1].show = false;
        }
        //Have any paid or unpaid medical bills that have a date of service that occurred this month or within the past 3 months
        //R = HC, HA, MAR, MCR, CHR, LN, LI, WAR, WN, WNR, LIR, LNR, MI
        //O = CA, CAR, FS, FSR
        if (
            this.programSelected.indexOf(Programs.HC) > -1 ||
            this.programSelected.indexOf(Programs.HA) > -1 ||
            this.programSelected.indexOf(Programs.MAR) > -1 ||
            this.programSelected.indexOf(Programs.MCR) > -1 ||
            this.programSelected.indexOf(Programs.CHR) > -1 ||
            this.programSelected.indexOf(Programs.LN) > -1 ||
            this.programSelected.indexOf(Programs.LI) > -1 ||
            this.programSelected.indexOf(Programs.WAR) > -1 ||
            this.programSelected.indexOf(Programs.WN) > -1 ||
            this.programSelected.indexOf(Programs.WNR) > -1 ||
            this.programSelected.indexOf(Programs.LIR) > -1 ||
            this.programSelected.indexOf(Programs.LNR) > -1 ||
            this.programSelected.indexOf(Programs.MI) > -1
        ) {
            JsonData.questionAnswers[2].isRequired = true;
            JsonData.questionAnswers[2].show = true;
        }
        else if (
            this.programSelected.indexOf(Programs.CA) > -1 ||
            this.programSelected.indexOf(Programs.CAR) > -1 ||
            this.programSelected.indexOf(Programs.FS) > -1 ||
            this.programSelected.indexOf(Programs.FSR) > -1
        ) {
            JsonData.questionAnswers[2].show = true;
        }
        else {
            JsonData.questionAnswers[2].show = false;
        }
        //Currently receiving SNAP (formerly known as Food Stamps) or Cash Assistance, for example Temporary Assistance for Needy Families (TANF)
        //R = CI, CIR
        if (
            this.programSelected.indexOf(Programs.CI) > -1 ||
            this.programSelected.indexOf(Programs.CIR) > -1
        ) {
            JsonData.questionAnswers[3].isRequired = true;
            JsonData.questionAnswers[3].show = true;
        }
        else {
            JsonData.questionAnswers[3].show = false;
        }
        //Received Cash Assistance, for example TANF, in the past 6 months
        //R = CI, CIR
        if (
            this.programSelected.indexOf(Programs.CI) > -1 ||
            this.programSelected.indexOf(Programs.CIR) > -1
        ) {
            JsonData.questionAnswers[4].isRequired = true;
            JsonData.questionAnswers[4].show = true;
        }
        else {
            JsonData.questionAnswers[4].show = false;
        }
        //Have applied for any benefits that they have not received yet
        //R = HC, HA, CHR, ABR, CA, CAR (ABR not available)
        //O = FS, FSR
        if (
            this.programSelected.indexOf(Programs.HC) > -1 ||
            this.programSelected.indexOf(Programs.HA) > -1 ||
            this.programSelected.indexOf(Programs.CHR) > -1 ||
            this.programSelected.indexOf(Programs.CA) > -1 ||
            this.programSelected.indexOf(Programs.CAR) > -1
        ) {
            JsonData.questionAnswers[5].isRequired = true;
            JsonData.questionAnswers[5].show = true;
        }
        else if (
            this.programSelected.indexOf(Programs.FS) > -1 ||
            this.programSelected.indexOf(Programs.FSR) > -1
        ) {
            JsonData.questionAnswers[5].show = true;
        }
        else {
            JsonData.questionAnswers[5].show = false;
        }
        //Want to be reviewed for coverage for the Family Planning Services program if not eligible for full health care coverage
        //O = HA, HC, MAR, MCR, CHR, MI
        if (
            this.programSelected.indexOf(Programs.HA) > -1 ||
            this.programSelected.indexOf(Programs.HC) > -1 ||
            this.programSelected.indexOf(Programs.MAR) > -1 ||
            this.programSelected.indexOf(Programs.MCR) > -1 ||
            this.programSelected.indexOf(Programs.CHR) > -1 ||
            this.programSelected.indexOf(Programs.MI) > -1
        ) {
            JsonData.questionAnswers[6].show = true;
        }
        else {
            JsonData.questionAnswers[6].show = false;
        }
        //Received Supplemental Security Income (SSI) in the past
        //R = HC, HA, CA, CAR
        if (
            this.programSelected.indexOf(Programs.HC) > -1 ||
            this.programSelected.indexOf(Programs.HA) > -1 ||
            this.programSelected.indexOf(Programs.CA) > -1 ||
            this.programSelected.indexOf(Programs.CAR) > -1
        ) {
            JsonData.questionAnswers[7].isRequired = true;
            JsonData.questionAnswers[7].show = true;
        }
        else {
            JsonData.questionAnswers[7].show = false;
        }
        //Received Social Security Disability (SSD) in the past
        //R = CA, CAR
        if (
            this.programSelected.indexOf(Programs.CA) > -1 ||
            this.programSelected.indexOf(Programs.CAR) > -1
        ) {
            JsonData.questionAnswers[8].isRequired = true;
            JsonData.questionAnswers[8].show = true;
        }
        else {
            JsonData.questionAnswers[8].show = false;
        }
        this.jsonData = JsonData;
    }

    showNextPage(selectedItems: any) {
        const storedHouseholdDetails = this.applyNowState?.houseHoldDetails;
        const selectedPaths: any = {
            checked:[],
            unchecked:[]
        };
        selectedItems.questionAnswers.forEach((item: any) => {
            if (item.isYesChecked) {
                selectedPaths.checked.push(item.value);
            }
            else if (item.isNoChecked) {
                selectedPaths.unchecked.push(item.value);
            }
        });
        console.log(selectedPaths.unchecked)
        const clonedUpdatedPerson: IHouseHold[] = [];
        this.applyNowState?.houseHoldDetails.houseHoldPersons!.forEach((person: IHouseHold) => {
            const clonedPerson = { ...person };
            clonedUpdatedPerson.push(clonedPerson);
        });
        this.applyNowState!.houseHoldDetails.houseHoldPersons!.forEach((person: IHouseHold) => {
            const clonedPerson = { ...person };
            if (selectedPaths.unchecked.includes('medicalcondition')) {
                clonedUpdatedPerson.length = 0;
                this.applyNowState?.houseHoldDetails.houseHoldPersons!.forEach((person: IHouseHold) => {
                    const clonedPerson = { ...person };
                    clonedPerson.isMedical = false;
                    clonedUpdatedPerson.push(clonedPerson);
                });
            }
            if (selectedPaths.unchecked.includes('sustainingmedication')) {
                clonedUpdatedPerson.length = 0;
                this.applyNowState?.houseHoldDetails.houseHoldPersons!.forEach((person: IHouseHold) => {
                    const clonedPerson = { ...person };
                    clonedPerson.isHealthSustainingMedication = false;
                    clonedUpdatedPerson.push(clonedPerson);
                });
            }
            if (selectedPaths.unchecked.includes('sustainingmedication')) {
                clonedUpdatedPerson.length = 0;
                this.applyNowState?.houseHoldDetails.houseHoldPersons!.forEach((person: IHouseHold) => {
                    const clonedPerson = { ...person };
                    clonedPerson.isPaidMedicalBills = false;
                    clonedUpdatedPerson.push(clonedPerson);
                });
            }
            if (selectedPaths.unchecked.includes('receivingTANF')) {
                let receivingTANF = {
                    code: true,
                    individualNumbers: []
                }
                this.service.updateCurrentSnapOrTanfBenefits(receivingTANF);
                clonedUpdatedPerson.length = 0;
                this.applyNowState?.houseHoldDetails.houseHoldPersons!.forEach((person: IHouseHold) => {
                    const clonedPerson = { ...person };
                    clonedPerson.fsOrTANFBenefits = [];
                    clonedPerson.fsOrTANFCaseNumber = null;
                    clonedPerson.fstanfIndividualEBTNumber = null;
                    clonedUpdatedPerson.push(clonedPerson);
                });
            }
            if (selectedPaths.unchecked.includes('receivedTANFInPasts6Months')) {
                let receivedTANFInPasts6Months = {
                    code: true,
                    individualNumbers: []
                }
                this.service.updatePriorTanfOrCashAssistance(receivedTANFInPasts6Months);
            }
            if (selectedPaths.unchecked.includes('benifitsnotreceived')) {
                clonedUpdatedPerson.length = 0;
                this.applyNowState?.houseHoldDetails.houseHoldPersons!.forEach((person: IHouseHold) => {
                    const clonedPerson = { ...person };
                    clonedPerson.benefitsNotReceivedInformation = {
                        benefits: [],
                        hasAppliedForBenefitButNotReceived: 'N'
                    };
                    clonedUpdatedPerson.push(clonedPerson);
                });
            }
            if (selectedPaths.unchecked.includes('familyplanningservices')) {
                clonedUpdatedPerson.length = 0;
                this.applyNowState?.houseHoldDetails.houseHoldPersons!.forEach((person: IHouseHold) => {
                    const clonedPerson = { ...person };
                    clonedPerson.reviewedForFamilyPlanningServices = undefined;
                    clonedPerson.agreeToFamilyPlanningServiceOnly = undefined;
                    clonedPerson.isAfraidOfPhysicalOrEmotionalOrOtherHarm = undefined;
                    clonedUpdatedPerson.push(clonedPerson);
                });
            }
            if (selectedPaths.unchecked.includes('supplementalsecurityincome')) {
                let householdHasAnyoneReceivedSSIInThePast = {
                    code: true,
                    individualNumbers: [],
                }
                this.service.storeHouseholdHasAnyoneReceivedSSIInThePast(householdHasAnyoneReceivedSSIInThePast);
                clonedUpdatedPerson.length = 0;
                this.applyNowState?.houseHoldDetails.houseHoldPersons!.forEach((person: IHouseHold) => {
                    const clonedPerson = { ...person };
                    clonedPerson.individualExistingBenefits = undefined;
                    clonedUpdatedPerson.push(clonedPerson);
                });
            }
            if (selectedPaths.unchecked.includes('socialsecuritydisability')) {
                let householdHasAnyoneReceivedSSDInThePast = {
                    code: true,
                    individualNumbers: []
                }
                this.service.storeHouseholdHasAnyoneReceivedSSDInThePast(householdHasAnyoneReceivedSSDInThePast);
            }
        });

        if (storedHouseholdDetails) {
            this.service.updateHouseHoldDetails({
                ...storedHouseholdDetails,
                ...{ individualMedicalSituations: selectedPaths, ...{ houseHoldPersons: clonedUpdatedPerson } },
            });
        }

        this.queueService.initDynamicRoutes(
            selectedPaths.checked,
            //Individual gatepost 3 condition
            //R = HA, HC, MCR, MAR, CA, CAR, FP, FPR, MI, SMA, LH, LHP, ECA (FP and FPR removed)
            //O = FS, FSR, ES, ESR
            (this.programSelected.indexOf(Programs.HA) > -1 ||
                this.programSelected.indexOf(Programs.HC) > -1 ||
                this.programSelected.indexOf(Programs.MCR) > -1 ||
                this.programSelected.indexOf(Programs.MAR) > -1  ||
                this.programSelected.indexOf(Programs.CA) > -1  ||
                this.programSelected.indexOf(Programs.CAR) > -1  ||
                this.programSelected.indexOf(Programs.MI) > -1 ||
                this.programSelected.indexOf(Programs.SMA) > -1 ||
                this.programSelected.indexOf(Programs.LH) > -1  ||
                this.programSelected.indexOf(Programs.LHP) > -1  ||
                this.programSelected.indexOf(Programs.ECA) > -1  ||
                this.programSelected.indexOf(Programs.FS) > -1  ||
                this.programSelected.indexOf(Programs.FSR) > -1  ||
                this.programSelected.indexOf(Programs.ES) > -1  ||
                this.programSelected.indexOf(Programs.ESR) > -1) ?
            RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS_INDIVIDUALSLEGALGATEPOST :
            RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS_INDIVIDUALSSUMMARY
        );
        this.queueService.navigateToPath();
    }

    showPreviousPage() {
       // if (this.queueService.state.pageQueue.currentPageId > 0) {
            this.indqueueService.back();

    }
}
