import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { HouseholdFormDataService } from "../services/household-form-data.service";
import { HouseholdGatepost } from "../models/householdGatepost";
import {
    FormGroup,
    FormControl,
    ReactiveFormsModule,
    FormBuilder,
    FormArray,
} from "@angular/forms";
import { ApplyNowHouseholdGatepostStrategy } from "../../../shared/route-strategies/apply-now/householdGatepost";
import { IApplyNowState, Programs } from "../../+state/apply-now.models";
import { Router } from "@angular/router";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { AppStoreService } from "../../../app-store-service";
// import { IHouseholdGatepost } from "../household-model";
// import { ScreenQueueUtil } from "../../../shared/services/screen_queue_util.service";
import {
    ScreenQueueRouteNameHousehold,
    ScreenQueueUtil,
} from "../../../shared/services/screen_queue_util.service";
import { RoutePath } from "../../../shared/route-strategies";

@Component({
    selector: "compass-ui-household-gatepost",
    templateUrl: "./household-gatepost.component.html",
    styleUrls: ["./household-gatepost.component.scss"],
    providers: [ApplyNowHouseholdGatepostStrategy],
})
export class HouseholdGatepostComponent implements OnInit {
    applyNowState!: IApplyNowState;
    sevicesselected: Array<any> = [];
    showAppliedBenefits = true;
    intermediateCareFacility = true;
    appliedOrReceivedBenefits = true;
    everReceivedMedicalAssistanceCashAssistance = true;
    hadOrWillReceiveSNAPbenefits = true;
    disqualifiedFromReceivingSNAPbenefits = true;
    letSomeoneElseReceiveyourSNAP = true;
    areYouWantToApplyLTC: any;

    gatePostData = {
        questionText: "Do any of these apply to anyone in the household?",
        toolTip:"",
        subHeading: "Select all that apply.",
        requiredText: "Please select required options",
        questionAnswers: [
            {
                legend: "Applied for benefits with a different name or social security number",
                toolTip: "",
                accordionButton: "",
                accordionData: "",
                show: true,
                isRequired: false,
                disable: false,
                isYesChecked: false,
                isNoChecked: false,
                value: "ssnbenefits",
            },
            {
                legend: "All members of the household are applying for Intermediate Care Facility",
                toolTip: "",
                accordionButton: "",
                accordionData: "",
                show: true,
                isRequired: false,
                disable: false,
                isYesChecked: false,
                isNoChecked: false,
                value: "intermediateCare",
            },
            {
                legend: "Applied for or received benefits in another state",
                toolTip: "",
                accordionButton: "",
                accordionData: "",
                show: true,
                isRequired: false,
                disable: false,
                isYesChecked: false,
                isNoChecked: false,
                value: "otherStatesBenefits",
            },
            {
                legend: "Ever received Medical Assistance, Cash Assistance, or SNAP (formerly known as Food Stamps) benefits in Pennsylvania",
                toolTip: "",
                accordionButton: "",
                accordionData: "",
                show: true,
                isRequired: false,
                disable: false,
                isYesChecked: false,
                isNoChecked: false,
                value: "pnBenefits",
            },
            {
                legend: "Had, or will receive, SNAP (Food Stamps) benefits from any state this month",
                toolTip: "",
                accordionButton: "",
                accordionData: "",
                show: true,
                isRequired: false,
                disable: false,
                isYesChecked: false,
                isNoChecked: false,
                value: "SNAPbenefits",
            },
            {
                legend: "Been disqualified or agreed to be disqualified from receiving SNAP (Food Stamps) benefits or Cash Assistance in another state",
                toolTip: "",
                accordionButton: "",
                accordionData: "",
                show: true,
                isRequired: false,
                disable: false,
                isYesChecked: false,
                isNoChecked: false,
                value: "disqBenefits",
            },
            {
                legend: "Would like to let someone else receive your SNAP (Food Stamps) benefits for you",
                toolTip: "",
                accordionButton: "",
                accordionData: "",
                show: true,
                isRequired: false,
                disable: false,
                isYesChecked: false,
                isNoChecked: false,
                value: "someoneElseBenefits",
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
        private routingStratagy: ApplyNowHouseholdGatepostStrategy
    ) { }

    ngOnInit() {
        this.service.getAppData().subscribe((d) => {
            this.applyNowState = { ...d };
            this.cd.detectChanges();
        });

            this.sevicesselected = this.service.getProgramSelection || [];
            let gpServices = new Array();
            gpServices = JSON.parse(localStorage.getItem("householdGP") || "{}")

              const applyLTCValue =
                  this.service.getHouseHoldDetails?.areYouWantToApplyLTC ?? "";
             this.areYouWantToApplyLTC = (applyLTCValue !== "" && applyLTCValue == 'N') ? false : true;
//  console.log("ltc",this.areYouWantToApplyLTC)
            for (const selectedService of this.gatePostData['questionAnswers']) {
                for (const index in gpServices) {
                    if (selectedService['value'] === gpServices[index]) {
                        selectedService["isYesChecked"] = false;
                        //selectedService["isNoChecked"] = true;
                    }
                }
            }
            // ['healthcareCoverage', 'FoodAssistance', 'CashAssistance', 'ChildCareCost', 'FreeSchoolMeals', 'HeatingBill', 'PayingYourWaterBill', 'HomeorCommunityFacility']
            //programs: ["HC", "FS", "CA", "CI", "BL", "LH", "LW", "WN"]

            //Applied for benefits with a different name or social security number
            //R = HA, CA, CAR, LN, LI, WN, WNR, WAR
            //O = FS, FSR
            // console.log("--",this.sevicesselected)
            if (
                this.sevicesselected.indexOf(Programs.HA) > -1 ||
                this.sevicesselected.indexOf(Programs.CA) > -1 ||
                this.sevicesselected.indexOf(Programs.CAR) > -1 ||
                this.sevicesselected.indexOf(Programs.LN) > -1 ||
                this.sevicesselected.indexOf(Programs.LI) > -1 ||
                this.sevicesselected.indexOf(Programs.WN) > -1 ||
                this.sevicesselected.indexOf(Programs.WNR) > -1 ||
                this.sevicesselected.indexOf(Programs.WAR) > -1 
            ) {
                //  this.showAppliedBenefits = true;
                this.gatePostData.questionAnswers[0].isRequired = true;
                this.gatePostData.questionAnswers[0].show = true;
            }
            else if (this.sevicesselected.indexOf(Programs.FS) > -1 ||
                this.sevicesselected.indexOf(Programs.FSR) > -1) {
                    this.gatePostData.questionAnswers[0].show = true;
                }
            else {
                this.gatePostData.questionAnswers[0].show = false;
            }

            //All members of the household are applying for Intermediate Care Facility
            //R = LN, LI, WN, WNR
            if (

                this.sevicesselected.indexOf(Programs.LN) > -1 ||
                this.sevicesselected.indexOf(Programs.LI) > -1 ||
                this.sevicesselected.indexOf(Programs.WN) > -1 ||
                this.sevicesselected.indexOf(Programs.WNR) > -1
            ) {
                this.gatePostData.questionAnswers[1].isRequired = true;
                this.gatePostData.questionAnswers[1].show = true;
            }
            else {
                this.gatePostData.questionAnswers[1].show = false;
            }

            //Applied for or received benefits in another state
            //R = CA, LN, LI, WN, WNR, WAR, ECA
            //O = FS, HA
            if (
                this.sevicesselected.indexOf(Programs.CA) > -1 ||
                this.sevicesselected.indexOf(Programs.LN) > -1 ||
                this.sevicesselected.indexOf(Programs.LI) > -1 ||
                this.sevicesselected.indexOf(Programs.WN) > -1 ||
                this.sevicesselected.indexOf(Programs.WNR) > -1 ||
                this.sevicesselected.indexOf(Programs.WAR) > -1 ||
                this.sevicesselected.indexOf(Programs.ECA) > -1
            ) {
                this.gatePostData.questionAnswers[2].isRequired = true;
                this.gatePostData.questionAnswers[2].show = true;
            } else if (
                this.sevicesselected.indexOf(Programs.FS) > -1 ||
                this.sevicesselected.indexOf(Programs.HA) > -1
            ) {
                this.gatePostData.questionAnswers[2].show = true;
            } else {
                this.gatePostData.questionAnswers[2].show = false;
            }

            //Ever received Medical Assistance, Cash Assistance, or SNAP (formerly known as Food Stamps) benefits in Pennsylvania
            //O = CA, FS, ECA
            if (
                this.sevicesselected.indexOf(Programs.CA) > -1 ||
                this.sevicesselected.indexOf(Programs.FS) > -1 ||
                this.sevicesselected.indexOf(Programs.ECA) > -1
            ) {
                this.gatePostData.questionAnswers[3].show = true;
            }
            else {
                this.gatePostData.questionAnswers[3].show = false;
            }
            
            //Had, or will receive, SNAP benefits from any state this month
            //O = FS, ES
             if (
                this.sevicesselected.indexOf(Programs.FS) > -1 ||
                this.sevicesselected.indexOf(Programs.ES) > -1
            ) {
                this.gatePostData.questionAnswers[4].show = true;
            }
            else {
                this.gatePostData.questionAnswers[4].show = false;
            }
           
            //Been disqualified or agreed to be disqualified from receiving SNAP benefits or Cash Assistance in another state
            //R = CA, CAR
            //O = FS, FSR

            if (
                this.sevicesselected.indexOf(Programs.CA) > -1 ||
                this.sevicesselected.indexOf(Programs.CAR) > -1
            ) {
                this.gatePostData.questionAnswers[5].isRequired = true;
                this.gatePostData.questionAnswers[5].show = true;
            }
            else if (this.sevicesselected.indexOf(Programs.FS) > -1 ||
                this.sevicesselected.indexOf(Programs.FSR) > -1) {
                    this.gatePostData.questionAnswers[5].show = true;
                }
            else {
                this.gatePostData.questionAnswers[5].show = false;
            }

            //Would like to let someone else receive your SNAP benefits for you
            //O = FS, FSR, ES, ESR
            if (
                this.sevicesselected.indexOf(Programs.FS) > -1 ||
                this.sevicesselected.indexOf(Programs.FSR) > -1 ||
                this.sevicesselected.indexOf(Programs.ES) > -1 ||
                this.sevicesselected.indexOf(Programs.ESR) > -1
            ) {
                this.gatePostData.questionAnswers[6].show = true;
            }
            else {
                this.gatePostData.questionAnswers[6].show = false;
            }
            this.cd.detectChanges();
            const gpServices1 =
                this.applyNowState.houseHoldDetails.householdGatepostValue;
                if (gpServices1) {
                    this.gatePostData.questionAnswers.forEach((service) => {
                        if (service.show) {
                            if (gpServices1.checked.indexOf(service.value) > -1) {
                                service.isYesChecked = true;
                                service.isNoChecked = false;
                            } else if (gpServices1.unchecked.indexOf(service.value) > -1) {
                                service.isYesChecked = false;
                                service.isNoChecked = true;
                            }
                        }
                    });
                }

    }

    public showPreviousPage() {
        if (this.areYouWantToApplyLTC) {
            this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDLIVINGSIS])
            // this.queueService.back()
        } 
        else if (this.sevicesselected.indexOf(Programs.LW) > -1) {
            this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDWATERQUES])
        } 
        else if (this.sevicesselected.indexOf(Programs.LH) > -1) {
            this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDELECTRICPROVIDER])
        } 
        else if (this.sevicesselected.indexOf(Programs.WN) > -1) {
            this.router.navigate([RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDLIVINGSIS])
        }
        else if (this.sevicesselected.length === 1 && this.sevicesselected.indexOf(Programs.FS) > -1){
            this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDQUICKSNAPEND])
        } 
        else {
            this.router.navigate([this.routingStratagy.previousRoute()]);
        }
    }

    showNextPage(selectedItems: any) {
        const storedHouseholdDetails = this.applyNowState?.houseHoldDetails;
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
        // console.log(selectedPaths, "sjfajvbv===", selectedItems);

        //    this.service.updateHouseholdServicesSelected(selectedPaths);
        // localStorage.setItem("householdGP", JSON.stringify(selectedPaths));
        if (storedHouseholdDetails) {
            this.service.updateHouseHoldDetails({
                ...storedHouseholdDetails,
                ...{ householdGatepostValue: selectedPaths },
            });
        }
        this.queueService.initDynamicRoutes(
            selectedPaths.checked,
            RoutePath.APPLYNOW_HOUSEHOLD +
            "/" +
            RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDMEMBERSITUATIONGATEPOST,
        );
        this.queueService.navigateToPath();
        // console.log("selected itemsh", selectedItems);
        // console.log("selected Items");
        // console.log(selectedItems.questionAnswers);
        // const selectedPaths:string[] = []
        // selectedItems.questionAnswers.forEach((item:any)=>{
        //     if(item.isYesChecked){
        //       selectedPaths.push(item.value)
        //     }
        // })
        // console.log(selectedPaths)
        // this.queueService.initDynamicRoutes(selectedPaths,null, 'individualSituations');
        //  this.queueService.navigateToPath();
        // this.router.navigate([
        // RoutePath.APPLYNOW +
        // "/" +
        // RoutePath.APPLYNOW_INDIVIDUALDETAILS +
        // "/" +
        // RoutePath.
        // ]);

        var x = "householdGatepost";
        sessionStorage.setItem("routingPath", x);
    }
   
}
