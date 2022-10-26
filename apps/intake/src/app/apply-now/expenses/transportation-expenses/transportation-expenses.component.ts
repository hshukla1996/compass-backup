import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import { RoutePath } from "../../../shared/route-strategies";
import {IHouseHold, IHouseHoldDetails, PageDirection} from "../../household/household-model";
import { ScreenQueueUtil } from "./../expenses-gatepost/expenses-gatepost.paths";
import {ApplyNowStoreService} from "../../apply-now-store-service";
import {AppStoreService} from "../../../app-store-service";
import {Utility} from "../../../shared/utilities/Utility";
import { INDIVIDUAL_PROGRAMS } from '../../../shared/constants/Individual_Programs_Constants';

@Component({
    selector: "compass-ui-transportation-expenses",
    templateUrl: "./transportation-expenses.component.html",
    styleUrls: ["./transportation-expenses.component.scss"],
})
export class TransportationExpensesComponent implements OnInit {
    jsonData: any = {
        questionText:
            "You told us someone pays for transportation to go to work. Tell us who.",
        subHeading: "Select all that apply.",
        toolTip: "",
        isRequired: true,
        requiredText: "Please select at least one",
        questionAnswers: [],
    };
    selectedData: string[] = [];
    transportationMap: any = {};
    houseHoldPersons: IHouseHold[] = [];
    houseHoldDetails!: IHouseHoldDetails;
    fragment = "new";
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
        if (this.houseHoldDetails.houseHoldPersons) {
            this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
        }
        this.jsonData.questionAnswers = [];
      if(this.houseHoldDetails.pageAction?.transportationMap) {
        this.selectedData = Object.keys(
          this.houseHoldDetails.pageAction.transportationMap
        );
      }
        this.houseHoldPersons.forEach((person) => {
            const personalBenefits =
                this.service?.getAppliedBenefitsForIndividual(
                    person
                ) as string[];
            const isEligible = this.service.areProgramsExist(personalBenefits, [
                INDIVIDUAL_PROGRAMS.HC,
                INDIVIDUAL_PROGRAMS.HA,
                INDIVIDUAL_PROGRAMS.MCR,
                INDIVIDUAL_PROGRAMS.MAR
            ]);

            if (person.id && isEligible) {
              this.jsonData.questionAnswers.push({
                    id: person.id as unknown as number,
                    isChecked:  this.fragment !== "new" &&
                    this.selectedData.indexOf(person.id.toString()) > -1
                      ? true
                      : false,
                    label: `${person.firstName as string} ${
                        person.lastName as string
                    } ${Utility.getAge(person.dateOfBirth)}`,
                });
            }
        });
    }
    showNextPage(selectedItems: any) {
        selectedItems.forEach((ind: any) => {
            if (parseInt(ind)) this.transportationMap[ind] = false;
        });
        const updatedPageAction = {
            ...this.houseHoldDetails.pageAction,
            transportationMap: this.transportationMap,
            transportationDirection: PageDirection.NEXT,
        };
        if (this.houseHoldDetails) {
            this.service.updateHouseHoldDetails({
                ...this.houseHoldDetails,
                ...{ pageAction: updatedPageAction },
            });
        }
        this.router.navigate(
            [
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_EXPENSES +
                    "/" +
                    RoutePath.APPLYNOW_TRANSPORTATION_EXPENSES_DETAILS,
            ],
            { fragment: this.fragment }
        );
    }

    showPreviousPage() {
        this.queueService.back();
        /*this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_EXPENSES +
                "/" +
                RoutePath.APPLYNOW_CHILD_OR_ADULUT_CARE_EXPENSES_SUMMARY,
        ]);*/
    }
}
