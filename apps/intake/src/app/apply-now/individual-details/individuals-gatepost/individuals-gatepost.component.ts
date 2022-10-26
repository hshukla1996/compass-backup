import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
} from "@angular/core";
import { MenuItemState } from "../../../shared/menu-item-state";
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import { Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import {
    IGeneralDetails,
    IHouseHoldGeneralDetails,
} from "../general-details/state/general-details-model";
import { IApplyNowState, Programs } from "../../+state/apply-now.models";
import { Subscription } from "rxjs";
import { RoutePath } from "../../../shared/route-strategies";
import { ApplyNowRaceStrategy } from "../../../shared/route-strategies/apply-now/race";
import { IHouseHold, IHouseHoldDetails } from "../../household/household-model";
import { AppStoreService } from "../../../app-store-service";
import {UtilService} from "../../../shared/services/util.service";
import {ScreenQueueRoutesIndividualSituations, ScreenQueueUtil} from "./individuals-gatepost.paths";
import {INDIVIDUAL_PROGRAMS} from "../../../shared/constants/Individual_Programs_Constants";
//import Validation from './utils/validation';
@Component({
    selector: "compass-ui-race",
    templateUrl: "./individuals-gatepost.component.html",
    styleUrls: ["./individuals-gatepost.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ApplyNowRaceStrategy],
})
export class IndividualsGatepostComponent implements OnInit {
    formchckvalue: FormGroup | any;
    selectedRaces: string[] = [];
    generalDetails: IGeneralDetails | null = null;
    applyNowState: IApplyNowState | undefined;
    storedData: IGeneralDetails | undefined;
    routePath: typeof RoutePath = RoutePath;
    householdHead!: IHouseHold;
    houseHoldPersons: IHouseHold[] = [];
    houseHoldDetails!: IHouseHoldDetails;
    programSelected: any[] = [];
    gatePostData = {
        questionText: "Do these situations apply to anyone in the household?",
        toolTip: "",
        subHeading: "",
        requiredText: "Please select required options",
        questionAnswers: [
            {
                legend: "Is currently a student",
                toolTip: "",
                accordionButton: "",
                accordionData: "",
                show: true,
                isRequired: false,
                disable: false,
                isYesChecked: false,
                isNoChecked: false,
                value: "currentStudent",
            },
            {
                legend: "Is attending a training or education program right now",
                toolTip: "",
                accordionButton: "More Information",
                accordionData:
                    "A training or educational program can be an internship or clinical placement required by a training institution, a 2-year or 4-year post-secondary degree program, adult basic education, or English as a second language.",
                show: true,
                isRequired: false,
                disable: false,
                isYesChecked: false,
                isNoChecked: false,
                value: "educationProgram",
            },
            {
                legend: "Is a veteran, on active military duty, in the national guard, or in the reserves",
                toolTip: "",
                accordionButton: "",
                accordionData: "",
                show: true,
                isRequired: false,
                disable: false,
                isYesChecked: false,
                isNoChecked: false,
                value: "millitaryDuty",
            },
            {
                legend: "Is a spouse, widow(er), or minor child of a United States veteran",
                toolTip: "",
                accordionButton: "",
                accordionData: "",
                show: true,
                isRequired: false,
                disable: false,
                isYesChecked: false,
                isNoChecked: false,
                value: "veteranRelative",
            },
            {
                legend: "Has a representative, power of attorney, or additional contact person",
                toolTip: "",
                accordionButton: "More information",
                accordionData:
                    "You can allow a trusted person to: \n" +
                    "•\tTalk to us about this application\n" +
                    "•\tSee your information\n" +
                    "•\tAct for you on matters related to this application\n" +
                    "•\tGet information about your application\n" +
                    "•\tSign your application for you\n",
                show: true,
                isRequired: false,
                disable: false,
                isYesChecked: false,
                isNoChecked: false,
                value: "hasReprestative",
            },
            {
                legend: "Is Pregnant",
                toolTip: "",
                accordionButton: "",
                accordionData: "",
                show: true,
                isRequired: false,
                disable: false,
                isYesChecked: false,
                isNoChecked: false,
                value: "isPregnant",
            },
            {
                legend: "Is planning on filing a federal income tax return",
                toolTip: "",
                accordionButton: "",
                accordionData: "",
                show: true,
                isRequired: false,
                disable: false,
                isYesChecked: false,
                isNoChecked: false,
                value: "filingIncomeTax",
            },
            {
                legend: "Will be claimed as a tax dependent",
                toolTip: "",
                accordionButton: "",
                accordionData: "",
                show: true,
                isRequired: false,
                disable: false,
                isYesChecked: false,
                isNoChecked: false,
                value: "taxDependent",
            },
            {
                legend: "Is experiencing domestic violence",
                toolTip: "",
                accordionButton: "More Information",
                accordionData:
                    "Domestic and other violence (domestic violence) – may include any of the following:\n" +
                    "•\tA physical act that results in, or threatens to result in, physical injury to the individual who may or may not be a victim or survivor of domestic violence\n" +
                    "•\tMental abuse, stalking, threats to kidnap, kill or otherwise harm people or property, threats to commit suicide, repeated use of degrading or coercive language, controlling access to food or sleep and controlling or withholding access to economic and social resources\n" +
                    "•\tSexual abuse, victims of sexual harassment, sexual assault\n" +
                    "•\tSexual activity involving a dependent child\n" +
                    "•\tBeing forced as the caretaker or relative of a dependent child to engage in nonconsensual sexual acts or activities\n" +
                    "•\tA threat of, or attempt at, physical or sexual abuse\n" +
                    "•\tNeglect or deprivation of medical care\n",
                show: true,
                isRequired: false,
                disable: false,
                isYesChecked: false,
                isNoChecked: false,
                value: "domesticViolence",
            },
            {
                legend: "Is homeless",
                toolTip: "",
                accordionButton: "",
                accordionData: "",
                show: true,
                isRequired: false,
                disable: false,
                isYesChecked: false,
                isNoChecked: false,
                value: "isHomeless",
            },
            {
                legend: "Is a migrant or seasonal farm worker",
                toolTip: "",
                accordionButton: "",
                accordionData: "",
                show: true,
                isRequired: false,
                disable: false,
                isYesChecked: false,
                isNoChecked: false,
                value: "migrantWorker",
            },
            {
                legend: "Is a part of federally recognized tribe",
                toolTip: "",
                accordionButton: "More information",
                accordionData:
                    "American Indians and Alaskan Natives can receive services from the Indian Health Services, tribal health programs, or urban Indian health programs. They may not have to pay cost sharing and may get special monthly enrollment periods.",
                show: true,
                isRequired: false,
                disable: false,
                isYesChecked: false,
                isNoChecked: false,
                value: "isFedTribe",
            },
            {
                legend: "Has been issued a summons or warrant to appear as a defendant at a criminal court proceeding",
                toolTip: "",
                accordionButton: "",
                accordionData: "",
                show: true,
                isRequired: false,
                disable: false,
                isYesChecked: false,
                isNoChecked: false,
                value: "issuedSummons",
            },
        ],
    };

    constructor(
        private fb: FormBuilder,
        private route: Router,
        private service: ApplyNowStoreService,
        private cd: ChangeDetectorRef,
        private queueService: ScreenQueueUtil,
        private appService: AppStoreService,
        private router: Router,
        private routingStratagy: ApplyNowRaceStrategy,
        private activedRoute: ActivatedRoute,
        private utilService: UtilService
    ) {

    }

    ngOnInit()
    {
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        this.programSelected = (this.service?.getBenefits() as string[]) || [];
        let houseHoldPersons =
            this.service.getHouseHoldDetails.houseHoldPersons;
        let checkFemale = houseHoldPersons?.filter(
            (person) =>
                person.gender === "F" &&
                this.getAge(person.dateOfBirth) > 9 &&
                this.getAge(person.dateOfBirth) < 60
        );
        let checkAge = houseHoldPersons?.filter(
            (person) => this.getAge(person.dateOfBirth) > 18
        );
        let checkTribe = houseHoldPersons?.filter((person) =>{
            const raceInfo=person.raceInformation as any[];
            if (raceInfo) {
                return (raceInfo.findIndex((race: any) => race == "3") > -1);
            } else {
                return -1;
            }
        })
        const CI = this.houseHoldDetails.selectedForChildCareCost.length > 0;
        this.gatePostData.questionAnswers.forEach((service, i) => {
            if (
                this.houseHoldDetails.individualSituations?.checked?.indexOf(
                    service.value
                ) > -1
            ) {
                service.isYesChecked = true;
            } else if (
                this.houseHoldDetails.individualSituations?.unchecked?.indexOf(
                    service.value
                ) > -1
            ) {
                service.isNoChecked = true;
            }
            if (CI && i === 1) service.isRequired = true;
        });
        //Is currently a student
        //O = FS, FSR, HC, HA, MAR, MCR, CHR, CA, CAR, CI, CIR
        if (
            this.programSelected.indexOf(Programs.FS) > -1 ||
            this.programSelected.indexOf(Programs.FSR) > -1 ||
            this.programSelected.indexOf(Programs.HC) > -1 ||
            this.programSelected.indexOf(Programs.HA) > -1 ||
            this.programSelected.indexOf(Programs.MAR) > -1 ||
            this.programSelected.indexOf(Programs.MCR) > -1 ||
            this.programSelected.indexOf(Programs.CHR) > -1 ||
            this.programSelected.indexOf(Programs.CA) > -1 ||
            this.programSelected.indexOf(Programs.CAR) > -1 ||
            this.programSelected.indexOf(Programs.CI) > -1 ||
            this.programSelected.indexOf(Programs.CIR) > -1
        ) {
            this.gatePostData.questionAnswers[0].show = true;
        } else {
            this.gatePostData.questionAnswers[0].show = false;
        }
        //Is attending a training or education program right now
        //R = CI, CIR
        if (
            this.programSelected.indexOf(Programs.CI) > -1 ||
            this.programSelected.indexOf(Programs.CIR) > -1
        ) {
            this.gatePostData.questionAnswers[1].isRequired = true;
            this.gatePostData.questionAnswers[1].show = true;
        } else {
            this.gatePostData.questionAnswers[1].show = false;
        }
        //Is a veteran, on active military duty, in the national guard, or in the reserves
        //R = CA, CAR, LN, LI, WN, WNR, WAR, LIR, LNR, LH, LHP, CI, CIR, LW
        //O = FS
        if (
            this.programSelected.indexOf(Programs.CA) > -1 ||
            this.programSelected.indexOf(Programs.CAR) > -1 ||
            this.programSelected.indexOf(Programs.LN) > -1 ||
            this.programSelected.indexOf(Programs.LI) > -1 ||
            this.programSelected.indexOf(Programs.WN) > -1 ||
            this.programSelected.indexOf(Programs.WNR) > -1 ||
            this.programSelected.indexOf(Programs.WAR) > -1 ||
            this.programSelected.indexOf(Programs.LIR) > -1 ||
            this.programSelected.indexOf(Programs.LNR) > -1 ||
            this.programSelected.indexOf(Programs.LH) > -1 ||
            this.programSelected.indexOf(Programs.LHP) > -1 ||
            this.programSelected.indexOf(Programs.CI) > -1 ||
            this.programSelected.indexOf(Programs.CIR) > -1 ||
            this.programSelected.indexOf(Programs.LW) > -1
        ) {
            this.gatePostData.questionAnswers[2].isRequired = true;
            this.gatePostData.questionAnswers[2].show = true;
        } else if (this.programSelected.indexOf(Programs.FS) > -1) {
            this.gatePostData.questionAnswers[2].show = true;
        } else {
            this.gatePostData.questionAnswers[2].show = false;
        }
        //Is a spouse, widow(er), or minor child of a United Stated veteran
        //R = CA, CAR, LN, LI, WN, WNR, WAR, LIR, LNR, LH, LHP, LW
        //O = FS
        if (
            this.programSelected.indexOf(Programs.CA) > -1 ||
            this.programSelected.indexOf(Programs.CAR) > -1 ||
            this.programSelected.indexOf(Programs.LN) > -1 ||
            this.programSelected.indexOf(Programs.LI) > -1 ||
            this.programSelected.indexOf(Programs.WN) > -1 ||
            this.programSelected.indexOf(Programs.WNR) > -1 ||
            this.programSelected.indexOf(Programs.WAR) > -1 ||
            this.programSelected.indexOf(Programs.LIR) > -1 ||
            this.programSelected.indexOf(Programs.LNR) > -1 ||
            this.programSelected.indexOf(Programs.LH) > -1 ||
            this.programSelected.indexOf(Programs.LHP) > -1 ||
            this.programSelected.indexOf(Programs.LW) > -1
        ) {
            this.gatePostData.questionAnswers[3].isRequired = true;
            this.gatePostData.questionAnswers[3].show = true;
        } else if (this.programSelected.indexOf(Programs.FS) > -1) {
            this.gatePostData.questionAnswers[3].show = true;
        } else {
            this.gatePostData.questionAnswers[3].show = false;
        }
        //Has a representative, power of attorney, or additional contact person
        //O = LN, LI, WN, WNR, WAR, LIR, LNR, HA, HC, MCR, MAR, CHR, CA, CAR, FP, FPR (FP and FPR removed)
        if (
            this.programSelected.indexOf(Programs.LN) > -1 ||
            this.programSelected.indexOf(Programs.LI) > -1 ||
            this.programSelected.indexOf(Programs.WN) > -1 ||
            this.programSelected.indexOf(Programs.WNR) > -1 ||
            this.programSelected.indexOf(Programs.WAR) > -1 ||
            this.programSelected.indexOf(Programs.LIR) > -1 ||
            this.programSelected.indexOf(Programs.LNR) > -1 ||
            this.programSelected.indexOf(Programs.HA) > -1 ||
            this.programSelected.indexOf(Programs.HC) > -1 ||
            this.programSelected.indexOf(Programs.MCR) > -1 ||
            this.programSelected.indexOf(Programs.MAR) > -1 ||
            this.programSelected.indexOf(Programs.CHR) > -1 ||
            this.programSelected.indexOf(Programs.CA) > -1 ||
            this.programSelected.indexOf(Programs.CAR) > -1
        ) {
            this.gatePostData.questionAnswers[4].show = true;
        } else {
            this.gatePostData.questionAnswers[4].show = false;
        }
        //Is pregnant
        //R = HC, HA, MAR, MCR, CHR, ABR, CA, CAR, FP, FPR, MI, ECA (FP and FPR removed, ABR not available)
        //O = PE
        if (
            checkFemale!.length !== 0 &&
            (this.programSelected.indexOf(Programs.HC) > -1 ||
                this.programSelected.indexOf(Programs.HA) > -1 ||
                this.programSelected.indexOf(Programs.MAR) > -1 ||
                this.programSelected.indexOf(Programs.MCR) > -1 ||
                this.programSelected.indexOf(Programs.CHR) > -1 ||
                this.programSelected.indexOf(Programs.CA) > -1 ||
                this.programSelected.indexOf(Programs.CAR) > -1 ||
                this.programSelected.indexOf(Programs.MI) > -1 ||
                this.programSelected.indexOf(Programs.ECA) > -1)
        ) {
            this.gatePostData.questionAnswers[5].isRequired = true;
            this.gatePostData.questionAnswers[5].show = true;
        } else if (
            checkFemale!.length !== 0 ||
            this.programSelected.indexOf(Programs.PE) > -1
        ) {
            this.gatePostData.questionAnswers[5].show = true;
        } else {
            this.gatePostData.questionAnswers[5].show = false;
        }
        //Is planning on filing a federal income tax return
        //R = HA, HC, MCR, MAR, CHR, CA, CAR, FP, FPR, PE, MI (FP and FPR removed)
        if (
            this.programSelected.indexOf(Programs.HA) > -1 ||
            this.programSelected.indexOf(Programs.HC) > -1 ||
            this.programSelected.indexOf(Programs.MCR) > -1 ||
            this.programSelected.indexOf(Programs.MAR) > -1 ||
            this.programSelected.indexOf(Programs.CHR) > -1 ||
            this.programSelected.indexOf(Programs.CA) > -1 ||
            this.programSelected.indexOf(Programs.CAR) > -1 ||
            this.programSelected.indexOf(Programs.PE) > -1 ||
            this.programSelected.indexOf(Programs.MI) > -1
        ) {
            this.gatePostData.questionAnswers[6].isRequired = true;
            this.gatePostData.questionAnswers[6].show = true;
        } else {
            this.gatePostData.questionAnswers[6].show = false;
        }
        //Will be claimed as a tax dependent
        //R = HA, HC, MCR, MAR, CHR, CA, CAR, FP, FPR, PE, MI (FP and FPR removed)
        if (
            this.programSelected.indexOf(Programs.HA) > -1 ||
            this.programSelected.indexOf(Programs.HC) > -1 ||
            this.programSelected.indexOf(Programs.MCR) > -1 ||
            this.programSelected.indexOf(Programs.MAR) > -1 ||
            this.programSelected.indexOf(Programs.CHR) > -1 ||
            this.programSelected.indexOf(Programs.CA) > -1 ||
            this.programSelected.indexOf(Programs.CAR) > -1 ||
            this.programSelected.indexOf(Programs.PE) > -1 ||
            this.programSelected.indexOf(Programs.MI) > -1
        ) {
            this.gatePostData.questionAnswers[7].isRequired = true;
            this.gatePostData.questionAnswers[7].show = true;
        } else {
            this.gatePostData.questionAnswers[7].show = false;
        }
        //Is experiencing domestic violence
        //R = CI, CIR
        if (
            this.programSelected.indexOf(Programs.CI) > -1 ||
            this.programSelected.indexOf(Programs.CIR) > -1
        ) {
            this.gatePostData.questionAnswers[8].isRequired = true;
            this.gatePostData.questionAnswers[8].show = true;
        } else if (
            checkAge?.length !== 0 &&
            (this.programSelected.indexOf(Programs.CI) > -1 ||
                this.programSelected.indexOf(Programs.CIR) > -1)
        ) {
            this.gatePostData.questionAnswers[8].show = true;
        } else {
            this.gatePostData.questionAnswers[8].show = false;
        }
        //Is homeless
        //R = BL, CI, CIR
        if (
            this.programSelected.indexOf(Programs.BL) > -1 ||
            this.programSelected.indexOf(Programs.CI) > -1 ||
            this.programSelected.indexOf(Programs.CIR) > -1
        ) {
            this.gatePostData.questionAnswers[9].isRequired = true;
            this.gatePostData.questionAnswers[9].show = true;
        } else {
            this.gatePostData.questionAnswers[9].show = false;
        }
        //Is a migrant or seasonal farm worker
        //R = BL
        //O = FS, ES
        if (this.programSelected.indexOf(Programs.BL) > -1) {
            this.gatePostData.questionAnswers[10].isRequired = true;
            this.gatePostData.questionAnswers[10].show = true;
        } else if (
            this.programSelected.indexOf(Programs.FS) > -1 ||
            this.programSelected.indexOf(Programs.ES) > -1
        ) {
            this.gatePostData.questionAnswers[10].show = true;
        } else {
            this.gatePostData.questionAnswers[10].show = false;
        }
        //Is part of a federally recognized tribe
        //O = HA, HC, MAR, MCR, CHR, CA, LN, LNR, LI, LIR, FP, FPR, WN, WNR (FP and FPR removed)
        if (
            checkTribe?.length !== 0 &&
            (this.programSelected.indexOf(Programs.HA) > -1 ||
                this.programSelected.indexOf(Programs.HC) > -1 ||
                this.programSelected.indexOf(Programs.MAR) > -1 ||
                this.programSelected.indexOf(Programs.MCR) > -1 ||
                this.programSelected.indexOf(Programs.CHR) > -1 ||
                this.programSelected.indexOf(Programs.CA) > -1 ||
                this.programSelected.indexOf(Programs.LN) > -1 ||
                this.programSelected.indexOf(Programs.LNR) > -1 ||
                this.programSelected.indexOf(Programs.LI) > -1 ||
                this.programSelected.indexOf(Programs.LIR) > -1 ||
                this.programSelected.indexOf(Programs.WN) > -1 ||
                this.programSelected.indexOf(Programs.WNR) > -1)
        ) {
            this.gatePostData.questionAnswers[11].show = true;
        } else {
            this.gatePostData.questionAnswers[11].show = false;
        }
        //Has been issued a summons or warrant to appear as a defendant at a criminal court proceeding
        //R = CA, CAR, CI, CIR, ECA
        //O = FS, FSR
        if (
            this.programSelected.indexOf(Programs.CA) > -1 ||
            this.programSelected.indexOf(Programs.CAR) > -1 ||
            this.programSelected.indexOf(Programs.CI) > -1 ||
            this.programSelected.indexOf(Programs.CIR) > -1 ||
            this.programSelected.indexOf(Programs.ECA) > -1
        ) {
            this.gatePostData.questionAnswers[12].isRequired = true;
            this.gatePostData.questionAnswers[12].show = true;
        } else if (
            this.programSelected.indexOf(Programs.FS) > -1 ||
            this.programSelected.indexOf(Programs.FSR) > -1
        ) {
            this.gatePostData.questionAnswers[12].show = true;
        } else {
            this.gatePostData.questionAnswers[12].show = false;
        }
    }

    public getAge(dateString: any): any {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    public showPreviousPage() {
        //this.router.navigate([this.routingStratagy.previousRoute()]);

      if( this.programSelected.indexOf(Programs.BL) > -1) {
        this.route.navigate([
          RoutePath.APPLYNOW +
          "/" +
          RoutePath.APPLYNOW_INDIVIDUALDETAILS +
          "/" +
          RoutePath.APPLYNOW_NSLP_SUMMARY,
        ]);
      }
      else {
        this.route.navigate([
          RoutePath.APPLYNOW +
          "/" +
          RoutePath.APPLYNOW_INDIVIDUALDETAILS +
          "/" +
          RoutePath.APPLYNOW_DEMOGRAPHIC_SUMMARY,
        ]);
      }
    }

    showNextPage(selectedItems: any) {
        // console.log("selected Items");
        // console.log(selectedItems.questionAnswers);
        const storedHouseholdDetails = this.houseHoldDetails;
        const selectedPaths: any = {
            checked: [],
            unchecked: [],
        };
        selectedItems.questionAnswers.forEach((item: any) => {
            if (item.isYesChecked) {
                selectedPaths.checked.push(item.value);
            } else if (item.isNoChecked) {
                selectedPaths.unchecked.push(item.value);
            }
        });
      const  updatedHouseholdPersons = storedHouseholdDetails.houseHoldPersons?.map((ind,i)=>{
        const updatedPerson = {...ind}
        if(selectedPaths.checked.indexOf(ScreenQueueRoutesIndividualSituations.currentStudent) < 0) {
          updatedPerson.currentEducation = undefined;
        }
        if(selectedPaths.checked.indexOf(ScreenQueueRoutesIndividualSituations.educationProgram) < 0) {
          updatedPerson.trainingInformation = undefined;
        }
        if(selectedPaths.checked.indexOf(ScreenQueueRoutesIndividualSituations.millitaryDuty) < 0) {
          updatedPerson.veteran = undefined;
        }
        if(selectedPaths.checked.indexOf(ScreenQueueRoutesIndividualSituations.veteranRelative) < 0) {
          updatedPerson.veteranRelationInformation = undefined;
        }
        if(selectedPaths.checked.indexOf(ScreenQueueRoutesIndividualSituations.hasReprestative) < 0) {
          updatedPerson.representativeContactInformation = undefined;
        }
        return updatedPerson;

      })
        console.log(selectedPaths);
        if (storedHouseholdDetails) {
            this.service.updateHouseHoldDetails({
                ...storedHouseholdDetails,
                ...{ individualSituations: selectedPaths },
              ...{ houseHoldPersons: updatedHouseholdPersons },
            });
        }

        this.queueService.initDynamicRoutes(
            selectedPaths.checked,
            //Individual gatepost 2 condition
            //R and O = HA, HC, MCR, MAR, CA, CAR, CI, CIR, MI, FS, FSR, ES, ESR, CHR, LN, LI, WAR, WN, WNR, LIR
            this.programSelected.indexOf(Programs.HA) > -1 ||
                this.programSelected.indexOf(Programs.HC) > -1 ||
                this.programSelected.indexOf(Programs.MCR) > -1 ||
                this.programSelected.indexOf(Programs.MAR) > -1 ||
                this.programSelected.indexOf(Programs.CA) > -1 ||
                this.programSelected.indexOf(Programs.CAR) > -1 ||
                this.programSelected.indexOf(Programs.CI) > -1 ||
                this.programSelected.indexOf(Programs.CIR) > -1 ||
                this.programSelected.indexOf(Programs.MI) > -1 ||
                this.programSelected.indexOf(Programs.FS) > -1 ||
                this.programSelected.indexOf(Programs.FSR) > -1 ||
                this.programSelected.indexOf(Programs.ES) > -1 ||
                this.programSelected.indexOf(Programs.ESR) > -1 ||
                this.programSelected.indexOf(Programs.CHR) > -1 ||
                this.programSelected.indexOf(Programs.LN) > -1 ||
                this.programSelected.indexOf(Programs.LI) > -1 ||
                this.programSelected.indexOf(Programs.WAR) > -1 ||
                this.programSelected.indexOf(Programs.WN) > -1 ||
                this.programSelected.indexOf(Programs.WNR) > -1 ||
                this.programSelected.indexOf(Programs.LIR) > -1
                ? RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                      "/" +
                      RoutePath.APPLYNOW_INDIVIDUALDETAILS_INDIVIDUALSMEDICALGATEPOST
                : //Individual gatepost 3 condition
                //R = HA, HC, MCR, MAR, CA, CAR, FP, FPR, MI, SMA, LH, LHP, ECA (FP and FPR removed)
                //O = FS, FSR, ES, ESR
                this.programSelected.indexOf(Programs.HA) > -1 ||
                  this.programSelected.indexOf(Programs.HC) > -1 ||
                  this.programSelected.indexOf(Programs.MCR) > -1 ||
                  this.programSelected.indexOf(Programs.MAR) > -1 ||
                  this.programSelected.indexOf(Programs.CA) > -1 ||
                  this.programSelected.indexOf(Programs.CAR) > -1 ||
                  this.programSelected.indexOf(Programs.MI) > -1 ||
                  this.programSelected.indexOf(Programs.SMA) > -1 ||
                  this.programSelected.indexOf(Programs.LH) > -1 ||
                  this.programSelected.indexOf(Programs.LHP) > -1 ||
                  this.programSelected.indexOf(Programs.ECA) > -1 ||
                  this.programSelected.indexOf(Programs.FS) > -1 ||
                  this.programSelected.indexOf(Programs.FSR) > -1 ||
                  this.programSelected.indexOf(Programs.ES) > -1 ||
                  this.programSelected.indexOf(Programs.ESR) > -1
                ? RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                  "/" +
                  RoutePath.APPLYNOW_INDIVIDUALDETAILS_INDIVIDUALSLEGALGATEPOST
                : RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                  "/" +
                  RoutePath.APPLYNOW_INDIVIDUALDETAILS_INDIVIDUALSSUMMARY
        );
        this.queueService.navigateToPath();
        //  this.route.navigate([
        //      RoutePath.APPLYNOW +
        //          "/" +
        //          RoutePath.APPLYNOW_INDIVIDUALDETAILS +
        //          "/" +
        //           RoutePath.APPLYNOW_WHO_CURRENT_STUDENT,
        //   ]);
    }

    // private initializeData(selectedPath: any): void {
    //     let storedHouseholdDetails = this.applyNowState?.houseHoldDetails;
    //     selectedPath.unchecked.forEach((path: any) => {
    //         if (path === ScreenQueueRoutesIndividualSituations.isPregnant){
    //                 storedHouseholdDetails = storedHouseholdDetails?.houseHoldPersons?.map((x) => {
    //                         x.isPregnant
    //                 })
    //         }
    //     })
    // }
}
