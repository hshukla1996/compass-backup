import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IApplyNowState } from '../../+state/apply-now.models';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowNonResidentialPropertyStrategy } from '../../../shared/route-strategies/apply-now/non-residential-property';
import { ApplyNowNonResidentialPropertySummaryStrategy } from '../../../shared/route-strategies/apply-now/non-residential-property-summary';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, IHouseHoldDetails } from '../../household/household-model';
import { ScreenQueueUtil } from '../resources-gatepost/resources-gatepost.path';

@Component({
  selector: 'compass-ui-non-residential-property-summary',
  templateUrl: './non-residential-property-summary.component.html',
  styleUrls: ['./non-residential-property-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApplyNowNonResidentialPropertySummaryStrategy, ApplyNowNonResidentialPropertyStrategy]
})
export class NonResidentialPropertySummaryComponent implements OnInit {

  applyNowState!: IApplyNowState;
  jsonData: any;
  houseHoldDetails!: IHouseHoldDetails;
  houseHoldPersons: IHouseHold[] = [];
  howOften: any;
  recordToBeOperated!: number;
  deletedUser!: any;

  modalData = {
    modalTitle: "Are you sure you want to remove this record?",
    modalContent:
      "If you remove this record you will need to re-enter the data to get it back.",
    cancelButton: "Cancel",
    continueButton: "Remove",
  };

  nonResidentialPropertyData = {
    "questionText": "Your non-residential properties.",
    "subHeading": "Review the entries to make sure everything looks correct.",
    "toolTip": "",
    "questionAnswers": [
      {
        "accordionHeader": "",
        "accordionSubHeading": "{replace} Sample 65 (M)",
        "accordionRightHeading": "",
        "accordionRightSubHeading": "",
        "accordionRecord": 1,
        "accordionData": [{}],
        "editButton": "Edit",
        "deleteButton": "Delete"
      },
    ],
    "addtionalButton": "Add Non-Residential Property"
  };

  constructor(private fb: FormBuilder,
    private service: ApplyNowStoreService,
    private cd: ChangeDetectorRef,
    private routingStrategy: ApplyNowNonResidentialPropertySummaryStrategy,
    private router: Router,
    private queueService: ScreenQueueUtil,) { }

  ngOnInit(): void {

    this.houseHoldDetails = this.service.getHouseHoldDetails;
    if (this.houseHoldDetails) {
      this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons || [];
      let nonResidentialProperties = this.houseHoldDetails.resources?.nonresidentialProperty?.nonResidentialPropertyCollection;

      nonResidentialProperties?.forEach((property: any, idx: number) => {
        this.nonResidentialPropertyData["questionAnswers"][idx] = {
          accordionHeader: "Property " + (idx + 1),
          accordionSubHeading: property.address.addressLine1,
          accordionRightHeading: "$" + (property.marketValue || "0"),
          accordionRightSubHeading: "Value",
          accordionRecord: idx,
          accordionData: [
            {
              'label': "Property Address",
              'value': property?.address?.addressLine1.toString() + "\n" +
                property?.address?.addressline2.toString() + "\n" +
                property?.address?.city.toString() + "\n" +
                property?.address?.state.toString() + "\n" +
                property?.address?.zip.toString(),
              "bold": false
            },
            {
              'label': "Is the property a mobile home?",
              'value': property?.mobileHome?.code,
              "bold": false
            },
            {
              'label': "What model year is the mobile home?",
              'value': property?.mobileHome?.make,
              "bold": false
            },
            {
              'label': "What date was this property purchased?",
              'value': property?.datePurchased,
              "bold": false
            },
            {
              'label': "Property Address",
              'value': "",
              "bold": false
            },
            {
              'label': "Property Address",
              'value': property.address.addressLine1.toString() + "\n" +
                property.address.addressline2.toString() + "\n" +
                property.address.city.toString() + "\n" +
                property.address.state.toString() + "\n" +
                property.address.zip.toString(),
              "bold": false
            },
            {
              'label': "Property Address",
              'value': property.address.addressLine1.toString() + "\n" +
                property.address.addressline2.toString() + "\n" +
                property.address.city.toString() + "\n" +
                property.address.state.toString() + "\n" +
                property.address.zip.toString(),
              "bold": false
            },
            {
              'label': "Property Address",
              'value': property.address.addressLine1.toString() + "\n" +
                property.address.addressline2.toString() + "\n" +
                property.address.city.toString() + "\n" +
                property.address.state.toString() + "\n" +
                property.address.zip.toString(),
              "bold": false
            },
            {
              'label': "Property Address",
              'value': property.address.addressLine1.toString() + "\n" +
                property.address.addressline2.toString() + "\n" +
                property.address.city.toString() + "\n" +
                property.address.state.toString() + "\n" +
                property.address.zip.toString(),
              "bold": false
            },
            {
              'label': "Property Address",
              'value': property.address.addressLine1.toString() + "\n" +
                property.address.addressline2.toString() + "\n" +
                property.address.city.toString() + "\n" +
                property.address.state.toString() + "\n" +
                property.address.zip.toString(),
              "bold": false
            },
          ],
          editButton: "Edit",
          deleteButton: "Remove"
        }
      });
      this.jsonData = this.nonResidentialPropertyData;
    }
  };


  addClicked() {
    this.router.navigate([
      RoutePath.APPLYNOW +
      '/' + RoutePath.APPLYNOW_RESOURCES +
      '/' + RoutePath.APPLYNOW_RESOURCES_NONRESIDENTIALPROPERTYDETAILS
    ], { fragment: "new" });
  }

  recordIndexToOp(recordIndex: number) {
    this.recordToBeOperated = recordIndex;
  }

  deleteClicked(userId: any) {
    
  }

  continueClicked() {
    const storedHouseholdDetails = this.houseHoldDetails;
    const resources = { ...storedHouseholdDetails.resources };
    let anyOneHavingNonResidentialProperty = { ...resources.nonresidentialProperty };
    let updatedResources;

    if (anyOneHavingNonResidentialProperty &&
      anyOneHavingNonResidentialProperty.nonResidentialPropertyCollection
      && anyOneHavingNonResidentialProperty.nonResidentialPropertyCollection?.length > 0) {
      const nonResidentialPropertyDetails = [...anyOneHavingNonResidentialProperty.nonResidentialPropertyCollection];
      nonResidentialPropertyDetails.splice(this.recordToBeOperated, 1)

      anyOneHavingNonResidentialProperty = { ...anyOneHavingNonResidentialProperty, ...{ nonResidentialPropertyCollection: [...nonResidentialPropertyDetails] } }
      updatedResources = { ...resources, ...{ nonresidentialProperty: anyOneHavingNonResidentialProperty } }

      if (storedHouseholdDetails)
        this.service.updateHouseHoldDetails({
          ...storedHouseholdDetails,
          ...{ resources: updatedResources },
        });

      this.jsonData["questionAnswers"].forEach((element: any) => {
        if (element["accordionRecord"] == this.recordToBeOperated) {
          element["accordionHeader"] = "";
        }
      });
    }
  }

  editClicked(userId: any) {
    this.router.navigate([
      RoutePath.APPLYNOW +
      '/' + RoutePath.APPLYNOW_RESOURCES +
      '/' + RoutePath.APPLYNOW_RESOURCES_NONRESIDENTIALPROPERTYDETAILS
    ],
      { fragment: this.recordToBeOperated.toString() });
  }

  back() {
    this.router.navigate([this.routingStrategy.previousRoute()]);
  }

  next() {
    this.queueService.next();
  }

}
