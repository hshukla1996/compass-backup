import { Component, OnInit, ChangeDetectorRef, } from '@angular/core';
import { HouseholdFormDataService } from '../services/household-form-data.service';
import { HouseholdSituation } from '../models/householdSituation';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ApplyNowHouseholdSituationStrategy } from '../../../shared/route-strategies/apply-now/householdSituation';
import { Router } from "@angular/router";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { AppStoreService } from "../../../app-store-service";
import { IApplyNowState, Programs } from '../../+state/apply-now.models';
import { ScreenQueueUtil } from '../../../shared/services/screen_queue_util.service';
import { ThisReceiver } from '@angular/compiler';
import { RoutePath } from '../../../shared/route-strategies';
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from "../../../shared/utilities/Utility";
import * as ProgramConstants from "../../../shared/constants/Individual_Programs_Constants";

@Component({
  selector: 'compass-ui-household-situation',
  templateUrl: './household-situation.component.html',
  styleUrls: ['./household-situation.component.scss'],
  providers: [ApplyNowHouseholdSituationStrategy],
})

export class HouseholdSituationComponent implements OnInit {
  householdSituations: HouseholdSituation;
  householdSituationForm: FormGroup | any;
  houSitu: any;
  selectedHouSituationName: any;
  applyNowState!: IApplyNowState;
  data: any;
  inputLength: any;
  sevicesselected: Array<any> = [];
  requiredFields=[] as string[];

  constructor(
    public householdFormDataService: HouseholdFormDataService,
    private householdSituation: FormBuilder,
    private router: Router,
    private service: ApplyNowStoreService,
    private cd: ChangeDetectorRef,
    private routingStrategy: ApplyNowHouseholdSituationStrategy,
    private appService: AppStoreService,
    private queueService: ScreenQueueUtil
  ) {
    this.householdSituations = this.householdFormDataService.householdSituation
  }

  ngOnInit(): void {
    this.householdSituationForm = this.householdSituation.group({
      houSituation: ['', Validators.required],
      othHouSituation: [
        "",
        [
          this.myFormValidator(
            () =>
              this.householdSituationForm.value.houSituation?.includes(
                6
              ),
            Validators.required
          ),
          // Validators.pattern("[A-Za-z-'\\\\]+"),
          Validators.maxLength(256),
        ],
      ],
    })

    this.appService.getHouSituation().subscribe((houSituation) => {
      this.houSitu = houSituation;
      this.cd.detectChanges();
    });

    this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      this.data = this.applyNowState?.metaData;
      this.sevicesselected = this.applyNowState?.programSelection?.programs || [];
      this.householdSituationForm.get('houSituation').patchValue(this.applyNowState?.houseHoldDetails?.houSituation);
      this.householdSituationForm.get('othHouSituation').patchValue(this.applyNowState?.houseHoldDetails?.othHouSituation);
      
      if (this.applyNowState?.houseHoldDetails?.houSituation === '6')
        this.selectedHouSituationName = '6';

      // if (this.applyNowState?.houseHoldDetails?.houSituation === '6') {
      //   this.showAnotherName = true
      // } else {
      //   this.showAnotherName = false
      // }
      this.cd.detectChanges();
    });

    this.householdSituationForm.get("houSituation").valueChanges.subscribe((selectedValue: string) => {

      this.selectedHouSituationName = selectedValue;
      if (selectedValue === '6') {
        this.householdSituationForm.get('othHouSituation').setValidators(Validators.required);
      }
      else {
        this.householdSituationForm.get('othHouSituation').clearValidators();
      }

      this.householdSituationForm.get('othHouSituation').updateValueAndValidity();
      if (this.householdSituationForm.get('HouSituation')) {
        this.householdSituationForm.get('HouSituation').updateValueAndValidity();
      }
      this.cd.detectChanges();
    });
    this.setOrResetValidator();
  }

  private myFormValidator(predicate: any, validator: any): any {
    return (formControl: FormControl) => {
      if (!formControl.parent) {
        return null;
      }
      if (predicate()) {
        return validator(formControl);
      }
      return null;
    };
  }

  // showAnotherName: boolean = false;
  // addAnotherName() {
  //   this.showAnotherName = true;
  // }
  // removeAnotherName() {
  //   this.householdSituationForm.get("othHouSituation").value = "";
  //   this.showAnotherName = false;
  // }

  isFieldValid(field: string): boolean {
    const formField = this.householdSituationForm.get(field);
    return (
      formField && this.householdSituationForm.get(field).status !== "VALID" &&
      this.householdSituationForm.get(field).touched
    );
  }
  errorMap(field: string) {
    if (!this.isFieldValid(field)) {
      return "";
    }

    switch (field) {
      case "houSituation":
        if (this.householdSituationForm.get("houSituation").errors.required) {
          return "No housing situation option is selected";
        }
        break;
      case "othHouSituation":
        if (this.householdSituationForm.get("othHouSituation").errors.required) {
          return "No description for the other housing situation is entered";
        }
        break;
      default:
        return "";
        break;
    }
    return "";
  }

  previous() {
    if (this.sevicesselected.indexOf(Programs.WN) > -1 ||
      this.sevicesselected.indexOf(Programs.LN) > -1 ||
      this.sevicesselected.indexOf(Programs.LI) > -1 ) {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_HOUSEHOLD +
                "/" +
                RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDLIVINGSIS,
        ]);
    }
    else if (
        this.sevicesselected.indexOf(Programs.FS) > -1
    ) {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_HOUSEHOLD +
                "/" +
                RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDQUICKSNAPEND,
        ]);
    }
    else {
      this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_HOUSEHOLD +
                "/" +
                RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDCONTACTINFO,
        ]);
    }
  }

  onSubmit(): boolean {
    this.service.validateAllFormFields(this.householdSituationForm);
    console.log("householdliv", this.householdSituationForm.value, this.householdSituationForm.valid)
    if (this.householdSituationForm.status.toLowerCase() === 'valid') {
      const storeHouseholdDetails = this.applyNowState.houseHoldDetails;
      const updatedHouseholddetails = { ...storeHouseholdDetails, ...this.householdSituationForm.value }
      this.service.updateHouseHoldDetails(updatedHouseholddetails);
      if (this.sevicesselected.indexOf(Programs.LH) > -1) {
        this.router.navigate([RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDELECTRICPROVIDER])
      }
      else if (this.sevicesselected.indexOf(Programs.LW) > -1) {
        this.router.navigate([RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDWATERQUES])
      }
      else {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_HOUSEHOLD +
                "/" +
                RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDGATEPOST,
        ]);
      }
      // this.queueService.next();
      return true;
    }
    else {
      if (this.householdSituationForm.get("othHouSituation").length > 0) {
        this.inputLength = false
      }
      else {
        this.inputLength = true
      }
      return false;
    }
  }

  setOrResetValidator() {
      let householdBenefits = this.service?.getBenefits() as string[];
      const fields = [{
          fieldName: 'houSituation',
          optionalProgram: [] as string[],
          requiredProgram: ProgramConstants.HOU_CURRENT_HOUSING_SITUATION_REQUIRED_PROGRAM as string[]
      },
      {
          fieldName: 'othHouSituation',
          optionalProgram:  [] as string[],
          requiredProgram: ProgramConstants.HOU_CURRENT_HOUSING_OTHER_SITUATION_REQUIRED_PROGRAM as string[]
      }
      ] as FormValidatorField[]
      if (householdBenefits != null && householdBenefits.length > 0) {
          const requiredOrOptionalValidatorField =
              {

                  selectedPrograms: householdBenefits,
                  requiredFields: this.requiredFields,
                  formGroup: this.householdSituationForm,
                  fields: fields
              } as RequiredOrOptionalValidatorField
          Utility.setOrClearValidatorForFieldWithDifferntPrograms(requiredOrOptionalValidatorField)
          this.householdSituationForm = requiredOrOptionalValidatorField.formGroup;
          this.requiredFields = [...requiredOrOptionalValidatorField.requiredFields] as any;
      }
    }
}
