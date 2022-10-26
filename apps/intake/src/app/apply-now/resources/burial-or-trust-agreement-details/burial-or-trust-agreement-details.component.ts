import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, of } from 'rxjs';
import { IApplyNowState } from '../../+state/apply-now.models';
import { AppStoreService } from '../../../app-store-service';
import { ApplyNowResourcesBurialOrTrustAgreementDetailsStrategy } from '../../../shared/route-strategies/apply-now/burial-or-trust-agreement-details';
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IBurialTrustAgreement, IBurialTrustAgreementDetails, IBurialTrustOwnerAddressDetails, IHouseHoldDetails, IResources } from '../../household/household-model';
import { ScreenQueueUtil } from '../resources-gatepost/resources-gatepost.path';
import * as ProgramConstants from "../../../shared/constants/Individual_Programs_Constants";
import { RoutePath } from '../../../shared/route-strategies';

@Component({
  selector: 'compass-ui-burial-or-trust-agreement-details',
  templateUrl: './burial-or-trust-agreement-details.component.html',
  styleUrls: ['./burial-or-trust-agreement-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApplyNowResourcesBurialOrTrustAgreementDetailsStrategy]
})
export class BurialOrTrustAgreementDetailsComponent implements OnInit {

  burialTrustAgreementForm: FormGroup | any;
  public requiredFields = [] as string[];
  public states: any;
  applyNowState: IApplyNowState | undefined;
  houseHoldDetails!: IHouseHoldDetails;
  fragment = "new";

  constructor(private fb: FormBuilder,
    private service: ApplyNowStoreService,
    private cd: ChangeDetectorRef,
    private routingStrategy: ApplyNowResourcesBurialOrTrustAgreementDetailsStrategy,
    private router: Router,
    private appService: AppStoreService,
    private screenQueueUtil: ScreenQueueUtil,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.burialTrustAgreementForm = this.fb.group({
      bankName: ['', [Validators.maxLength(30)]],
      streetaddress: ['', [Validators.maxLength(26)]],
      streetAddress2: ['', [Validators.maxLength(26)]],
      city: ['', [Validators.maxLength(16)]],
      state: [''],
      zipcode: ['', [Validators.maxLength(5)]]
    });

    this.appService.getStates().subscribe((states) => {
      this.states = states;
      this.cd.detectChanges();
    });

    this.service.getAppData().subscribe((d) => {
      this.applyNowState = { ...d };
      this.houseHoldDetails = this.service.getHouseHoldDetails;
      this.cd.detectChanges();
    });

    this.activatedRoute.fragment.subscribe((fragment) => {
      this.fragment = fragment || "new";
      if (this.fragment !== "new") {
        of(true).pipe(delay(10)).subscribe(() => {
          let burialResources = this.houseHoldDetails.resources?.anyoneHaveBurialORTrustAgreementWithBankORFuneralHome?.burialAgreementCollection;
          if (burialResources && burialResources.length > 0) {
            this.burialTrustAgreementForm.patchValue({
              bankName: burialResources[parseInt(this.fragment)].bankOrFuneralHomeName,
              streetaddress: burialResources[parseInt(this.fragment)].address?.addressLine1,
              streetAddress2: burialResources[parseInt(this.fragment)].address?.addressline2,
              city: burialResources[parseInt(this.fragment)].address?.city,
              state: burialResources[parseInt(this.fragment)].address?.state,
              zipcode: burialResources[parseInt(this.fragment)].address?.zip,
            });
          }
        });
      }
    });

    this.setOrResetValidator();
  }

  goBack() {
    this.screenQueueUtil.back();
  }

  goNext(): void {
    if (this.burialTrustAgreementForm.valid) {
      let fragmentToAddDetails = 0;
      const existingBurialDetails = { ...this.houseHoldDetails.resources?.anyoneHaveBurialORTrustAgreementWithBankORFuneralHome };

      let updatedBurialResource: IBurialTrustAgreement;
      let updatedResources: IResources;

      if (this.fragment === "new") {
        const listOfBurialDetails = [] as IBurialTrustAgreementDetails[];
        let burialDetails: IBurialTrustAgreementDetails = {};

        let burialAddressData: IBurialTrustOwnerAddressDetails = {};
        burialAddressData.addressLine1 = this.burialTrustAgreementForm.get('streetaddress').value,
          burialAddressData.addressline2 = this.burialTrustAgreementForm.get('streetAddress2').value,
          burialAddressData.city = this.burialTrustAgreementForm.get('city').value,
          burialAddressData.state = this.burialTrustAgreementForm.get('state').value,
          burialAddressData.zip = this.burialTrustAgreementForm.get('zipcode').value,
          burialDetails.address = burialAddressData;
        burialDetails.bankOrFuneralHomeName = this.burialTrustAgreementForm.get('bankName').value;
        listOfBurialDetails.push(burialDetails);

        updatedBurialResource = {
          ...existingBurialDetails,
          ...{ code: "Yes" },
          ...{ burialAgreementCollection: [...existingBurialDetails.burialAgreementCollection || [], ...listOfBurialDetails] }
        };

        updatedResources = { ...this.houseHoldDetails.resources, ...{ anyoneHaveBurialORTrustAgreementWithBankORFuneralHome: updatedBurialResource } };

        fragmentToAddDetails = updatedResources.anyoneHaveBurialORTrustAgreementWithBankORFuneralHome?.burialAgreementCollection ?
          (updatedResources.anyoneHaveBurialORTrustAgreementWithBankORFuneralHome.burialAgreementCollection.length) - 1 : 0

      } else {

        let existingResources = [] as IBurialTrustAgreementDetails[];
        if (existingBurialDetails && existingBurialDetails.burialAgreementCollection && existingBurialDetails.burialAgreementCollection.length > 0) {
          existingResources = [...existingBurialDetails.burialAgreementCollection];
          existingBurialDetails.burialAgreementCollection.forEach((resource, i) => {
            if (i === parseInt(this.fragment)) {              
              let address = {
                ...resource.address, ...{
                  addressLine1: this.burialTrustAgreementForm.get('streetaddress').value,
                  addressline2: this.burialTrustAgreementForm.get('streetAddress2').value,
                  city: this.burialTrustAgreementForm.get('city').value,
                  state: this.burialTrustAgreementForm.get('state').value,
                  zip: this.burialTrustAgreementForm.get('zipcode').value,
                }
              };

              resource = {
                ...resource, ...{
                  bankOrFuneralHomeName: this.burialTrustAgreementForm.get('bankName').value,
                  address: address
                }
              }
              existingResources.splice(parseInt(this.fragment), 1, resource);
            }
          })
        }

        updatedBurialResource = { ...existingBurialDetails, ...{ burialAgreementCollection: [...existingResources] } };

        updatedResources = { ...this.houseHoldDetails.resources, ...{ anyoneHaveBurialORTrustAgreementWithBankORFuneralHome: updatedBurialResource } };
        fragmentToAddDetails = parseInt(this.fragment);

      }

      if (this.houseHoldDetails) {
        this.service.updateHouseHoldDetails(
          { ...this.houseHoldDetails, ...{ resources: updatedResources } }
        )
      }

      this.router.navigate([RoutePath.APPLYNOW +
        '/' + RoutePath.APPLYNOW_RESOURCES +
        '/' + RoutePath.APPLYNOW_RESOURCES_BURIALORTRUSTAGREEMENTADDITIONALDETAILS],
        { fragment: fragmentToAddDetails.toString() });

    }
  }

  public isFieldValid(field: string): boolean {
    const formField = this.burialTrustAgreementForm.get(field);
    return (
      formField && this.burialTrustAgreementForm.get(field).status !== "VALID" &&
      this.burialTrustAgreementForm.get(field).touched
    );
  }

  setOrResetValidator() {
    let householdBenefits = this.service?.getBenefits() as string[];
    const fields = [{
      fieldName: 'bankName',
      optionalProgram: ProgramConstants.IND_BURIAL_TRUST_DETAILS_REQUIREDPROGRAMS as string[],
      requiredProgram: [] as string[]

    }, {
      fieldName: 'bankName',
      optionalProgram: ProgramConstants.IND_BURIAL_TRUST_DETAILS_OPTIONALPROGRAMS as string[],
      requiredProgram: [] as string[]

    }, {
      fieldName: 'streetaddress',
      optionalProgram: ProgramConstants.IND_BURIAL_TRUST_DETAILS_OPTIONALPROGRAMS as string[],
      requiredProgram: [] as string[]

    }, {
      fieldName: 'streetaddress2',
      optionalProgram: ProgramConstants.IND_BURIAL_TRUST_DETAILS_OPTIONALPROGRAMS as string[],
      requiredProgram: [] as string[]

    }, {
      fieldName: 'city',
      optionalProgram: ProgramConstants.IND_BURIAL_TRUST_DETAILS_OPTIONALPROGRAMS as string[],
      requiredProgram: [] as string[]

    }, {
      fieldName: 'state',
      optionalProgram: ProgramConstants.IND_BURIAL_TRUST_DETAILS_OPTIONALPROGRAMS as string[],
      requiredProgram: [] as string[]

    }, {
      fieldName: 'zipcode',
      optionalProgram: ProgramConstants.IND_BURIAL_TRUST_DETAILS_OPTIONALPROGRAMS as string[],
      requiredProgram: [] as string[]

    }] as FormValidatorField[];

    if (householdBenefits != null && householdBenefits.length > 0) {
      const requiredOrOptionalValidatorField =
        {
          selectedPrograms: householdBenefits,
          requiredFields: this.requiredFields,
          formGroup: this.burialTrustAgreementForm,
          fields: fields
        } as RequiredOrOptionalValidatorField
      Utility.setOrClearValidatorForFieldWithDifferntPrograms(requiredOrOptionalValidatorField)
      this.burialTrustAgreementForm = requiredOrOptionalValidatorField.formGroup;
      this.requiredFields = [...requiredOrOptionalValidatorField.requiredFields] as any;
    }
  }

  public errorMap(field: string) {
    if (!this.isFieldValid(field)) {
      return "";
    }
    switch (field) {
      case "bankName":
        if (
          this.burialTrustAgreementForm.get("bankName").errors.required
        ) {
          return "The Name of the bank or funeral home is required.";
        }
        if (
          this.burialTrustAgreementForm.get("bankName").errors.maxlength
        ) {
          return "The Name of the bank or funeral home must be at less than 30 characters long.";
        }
        break;
      case "streetaddress":
        if (
          this.burialTrustAgreementForm.get("streetaddress").errors.maxlength
        ) {
          return "Street Address must be at less than 26 characters long.";
        }
        break;
      case "streetaddress2":
        if (
          this.burialTrustAgreementForm.get("streetaddress2").errors.maxlength
        ) {
          return "Street Address 2 must be at less than 26 characters long.";
        }
        break;
      case "city":
        if (
          this.burialTrustAgreementForm.get("city").errors.maxlength
        ) {
          return "City must be at less than 26 characters long.";
        }
        break;
      case "zipcode":
        if (
          this.burialTrustAgreementForm.get("zipcode").errors.maxlength
        ) {
          return "zipcode must be at less than 5 characters long.";
        }
        if (
          this.burialTrustAgreementForm.get("zipcode").errors.pattern
        ) {
          return "Enter only numbers.";
        }
        break;
      default:
        return "";
        break;
    }

    return "";
  }

}
