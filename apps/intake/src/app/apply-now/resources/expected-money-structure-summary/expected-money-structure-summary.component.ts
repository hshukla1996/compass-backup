import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplyNowExpectedMoneyStructureStrategy } from '../../../shared/route-strategies/apply-now/expected-money-structure';
import { ApplyNowExpectedMoneyStructureSummaryStrategy } from '../../../shared/route-strategies/apply-now/expected-money-structure-summary';

import { ApplyNowStoreService } from '../../apply-now-store-service';
import { ScreenQueueUtil } from '../../../shared/services/screen_queue_util.service';
import { IApplyNowState } from '../../+state/apply-now.models';
import { IHouseHold, IHouseHoldDetails } from '../../household/household-model';
import { RoutePath } from '../../../shared/route-strategies';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'compass-ui-expected-money-structure-summary',
  templateUrl: './expected-money-structure-summary.component.html',
  styleUrls: ['./expected-money-structure-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApplyNowExpectedMoneyStructureSummaryStrategy, ApplyNowExpectedMoneyStructureStrategy]
})


export class ExpectedMoneyStructureSummaryComponent implements OnInit {

  applyNowState!: IApplyNowState;
  jsonData: any;
  houseHoldDetails!: IHouseHoldDetails;
  recordToBeOperated!: number;
  deletedResource!: any;
  deletedUser!: any;
  houseHoldPersons: IHouseHold[] = [];

  modalData = {
    modalTitle: "Are you sure you want to remove this record?",
    modalContent:
      "If you remove this record you will need to re-enter the data to get it back.",
    cancelButton: "Cancel",
    continueButton: "Remove",
  };
  expectedResourceData = {
    "questionText": "Your sources of expected money.",
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
    "addtionalButton": "Add Expected Money Structure"
  }


  constructor(
    private cd: ChangeDetectorRef,
    private service: ApplyNowStoreService,
    private routingStrategy: ApplyNowExpectedMoneyStructureSummaryStrategy,
    private router: Router,
    private queueService: ScreenQueueUtil
  ) { }

  ngOnInit(): void {
    this.houseHoldDetails = this.service.getHouseHoldDetails;

    if (this.houseHoldDetails) {
      this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons || [];
      let moneySources = this.houseHoldDetails.resources?.anyoneExpectingAnyResources?.expectingMoneyCollection;

      moneySources?.forEach((source: any, idx: number) => {
        this.expectedResourceData["questionAnswers"][idx] = {
          accordionHeader: source.description,
          accordionSubHeading: "",
          accordionRightHeading: "$"+source.value,
          accordionRightSubHeading: "Est. Value",
          accordionRecord: idx,
          accordionData: [
            {
              'label': "Source of the Money",
              'value': source.description,
              "bold": false
            },
            {
              'label': "Estimated Value",
              'value': "$" + source.value,
              "bold": false
            },
            {
              'label': "What date does the household expect to receive this resource?",
              'value': (source.date ?
                source.date.substr(5, 2) + "/" + source.date.substr(2, 2) + "/" + source.date.substr(0, 4) : ""),
              "bold": false
            },
          ],
          editButton: "Edit",
          deleteButton: "Remove"
        }
      });
      this.jsonData = this.expectedResourceData;
   }
  }

  recordIndexToOp(recordIndex: number) {
    this.recordToBeOperated = recordIndex;
  }

  deleteClicked(userId: any) {
  }

  continueClicked() {
    const storedHouseholdDetails = this.houseHoldDetails;
    const resources = { ...storedHouseholdDetails.resources };
    let anyoneExpectingAnyResource = { ...resources.anyoneExpectingAnyResources };
    let updatedResources;

    if (anyoneExpectingAnyResource &&
      anyoneExpectingAnyResource.expectingMoneyCollection
      && anyoneExpectingAnyResource.expectingMoneyCollection?.length > 0) {
      const moneyCollection = [...anyoneExpectingAnyResource.expectingMoneyCollection];
      moneyCollection.splice(this.recordToBeOperated, 1)

      anyoneExpectingAnyResource = { ...anyoneExpectingAnyResource, ...{ expectingMoneyCollection: [...moneyCollection] } }
      updatedResources = { ...resources, ...{ anyoneExpectingAnyResources: anyoneExpectingAnyResource } }

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
      '/' + RoutePath.APPLYNOW_RESOURCES_EXPECTEDMONEYSTRUCTURE
    ], { fragment: "new" });

  }
  editClicked(userId: any) {

    this.router.navigate([
      RoutePath.APPLYNOW +
      '/' + RoutePath.APPLYNOW_RESOURCES +
      '/' + RoutePath.APPLYNOW_RESOURCES_EXPECTEDMONEYSTRUCTURE
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
