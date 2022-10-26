import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IApplyNowState } from '../../+state/apply-now.models';
import { AppPageActions } from '../../../+state/actions';
import { AppStoreService } from '../../../app-store-service';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowFinancialHoldingsSummaryStrategy } from '../../../shared/route-strategies/apply-now/financial-holdings-summary';
import { ScreenQueueUtil } from '../../../shared/services/screen_queue_util.service';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHoldDetails, IHouseHold } from '../../household/household-model';
import { State as AppState } from './../../../+state';
import * as AppSelectors from './../../../+state/app.selectors';


@Component({
  selector: 'compass-ui-financial-holdings-summary',
  templateUrl: './financial-holdings-summary.component.html',
  styleUrls: ['./financial-holdings-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [ApplyNowFinancialHoldingsSummaryStrategy]
})
export class FinancialHoldingsSummaryComponent implements OnInit {
  resourceTypes$: Observable<any> | undefined;
  resourceTypes: any;
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
  financialHoldingsData = {
    "questionText": "Your cash and other financial holdings.",
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
    "addtionalButton": "Add Another Financial Holding"
  }

  constructor(private router: Router,
    private cd: ChangeDetectorRef,
    private service: ApplyNowStoreService,
    private routingStrategy: ApplyNowFinancialHoldingsSummaryStrategy,
    private appService: AppStoreService,
    private queueService: ScreenQueueUtil,
    private appstore: Store<AppState>,) { }

  ngOnInit(): void {
    
    this.appstore.dispatch(AppPageActions.getResourceTypes());
    this.resourceTypes$ = this.appstore.select(AppSelectors.getResourceTypes);
    this.resourceTypes$?.subscribe((s) => {
      this.resourceTypes = s;
      this.cd.detectChanges();
    });

    this.houseHoldDetails = this.service.getHouseHoldDetails;
    if (this.houseHoldDetails) {
      this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons || [];
      let cashHoldings = this.houseHoldDetails.resources?.anyoneHaveCash?.cashCollection;

      cashHoldings?.forEach((resource: any, idx: number) => {
        this.financialHoldingsData["questionAnswers"][idx] = {
          accordionHeader: this.resourceTypes.filter(
            (c: any) => c.id === resource.resourceType
          )[0].displayValue || '',
          accordionSubHeading: resource.location || '',
          accordionRightHeading: "$" + resource.value,
          accordionRightSubHeading: "Est. Value",
          accordionRecord: idx,
          accordionData: [

            {
              'label': "Type of Resource",
              'value': this.resourceTypes.filter(
                (c: any) => c.id === resource.resourceType
              )[0].displayValue, 
              "bold": false
            },
            {
              'label': "Tell us about the other resource type.",
              'value': <string>resource.otherResource,
              "bold": false
            },
            {
              'label': "Location",
              'value': <string>resource.location,
              "bold": false
            },
            {
              'label': "Account Number",
              'value': <string>resource.accountNumber,
              "bold": false
            },
            {
              'label': "Estimated Value",
              'value': "$" + resource.value,
              "bold": false
            },
            {
              'label': "Tell us who owns this resource.",
              'value': resource.owner,
              "bold": false
            },
            {
              'label': "Tell us who outside of the household owns this resource.",
              'value': <string>resource.ownerName,
              "bold": false
            }
          ],

          editButton: "Edit",
          deleteButton: "Remove"
        }
      });
      this.jsonData = this.financialHoldingsData;
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
    const anyoneHaveCash = { ...resources.anyoneHaveCash };

    if (anyoneHaveCash.cashCollection && anyoneHaveCash.cashCollection.length > 0) {
      let cashResources = [...anyoneHaveCash.cashCollection];
      cashResources.splice(this.recordToBeOperated, 1);
      const updatedCashCollection = [...cashResources]
      const updatedAnyoneHaveCash = { ...anyoneHaveCash, ...{ cashCollection: [...updatedCashCollection] } };
      const updatedResources = { ...resources, ...{ anyoneHaveCash: updatedAnyoneHaveCash } }

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
      "/" + RoutePath.APPLYNOW_RESOURCES_FINANCIALHOLDINGSDETAILS
    ], { fragment: "new" });

  }

  editClicked(userId: any) {
    this.router.navigate([
      RoutePath.APPLYNOW +
      "/" + RoutePath.APPLYNOW_RESOURCES +
      "/" + RoutePath.APPLYNOW_RESOURCES_FINANCIALHOLDINGSDETAILS
    ],
      { fragment: this.recordToBeOperated.toString() });
  }

  back(): void {
    this.router.navigate([this.routingStrategy.previousRoute()]);
  }

  next(): void {
    this.queueService.next();
  }

}
