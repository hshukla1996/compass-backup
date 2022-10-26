import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IApplyNowState } from '../../+state/apply-now.models';
import { DateFormatConstants } from '../../../shared/constants/Constants';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowResourcesClosedOrEmptiedAccountDetailsStrategy } from '../../../shared/route-strategies/apply-now/closed-or-emptied-account-details';
import { ApplyNowResourcesClosedOrEmptiedAccountSummaryStrategy } from '../../../shared/route-strategies/apply-now/closed-or-emptied-account-summary';
import { Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, IHouseHoldDetails } from '../../household/household-model';
import { ScreenQueueUtil } from '../resources-gatepost/resources-gatepost.path';


@Component({
  selector: 'compass-ui-closed-or-emptied-account-summary',
  templateUrl: './closed-or-emptied-account-summary.component.html',
  styleUrls: ['./closed-or-emptied-account-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApplyNowResourcesClosedOrEmptiedAccountSummaryStrategy, ApplyNowResourcesClosedOrEmptiedAccountSummaryStrategy]
})
export class ClosedOrEmptiedAccountSummaryComponent implements OnInit {

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

  ClosedEmptyAccountData = {
    "questionText": "Your closed or emptied accounts.",
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
    "addtionalButton": "+ Add Closed Account"
  }

  constructor(private fb: FormBuilder,
    private service: ApplyNowStoreService,
    private cd: ChangeDetectorRef,
    private routingStrategy: ApplyNowResourcesClosedOrEmptiedAccountSummaryStrategy,
    // private addroutingStrategy: ApplyNowResourcesClosedOrEmptiedAccountDetailsStrategy,
    private router: Router,
    private screenQueueUtil: ScreenQueueUtil,
    private queueService: ScreenQueueUtil) { }

  ngOnInit(): void {
    this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      this.houseHoldDetails = this.service.getHouseHoldDetails;
      if (this.houseHoldDetails.houseHoldPersons) {
        this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
        this.houseHoldPersons.forEach(person => {
          this.personMap.set(person.id?.toString() || "", person.firstName + " " + person.lastName);
        });
        if (this.houseHoldDetails.resources?.anyoneHaveClosedDetails?.accountDetails) {

          this.houseHoldDetails.resources?.anyoneHaveClosedDetails?.accountDetails.forEach((resource, i) => {

            let listOwnerNames: string[] = [];

            if (resource.owner && resource.owner.length > 0) {
              listOwnerNames = resource.owner?.map(owner => {
                return this.personMap.get(owner.toString()) || "";
              });
            }

            this.ClosedEmptyAccountData['questionAnswers'][i] = {
              accordionHeader: resource.accountDateClosedDate as string,
              accordionSubHeading: '',
              accordionRightHeading: '',
              accordionRightSubHeading: '',
              accordionRecord: i,
              accordionData: [
                {
                  'label': "Account Type",
                  'value': resource.accountType,
                  "bold": false
                },
                {
                  'label': "Other AccountType",
                  'value': resource.otherAccountTye ? resource.otherAccountTye : '-',
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
                  'label': "What date was the account closed?",
                  'value': Utility.getDateInFormat(
                    new Date(
                      resource.accountDateClosedDate as string
                    ),
                    DateFormatConstants.MMDDYYYY
                  ),
                  "bold": false
                },
                {
                  'label': "Tell us who closed or emptied an account to pay for nursing services.",
                  'value': listOwnerNames.filter(x => x !== "").join(", "),
                  "bold": false
                }
              ],
              editButton: "Edit",
              deleteButton: "Remove"
            }
          });

        }
        this.jsonData = this.ClosedEmptyAccountData;
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
    const anyoneHaveClosedDetails = { ...resources.anyoneHaveClosedDetails };

    if (anyoneHaveClosedDetails.accountDetails && anyoneHaveClosedDetails.accountDetails.length > 0) {
      let accountDetails = [...anyoneHaveClosedDetails.accountDetails];
      accountDetails.splice(this.recordToBeOperated, 1);
      const updatedAccountDetails = [...accountDetails]
      const updatedAccountData = { ...anyoneHaveClosedDetails, ...{ accountDetails: [...updatedAccountDetails] } };
      const updatedResources = { ...resources, ...{ anyoneHaveClosedDetails: updatedAccountData } }

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
      "/" + RoutePath.APPLYNOW_RESOURCES_CLOSEDOREMPTIEDACCOUNTDETAILS
    ], { fragment: "new" });

  }

  editClicked(userId: any) {
    this.router.navigate([
      RoutePath.APPLYNOW +
      "/" + RoutePath.APPLYNOW_RESOURCES +
      "/" + RoutePath.APPLYNOW_RESOURCES_CLOSEDOREMPTIEDACCOUNTDETAILS
    ],
      { fragment: this.recordToBeOperated.toString() });
  }

  back(): void {
    this.queueService.back();
  }

  next(): void {
    this.queueService.next();
  }
}
