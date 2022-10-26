import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IApplyNowState } from '../../+state/apply-now.models';
import { ApplyNowResidentialPropertyDetailsStrategy } from '../../../shared/route-strategies/apply-now/residential-property-details';
import { Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, IHouseHoldDetails, IMobileHome, IResourcesResidentialProperty } from '../../household/household-model';
import { ScreenQueueUtil } from '../resources-gatepost/resources-gatepost.path';

@Component({
  selector: 'compass-ui-residential-property-details',
  templateUrl: './residential-property-details.component.html',
  styleUrls: ['./residential-property-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApplyNowResidentialPropertyDetailsStrategy]
})
export class ResidentialPropertyDetailsComponent implements OnInit {
  residentialPropertyDetailsForm: FormGroup | any;
  //isMobileHomeClicked: boolean = false;
  houseHoldDetails!: IHouseHoldDetails;
  houseHoldPersons: IHouseHold[] = [];
  applyNowState: IApplyNowState | undefined;
  fragment = "0";

  constructor(private fb: FormBuilder,
    private service: ApplyNowStoreService,
    private cd: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private routingStrategy: ApplyNowResidentialPropertyDetailsStrategy,
    private router: Router,
    private queueService: ScreenQueueUtil) { }

  ngOnInit() {
    this.residentialPropertyDetailsForm = this.fb.group({

      isPropertyMobileHome: [""],
      year: [""],
      make: [""],
      datePropertyPurchased: [""],
      marketValue: [""],
      isPropertyListedForSale: [""],
      dateListed: [""],
      incomeProducing: [""],
      whoLivesInTheProperty: [""],
      realtorName: [""],
      realtorPhoneNumber: [""]

    })
    this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      this.houseHoldDetails = this.service.getHouseHoldDetails;
      if (this.houseHoldDetails.houseHoldPersons) {
        this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
      }
    });

    this.activatedRoute.fragment.subscribe((fragment) => {
      this.fragment = fragment || "new";
      this.setFormValues(this.fragment);
    });
  }

  setFormValues(fragment: any) {
    if (
      this.houseHoldDetails?.resources?.anyoneOwnAHome &&
      this.houseHoldDetails?.resources.anyoneOwnAHome.residentialPropertyCollection
      && this.houseHoldDetails?.resources.anyoneOwnAHome.residentialPropertyCollection[fragment]
    ) {
      let residentialDetail = this.houseHoldDetails?.resources.anyoneOwnAHome.residentialPropertyCollection[fragment];

      this.residentialPropertyDetailsForm.get("isPropertyMobileHome").patchValue(residentialDetail.mobileHome?.code === "Yes" ? "Y" : "N");
      this.residentialPropertyDetailsForm.get("make").patchValue(residentialDetail.mobileHome?.make);
      this.residentialPropertyDetailsForm.get("year").patchValue(residentialDetail.mobileHome?.year)
      this.residentialPropertyDetailsForm.get("marketValue").patchValue(residentialDetail.marketValue);
      this.residentialPropertyDetailsForm.get("incomeProducing").patchValue(residentialDetail.incomeProducing);
      this.residentialPropertyDetailsForm.get("whoLivesInTheProperty").patchValue(residentialDetail.whoLivesInTheProperty);
      this.residentialPropertyDetailsForm.get("isPropertyListedForSale").patchValue(residentialDetail.isPropertyListedForSale === "Yes" ? "Y" : "N");
      this.residentialPropertyDetailsForm.get("dateListed").patchValue(Utility.duetFormatDate(residentialDetail.dateListed));
      this.residentialPropertyDetailsForm.get("realtorName").patchValue(residentialDetail.realtorName);
      this.residentialPropertyDetailsForm.get("realtorPhoneNumber").patchValue(residentialDetail.realtorPhoneNumber);
      this.residentialPropertyDetailsForm.get("datePropertyPurchased").patchValue(residentialDetail.datePropertyPurchased);
    }
  }

  updateRecentAddedResource(recentResidentialResource: IResourcesResidentialProperty): IResourcesResidentialProperty {

    let mobileHomeDetails: IMobileHome = { ...recentResidentialResource.mobileHome } || {};

    if (this.residentialPropertyDetailsForm.get("isPropertyMobileHome").value === "Y") {
      mobileHomeDetails.code = "Yes";
      mobileHomeDetails.year = this.residentialPropertyDetailsForm.get("year").value;
      mobileHomeDetails.make = this.residentialPropertyDetailsForm.get("make").value;
    } else {
      mobileHomeDetails.code = "No"
      mobileHomeDetails.year = "";
      mobileHomeDetails.make = "";
    }
    recentResidentialResource.mobileHome = mobileHomeDetails;
    recentResidentialResource.datePropertyPurchased = this.residentialPropertyDetailsForm.get("datePropertyPurchased").value;
    recentResidentialResource.marketValue = this.residentialPropertyDetailsForm.get("marketValue").value;
    recentResidentialResource.incomeProducing = this.residentialPropertyDetailsForm.get("incomeProducing").value;
    recentResidentialResource.whoLivesInTheProperty = this.residentialPropertyDetailsForm.get("whoLivesInTheProperty").value;

    if (this.residentialPropertyDetailsForm.get("isPropertyListedForSale").value === "Y") {
      recentResidentialResource.isPropertyListedForSale = "Yes";
      recentResidentialResource.realtorName = this.residentialPropertyDetailsForm.get("realtorName").value;
      recentResidentialResource.realtorPhoneNumber = this.residentialPropertyDetailsForm.get("realtorPhoneNumber").value;
      recentResidentialResource.dateListed = this.residentialPropertyDetailsForm.get("dateListed").value;
    } else {
      recentResidentialResource.isPropertyListedForSale = "No";
      recentResidentialResource.realtorName = "";
      recentResidentialResource.realtorPhoneNumber = "";
      recentResidentialResource.dateListed = "";
    }

    return recentResidentialResource;

  }

  goBack(): void {
    this.queueService.back();
  }
  goNext(): void {

    let nextPageFragment = "0";
    const existingHouseHoldDetails = this.houseHoldDetails;
    const resources = { ...existingHouseHoldDetails.resources };
    let anyOneHavingResidentialProperty = { ...resources.anyoneOwnAHome };
    let residentialPropertyDetails = anyOneHavingResidentialProperty.residentialPropertyCollection || [];
    let recentResidentialResource: IResourcesResidentialProperty;
    let updatedResources;

    if (this.fragment === "new") {

      recentResidentialResource = {};
      recentResidentialResource = this.updateRecentAddedResource(recentResidentialResource);
      residentialPropertyDetails = [...residentialPropertyDetails, ...[recentResidentialResource]]
    } else {

      residentialPropertyDetails = residentialPropertyDetails.map((detail, i) => {
        if (i === parseInt(this.fragment)) {
          recentResidentialResource = { ...detail };
          recentResidentialResource = this.updateRecentAddedResource(recentResidentialResource);
          return { ...recentResidentialResource };
        } else {
          return { ...detail }
        }
      });
    }

    anyOneHavingResidentialProperty = { ...anyOneHavingResidentialProperty, ...{ residentialPropertyCollection: [...residentialPropertyDetails] } }
    updatedResources = { ...resources, ...{ anyoneOwnAHome: anyOneHavingResidentialProperty } }

    if (existingHouseHoldDetails)
      this.service.updateHouseHoldDetails({
        ...existingHouseHoldDetails,
        ...{ resources: updatedResources },
      });

    if (this.fragment === "new" && residentialPropertyDetails.length > 0) {
      nextPageFragment = (residentialPropertyDetails.length - 1).toString();
    } else {
      nextPageFragment = this.fragment;
    }

    this.router.navigate([this.routingStrategy.nextRoute()], { fragment: nextPageFragment });
  }
  errorMap(fieldName: string) {
    switch(fieldName) {
      case "dateListed": {
        if (this.residentialPropertyDetailsForm.get(fieldName)?.errors?.duetInvalidDate) {
          return "duetInvalidDate"
        }
        return ""
      }
      default: return ""
    }
  }
}