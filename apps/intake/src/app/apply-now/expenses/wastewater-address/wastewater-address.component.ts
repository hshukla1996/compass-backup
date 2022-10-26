import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { IApplyNowState } from '../../+state/apply-now.models';
import { AppStoreService } from '../../../app-store-service';
import { ApplyNowExpensesWasteWaterAddressStrategy } from '../../../shared/route-strategies/apply-now/expenses-wastewater-address';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { delay, first, of, Subscription } from "rxjs";
import { RoutePath } from '../../../shared/route-strategies';
import { Utility } from '../../../shared/utilities/Utility';

@Component({
  selector: 'compass-ui-wastewater-address',
  templateUrl: './wastewater-address.component.html',
  styleUrls: ['./wastewater-address.component.scss'],
  providers: [ApplyNowExpensesWasteWaterAddressStrategy]
})
export class WastewaterAddressComponent implements OnInit {

  wasteWaterAddressForm: FormGroup | any;
  states: any;
  applyNowState!: IApplyNowState;
  detail: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private routingStrategy: ApplyNowExpensesWasteWaterAddressStrategy,
    private appService: AppStoreService,
    private cd: ChangeDetectorRef,
    private service: ApplyNowStoreService
  ) { }
  ngOnInit(): void {
    this.wasteWaterAddressForm = this.fb.group({
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
      this.detail = this.applyNowState.houseHoldDetails.expenses?.wasteWaterAddress;

      of(true)
        .pipe(delay(10))
        .subscribe(() => {
          this.wasteWaterAddressForm.patchValue({
            addressLine1: this.detail?.addressLine1,
            addressLine2: this.detail?.addressLine2,
            city: this.detail?.city,
            state: this.detail?.state,
            zip: this.detail?.zip,
          })
        })
    })
        this.wasteWaterAddressForm.controls["zip"].setValidators([
            Utility.zipCodeValidator(),
        ]);
  }

  errorMap(field: string) {
    if (!this.isFieldValid(field)) {
      return "";
    }

    switch (field) {
      case "AddressLine1":
        if (
          this.wasteWaterAddressForm.get("AddressLine1").errors
            .required
        ) {
          return "No residential street address is entered";
        }
        break;
      case "City":
        if (this.wasteWaterAddressForm.get("City").errors.required) {
          return "No city is entered";
        }
        break;
      case "State":
        if (this.wasteWaterAddressForm.get("State").errors.required) {
          return "No state is selected from the dropdown";
        }
        break;
      case "Zip":
        if (this.wasteWaterAddressForm.get("Zip").errors.required) {
          return "No zip code is entered";
        }
        break;
     
        
      case "anotherAddress":
        if (
          this.wasteWaterAddressForm.get("anotherAddress").errors
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
    const formField = this.wasteWaterAddressForm.get(field);
    return (
      formField &&
      this.wasteWaterAddressForm.get(field).status !== "VALID" &&
      this.wasteWaterAddressForm.get(field).touched
    );
  }

  OnlyNumberAllowed(event: { which: any; keyCode: any }): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  goBack() {
    // this.router.navigate([this.routingStrategy.previousRoute()]);
    if (this.applyNowState?.houseHoldDetails?.householdWaterQuestions.payingForDrinkingWater === "WasteWater" 
    ) {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_EXPENSES + '/' + RoutePath.APPLYNOW_EXPENSESWATERASSISTANCEAPPLICATION]);

    } else {
      this.router.navigate([this.routingStrategy.previousRoute()]);
      }
  }
  goNext() {
    this.service.validateAllFormFields(this.wasteWaterAddressForm);
    if (this.wasteWaterAddressForm.status.toLowerCase() !== "valid") {
        return;
    }
    const storeHouseholdDetails = this.applyNowState?.houseHoldDetails;
    const storedHouseHold =
      this.applyNowState?.houseHoldDetails.expenses;
    const updatedHousehold = {
      ...storedHouseHold,
      wasteWaterAddress: this.wasteWaterAddressForm.value
    };

    this.service.updateHouseHoldDetails({
      ...storeHouseholdDetails,
      expenses: updatedHousehold,
    });
    this.router.navigate([this.routingStrategy.nextRoute()]);
    // if (this.applyNowState?.houseHoldDetails?.householdWaterQuestions.payingForDrinkingWater === "both"
    // ) {
    //   this.router.navigate([this.routingStrategy.nextRoute()]);
    // } else {
    //   this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_EXPENSES + '/' + RoutePath.APPLYNOW_EXPENSESWASTEWATERADDRESS]);
    // }
  }


}
