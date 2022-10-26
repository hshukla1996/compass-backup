import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { IApplyNowState } from '../../+state/apply-now.models';
import { AppStoreService } from '../../../app-store-service';
import { ApplyNowExpensesWasteWaterProviderStrategy } from '../../../shared/route-strategies/apply-now/expenses-wastewater-provider';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { delay, first, of, Subscription } from "rxjs";
import { RoutePath } from '../../../shared/route-strategies';
import { Utility } from '../../../shared/utilities/Utility';

@Component({
  selector: 'compass-ui-wastewater-provider',
  templateUrl: './wastewater-provider.component.html',
  styleUrls: ['./wastewater-provider.component.scss'],
  providers: [ApplyNowExpensesWasteWaterProviderStrategy]
})
export class WastewaterProviderComponent implements OnInit {
  wasteWaterProviderForm: FormGroup | any;
  states: any;
  applyNowState!: IApplyNowState;
  detail: any;

  constructor(private fb: FormBuilder,
    private router: Router,
    private routingStrategy: ApplyNowExpensesWasteWaterProviderStrategy,
    private appService: AppStoreService,
    private cd: ChangeDetectorRef,
    private service: ApplyNowStoreService) { }

  ngOnInit(): void {
    this.wasteWaterProviderForm = this.fb.group({
      wasteWaterSameAsDrinkingWaterProvider: "",
      addressLine1: "",
      addressline2: "",
      city: "",
      state: "",
      zip: "",

    })
    this.appService.getStates().subscribe((states) => {
      this.states = states;
      this.cd.detectChanges();
    });
    this.service.getAppData().subscribe((d) => {
      this.applyNowState = { ...d };
      this.detail = this.applyNowState.houseHoldDetails.expenses?.wasteWaterProvider;
     
      let wastewaterPrviderValue = ""
      if (this.detail?.wasteWaterSameAsDrinkingWaterProvider === "Y") {
        wastewaterPrviderValue = "Yes"

      } else if (this.detail?.wasteWaterSameAsDrinkingWaterProvider === "N") {
        wastewaterPrviderValue = "No"
      }
      of(true)
        .pipe(delay(10))
        .subscribe(() => {
          this.wasteWaterProviderForm.patchValue({

            wasteWaterSameAsDrinkingWaterProvider: wastewaterPrviderValue,
            addressLine1: this.detail?.addressLine1,
            addressline2: this.detail?.addressline2,
            city: this.detail?.city,
            state: this.detail?.state,
            zip: this.detail?.zip,

          })

        })
    }
    )
    this.wasteWaterProviderForm.controls["zip"].setValidators([
        Utility.zipCodeValidator(),
    ]);
  }

  resetForm() {
    if (this.wasteWaterProviderForm.get("wasteWaterSameAsDrinkingWaterProvider").value === "Yes") {
      this.wasteWaterProviderForm.reset();
    }
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
      //     this.wasteWaterProviderForm.get("AddressLine1").errors
      //       .required
      //   ) {
      //     return "No residential street address is entered";
      //   }
      //   break;
      case "City":
        if (this.wasteWaterProviderForm.get("City").errors.required) {
          return "No city is entered";
        }
        break;
      case "State":
        if (this.wasteWaterProviderForm.get("State").errors.required) {
          return "No state is selected from the dropdown";
        }
        break;
      case "Zip":
        if (this.wasteWaterProviderForm.get("Zip").errors.required) {
          return "No zip code is entered";
        }
        break;


      case "anotherAddress":
        if (
          this.wasteWaterProviderForm.get("anotherAddress").errors
            .required
        ) {
          return "No residential street address is entered";
        }
        break;
      default:
        return "";
    }
    return "";
  }

  isFieldValid(field: string): boolean {
    const formField = this.wasteWaterProviderForm.get(field);
    return (
      formField &&
      this.wasteWaterProviderForm.get(field).status !== "VALID" &&
      this.wasteWaterProviderForm.get(field).touched
    );
  }
  goBack() {
    // this.router.navigate([this.routingStrategy.previousRoute()]);
    if (this.applyNowState?.houseHoldDetails?.householdWaterQuestions.payingForDrinkingWater === "both"
    ) {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_EXPENSES + '/' + RoutePath.APPLYNOW_EXPENSESDRINKINGWATERCOMPANYMAILING]);

    } else {
      this.router.navigate([this.routingStrategy.previousRoute()]);
    }
  }
  goNext() {
    this.service.validateAllFormFields(this.wasteWaterProviderForm);
    if (this.wasteWaterProviderForm.status.toLowerCase() !== "valid") {
        return;
    }

    const wasteWaterProvider = this.applyNowState.houseHoldDetails;
    const storewasteWaterProvider = this.applyNowState.houseHoldDetails.expenses;
    const updateForm = {
      wasteWaterSameAsDrinkingWaterProvider: this.wasteWaterProviderForm.controls["wasteWaterSameAsDrinkingWaterProvider"].value.charAt(0),
      addressLine1: this.wasteWaterProviderForm.controls["addressLine1"].value,
      addressline2: this.wasteWaterProviderForm.controls["addressline2"].value,
      city: this.wasteWaterProviderForm.controls["city"].value,
      state: this.wasteWaterProviderForm.controls["state"].value,
      zip: this.wasteWaterProviderForm.controls["zip"].value,
    }
    const updatedHousehold = {
      ...storewasteWaterProvider,
      wasteWaterProvider: updateForm
    };

    this.service.updateHouseHoldDetails({
      ...wasteWaterProvider,
      expenses: updatedHousehold,
    });

    // this.router.navigate([this.routingStrategy.nextRoute()]);
    if (this.applyNowState?.houseHoldDetails?.householdWaterQuestions.payingForDrinkingWater === "WasteWater"
    ) {
      this.router.navigate([this.routingStrategy.nextRoute()]);
    } else {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_EXPENSES + '/' + RoutePath.APPLYNOW_EXPENSESWATERGATEPOST]);
    }
  }


}
