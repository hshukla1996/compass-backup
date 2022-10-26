import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit,} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {ApplyNowStoreService} from "../../apply-now-store-service";
import {IGeneralDetails} from "../../individual-details/general-details/state/general-details-model";
import {IApplyNowState, Programs} from "../../+state/apply-now.models";
import {RoutePath} from "../../../shared/route-strategies";
import {ApplyNowRaceStrategy} from "../../../shared/route-strategies/apply-now/race";
import {IHouseHold, IHouseHoldDetails, PageDirection} from "../../household/household-model";
import {AppStoreService} from "../../../app-store-service";
import {UtilService} from "../../../shared/services/util.service";
import {ScreenQueueRoutesExpensesSituations, ScreenQueueUtil} from "./expenses-gatepost.paths";

//import Validation from './utils/validation';
@Component({
    selector: "compass-ui-expenses-gatepost",
    templateUrl: "./expenses-gatepost.component.html",
    styleUrls: ["./expenses-gatepost.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ApplyNowRaceStrategy],
})
export class ExpensesGatepostComponent implements OnInit {
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
        questionText:
            "Does anyone in the household have any of these expense situations?",
        toolTip: "",
        subHeading: "",
        requiredText: "Please select required options",
        questionAnswers: [
            {
                legend: "Pays child support to a person who does not live in the house",
                toolTip: "",
                accordionButton: "",
                accordionData: "",
                show: true,
                disable: false,
                isRequired: false,
                isYesChecked: false,
                isNoChecked: false,
                value: ScreenQueueRoutesExpensesSituations.childSupportExpenses,
            },
            {
                legend: "Pays alimony to a person who does not live in the house",
                toolTip: "",
                accordionButton: "",
                accordionData: "",
                show: true,
                disable: false,
                isYesChecked: false,
                isRequired: false,
                isNoChecked: false,
                value: ScreenQueueRoutesExpensesSituations.alimony,
            },
            {
                legend:
                    "Pays for child care or care for an adult with a disability in order to work" +
                    "The expense must be for one of these reasons:\n " +
                    "•\nTo go to work\n" +
                    "•\nTo attend training to prepare for work\n" +
                    "•\nTo attend school to prepare for work\n",
                toolTip: "",
                accordionButton: "",
                accordionData: "",
                show: true,
                disable: false,
                isRequired: false,
                isYesChecked: false,
                isNoChecked: false,
                value: ScreenQueueRoutesExpensesSituations.childoradultcare,
            },
            {
                legend: "Drives to work or pays for transportation to get to work",
                toolTip: "",
                accordionButton: "",
                accordionData: "",
                show: true,
                disable: false,
                isRequired: false,
                isYesChecked: false,
                isNoChecked: false,
                value: ScreenQueueRoutesExpensesSituations.transportation,
            },

            {
                legend: "Had any medical expenses in the last 90 days that weren't covered by medical insurance",
                toolTip: "",
                accordionButton: "",
                accordionData: "",
                show: true,
                disable: false,
                isYesChecked: false,
                isRequired: false,
                isNoChecked: false,
                value: ScreenQueueRoutesExpensesSituations.medical,
            },

            {
                legend: "Pays tax deductible expenses they will claim on their federal tax return",
                toolTip: "",
                accordionButton: "More information ",
                accordionData:
                    "Tax deductible expenses include:\n" +
                    "•\tAlimony paid\n" +
                    "•\tCertain business expenses of reservist, performing artist and fee-basis government officials\n" +
                    "•\tDeductible part of self-employment tax\n" +
                    "•\tEducator expenses\n" +
                    "•\tHealth savings account deduction\n" +
                    "•\tIRA deduction\n" +
                    "•\tMoving Expenses for members of Armed Forces\n" +
                    "•\tPenalty on early withdrawal of savings\n" +
                    "•\tSelf-employed health insurance deduction\n" +
                    "•\tSelf-employed SEP\n" +
                    "•\tSIMPLE and qualified plans\n" +
                    "•\tStudent loan interest deduction\n",

                show: true,
                disable: false,
                isRequired: false,
                isYesChecked: false,
                isNoChecked: false,
                value: ScreenQueueRoutesExpensesSituations.taxDeductable,
            },

            {
                legend: "Pays a fee to collect their income",
                toolTip: "",
                accordionButton: "More information",
                accordionData:
                    "If you pay an expense for or to receive other income, it may be used as a deduction when determining countable income.\nOther Income examples include:\n" +
                    "•\tSocial Security Disability\n" +
                    "•\tSocial Security Retirement\n" +
                    "•\tSurvivors or Disability Income (RSDI)\n" +
                    "•\tSupplemental Security Income (SSI)\n" +
                    "•\tPension/Retirement\n" +
                    "•\tWorker Compensation\n" +
                    "•\tUnemployment Benefits\n" +
                    "•\tChild Support\n" +
                    "•\tAlimony\n" +
                    "•\tCash Assistance\n" +
                    "•\tRental Income\n" +
                    "•\tV.A. Aid and Attendance\n" +
                    "•\tAnnuity\n" +
                    "•\tPayments from a Trust\n" +
                    "•\tRailroad Retirement\n" +
                    "•\tBlack Lung\n" +
                    "•\tLottery and Gambling Winnings\n",
                show: true,
                disable: false,
                isRequired: false,
                isYesChecked: false,
                isNoChecked: false,
                value: ScreenQueueRoutesExpensesSituations.feesOnIncome,
            },

            {
                legend: "Currently receives housing assistance",
                toolTip: "",
                accordionButton: "More information ",
                accordionData:
                    "Examples include:\n" +
                    "•\tPublic housing\n" +
                    "•\tRent subsidy, including HUD\n",
                show: true,
                disable: false,
                isRequired: false,
                isYesChecked: false,
                isNoChecked: false,
                value: ScreenQueueRoutesExpensesSituations.housingAssitance,
            },

            {
                legend: "Shares any shelter expenses with someone who does not live in the household",
                toolTip: "",
                accordionButton: "More Information",
                accordionData:
                    "For example, if a parent of someone living in the household helps pay the rent.",
                show: true,
                disable: false,
                isRequired: false,
                isYesChecked: false,
                isNoChecked: false,
                value: ScreenQueueRoutesExpensesSituations.shelterExpensesOutside,
            },
            {
                legend: "Pays any shelter, utility, or other household expenses",
                toolTip: "",
                accordionButton: "More information",
                accordionData:
                    "Examples include:\n" +
                    "•\tRent or mortgage\n" +
                    "•\tCity, county, or school property taxes\n" +
                    "•\tHomeowner's property insurance\n" +
                    "•\tOther expenses including rent, condo fees, kerosene, etc.\n" +
                    "•\tElectric\n" +
                    "•\tGas\n" +
                    "•\tGarbage\n" +
                    "•\tTelephone\n" +
                    "•\tOil, coal, or wood\n" +
                    "•\tSewage\n" +
                    "•\tUtility installation\n" +
                    "•\tWater\n",
                show: true,
                disable: false,
                isRequired: false,
                isYesChecked: false,
                isNoChecked: false,
                value: ScreenQueueRoutesExpensesSituations.shelterExpensesInside,
            }
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
    ) {}

    ngOnInit() {
        this.houseHoldDetails = this.service.getHouseHoldDetails;
      this.programSelected = this.service.getProgramSelection || [];
        const CI = this.houseHoldDetails.selectedForChildCareCost.length > 0;
        this.gatePostData.questionAnswers.forEach((service, i) => {
            console.log(i + "-," + service.legend);
          const checkedItems = this.houseHoldDetails?.expenses?.expensesSituations?.checked || []
          const uncheckedItems = this.houseHoldDetails?.expenses?.expensesSituations?.unchecked || []

          if (checkedItems.indexOf(service.value) > -1) {
            service.isYesChecked = true
          }
          else if (uncheckedItems.indexOf(service.value) > -1) {
            service.isNoChecked = true;
          }

        });

        // Pays child support to a person who does not live in the house
        // R = CI, CIR
        // O = FS, FSR, ES, ESR
        if (
            this.programSelected.indexOf(Programs.CI) > -1 ||
            this.programSelected.indexOf(Programs.CIR) > -1
        ) {
            this.gatePostData.questionAnswers[0].isRequired = true;
            this.gatePostData.questionAnswers[0].show = true;
        }
        else if (
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

        // Pays alimony to a person who does not live in the house
        // R = CI, CIR
        if (
            this.programSelected.indexOf(Programs.CI) > -1 ||
            this.programSelected.indexOf(Programs.CIR) > -1
        ) {
            this.gatePostData.questionAnswers[1].isRequired = true;
            this.gatePostData.questionAnswers[1].show = true;
        }
        else {
            this.gatePostData.questionAnswers[1].show = false;
        }

        // Pays for child care or care for an adult with a disability in order to work
        // R = HC, HA, MCR, MAR, CHR, ABR, FP, FPR
        // O = FS, FSR
        if (
            this.programSelected.indexOf(Programs.HC) > -1 ||
            this.programSelected.indexOf(Programs.HA) > -1 ||
            this.programSelected.indexOf(Programs.MCR) > -1 ||
            this.programSelected.indexOf(Programs.MAR) > -1 ||
            this.programSelected.indexOf(Programs.CHR) > -1 ||
            this.programSelected.indexOf(Programs.ABR) > -1 ||
            this.programSelected.indexOf(Programs.FP) > -1 ||
            this.programSelected.indexOf(Programs.FPR) > -1
        ) {
            this.gatePostData.questionAnswers[2].isRequired = true;
            this.gatePostData.questionAnswers[2].show = true;
        }
        else if (
            this.programSelected.indexOf(Programs.FS) > -1 ||
            this.programSelected.indexOf(Programs.FSR) > -1 ||
            this.programSelected.indexOf(Programs.ES) > -1 ||
            this.programSelected.indexOf(Programs.ESR) > -1
        ) {
            this.gatePostData.questionAnswers[2].show = true;
        }
        else {
            this.gatePostData.questionAnswers[2].show = false;
        }

        // Drives to work or pays for transportation to get to work
        // R = HC, HA, MCR, MAR
        if (
            this.programSelected.indexOf(Programs.HC) > -1 ||
            this.programSelected.indexOf(Programs.HA) > -1 ||
            this.programSelected.indexOf(Programs.MCR) > -1 ||
            this.programSelected.indexOf(Programs.MAR) > -1
        ) {
            this.gatePostData.questionAnswers[3].isRequired = true;
            this.gatePostData.questionAnswers[3].show = true;
        }
        else {
            this.gatePostData.questionAnswers[3].show = false;
        }

        // Had any medical expenses in the last 90 days that weren't covered by medical insurance
        // R = CI, CIR
        // O = FS, FSR, ES, ESR

        if (
            this.programSelected.indexOf(Programs.CI) > -1 ||
            this.programSelected.indexOf(Programs.CIR) > -1
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

        // Pays tax deductible expenses they will claim on their federal tax return
        // R = HA, HC, MAR, MCR, CA, CAR, CHR, FP, FPR, PE, MI
        if (
            this.programSelected.indexOf(Programs.HA) > -1 ||
            this.programSelected.indexOf(Programs.HC) > -1 ||
            this.programSelected.indexOf(Programs.MCR) > -1 ||
            this.programSelected.indexOf(Programs.MAR) > -1 ||
            this.programSelected.indexOf(Programs.CA) > -1 ||
            this.programSelected.indexOf(Programs.CAR) > -1 ||
            this.programSelected.indexOf(Programs.CHR) > -1 ||
            this.programSelected.indexOf(Programs.FP) > -1 ||
            this.programSelected.indexOf(Programs.FPR) > -1 ||
            this.programSelected.indexOf(Programs.PE) > -1 ||
            this.programSelected.indexOf(Programs.MI) > -1
        ) {
            this.gatePostData.questionAnswers[5].isRequired = true;
            this.gatePostData.questionAnswers[5].show = true;
        }
        else {
            this.gatePostData.questionAnswers[5].show = false;
        }

        // Pays a fee to collect their income
        // R = HA, MAR
        if (
            this.programSelected.indexOf(Programs.HA) > -1 ||
            this.programSelected.indexOf(Programs.MAR) > -1
        ) {
            this.gatePostData.questionAnswers[6].isRequired = true;
            this.gatePostData.questionAnswers[6].show = true;
        }
        else {
            this.gatePostData.questionAnswers[6].show = false;
        }

        // Currently receives housing assistance
        // R = CA
        // O = FS, ES
        if (
            this.programSelected.indexOf(Programs.CA) > -1
        ) {
            this.gatePostData.questionAnswers[7].isRequired = true;
            this.gatePostData.questionAnswers[7].show = true;
        }
        else if (
            this.programSelected.indexOf(Programs.FS) > -1 ||
            this.programSelected.indexOf(Programs.ES) > -1
        ) {
            this.gatePostData.questionAnswers[7].show = true;
        }
        else {
            this.gatePostData.questionAnswers[7].show = false;
        }

        // Shares any shelter expenses with someone who does not live in the household
        // O = FS, FSR
        if (
            this.programSelected.indexOf(Programs.FS) > -1 ||
            this.programSelected.indexOf(Programs.FSR) > -1
        ) {
            this.gatePostData.questionAnswers[8].show = true;
        }
        else {
            this.gatePostData.questionAnswers[8].show = false;
        }

        // Pays any shelter, utility, or other household expenses
        // R = LN, LI, LNR, WN
        // O = FS, FSR, ES, ESR
        if (
            this.programSelected.indexOf(Programs.LN) > -1 ||
            this.programSelected.indexOf(Programs.LI) > -1 ||
            this.programSelected.indexOf(Programs.LNR) > -1 ||
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
        // Received any Low-Income Home Energy Assistance Program (LIHEAP) payments since October 1st
        // O = FS, FSR
     /*   if (
            this.programSelected.indexOf(Programs.FS) > -1 ||
            this.programSelected.indexOf(Programs.FSR) > -1
        ) {
            this.gatePostData.questionAnswers[10].show = true;
        }
        else {
            this.gatePostData.questionAnswers[10].show = false;
        }*/


    }

    public showPreviousPage() {
        this.route.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_EXPENSES +
                "/" +
                RoutePath.APPLYNOW_EXPENSESWATERGATEPOST,
        ]);
    }

    showNextPage(selectedItems: any) {
        const storedHouseholdDetails = this.service.getHouseHoldDetails;

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
        if (storedHouseholdDetails) {
          const  updatedpersons = storedHouseholdDetails.houseHoldPersons?.map((ind,i)=>{
            const updatedPerson = {...ind}

            if(selectedPaths.unchecked.indexOf(ScreenQueueRoutesExpensesSituations.childSupportExpenses) > -1){
              updatedPerson.expense = {...ind.expense,childSupportExpenses: []}
            }
            if(selectedPaths.unchecked.indexOf(ScreenQueueRoutesExpensesSituations.alimony) > -1){
              updatedPerson.expense = {...ind.expense,alimonyExpenses: []}
            }
            if(selectedPaths.unchecked.indexOf(ScreenQueueRoutesExpensesSituations.childoradultcare) > -1){
              updatedPerson.expense = {...ind.expense,childOrAdultCareExpenses: []}
            }
            if(selectedPaths.unchecked.indexOf(ScreenQueueRoutesExpensesSituations.medical) > -1){
              updatedPerson.expense = {...ind.expense,medicalExpenses: []}
            }
            if(selectedPaths.unchecked.indexOf(ScreenQueueRoutesExpensesSituations.transportation) > -1){
              updatedPerson.expense = {...ind.expense,transportExpenses: []}
            }
            if(selectedPaths.unchecked.indexOf(ScreenQueueRoutesExpensesSituations.taxDeductable) > -1){
              updatedPerson.expense = {...ind.expense,taxDeductableExpenses: []}
            }
            if(selectedPaths.unchecked.indexOf(ScreenQueueRoutesExpensesSituations.feesOnIncome) > -1){
              updatedPerson.expense = {...ind.expense,legalFeeExpenses: []}
            }

            return updatedPerson;

          })
          let updatedPageAction = storedHouseholdDetails?.pageAction;
          if(selectedPaths.unchecked.indexOf(ScreenQueueRoutesExpensesSituations.childSupportExpenses) > -1) {
            updatedPageAction = {
              ...storedHouseholdDetails?.pageAction,
              childSupportMap: {},
            childSupportDirection: PageDirection.NEXT,
            };
          }
          console.log("updatedPageAction")
          console.log(updatedPageAction)
          const updatedExpenses = {
            ...storedHouseholdDetails.expenses,
            expensesSituations: selectedPaths,
          };
          if(selectedPaths.unchecked.indexOf(ScreenQueueRoutesExpensesSituations.housingAssitance) >-1){
            delete updatedExpenses.housingAssitance
          }
          if(selectedPaths.unchecked.indexOf(ScreenQueueRoutesExpensesSituations.shelterExpensesOutside) >-1){
            delete updatedExpenses.sharedExpensesOutsideHousehold
          }
            this.service.updateHouseHoldDetails({
              ...storedHouseholdDetails,
              ...{ pageAction: updatedPageAction },
              ...{ expenses: updatedExpenses },
              ...{houseHoldPersons:updatedpersons}
            });
        }

        // this.queueService.initDynamicRoutes(
        //     selectedPaths.checked,
        //     RoutePath.APPLYNOW_INDIVIDUALDETAILS +
        //         "/" +
        //         RoutePath.APPLYNOW_INDIVIDUALDETAILS_INDIVIDUALSMEDICALGATEPOST
        // );
        // this.queueService.navigateToPath();
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_EXPENSES +
                "/" +
                RoutePath.APPLYNOW_CHILD_SUPPORT_EXPENSES,
        ]);
        this.queueService.initDynamicRoutes(
            selectedPaths.checked,
            RoutePath.APPLYNOW_EXPENSES +
                "/" +
                RoutePath.APPLYNOW_EXPENSESSUMMARY
        );
        this.queueService.navigateToPath();
    }
}
