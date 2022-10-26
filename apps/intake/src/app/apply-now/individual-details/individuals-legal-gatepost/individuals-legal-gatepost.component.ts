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
import {ScreenQueueUtil} from "./individuals-legal-gatepost.path";
import JsonData from './individuals-legal-gatepost.json'

@Component({
    selector: "compass-ui-individuals-legal-gatepost",
    templateUrl: "./individuals-legal-gatepost.component.html",
    styleUrls: ["./individuals-legal-gatepost.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndividualsLegalGatepostComponent implements OnInit {
    jsonData: any;
    applyNowState: IApplyNowState | undefined;
    programSelected: any[] = [];

     constructor(
        private router: Router,
        private service: ApplyNowStoreService,
        private cd: ChangeDetectorRef,
        private queueService: ScreenQueueUtil,
     ) {}

    ngOnInit(): void {
        this.jsonData = JsonData;
        this.service.getAppData().subscribe((d) => {
            this.applyNowState = { ...d };
            this.cd.detectChanges();
            this.programSelected = this.service.getProgramSelection || [];

            const gpServices =
                this.applyNowState.houseHoldDetails.individualLegalSituations;

            JsonData.questionAnswers.forEach((service) => {
                if (gpServices.checked !== undefined && gpServices.checked.indexOf(service.value) > -1) {
                    service.isYesChecked = true;
                    service.isNoChecked = false;
                }
                else if (gpServices.unchecked !== undefined && gpServices.unchecked.indexOf(service.value) > -1){
                      service.isYesChecked = false;
                      service.isNoChecked = true;
                }
            });
            //Owes fines, costs, or restitution for a felony or misdemeanor offence 
            //R = CA, CAR, ECA 
            if (
                this.programSelected.indexOf(Programs.CA) > -1 ||
                this.programSelected.indexOf(Programs.CAR) > -1 ||
                this.programSelected.indexOf(Programs.ECA) > -1 
            ) {
                JsonData.questionAnswers[0].isRequired = true;
                JsonData.questionAnswers[0].show = true;
            }
            else {
                JsonData.questionAnswers[0].show = false;
            }
            //Convicted of welfare fraud 
            //R = CA, CAR
            if (
                this.programSelected.indexOf(Programs.CA) > -1 ||
                this.programSelected.indexOf(Programs.CAR) > -1
            ) {
                JsonData.questionAnswers[1].isRequired = true;
                JsonData.questionAnswers[1].show = true;
            }
            else {
                JsonData.questionAnswers[1].show = false;
            }
            //Currently on probation or parole 
            //R = CA, CAR
            if (
                this.programSelected.indexOf(Programs.CA) > -1 ||
                this.programSelected.indexOf(Programs.CAR) > -1
            ) {
                JsonData.questionAnswers[2].isRequired = true;
                JsonData.questionAnswers[2].show = true;
            }
            else {
                JsonData.questionAnswers[2].show = false;
            }
            //Currently fleeing from law enforcement officials
            //R = CA, CAR, LH, LHP 
            //O = FS, FSR, ES, ESR 
            if (
                this.programSelected.indexOf(Programs.CA) > -1 ||
                this.programSelected.indexOf(Programs.CAR) > -1 ||
                this.programSelected.indexOf(Programs.LH) > -1 ||
                this.programSelected.indexOf(Programs.LHP) > -1
            ) {
                JsonData.questionAnswers[3].isRequired = true;
                JsonData.questionAnswers[3].show = true;
            }
            else if (
                this.programSelected.indexOf(Programs.FS) > -1 ||
                this.programSelected.indexOf(Programs.FSR) > -1 ||
                this.programSelected.indexOf(Programs.ES) > -1 ||
                this.programSelected.indexOf(Programs.ESR) > -1
            ) {
                JsonData.questionAnswers[3].show = true;
            }
            else {
                JsonData.questionAnswers[3].show = false;
            }
            //Currently in prison or another correctional facility (Incarcerated) 
            //R = HA, HC, MCR, MAR, CA, CAR, FP, FPR, MI, SMA (FP and FPR removed)
            if (
                this.programSelected.indexOf(Programs.HA) > -1 ||
                this.programSelected.indexOf(Programs.HC) > -1 ||
                this.programSelected.indexOf(Programs.MCR) > -1 ||
                this.programSelected.indexOf(Programs.MAR) > -1 ||
                this.programSelected.indexOf(Programs.CA) > -1 ||
                this.programSelected.indexOf(Programs.CAR) > -1 ||
                this.programSelected.indexOf(Programs.MI) > -1 ||
                this.programSelected.indexOf(Programs.SMA) > -1 
            ) {
                JsonData.questionAnswers[4].isRequired = true;
                JsonData.questionAnswers[4].show = true;
            }
            else {
                JsonData.questionAnswers[4].show = false;
            }
            this.jsonData = JsonData;
        });
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

        const clonedUpdatedPerson: IHouseHold[] = [];
        this.applyNowState?.houseHoldDetails.houseHoldPersons!.forEach((person: IHouseHold) => {
            const clonedPerson = { ...person };
            clonedUpdatedPerson.push(clonedPerson);
        });
        selectedPaths.unchecked.forEach((screen: any) => {
            if (screen === "ownesfines") {
                let whoHasBeenConvictedAFelony = {
                    code: true,
                    individualNumbers: []
                }
                this.service.updateIndividualOwnesFines(whoHasBeenConvictedAFelony);
            }
            if (screen === "convictedwelfarefraud") {
                let whoWasConvictedForWelfareFraud = {
                    code: true,
                    individualNumbers: []
                }
                this.service.updateIndividualConvictedWelfareFraud(whoWasConvictedForWelfareFraud);
            }
            if (screen === "currentlyonprobation") {
                let whoIsOnProbationOrParole = {
                    code: true,
                    individualNumbers: []
                }
                this.service.updateIndividualCurrentlyOnProbation(whoIsOnProbationOrParole);
            }
            if (screen === "currentlyfleeing") {
                let whoIsCurrentlyFleeingFromLawEnforcementOfficials = {
                    code: true,
                    individualNumbers: []
                }
                this.service.updateIndividualCurrentlyFleeing(whoIsCurrentlyFleeingFromLawEnforcementOfficials);
            }
            if (screen === "isAnyoneCurrentlyIncarcerated") {
                let isAnyoneCurrentlyIncarcerated = {
                    code: true,
                    individualNumbers: []
                }
                this.service.updateCurrentlyInPrison(isAnyoneCurrentlyIncarcerated);
                clonedUpdatedPerson.length = 0;
                this.applyNowState?.houseHoldDetails.houseHoldPersons!.forEach((person: IHouseHold) => {
                    const clonedPerson = { ...person };
                    clonedPerson.incarcerated = { countyOfPlacement: '', incarceratedAdmissionDate: '', incarceratedDischargeDate: '' }
                    clonedUpdatedPerson.push(clonedPerson);
                });
            }
        })

        if (storedHouseholdDetails) {
            this.service.updateHouseHoldDetails({
                ...storedHouseholdDetails,
                ...{ individualLegalSituations: selectedPaths, ...{ houseHoldPersons: clonedUpdatedPerson } },
            });
        }

        this.queueService.initDynamicRoutes(
            selectedPaths.checked,
            RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS_INDIVIDUALSSUMMARY
        );
        this.queueService.navigateToPath();
    }

    showPreviousPage() {
        if (this.queueService.state.pageQueue.currentPageId > 0) {
            this.queueService.backPath();
        }
        else {
            this.router.navigate([
            //Individual gatepost 2 condition
            //R and O = HA, HC, MCR, MAR, CA, CAR, CI, CIR, MI, FS, FSR, ES, ESR, CHR, LN, LI, WAR, WN, WNR, LIR
            (this.programSelected.indexOf(Programs.HA) > -1 ||
                this.programSelected.indexOf(Programs.HC) > -1 ||
                this.programSelected.indexOf(Programs.MCR) > -1 ||
                this.programSelected.indexOf(Programs.MAR) > -1  ||
                this.programSelected.indexOf(Programs.CA) > -1  ||
                this.programSelected.indexOf(Programs.CAR) > -1  ||
                this.programSelected.indexOf(Programs.CI) > -1 ||
                this.programSelected.indexOf(Programs.CIR) > -1 ||
                this.programSelected.indexOf(Programs.MI) > -1  ||
                this.programSelected.indexOf(Programs.FS) > -1  ||
                this.programSelected.indexOf(Programs.FSR) > -1  ||
                this.programSelected.indexOf(Programs.ES) > -1  ||
                this.programSelected.indexOf(Programs.ESR) > -1  ||
                this.programSelected.indexOf(Programs.CHR) > -1  ||
                this.programSelected.indexOf(Programs.LN) > -1 ||
                this.programSelected.indexOf(Programs.LI) > -1 ||
                this.programSelected.indexOf(Programs.WAR) > -1 ||
                this.programSelected.indexOf(Programs.WN) > -1 ||
                this.programSelected.indexOf(Programs.WNR) > -1 ||
                this.programSelected.indexOf(Programs.LIR) > -1 
                ) ?
            RoutePath.APPLYNOW + 
            '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + 
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS_INDIVIDUALSMEDICALGATEPOST : 
            //Individual gatepost 1
            RoutePath.APPLYNOW + 
            '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + 
            '/' + RoutePath.APPLYNOW_INDIVIDUAL_GATEPOST]);
        }
    }
}