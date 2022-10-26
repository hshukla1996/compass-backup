import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { IApplyNowState } from '../../+state/apply-now.models';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHoldDetails } from '../../household/household-model';
import {MenuItemState} from "../../../shared/menu-item-state";
import {ApplyNowService} from "../../../shared/services/apply-now.service";

@Component({
  selector: 'compass-ui-incomesummary',
  templateUrl: './incomesummary.component.html',
  styleUrls: ['./incomesummary.component.scss']
})
export class IncomesummaryComponent implements OnInit {
  serviceData!: any;
  displayPastEmployerCount: boolean = false;
  displayCurrentEmployerCount: boolean = false;
  displayOtherIncomeCount: boolean = false;
  displayDisabilityAssistanceCount: boolean = false;
  displayNoIncome: boolean = false;
  houseHoldDetails!: IHouseHoldDetails;
  applyNowState!: IApplyNowState;
  isLoading = false;
  loadingText = "Loading...";
  pastEmployerCount: number = 0;
  currentEmployerCount: number = 0;
  otherIncomeCount: number = 0;
  financialAssistanceCount: number = 0;


  constructor(
    private route: Router,
    private service: ApplyNowStoreService,
    private applyNowService: ApplyNowService) {

  }

  ngOnInit(): void {
    this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      this.houseHoldDetails = this.service.getHouseHoldDetails;
      this.serviceData = this.applyNowState.gettingStartedResponse;
      if (this.houseHoldDetails.income) {
        this.checkIncomeSituations();
      }
    });
  }

  checkIncomeSituations() {
    const incomeSituations = this.houseHoldDetails.income;
    const houseHoldPersons = this.houseHoldDetails.houseHoldPersons ;

    const noOfIndividualsHavingCurrentEmployment = incomeSituations?.currentEmployment?.individualNumbers?.length || 0;
    if (noOfIndividualsHavingCurrentEmployment > 0) {
      this.displayCurrentEmployerCount = true;
      houseHoldPersons?.forEach ((person) => {
        this.currentEmployerCount = this.currentEmployerCount + ( person.individualIncome?.currentEmployment?.length || 0)
      });
    }
    const noOfIndividualsHavingPastEmployment = incomeSituations?.pastEmployment?.individualNumbers?.length || 0;
    if (noOfIndividualsHavingPastEmployment > 0) {
      this.displayPastEmployerCount = true;
      houseHoldPersons?.forEach((person) => {
        this.pastEmployerCount = this.pastEmployerCount + (person.individualIncome?.pastEmployment?.length || 0)
      });
    }
    const noOfIndividualsHavingOtherIncome = incomeSituations?.otherIncome?.individualNumbers?.length || 0;
    if (noOfIndividualsHavingOtherIncome > 0) {
      this.displayOtherIncomeCount = true;
      houseHoldPersons?.forEach((person) => {
        this.otherIncomeCount = this.otherIncomeCount + (person.individualIncome?.otherIncome?.length || 0)
      });
    }
    const noOfIndividualsWithFinancialAsst = incomeSituations?.doesAnyoneReceiveFinancialAssistanceForDisability?.individualNumbers?.length || 0;
    if (noOfIndividualsWithFinancialAsst > 0) {
      this.displayDisabilityAssistanceCount = true;
      this.financialAssistanceCount = noOfIndividualsWithFinancialAsst;
    }
    this.displayNoIncome = incomeSituations?.noIncomeExplanation !== "" && incomeSituations?.noIncomeExplanation != undefined;

  }

  navigateToCurrentandFutureEmployer() {
    this.route.navigate([
      RoutePath.APPLYNOW +
      "/" +
      RoutePath.APPLYNOW_INCOME +
      "/" +
      RoutePath.APPLYNOW_INCOME_INCOMEJOBSUMMARY,
    ])
  }
  navigateToPastEmployer() {
    this.route.navigate([
      RoutePath.APPLYNOW +
      "/" +
      RoutePath.APPLYNOW_INCOME +
      "/" +
      RoutePath.APPLYNOW_INCOME_INCOMEPASTJOBSUMMARY,
    ])
  }

  navigateToLivingExpenses() {
    this.route.navigate([
      RoutePath.APPLYNOW +
      "/" +
      RoutePath.APPLYNOW_INCOME +
      "/" +
      RoutePath.APPLYNOW_NO_INCOME
    ])
  }
  navigateToOtherIncome() {
    this.route.navigate([
      RoutePath.APPLYNOW +
      "/" +
      RoutePath.APPLYNOW_INCOME +
      "/" +
      RoutePath.APPLYNOW_INCOME_OTHERINCOME +
      "/" +
      RoutePath.APPLYNOW_INCOME_OTHERINCOMESUMMARY,

    ])
  }
  navigateToDisabilityAssistance() {
    this.route.navigate([
      RoutePath.APPLYNOW +
      "/" +
      RoutePath.APPLYNOW_INCOME +
      "/" +
      RoutePath.APPLYNOW_INCOME_DISABILITYFINANCIALASSISTANCE,
    ])
  }

  navigateToGatePost() {
    this.route.navigate([
      RoutePath.APPLYNOW +
      "/" +
      RoutePath.APPLYNOW_INCOME +
      "/" +
      RoutePath.APPLYNOW_INCOME_INCOMEGATEPOST,
    ])
  }

  goBack(): void {
    this.route.navigate([
      RoutePath.APPLYNOW
      + "/" + RoutePath.APPLYNOW_INCOME
      + "/" + RoutePath.APPLYNOW_INCOME_INCOMEGATEPOST
    ]);
  }
  goNext(): void {
    this.isLoading = true;
    console.log(" completesection method");
    const serviceData = { ...this.serviceData };
    serviceData.household = this.service.getHouseholdContracts();
    console.log(serviceData.household);

    serviceData.people = {
      individuals:
      this.service.getHouseHoldDetails.houseHoldPersons,
      absentRelatives:
      this.service.getHouseHoldDetails.absentRelative
    }

    this.applyNowService
      .postSaveApplyNow(serviceData)
      .subscribe((data: any) => {

        if (data) {
          this.isLoading = false;
          console.log(data)
         
          this.route.navigate([RoutePath.APPLYNOW
          + "/" + RoutePath.APPLYNOW_INCOME + "/" + RoutePath.APPLYNOW_INCOME_ENDING]);
        }
      });

  }
}

