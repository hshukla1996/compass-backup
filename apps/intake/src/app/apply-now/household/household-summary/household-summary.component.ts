import { Component, ChangeDetectorRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { AppStoreService } from "../../../app-store-service";
import { IApplyNowState, Programs } from "../../+state/apply-now.models";
import { IHouseHold } from '../household-model';
import { format } from 'date-fns';
import { ScreenQueueUtil, ScreenQueueRouteNameDIQ } from '../../../shared/services/screen_queue_util.service';
import { ApplyNowHouseholdhouseholdSummaryStrategy } from "../../../shared/route-strategies/apply-now/householdSummary";
import {ApplyNowService} from "../../../shared/services/apply-now.service";

@Component({
  selector: 'compass-ui-household-summary',
  templateUrl: './household-summary.component.html',
  styleUrls: ['./household-summary.component.scss'],
  providers: [ApplyNowHouseholdhouseholdSummaryStrategy]
})
export class HouseholdSummaryComponent implements OnInit {
  public age: any;
  public expanded = false;
  memberCount!: number;
  householdHead!: IHouseHold;
  householdPersons: IHouseHold[] = [];
  applyNowState!: IApplyNowState;
  indexExpanded = -1;
  sevicesselected: any[] = [];
  data: any;
  loadingText = "Loading..."
  isLoading = false;
  showLTC: boolean = false;
  hasLivedInNursingFacility: any;
  serviceData!: any;
  benefitCount!: number;
  householdGatepost1: any
  householdGatepost2: any;

  constructor(private router: Router,
    private cd: ChangeDetectorRef,
    private service: ApplyNowStoreService,
              private applyNowService: ApplyNowService,
    private queueService: ScreenQueueUtil,
    private routingStrategy: ApplyNowHouseholdhouseholdSummaryStrategy,

  ) { }

  ngOnInit(): void {
    this.service.getAppData().subscribe((d) => {
      this.applyNowState = { ...d };
      this.householdHead = {
        ...this.applyNowState.houseHoldDetails?.householdHead,
      };
      this.serviceData = this.applyNowState.gettingStartedResponse;
      this.sevicesselected = [...this.applyNowState?.programSelection?.programs ?? []];
      this.householdPersons = this.applyNowState.houseHoldDetails?.houseHoldPersons || [];

      this.hasLivedInNursingFacility = this.applyNowState.householdMemberSituationGatepostSelection?.hasLivedInNursingFacility;
      this.householdGatepost1 = this.applyNowState.houseHoldDetails.householdGatepostValue ? this.applyNowState.houseHoldDetails.householdGatepostValue.checked : '';
      this.householdGatepost2 = this.applyNowState.householdMemberSituationGatepostSelection;

      console.log(this.householdGatepost1.includes('ssnbenefits'))

      if (this.applyNowState.houseHoldDetails.areYouWantToApplyLTC == "Yes") {
        this.showLTC = true;
      }
      else {
        this.showLTC = false;
      }
      this.memberCount = 0;
      for (let data of this.householdPersons) {
        this.memberCount = this.memberCount + 1
      }
      this.cd.detectChanges();

      this.benefitCount = 0;
      for (let data of this.sevicesselected) {
        this.benefitCount = this.benefitCount + 1
      }
      this.cd.detectChanges();
    }
    )
  }

  navigateToEdit() {

    setTimeout(() => {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDMEMBERSUMMARY]);
    }, 100);
  }
  navigateToBenefit() {
    this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDBENEFITS]);
  }

  navigateToLTC() {
    this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDWHOAPPLYLTC]);
  }

  navigateToAddressContact() {
    this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDADDRESS]);
    // this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDCONTACTINFO]);
  }

  navigateToElectricityWater() {
    this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDELECTRICPROVIDER]);
  }

  navigateToHouseholdSituations() {
    this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDGATEPOST]);
  }

  navigateToReceivedBenefitsBefore() {
    this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDAPPLIEDBEFORE]);
  }

  navigateToCountyorRecordNumber() {
    this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDCOUNTRYRECORDNO]);
  }

  navigateToFoodAssistanceorSNAPRepresentative() {
    this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDFOODSTAMPS]);
  }

  navigateToOtherHouseholdSituations() {
    this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDMEMBERSITUATIONGATEPOST]);
  }

  navigateToUtilityAllowanceCheck() {
    this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDUTILITYALLOW]);
  }

  navigateToAbsentRelatives() {
    this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVEDETAILS]);
  }

  navigateToNursingHomeFacility() {
    this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_NURSINGFACILITYDETAILS]);
  }

  back() {

    //this.router.navigate([this.routingStrategy.previousRoute()]);
    if (this.hasLivedInNursingFacility == true) {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_NURSINGFACILITYDETAILS]);
    } else if (this.sevicesselected.indexOf(Programs.LW) > -1 && this.sevicesselected.length === 1) {
      this.router.navigate([RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDWATERQUES])
    }
    else if (
            this.sevicesselected.indexOf(Programs.CI) > -1 ||
            this.sevicesselected.indexOf(Programs.BL) > -1
        ) {
            this.router.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_HOUSEHOLD +
                    "/" +
                    RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDCONTACTINFO,
                ]);
        }
    else
     // this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDABSENTRELATIVESUMMARY]);
    {this.queueService.back();
    const x = sessionStorage.getItem("routingPathEnd");
    this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + x]);
  }
}

  next() {
    // var y = 'householdSummary';
    // sessionStorage.setItem("routingPathEnd", y);
    this.isLoading = true;
    console.log("this.serviceData");
    const serviceData = { ...this.serviceData };
    console.log(this.serviceData);
    console.log(this.service.getHouseHoldDetails);


    serviceData.household = this.service.getHouseholdContracts();
    console.log(serviceData.household)

    serviceData.people = {
      individuals:
      this.service.getHouseHoldDetails.houseHoldPersons,
      absentRelatives:
      this.service.getHouseHoldDetails.absentRelative
    }
    // serviceData.people.individuals = this.householdData.houseHoldPersons;
    //
    //this.queueService.next()
    // console.log("servicesdata");
    // console.log(serviceData)
    this.applyNowService
      .postSaveApplyNow(serviceData)
      .subscribe((data: any) => {
        if (data) {
          this.isLoading = false;
          console.log(data)
    this.router.navigate([
        RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_HOUSEHOLD +
            "/" +
            RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDENDING,
    ]);
    //this.queueService.next();
        }
      });
  }
}
