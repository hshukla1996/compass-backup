import {
    Component,
    ChangeDetectorRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from "@angular/core";

import { Router } from "@angular/router";

import { RoutePath } from "../../../shared/route-strategies";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { AppStoreService } from "../../../app-store-service";
import { IApplyNowState, Programs } from "../../+state/apply-now.models";
import {IHouseHold, IHouseHoldDetails} from "../../household/household-model";
import { PageDirection } from "../../../referrals/+state/referrals.models";
import { Utility } from "../../../shared/utilities/Utility";
import { ScreenQueueUtil } from "../expenses-gatepost/expenses-gatepost.paths";
// import { timeStamp } from 'console';

@Component({
    selector: "compass-ui-child-support-expenses-summary",
    templateUrl: "./child-support-expenses-summary.component.html",
    styleUrls: ["./child-support-expenses-summary.component.scss"],
})
export class ChildSupExpSumCmp implements OnInit {
    jsonData: any;
    selectedData!: any[];
    houseHoldPersons: IHouseHold[] = [];
    houseHoldDetails!: IHouseHoldDetails;
    childSupportMap: any;
    deletedUser!: any;
    daysData: any;
    modalData = {
        modalTitle: "Are you sure you want to remove this record?",
        modalContent:
            "If you remove this record you will need to re-enter the data to get it back.",
        cancelButton: "Cancel",
        continueButton: "Remove",
    };
    recordToBeOperated!: number;
    childSupportExpensesData: any = {
        questionText: "",
        subHeading: "",
        toolTip: "",
        questionAnswers: [],
        addtionalButton: "Add Child Support Expense",
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
        this.houseHoldPersons =
            this.service.getHouseHoldDetails.houseHoldPersons || [];
        this.appService.getPay().subscribe((c) => {
            this.daysData = c;
            this.cd.detectChanges();
        });
        console.log(this.houseHoldPersons);

        let k = 0;
        this.houseHoldPersons.forEach((ind, i) => {
            if (
                ind.expense?.childSupportExpenses &&
                ind.expense.childSupportExpenses?.length > 0
            )
                ind.expense.childSupportExpenses?.forEach(
                    (cs: any, idx: number) => {
                        this.childSupportExpensesData["questionAnswers"][k] = {
                            accordionHeader:
                                ind.firstName +
                                    " " +
                                    ind.lastName +
                                    " " +
                                    Utility.getAge(ind.dateOfBirth) || "",
                            accordionSubHeading: "",
                            accordionRightHeading: <string>(
                                ("$" + cs?.amountOfSupportOrder)
                            ),
                            //accordionRightSubHeading: <string>cs.frequency,
                            accordionRightSubHeading: this.daysData.filter(
                                (c: any) => c.id === cs.frequency
                            )[0].displayValue,
                            userId: ind.id || 0,
                            accordionRecord: idx,
                            accordionData: [
                                {
                                    label: `What is the ordered support payment amount?`,
                                    value: "$" + cs.amountOfSupportOrder,
                                    bold: false,
                                },
                                {
                                    label: `How much is paid?`,
                                    value: "$" + cs.amountActuallyPaid,
                                    bold: false,
                                },

                                {
                                    label: `How often?`,
                                    value: this.daysData.filter(
                                        (c: any) => c.id === cs.frequency
                                    )[0].displayValue,
                                    bold: false,
                                },
                            ],
                            editButton: "Edit",
                            deleteButton: "Delete",
                        };
                        k++;
                    }
                );
            this.jsonData = this.childSupportExpensesData;
            // console.log("jsondata,,",this.jsonData)
        });
        this.cd.detectChanges();
    }
    editClicked(userId: any) {
        this.router.navigate(
            [
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_EXPENSES +
                    "/" +
                    RoutePath.APPLYNOW_CHILD_SUPPORT_EXPENSESE_DETAILS,
                { userId },
            ],
            { fragment: this.recordToBeOperated.toString() }
        );
    }
    next() {
        this.queueService.updateForwardPath();
        this.queueService.next();
    }
    recordIndexToOp(recordIndex: number) {
        this.recordToBeOperated = recordIndex;
    }
    deleteClicked(userId: any) {
        this.deletedUser = userId;
    }
    continueClicked() {
        const storedHouseholdDetails = this.service.getHouseHoldDetails;

        const updatedHouseholdPersons =
            this.houseHoldDetails.houseHoldPersons?.map(
                (person: IHouseHold) => {
                    const personToBeUpdated = { ...person };

                    if (
                        person.id?.toString() ===
                            this.deletedUser?.toString() &&
                        personToBeUpdated.expense?.childSupportExpenses
                    ) {
                        const storedExpense = { ...person.expense };
                        const storeChildSupportExpenses =
                            storedExpense.childSupportExpenses || [];
                        personToBeUpdated.expense = {
                            ...storedExpense,
                            childSupportExpenses:
                                storeChildSupportExpenses.splice(
                                    this.recordToBeOperated,
                                    1
                                ),
                        };
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
            if (
                element["accordionRecord"] === this.recordToBeOperated &&
                element.userId === this.deletedUser
            ) {
                element["accordionHeader"] = "";
            }
        });
    }
    addClicked() {
        const storedHouseholdDetails = this.service.getHouseHoldDetails;

        const updatedPageAction = {
            ...storedHouseholdDetails.pageAction,
            childSupportMap: {},

            childSupportDirection: PageDirection.NEXT,
        };
        if (storedHouseholdDetails) {
            this.service.updateHouseHoldDetails({
                ...storedHouseholdDetails,
                ...{ pageAction: updatedPageAction },
            });
        }
        this.router.navigate(
            [
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_EXPENSES +
                    "/" +
                    RoutePath.APPLYNOW_CHILD_SUPPORT_EXPENSES,
            ],
            { fragment: "new" }
        );
    }

    back(): void {
        // this.queueService.updatePageQueueId(-1);
        //this.queueService.navigateToPath();
        this.queueService.back();
    }
}
