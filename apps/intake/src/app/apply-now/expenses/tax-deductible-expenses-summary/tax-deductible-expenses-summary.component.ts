import {
    Component,
    ChangeDetectorRef,
    OnInit,
} from "@angular/core";

import { Router } from "@angular/router";

import { RoutePath } from "../../../shared/route-strategies";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { AppStoreService } from "../../../app-store-service";
import {IHouseHold, IHouseHoldDetails} from "../../household/household-model";
import { Utility } from "../../../shared/utilities/Utility";
import { ScreenQueueUtil } from "../expenses-gatepost/expenses-gatepost.paths";
// import { timeStamp } from 'console';
import { select, Store } from "@ngrx/store";
import { State as AppState } from "../../../+state";
import * as AppSelectors from "../../../+state/app.selectors";
import { AppPageActions } from "../../../+state/actions";
import {CurrencyPipe, formatCurrency} from "@angular/common";
@Component({
    selector: "compass-ui-tax-deductible-expenses-summary",
    templateUrl: "./tax-deductible-expenses-summary.component.html",
    styleUrls: ["./tax-deductible-expenses-summary.component.scss"],
})
export class TaxDeductibleSumCmp implements OnInit {
    jsonData: any;
    selectedData!: any[];
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
    taxdeductableMap: any[] = [];
    deletedUser!: any;
    howOften: any[] = [];
    deducatables: any[] = [];
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
        questionAnswers: [

        ],
        addtionalButton: "Add Tax Deductible Expense",
    };
    constructor(
        private router: Router,
        private cd: ChangeDetectorRef,
        private service: ApplyNowStoreService,
        private appService: AppStoreService,
        private queueService: ScreenQueueUtil,
        private appstore: Store<AppState>,
        private currencyPipe:CurrencyPipe
    ) {}
    getDeductableSources() {
        return this.appstore.pipe(select(AppSelectors.getDeductableSources));
    }
    ngOnInit(): void {
        this.appstore.dispatch(AppPageActions.getDeductableSources());

        this.houseHoldDetails = this.service.getHouseHoldDetails;
        this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons || [];
        this.appService.getPay().subscribe((pay) => {
            this.howOften = pay;
            this.cd.detectChanges();
        });

        this.getDeductableSources().subscribe((exp: any) => {
            this.deducatables = exp;
            this.cd.detectChanges();
          if(this.deducatables.length > 0){
            this.showTaxDeductables();
          }
        });


    }
    showTaxDeductables(){
      let k=0;
      this.houseHoldPersons.forEach((ind, i) => {
        if(ind.expense?.taxDeductableExpenses && ind.expense.taxDeductableExpenses.length > 0)
          ind.expense.taxDeductableExpenses?.forEach((te: any, idx: number) => {
            this.demographicData["questionAnswers"][k] = {
              accordionHeader:
                ind.firstName +
                " " +
                ind.lastName +
                " " +
                Utility.getAge(ind.dateOfBirth),
              accordionSubHeading: "",
              accordionRightHeading: "$" + te?.whatIsTheAmount,
              accordionRightSubHeading: this.howOften.filter(
                (c: any) => c.id === te?.taxHowOftenIsPaid
              )[0]?.displayValue,
              userId: ind.id || 0,
              accordionRecord: idx,
              accordionData: [
                // {
                //     label: `What is ${ind.firstName}'s tax-deductible expense?`,
                //     value: te?.whatIsTheAmount,
                //     bold: false,
                // },
                {
                  label: "What is the source or type of deductible expense?",
                  //value: te?.soruceOfDeductibleExpenses,
                  value: this.deducatables.filter(
                    (c: any) =>
                      c.id === te?.soruceOfDeductibleExpenses
                  )[0]?.displayValue,
                  bold: false,
                },
                {
                  label: "What is the amount?",
                  value: this.currencyPipe.transform(te?.whatIsTheAmount),
                  bold: false,
                },
                {
                  label: "How often is it paid?",
                  value: this.howOften.filter(
                    (c: any) => c.id === te?.taxHowOftenIsPaid
                  )[0]?.displayValue,
                  bold: false,
                },
              ],
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
                    const personToBeUpdated = { ...person };
                  const storedExpense = person.expense;
                  const storedTaxDeductableExpenses = storedExpense?.taxDeductableExpenses || [];
                    if (
                        person.id?.toString() ===
                            this.deletedUser?.toString() &&
                        personToBeUpdated.expense?.taxDeductableExpenses
                    ) {

                      personToBeUpdated.expense = {
                        ...storedExpense,
                        taxDeductableExpenses :storedTaxDeductableExpenses.splice(this.recordToBeOperated, 1)
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
                    RoutePath.APPLYNOW_TAX_DEDUCTIBLE_EXPENSES_DETAILS,
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
                    RoutePath.APPLYNOW_TAX_DEDUCTIBLE_EXPENSES,
            ],
            { fragment: "new" }
        );
    }

    back(): void {
      this.queueService.back();
    }
}
