import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import JsonData from "./child-support-expenses.json";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { RoutePath } from "../../../shared/route-strategies";
import {IHouseHold, IHouseHoldDetails, PageDirection} from "../../household/household-model";
import { ScreenQueueUtil } from "./../expenses-gatepost/expenses-gatepost.paths";
import {ApplyNowStoreService} from "../../apply-now-store-service";
import {AppStoreService} from "../../../app-store-service";
import {Utility} from "../../../shared/utilities/Utility";
import { INDIVIDUAL_PROGRAMS } from '../../../shared/constants/Individual_Programs_Constants';

@Component({
    selector: "compass-ui-child-support-expenses",
    templateUrl: "./child-support-expenses.component.html",
    styleUrls: ["./child-support-expenses.component.scss"],
})
export class ChildSupportExpensesComponent implements OnInit {
    jsonData:any= {
      "questionText": "You told us someone pays child support to a person who does not live in the house. Tell us who.",
      "subHeading": "Select all that apply.",
      "toolTip": "",
      "isRequired": true,
      "requiredText": "Please select at least one",
      "questionAnswers": [

      ]
    };
  selectedData: string[] = [];
  childSupportMap:any ={};
  fragment = 'new';
  houseHoldPersons: IHouseHold[] = [];
  houseHoldDetails!: IHouseHoldDetails;

  constructor(
    private router: Router,
    private queueService: ScreenQueueUtil,
    private service: ApplyNowStoreService,
    private appService: AppStoreService,
    private cd: ChangeDetectorRef,
    private activedRoute: ActivatedRoute,
  ) {}
    ngOnInit(): void {
      this.activedRoute.fragment.subscribe((fragment) => {
        this.fragment = fragment || '';
        if(this.fragment == 'new'){
          this.selectedData = [];
        }
      });
      this.houseHoldDetails = this.service.getHouseHoldDetails;
      if (this.houseHoldDetails.houseHoldPersons){
        this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
      }
      this.jsonData.questionAnswers = [];
      if (
        typeof this.houseHoldDetails.pageAction
          .childSupportMap === "object" &&
        this.fragment !== "new"
      )
        this.selectedData = Object.keys(
          this.houseHoldDetails.pageAction.childSupportMap
        );
      this.houseHoldPersons.forEach((person) => {
         let personalBenefits = this.service?.getAppliedBenefitsForIndividual(
            person
        ) as string[];
       const isEligible = this.service.areProgramsExist(personalBenefits, [
           INDIVIDUAL_PROGRAMS.CI,
           INDIVIDUAL_PROGRAMS.CIR,
           INDIVIDUAL_PROGRAMS.FS,
           INDIVIDUAL_PROGRAMS.FSR,
           INDIVIDUAL_PROGRAMS.ES,
           INDIVIDUAL_PROGRAMS.ESR
       ]);
        if (person.id && isEligible) {
            this.jsonData.questionAnswers.push({
                id: person.id as unknown as number,
                isChecked:
                    this.fragment !== "new" &&
                    this.selectedData.indexOf(person.id.toString()) > -1
                        ? true
                        : false,
                label: `${person.firstName as string} ${
                    person.lastName as string
                } ${Utility.getAge(person.dateOfBirth)}
          (${Utility.getGenderCode(person.gender as string)})`,
            });
        }
      });
    }
  showNextPage(selectedItems: any) {
    selectedItems.forEach((ind: any) => {
      this.childSupportMap[ind] = false;
    });
    const updatedPageAction = {
      ...this.houseHoldDetails.pageAction,
      childSupportMap: {
        ...this.houseHoldDetails.pageAction?.childSupportMap,
        ...this.childSupportMap,
      },

      childSupportDirection: PageDirection.NEXT,
    };
    if (this.houseHoldDetails) {
      console.log(updatedPageAction);
      this.service.updateHouseHoldDetails({
        ...this.houseHoldDetails,
        ...{ pageAction: updatedPageAction },
      });
    }
    this.router.navigate([
        RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_EXPENSES +
            "/" +
            RoutePath.APPLYNOW_CHILD_SUPPORT_EXPENSESE_DETAILS,
    ],  { fragment: this.fragment});
  }


    showPreviousPage() {
         this.queueService.back();
    }
}
