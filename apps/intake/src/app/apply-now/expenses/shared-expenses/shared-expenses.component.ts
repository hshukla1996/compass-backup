import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import {  Router, ActivatedRoute } from "@angular/router";
import { RoutePath } from "../../../shared/route-strategies";
import { AppStoreService } from "../../../app-store-service";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import {
  IHouseHold,
  IHouseHoldDetails, ILegalFeeExpenses, ISharedHouseHoldExpenses,
  PageDirection,
} from "../../household/household-model";
import { select, Store } from "@ngrx/store";
import { State as AppState } from "../../../+state";
import { UtilService } from "../../../shared/services/util.service";
import * as AppSelectors from "../../../+state/app.selectors";
import { AppPageActions } from "../../../+state/actions";
import { ScreenQueueUtil } from "./../expenses-gatepost/expenses-gatepost.paths";

import { delay, first, of, Subscription } from "rxjs";
import {INDIVIDUAL_PROGRAMS} from "../../../shared/constants/Individual_Programs_Constants";
import {FormValidatorField, RequiredOrOptionalValidatorField, Utility} from "../../../shared/utilities/Utility";
@Component({
    selector: "compass-ui-shared-expenses",
    templateUrl: "./shared-expenses.component.html",
    styleUrls: ["./shared-expenses.component.scss"],
})
export class SharedExpensesComponent implements OnInit {
    sharedExpensesDlsForm: FormGroup | any | null;
    daysData: any;
    sharedExpenses: any[] = [];
    currentUser: IHouseHold = {};
    currentUserIndex!: string;
    fragment!: string;
    taxdeductableMap!: any;
    requiredFields:string[] = []
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
    sharedExpensesMap!: any;
    constructor(
        private fb: FormBuilder,
        private route: Router,
        private cd: ChangeDetectorRef,
        private appService: AppStoreService,
        private service: ApplyNowStoreService,
        private utilService: UtilService,
        private activedRoute: ActivatedRoute,
        private appstore: Store<AppState>,
        private queueService: ScreenQueueUtil
    ) {}
    getSharedExpenses() {
        return this.appstore.pipe(select(AppSelectors.getSharedExpenses));
    }
    ngOnInit() {
        this.appstore.dispatch(AppPageActions.getSharedExpenses());
        this.sharedExpensesDlsForm = this.fb.group({
            shareExpensesWith: [""],
            whichExpenseDoYouShare: [""],
            howMuchDoYouContribute: [""],
            sharedHowOften: [""],
        });
        this.sharedExpensesDlsForm.reset();
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        if (this.houseHoldDetails.houseHoldPersons) {
            this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
        }
        this.sharedExpensesMap =
            {
                ...this.houseHoldDetails.pageAction?.sharedExpensesMap,
            } || {};
      this.activedRoute.fragment.subscribe((fragment) => {
        this.fragment = fragment || "";
        if (this.fragment !== "new") this.setFormValues(this.fragment);
      });
      this.activedRoute.params.subscribe((p) => {
        if (Object.keys(p).length == 0) {
          this.currentUserIndex =
            this.utilService.getCurrentUserIdOnNoParams(
              this.sharedExpensesMap
            );
        } else {
          this.currentUserIndex = p.userId || "";
        }
        if (this.houseHoldPersons.length > 0)
          this.currentUser =
            this.service.extractUser(
              this.houseHoldPersons,
              this.currentUserIndex
            ) || "";

        this.cd.detectChanges();
      });
         this.getSharedExpenses().subscribe((se) => {
             this.sharedExpenses = se;
             this.cd.detectChanges();
         });
        this.appService.getPay().subscribe((pay) => {
            this.daysData = pay;
            this.cd.detectChanges();
        });
this.setProgramFieldValidation();
      this.sharedExpensesDlsForm.controls['howMuchDoYouContribute'].setValidators([Utility.maxAmountValidator(9999.99)]);

    }
  setProgramFieldValidation() {
    let householdBenefits = this.service?.getBenefits() as string[];
    /*
    shareExpensesWith: [""],
            whichExpenseDoYouShare: [""],
            howMuchDoYouContribute: [""],
            sharedHowOften: [""],
     */
    const fields = [
      {
        fieldName: "shareExpensesWith",
        optionalProgram: [
          INDIVIDUAL_PROGRAMS.FS,
          INDIVIDUAL_PROGRAMS.FSR,
        ],
        requiredProgram: [

        ],
      },
      {
        fieldName: "whichExpenseDoYouShare",
        optionalProgram: [
          INDIVIDUAL_PROGRAMS.FS,
          INDIVIDUAL_PROGRAMS.FSR,
        ],
        requiredProgram: [
        ],
      },{
        fieldName: "howMuchDoYouContribute",
        optionalProgram: [
          INDIVIDUAL_PROGRAMS.FS,
          INDIVIDUAL_PROGRAMS.FSR,
        ],
        requiredProgram: [
        ],
      },
      {
        fieldName: "sharedHowOften",
        optionalProgram: [
          INDIVIDUAL_PROGRAMS.FS,
          INDIVIDUAL_PROGRAMS.FSR,
        ],
        requiredProgram: [
        ],
      },
    ] as FormValidatorField[];
    if (householdBenefits != null && householdBenefits.length > 0) {
      const requiredOrOptionalValidatorField = {
        selectedPrograms: householdBenefits,
        requiredFields: [],
        formGroup: this.sharedExpensesDlsForm,
        fields: fields,
      } as RequiredOrOptionalValidatorField;
      Utility.setOrClearValidatorForFieldWithDifferntPrograms(
        requiredOrOptionalValidatorField
      );
      this.sharedExpensesDlsForm =
        requiredOrOptionalValidatorField.formGroup;
      this.requiredFields = [
        ...requiredOrOptionalValidatorField.requiredFields,
      ] as any;
    }
  }

  setFormValues(fragment: any) {
    setTimeout(() => {
      if( this.houseHoldDetails.expenses?.sharedExpensesOutsideHousehold) {

        this.sharedExpensesDlsForm.patchValue(
        this.houseHoldDetails.expenses?.sharedExpensesOutsideHousehold[fragment]
        );
      }
      this.cd.detectChanges();
    }, 100);
  }
    get f() {
        return this.sharedExpensesDlsForm.controls;
    }
  isFieldValid(field: string): boolean {
    if (this.sharedExpensesDlsForm.get(field).status !== "VALID") {
    }
    return (
      this.sharedExpensesDlsForm.get(field).status !== "VALID" &&
      this.sharedExpensesDlsForm.get(field).touched
    );
  }

  //
  public inputValidator(event: any) {
    const pattern = /^.[0-9]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9]/g, "");
    }
    if (event.target.value == 0.00) {
      event.target.value = event.target.value.replace(event.target.value, "");
    }
    if (event.target.value > 9999.99) {
      event.target.value = event.target.value.replace(event.target.value, event.target.value.slice(0, 6));
    }
  }


  //

  errorMap(field: string) {
    if (!this.isFieldValid(field)) {
      return "";
    }

    switch (field) {
      case "howMuchDoYouContribute":

        if (
          this.sharedExpensesDlsForm.get("howMuchDoYouContribute")
            .errors.required
        ) {
          return "No amount is entered";
        }
        if (
          this.sharedExpensesDlsForm.get("howMuchDoYouContribute")
            .errors.invalidAmount
        ) {
          return "Invalid amount is entered";
        }
        break;
      case "sharedHowOften":
        if (
          this.sharedExpensesDlsForm.get("sharedHowOften").errors
            .required
        ) {
          return "No frequency is entered";
        }
        break;
      default:
        return "";
        break;
    }
    return "";
  }

    onSubmit() {
      this.service.validateAllFormFields(this.sharedExpensesDlsForm);
      const storedHouseholdDetails = this.service.getHouseHoldDetails;
      if (this.sharedExpensesDlsForm.status.toLowerCase() === "valid") {
        const storedSharedExpenses =
          storedHouseholdDetails.expenses?.sharedExpensesOutsideHousehold || [];
        let currentSharedExpenses: ISharedHouseHoldExpenses[];
        if (this.fragment === "new") {
          currentSharedExpenses = [
            ...storedSharedExpenses,
            ...[this.sharedExpensesDlsForm.value],
          ];
        } else if (storedSharedExpenses.length === 0) {
          currentSharedExpenses = [this.sharedExpensesDlsForm.value];
        } else {
          currentSharedExpenses = storedSharedExpenses.map((cs, i) => {
            if (i === parseInt(this.fragment)) {
              return this.sharedExpensesDlsForm.value;
            } else {
              return cs;
            }
          });
        }

        if (storedHouseholdDetails) {
          const updatedExpenses = {
            ...storedHouseholdDetails.expenses,
            sharedExpensesOutsideHousehold: currentSharedExpenses,
          };
          this.service.updateHouseHoldDetails({
            ...storedHouseholdDetails,
            ...{expenses: updatedExpenses},
          });
        }

        this.sharedExpensesDlsForm.reset();
        this.route.navigate([
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_EXPENSES +
            "/" +
            RoutePath.APPLYNOW_SHARED_EXPENSES_SUMMARY,
          ]);

      }
    }
    previous(): void {
        this.queueService.back();
        /*this.route.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_EXPENSES +
                "/" +
                RoutePath.APPLYNOW_EXPENSESHEATINGGATEPOST,
        ]);*/
    }
}
