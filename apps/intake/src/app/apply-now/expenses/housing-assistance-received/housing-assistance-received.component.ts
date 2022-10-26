import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RoutePath } from "../../../shared/route-strategies";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { ScreenQueueUtil } from "./../expenses-gatepost/expenses-gatepost.paths";
import {
    IHouseHold,
    IHouseHoldDetails,
    PageDirection,
} from "../../household/household-model";
import { UtilService } from "../../../shared/services/util.service";
import { AppStoreService } from "../../../app-store-service";
import { INDIVIDUAL_PROGRAMS } from "../../../shared/constants/Individual_Programs_Constants";
import {
    FormValidatorField,
    RequiredOrOptionalValidatorField,
    Utility,
} from "../../../shared/utilities/Utility";

@Component({
    selector: "ui-compass-housing-assistance-received",
    templateUrl: "./housing-assistance-received.component.html",
    styleUrls: ["./housing-assistance-received.component.css"],
})
export class HousingAssistanceReceivedComponent implements OnInit {
    housingAssistanceReceivedDlsCmpForm: FormGroup | any | null;
    currentUser: IHouseHold = {};
    currentUserIndex!: string;
    daysData: any;

    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
    requiredFields = [] as string[];
    fieldDisplays: any = {};

    constructor(
        private fb: FormBuilder,
        private route: Router,
        private cd: ChangeDetectorRef,
        private service: ApplyNowStoreService,
        private utilService: UtilService,
        private activedRoute: ActivatedRoute,
        private appService: AppStoreService,
        private queueService: ScreenQueueUtil
    ) {}

    ngOnInit() {
        this.housingAssistanceReceivedDlsCmpForm = this.fb.group({
            housingAssistanceReceived: [""],
        });
        this.housingAssistanceReceivedDlsCmpForm.reset();
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        if (this.houseHoldDetails.houseHoldPersons) {
            this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
        }
        setTimeout(() => {
            this.housingAssistanceReceivedDlsCmpForm
                .get("housingAssistanceReceived")
                .patchValue(this.houseHoldDetails.expenses?.housingAssitance);
        }, 500);
        this.cd.detectChanges();
        this.appService.getPay().subscribe((pay) => {
            this.daysData = pay;
            this.cd.detectChanges();
        });
        this.setProgramFieldValidation();
    }
    get f() {
        return this.housingAssistanceReceivedDlsCmpForm.controls;
    }

    setProgramFieldValidation() {
        let householdBenefits = this.service?.getBenefits() as string[];
        const fields = [
            {
                fieldName: "housingAssistanceReceived",
                optionalProgram: [
                    INDIVIDUAL_PROGRAMS.FS,
                    INDIVIDUAL_PROGRAMS.ES,
                ],
                requiredProgram: [INDIVIDUAL_PROGRAMS.CA],
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
                formGroup: this.housingAssistanceReceivedDlsCmpForm,
                fields: fields,
            } as RequiredOrOptionalValidatorField;
            Utility.setOrClearValidatorForFieldWithDifferntPrograms(
                requiredOrOptionalValidatorField
            );
            this.housingAssistanceReceivedDlsCmpForm =
                requiredOrOptionalValidatorField.formGroup;
            this.requiredFields = [
                ...requiredOrOptionalValidatorField.requiredFields,
            ] as any;
        }
    }

    isFieldValid(field: string): boolean {
        if (
            this.housingAssistanceReceivedDlsCmpForm.get(field).status !==
            "VALID"
        ) {
            //console.log("invalid");
            //console.log(field);
            //console.log(this.housingAssistanceReceivedDlsCmpForm.get(field).touched);
        }
        return (
            this.housingAssistanceReceivedDlsCmpForm.get(field).status !==
                "VALID" &&
            this.housingAssistanceReceivedDlsCmpForm.get(field).touched
        );
    }
    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return "";
        }
        switch (field) {
            case "housingAssistanceReceived":
                if (
                    this.housingAssistanceReceivedDlsCmpForm.get(
                        "housingAssistanceReceived"
                    ).errors.required
                ) {
                    return "Housing assistance received is required.";
                }
                break;
            default:
                return "";
        }

        return "";
    }
    onSubmit() {
        this.service.validateAllFormFields(
            this.housingAssistanceReceivedDlsCmpForm
        );
        console.log(
            this.housingAssistanceReceivedDlsCmpForm.status.toLowerCase()
        );
        //housingAssitance
        if (
            this.housingAssistanceReceivedDlsCmpForm.status.toLowerCase() ===
            "valid"
        ) {
            const storedHouseholdDetails = this.houseHoldDetails;
            const updatedExpenses = {
                ...this.houseHoldDetails.expenses,
                housingAssitance: this.housingAssistanceReceivedDlsCmpForm.get(
                    "housingAssistanceReceived"
                ).value,
            };
            if (this.houseHoldDetails) {
                this.service.updateHouseHoldDetails({
                    ...this.houseHoldDetails,
                    ...{ expenses: updatedExpenses },
                });
            }
            this.queueService.next();
        }
    }
    previous(): void {
        this.queueService.back();
        /*this.route.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_EXPENSES +
                "/" +
                RoutePath.APPLYNOW_EXPENSESLEGALFEESUMMARY,
        ]);*/
    }
}
