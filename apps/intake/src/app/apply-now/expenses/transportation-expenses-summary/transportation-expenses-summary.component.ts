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
    selector: "compass-ui-transportation-expenses-summary",
    templateUrl: "./transportation-expenses-summary.component.html",
    styleUrls: ["./transportation-expenses-summary.component.scss"],
})
export class TransportationExpSumCmp implements OnInit {
    jsonData: any;
    selectedData!: any[];
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
    alimonyMap: any[] = [];
    deletedUser!: any;
    modalData = {
        modalTitle: "Are you sure you want to remove this record?",
        modalContent:
            "If you remove this record you will need to re-enter the data to get it back.",
        cancelButton: "Cancel",
        continueButton: "Remove",
    };
    recordToBeOperated!: number;
    transportationExpensesData: any = {
        questionText: "Your work transportation expenses.",
        subHeading:
            "Look below to make sure all transportation expenses are here.",
        toolTip: "",
        questionAnswers: [

        ],
        addtionalButton: "Add Transportation Expense",
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
       let k = 0
        this.houseHoldPersons.forEach((ind, i) => {
            if(ind.expense?.transportExpenses && ind.expense.transportExpenses.length > 0)
            ind.expense.transportExpenses?.forEach((te: any, idx: number) => {
                console.log(te);
                this.transportationExpensesData["questionAnswers"][k] = {
                    accordionHeader:
                        ind.firstName +
                        " " +
                        ind.lastName +
                        " " +
                        Utility.getAge(ind.dateOfBirth),
                    accordionSubHeading: te.employer,
                    accordionRightHeading: "$" + te?.montlyCarPayment,
                    accordionRightSubHeading: "",
                    userId: ind.id || 0,
                    accordionRecord: idx,
                    accordionData: [
                        {
                            label: "Which employer is the transportation for?",
                            value: te?.employer,
                            bold: false,
                        },
                        {
                            label: "What type of other income is this?",
                            value: te?.otherIncomeType,
                            bold: false,
                        },
                        {
                            label: "How much does it cost each week?",
                            value: "$" + te?.costPerWeek,
                            bold: false,
                        },
                        {
                            label: "How many miles are driven to and from this job each week?",
                            value: te?.milesDrivenForJob,
                            bold: false,
                        },
                        {
                            label: `If ${ind.firstName} owns or leases a car, what is their monthly car payment?`,
                            value: "$" + te?.montlyCarPayment,
                            bold: false,
                        },
                    ],
                    editButton: "Edit",
                    deleteButton: "Delete",
                };
                k++;
            });

            this.jsonData = this.transportationExpensesData;
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
                    console.log("personToBeUpdated")
                    console.log(personToBeUpdated)
                    if (
                        person.id?.toString() ===
                            this.deletedUser?.toString() &&
                        personToBeUpdated.expense?.transportExpenses
                    ) {
                      const storedExpense = {...person.expense};
                      const storedTransportationExpenses = storedExpense.transportExpenses || [];
                      personToBeUpdated.expense = {
                        ...storedExpense,
                        transportExpenses:storedTransportationExpenses.filter((transObj,i)=>this.recordToBeOperated !== i)
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
            if (element["accordionRecord"] === this.recordToBeOperated && element.userId === this.deletedUser) {
                element["accordionHeader"] = "";
            }
        });
    }

    editClicked(userId: any) {
        this.router.navigate(
            [
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_EXPENSES +
                    "/" +
                    RoutePath.APPLYNOW_TRANSPORTATION_EXPENSES_DETAILS,
                { userId: userId },
            ],
            { fragment: this.recordToBeOperated.toString() }
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
                    RoutePath.APPLYNOW_TRANSPORTATION_EXPENSES,
            ],
            { fragment: "new" }
        );
    }
    back(): void {
      this.queueService.back();
    }
}
