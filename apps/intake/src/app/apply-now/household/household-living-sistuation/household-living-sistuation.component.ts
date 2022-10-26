import { Component, OnInit, ChangeDetectorRef, } from '@angular/core';
import { HouseholdFormDataService } from '../services/household-form-data.service';
import { HouseholdLivSistuation } from '../models/householdLivSistuation';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ApplyNowHouseholdLivingSisStrategy } from '../../../shared/route-strategies/apply-now/householdLivingSis';
import { Router } from "@angular/router";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { AppStoreService } from "../../../app-store-service";
import { IApplyNowState, Programs } from '../../+state/apply-now.models';
import { RoutePath } from '../../../shared/route-strategies';
import { ScreenQueueUtil } from '../../../shared/services/screen_queue_util.service';
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from "../../../shared/utilities/Utility";
import * as ProgramConstants from "../../../shared/constants/Individual_Programs_Constants";

@Component({
  selector: 'compass-ui-household-living-sistuation',
  templateUrl: './household-living-sistuation.component.html',
  styleUrls: ['./household-living-sistuation.component.scss'],
  providers: [ApplyNowHouseholdLivingSisStrategy],
})

export class HouseholdLivingSistuationComponent implements OnInit {

  householdLivSistuation: HouseholdLivSistuation;
  householdLivSisForm: FormGroup | any;

  datePipe: any;
  today = new Date().toISOString().slice(0, 10);
  livSitu: any;
  applyNowState!: IApplyNowState;
  data: any;
  selectedLivSituationStoreName: any;
  areYouWantToApplyLTC: any;
  sevicesselected: Array<any> = [];
  isDateValid = true;
  futureDate: any;
  pastDate: any;
  maxDateRange = new Date().toISOString().slice(0, 10);
  optionalFields = [] as string[];

  constructor(
    public householdFormDataService: HouseholdFormDataService,
    private householdLivSis: FormBuilder,
    private router: Router,
    private service: ApplyNowStoreService,
    private appService: AppStoreService,
    private cd: ChangeDetectorRef,
    private routingStrategy: ApplyNowHouseholdLivingSisStrategy,
    private queueService: ScreenQueueUtil
  ) {
    this.householdLivSistuation = this.householdFormDataService.householdLivSistuation
  }

  ngOnInit(): void {
    // this.futureDate = new Date(new Date().getTime() + 120 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    // this.pastDate = new Date(new Date().getTime() - 180 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    
    this.maxDateRange = new Date().toISOString().slice(0, 10);
    this.householdLivSisForm = this.householdLivSis.group({
      livSituation: [''],
      effDate: ['', Utility.dateMaxValidator()]
    })

    this.appService.getLivSituation().subscribe((livSituation) => {
      this.livSitu = livSituation;
      this.cd.detectChanges();
    });
    this.householdLivSisForm.controls['effDate'].setValidators([Utility.dateMaxValidator()]);
    this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      this.data = this.applyNowState?.metaData;
      this.householdLivSisForm.get('livSituation').patchValue(this.applyNowState?.houseHoldDetails?.livSituation);
      if (this.applyNowState?.houseHoldDetails && this.applyNowState?.houseHoldDetails?.effDate) {
        this.householdLivSisForm.get('effDate').patchValue(Utility.duetFormatDate(this.applyNowState?.houseHoldDetails?.effDate));
      }
      this.sevicesselected = this.applyNowState?.programSelection?.programs || [];
      const applyLTCValue = this.applyNowState.houseHoldDetails?.areYouWantToApplyLTC ?? ""
      this.areYouWantToApplyLTC = (applyLTCValue !== "" && applyLTCValue == 'N') ? false : true;

      this.cd.detectChanges();
    });

    this.householdLivSisForm.get("livSituation").valueChanges.subscribe((selectedValue: string) => {
      //this.householdLivSisForm.get('livSituation').updateValueAndValidity();
      //this.householdLivSisForm.get('effDate').updateValueAndValidity();
      this.cd.detectChanges();
    });
    this.setOrResetValidator();
  }
  
  isFieldValid(field: string): boolean {
    if (this.householdLivSisForm.get(field).status !== "VALID") {
    }
    return (
      this.householdLivSisForm.get(field).status !== "VALID" &&
      this.householdLivSisForm.get(field).touched
    );
  }
  errorMap(field: string) {
    if (!this.isFieldValid(field)) {
      return "";
    }
    switch (field) {
      case "effDate":
        if (this.householdLivSisForm.get("effDate").errors.invalidDate) {
          return "Date must be in the past";
        }
        if (this.householdLivSisForm.get("effDate").errors.duetInvalidDate) {
            return "duetInvalidDate";
        }
        break;
        break;
      default:
        return "";

    }

    return "";
  }



  previous() {
    if (
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
    if (this.isDateValid) {
      this.service.validateAllFormFields(this.householdLivSisForm);
      const storeHouseholdDetails = this.applyNowState.houseHoldDetails;
      const updatedHouseholddetails = { ...storeHouseholdDetails, ...this.householdLivSisForm.value }
      this.service.updateHouseHoldDetails(updatedHouseholddetails);
  
      if (this.areYouWantToApplyLTC) {
        this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDGATEPOST])
        // this.queueService.back()
      } else if (this.sevicesselected.indexOf(Programs.LH) > -1 ||
          this.sevicesselected.indexOf(Programs.LW) > -1
      ) {
          this.router.navigate([
              RoutePath.APPLYNOW +
                  "/" +
                  RoutePath.APPLYNOW_HOUSEHOLD +
                  "/" +
                  RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSITUATION,
          ]);
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
      return true;
    }
    return false;
  }

  dateValidator(control: AbstractControl) {
    const effictiveDate = control.value;
    //const uctEffectiveDate = effictiveDate.getUTCDate();
    const today = new Date();
    const priorDate = new Date().setDate(today.getDate() - 10);
    //const tranformPriorDate = this.datePipe.transform(this.myDate, 'MM-dd-yyyy');
    const afterDate = new Date().setDate(today.getDate() + 10);
    //alert (effictiveDate);
    if (control) {
      if (control.value == null || control.value === undefined || control.value === '') {
        //if (uctEffectiveDate > afterDate && uctEffectiveDate < priorDate){
        return { 'date_error': 'date error message' };
      }
    }
    return null;
  }

  setOrResetValidator() {
      let householdBenefits = this.service?.getBenefits() as string[];
      const fields = [{
          fieldName: 'livSituation',
          optionalProgram: ProgramConstants.HOU_LIVING_SITUATION_LIVING_OPTIONAL_PROGRAMS as string[],
          requiredProgram: [] as string[]
      },
      {
          fieldName: 'effDate',
          optionalProgram:  ProgramConstants.HOU_LIVING_SITUATION_EFFDATE_OPTIONAL_PROGRAMS as string[],
          requiredProgram: [] as string[]
      }
      ] as FormValidatorField[]
      if (householdBenefits != null && householdBenefits.length > 0) {
          const requiredOrOptionalValidatorField =
              {

                  selectedPrograms: householdBenefits,
                  optionalFields: this.optionalFields,
                  formGroup: this.householdLivSisForm,
                  fields: fields
              } as RequiredOrOptionalValidatorField
          Utility.setOrClearValidatorForFieldWithDifferntPrograms(requiredOrOptionalValidatorField)
          this.householdLivSisForm = requiredOrOptionalValidatorField.formGroup;
          this.optionalFields = [...requiredOrOptionalValidatorField.optionalFields] as any;
      }
  }
}