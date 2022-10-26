import {
    Component,
    ChangeDetectorRef,
    OnInit,
} from "@angular/core";
import { Router } from "@angular/router";
import { RoutePath } from "../../../shared/route-strategies";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { AppStoreService } from "../../../app-store-service";
import {IChildAdultCare, IHouseHold, IHouseHoldDetails} from "../../household/household-model";
import { Utility } from "../../../shared/utilities/Utility";
import { ScreenQueueUtil } from "../expenses-gatepost/expenses-gatepost.paths";
// import { timeStamp } from 'console';

@Component({
    selector: "compass-ui-child-or-adult-care-expenses-summary",
    templateUrl: "./child-or-adult-care-expenses-summary.component.html",
    styleUrls: ["./child-or-adult-care-expenses-summary.component.scss"],
})
export class CldOradultExpSumCmp implements OnInit {
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
    demographicData: any = {
        questionText: "",
        subHeading:
            "",
        toolTip: "",
        questionAnswers: [],
        addtionalButton: "Add Child/Adult Care Expense",
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

        let k = 0;
        this.houseHoldPersons.forEach((ind, i) => {
            if (ind.expense?.childOrAdultCareExpenses && ind.expense.childOrAdultCareExpenses.length > 0)
                ind.expense.childOrAdultCareExpenses?.forEach(
                    (ac: IChildAdultCare, idx: number) => {
                        this.demographicData["questionAnswers"][k] = {
                            accordionHeader:
                                ind.firstName +
                                    " " +
                                    ind.lastName +
                                    " " +
                                    Utility.getAge(ind.dateOfBirth) +
                                    " (" +
                                    Utility.getGenderCode(
                                        ind.gender as string
                                    ) +
                                    ")" || "",
                            accordionSubHeading: "",
                            accordionRightHeading:
                                <string>"$" + ac.careExpensesAmount,
                            accordionRightSubHeading: <string>(
                                ac.careExpensesFrequency
                            ),
                            userId: ind.id || 0,
                            accordionRecord: idx,
                            accordionData: [
                                {
                                    label: `Which job does ${ind.firstName} have to pay this care expense for?`,
                                    value: ac.jobPaidFor,
                                    bold: false,
                                },
                                {
                                    label: "Who receives care?",
                                    value: this.service.extractUser(
                                        this.houseHoldPersons,
                                        ac.careReceivedBy
                                    )?.firstName,
                                    bold: false,
                                },
                                {
                                    label: "How much is spent on care expenses each month?",
                                    value: "$" + ac.careExpensesAmount,
                                    bold: false,
                                },
                                {
                                    label: "How often?",
                                    value: ac.careExpensesFrequency,
                                    bold: false,
                                },
                            ],
                            editButton: "Edit",
                            deleteButton: "Delete",
                        };
                        k++;
                    }
                );
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
                    const personToBeUpdated = { ...person };

                    if (
                        person.id?.toString() ===
                            this.deletedUser?.toString() &&
                        personToBeUpdated.expense?.childOrAdultCareExpenses
                    ) {
                      const storedExpense = {...person.expense};
                      const storeChildOrAdultExpenses = storedExpense.childOrAdultCareExpenses || [];
                      personToBeUpdated.expense = {
                        ...storedExpense,
                        childOrAdultCareExpenses:storeChildOrAdultExpenses.splice(this.recordToBeOperated, 1)
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

    editClicked(editDetails: any) {
        this.router.navigate(
            [
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_EXPENSES +
                    "/" +
                    RoutePath.APPLYNOW_CHILD_OR_ADULUT_CARE_EXPENSES_DETAILS,
                { userId: editDetails },
            ],
            { fragment: this.recordToBeOperated.toString() }
        );
    }
    next() {
      this.queueService.updateForwardPath();
        this.queueService.next();
        // if (programsSelected && programsSelected?.indexOf(Programs.BL) > -1) {
        /*this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_EXPENSES +
                "/" +
                RoutePath.APPLYNOW_TRANSPORTATION_EXPENSES
        ]);*/

        /*}
        else {
            this.router.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                    "/" +
                    RoutePath.APPLYNOW_INDIVIDUAL_GATEPOST,
            ]);
        }*/
    }

    addClicked() {
        this.router.navigate(
            [
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_EXPENSES +
                    "/" +
                    RoutePath.APPLYNOW_CHILD_OR_ADULUT_CARE_EXPENSES,
            ],
            { fragment: "new" }
        );
    }

    back(): void {
      this.queueService.back();
    }
}
