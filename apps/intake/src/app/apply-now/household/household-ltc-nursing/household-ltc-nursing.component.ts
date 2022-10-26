import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MenuItemState } from '../../../shared/menu-item-state';
import { IApplyNowState } from '../../+state/apply-now.models';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { RoutePath } from '../../../shared/route-strategies';
import { HouseholdFormDataService } from '../services/household-form-data.service';
import { Router } from "@angular/router";
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IHouseHold } from '../../household/household-model';
//import { HouseholdOutsidePersonCon } from "../models/householdOutsidePerson";
import { ApplyNowHouseholdLtcNursingStrategy } from "../../../shared/route-strategies/apply-now/householdLtcNursing";
import {
    FormArray,
    FormGroup,
    FormControl,
    FormBuilder,
    Validators,
    AbstractControl,
} from "@angular/forms";
import   HouseholdLtcNursingData from '../../household/household-ltc-nursing/household-ltc-nursing.json';

@Component({
  selector: 'compass-ui-household-ltc-nursing',
  templateUrl: './household-ltc-nursing.component.html',
  styleUrls: ['./household-ltc-nursing.component.scss'],
  providers: [ApplyNowHouseholdLtcNursingStrategy]
})
export class HouseholdLtcNursingComponent implements OnInit {
  @ViewChild('householdOutsidePersonFormEle') householdOutsidePersonFormEle: any;
  routePath: typeof RoutePath = RoutePath;
  householdHead!: IHouseHold;
  householdPersons: IHouseHold[] = [];
  @Output() formState = new EventEmitter<MenuItemState>();
  @Output() dataUpdated = new EventEmitter<any>();
  data: any;
  public age: any;
  public expanded = false;
  applyNowState!: IApplyNowState;
  private formSubmitAttempt: boolean = false;
  private eventsSubscription: Subscription | undefined;
  submitted = false;
  linkurl:boolean=false;
  memberCount!: number;
  areYouWantToApplyLTCForm: FormGroup | any;
  displayError: boolean = false;
  error: string = "No one in the household is selected."
  indexExpanded = -1;
  selectedUserids: string[] = [];
  householdMembers: any[] = []
  householdLtcNursingJsonData: any;
  simpleTileButtongroupData:any;
  serviceSelected: any;
  constructor(private fb: FormBuilder, private store: Store<any>, private service: ApplyNowStoreService, private cd: ChangeDetectorRef,
    private routingStrategy: ApplyNowHouseholdLtcNursingStrategy,
    private router: Router, public householdFormDataService: HouseholdFormDataService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      let radioLabel =  document.getElementsByClassName("form-check-label")[0];
        // radioLabel.classList.add("mt-3");
    }, 10);
    this.areYouWantToApplyLTCForm = this.fb.group({
      id: this.fb.array([]),
      areYouWantToApplyLTC: ["", Validators.required]
    });
    this.householdLtcNursingJsonData = HouseholdLtcNursingData;
    this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      this.data = this.applyNowState?.metaData;
      this.householdHead = this.applyNowState.houseHoldDetails?.householdHead;
      this.householdPersons = this.applyNowState.houseHoldDetails?.houseHoldPersons || [];
      this.serviceSelected = [
                ...(this.applyNowState?.programSelection?.programs ?? []),
            ];
      this.areYouWantToApplyLTCForm.get('areYouWantToApplyLTC')
        .patchValue(this.applyNowState?.houseHoldDetails?.areYouWantToApplyLTC ? (this.applyNowState?.houseHoldDetails?.areYouWantToApplyLTC === "Y" ? "Yes" : "No") : null);
      this.memberCount = 0;
      for (let data of this.householdPersons) {
        this.memberCount = this.memberCount + 1
      }
      this.cd.detectChanges();
      this.cd.detectChanges();
    });

    if (this.applyNowState.houseHoldDetails) {
      this.householdMembers = this.householdPersons;
    }
  }

  onSubmit(): boolean {
    this.service.validateAllFormFields(this.areYouWantToApplyLTCForm);
    if (this.areYouWantToApplyLTCForm.status.toLowerCase() === 'valid') {
      this.areYouWantToApplyLTCForm.value.areYouWantToApplyLTC = this.areYouWantToApplyLTCForm.value.areYouWantToApplyLTC === "Yes" ? "Y" : "N"
      const storeHouseholdDetails = this.applyNowState.houseHoldDetails;
      const updatedHouseholddetails ={ ...storeHouseholdDetails, ...this.areYouWantToApplyLTCForm.value }
      this.service.updateHouseHoldDetails(updatedHouseholddetails);


      if (this.applyNowState.houseHoldDetails.areYouWantToApplyLTC == "Y")
      this.router.navigate([this.routingStrategy.nextRoute()]);
      else
      {
        if (this.serviceSelected.includes("LI") ||
            this.serviceSelected.includes("LN")) {
            this.service.updateHouseholdServicesSelected([]);
        }
        this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDBENEFITS]);
      }
      return true;
    }
    else {
      this.displayError = true;
      return false;
    }
  }

  isFieldValid(field: string): boolean {
    if (this.areYouWantToApplyLTCForm.get(field).status !== 'VALID') {
      console.log("invalid")
      console.log(field)
      console.log(this.areYouWantToApplyLTCForm.get(field).touched);
    }
    return (this.areYouWantToApplyLTCForm.get(field).status !== 'VALID' && this.areYouWantToApplyLTCForm.get(field).touched)
  }

  errorMap(field: string) {
    if (!this.isFieldValid(field)) {
      return "";
    }

    switch (field) {
      case 'areYouWantToApplyLTC':
        if (this.areYouWantToApplyLTCForm.get('areYouWantToApplyLTC').errors.required) {
          return "The question is not answered";
        }
        break;
      default:
        return "";
        break;
    }
    return "";
  }

  previous() {
   if(this.memberCount ===1)
     this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDHEADSELECTION])
   else
     this.router.navigate([this.routingStrategy.previousRoute()]);
  }
  ngOnDestroy(): void {
    this.dataUpdated.emit(this.areYouWantToApplyLTCForm.value);
    // this.formState.emit(MenuItemState.COMPLETED);
  }
}
