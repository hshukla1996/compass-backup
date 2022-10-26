import { HouseholdFormDataService } from '../services/household-form-data.service';
import { HouseholdUtility } from '../models/householdUtility';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ApplyNowHouseholdUtilityAllowStrategy } from "../../../shared/route-strategies/apply-now/householdUtilityAllow";
import { Component, OnInit, ChangeDetectorRef, } from '@angular/core';
import { Router } from "@angular/router";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { AppStoreService } from "../../../app-store-service";
import { IApplyNowState } from '../../+state/apply-now.models';
import { UtilService } from '../../../shared/services/util.service';
import { ScreenQueueUtil, ScreenQueueRouteNameDIQ } from '../../../shared/services/screen_queue_util.service';
import {IAbsentRelative} from "../household-model";
import {RoutePath} from "../../../shared/route-strategies";

@Component({
  selector: 'compass-ui-household-utility-allow',
  templateUrl: './household-utility-allow.component.html',
  styleUrls: ['./household-utility-allow.component.scss'],
  providers: [ApplyNowHouseholdUtilityAllowStrategy],
})
export class HouseholdUtilityAllowComponent implements OnInit {

  //householdUtility: HouseholdUtility;
  householdUtilityForm: FormGroup | any;
  applyNowState!: IApplyNowState;
  absentRelatives!:IAbsentRelative[];
  data: any;

  constructor(
    public householdFormDataService: HouseholdFormDataService,
    private HouseholdUtil: FormBuilder,
    private router: Router,
    private queueService: ScreenQueueUtil,
    private service: ApplyNowStoreService,
    private cd: ChangeDetectorRef,
    private routingStrategy: ApplyNowHouseholdUtilityAllowStrategy,
    private appService: AppStoreService
  ) {
    /* this.householdUtility = this.householdFormDataService.householdUtility
    */
  }

  ngOnInit(): void {
    this.householdUtilityForm = this.HouseholdUtil.group({
      allowance: ['', Validators.required]
    })
    this.absentRelatives = this.service.getAbsentRelatives;

    this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
     // this.data = this.applyNowState?.metaData;
      //alert('test3 -'+this.applyNowState?.houseHoldDetails?.allowance);

      this.householdUtilityForm.get('allowance').patchValue(this.applyNowState?.houseHoldDetails?.allowance);
      this.cd.detectChanges();
      this.householdUtilityForm.get('allowance').updateValueAndValidity();
      this.cd.detectChanges();
    });
  }

  checkAllowance(check: any) {
    let charCode = check.charCode;
        return ((charCode > 47 && charCode < 58) || charCode == 92 || charCode == 46);
  }

  OnlyNumberAllowed(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  isFieldValid(field: string): boolean {
    const formField = this.householdUtilityForm.get(field);
    return (
      formField && this.householdUtilityForm.get(field).status !== "VALID" &&
      this.householdUtilityForm.get(field).touched
    );
  }
  errorMap(field: string) {
    if (!this.isFieldValid(field)) {
      return "";
    }

    switch (field) {
      case "allowance":
        if (this.householdUtilityForm.get("allowance").errors.required) {
          return "No utility allowance check amount is entered";
        }
        break;

      default:
        return "";
        break;
    }
    return "";
  }

  previous() {
   if (this.queueService.state.pageQueue.currentPageId > 0) {
        this.queueService.backPath();
    }
    else {
        this.router.navigate([
        RoutePath.APPLYNOW + 
        '/' + RoutePath.APPLYNOW_HOUSEHOLD + 
        '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDMEMBERSITUATIONGATEPOST]);
    }
  }
  onSubmit(): boolean {
     var x = 'householdUtilityAllow';
    sessionStorage.setItem("routingPath", x); 
 
    this.service.validateAllFormFields(this.householdUtilityForm);
    if (this.householdUtilityForm.status.toLowerCase() === 'valid') {
      const storeHouseholdDetails = this.applyNowState.houseHoldDetails;
      const updatedHouseholddetails = { ...storeHouseholdDetails, ...this.householdUtilityForm.value }
      this.service.updateHouseHoldDetails(updatedHouseholddetails);
      if(this.absentRelatives.length>0){
        this.queueService.next();
       // this.router.navigate([RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDABSENTRELATIVESUMMARY]);
      }
      else {
        this.queueService.next();
       // this.router.navigate([this.routingStrategy.nextRoute()]);
      }
     // this.queueService.next()
      return true;
    }
    else {
      return false;
    }
  }
}
