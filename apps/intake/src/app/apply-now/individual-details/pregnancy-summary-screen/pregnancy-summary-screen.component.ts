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
import { ScreenQueueUtil } from '../individuals-gatepost/individuals-gatepost.paths';

@Component({
  selector: 'compass-ui-pregnancy-summary',
  templateUrl: './pregnancy-summary-screen.component.html',
  styleUrls: ['./pregnancy-summary-screen.component.scss'],
  providers: [ApplyNowIndividualDetailsPregnancySummaryScreenStrategy]
})
export class PregnancySummaryScreenComponent implements OnInit {
  jsonData: any;
  applyNowState!: IApplyNowState;
  private pregnancyMap: any = {};
  deleteUser: any;
  pregnancyDetailsData = {
    "questionText": "People who are pregnant in the household",
    "subHeading": "Look below to make sure all people that are pregnant are here. ",
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
    "addtionalButton": "Add Pregnancy"
  }

  public modalData = {
    "modalTitle": "Are you sure you want to remove this record?",
    "modalContent": "If you remove this record you will need to re-enter the data to get it back.",
    "cancelButton": "Cancel",
    "continueButton": "Remove"
  }

  constructor(
    private routingStratagy: ApplyNowIndividualDetailsPregnancySummaryScreenStrategy,
    private router: Router,
    private queueService: ScreenQueueUtil,
    private service: ApplyNowStoreService
  ) { }

  ngOnInit(): void {
    this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      let houseHoldPersons = this.applyNowState.houseHoldDetails.houseHoldPersons;
      let pregnantPersonDetails = houseHoldPersons?.filter((person) => person.isPregnant && person.isPregnant === 'Y') as IHouseHold[];
      this.pregnancyDetailsData['questionAnswers'] = [];

      pregnantPersonDetails.forEach((abrel, i) => {
        this.pregnancyDetailsData['questionAnswers'][i] = {

          accordionHeader: Utility.getLabelText(abrel),
          accordionSubHeading: abrel.pregnancySummaryInformation?.pregnancyDueDate ? `Due ${Utility.getDateInFormat(new Date(abrel.pregnancySummaryInformation?.pregnancyDueDate as string), DateFormatConstants.MMDDYYYY)}` : "",
          accordionRightHeading: "",
          accordionRightSubHeading: "",
          userId: abrel.id || 0,

          accordionData: [
            {
              'label': "How many babies are due? ",
              'value': <string>abrel.pregnancySummaryInformation?.babiesRequired,
              "bold": false
            }
          ],
          editButton: "Edit",
          deleteButton: "Delete"
        }

        this.jsonData = this.pregnancyDetailsData;
      })
    })
  }

  public addPregnancyDetails(): void {
    this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_PREGNANCYSCREEN]);
  }

  public next() {
    //  this.router.navigate([this.routingStratagy.nextRoute()]);
    this.queueService.updateForwardPath();
    this.queueService.next();
  }

  public back() {
   /* let isPregnanctPersonExists = false;
    if (this.applyNowState && this.applyNowState.houseHoldDetails && this.applyNowState.houseHoldDetails.houseHoldPersons) {
      const persons = this.applyNowState.houseHoldDetails.houseHoldPersons;
      const pregnantPersonObject = persons.find(x => x.isPregnant && x.isPregnant === 'Y');
      if (pregnantPersonObject) {
        isPregnanctPersonExists = true;
      }
    }

    if (isPregnanctPersonExists) {
      this.router.navigate([this.routingStratagy.previousRoute()]);
    }
    else {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_PREGNANCYSCREEN]);
    }*/
    this.queueService.back();
  }

  public deleteClicked(user: any) {
    this.deleteUser = user;
  }

  public continueClicked() {
    const storedHouseholdDetails = this.applyNowState.houseHoldDetails;
    const clonedUpdatedPerson: IHouseHold[] = [];

    if (this.applyNowState && this.applyNowState.houseHoldDetails && this.applyNowState.houseHoldDetails.houseHoldPersons) {
      this.pregnancyMap = {};
      this.applyNowState.houseHoldDetails.houseHoldPersons.forEach((person: IHouseHold) => {
        const clonedPerson = { ...person };
        if (person.id === this.deleteUser) {
          clonedPerson.isPregnant = 'N';
        }

        clonedUpdatedPerson.push(clonedPerson);
      });

      const pregnancyMap = { ...this.applyNowState.houseHoldDetails.pageAction.pregnancyMap };
      let pregnantPersonKeys = Object.keys(pregnancyMap)
      clonedUpdatedPerson.forEach((person) => {
        if (!person.isPregnant || person.isPregnant === 'N') {
          const removedKey = pregnantPersonKeys.find((key) => +key === person.id);
          if (removedKey) {
            pregnantPersonKeys = pregnantPersonKeys.filter((person) => {
              if (person === removedKey) {
                return false;
              }
              return true;
            })
          }
        }
      });

      pregnantPersonKeys.forEach((key) => {
        this.pregnancyMap[key] = true;
      });

      const updatedPageAction = {
        pregnancyMap: this.pregnancyMap,
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
      RoutePath.APPLYNOW +
      "/" +
      RoutePath.APPLYNOW_INDIVIDUALDETAILS +
      "/" +
      RoutePath.APPLYNOW_INDIVIDUALDETAILS_PREGNANCYDETAILSSCREEN,
      { userId: user },
    ]);
  }
}
