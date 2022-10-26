import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AppStoreService } from '../../../app-store-service';
import { ApplyNowExpensesPropertyTaxDetailsStrategy } from '../../../shared/route-strategies/apply-now/expenses-property-tax-details';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, IHouseHoldDetails } from '../../household/household-model';
import { ScreenQueueUtilforExpensesUtility } from '../expenses-utility-gatepost/expenses-utility-gatepost.path';
import { INDIVIDUAL_PROGRAMS } from "../../../shared/constants/Individual_Programs_Constants";
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from "../../../shared/utilities/Utility";

@Component({
    selector: "compass-ui-expenses-property-tax-details",
    templateUrl: "./expenses-property-tax-details.component.html",
    styleUrls: ["./expenses-property-tax-details.component.scss"],
    providers: [ApplyNowExpensesPropertyTaxDetailsStrategy],
})
export class ExpensesPropertyTaxDetailsComponent implements OnInit {
    propertyTaxDetailsForm: FormGroup | any;
    pays: any;
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
    requiredFields = [] as string[];
    fieldDisplays: any = {};
    constructor(
        private fb: FormBuilder,
        private routingStrategy: ApplyNowExpensesPropertyTaxDetailsStrategy,
        private router: Router,
        private cd: ChangeDetectorRef,
        private service: ApplyNowStoreService,
        private queueService: ScreenQueueUtilforExpensesUtility,
        private appService: AppStoreService
    ) {}

    ngOnInit(): void {
        this.propertyTaxDetailsForm = this.fb.group({
            taxPay: [""],
            oftenTaxPay: [""],
        });
        this.houseHoldDetails = this.service.getHouseHoldDetails;

        setTimeout(() => {
            this.propertyTaxDetailsForm.patchValue(
                this.houseHoldDetails.expenses?.propertyTax
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
                fieldName: "taxPay",
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
                fieldName: "oftenTaxPay",
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
                formGroup: this.propertyTaxDetailsForm,
                fields: fields,
            } as RequiredOrOptionalValidatorField;
            Utility.setOrClearValidatorForFieldWithDifferntPrograms(
                requiredOrOptionalValidatorField
            );
            this.propertyTaxDetailsForm =
                requiredOrOptionalValidatorField.formGroup;
            this.requiredFields = [
                ...requiredOrOptionalValidatorField.requiredFields,
            ] as any;
        }
    }

    private myFormValidator(predicate: any, validator: any): any {
        return (formControl: FormControl) => {
            if (!formControl.parent) {
                return null;
            }
            if (predicate()) {
                return validator(formControl);
            }
            return null;
        };
    }

    //
    public inputValidator(event: any) {
        const pattern = /^[0-9]*$/;
        if (!pattern.test(event.target.value)) {
            event.target.value = event.target.value.replace(/[^0-9]/g, "");
        }
        if (event.target.value == 0) {
            event.target.value = event.target.value.replace(
                event.target.value,
                ""
            );
        }
        if (event.target.value > 10000000) {
            event.target.value = event.target.value.replace(
                event.target.value,
                event.target.value.slice(0, 7)
            );
        }
    }
    //

    isFieldValid(field: string): boolean {
        return (
            this.propertyTaxDetailsForm.get(field).status !== "VALID" &&
            (this.propertyTaxDetailsForm.get(field).dirty ||
                this.propertyTaxDetailsForm.get(field).touched)
        );
    }

    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return "";
        }

        switch (field) {
            case "taxPay":
                if (
                    this.propertyTaxDetailsForm.get("taxPay").errors?.required
                ) {
                    return "This field is required.";
                }
                break;
            case "oftenTaxPay":
                if (
                    this.propertyTaxDetailsForm.get("oftenTaxPay").errors
                        ?.required
                ) {
                    return "This field is required.";
                }
                break;

            default:
                return "";
                break;
        }
        return "";
    }

    goBack() {
        this.queueService.back();
        // this.router.navigate([this.routingStrategy.previousRoute()]);
    }
    goNext() {
        this.service.validateAllFormFields(this.propertyTaxDetailsForm);
        if (this.propertyTaxDetailsForm.valid) {
            const storeHouseholdDetails = this.service.getHouseHoldDetails;
            const updatedExpenses = {
                ...storeHouseholdDetails.expenses,
                propertyTax: this.propertyTaxDetailsForm.value,
            };
            if (storeHouseholdDetails) {
                this.service.updateHouseHoldDetails({
                    ...storeHouseholdDetails,
                    ...{ expenses: updatedExpenses },
                });
            }

            this.queueService.next();
        }
    }
}
