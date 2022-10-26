import {
    Component,
    ChangeDetectorRef,
    OnInit,
} from "@angular/core";

import { Router } from "@angular/router";
import * as AppSelectors from "../../../+state/app.selectors";
import { select, Store } from "@ngrx/store";
import { State as AppState } from "../../../+state";
import { RoutePath } from "../../../shared/route-strategies";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { AppStoreService } from "../../../app-store-service";
import {IHouseHold, IHouseHoldDetails} from "../../household/household-model";
import { Utility } from "../../../shared/utilities/Utility";
import { ScreenQueueUtil } from "../expenses-gatepost/expenses-gatepost.paths";
import { AppPageActions } from "../../../+state/actions";
// import { timeStamp } from 'console';

@Component({
    selector: "compass-ui-medical-expenses-summary",
    templateUrl: "./medical-expenses-summary.component.html",
    styleUrls: ["./medical-expenses-summary.component.scss"],
})
export class MedicalExpSumCmp implements OnInit {
    jsonData: any;
    selectedData!: any[];
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
    medicalMap: any[] = [];
    deletedUser!: any;
    howOften: any;
    medicalExpensesopts: any[] = [];
    modalData = {
        modalTitle: "Are you sure you want to remove this record?",
        modalContent:
            "If you remove this record you will need to re-enter the data to get it back.",
        cancelButton: "Cancel",
        continueButton: "Remove",
    };
    recordToBeOperated!: number;
    medicalExpensesData: any = {
        questionText: "",
        subHeading: "",
        toolTip: "",
        questionAnswers: [
        ],
        addtionalButton: "Add Medical Expense",
    };
    constructor(
        private router: Router,
        private cd: ChangeDetectorRef,
        private service: ApplyNowStoreService,
        private appService: AppStoreService,
        private queueService: ScreenQueueUtil,
        private appstore: Store<AppState>
    ) {
        this.appstore.dispatch(AppPageActions.getMedicalExpenses());
    }
    getMedicalExpenses() {
        return this.appstore.pipe(select(AppSelectors.getMedicalExpenses));
    }
    ngOnInit(): void {
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons || [];

        this.appService.getPay().subscribe((pay) => {
            this.howOften = pay;
            this.cd.detectChanges();
        });
        this.getMedicalExpenses().subscribe((exp: any) => {
            this.medicalExpensesopts = exp;
            let k=0
            this.houseHoldPersons.forEach((ind, i) => {
                if(ind.expense?.medicalExpenses && ind.expense.medicalExpenses.length > 0) {
                  ind.expense.medicalExpenses?.forEach((me: any, idx: number) => {
                    this.medicalExpensesData.questionAnswers[k] = {
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
                        accordionRightHeading: "$" + me?.amountActuallyPaid,
                        accordionRightSubHeading: this.howOften.filter(
                            (c: any) => c.id === me?.frequency
                        )[0]?.displayValue,
                        userId: ind.id || 0,
                        accordionRecord: idx,
                        accordionData: [
                            {
                                label: "Will the medical bills continue for the next 6 months?",
                                value: me.willExpensesContinue,
                                bold: false,
                            },
                            {
                                label: "Type of Expense",
                                value: this.medicalExpensesopts.filter(
                                    (c: any) => c.id === me?.subExpenseType
                                )[0]?.displayValue,
                                bold: false,
                            },
                            {
                                label: "How much is the bill?",
                                value: "$" + me?.amountActuallyPaid,
                                bold: false,
                            },
                            {
                                label: "How often is it paid?",
                                value: this.howOften.filter(
                                    (c: any) => c.id === me?.frequency
                                )[0]?.displayValue,
                                bold: false,
                            },
                        ],
                        editButton: "Edit",
                        deleteButton: "Delete",
                    };
                    k++
                  });
                }
                this.jsonData = this.medicalExpensesData;
            });
            this.cd.detectChanges();
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
                        personToBeUpdated.expense?.medicalExpenses
                    ) {
                      const storedExpense = {...person.expense};
                      const storedMedicalExpenses = storedExpense.medicalExpenses || [];
                      personToBeUpdated.expense = {
                        ...storedExpense,
                        medicalExpenses:storedMedicalExpenses.splice(this.recordToBeOperated, 1)
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
                    RoutePath.APPLYNOW_MEDICAL_EXPENSES_DETAILS,
                { userId: editDetails },
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
                    RoutePath.APPLYNOW_MEDICAL_EXPENSES,
            ],
            { fragment: "new" }
        );
    }
    back(): void {
        this.queueService.back();
    }
}
