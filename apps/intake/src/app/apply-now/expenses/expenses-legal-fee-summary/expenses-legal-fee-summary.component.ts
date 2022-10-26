import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { RoutePath } from '../../../shared/route-strategies';
import { Router } from "@angular/router";
import {Utility} from "../../../shared/utilities/Utility";
import {ApplyNowStoreService} from "../../apply-now-store-service";
import {AppStoreService} from "../../../app-store-service";
import {IApplyNowState} from "../../+state/apply-now.models";
import {IHouseHold, IHouseHoldDetails} from "../../household/household-model";
import { ScreenQueueUtil } from "./../expenses-gatepost/expenses-gatepost.paths";

@Component({
    selector: "compass-ui-expenses-legal-fee-summary",
    templateUrl: "./expenses-legal-fee-summary.component.html",
    styleUrls: ["./expenses-legal-fee-summary.component.scss"],
})
export class ExpensesLegalFeeSummaryComponent implements OnInit {
    jsonData: any;
    selectedData!: any[];
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
    alimonyMap: any[] = [];
    applyNowState!: IApplyNowState;
    householdPersons: IHouseHold[] = [];
    legalfeeMap: any[] = [];
    deletedUser!: any;
    modalData = {
        modalTitle: "Are you sure you want to remove this record?",
        modalContent:
            "If you remove this record you will need to re-enter the data to get it back.",
        cancelButton: "Cancel",
        continueButton: "Remove",
    };
    recordToBeOperated!: number;
    demographicData: any = {
        questionText: "Your legal fees.",
        subHeading: "Look below to make sure all legal fees are here.",
        toolTip: "",
        questionAnswers: [
            {
                accordionHeader: "{replace} Sample 65 (M)",
                accordionSubHeading: "",
                accordionRightHeading: "",
                accordionRightSubHeading: "",
                userId: 1,
                accordionData: [{}],
                editButton: "Edit",
                deleteButton: "Delete",
            },
        ],
        addtionalButton: "Add Legal Fees",
    };
    constructor(
        private router: Router,
        private service: ApplyNowStoreService,
        private queueService: ScreenQueueUtil
    ) {}

    ngOnInit(): void {
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons || [];
        let k=0
      this.houseHoldPersons.forEach((ind, i) => {
        if(ind.expense?.legalFeeExpenses && ind.expense.legalFeeExpenses.length > 0)
            ind.expense.legalFeeExpenses?.forEach((le: any, idx: number) => {
                this.demographicData["questionAnswers"][k] = {
                    accordionHeader:
                        ind.firstName +
                            " " +
                            ind.lastName +
                            " " +
                            Utility.getAge(ind.dateOfBirth) +
                            " (" +
                            Utility.getGenderCode(ind.gender as string) +
                            ")" || "",
                    accordionSubHeading: "",
                    accordionRightHeading: "$" + le.legalFee,
                    accordionRightSubHeading: "",
                    userId: ind.id || 0,
                    accordionRecord: idx,
                    accordionData: [],
                    editButton: "Edit",
                    deleteButton: "Delete",
                };
              k++;
            });

            this.jsonData = this.demographicData;
            // console.log("jsondata,,",this.jsonData)
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

        const updatedHouseholdPersons =
            this.houseHoldDetails.houseHoldPersons?.map(
                (person: IHouseHold) => {
                  const personToBeUpdated = {...person};

                  if (
                    person.id?.toString() ===
                    this.deletedUser?.toString() &&
                    personToBeUpdated.expense?.legalFeeExpenses
                  ) {
                    const storedExpense = {...person.expense};
                    const storedLegalFeeExpense = storedExpense.legalFeeExpenses || [];
                    personToBeUpdated.expense = {
                      ...storedExpense,
                      legalFeeExpenses: storedLegalFeeExpense.filter((exp,i)=>this.recordToBeOperated!== i)
                    }
                  }
                    return personToBeUpdated;
                });
        if (storedHouseholdDetails)
            this.service.updateHouseHoldDetails({
                ...storedHouseholdDetails,
                ...{ houseHoldPersons: updatedHouseholdPersons },
            });
        this.jsonData["questionAnswers"].forEach((element: any) => {
            if (element["accordionRecord"] === this.recordToBeOperated && element.userId === this.deletedUser) {
                element["accordionHeader"] = "";
            }
        });
    }

    editClicked(editDetails: any) {
        this.router.navigate(
            [
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_EXPENSES +
                    "/" +
                    RoutePath.APPLYNOW_EXPENSES_LEGALFEE_DETAILS,
                { userId: editDetails },
            ],
            { fragment: this.recordToBeOperated.toString() }
        );
    }

    addClicked() {
        this.router.navigate(
            [
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_EXPENSES +
                    "/" +
                    RoutePath.APPLYNOW_EXPENSESLEGALFEE,
            ],
            { fragment: "new" }
        );
    }

    back(): void {
      this.queueService.back();
    }
    next() {
      this.queueService.updateForwardPath();
      this.queueService.next();
        /*this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_EXPENSES +
                "/" +
                RoutePath.APPLYNOW_HOUSING_ASSISTANCE_RECEIVED,
        ]);*/
    }
}
