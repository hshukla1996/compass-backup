import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { select } from "@ngrx/store";
import { IApplyNowState } from "../../+state/apply-now.models";
import { INDIVIDUAL_PROGRAMS } from "../../../shared/constants/Individual_Programs_Constants";
import { RoutePath } from "../../../shared/route-strategies";
import { UtilService } from "../../../shared/services/util.service";
import { Utility } from "../../../shared/utilities/Utility";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { IHouseHold, IIncomeInfo } from "../../household/household-model";

@Component({
    selector: "compass-ui-financialdisability-income",
    templateUrl: "./financialdisability-income.component.html",
    styleUrls: ["./financialdisability-income.component.scss"],
})
export class FinancialdisabilityIncomeComponent implements OnInit {

    financialDisabilityIncomeForm: FormGroup | any;
    applyNowState!: IApplyNowState;
    householdPersons: IHouseHold[] = [];
    displayError: boolean = false;

    constructor(private fb: FormBuilder,
        private service: ApplyNowStoreService,
        private cd: ChangeDetectorRef,
        private router: Router,) { }

    ngOnInit(): void {
        this.buildInitialForm();
        this.service.getAppData().subscribe(d => {
            this.applyNowState = { ...d };
           this.applyNowState.houseHoldDetails?.houseHoldPersons?.forEach((person) => {
                let personalBenefits =
                    this.service?.getAppliedBenefitsForIndividual(
                        person
                    ) as string[];
                const isEligible = this.service.areProgramsExist(
                    personalBenefits,
                    [
                        INDIVIDUAL_PROGRAMS.LH,
                        INDIVIDUAL_PROGRAMS.LHP,
                        INDIVIDUAL_PROGRAMS.LHCR,
                        INDIVIDUAL_PROGRAMS.LW,
                        
                    ]
                );
                if (person.id && isEligible) {
                    this.householdPersons.push(person);
                }
            });

             
            this.setupCheckboxFromState();
            this.cd.detectChanges();
        });
    }

    private setupCheckboxFromState() {
        let checkedList = this.householdPersons;
        let houseHold = this.applyNowState.houseHoldDetails;
        checkedList.forEach((person: any) => {
            if (houseHold.income?.doesAnyoneReceiveFinancialAssistanceForDisability?.
                individualNumbers?.find(ele => ele === +person.id)) {
                this.IdsWithFinancialAssistance.push(new FormControl(person.id))
            }
        });
    }

    //Financial assistance for disability
    get IdsWithFinancialAssistance(): FormArray {
        return <FormArray>this.financialDisabilityIncomeForm.controls['IdsWithFinancialAssistance'];
    }

    getIndex(value: number): number {
        return this.IdsWithFinancialAssistance.controls.findIndex(ctrl => ctrl.value == value);
    }

    onCheckboxChange(personId: number, data: any) {
        if (data.checked) {
            this.IdsWithFinancialAssistance.push(new FormControl(personId));
            this.displayError = false;
        }
        else {
            let index = this.getIndex(personId)
            if (index > -1) {
                this.IdsWithFinancialAssistance.removeAt(index);
            }
        }
    }

    isPersonHavingDisabilityAssistance(personId: number) {
        let index = this.getIndex(personId)
        if (index > -1) {
            return true;
        } else {
            return false;
        }
    }

    private buildInitialForm(): void {
        this.financialDisabilityIncomeForm = this.fb.group({
            IdsWithFinancialAssistance: this.fb.array([]),
        })
    }

    getAge(dateString: any): any {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    goBack(): void {
        this.router.navigate([
            RoutePath.APPLYNOW
            + "/" + RoutePath.APPLYNOW_INCOME
            + "/" + RoutePath.APPLYNOW_INCOME_INCOMEGATEPOST
        ]);
    }

    goNext(): void {
        this.service.validateAllFormFields(this.financialDisabilityIncomeForm);

        const houseHoldDetails = this.applyNowState.houseHoldDetails;
        const selectedUserIds: number[] = [];
        this.financialDisabilityIncomeForm.value.IdsWithFinancialAssistance.forEach((person: any) => {
            selectedUserIds.push(person)
        })

        if(selectedUserIds.length === 0){
            this.displayError = true;
            return;
        }
        const existingIncome = { ...houseHoldDetails?.income };
        const financialIncomeInfo = { ...existingIncome?.doesAnyoneReceiveFinancialAssistanceForDisability }

        if (houseHoldDetails) {
            if (selectedUserIds.length > 0) {
                financialIncomeInfo.code = "Yes";
                financialIncomeInfo.individualNumbers = selectedUserIds;
            } else {
                financialIncomeInfo.code = "No";
                financialIncomeInfo.individualNumbers = [];
            }

            const updatedIncome = { ...existingIncome, ...{ doesAnyoneReceiveFinancialAssistanceForDisability: financialIncomeInfo }}
            this.service.updateHouseHoldDetails(
                { ...houseHoldDetails, ...{ income: updatedIncome } }
            )
        }
        this.router.navigate([RoutePath.APPLYNOW
            + "/" + RoutePath.APPLYNOW_INCOME + "/" + RoutePath.APPLYNOW_INCOME_SUMMARY]);
    }
}
