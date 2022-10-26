import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, delay } from 'rxjs';
import { AppStoreService } from '../../../app-store-service';
import { ApplyNowResourcesBurialOrTrustAgreementAdditionalDetailsStrategy } from '../../../shared/route-strategies/apply-now/burial-or-trust-agreement-additional-details';
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IBurialTrustAgreement, IBurialTrustAgreementDetails, IHouseHoldDetails, IResources } from '../../household/household-model';
import * as ProgramConstants from "../../../shared/constants/Individual_Programs_Constants";
import { RoutePath } from '../../../shared/route-strategies';
@Component({
  selector: 'compass-ui-burial-or-trust-agreement-additional-details',
  templateUrl: './burial-or-trust-agreement-additional-details.component.html',
  styleUrls: ['./burial-or-trust-agreement-additional-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApplyNowResourcesBurialOrTrustAgreementAdditionalDetailsStrategy]
})
export class BurialOrTrustAgreementAdditionalDetailsComponent implements OnInit {

  public burialTrustAgreementAdditionalDetailsForm: FormGroup | any;
  public requiredFields = [] as string[];
  public states: any;
  public maxDateRange: any;
  houseHoldDetails!: IHouseHoldDetails;
  fragment = "0";

  constructor(private fb: FormBuilder,
    private service: ApplyNowStoreService,
    private cd: ChangeDetectorRef,
    private routingStrategy: ApplyNowResourcesBurialOrTrustAgreementAdditionalDetailsStrategy,
    private router: Router,
    private appService: AppStoreService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.burialTrustAgreementAdditionalDetailsForm = this.fb.group({
      agreementdate: [''],
      accountno: [""],
      estimatevalue: [""],
      withdrawmoney: [""]
    });

    this.appService.getStates().subscribe((states) => {
      this.states = states;
      this.cd.detectChanges();
    });

    this.service.getAppData().subscribe(d => {
      this.houseHoldDetails = this.service.getHouseHoldDetails;
    });

    this.activatedRoute.fragment.subscribe((fragment) => {
      const resourcesCnt = this.houseHoldDetails.resources?.anyoneHaveBurialORTrustAgreementWithBankORFuneralHome?.burialAgreementCollection?.length || 0
      this.fragment = fragment || (resourcesCnt > 0 ? (resourcesCnt - 1).toString() : "");
      if (this.fragment !== "" && this.fragment !== null) {
        if (this.houseHoldDetails.resources?.anyoneHaveBurialORTrustAgreementWithBankORFuneralHome?.burialAgreementCollection) {
          this.setFormValues(this.houseHoldDetails.resources?.anyoneHaveBurialORTrustAgreementWithBankORFuneralHome?.burialAgreementCollection[+this.fragment] as IBurialTrustAgreementDetails);
        }
        else {
          this.setFormValues();
        }
      }
    });

    this.setOrResetValidator();
    this.burialTrustAgreementAdditionalDetailsForm.get('estimatevalue').setValidators([Validators.maxLength(9), Validators.pattern('^[0-9\.]*$'), Validators.max(1000000)]);
    this.burialTrustAgreementAdditionalDetailsForm.get('accountno').setValidators([Validators.maxLength(25), Validators.pattern('^[a-zA-Z0-9`/-]*$')]);
  }

  /// set Form Values
  private setFormValues(data?: IBurialTrustAgreementDetails) {
    if (data) {
      of(true).pipe(delay(10)).subscribe(() => {
        this.burialTrustAgreementAdditionalDetailsForm.patchValue({
          agreementdate: Utility.duetFormatDate(data.dateBurialAgreementEstablished),
          accountno: data.accountNumber,
          estimatevalue: data.valueOfAccount,
          withdrawmoney: data.canMoneyWithDrawnBeforeDeathOfIndividual
        });
      });
    }
  }

  private setOrResetValidator() {
    let householdBenefits = this.service?.getBenefits() as string[];
    const fields = [{
      fieldName: 'agreementdate',
      optionalProgram: ProgramConstants.IND_BURIAL_TRUST_ADDITIONAL_DETAILS_OPTIONALPROGRAMS as string[],
      requiredProgram: [] as string[]

    }, {
      fieldName: 'accountno',
      optionalProgram: ProgramConstants.IND_BURIAL_TRUST_ADDITIONAL_DETAILS_OPTIONALPROGRAMS as string[],
      requiredProgram: [] as string[]

    }, {
      fieldName: 'estimatevalue',
      optionalProgram: ProgramConstants.IND_BURIAL_TRUST_ADDITIONAL_DETAILS_OPTIONALPROGRAMS as string[],
      requiredProgram: [] as string[]

    }, {
      fieldName: 'withdrawmoney',
      optionalProgram: ProgramConstants.IND_BURIAL_TRUST_ADDITIONAL_DETAILS_OPTIONALPROGRAMS as string[],
      requiredProgram: [] as string[]

    }] as FormValidatorField[];

    if (householdBenefits != null && householdBenefits.length > 0) {
      const requiredOrOptionalValidatorField =
        {
          selectedPrograms: householdBenefits,
          requiredFields: this.requiredFields,
          formGroup: this.burialTrustAgreementAdditionalDetailsForm,
          fields: fields
        } as RequiredOrOptionalValidatorField
      Utility.setOrClearValidatorForFieldWithDifferntPrograms(requiredOrOptionalValidatorField)
      this.burialTrustAgreementAdditionalDetailsForm = requiredOrOptionalValidatorField.formGroup;
      this.requiredFields = [...requiredOrOptionalValidatorField.requiredFields] as any;
    }
  }

  goBack() {
    this.router.navigate([this.routingStrategy.previousRoute()], { fragment: this.fragment });
  }

  goNext(): void {
    if (this.burialTrustAgreementAdditionalDetailsForm.valid) {
      const existingBurialDetails = { ...this.houseHoldDetails.resources?.anyoneHaveBurialORTrustAgreementWithBankORFuneralHome };
      let updatedBurialResource: IBurialTrustAgreement;
      let updatedResources: IResources;

      let existingResources = [] as IBurialTrustAgreementDetails[];
      if (existingBurialDetails && existingBurialDetails.burialAgreementCollection && existingBurialDetails.burialAgreementCollection.length > 0) {
        existingResources = [...existingBurialDetails.burialAgreementCollection];
        existingBurialDetails.burialAgreementCollection.forEach((resource, i) => {
          if (i === parseInt(this.fragment)) {            
            resource = {
              ...resource, ...{
                dateBurialAgreementEstablished : this.burialTrustAgreementAdditionalDetailsForm.get('agreementdate').value,
                accountNumber : this.burialTrustAgreementAdditionalDetailsForm.get('accountno').value,
                valueOfAccount : this.burialTrustAgreementAdditionalDetailsForm.get('estimatevalue').value,
                canMoneyWithDrawnBeforeDeathOfIndividual : this.burialTrustAgreementAdditionalDetailsForm.get('withdrawmoney').value,                
              }
            };

            existingResources.splice(parseInt(this.fragment), 1, resource);
          }
        })
      }

      updatedBurialResource = { ...existingBurialDetails, ...{ burialAgreementCollection: [...existingResources] } };
      updatedResources = { ...this.houseHoldDetails.resources, ...{ anyoneHaveBurialORTrustAgreementWithBankORFuneralHome: updatedBurialResource } };
      
      if (this.houseHoldDetails) {
        this.service.updateHouseHoldDetails(
          { ...this.houseHoldDetails, ...{ resources: updatedResources } }
        )
      }

      this.router.navigate([RoutePath.APPLYNOW +
        '/' + RoutePath.APPLYNOW_RESOURCES +
        '/' + RoutePath.APPLYNOW_RESOURCES_BURIALORTRUSTAGREEMENT],
        { fragment: this.fragment.toString() });
        
    }
  }

  public isFieldValid(field: string): boolean {
    const formField = this.burialTrustAgreementAdditionalDetailsForm.get(field);
    return (
      formField && this.burialTrustAgreementAdditionalDetailsForm.get(field).status !== "VALID" &&
      this.burialTrustAgreementAdditionalDetailsForm.get(field).touched
    );
  }

  public errorMap(field: string) {
    if (!this.isFieldValid(field)) {
      return "";
    }
    switch (field) {
      case "accountno":
        if (
          this.burialTrustAgreementAdditionalDetailsForm.get("bankName").errors.patteren
        ) {
          return "Please enter the account number in correct format.";
        }
        if (
          this.burialTrustAgreementAdditionalDetailsForm.get("bankName").errors.maxlength
        ) {
          return "The Name of the bank or funeral home must be at less than 25 characters long.";
        }
        break;
      case "estimatevalue":
        if (
          this.burialTrustAgreementAdditionalDetailsForm.get("estimatevalue").errors.patteren
        ) {
          return "Please enter the estimate value in correct format.";
        }
        if (
          this.burialTrustAgreementAdditionalDetailsForm.get("estimatevalue").errors.maxlength
        ) {
          return "The Name of the bank or funeral home must be at less than 9 characters long.";
        }

        if (
          this.burialTrustAgreementAdditionalDetailsForm.get("estimatevalue").errors.max
        ) {
          return "The maximum estimate value is 1000000.";
        }
        break;
      case "agreementdate": {
        if (
          this.burialTrustAgreementAdditionalDetailsForm.get("agreementdate").errors.duetInvalidDate
        ) {
          return "duetInvalidDate";
        }
        break;
      }
        default:
        return "";
        break;
    }

    return "";
  }

}
