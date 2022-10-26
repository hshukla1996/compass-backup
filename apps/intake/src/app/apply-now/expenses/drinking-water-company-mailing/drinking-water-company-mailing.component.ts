import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { IApplyNowState } from '../../+state/apply-now.models';
import { AppStoreService } from '../../../app-store-service';
import { ApplyNowExpensesDrinkWaterCompMailStrategy } from '../../../shared/route-strategies/apply-now/expenses-drinking-water-company';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { delay, first, of, Subscription } from "rxjs";
import { RoutePath } from '../../../shared/route-strategies';
import { Utility } from '../../../shared/utilities/Utility';

@Component({
  selector: 'compass-ui-drinking-water-company-mailing',
  templateUrl: './drinking-water-company-mailing.component.html',
  styleUrls: ['./drinking-water-company-mailing.component.scss'],
  providers: [ApplyNowExpensesDrinkWaterCompMailStrategy],
})
export class DrinkingWaterCompanyMailingComponent implements OnInit {
  drinkingWaterCompMailForm: FormGroup | any;
  states: any;
  applyNowState!: IApplyNowState;
  detail: any;
  constructor(
    private expensesdrinkwaterComp: FormBuilder,
    private router: Router,
    private routingStrategy: ApplyNowExpensesDrinkWaterCompMailStrategy,
    private appService: AppStoreService,
    private cd: ChangeDetectorRef,
    private service: ApplyNowStoreService
  ) { }

  ngOnInit(): void {
    this.drinkingWaterCompMailForm = this.expensesdrinkwaterComp.group({
      addressLine1: " ",
      addressLine2: " ",
      city: " ",
      state: " ",
      zip: " ",
    });
    this.appService.getStates().subscribe((states) => {
      this.states = states;
      this.cd.detectChanges();
    });
    this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d }
      this.detail = this.applyNowState.houseHoldDetails.expenses?.drinkingWaterCompanyMailing;

      of(true)
        .pipe(delay(10))
        .subscribe(() => {
          this.drinkingWaterCompMailForm.patchValue({

            addressLine1: this.detail?.addressLine1,
            addressLine2: this.detail?.addressLine2,
            city: this.detail?.city,
            state: this.detail?.state,
            zip: this.detail?.zip,
          })
        })

    })
    this.drinkingWaterCompMailForm.controls["zip"].setValidators([
        Utility.zipCodeValidator(),
    ]);
  }

  OnlyNumberAllowed(event: { which: any; keyCode: any }): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  errorMap(field: string) {
    if (!this.isFieldValid(field)) {
      return "";
    }

    switch (field) {
      // case "AddressLine1":
      //   if (
      //     this.drinkingWaterCompMailForm.get("AddressLine1").errors
      //       .required
      //   ) {
      //     return "No residential street address is entered";
      //   }
      //   break;
      case "City":
        if (this.drinkingWaterCompMailForm.get("City").errors.required) {
          return "No city is entered";
        }
        break;
      case "State":
        if (this.drinkingWaterCompMailForm.get("State").errors.required) {
          return "No state is selected from the dropdown";
        }
        break;
      case "Zip":
        if (this.drinkingWaterCompMailForm.get("Zip").errors.required) {
          return "No zip code is entered";
        }
        break;


      case "anotherAddress":
        if (
          this.drinkingWaterCompMailForm.get("anotherAddress").errors
            .required
        ) {
          return "No residential street address is entered";
        }
        break;


      default:
        return "";
        break;
    }
    return "";
  }

  isFieldValid(field: string): boolean {
    const formField = this.drinkingWaterCompMailForm.get(field);
    return (
      formField &&
      this.drinkingWaterCompMailForm.get(field).status !== "VALID" &&
      this.drinkingWaterCompMailForm.get(field).touched
    );
  }

  goBack() {
    this.router.navigate([this.routingStrategy.previousRoute()]);
  }
  goNext() {
    this.service.validateAllFormFields(this.drinkingWaterCompMailForm);
    if (this.drinkingWaterCompMailForm.status.toLowerCase() !== "valid") {
        return;
    }
    const storeHouseholdDetails = this.applyNowState?.houseHoldDetails;
    const storedHouseHold =
      this.applyNowState?.houseHoldDetails.expenses;
    const updatedHousehold = {
      ...storedHouseHold,
      drinkingWaterCompanyMailing: this.drinkingWaterCompMailForm.value
    };

    this.service.updateHouseHoldDetails({
      ...storeHouseholdDetails,
      expenses: updatedHousehold,
    });

    // this.router.navigate([this.routingStrategy.nextRoute()]);
    if (this.applyNowState?.houseHoldDetails?.householdWaterQuestions.payingForDrinkingWater === "both"
    ) {
      this.router.navigate([this.routingStrategy.nextRoute()]);
    } else {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_EXPENSES + '/' + RoutePath.APPLYNOW_EXPENSESWATERGATEPOST]);
    }
  }


}
