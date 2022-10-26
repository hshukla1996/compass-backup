import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import JsonData from "./expenses-utility-gatepost.json";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { RoutePath } from "../../../shared/route-strategies";
import { IHouseHold, IHouseHoldDetails } from '../../household/household-model';
import { IApplyNowState, Programs } from '../../+state/apply-now.models';
import { IGeneralDetails } from '../../individual-details/general-details/state/general-details-model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { ScreenQueueUtil } from '../expenses-gatepost/expenses-gatepost.paths'
import { ScreenQueueUtilforExpensesUtility } from './expenses-utility-gatepost.path';
import { AppStoreService } from '../../../app-store-service';

@Component({
    selector: "compass-ui-expenses-utility-gatepost",
    templateUrl: "./expenses-utility-gatepost.component.html",
    styleUrls: ["./expenses-utility-gatepost.component.scss"],
})
export class ExpensesUtilityGatepostComponent implements OnInit {
    formchckvalue: FormGroup | any;
    selectedRaces: string[] = [];
    householdHead!: IHouseHold;
    houseHoldPersons: IHouseHold[] = [];
    houseHoldDetails!: IHouseHoldDetails;
    generalDetails: IGeneralDetails | null = null;
    applyNowState: IApplyNowState | undefined;
    storedData: IGeneralDetails | undefined;
    routePath: typeof RoutePath = RoutePath;
    programSelected: any[] = [];
    // jsonData: any;
    gatePostData = {
        "questionText": "Tell us more about your household's home and utilities expenses.",
        "toolTip": "",
        "subHeading": "Select all that apply for the members of your household.",
        "requiredText": "",
        "questionAnswers": [
            {
                "legend": "Pays for heating or cooling",
                "toolTip": "",
                "accordionButton": "",
                "accordionData": "",
                "show": true,
                "isRequired": false,
                "disable": false,
                "isYesChecked": false,
                "isNoChecked": false,
                "value": "payForHeatingOrCooling"
            },
            {
                "legend": "Gets a heating or cooling bill separate from the rent or mortgage bill",
                "toolTip": "",
                "accordionButton": "",
                "accordionData": "",
                "show": true,
                "isRequired": false,
                "disable": false,
                "isYesChecked": false,
                "isNoChecked": false,
                "value": "doesAnyonePayForRentOrMortgage"
            },
            {
                "legend": "Meals are included in the household rent",
                "toolTip": "",
                "accordionButton": "",
                "accordionData": "",
                "show": true,
                "disable": false,

                "isYesChecked": false,
                "isNoChecked": false,
                "isRequired": false,
                "value": "mealsIncludedInRent"
            },
            {
                "legend": "Pays for rent or mortgage (including lot rent and condo fees)",
                "toolTip": "",
                "accordionButton": "",
                "accordionData": "",
                "show": true,
                "disable": false,
                "isYesChecked": false,
                "isNoChecked": false,
                "isRequired": false,
                "value": "doesAnyonePayForRentOrMortgage"
            },
            {
                "legend": "Pays for city, county, or school property taxes",
                "toolTip": "",
                "accordionButton": "",
                "accordionData": "",
                "show": true,
                "disable": false,
                "isYesChecked": false,
                "isNoChecked": false,
                "isRequired": false,
                "value": "doesAnyonePayForPropertyTaxes"
            },
            {
                "legend": "Pays for homeowner's property insurance",
                "toolTip": "",
                "accordionButton": "",
                "accordionData": "",
                "show": true,
                "disable": false,
                "isYesChecked": false,
                "isNoChecked": false,
                "isRequired": false,
                "value": "doesAnyonePayForHomeInsurance"
            },
            {
                "legend": "Pays for telephone",
                "toolTip": "",
                "accordionButton": "",
                "accordionData": "",
                "show": true,
                "disable": false,
                "isYesChecked": false,
                "isNoChecked": false,
                "isRequired": false,
                "value": "doesAnyonePayForTelephone"
            },
            {
                "legend": "Pays for electric",
                "toolTip": "",
                "accordionButton": "",
                "accordionData": "",
                "show": true,
                "disable": false,
                "isYesChecked": false,
                "isNoChecked": false,
                "isRequired": false,
                "value": "doesAnyonePayForElectric"
            },
            {
                "legend": "Pays for gas",
                "toolTip": "",
                "accordionButton": "",
                "accordionData": "",
                "show": true,
                "disable": false,
                "isYesChecked": false,
                "isNoChecked": false,
                "isRequired": false,
                "value": "doesAnyonePayForGas"
            },
            {
                "legend": "Pays for oil, coal, or wood for heat",
                "toolTip": "",
                "accordionButton": "",
                "accordionData": "",
                "show": true,
                "disable": false,
                "isYesChecked": false,
                "isNoChecked": false,
                "isRequired": false,
                "value": "doesAnyonePayForOilCoalWood"
            },
            {
                "legend": "Pays for water",
                "toolTip": "",
                "accordionButton": "",
                "accordionData": "",
                "show": true,
                "disable": false,
                "isYesChecked": false,
                "isNoChecked": false,
                "isRequired": false,
                "value": "doesAnyonePayForWater"
            },
            {
                "legend": "Pays for sewage",
                "toolTip": "",
                "accordionButton": "",
                "accordionData": "",
                "show": true,
                "disable": false,
                "isYesChecked": false,
                "isNoChecked": false,
                "isRequired": false,
                "value": "doesAnyonePayForSewerage"
            },
            {
                "legend": "Pays for garbage removal",
                "toolTip": "",
                "accordionButton": "",
                "accordionData": "",
                "show": true,
                "disable": false,
                "isYesChecked": false,
                "isNoChecked": false,
                "isRequired": false,
                "value": "doesAnyonePayForGarbage"
            },
            {
                "legend": "Paid for utility installation this month",
                "toolTip": "",
                "accordionButton": "",
                "accordionData": "",
                "show": true,
                "disable": false,
                "isYesChecked": false,
                "isNoChecked": false,
                "isRequired": false,
                "value": "doesAnyonePayForUtilityInstallationThisMonth"
            },
            {
                "legend": "Pays for any other utilities such as kerosene",
                "toolTip": "",
                "accordionButton": "",
                "accordionData": "",
                "show": true,
                "disable": false,
                "isYesChecked": false,
                "isNoChecked": false,
                "isRequired": false,
                "value": "doesAnyonePayForOtherUtilities"
            }
        ]
    }

    constructor(private router: Router,
        private fb: FormBuilder,
        private route: Router,
        private service: ApplyNowStoreService,
        private cd: ChangeDetectorRef,
        private queueService: ScreenQueueUtilforExpensesUtility,
        private expensesQueueService: ScreenQueueUtil,
        private appService: AppStoreService,
        private activedRoute: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        // this.jsonData = JsonData;
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        this.programSelected = this.service.getProgramSelection || [];
        const WN = this.houseHoldDetails.selectedForLongtermLivingServices.length > 0;
        // console.log("JSON", this.jsonData)
        this.gatePostData.questionAnswers.forEach((service, i) => {
            // console.log(i + "-," + service.legend);
            const checkedItems = this.houseHoldDetails?.expenses?.expensesUtilityGatepostDetails?.checked || []
            const uncheckedItems = this.houseHoldDetails?.expenses?.expensesUtilityGatepostDetails?.unchecked || []

            if (checkedItems.indexOf(service.value) > -1) {
                service.isYesChecked = true
            }
            else if (uncheckedItems.indexOf(service.value) > -1) {
                service.isNoChecked = true;
            }
            if (WN && i === 1) service.isRequired = true;
        });
        // console.log("----",this.houseHoldDetails)

        // Pays for heating or cooling
        // O = FS, FSR, ES, ESR

        if (
            this.programSelected.indexOf(Programs.FS) > -1 ||
            this.programSelected.indexOf(Programs.FSR) > -1 ||
            this.programSelected.indexOf(Programs.ES) > -1 ||
            this.programSelected.indexOf(Programs.ESR) > -1
        ) {
            this.gatePostData.questionAnswers[0].show = true;
        }
        else {
            this.gatePostData.questionAnswers[0].show = false;
        }

        // Gets a heating or cooling bill separate from the rent or mortgage bill
        // R = LN, LI, WN
        // O = FS, FSR
        if (
            this.programSelected.indexOf(Programs.LN) > -1 ||
            this.programSelected.indexOf(Programs.LI) > -1 ||
            this.programSelected.indexOf(Programs.WN) > -1
        ) {
            this.gatePostData.questionAnswers[1].isRequired = true;
            this.gatePostData.questionAnswers[1].show = true;
        }
        else if (
            this.programSelected.indexOf(Programs.FS) > -1 ||
            this.programSelected.indexOf(Programs.FSR) > -1
        ) {
            this.gatePostData.questionAnswers[1].show = true;
        }
        else {
            this.gatePostData.questionAnswers[1].show = false;
        }

        // Meals are included in the household rent
        // O = FS, FSR
        if (
            this.programSelected.indexOf(Programs.FS) > -1 ||
            this.programSelected.indexOf(Programs.FSR) > -1
        ) {
            this.gatePostData.questionAnswers[2].show = true;
        }
        else {
            this.gatePostData.questionAnswers[2].show = false;
        }

        // Pays for rent or mortgage (including lot rent and condo fees)
        // R = LN, LI, WN
        // O = FS, FSR, ES, ESR
        if (
            this.programSelected.indexOf(Programs.LN) > -1 ||
            this.programSelected.indexOf(Programs.LI) > -1 ||
            this.programSelected.indexOf(Programs.WN) > -1
        ) {
            this.gatePostData.questionAnswers[3].isRequired = true;
            this.gatePostData.questionAnswers[3].show = true;
        }
        else if (
            this.programSelected.indexOf(Programs.FS) > -1 ||
            this.programSelected.indexOf(Programs.FSR) > -1 ||
            this.programSelected.indexOf(Programs.ES) > -1 ||
            this.programSelected.indexOf(Programs.ESR) > -1
        ) {
            this.gatePostData.questionAnswers[3].show = true;
        }
        else {
            this.gatePostData.questionAnswers[3].show = false;
        }

        // Pays for city, county, or school property taxes
        // R = LN, LI, WN
        // O = FS, FSR, ES, ESR
        if (
            this.programSelected.indexOf(Programs.LN) > -1 ||
            this.programSelected.indexOf(Programs.LI) > -1 ||
            this.programSelected.indexOf(Programs.WN) > -1
        ) {
            this.gatePostData.questionAnswers[4].isRequired = true;
            this.gatePostData.questionAnswers[4].show = true;
        }
        else if (
            this.programSelected.indexOf(Programs.FS) > -1 ||
            this.programSelected.indexOf(Programs.FSR) > -1 ||
            this.programSelected.indexOf(Programs.ES) > -1 ||
            this.programSelected.indexOf(Programs.ESR) > -1
        ) {
            this.gatePostData.questionAnswers[4].show = true;
        }
        else {
            this.gatePostData.questionAnswers[4].show = false;
        }

        // Pays for homeowner's property insurance
        // R = LN, LI, WN
        // O = FS, FSR, ES, ESR
        if (
            this.programSelected.indexOf(Programs.LN) > -1 ||
            this.programSelected.indexOf(Programs.LI) > -1 ||
            this.programSelected.indexOf(Programs.WN) > -1
        ) {
            this.gatePostData.questionAnswers[5].isRequired = true;
            this.gatePostData.questionAnswers[5].show = true;
        }
        else if (
            this.programSelected.indexOf(Programs.FS) > -1 ||
            this.programSelected.indexOf(Programs.FSR) > -1 ||
            this.programSelected.indexOf(Programs.ES) > -1 ||
            this.programSelected.indexOf(Programs.ESR) > -1
        ) {
            this.gatePostData.questionAnswers[5].show = true;
        }
        else {
            this.gatePostData.questionAnswers[5].show = false;
        }

        // Pays for telephone
        // R = LN, LI, WN
        // O = FS, FSR, ES, ESR
        if (
            this.programSelected.indexOf(Programs.LN) > -1 ||
            this.programSelected.indexOf(Programs.LI) > -1 ||
            this.programSelected.indexOf(Programs.WN) > -1
        ) {
            this.gatePostData.questionAnswers[6].isRequired = true;
            this.gatePostData.questionAnswers[6].show = true;
        }
        else if (
            this.programSelected.indexOf(Programs.FS) > -1 ||
            this.programSelected.indexOf(Programs.FSR) > -1 ||
            this.programSelected.indexOf(Programs.ES) > -1 ||
            this.programSelected.indexOf(Programs.ESR) > -1
        ) {
            this.gatePostData.questionAnswers[6].show = true;
        }
        else {
            this.gatePostData.questionAnswers[6].show = false;
        }

        // Pays for electric
        // R = LN, LI, WN
        // O = FS, FSR, ES, ESR
        if (
            this.programSelected.indexOf(Programs.LN) > -1 ||
            this.programSelected.indexOf(Programs.LI) > -1 ||
            this.programSelected.indexOf(Programs.WN) > -1
        ) {
            this.gatePostData.questionAnswers[7].isRequired = true;
            this.gatePostData.questionAnswers[7].show = true;
        }
        else if (
            this.programSelected.indexOf(Programs.FS) > -1 ||
            this.programSelected.indexOf(Programs.FSR) > -1 ||
            this.programSelected.indexOf(Programs.ES) > -1 ||
            this.programSelected.indexOf(Programs.ESR) > -1
        ) {
            this.gatePostData.questionAnswers[7].show = true;
        }
        else {
            this.gatePostData.questionAnswers[7].show = false;
        }

        // Pays for gas
        // R= LN, LI, WN
        // O = FS, FSR, ES, ESR
        if (
            this.programSelected.indexOf(Programs.LN) > -1 ||
            this.programSelected.indexOf(Programs.LI) > -1 ||
            this.programSelected.indexOf(Programs.WN) > -1
        ) {
            this.gatePostData.questionAnswers[8].isRequired = true;
            this.gatePostData.questionAnswers[8].show = true;
        }
        else if (
            this.programSelected.indexOf(Programs.FS) > -1 ||
            this.programSelected.indexOf(Programs.FSR) > -1 ||
            this.programSelected.indexOf(Programs.ES) > -1 ||
            this.programSelected.indexOf(Programs.ESR) > -1
        ) {
            this.gatePostData.questionAnswers[8].show = true;
        }
        else {
            this.gatePostData.questionAnswers[8].show = false;
        }

        // Pays for oil, coal, or wood for heat
        // R= LN, LI, WN
        // O = FS, FSR, ES, ESR
        if (
            this.programSelected.indexOf(Programs.LN) > -1 ||
            this.programSelected.indexOf(Programs.LI) > -1 ||
            this.programSelected.indexOf(Programs.WN) > -1
        ) {
            this.gatePostData.questionAnswers[9].isRequired = true;
            this.gatePostData.questionAnswers[9].show = true;
        }
        else if (
            this.programSelected.indexOf(Programs.FS) > -1 ||
            this.programSelected.indexOf(Programs.FSR) > -1 ||
            this.programSelected.indexOf(Programs.ES) > -1 ||
            this.programSelected.indexOf(Programs.ESR) > -1
        ) {
            this.gatePostData.questionAnswers[9].show = true;
        }
        else {
            this.gatePostData.questionAnswers[9].show = false;
        }

        // Pays for water
        // R= LN, LI, WN
        // O = FS, FSR, ES, ESR
        if (
            this.programSelected.indexOf(Programs.LN) > -1 ||
            this.programSelected.indexOf(Programs.LI) > -1 ||
            this.programSelected.indexOf(Programs.WN) > -1
        ) {
            this.gatePostData.questionAnswers[10].isRequired = true;
            this.gatePostData.questionAnswers[10].show = true;
        }
        else if (
            this.programSelected.indexOf(Programs.FS) > -1 ||
            this.programSelected.indexOf(Programs.FSR) > -1 ||
            this.programSelected.indexOf(Programs.ES) > -1 ||
            this.programSelected.indexOf(Programs.ESR) > -1
        ) {
            this.gatePostData.questionAnswers[10].show = true;
        }
        else {
            this.gatePostData.questionAnswers[10].show = false;
        }

        // Pays for sewage 
        // R= LN, LI, WN
        // O = FS, FSR, ES, ESR
        if (
            this.programSelected.indexOf(Programs.LN) > -1 ||
            this.programSelected.indexOf(Programs.LI) > -1 ||
            this.programSelected.indexOf(Programs.WN) > -1
        ) {
            this.gatePostData.questionAnswers[11].isRequired = true;
            this.gatePostData.questionAnswers[11].show = true;
        }
        else if (
            this.programSelected.indexOf(Programs.FS) > -1 ||
            this.programSelected.indexOf(Programs.FSR) > -1 ||
            this.programSelected.indexOf(Programs.ES) > -1 ||
            this.programSelected.indexOf(Programs.ESR) > -1
        ) {
            this.gatePostData.questionAnswers[11].show = true;
        }
        else {
            this.gatePostData.questionAnswers[11].show = false;
        }

        // Pays for garbage removal
        // R= LN, LI, WN
        // O = FS, FSR, ES, ESR

        if (
            this.programSelected.indexOf(Programs.LN) > -1 ||
            this.programSelected.indexOf(Programs.LI) > -1 ||
            this.programSelected.indexOf(Programs.WN) > -1
        ) {
            this.gatePostData.questionAnswers[12].isRequired = true;
            this.gatePostData.questionAnswers[12].show = true;
        }
        else if (
            this.programSelected.indexOf(Programs.FS) > -1 ||
            this.programSelected.indexOf(Programs.FSR) > -1 ||
            this.programSelected.indexOf(Programs.ES) > -1 ||
            this.programSelected.indexOf(Programs.ESR) > -1
        ) {
            this.gatePostData.questionAnswers[12].show = true;
        }
        else {
            this.gatePostData.questionAnswers[12].show = false;
        }

        // Paid for utility installation this month
        // R= LN, LI, WN
        // O = FS, FSR, ES, ESR
        if (
            this.programSelected.indexOf(Programs.LN) > -1 ||
            this.programSelected.indexOf(Programs.LI) > -1 ||
            this.programSelected.indexOf(Programs.WN) > -1
        ) {
            this.gatePostData.questionAnswers[13].isRequired = true;
            this.gatePostData.questionAnswers[13].show = true;
        }
        else if (
            this.programSelected.indexOf(Programs.FS) > -1 ||
            this.programSelected.indexOf(Programs.FSR) > -1 ||
            this.programSelected.indexOf(Programs.ES) > -1 ||
            this.programSelected.indexOf(Programs.ESR) > -1
        ) {
            this.gatePostData.questionAnswers[13].show = true;
        }
        else {
            this.gatePostData.questionAnswers[13].show = false;
        }
        // Pays for any other utilities such as kerosene
        // R= LN, LI, WN
        // O = FS, FSR, ES, ESR
        if (
            this.programSelected.indexOf(Programs.LN) > -1 ||
            this.programSelected.indexOf(Programs.LI) > -1 ||
            this.programSelected.indexOf(Programs.WN) > -1
        ) {
            this.gatePostData.questionAnswers[14].isRequired = true;
            this.gatePostData.questionAnswers[14].show = true;
        }
        else if (
            this.programSelected.indexOf(Programs.FS) > -1 ||
            this.programSelected.indexOf(Programs.FSR) > -1 ||
            this.programSelected.indexOf(Programs.ES) > -1 ||
            this.programSelected.indexOf(Programs.ESR) > -1
        ) {
            this.gatePostData.questionAnswers[14].show = true;
        }
        else {
            this.gatePostData.questionAnswers[14].show = false;
        }

    }

    showNextPage(selectedItems: any) {
        // this.router.navigate([
        //     RoutePath.APPLYNOW +
        //         "/" +
        //         RoutePath.APPLYNOW_EXPENSES +
        //         "/" +
        //         RoutePath.APPLYNOW_EXPENSESHOUSEHOLDMORTGAGERENT,
        // ]);
        // const storedHouseholdDetails = this.applyNowState?.houseHoldDetails;
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
        console.log("tytytyt", selectedPaths);
        // if (storedHouseholdDetails) {
        //     this.service.updateHouseHoldDetails({
        //         ...storedHouseholdDetails,
        //         ...{ expensesUtilityDetails: selectedPaths },
        //     });

        // }
        const utilityDetails = {
            checked: selectedPaths.checked,
            unchecked: selectedPaths.unchecked
        }


        const storeHouseholdDetails = this.houseHoldDetails;
        const storedHouseHold =
            this.houseHoldDetails.expenses;
        // const storedHouseholdUtilityGatepost = this.houseHoldDetails.expenses?.utilityExpenseInformation
        const updatedHousehold = {
            ...storedHouseHold,
            expensesUtilityGatepostDetails: utilityDetails
        };

        // const updatedhouseholdUtilityDetails = {
        //     ...storedHouseHold,
        //     updatedHousehold
        // }

        this.service.updateHouseHoldDetails({
            ...storeHouseholdDetails,
            expenses: updatedHousehold,
        });

        // this.queueService.initDynamicRoutes(
        //     selectedPaths.checked,
        //     RoutePath.APPLYNOW_INDIVIDUALDETAILS +
        //         "/" +
        //         RoutePath.APPLYNOW_INDIVIDUALDETAILS_INDIVIDUALSMEDICALGATEPOST
        // );
        // this.queueService.navigateToPath();
        // this.router.navigate([
        //     RoutePath.APPLYNOW +
        //     "/" +
        //     RoutePath.APPLYNOW_EXPENSES +
        //     "/" +
        //     RoutePath.APPLYNOW_CHILD_SUPPORT_EXPENSES,
        // ]);
        this.queueService.initDynamicRoutes(
            selectedPaths.checked,
            RoutePath.APPLYNOW_EXPENSES +
            "/" +
            RoutePath.APPLYNOW_EXPENSESSUMMARY
        );
        this.queueService.navigateToPath();
    }



    showPreviousPage() {
        this.expensesQueueService.back();
    }
}
