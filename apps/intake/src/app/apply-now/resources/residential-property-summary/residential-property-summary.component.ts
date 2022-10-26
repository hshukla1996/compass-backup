import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IApplyNowState } from '../../+state/apply-now.models';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowResidentialPropertyStrategy } from '../../../shared/route-strategies/apply-now/residential-property';
import { ApplyNowResidentialPropertySummaryStrategy } from '../../../shared/route-strategies/apply-now/residential-property-summary';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, IHouseHoldDetails } from '../../household/household-model';
import { ScreenQueueUtil } from '../resources-gatepost/resources-gatepost.path';

@Component({
  selector: 'compass-ui-residential-property-summary',
  templateUrl: './residential-property-summary.component.html',
  styleUrls: ['./residential-property-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApplyNowResidentialPropertySummaryStrategy, ApplyNowResidentialPropertyStrategy]

})
export class ResidentialPropertySummaryComponent implements OnInit {
  residentialPropertySummaryForm: FormGroup |any;
  applyNowState!: IApplyNowState;
  jsonData: any;
  houseHoldDetails!: IHouseHoldDetails;
  howOften: any;
  recordToBeOperated!: number;
  deletedResource!: any;
  deletedUser!: any;
  houseHoldPersons: IHouseHold[] = [];
  personMap = new Map<string, string>()

  modalData = {
    modalTitle: "Are you sure you want to remove this record?",
    modalContent:
      "If you remove this record you will need to re-enter the data to get it back.",
    cancelButton: "Cancel",
    continueButton: "Remove",
  };
  residentialPropertyData = {
    "questionText": "Your residential properties.",
    "subHeading": "Review the entries to make sure everything looks correct.",
    "toolTip": "",
    "questionAnswers": [
      {
        "accordionHeader": "",
        "accordionSubHeading": "{replace} Sample 65 ",
        "accordionRightHeading": "",
        "accordionRightSubHeading": "",
        "accordionRecord": 1,
        "accordionData": [{}],
        "editButton": "Edit",
        "deleteButton": "Delete"
      },
    ],
    "addtionalButton": "Add Another Residential Property"
  }


  constructor(private fb: FormBuilder,
    private service: ApplyNowStoreService,
    private cd: ChangeDetectorRef,
    private routingStrategy: ApplyNowResidentialPropertySummaryStrategy,
    private addroutingStrategy: ApplyNowResidentialPropertyStrategy,
    private router: Router, 
    private queueService: ScreenQueueUtil
    ) { }

  ngOnInit(): void {
    this.houseHoldDetails = this.service.getHouseHoldDetails;
    if (this.houseHoldDetails) {
      this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons || [];
      let residentialProperties = this.houseHoldDetails.resources?.anyoneOwnAHome?.residentialPropertyCollection;
      residentialProperties?.forEach((property: any, idx: number) => {
        this.residentialPropertyData["questionAnswers"][idx] = {
          accordionHeader: "Property " + (idx + 1),
          accordionSubHeading:"",
          accordionRightHeading: "$" + (property.marketValue || "0"),
          accordionRightSubHeading: "Value",
          accordionRecord: idx,
          accordionData: [
            {
              'label': "Estimated Home Value",
              'value': "",
              "bold": false
            },
            {
              'label': "Do you own your own home, but currently live elsewhere?",
              'value': "",
              "bold": false
            },


            {
              'label': "Do you plan to return to the home to live?",
              'value': "",
              "bold": false
            },
            {
              'label': "Is the property a mobile home?",
              'value': property?.mobileHome?.make,
              "bold": false
            },
            {
              'label': "What model year is the mobile home?",
              'value': property?.mobileHome?.year,
              "bold": false
            },
            {
              'label': "What make is the mobile home?",
              'value': "",
              "bold": false
            },
            {
              'label': "What date was this home purchased?",
              'value': property?.datePropertyPurchased,
              "bold": false
            },
            {
              'label': "Does the property produce any income?",
              'value': property.incomeProducing,
              "bold": false
            },
            {
              'label': "If someone else lives in the property, tell us who.",
              'value': property.whoLivesInTheProperty,
              "bold": false
            },
            {
              'label': "Is the property listed as for sale?",
              'value': property.isPropertyListedForSale,
              "bold": false
            },
            {
              'label': "What date was it listed?",
              'value': property.dateListed,
              "bold": false
            }, 
            {
              'label': "Realtor Name",
              'value': property.realtorName,
              "bold": false
            }, {
              'label': "Realtor Phone Number",
              'value': property.realtorPhoneNumber,
              "bold": false
            },



            
          ],
          editButton: "Edit",
          deleteButton: "Remove"
        }
      });
      this.jsonData = this.residentialPropertyData;
    }
  }

  recordIndexToOp(recordIndex: number) {
    this.recordToBeOperated = recordIndex;
  }
  
  deleteClicked(userId: any) {
    this.deletedUser = userId;
  }
  continueClicked() {
    const storedHouseholdDetails = this.houseHoldDetails;
    const resources = { ...storedHouseholdDetails.resources };
    let anyOneHavingResidentialProperty = { ...resources.anyoneOwnAHome };
    let updatedResources;

    if (anyOneHavingResidentialProperty &&
      anyOneHavingResidentialProperty.residentialPropertyCollection
      && anyOneHavingResidentialProperty.residentialPropertyCollection?.length > 0) {
      const nonResidentialPropertyDetails = [...anyOneHavingResidentialProperty.residentialPropertyCollection];
      nonResidentialPropertyDetails.splice(this.recordToBeOperated, 1)

      anyOneHavingResidentialProperty = { ...anyOneHavingResidentialProperty, ...{ residentialPropertyCollection: [...nonResidentialPropertyDetails] } }
      updatedResources = { ...resources, ...{ anyoneOwnAHome: anyOneHavingResidentialProperty } }

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
  addClicked() {
    this.router.navigate([
      RoutePath.APPLYNOW +
      '/' + RoutePath.APPLYNOW_RESOURCES +
      '/' + RoutePath.APPLYNOW_RESOURCES_RESIDENTIALPROPERTYDETAILS
    ], { fragment: "new" });

  }
  editClicked(userId: any){
    this.router.navigate([
      RoutePath.APPLYNOW +
      '/' + RoutePath.APPLYNOW_RESOURCES +
      '/' + RoutePath.APPLYNOW_RESOURCES_RESIDENTIALPROPERTYDETAILS
    ],
      { fragment: this.recordToBeOperated.toString() });
  }

  addResidentialProperty() {
    this.router.navigate([this.addroutingStrategy.currentRoute]);
  }
  back() {
    this.router.navigate([this.routingStrategy.previousRoute()]);
  }

  next() {
    this.queueService.next();
  }
}
