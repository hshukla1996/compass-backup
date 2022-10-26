import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HouseholdFormDataService } from '../services/household-form-data.service';
import { HouseholdAppliedBefore } from '../models/householdAppliedBefore';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ApplyNowHouseholdhouseholdAppliedBeforeStrategy } from '../../../shared/route-strategies/apply-now/householdAppliedBefore';
import { IApplyNowState, Programs } from '../../+state/apply-now.models';
import { Router } from '@angular/router';
import { RoutePath } from '../../../shared/route-strategies';
import { AppStoreService } from '../../../app-store-service';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseholdBenefitsAppliedBefore } from '../household-model';
import { ScreenQueueUtil } from '../../../shared/services/screen_queue_util.service';
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from "../../../shared/utilities/Utility";
import * as ProgramConstants from "../../../shared/constants/Individual_Programs_Constants";

@Component({
  selector: 'compass-ui-household-applied-before',
  templateUrl: './household-applied-before.component.html',
  styleUrls: ['./household-applied-before.component.scss'],
  providers: [ApplyNowHouseholdhouseholdAppliedBeforeStrategy]
})
export class HouseholdAppliedBeforeComponent implements OnInit {


  // householdAppliedBefore : HouseholdAppliedBefore;
  householdAppliedBeforeForm : FormGroup | any;

  applyNowState!: IApplyNowState;
  data: any;
  detail: any;
  stateList: any;
  states: any;
  requiredFields=[] as string[];
  optionalFields = [] as string[];
  showRequired = false;
  sevicesselected: Array<any> = [];
  constructor(
        // public householdFormDataService : HouseholdFormDataService,
        // private householdAppBefo :  FormBuilder,
    private fb: FormBuilder,
    private routingStrategy: ApplyNowHouseholdhouseholdAppliedBeforeStrategy,
    private router: Router,
    private appService: AppStoreService,
    private service: ApplyNowStoreService,
    private cd: ChangeDetectorRef,
    private queueService: ScreenQueueUtil

    ) { 
          // this.householdAppliedBefore = this.householdFormDataService.householdAppliedBefore
    }

  ngOnInit(): void {
    this.householdAppliedBeforeForm = this.fb.group({
      state: [''],
      county: ['', [Validators.maxLength(16), Validators.pattern('[A-Za-z\-\'\\\\]+')]]
    })
    this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      this.sevicesselected = this.applyNowState?.programSelection?.programs || [];
      this.data = this.applyNowState.metaData;
      this.detail = this.applyNowState.houseHoldDetails.householdBenefitsAppliedBefore as IHouseholdBenefitsAppliedBefore;
      // console.log("mailingbsb", this.detail)

      this.householdAppliedBeforeForm.patchValue({
        state: this.detail?.state,
        county: this.detail?.county,

      })

      this.appService.getStates().subscribe((states) => {
        this.states = states;
        this.cd.detectChanges();
      });

      // of(true).pipe(delay(10)).subscribe(() => {
      //   this.householdElectricProviderForm.patchValue({
      //     electricCompany: this.detail?.electricCompany,
      //     acconumber: this.detail?.acconumber

      //   })
      // });
      this.cd.detectChanges();
      if (this.sevicesselected.indexOf(Programs.CA) > -1 ||
          this.sevicesselected.indexOf(Programs.LN) > -1 ||
          this.sevicesselected.indexOf(Programs.LI) > -1 ||
          this.sevicesselected.indexOf(Programs.WN) > -1 ||
          this.sevicesselected.indexOf(Programs.WNR) > -1 ||
          this.sevicesselected.indexOf(Programs.WN) > -1 ||
          this.sevicesselected.indexOf(Programs.WAR) > -1 ||
          this.sevicesselected.indexOf(Programs.ECA) > -1) {
        this.showRequired = true;
      }

    });
    this.setOrResetValidator();
  }

  errorMap(field: string) {
    if (!this.isFieldValid(field)) {
      return "";
    }

    switch (field) {
     
      case "state":
        if (this.householdAppliedBeforeForm.get("state").errors.required) {
          return "No state is selected from the dropdown";
        }
        break;
     
      default:
        return "";
        break;
    }
    return "";
  }

  isFieldValid(field: string): boolean {
    const formField = this.householdAppliedBeforeForm.get(field);
    return (
      formField &&
      this.householdAppliedBeforeForm.get(field).status !== "VALID" &&
      this.householdAppliedBeforeForm.get(field).touched
    );
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
    
    var x = 'householdAppliedBefore';
    sessionStorage.setItem("routingPath", x);
    this.service.validateAllFormFields(this.householdAppliedBeforeForm);
    if (this.householdAppliedBeforeForm.valid) {
      const storeHouseholdAppliedBeforeBenefits = this.applyNowState?.houseHoldDetails;
      const storedHouseholdAppliedBeforeBenefits = this.applyNowState?.houseHoldDetails.householdBenefitsAppliedBefore;

      const updatedHouseholdAppliedBefore = {
        ...storedHouseholdAppliedBeforeBenefits, householdBenefitsAppliedBefore: this.householdAppliedBeforeForm.value
      }
      this.service.updateHouseHoldDetails({
        ...storeHouseholdAppliedBeforeBenefits, ...updatedHouseholdAppliedBefore
      })
      this.queueService.next();
      return true;
    } else {
      return false;
    }

  }

  setOrResetValidator() {
        let householdBenefits = this.service?.getBenefits() as string[];
        const fields = [{
            fieldName: 'state',
            optionalProgram: [] as string[],
            requiredProgram: ProgramConstants.HOU_APPLIED_BEFORE_STATE_REQUIRED_PROGRAMS as string[]
        },
        {
            fieldName: 'county',
            optionalProgram:  ProgramConstants.HOU_APPLIED_BEFORE_COUNTY_OPTIONAL_PROGRAMS as string[],
            requiredProgram: [] as string[]
        }
        ] as FormValidatorField[]
        if (householdBenefits != null && householdBenefits.length > 0) {
            const requiredOrOptionalValidatorField =
                {

                    selectedPrograms: householdBenefits,
                    requiredFields: this.requiredFields,
                    optionalFields: this.optionalFields,
                    formGroup: this.householdAppliedBeforeForm,
                    fields: fields
                } as RequiredOrOptionalValidatorField
            Utility.setOrClearValidatorForFieldWithDifferntPrograms(requiredOrOptionalValidatorField)
            this.householdAppliedBeforeForm = requiredOrOptionalValidatorField.formGroup;
            this.requiredFields = [...requiredOrOptionalValidatorField.requiredFields] as any;
            this.optionalFields = [...requiredOrOptionalValidatorField.optionalFields] as any;
        }
    }

}
