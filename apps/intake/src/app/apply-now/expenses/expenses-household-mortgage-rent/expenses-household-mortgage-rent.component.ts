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
import { IHouseHoldDetails, IHouseHold } from "../../household/household-model";
import { ScreenQueueUtilforExpensesUtility } from "../expenses-utility-gatepost/expenses-utility-gatepost.path";
import { INDIVIDUAL_PROGRAMS } from "../../../shared/constants/Individual_Programs_Constants";
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from "../../../shared/utilities/Utility";

@Component({
    selector: "compass-ui-expenses-household-mortgage-rent",
    templateUrl: "./expenses-household-mortgage-rent.component.html",
    styleUrls: ["./expenses-household-mortgage-rent.component.scss"],
})
export class ExpensesHouseholdMortgageRentComponent implements OnInit {
    householdMortgageRentForm: FormGroup | any;
    pays: any;
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
    requiredFields = [] as string[];
    fieldDisplays: any = {};
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private appService: AppStoreService,
        private cd: ChangeDetectorRef,
        private service: ApplyNowStoreService,
        private queueService: ScreenQueueUtilforExpensesUtility
    ) {}

    ngOnInit(): void {
        this.householdMortgageRentForm = this.fb.group({
            mortgageRent: [""],
            oftenMortgageRent: [""],
            condoFee: [""],
            oftenCondoFee: [""],
            mobileRent: [""],
            oftenMobileRent: [""],
        });

        this.appService.getPay().subscribe((c) => {
            this.pays = c;
            this.cd.detectChanges();
        });
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        setTimeout(() => {
            this.householdMortgageRentForm.patchValue(
                this.houseHoldDetails.expenses?.rentOrMortgageInformation
            );
        }, 500);
       this.setProgramFieldValidation() 
    }

    setProgramFieldValidation() {
        let householdBenefits = this.service?.getBenefits() || [];
            console.log("householdBenefits");
            console.log(householdBenefits);
        const fields = [
            {
                fieldName: "mortgageRent",
                optionalProgram: [
                    INDIVIDUAL_PROGRAMS.LN,
                    INDIVIDUAL_PROGRAMS.LI,
                    INDIVIDUAL_PROGRAMS.FS,
                    INDIVIDUAL_PROGRAMS.ES,
                    INDIVIDUAL_PROGRAMS.ESR,
                    INDIVIDUAL_PROGRAMS.FSR,
                    INDIVIDUAL_PROGRAMS.WN,
                ],
                requiredProgram: [],
            },
            {
                fieldName: "oftenMortgageRent",
                optionalProgram: [
                    INDIVIDUAL_PROGRAMS.LN,
                    INDIVIDUAL_PROGRAMS.LI,
                    INDIVIDUAL_PROGRAMS.FS,
                    INDIVIDUAL_PROGRAMS.ES,
                    INDIVIDUAL_PROGRAMS.ESR,
                    INDIVIDUAL_PROGRAMS.FSR,
                    INDIVIDUAL_PROGRAMS.WN,
                ],
                requiredProgram: [],
            },
            {
                fieldName: "condoFee",
                optionalProgram: [
                    INDIVIDUAL_PROGRAMS.LN,
                    INDIVIDUAL_PROGRAMS.LI,
                    INDIVIDUAL_PROGRAMS.FS,
                    INDIVIDUAL_PROGRAMS.ES,
                    INDIVIDUAL_PROGRAMS.ESR,
                    INDIVIDUAL_PROGRAMS.FSR,
                    INDIVIDUAL_PROGRAMS.WN,
                ],
                requiredProgram: [],
            },
            {
                fieldName: "oftenCondoFee",
                optionalProgram: [
                    INDIVIDUAL_PROGRAMS.LN,
                    INDIVIDUAL_PROGRAMS.LI,
                    INDIVIDUAL_PROGRAMS.FS,
                    INDIVIDUAL_PROGRAMS.ES,
                    INDIVIDUAL_PROGRAMS.ESR,
                    INDIVIDUAL_PROGRAMS.FSR,
                    INDIVIDUAL_PROGRAMS.WN,
                ],
                requiredProgram: [],
            },
            {
                fieldName: "mobileRent",
                optionalProgram: [
                    INDIVIDUAL_PROGRAMS.LN,
                    INDIVIDUAL_PROGRAMS.LI,
                    INDIVIDUAL_PROGRAMS.FS,
                    INDIVIDUAL_PROGRAMS.ES,
                    INDIVIDUAL_PROGRAMS.ESR,
                    INDIVIDUAL_PROGRAMS.FSR,
                    INDIVIDUAL_PROGRAMS.WN,
                ],
                requiredProgram: [],
            },
            {
                fieldName: "oftenMobileRent",
                optionalProgram: [
                    INDIVIDUAL_PROGRAMS.LN,
                    INDIVIDUAL_PROGRAMS.LI,
                    INDIVIDUAL_PROGRAMS.FS,
                    INDIVIDUAL_PROGRAMS.ES,
                    INDIVIDUAL_PROGRAMS.ESR,
                    INDIVIDUAL_PROGRAMS.FSR,
                    INDIVIDUAL_PROGRAMS.WN,
                ],
                requiredProgram: [],
            },
        ] as FormValidatorField[];
        this.fieldDisplays = {};
        fields.forEach((fieldObj: FormValidatorField) => {
            this.fieldDisplays[fieldObj.fieldName] =
                this.service.areProgramsExist(householdBenefits, [
                    ...fieldObj.optionalProgram,
                    ...fieldObj.requiredProgram,
                ]);
        });
        if (householdBenefits != null && householdBenefits.length > 0) {
            const requiredOrOptionalValidatorField = {
                selectedPrograms: householdBenefits,
                requiredFields: [],
                formGroup: this.householdMortgageRentForm,
                fields: fields,
            } as RequiredOrOptionalValidatorField;
            Utility.setOrClearValidatorForFieldWithDifferntPrograms(
                requiredOrOptionalValidatorField
            );
            this.householdMortgageRentForm =
                requiredOrOptionalValidatorField.formGroup;
            this.requiredFields = [
                ...requiredOrOptionalValidatorField.requiredFields,
            ] as any;
        }
    }

    previous() {
        // this.router.navigate([
        //     RoutePath.APPLYNOW +
        //         "/" +
        //         RoutePath.APPLYNOW_EXPENSES +
        //         "/" +
        //         RoutePath.APPLYNOW_EXPENSESUTILITYGATEPOST,
        // ]);
        this.queueService.back();
    }

    submit() {
        const storeHouseholdDetails = this.service.getHouseHoldDetails;
        const updatedExpenses = {
            ...storeHouseholdDetails.expenses,
            rentOrMortgageInformation: this.householdMortgageRentForm.value,
        };
        if (storeHouseholdDetails) {
            this.service.updateHouseHoldDetails({
                ...storeHouseholdDetails,
                ...{ expenses: updatedExpenses },
            });
        }

        // this.router.navigate([
        //     RoutePath.APPLYNOW +
        //         "/" +
        //         RoutePath.APPLYNOW_EXPENSES +
        //         "/" +
        //         RoutePath.APPLYNOW_EXPENSESHOUSEHOLDPROPERTYINSURANCE,
        // ]);
        this.queueService.next();
    }
}
