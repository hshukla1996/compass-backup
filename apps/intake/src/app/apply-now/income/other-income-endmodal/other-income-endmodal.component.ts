import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { IApplyNowState } from "../../+state/apply-now.models";
import { RoutePath } from "../../../shared/route-strategies";
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from "../../../shared/utilities/Utility";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { IHouseHold, IHouseHoldDetails, IIndividualIncome, IOtherIncomeDetails } from "../../household/household-model";
import * as ProgramConstants from "../../../shared/constants/Individual_Programs_Constants";
@Component({
    selector: "compass-ui-other-income-endmodal",
    templateUrl: "./other-income-endmodal.component.html",
    styleUrls: ["./other-income-endmodal.component.scss"],
})
export class OtherIncomeEndmodalComponent implements OnInit {

    otherIncomeRemoveForm: FormGroup | any;
    currentUser: IHouseHold = {};
    currentUserIndex!: string;
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
    applyNowState: IApplyNowState | undefined;
    fragment!: string;
    requiredFields = [] as string[];

    constructor(
        private fb: FormBuilder,
        private route: Router,
        private service: ApplyNowStoreService,
        private activatedRoute: ActivatedRoute,
        private cd: ChangeDetectorRef,
    ) { }

    ngOnInit(): void {
        this.otherIncomeRemoveForm = this.fb.group({
            dateOfLastPay: new FormControl(),
        });

        this.houseHoldDetails = this.service.getHouseHoldDetails;
        if (this.houseHoldDetails.houseHoldPersons) {
            this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
        }

        this.activatedRoute.fragment.subscribe((fragment) => {
            this.fragment = fragment || "0";
        });

        this.activatedRoute.params.
            subscribe((p) => {
                this.currentUserIndex = p.userId || "";
                if (this.houseHoldPersons.length > 0)
                    this.currentUser =
                        this.service.extractUser(
                            this.houseHoldPersons,
                            this.currentUserIndex
                        ) || "";
                this.cd.detectChanges();
            });
        this.setOrResetValidator();
    }
    cancel(): void {
        this.route.navigate([
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_INCOME +
            "/" +
            RoutePath.APPLYNOW_INCOME_OTHERINCOME +
            "/" +
            RoutePath.APPLYNOW_INCOME_OTHERINCOMESUMMARY,
        ]);
    }

    isFieldValid(field: string): boolean {
        return (
            this.otherIncomeRemoveForm.get(field).status !== "VALID" &&
            this.otherIncomeRemoveForm.get(field).touched
        );
    }

    remove(): void {

        const storedHouseholdDetails = this.houseHoldDetails;
        const updatedHouseholdPersons =
            this.houseHoldDetails.houseHoldPersons?.map(
                (person: IHouseHold) => {
                    const personToBeUpdated = { ...person };
                    const existingIndividualIncome = { ...personToBeUpdated.individualIncome };
                    if (
                        person.id?.toString() ===
                        this.currentUserIndex?.toString() &&
                        existingIndividualIncome.otherIncome &&
                        existingIndividualIncome.otherIncome.length > 0
                    ) {
                        const existingOtherIncome = [...existingIndividualIncome.otherIncome];
                        existingOtherIncome.splice(parseInt(this.fragment), 1);
                        existingIndividualIncome.otherIncome = existingOtherIncome;
                        return { ...personToBeUpdated, ...{ individualIncome: existingIndividualIncome } };
                    }
                    return personToBeUpdated;
                }
            );
        if (storedHouseholdDetails) {
            this.service.updateHouseHoldDetails({
                ...storedHouseholdDetails,
                ...{ houseHoldPersons: updatedHouseholdPersons },
            });
        }
        this.route.navigate([
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_INCOME +
            "/" +
            RoutePath.APPLYNOW_INCOME_OTHERINCOME +
            "/" +
            RoutePath.APPLYNOW_INCOME_OTHERINCOMESUMMARY,
        ]);
    }
    setOrResetValidator(){
        let householdBenefits = this.service?.getBenefits() as string[];
        const fields = [{
            fieldName: ' dateOfLastPay',
            optionalProgram: ProgramConstants.INCOME_OTHERINCOMEENDMODAL_DATEOFLASTPAY_REQUIRED_PROGRAM as string[],
            requiredProgram: [] as string[]
        },
        
        ] as FormValidatorField[]
        if (householdBenefits != null && householdBenefits.length > 0) {
            const requiredOrOptionalValidatorField =
                {

                    selectedPrograms: householdBenefits,
                    requiredFields: this.requiredFields,
                    formGroup: this.otherIncomeRemoveForm,
                    fields: fields
                } as RequiredOrOptionalValidatorField
            Utility.setOrClearValidatorForFieldWithDifferntPrograms(requiredOrOptionalValidatorField)
            this.otherIncomeRemoveForm = requiredOrOptionalValidatorField.formGroup;
            this.requiredFields = [...requiredOrOptionalValidatorField.requiredFields] as any;
        }
    }
}
