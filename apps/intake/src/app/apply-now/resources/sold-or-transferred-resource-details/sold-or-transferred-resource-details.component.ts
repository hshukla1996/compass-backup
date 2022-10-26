import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output, Input, ChangeDetectorRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, delay } from 'rxjs';
import { IApplyNowState } from '../../+state/apply-now.models';
import { AppStoreService } from '../../../app-store-service';
import { ApplyNowResourcesSoldOrTransferredResourceDetailsStrategy } from '../../../shared/route-strategies/apply-now/sold-or-transferred-resource-details';
import { Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, IHouseHoldDetails, IResources, ISoldTransferredProperty, ISoldTransferredPropertyDetails } from '../../household/household-model';
import { ScreenQueueUtil } from '../resources-gatepost/resources-gatepost.path';

@Component({
  selector: 'compass-ui-sold-or-transferred-resource-details',
  templateUrl: './sold-or-transferred-resource-details.component.html',
  styleUrls: ['./sold-or-transferred-resource-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApplyNowResourcesSoldOrTransferredResourceDetailsStrategy]
})
export class SoldOrTransferredResourceDetailsComponent implements OnInit {

  soldOrTransferredResourceDetailsForm: FormGroup | any;
  public requiredFields = [] as string[];
  public states: any;
  householdPersons: IHouseHold[] = [];
  applyNowState!: IApplyNowState;
  houseHoldDetails!: IHouseHoldDetails;

  submitted = false;
  fragment = "new";

  constructor(private fb: FormBuilder,
    private service: ApplyNowStoreService,
    private cd: ChangeDetectorRef,
    private routingStrategy: ApplyNowResourcesSoldOrTransferredResourceDetailsStrategy,
    private appService: AppStoreService,
    private screenQueueUtil: ScreenQueueUtil,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.soldOrTransferredResourceDetailsForm = this.fb.group({
      resourceType: [''],
      estimateResourceValue: ["", [Validators.required, Validators.maxLength(9), Validators.pattern('^[0-9\.]*$')]],
      individualOrTrustPropertyName: [''],
      relationship: [''],
      soldDate: [''],
      soldReason: ['']
    });

    this.appService.getStates().subscribe((states) => {
      this.states = states;
      this.cd.detectChanges();
    });

    this.service.getAppData().subscribe((d) => {
      this.applyNowState = { ...d };
      this.houseHoldDetails = this.service.getHouseHoldDetails;
      this.householdPersons = this.applyNowState.houseHoldDetails?.houseHoldPersons || [];
      this.cd.detectChanges();
    });

    this.activatedRoute.fragment.subscribe((fragment) => {
      this.fragment = fragment || "new";
      if (this.fragment !== "new") {
        of(true).pipe(delay(10)).subscribe(() => {
          let cashResources = this.houseHoldDetails.resources?.hasMemberSoldTransferedProperty?.propertyDetails
          if (cashResources && cashResources.length > 0) {
            this.soldOrTransferredResourceDetailsForm.patchValue({
              resourceType: cashResources[parseInt(this.fragment)].soldPropertyDescription,
              estimateResourceValue: cashResources[parseInt(this.fragment)].valueOfSoldProperty,
              individualOrTrustPropertyName: cashResources[parseInt(this.fragment)].soldPropertyDescription,
              relationship: cashResources[parseInt(this.fragment)].relationship,
              soldDate: Utility.duetFormatDate(cashResources[parseInt(this.fragment)].datePropertySold),
              soldReason: cashResources[parseInt(this.fragment)].circumstancesDescription
            });
          }
        });
      }
    });
  }

  goBack() {
    this.screenQueueUtil.back();
  }

  goNext(): void {
    if (this.soldOrTransferredResourceDetailsForm.valid) {
      let fragmentToAddDetails = 0;
      const existingSoldPropertyDetails = { ...this.houseHoldDetails.resources?.hasMemberSoldTransferedProperty };

      let updatedSoldTransferredProperty: ISoldTransferredProperty;
      let updatedResources: IResources;

      if (this.fragment === "new") {
        const soldPropertyList = [] as ISoldTransferredPropertyDetails[];
        let property: ISoldTransferredPropertyDetails = {};
        property.circumstancesDescription = this.soldOrTransferredResourceDetailsForm.get('resourceType')?.value;
        property.datePropertySold = this.soldOrTransferredResourceDetailsForm.get('soldDate')?.value;
        property.nameofResourceTransferedTo = this.soldOrTransferredResourceDetailsForm.get('individualOrTrustPropertyName')?.value;
        property.relationship = this.soldOrTransferredResourceDetailsForm.get('relationship')?.value;
        property.soldPropertyDescription = this.soldOrTransferredResourceDetailsForm.get('soldReason')?.value;
        property.valueOfSoldProperty = this.soldOrTransferredResourceDetailsForm.get('estimateResourceValue')?.value;

        soldPropertyList.push(property);

        updatedSoldTransferredProperty = {
          ...existingSoldPropertyDetails,
          ...{ code: "Yes" },
          ...{ propertyDetails: [...existingSoldPropertyDetails.propertyDetails || [], ...soldPropertyList] }
        };

        updatedResources = { ...this.houseHoldDetails.resources, ...{ hasMemberSoldTransferedProperty: updatedSoldTransferredProperty } };

        fragmentToAddDetails = updatedResources.hasMemberSoldTransferedProperty?.propertyDetails ?
          (updatedResources.hasMemberSoldTransferedProperty.propertyDetails.length) - 1 : 0

      } else {

        let existingResources = [] as ISoldTransferredPropertyDetails[];
        if (existingSoldPropertyDetails && existingSoldPropertyDetails.propertyDetails && existingSoldPropertyDetails.propertyDetails.length > 0) {
          existingResources = [...existingSoldPropertyDetails.propertyDetails];
          existingSoldPropertyDetails.propertyDetails.forEach((resource, i) => {
            if (i === parseInt(this.fragment)) {
              resource = {
                ...resource, ...{
                  circumstancesDescription : this.soldOrTransferredResourceDetailsForm.get('soldReason')?.value,
                  datePropertySold : this.soldOrTransferredResourceDetailsForm.get('soldDate')?.value,
                  nameofResourceTransferedTo : this.soldOrTransferredResourceDetailsForm.get('individualOrTrustPropertyName')?.value,
                  relationship : this.soldOrTransferredResourceDetailsForm.get('relationship')?.value,
                  soldPropertyDescription : this.soldOrTransferredResourceDetailsForm.get('resourceType')?.value,
                  valueOfSoldProperty : this.soldOrTransferredResourceDetailsForm.get('estimateResourceValue')?.value
                }
              };

              existingResources.splice(parseInt(this.fragment), 1, resource);
            }
          })
        }

        updatedSoldTransferredProperty = { ...existingSoldPropertyDetails, ...{ propertyDetails: [...existingResources] } };

        updatedResources = { ...this.houseHoldDetails.resources, ...{ hasMemberSoldTransferedProperty: updatedSoldTransferredProperty } };
        fragmentToAddDetails = parseInt(this.fragment);

      }

      if (this.houseHoldDetails) {
        this.service.updateHouseHoldDetails(
          { ...this.houseHoldDetails, ...{ resources: updatedResources } }
        )
      }

      this.router.navigate([this.routingStrategy.nextRoute()]);
    }

  }

  public isFieldValid(field: string): boolean {
    const formField = this.soldOrTransferredResourceDetailsForm.get(field);
    return (
      formField && this.soldOrTransferredResourceDetailsForm.get(field).status !== "VALID" &&
      this.soldOrTransferredResourceDetailsForm.get(field).touched
    );
  }

  public errorMap(field: string) {
    if (!this.isFieldValid(field)) {
      return "";
    }
    switch (field) {
      case "resourceType":
        if (
          this.soldOrTransferredResourceDetailsForm.get("resourceType").errors.required
        ) {
          return "The Name of the bank or funeral home is required.";
        }
        if (
          this.soldOrTransferredResourceDetailsForm.get("resourceType").errors.maxlength
        ) {
          return "The Name of the bank or funeral home must be at less than 30 characters long.";
        }
        break;
      case "estimateResourceValue":
        if (
          this.soldOrTransferredResourceDetailsForm.get("estimateResourceValue").errors.maxlength
        ) {
          return "Street Address must be at less than 26 characters long.";
        }
        break;
      case "individualOrTrustPropertyName":
        if (
          this.soldOrTransferredResourceDetailsForm.get("individualOrTrustPropertyName").errors.maxlength
        ) {
          return "Street Address 2 must be at less than 26 characters long.";
        }
        break;
      case "relationship":
        if (
          this.soldOrTransferredResourceDetailsForm.get("relationship").errors.maxlength
        ) {
          return "City must be at less than 26 characters long.";
        }
        break;
      case "soldDate":
        if (this.soldOrTransferredResourceDetailsForm.get("soldDate")?.errors?.duetInvalidDate) {
          return "duetInvalidDate"
        }
        break;
      case "soldReason":
        if (
          this.soldOrTransferredResourceDetailsForm.get("soldReason").errors.maxlength
        ) {
          return "City must be at less than 26 characters long.";
        }
        break;
      default:
        return "";
        break;
    }

    return "";
  }

}
