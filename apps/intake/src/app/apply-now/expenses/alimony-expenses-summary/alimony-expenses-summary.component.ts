import { Component, ChangeDetectorRef, OnInit } from "@angular/core";

import { Router } from "@angular/router";

import { RoutePath } from "../../../shared/route-strategies";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { AppStoreService } from "../../../app-store-service";
import { IHouseHold, IHouseHoldDetails } from "../../household/household-model";
import { Utility } from "../../../shared/utilities/Utility";
import { ScreenQueueUtil } from "../expenses-gatepost/expenses-gatepost.paths";
// import { timeStamp } from 'console';

@Component({
    selector: "compass-ui-alimony-expenses-summary",
    templateUrl: "./alimony-expenses-summary.component.html",
    styleUrls: ["./alimony-expenses-summary.component.scss"],
})
export class AlimonyExpSumCmp implements OnInit {
    jsonData: any;
    selectedData!: any[];
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
    alimonyMap: any[] = [];
    howOften:any;
    deletedUser!: any;
    modalData = {
        modalTitle: "Are you sure you want to remove this record?",
        modalContent:
            "If you remove this record you will need to re-enter the data to get it back.",
        cancelButton: "Cancel",
        continueButton: "Remove",
    };
    recordToBeOperated!: number;
    alimoneyExpensesData: any = {
        questionText: "",
        subHeading: "",
        toolTip: "",
        questionAnswers: [

        ],
        addtionalButton: "Add Alimony Expense",
    };
    constructor(
        private router: Router,
        private cd: ChangeDetectorRef,
        private service: ApplyNowStoreService,
        private appService: AppStoreService,
        private queueService: ScreenQueueUtil
    ) {}

    ngOnInit(): void {
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons || [];

        this.appService.getPay().subscribe((pay) => {
            this.howOften = pay;
            this.cd.detectChanges();
        });
        let k = 0;
        this.houseHoldPersons.forEach((ind, i) => {
            if(ind.expense?.alimonyExpenses && ind.expense?.alimonyExpenses.length > 0)
              ind.expense?.alimonyExpenses?.forEach((al: any, idx: number) => {
                this.alimoneyExpensesData["questionAnswers"][k] = {
                    accordionHeader:
                        ind.firstName +
                            " " +
                            ind.lastName +
                            " " +
                            Utility.getAge(ind.dateOfBirth),
                    accordionSubHeading: "",
                    accordionRightHeading: "$" + al.amountActuallyPaid,
                    accordionRightSubHeading: this.howOften.filter(
                        (c: any) => c.id === al.frequency
                    )[0].displayValue,
                    userId: ind.id || 0,
                    accordionRecord: idx,
                    accordionData: [
                        {
                            label: "How much is paid?",
                            value: "$" + al.amountActuallyPaid,
                            bold: false,
                        },
                        {
                            label: "How often?",
                            //value: al.alimonyFrequency,
                            value: this.howOften.filter(
                                (c: any) => c.id === al.frequency
                            )[0].displayValue,
                            bold: false,
                        },
                    ],
                    editButton: "Edit",
                    deleteButton: "Delete",
                };
                k++;
            });
            this.jsonData = this.alimoneyExpensesData;
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
                    const personToBeUpdated = { ...person };

                    if (
                        person.id?.toString() ===
                            this.deletedUser?.toString() &&
                        personToBeUpdated.expense?.alimonyExpenses
                    ) {

                      const storedExpense = {...person.expense};
                      const storedAlimonyExpense = storedExpense.alimonyExpenses || [];
                      personToBeUpdated.expense = {
                        ...storedExpense,
                        alimonyExpenses:storedAlimonyExpense.splice(this.recordToBeOperated, 1)
                      }
                    }

                    return personToBeUpdated;
                }
            );
        if (storedHouseholdDetails)
            this.service.updateHouseHoldDetails({
                ...storedHouseholdDetails,
                ...{ houseHoldPersons: updatedHouseholdPersons },
            });
        this.jsonData["questionAnswers"].forEach((element: any) => {
            if (element["accordionRecord"] === this.recordToBeOperated && element.userId === this.deletedUser ) {
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
                    RoutePath.APPLYNOW_ALIMONY_EXPENSES_DETAILS,
                { userId: editDetails },
            ],
            { fragment: this.recordToBeOperated?.toString() }
        );
    }
    next() {

      this.queueService.updateForwardPath();
        this.queueService.next();
    }

    addClicked() {
        this.router.navigate(
            [
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_EXPENSES +
                    "/" +
                    RoutePath.APPLYNOW_ALIMONY_EXPENSES,
            ],
            { fragment: "new" }
        );
    }

    back(): void {
      this.queueService.back();
    }
}
