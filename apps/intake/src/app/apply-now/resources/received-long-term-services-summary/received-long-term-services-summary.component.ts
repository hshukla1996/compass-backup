import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IApplyNowState } from '../../+state/apply-now.models';
import { DateFormatConstants } from '../../../shared/constants/Constants';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowIndividualDetailsPregnancySummaryScreenStrategy } from '../../../shared/route-strategies/apply-now/individual-details-pregnancy-summary-screen';
import { Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, PageDirection } from '../../household/household-model';
import { ScreenQueueUtil } from '../resources-gatepost/resources-gatepost.path';

@Component({
  selector: 'compass-ui-received-long-term-services-summary',
  templateUrl: './received-long-term-services-summary.component.html',
  styleUrls: ['./received-long-term-services-summary.component.scss'],
  providers: []
})
export class ReceivedLongTermServicesSummaryComponent implements OnInit {
  jsonData: any;
  applyNowState!: IApplyNowState;
  private receivedLongTermServicesMap: any = {};
  deleteUser: any;
  receivedLongTermServicesDetailsData = {
    "questionText": "Your Long-Term Living Services received.",
    "subHeading": "Review the entries to make sure everything looks correct.",
    "toolTip": "",
    "questionAnswers": [
      {
        "accordionHeader": "{replace} Sample 65 (M)",
        "accordionSubHeading": "",
        "accordionRightHeading": "",
        "accordionRightSubHeading": "",
        "userId": 1,
        "accordionData": [{}

        ],
        "editButton": "Edit",
        "deleteButton": "Delete"
      },
    ],
    "addtionalButton": ""
  }

  public modalData = {
    "modalTitle": "Are you sure you want to remove this record?",
    "modalContent": "If you remove this record you will need to re-enter the data to get it back.",
    "cancelButton": "Cancel",
    "continueButton": "Remove"
  }

  constructor(
    private router: Router,
    private service: ApplyNowStoreService,
    private queueService: ScreenQueueUtil
  ) { }

  ngOnInit(): void {
    this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      let houseHoldPersons = this.applyNowState.houseHoldDetails.houseHoldPersons;
      let receivedLongTermServicesDetails = houseHoldPersons?.filter((person) => person.isReceivedLongTermService && person.isReceivedLongTermService === 'Y') as IHouseHold[];
      this.receivedLongTermServicesDetailsData['questionAnswers'] = [];

      receivedLongTermServicesDetails.forEach((abrel, i) => {
        this.receivedLongTermServicesDetailsData['questionAnswers'][i] = {

          accordionHeader: Utility.getLabelText(abrel),
          accordionSubHeading: "",
          accordionRightHeading: "",
          accordionRightSubHeading: "",
          userId: abrel.id || 0,

          accordionData: [
            {
              'label': `How were ${abrel.firstName}'s expenses being paid?`,
              'value': <string>abrel.isReceivedLongTermDetails,
              "bold": false
            }
          ],
          editButton: "Edit",
          deleteButton: "Delete"
        }

        this.jsonData = this.receivedLongTermServicesDetailsData;
      })
    })
  }

  public next() {
    this.queueService.next();
  }

  public back() {    
    this.queueService.back();
  }

  public deleteClicked(user: any) {
    this.deleteUser = user;
  }

  public continueClicked() {
    const storedHouseholdDetails = this.service.getHouseHoldDetails;
    const clonedUpdatedPerson: IHouseHold[] = [];

    if (this.service.getHouseHoldDetails && this.service.getHouseHoldDetails.houseHoldPersons) {
      this.receivedLongTermServicesMap = {};
      this.service.getHouseHoldDetails.houseHoldPersons.forEach((person: IHouseHold) => {
        const clonedPerson = { ...person };
        if (person.id === this.deleteUser) {
          clonedPerson.isReceivedLongTermService = 'N';
          clonedPerson.isReceivedLongTermDetails = undefined;
        }

        clonedUpdatedPerson.push(clonedPerson);
      });

      const receivedLongTermServicesMap = { ...this.applyNowState.houseHoldDetails.pageAction.receivedLongTermServicesMap };
      let receivedLongTermServicesKeys = Object.keys(receivedLongTermServicesMap)
      clonedUpdatedPerson.forEach((person) => {
        if (!person.isReceivedLongTermService || person.isReceivedLongTermService === 'N') {
          const removedKey = receivedLongTermServicesKeys.find((key) => +key === person.id);
          if (removedKey) {
            receivedLongTermServicesKeys = receivedLongTermServicesKeys.filter((person) => {
              if (person === removedKey) {
                return false;
              }
              return true;
            })
          }
        }
      });

      receivedLongTermServicesKeys.forEach((key) => {
        this.receivedLongTermServicesMap[key] = true;
      });

      const updatedPageAction = {
        receivedLongTermServicesMap: this.receivedLongTermServicesMap,
        serviceDirection: PageDirection.NEXT
      };

      if (storedHouseholdDetails) {
        this.service.updateHouseHoldDetails(
          { ...storedHouseholdDetails, ...{ houseHoldPersons: clonedUpdatedPerson, pageAction: updatedPageAction } }
        )
      }

      this.jsonData.questionAnswers = this.jsonData['questionAnswers'].filter((element: any) => {
        if (+element['userId'] === +this.deleteUser) {
          return false;
        }
        return true;
      });
    }
  }

  public editClicked(user: any) {
    this.router.navigate([
      RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_RESOURCES + '/' + RoutePath.APPLYNOW_RESOURCES_RECEIVEDLONGTERMSERVICESDETAILS,
      { userId: user },
    ]);
  }
}
