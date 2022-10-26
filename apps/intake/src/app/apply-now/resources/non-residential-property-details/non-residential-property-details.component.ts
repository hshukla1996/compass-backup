import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IApplyNowState } from '../../+state/apply-now.models';
import { AppStoreService } from '../../../app-store-service';
import { ApplyNowNonResidentialPropertyDetailsStrategy } from '../../../shared/route-strategies/apply-now/non-residential-property-details';
import { UtilService } from '../../../shared/services/util.service';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, IHouseHoldDetails, IResourceAddress, IResourcesNonResidentialProperty } from '../../household/household-model';
// import { ApplyNowStoreService } from '../../apply-now-store-service';
import { State as AppState } from './../../../+state';

@Component({
  selector: 'compass-ui-non-residential-property-details',
  templateUrl: './non-residential-property-details.component.html',
  styleUrls: ['./non-residential-property-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApplyNowNonResidentialPropertyDetailsStrategy]
})
export class NonResidentialPropertyDetailsComponent implements OnInit {
  states: any;
  nonresidentialPropertyDetailsForm: FormGroup | any;
  houseHoldDetails!: IHouseHoldDetails;
  houseHoldPersons: IHouseHold[] = [];
  applyNowState: IApplyNowState | undefined;
  fragment = "new";


  constructor(private service: ApplyNowStoreService,
    private route: Router,
    private appService: AppStoreService,
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private routingStrategy: ApplyNowNonResidentialPropertyDetailsStrategy,
  ) { }

  ngOnInit() {
    this.nonresidentialPropertyDetailsForm = this.fb.group({
      addressLine1: [""],
      addressline2: [''],
      city: [''],
      state: [''],
      zip: ['']
    })
    this.appService.getStates().subscribe((states) => {
      this.states = states;
      this.cd.detectChanges();
    });
    this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      this.houseHoldDetails = this.service.getHouseHoldDetails;
      if (this.houseHoldDetails.houseHoldPersons) {
        this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
      }
    });

    this.activatedRoute.fragment.subscribe((fragment) => {
      this.fragment = fragment || "new";
      if (this.fragment !== "new") {
        this.setFormValues(this.fragment);
      }
    });
  }
  setFormValues(fragment: any) {

    if (
      this.houseHoldDetails?.resources?.nonresidentialProperty &&
      this.houseHoldDetails?.resources.nonresidentialProperty.nonResidentialPropertyCollection
      && this.houseHoldDetails?.resources.nonresidentialProperty.nonResidentialPropertyCollection[fragment].address
    ) {
      this.nonresidentialPropertyDetailsForm.patchValue(
        this.houseHoldDetails.resources.nonresidentialProperty.nonResidentialPropertyCollection[fragment].address
      );
    }
  }

  private updateResourceAddress(recentAddedResourceAddress: IResourceAddress): IResourceAddress{

    recentAddedResourceAddress.addressLine1 = this.nonresidentialPropertyDetailsForm.get("addressLine1").value;
    recentAddedResourceAddress.addressline2 = this.nonresidentialPropertyDetailsForm.get("addressline2").value;
    recentAddedResourceAddress.city = this.nonresidentialPropertyDetailsForm.get("city").value;
    recentAddedResourceAddress.state = this.nonresidentialPropertyDetailsForm.get("state").value;
    recentAddedResourceAddress.zip = this.nonresidentialPropertyDetailsForm.get("zip").value;
   
    return recentAddedResourceAddress;

  }

  goBack() {
    this.route.navigate([this.routingStrategy.previousRoute()]);
  }

  goNext(): void {

    let nextPageFragment = "0";
    const existingHouseHoldDetails = this.houseHoldDetails;
    const resources = { ...existingHouseHoldDetails.resources };
    let anyOneHavingNonResidentialProperty = { ...resources.nonresidentialProperty };
    let nonResidentialPropertyDetails = anyOneHavingNonResidentialProperty.nonResidentialPropertyCollection || [];
    let recentNonResidentialResource: IResourcesNonResidentialProperty;
    let recentAddedResourceAddress: IResourceAddress;
    let updatedResources;
   

    if (this.fragment === "new") {

      recentAddedResourceAddress = {};
      recentNonResidentialResource = {};

      recentAddedResourceAddress = this.updateResourceAddress(recentAddedResourceAddress);

      recentNonResidentialResource.address = recentAddedResourceAddress
      nonResidentialPropertyDetails = [...nonResidentialPropertyDetails, ...[recentNonResidentialResource]]
    } else {

      nonResidentialPropertyDetails = nonResidentialPropertyDetails.map((detail, i) => {
        if (i === parseInt(this.fragment)) {

          recentNonResidentialResource = { ...detail };
         
          recentAddedResourceAddress = { ...recentNonResidentialResource.address }
          recentAddedResourceAddress = this.updateResourceAddress(recentAddedResourceAddress);

          recentNonResidentialResource.address = recentAddedResourceAddress;
          return { ...recentNonResidentialResource };

        } else {
          return { ...detail }
        }
      });
    }

    anyOneHavingNonResidentialProperty = { ...anyOneHavingNonResidentialProperty, ...{code:"Yes"}, ...{ nonResidentialPropertyCollection: [...nonResidentialPropertyDetails] } }
    updatedResources = { ...resources, ...{ nonresidentialProperty: anyOneHavingNonResidentialProperty } }

    if (existingHouseHoldDetails)
      this.service.updateHouseHoldDetails({
        ...existingHouseHoldDetails,
        ...{ resources: updatedResources },
      });

    if (this.fragment === "new" && nonResidentialPropertyDetails.length > 0) {
      nextPageFragment = (nonResidentialPropertyDetails.length - 1).toString();
    } else {
      nextPageFragment = this.fragment;
    }
    
    this.route.navigate([this.routingStrategy.nextRoute()], { fragment: nextPageFragment});

  }
}
