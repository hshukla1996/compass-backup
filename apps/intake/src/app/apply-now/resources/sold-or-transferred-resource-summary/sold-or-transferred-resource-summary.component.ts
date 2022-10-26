import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IApplyNowState } from '../../+state/apply-now.models';
import { DateFormatConstants } from '../../../shared/constants/Constants';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowResourcesSoldOrTransferredResourceSummaryStrategy } from '../../../shared/route-strategies/apply-now/sold-or-transferred-resource-summary';
import { Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, IHouseHoldDetails } from '../../household/household-model';
import { ScreenQueueUtil } from '../resources-gatepost/resources-gatepost.path';

@Component({
  selector: 'compass-ui-sold-or-transferred-resource-summary',
  templateUrl: './sold-or-transferred-resource-summary.component.html',
  styleUrls: ['./sold-or-transferred-resource-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApplyNowResourcesSoldOrTransferredResourceSummaryStrategy, ApplyNowResourcesSoldOrTransferredResourceSummaryStrategy]
})
export class SoldOrTransferredResourceSummaryComponent implements OnInit {

  applyNowState!: IApplyNowState;
  jsonData: any;
  houseHoldDetails!: IHouseHoldDetails;
  howOften: any;
  recordToBeOperated!: number;
  deletedResource!: any;
  deletedUser!: any;
  houseHoldPersons: IHouseHold[] = [];
  personMap = new Map<string, string>();

  modalData = {
    modalTitle: "Are you sure you want to remove this record?",
    modalContent:
      "If you remove this record you will need to re-enter the data to get it back.",
    cancelButton: "Cancel",
    continueButton: "Remove",
  };

  soldTransferredSummaryData = {
    "questionText": "Your sold, transferred, or given away resources.",
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
    "addtionalButton": "Add Sold or Transferred Resource"
  }

  constructor(private fb: FormBuilder,
    private service: ApplyNowStoreService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private queueService: ScreenQueueUtil) { }

  ngOnInit(): void {
    this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      this.houseHoldDetails = this.service.getHouseHoldDetails;
      if (this.houseHoldDetails.houseHoldPersons) {
        this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
        if (this.houseHoldDetails.resources?.hasMemberSoldTransferedProperty?.propertyDetails) {
          this.houseHoldDetails.resources?.hasMemberSoldTransferedProperty?.propertyDetails.forEach((resource, i) => {
            this.soldTransferredSummaryData['questionAnswers'][i] = {
              accordionHeader: resource.soldPropertyDescription as string,
              accordionSubHeading: '',
              accordionRightHeading: `$ ${resource.valueOfSoldProperty as string} k` ,
              accordionRightSubHeading: 'Est. Value',
              accordionRecord: i,
              accordionData: [
                {
                  'label': "Tell us about the resource type.",
                  'value': resource.circumstancesDescription,
                  "bold": false
                },
                {
                  'label': "Estimated Resource Value",
                  'value': <string>resource.valueOfSoldProperty,
                  "bold": false
                },
                {
                  'label': "Name of the individual or trust property was transferred to.",
                  'value': <string>resource.nameofResourceTransferedTo,
                  "bold": false
                },
                {
                  'label': "If the property was transferred to an individual, tell us their relationship to the applicant.",
                  'value': <string>resource.relationship,
                  "bold": false
                },
                {
                  'label': "What date was the resource sold, transferred or given away?",
                  'value': <string> Utility.getDateInFormat(new Date(resource.datePropertySold as string), DateFormatConstants.MMDDYYYY),
                  "bold": false
                },
                {
                  'label': "Tell us why the property was sold, transferred, or given away.",
                  'value': resource.soldPropertyDescription,
                  "bold": false
                }
              ],
              editButton: "Edit",
              deleteButton: "Remove"
            }
          });

        }
        this.jsonData = this.soldTransferredSummaryData;
      }
      this.cd.detectChanges();
    });
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
    const hasMemberSoldTransferedProperty = { ...resources.hasMemberSoldTransferedProperty };

    if (hasMemberSoldTransferedProperty.propertyDetails && hasMemberSoldTransferedProperty.propertyDetails.length > 0) {
      let propertyDetails = [...hasMemberSoldTransferedProperty.propertyDetails];
      propertyDetails.splice(this.recordToBeOperated, 1);
      const updatedPropertyCollection = [...propertyDetails]
      const updatedSoldProperty = { ...hasMemberSoldTransferedProperty, ...{ propertyDetails: [...updatedPropertyCollection] } };
      const updatedResources = { ...resources, ...{ hasMemberSoldTransferedProperty: updatedSoldProperty } }

      if (storedHouseholdDetails)
        this.service.updateHouseHoldDetails({
          ...storedHouseholdDetails,
          ...{ resources: updatedResources },
        });

      this.jsonData["questionAnswers"].forEach((element: any) => {
        if (element["accordionRecord"] === this.recordToBeOperated) {
          element["accordionHeader"] = '';
        }
      });
    }

  }

  addClicked() {
    this.router.navigate([RoutePath.APPLYNOW +
      "/" + RoutePath.APPLYNOW_RESOURCES +
      "/" + RoutePath.APPLYNOW_RESOURCES_SOLDORTRANSFERREDRESOURCEDETAILS
    ], { fragment: "new" });

  }

  editClicked(userId: any) {
    this.router.navigate([
      RoutePath.APPLYNOW +
      "/" + RoutePath.APPLYNOW_RESOURCES +
      "/" + RoutePath.APPLYNOW_RESOURCES_SOLDORTRANSFERREDRESOURCEDETAILS
    ],
      { fragment: this.recordToBeOperated.toString() });
  }

  back(): void {
    const resourcesCnt = this.houseHoldDetails.resources?.hasMemberSoldTransferedProperty?.propertyDetails?.length || 0
    this.router.navigate([
      RoutePath.APPLYNOW +
      "/" + RoutePath.APPLYNOW_RESOURCES +
      "/" + RoutePath.APPLYNOW_RESOURCES_SOLDORTRANSFERREDRESOURCEDETAILS
    ],
      { fragment: (resourcesCnt > 0 ? (resourcesCnt - 1).toString(): "") });
  }

  next(): void {
    this.queueService.next();
  }
}
