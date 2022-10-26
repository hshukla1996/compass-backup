import {Component, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import { RoutePath } from "../../../shared/route-strategies";
import {ScreenQueueRoutesExpensesSituations, ScreenQueueUtil} from "../expenses-gatepost/expenses-gatepost.paths";
import {ScreenQueueUtilforExpensesUtility} from "../expenses-utility-gatepost/expenses-utility-gatepost.path";
import {IHouseHold, IHouseHoldDetails} from "../../household/household-model";
import {ApplyNowStoreService} from "../../apply-now-store-service";
import { INDIVIDUAL_PROGRAMS } from '../../../shared/constants/Individual_Programs_Constants';
import { IApplyNowState } from '../../+state/apply-now.models';
import { ApplyNowService } from '../../../shared/services/apply-now.service';

@Component({
    selector: "compass-ui-expenses-summary",
    templateUrl: "./expenses-summary.component.html",
    styleUrls: ["./expenses-summary.component.scss"],
})
export class ExpensesSummaryComponent implements OnInit {
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
    selectedExpenses: string[] = [];
    expensesValues: any;
    isLoading = false;
    loadingText = "Loading...";
    applyNowState!: IApplyNowState;
    serviceData!: any;
    benefits = this.service.getBenefits();
    isLHProgramExist = this.service.isProgramExist(
        this.benefits as string[],
        INDIVIDUAL_PROGRAMS.LH
    );

    isLWProgramExist = this.service.isProgramExist(
        this.benefits as string[],
        INDIVIDUAL_PROGRAMS.LW
    );
    constructor(
        private queueService: ScreenQueueUtilforExpensesUtility,
        private service: ApplyNowStoreService,
        private expensesQueueService: ScreenQueueUtil,
        private applyNowService: ApplyNowService,
        private router: Router //private routingStrategy: ApplyNowExpensesSummaryStrategy
    ) {}

    ngOnInit() {
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons || [];
        this.selectedExpenses =
            this.houseHoldDetails.expenses?.expensesSituations?.checked || [];
        this.selectedExpenses =
            this.houseHoldDetails.expenses?.expensesSituations?.checked || [];
    this.service.getAppData().subscribe((d) => {
        this.applyNowState = { ...d };
        this.serviceData = this.applyNowState.gettingStartedResponse;
    });
        }
    navigateToAssistanceProgram() {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_EXPENSES +
                "/" +
                RoutePath.APPLYNOW_EXPENSESENROLLMENT,
        ]);
    }

    navigateToHeatingAssistance() {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_EXPENSES +
                "/" +
                RoutePath.APPLYNOW_EXPENSESHEATINGASSISTANCE,
        ]);
    }

    navigateToHeatingSistuation() {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_EXPENSES +
                "/" +
                RoutePath.APPLYNOW_EXPENSESHEATINGGATEPOST,
        ]);
    }

    navigateToWaterAsstApp() {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_EXPENSES +
                "/" +
                RoutePath.APPLYNOW_EXPENSESWATERASSISTANCEAPPLICATION,
        ]);
    }

    navigateToWatergatepost() {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_EXPENSES +
                "/" +
                RoutePath.APPLYNOW_EXPENSESWATERGATEPOST,
        ]);
    }

    navigateToExpensesGatepost() {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_EXPENSES +
                "/" +
                RoutePath.APPLYNOW_EXPENSES_GATEPOST,
        ]);
    }

    navigateToChidSupportExpensesSum() {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_EXPENSES +
                "/" +
                RoutePath.APPLYNOW_CHILD_SUPPORT_EXPENSESE_SUMMARY,
        ]);
    }

    navigateToAlimonyExpenses() {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_EXPENSES +
                "/" +
                RoutePath.APPLYNOW_ALIMONY_EXPENSES_SUMMARY,
        ]);
    }

    navigateToChildorAdultExpenses() {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_EXPENSES +
                "/" +
                RoutePath.APPLYNOW_CHILD_OR_ADULUT_CARE_EXPENSES_SUMMARY,
        ]);
    }

    navigateToTransportationExpenses() {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_EXPENSES +
                "/" +
                RoutePath.APPLYNOW_TRANSPORTATION_EXPENSES_SUMMARY,
        ]);
    }

    navigateToMedicalExpenses() {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_EXPENSES +
                "/" +
                RoutePath.APPLYNOW_MEDICAL_EXPENSES_SUMMARY,
        ]);
    }
    navigateToTaxDeductibleExpenses() {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_EXPENSES +
                "/" +
                RoutePath.APPLYNOW_TAX_DEDUCTIBLE_EXPENSES_SUMMARY,
        ]);
    }

    navigateToLegalFeeExpenses() {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_EXPENSES +
                "/" +
                RoutePath.APPLYNOW_EXPENSESLEGALFEESUMMARY,
        ]);
    }

    navigateToHousingAsstReceived() {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_EXPENSES +
                "/" +
                RoutePath.APPLYNOW_HOUSING_ASSISTANCE_RECEIVED,
        ]);
    }

    navigateToSharedExpenses() {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_EXPENSES +
                "/" +
                RoutePath.APPLYNOW_SHARED_EXPENSES_DETAILS,
        ]);
    }

    navigateToShelterandUtilityExpenses() {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_EXPENSES +
                "/" +
                RoutePath.APPLYNOW_EXPENSESUTILITYGATEPOST,
        ]);
    }

    navigateToHouseholdRentandMortgage() {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_EXPENSES +
                "/" +
                RoutePath.APPLYNOW_EXPENSESHOUSEHOLDMORTGAGERENT,
        ]);
    }

    navigateToHouseholdPropertyTaxexpenses() {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_EXPENSES +
                "/" +
                RoutePath.APPLYNOW_EXPENSES_PROPERTYTAXDETAILS,
        ]);
    }
    navigateToHouseholdPropertyInsuranceexpenses() {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_EXPENSES +
                "/" +
                RoutePath.APPLYNOW_EXPENSESHOUSEHOLDPROPERTYINSURANCE,
        ]);
    }

    previous() {
        // this.router.navigate([
        //   RoutePath.APPLYNOW +
        //  "/" +
        //  RoutePath.APPLYNOW_EXPENSES +
        //  "/" +
        //   RoutePath.APPLYNOW_EXPENSESHOUSEHOLDPROPERTYINSURANCE,
        //  ]);
        const expensesGatePostCheckedItems =
            this.houseHoldDetails.expenses?.expensesSituations?.checked || [];
        if (
            expensesGatePostCheckedItems.indexOf(
                ScreenQueueRoutesExpensesSituations.shelterExpensesInside
            ) > -1
        ) {
            this.queueService.back();
        } else {
            this.expensesQueueService.back();
        }
    }

    submit() {
        this.isLoading = true;
        const serviceData = { ...this.serviceData };
        serviceData.household = this.service.getHouseholdContracts();
        console.log(serviceData.household);

        serviceData.people = {
            individuals: this.service.getHouseHoldDetails.houseHoldPersons,
            absentRelatives: this.service.getHouseHoldDetails.absentRelative,
        };

        this.applyNowService
            .postSaveApplyNow(serviceData)
            .subscribe((data: any) => {
                if (data) {
                    this.isLoading = false;
                    this.router.navigate([
                        RoutePath.APPLYNOW +
                            "/" +
                            RoutePath.APPLYNOW_EXPENSES +
                            "/" +
                            RoutePath.APPLYNOW_EXPENSESENDING,
                    ]);
                }
            });
    }
}
