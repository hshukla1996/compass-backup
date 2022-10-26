import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import {
    FormGroup,
    FormControl,
    ReactiveFormsModule,
    FormBuilder,
    Validators,
    AbstractControl,
    FormArray,
} from "@angular/forms";
import { NavigationEnd, Router } from "@angular/router";
import { RoutePath } from "../../../shared/route-strategies";
import { AppStoreService } from "../../../app-store-service";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { IHouseHold, IHouseHoldDetails } from "../../household/household-model";
import {

    PageDirection,
} from "../../household/household-model";
import { INDIVIDUAL_PROGRAMS } from "../../../shared/constants/Individual_Programs_Constants";
import { Utility } from "../../../shared/utilities/Utility";

@Component({
    selector: "compass-ui-expenses-mailing-address",
    templateUrl: "./expenses-mailing-address.component.html",
    styleUrls: ["./expenses-mailing-address.component.scss"],
})
export class ExpensesMailingAddressComponent implements OnInit {
    mailingAddressForm: FormGroup | any;
    states: any;
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private appService: AppStoreService,
        private service: ApplyNowStoreService,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.mailingAddressForm = this.fb.group({
            addressLine1: [""],
            addressline2: [""],
            city: [""],
            state: [""],
            zip: [""],
        });
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        //this.applyNowState = { ...this.houseHoldDetails };
        this.houseHoldPersons = this.houseHoldDetails
            .houseHoldPersons as IHouseHold[];
        this.appService.getStates().subscribe((states) => {
            this.states = states;
            this.cd.detectChanges();
        });
        setTimeout(() => {
            this.mailingAddressForm.patchValue(
                this.houseHoldDetails.expenses?.utilityFuelProviderAddress
            );
        }, 500);
        this.mailingAddressForm.controls["zip"].setValidators([
            Utility.zipCodeValidator(),
        ]);
    }

    previous() {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_EXPENSES +
                "/" +
                RoutePath.APPLYNOW_EXPENSESHEATINGGATEPOST,
        ]);
    }
    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return "";
        }

        switch (field) {
  
           
            case "Zip":
                if (this.mailingAddressForm.get("Zip").errors.required) {
                    return "No zip code is entered";
                }
                break;


            default:
                return "";
                break;
        }
        return "";
    }

    isFieldValid(field: string): boolean {
        const formField = this.mailingAddressForm.get(field);
        return (
            formField &&
            this.mailingAddressForm.get(field).status !== "VALID" &&
            this.mailingAddressForm.get(field).touched
        );
    }
    submit() {
        this.service.validateAllFormFields(this.mailingAddressForm);
        if (this.mailingAddressForm.status.toLowerCase() !== "valid") {
            return;
        }
        const updatedExpenses = {
            ...this.houseHoldDetails.expenses,
            utilityFuelProviderAddress: this.mailingAddressForm.value,
        };
        if (this.houseHoldDetails) {
            this.service.updateHouseHoldDetails({
                ...this.houseHoldDetails,
                ...{ expenses: updatedExpenses },
            });
        }
        // this.router.navigate([
        //     RoutePath.APPLYNOW +
        //         "/" +
        //         RoutePath.APPLYNOW_EXPENSES +
        //         "/" +
        //         RoutePath.APPLYNOW_EXPENSESWATERASSISTANCEAPPLICATION,
        // ]);

        const benefits = this.service.getBenefits();
        const isProgramExistforWater = this.service.isProgramExist(
            benefits as string[],
            INDIVIDUAL_PROGRAMS.LW
        );

        if (isProgramExistforWater) {
            this.router.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_EXPENSES +
                    "/" +
                    RoutePath.APPLYNOW_EXPENSESWATERASSISTANCEAPPLICATION,
            ]);
        } else {
            this.router.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_EXPENSES +
                    "/" +
                    RoutePath.APPLYNOW_EXPENSES_GATEPOST,
            ]);
        }
    }
}
