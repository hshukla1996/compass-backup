import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { IApplyNowState } from '../../+state/apply-now.models';
import { INDIVIDUAL_PROGRAMS } from '../../../shared/constants/Individual_Programs_Constants';
import { RoutePath } from "../../../shared/route-strategies";
import { Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from "../../apply-now-store-service";
import {IHouseHold, IHouseHoldDetails, PageDirection} from '../../household/household-model';
import { ScreenQueueUtil } from "./../expenses-gatepost/expenses-gatepost.paths";

@Component({
    selector: "compass-ui-alimony-expenses",
    templateUrl: "./alimony-expenses.component.html",
    styleUrls: ["./alimony-expenses.component.scss"],
})
export class AlimonyExpensesComponent implements OnInit {
    houseHoldDetails!: IHouseHoldDetails;
    applyNowState: IApplyNowState | undefined;
    private houseHoldPersons: IHouseHold[] = [];
    private householdMembers: any[] = [];
    fragment = "new";
    selectedData: string[] = [];
    alimonyMap: any[] = [];
    public jsonData = {
        questionText:
            "You told us someone pays alimony to a person who does not live in the house. Tell us who.",
        subHeading: "Select all that apply.",
        toolTip: "",
        isRequired: true,
        requiredText: "Please select at least one",
        questionAnswers: [
            {
                id: 1,
                label: "Test",
                isChecked: false,
            },
        ],
    };
    constructor(
        private service: ApplyNowStoreService,
        private router: Router,
        private cd: ChangeDetectorRef,
        private queueService: ScreenQueueUtil,
        private activedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        if (this.houseHoldDetails.houseHoldPersons) {
            this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
        }
        this.jsonData.questionAnswers = [];

 if (
     typeof this.houseHoldDetails.pageAction.alimonyMap === "object" &&
     this.fragment !== "new"
 )
     this.selectedData = Object.keys(
         this.houseHoldDetails.pageAction.alimonyMap
     );
        this.houseHoldPersons.forEach((person) => {
              let personalBenefits =
                  this.service?.getAppliedBenefitsForIndividual(
                      person
                  ) as string[];
              const isEligible = this.service.areProgramsExist(
                  personalBenefits,
                  [
                      INDIVIDUAL_PROGRAMS.CI,
                      INDIVIDUAL_PROGRAMS.CIR,
                      INDIVIDUAL_PROGRAMS.FS,
                      INDIVIDUAL_PROGRAMS.FSR,
                      INDIVIDUAL_PROGRAMS.ES,
                      INDIVIDUAL_PROGRAMS.ESR,
                  ]
              );
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
         this.activedRoute.fragment.subscribe((fragment) => {
             this.fragment = fragment || "";
             if (this.fragment == "new") {
                 this.selectedData = [];
             }
         });
    }

    showNextPage(selectedItems: any) {
        selectedItems.forEach((ind: any) => {
            this.alimonyMap[ind] = false;
        });
        const updatedPageAction = {
            ...this.houseHoldDetails.pageAction,
            alimonyMap: {
                ...this.alimonyMap,
            },

            alimonyDirection: PageDirection.NEXT,
        };
        if (this.houseHoldDetails) {
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
                RoutePath.APPLYNOW_ALIMONY_EXPENSES_DETAILS,
        ],{ fragment: this.fragment});
    }

    showPreviousPage() {
        this.queueService.back();
        /*this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_EXPENSES +
                "/" +
                RoutePath.APPLYNOW_CHILD_SUPPORT_EXPENSESE_SUMMARY,
        ]);*/
    }
}
