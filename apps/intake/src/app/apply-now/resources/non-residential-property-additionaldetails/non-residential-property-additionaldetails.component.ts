import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { IApplyNowState } from "../../+state/apply-now.models";
import { ApplyNowNonResidentialPropertyAdditionalDetailsStrategy } from '../../../shared/route-strategies/apply-now/non-residential-property-additionaldetails';
import { Utility } from "../../../shared/utilities/Utility";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { IHouseHold, IHouseHoldDetails, IMobileHome, IResourceAddress, IResourcesNonResidentialProperty } from "../../household/household-model";

@Component({
    selector: "compass-ui-non-residential-property-additionaldetails",
    templateUrl: "./non-residential-property-additionaldetails.component.html",
    styleUrls: ["./non-residential-property-additionaldetails.component.scss"],
    providers: [ApplyNowNonResidentialPropertyAdditionalDetailsStrategy]

})
export class NonResidentialPropertyAdditionaldetailsComponent implements OnInit {
    nonresidentialPropertyAdditionalDetailsForm: FormGroup | any;
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
    applyNowState: IApplyNowState | undefined;
    fragment = "0";

    constructor(
        private fb: FormBuilder,
        private routingStrategy: ApplyNowNonResidentialPropertyAdditionalDetailsStrategy,
        private activatedRoute: ActivatedRoute,
        private service: ApplyNowStoreService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.nonresidentialPropertyAdditionalDetailsForm = this.fb.group({
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
        });

        this.service.getAppData().subscribe(d => {
            this.applyNowState = { ...d };
            this.houseHoldDetails = this.service.getHouseHoldDetails;
            if (this.houseHoldDetails.houseHoldPersons) {
                this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
            }
        });

        this.activatedRoute.fragment.subscribe((fragment) => {
            this.fragment = fragment || "0";
            this.setFormValues(this.fragment);
        });
    }

    setFormValues(fragment: any) {

        if (
            this.houseHoldDetails?.resources?.nonresidentialProperty &&
            this.houseHoldDetails?.resources.nonresidentialProperty.nonResidentialPropertyCollection
            && this.houseHoldDetails?.resources.nonresidentialProperty.nonResidentialPropertyCollection[fragment]
        ) {
            let nonResidentialDetail = this.houseHoldDetails?.resources.nonresidentialProperty.nonResidentialPropertyCollection[fragment];

            this.nonresidentialPropertyAdditionalDetailsForm.get("isPropertyMobileHome").patchValue(nonResidentialDetail.mobileHome?.code === "Yes" ? "Y" : "N");
            this.nonresidentialPropertyAdditionalDetailsForm.get("make").patchValue(nonResidentialDetail.mobileHome?.make);
            this.nonresidentialPropertyAdditionalDetailsForm.get("year").patchValue(nonResidentialDetail.mobileHome?.year)
            this.nonresidentialPropertyAdditionalDetailsForm.get("marketValue").patchValue(nonResidentialDetail.marketValue);
            this.nonresidentialPropertyAdditionalDetailsForm.get("incomeProducing").patchValue(nonResidentialDetail.incomeProducing);
            this.nonresidentialPropertyAdditionalDetailsForm.get("whoLivesInTheProperty").patchValue(nonResidentialDetail.whoLivesInTheProperty);
            this.nonresidentialPropertyAdditionalDetailsForm.get("isPropertyListedForSale").patchValue(nonResidentialDetail.isPropertyListedForSale === "Yes" ? "Y" : "N");
            this.nonresidentialPropertyAdditionalDetailsForm.get("dateListed").patchValue(nonResidentialDetail.dateListed);
            this.nonresidentialPropertyAdditionalDetailsForm.get("realtorName").patchValue(nonResidentialDetail.realtorName);
            this.nonresidentialPropertyAdditionalDetailsForm.get("realtorPhoneNumber").patchValue(nonResidentialDetail.realtorPhoneNumber);
            this.nonresidentialPropertyAdditionalDetailsForm.get("datePropertyPurchased").patchValue(Utility.duetFormatDate(nonResidentialDetail.datePropertyPurchased));
        }
    }

    goBack(): void {
        this.router.navigate([this.routingStrategy.previousRoute()], { fragment: this.fragment });
    }
    goNext(): void {

        const existingHouseHoldDetails = this.houseHoldDetails;
        const resources = { ...existingHouseHoldDetails.resources };
        let anyOneHavingNonResidentialProperty = { ...resources.nonresidentialProperty };
        let nonResidentialPropertyDetails = anyOneHavingNonResidentialProperty.nonResidentialPropertyCollection || [];
        let recentNonResidentialResource: IResourcesNonResidentialProperty;
        let updatedResources;

        nonResidentialPropertyDetails = nonResidentialPropertyDetails.map((detail, i) => {
            if (i === parseInt(this.fragment)) {

                recentNonResidentialResource = { ...detail };
                let mobileHomeDetails: IMobileHome = { ...recentNonResidentialResource.mobileHome };

                if (this.nonresidentialPropertyAdditionalDetailsForm.get("isPropertyMobileHome").value === "Y") {
                    mobileHomeDetails.code = "Yes";
                    mobileHomeDetails.year = this.nonresidentialPropertyAdditionalDetailsForm.get("year").value;
                    mobileHomeDetails.make = this.nonresidentialPropertyAdditionalDetailsForm.get("make").value;
                } else {
                    mobileHomeDetails.code = "No"
                    mobileHomeDetails.year = "";
                    mobileHomeDetails.make = "";
                }
                recentNonResidentialResource.mobileHome = mobileHomeDetails;
                recentNonResidentialResource.datePropertyPurchased = this.nonresidentialPropertyAdditionalDetailsForm.get("datePropertyPurchased").value;
                recentNonResidentialResource.marketValue = this.nonresidentialPropertyAdditionalDetailsForm.get("marketValue").value;
                recentNonResidentialResource.incomeProducing = this.nonresidentialPropertyAdditionalDetailsForm.get("incomeProducing").value;
                recentNonResidentialResource.whoLivesInTheProperty = this.nonresidentialPropertyAdditionalDetailsForm.get("whoLivesInTheProperty").value;

                if (this.nonresidentialPropertyAdditionalDetailsForm.get("isPropertyListedForSale").value === "Y") {
                    recentNonResidentialResource.isPropertyListedForSale = "Yes";
                    recentNonResidentialResource.realtorName = this.nonresidentialPropertyAdditionalDetailsForm.get("realtorName").value;
                    recentNonResidentialResource.realtorPhoneNumber = this.nonresidentialPropertyAdditionalDetailsForm.get("realtorPhoneNumber").value;
                    recentNonResidentialResource.dateListed = this.nonresidentialPropertyAdditionalDetailsForm.get("dateListed").value;
                } else {
                    recentNonResidentialResource.isPropertyListedForSale = "No";
                    recentNonResidentialResource.realtorName = "";
                    recentNonResidentialResource.realtorPhoneNumber ="";
                    recentNonResidentialResource.dateListed = "";
                }
                return { ...recentNonResidentialResource };

            } else {
                return { ...detail }
            }
        });

        anyOneHavingNonResidentialProperty = { ...anyOneHavingNonResidentialProperty, ...{ nonResidentialPropertyCollection: [...nonResidentialPropertyDetails] } }
        updatedResources = { ...resources, ...{ nonresidentialProperty: anyOneHavingNonResidentialProperty } }

        if (existingHouseHoldDetails)
            this.service.updateHouseHoldDetails({
                ...existingHouseHoldDetails,
                ...{ resources: updatedResources },
            });

        this.router.navigate([this.routingStrategy.nextRoute()], { fragment: this.fragment });
    }

    errorMap(fieldName: string) {
        switch(fieldName) {
            case "datePropertyPurchased": {
                if (this.nonresidentialPropertyAdditionalDetailsForm.get(fieldName)?.errors.duetInvalidDate) {
                    return "duetInvalidDate"
                }
                return ""
            }
            default: return ""
        }
    }
}
