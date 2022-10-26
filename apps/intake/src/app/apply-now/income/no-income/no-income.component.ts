import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { validateBasis } from "@angular/flex-layout";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { IApplyNowState } from "../../+state/apply-now.models";
import { RoutePath } from "../../../shared/route-strategies";
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from "../../../shared/utilities/Utility";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import * as ProgramConstants from "../../../shared/constants/Individual_Programs_Constants";

@Component({
  selector: "compass-ui-no-income",
  templateUrl: "./no-income.component.html",
  styleUrls: ["./no-income.component.scss"],
})
export class NoIncomeComponent implements OnInit {

  textLength: number = 0;
  noIncomeForm: FormGroup | any | null;
  applyNowState!: IApplyNowState;
  requiredFields = [] as string[];

  constructor(private fb: FormBuilder,
    private router: Router,
    private service: ApplyNowStoreService,
    private cd: ChangeDetectorRef,) { }

  ngOnInit(): void {
    this.noIncomeForm = this.fb.group({
      noIncomeExplanation: [""]
    });
    this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      this.noIncomeForm.get("noIncomeExplanation")?.patchValue(this.applyNowState.houseHoldDetails.income?.noIncomeExplanation);
      this.cd.detectChanges();
    });

  }

  updateCharacterCount(data: any) {
    this.textLength = data.length;
  }

  isFieldValid(field: string): boolean {
    return (
      this.noIncomeForm.get(field).status !== "VALID" &&
      this.noIncomeForm.get(field).touched
    );
  }

  goBack() {
    this.router.navigate([
      RoutePath.APPLYNOW
      + "/" + RoutePath.APPLYNOW_INCOME
      + "/" + RoutePath.APPLYNOW_INCOME_INCOMEGATEPOST
    ]);
  }

  goNext() {
    this.service.validateAllFormFields(this.noIncomeForm);
    if (this.noIncomeForm.status.toLowerCase() === "valid") {
      const houseHoldDetails = this.applyNowState.houseHoldDetails;
      const existingIncome = { ...houseHoldDetails?.income };
      const updatedIncome = { ...existingIncome, ...{ noIncomeExplanation: this.noIncomeForm.value["noIncomeExplanation"] } }

      this.service.updateHouseHoldDetails(
        { ...houseHoldDetails, ...{ income: updatedIncome } }
      )

      this.router.navigate([RoutePath.APPLYNOW
        + "/" + RoutePath.APPLYNOW_INCOME + "/" + RoutePath.APPLYNOW_INCOME_SUMMARY]);
    }
  }
  setOrResetValidator() {
    let householdBenefits = this.service?.getBenefits() as string[];
    const fields = [{
      fieldName: 'noIncomeExplanation',
      optionalProgram: [] as string[],
      requiredProgram: ProgramConstants.INCOME_NOINCOME_NOINCOMEEXPLANATION_REQUIRED_PROGRAM as string[]
    },
      ] as FormValidatorField[]
    if (householdBenefits != null && householdBenefits.length > 0) {
      const requiredOrOptionalValidatorField =
        {

          selectedPrograms: householdBenefits,
          requiredFields: this.requiredFields,
          formGroup: this.noIncomeForm,
          fields: fields
        } as RequiredOrOptionalValidatorField
      Utility.setOrClearValidatorForFieldWithDifferntPrograms(requiredOrOptionalValidatorField)
      this.noIncomeForm = requiredOrOptionalValidatorField.formGroup;
      this.requiredFields = [...requiredOrOptionalValidatorField.requiredFields] as any;
    }
}
}
