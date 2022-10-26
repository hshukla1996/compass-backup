import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IApplyNowState } from '../../+state/apply-now.models';
import { AppStoreService } from '../../../app-store-service';
import { RoutePath } from '../../../shared/route-strategies';
import { Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, IHouseHoldDetails } from '../../household/household-model';
import { ScreenQueueUtil } from '../income-gatepost/income-gatepost.path';
import { State as AppState } from './../../../+state';
import * as AppSelectors from './../../../+state/app.selectors'
import { AppPageActions } from '../../../+state/actions';
import { Observable, delay, of } from 'rxjs';


@Component({
  selector: 'compass-ui-other-income-summary',
  templateUrl: './other-income-summary.component.html',
  styleUrls: ['./other-income-summary.component.scss']
})
export class OtherIncomeSummaryComponent implements OnInit {

  applyNowState!: IApplyNowState;
  jsonData: any;
  houseHoldDetails!: IHouseHoldDetails;
  houseHoldPersons: IHouseHold[] = [];
  howOften: any;
  recordToBeOperated!: number;
  deletedUser!: any;
  otherIncomeTypes$: Observable<any> | undefined;
  otherIncomeTypes: any;
  prepopulated: boolean = false;

  modalData = {
    modalTitle: "Are you sure you want to remove this record?",
    modalContent:
      "If you remove this record you will need to re-enter the data to get it back.",
    cancelButton: "Cancel",
    continueButton: "Remove",
  };

  otherIncomeData = {
    "questionText": "Review other income.",
    "subHeading": "Review the entries to make sure everything looks correct.",
    "toolTip": "You can edit or remove any other income sources shown here.",
    "questionAnswers": [
      {
        "accordionHeader": "",
        "accordionSubHeading": "{replace} Sample 65 (M)",
        "accordionRightHeading": "",
        "accordionRightSubHeading": "",
        "accordionRecord": 1,
        "userId": 1,
        "accordionData": [{}],
        "editButton": "Edit",
        "deleteButton": "Delete"
      },
    ],
    "addtionalButton": "+ Add Another Other Income"
  };

  constructor(private router: Router,
    private cd: ChangeDetectorRef,
    private service: ApplyNowStoreService,
    private appService: AppStoreService,
    private queueService: ScreenQueueUtil,
    private appstore: Store<AppState>,) { }

  ngOnInit(): void {

    this.appstore.dispatch(AppPageActions.getOtherIncomeTypes());
    this.otherIncomeTypes$ = this.appstore.select(AppSelectors.getOtherIncomeTypes);

    this.otherIncomeTypes$?.subscribe((s) => {
      this.otherIncomeTypes = s;
      this.cd.detectChanges();
    });


    this.appService.getPay().subscribe((pay) => {
      this.howOften = pay;
      this.cd.detectChanges();
    });

    
    of(true)
      .pipe(delay(300))
      .subscribe(() => {
        // this.service.getAppData().subscribe(d => {
        //   this.applyNowState = { ...d };
          this.houseHoldDetails = this.service.getHouseHoldDetails;
          if (this.houseHoldDetails.houseHoldPersons) {
            this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
            let k = 0;
            this.houseHoldPersons.forEach((person, i) => {
              person.individualIncome?.otherIncome?.forEach((otherIncome: any, idx: number) => {
                this.otherIncomeData['questionAnswers'][k] = {
                  accordionHeader: this.otherIncomeTypes.filter(
                    (c: any) => c.id === otherIncome.incomeType
                  )[0].displayValue || '',
                  accordionSubHeading: person.firstName +
                    " " +
                    person.lastName +
                    " " +
                    Utility.getAge(person.dateOfBirth) || "",
                  accordionRightHeading: "$" + otherIncome.grossIncome,
                  accordionRightSubHeading: this.howOften.filter(
                    (c: any) => c.id === otherIncome.frequency
                  )[0].displayValue,
                  userId: person.id || 0,
                  accordionRecord: idx,
                  accordionData: [
                    {
                      'label': "What type of other income is this?",
                      'value': this.otherIncomeTypes.filter(
                        (c: any) => c.id === otherIncome.incomeType
                      )[0].displayValue,

                      "bold": false
                    },
                    {
                      'label': "Please  describe the soruce of other income",
                      'value': <string>otherIncome.otherIncomeDescription,
                      "bold": false
                    },
                    {
                      'label': "How often does " + person.firstName + " receive this income?",
                      'value': this.howOften.filter(
                        (c: any) => c.id === otherIncome.frequency
                      )[0].displayValue,
                      "bold": false
                    },
                    {
                      'label': "What is the amount of the income before taxes and deductions?",
                      'value': "$" + otherIncome.grossIncome,
                      "bold": false
                    },
                    {
                      'label': "When did " + person.firstName + " last receive this income?",
                      'value': (otherIncome.mostRecentPayDate ?
                        otherIncome.mostRecentPayDate.substr(5, 2) + "/" + otherIncome.mostRecentPayDate.substr(2, 2) + "/" + otherIncome.mostRecentPayDate.substr(0, 4) : ""),
                      "bold": false
                    },
                    {
                      'label': "Is any of the other income received sent somewhere other than the household address?",
                      'value': <string>(otherIncome.address != null ? "Yes" : "No"),
                      "bold": false
                    }
                  ],
                  editButton: "Edit",
                  deleteButton: "Remove"
                }
                k++;
              });
            });
            this.jsonData = this.otherIncomeData;
          }
         //this.cd.detectChanges();
        });
     //});
  }

  recordIndexToOp(recordIndex: number) {
    this.recordToBeOperated = recordIndex;
  }
  deleteClicked(userId: any) {
    this.deletedUser = userId;
    if (this.prepopulated) {
      this.router.navigate([
        RoutePath.APPLYNOW +
        "/" +
        RoutePath.APPLYNOW_INCOME +
        "/" +
        RoutePath.APPLYNOW_INCOME_OTHERINCOME +
        "/" +
        RoutePath.APPLYNOW_INCOME_OTHERINCOMEENDMODAL,
        { userId: userId },
      ], { fragment: this.recordToBeOperated.toString() });
    }
  }

  continueClicked() {

    const storedHouseholdDetails = this.houseHoldDetails;
    const updatedHouseholdPersons =
      this.houseHoldDetails.houseHoldPersons?.map(
        (person: IHouseHold) => {
          const personToBeUpdated = { ...person };
          const existingIndividualIncome = { ...personToBeUpdated.individualIncome };
          if (
            person.id?.toString() ===
            this.deletedUser?.toString() &&
            existingIndividualIncome.otherIncome &&
            existingIndividualIncome.otherIncome.length > 0
          ) {
            const existingOtherIncome = [...existingIndividualIncome.otherIncome];
            existingOtherIncome.splice(this.recordToBeOperated, 1);
            existingIndividualIncome.otherIncome = existingOtherIncome;
            return { ...personToBeUpdated, ...{ individualIncome: existingIndividualIncome } };
          }
          return personToBeUpdated;
        }
      );
     
    if (storedHouseholdDetails) {
      this.service.updateHouseHoldDetails({
        ...storedHouseholdDetails,
        ...{ houseHoldPersons: updatedHouseholdPersons },
      });
    }

    this.jsonData["questionAnswers"].forEach((element: any) => {
      if (element["accordionRecord"] === this.recordToBeOperated && element["userId"] === this.deletedUser) {
        element["accordionHeader"] = '';
      }
    });
  }

  addClicked() {
    this.router.navigate([
      RoutePath.APPLYNOW
      + "/" + RoutePath.APPLYNOW_INCOME
      + "/" + RoutePath.APPLYNOW_INCOME_OTHERINCOME
    ], { fragment: "new" });
  }

  editClicked(userId: any) {

    this.router.navigate([
      RoutePath.APPLYNOW
      + "/" + RoutePath.APPLYNOW_INCOME
      + "/" + RoutePath.APPLYNOW_INCOME_OTHERINCOME
      + "/" + RoutePath.APPLYNOW_INCOME_OTHERINCOMEDETAILS,
      { userId: userId },
    ],
      { fragment: this.recordToBeOperated.toString() });
  }

  back(): void {
    this.router.navigate([
      RoutePath.APPLYNOW
      + "/" + RoutePath.APPLYNOW_INCOME
      + "/" + RoutePath.APPLYNOW_INCOME_OTHERINCOME
    ]);
  }

  next(): void {
    this.queueService.next();
  }

}
