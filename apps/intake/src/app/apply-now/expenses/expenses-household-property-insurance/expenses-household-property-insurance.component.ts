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
import { ScreenQueueUtilforExpensesUtility } from "../expenses-utility-gatepost/expenses-utility-gatepost.path";
import { INDIVIDUAL_PROGRAMS } from "../../../shared/constants/Individual_Programs_Constants";
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from "../../../shared/utilities/Utility";

@Component({
    selector: "compass-ui-expenses-household-property-insurance",
    templateUrl: "./expenses-household-property-insurance.component.html",
    styleUrls: ["./expenses-household-property-insurance.component.scss"],
})
export class ExpensesHouseholdPropertyInsuranceComponent implements OnInit {
    propertyInsuranceForm: FormGroup | any;
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
        this.propertyInsuranceForm = this.fb.group({
            insurancePay: [""],
            oftenInsurancePay: [""],
        });
        this.houseHoldDetails = this.service.getHouseHoldDetails;

        setTimeout(() => {
            this.propertyInsuranceForm.patchValue(
                this.houseHoldDetails.expenses?.propertyInsurance
            );
        }, 500);
        this.appService.getPay().subscribe((c) => {
            this.pays = c;
            this.cd.detectChanges();
        });
        this.setProgramFieldValidation()
    }

    setProgramFieldValidation() {
        let householdBenefits = this.service?.getBenefits() as string[];
        const fields = [
            {
                fieldName: "insurancePay",
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
                fieldName: "oftenInsurancePay",
                optionalProgram: [
                    INDIVIDUAL_PROGRAMS.CA,
                    INDIVIDUAL_PROGRAMS.CAR,
                    INDIVIDUAL_PROGRAMS.FS,
                    INDIVIDUAL_PROGRAMS.FSR,
                    INDIVIDUAL_PROGRAMS.LN,
                    INDIVIDUAL_PROGRAMS.LI,
                    INDIVIDUAL_PROGRAMS.WN,
                    INDIVIDUAL_PROGRAMS.WNR,
                    INDIVIDUAL_PROGRAMS.WAR,
                    INDIVIDUAL_PROGRAMS.LIR,
                    INDIVIDUAL_PROGRAMS.LNR,
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
                formGroup: this.propertyInsuranceForm,
                fields: fields,
            } as RequiredOrOptionalValidatorField;
            Utility.setOrClearValidatorForFieldWithDifferntPrograms(
                requiredOrOptionalValidatorField
            );
            this.propertyInsuranceForm =
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
        //         RoutePath.APPLYNOW_EXPENSESHOUSEHOLDMORTGAGERENT,
        // ]);
        this.queueService.back();
    }

    submit() {
        const storeHouseholdDetails = this.service.getHouseHoldDetails;
        const updatedExpenses = {
            ...storeHouseholdDetails.expenses,
            propertyInsurance: this.propertyInsuranceForm.value,
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
        //         RoutePath.APPLYNOW_EXPENSESSUMMARY,
        // ]);
        this.queueService.next();
    }
}
