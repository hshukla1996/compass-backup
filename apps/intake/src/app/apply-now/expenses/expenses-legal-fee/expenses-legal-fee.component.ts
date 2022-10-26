import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { RoutePath } from "../../../shared/route-strategies";
import {IHouseHold, IHouseHoldDetails, PageDirection} from "../../household/household-model";
import {Utility} from "../../../shared/utilities/Utility";
import {ApplyNowStoreService} from "../../apply-now-store-service";
import { ScreenQueueUtil } from "./../expenses-gatepost/expenses-gatepost.paths";
import { INDIVIDUAL_PROGRAMS } from '../../../shared/constants/Individual_Programs_Constants';

@Component({
    selector: "compass-ui-expenses-legal-fee",
    templateUrl: "./expenses-legal-fee.component.html",
    styleUrls: ["./expenses-legal-fee.component.scss"],
})
export class ExpensesLegalFeeComponent implements OnInit {
    houseHoldDetails!: IHouseHoldDetails;
    private houseHoldPersons: IHouseHold[] = [];
    selectedData: string[] = [];
    legalfeeMap: any = {};
    fragment = "new";
    jsonData: any = {
        questionText:
            "You told us someone pays legal fees to collect income. Tell us who.",
        subHeading: "Select all that apply.",
        toolTip: "",
        isRequired: true,
        requiredText: "Please select at least one",
        questionAnswers: [],
    };
    constructor(
        private service: ApplyNowStoreService,
        private router: Router,
        private queueService: ScreenQueueUtil
    ) {}

    ngOnInit(): void {
        //this.jsonData = JsonData;
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        //this.applyNowState = { ...this.houseHoldDetails };
        this.houseHoldPersons = this.houseHoldDetails
            .houseHoldPersons as IHouseHold[];
        this.jsonData.questionAnswers = [];


        this.houseHoldPersons.forEach((person) => {
            let personalBenefits =
                  this.service?.getAppliedBenefitsForIndividual(
                      person
                  ) as string[];
              const isEligible = this.service.areProgramsExist(
                  personalBenefits,
                  [
                      INDIVIDUAL_PROGRAMS.HA,
                      INDIVIDUAL_PROGRAMS.MAR,
                  ]
              );
            if (person.id && isEligible) 
                this.jsonData.questionAnswers.push({
                    id: person.id as unknown as number,
                    isChecked:
                        false,
                    label: `${person.firstName as string} ${
                        person.lastName as string
                    } ${Utility.getAge(person.dateOfBirth)}
          (${Utility.getGenderCode(person.gender as string)})`,
                });
        });
    }

    showNextPage(selectedItems: any) {
        selectedItems.forEach((ind: any) => {
            this.legalfeeMap[ind] = false;
        });
        const updatedPageAction = {
            ...this.houseHoldDetails.pageAction,
            legalfeeMap: this.legalfeeMap,
            legalfeeDirection: PageDirection.NEXT,
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
                    RoutePath.APPLYNOW_EXPENSES_LEGALFEE_DETAILS,
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
                RoutePath.APPLYNOW_TAX_DEDUCTIBLE_EXPENSES_SUMMARY,
        ]);*/
    }
}
