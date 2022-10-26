import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HouseholdFormDataService } from '../services/household-form-data.service';
import { HouseholdFoodStamp } from '../models/householdFoodStamp';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { Router } from '@angular/router';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowHouseholdhouseholdFoodStampsStrategy } from '../../../shared/route-strategies/apply-now/householdFoodStamps';
import { AppStoreService } from '../../../app-store-service';
import { IApplyNowState } from '../../+state/apply-now.models';
import { IHouseholdFoodStamps } from '../household-model';
import { ScreenQueueUtil } from '../../../shared/services/screen_queue_util.service';
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from "../../../shared/utilities/Utility";


@Component({
  selector: 'compass-ui-household-food-stamps',
  templateUrl: './household-food-stamps.component.html',
  styleUrls: ['./household-food-stamps.component.scss'],
  providers: [ApplyNowHouseholdhouseholdFoodStampsStrategy]
})
export class HouseholdFoodStampsComponent implements OnInit {
  householdFoodStampForm: FormGroup | any;
  applyNowState!: IApplyNowState;
  data: any;
  detail: any;
  states: any;
  ssnError = false;
  serviceSelected: any;
  showError = false;
  showError1 = false;

  constructor(
    private householdFdSt: FormBuilder,
    private routingStrategy: ApplyNowHouseholdhouseholdFoodStampsStrategy,
    private router: Router,
    private appService: AppStoreService,
    private service: ApplyNowStoreService,
    private cd: ChangeDetectorRef,
    private queueService: ScreenQueueUtil
  ) {
  }

  ngOnInit(): void {
    this.householdFoodStampForm = this.householdFdSt.group({
      name: '',
      ssn: ['', [Validators.maxLength(25)]],
      address: '',
      address2: '',
      city: '',
      
      state: '',
      zip: ['', Utility.zipCodeValidator()],
      phoneNo: ['', Utility.phoneNumberValidator()]
    })
    this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      this.data = this.applyNowState.metaData;
      this.detail = this.applyNowState.houseHoldDetails.householdFoodStamps as IHouseholdFoodStamps;
      this.serviceSelected = [...(this.applyNowState?.programSelection?.programs ?? [])];

      this.householdFoodStampForm.patchValue({
        name: this.detail?.name,
        ssn: this.detail?.ssn,
        address: this.detail?.address,
        address2: this.detail?.address2,
        city: this.detail?.city,
        state: this.detail?.state,
        zip: this.detail?.zip,
        phoneNo: this.detail?.phoneNo,

      })

      this.appService.getStates().subscribe((states) => {
        this.states = states;
        this.cd.detectChanges();
      });
      this.cd.detectChanges();
      
    });
    this.householdFoodStampForm.get('address').valueChanges.subscribe((selectedValue: any) => {
      this.showError = (this.householdFoodStampForm.get('address').value[0] === '#' || 
                        this.householdFoodStampForm.get('address').value[0] === '/' || 
                        this.householdFoodStampForm.get('address').value[0] === '-') ? true : false;
      if (selectedValue.length > 1) {
        this.showError = (selectedValue.slice(-1) === '#' || 
                        selectedValue.slice(-1) === '/' || 
                        selectedValue.slice(-1) === '-') ? true : false;
      }           
    });
    this.householdFoodStampForm.get('address2').valueChanges.subscribe((selectedValue: any) => {
      this.showError1 = (this.householdFoodStampForm.get('address2').value[0] === '#' || 
                        this.householdFoodStampForm.get('address2').value[0] === '/' || 
                        this.householdFoodStampForm.get('address2').value[0] === '-') ? true : false;
      if (selectedValue.length > 1) {
        this.showError1 = (selectedValue.slice(-1) === '#' || 
                        selectedValue.slice(-1) === '/' || 
                        selectedValue.slice(-1) === '-') ? true : false;
      }      
    });
  }

  checkName(check: any) {
    let charCode = check.charCode;
    return ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) 
            || charCode == 39 || charCode == 92 || charCode == 45 || charCode == 32);
  }
  
  checkAddress(check: any) {
    let charCode = check.charCode;
    return ((charCode > 47 && charCode < 58) || (charCode > 64 && charCode < 91) 
            || (charCode > 96 && charCode < 123) || charCode == 45 
            || charCode == 35 || charCode == 47 || charCode == 32);
  }

  ssnValidator(ssn: any) {
    this.ssnError = ssn;
  }

  OnlyNumberAllowed(event: { which: any; keyCode: any; }, field: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode === 8 &&  this.householdFoodStampForm.get(field).value.length < 4) {
        this.householdFoodStampForm.value[field] = undefined;
        this.householdFoodStampForm.get(field).errors = {};
        this.householdFoodStampForm.get(field).status = "VALID";
        this.householdFoodStampForm.status = "VALID";
        return true;
    }
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  isFieldValid(field: string): boolean {
    return (
            this.householdFoodStampForm.get(field).status !== "VALID" &&
            (this.householdFoodStampForm.get(field).dirty ||
                this.householdFoodStampForm.get(field).touched)
        );
    }
  errorMap(field: string) {
    if (!this.isFieldValid(field)) {
      return "";
    }
    return "";
  }

  goBack() {
    if (this.queueService.state.pageQueue.currentPageId > 0) {
        this.queueService.backPath();
    }
    else {
        this.router.navigate([
        RoutePath.APPLYNOW + 
        '/' + RoutePath.APPLYNOW_HOUSEHOLD + 
        '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDGATEPOST]);
    }
  }

  goNext() {
    if (this.ssnError || this.showError || this.showError1) return;
    var x = 'householdFoodStamps';
    sessionStorage.setItem("routingPath", x);

    if (this.householdFoodStampForm.valid) {
      const storeHouseholdFoodStamps = this.applyNowState?.houseHoldDetails;
      const storedHouseHoldFoodStamps = this.applyNowState?.houseHoldDetails.householdFoodStamps;

      this.householdFoodStampForm.value.state = this.householdFoodStampForm.value.state === "" ? null : this.householdFoodStampForm.value.state;

      const updatedHouseholdFoodStamps = {
        ...storedHouseHoldFoodStamps, householdFoodStamps: this.householdFoodStampForm.value
      }
      this.service.updateHouseHoldDetails({
        ...storeHouseholdFoodStamps, ...updatedHouseholdFoodStamps
      })
      this.queueService.next();
      return true;
    } else {
      return false;
    }

  }

  }
