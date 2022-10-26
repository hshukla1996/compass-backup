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
import {IHouseHold, IHouseHoldDetails, ISharedHouseHoldExpenses} from "../../household/household-model";
import { PageDirection } from "../../../referrals/+state/referrals.models";
import { Utility } from "../../../shared/utilities/Utility";
import { ScreenQueueUtil } from "./../expenses-gatepost/expenses-gatepost.paths";

// import { timeStamp } from 'console';
@Component({
    selector: "compass-ui-shared-expense-summary",
    templateUrl: "./shared-expense-summary.component.html",
    styleUrls: ["./shared-expense-summary.component.scss"],
})
export class SharedExpenseSummaryComponent implements OnInit {
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
    demographicData:any = {
        questionText: "",
        subHeading: "",
        toolTip: "",
        questionAnswers: [

        ],
        addtionalButton: "Add Shared Expense",
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

      this.houseHoldDetails.expenses?.sharedExpensesOutsideHousehold?.forEach((ind, i) => {
            this.demographicData["questionAnswers"][i] = {
                accordionHeader:
                    ind.shareExpensesWith || "",
                accordionSubHeading: ind.whichExpenseDoYouShare || "",
                accordionRightHeading: ind.howMuchDoYouContribute || "",
                accordionRightSubHeading: ind.sharedHowOften || "",
                userId:  this.houseHoldPersons[0].id || 0,
                accordionRecord: i,
                accordionData: [

                ],
                editButton: "Edit",
                deleteButton: "Delete",
            };

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

        const updatedSharedExpenses =
            this.houseHoldDetails.expenses?.sharedExpensesOutsideHousehold?.filter(
                (sharedDetails: ISharedHouseHoldExpenses,i) => {

                    return (
                       i !== this.recordToBeOperated
                    )
                }
            );
          if (storedHouseholdDetails) {
            const updatedExpenses = {
              ...storedHouseholdDetails.expenses,
              sharedExpensesOutsideHousehold: updatedSharedExpenses,
            };
            this.service.updateHouseHoldDetails({
              ...storedHouseholdDetails,
              ...{expenses: updatedExpenses},
            });
          }
        this.jsonData["questionAnswers"].forEach((element: any) => {
            if (element["accordionRecord"] === this.recordToBeOperated) {
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
                    RoutePath.APPLYNOW_SHARED_EXPENSES_DETAILS,
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
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_EXPENSES +
                "/" +
                RoutePath.APPLYNOW_SHARED_EXPENSES_DETAILS,
        ],
      { fragment: 'new' });
    }
    back(): void {
      this.queueService.back();
    }
}
