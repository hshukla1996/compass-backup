import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppStoreService } from "../../../app-store-service";
import { ApplyNowStoreService } from "../../apply-now-store-service";
//import { HouseholdFormDataService } from "../services/household-form-data.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { IApplyNowState } from "../../+state/apply-now.models";
import { RoutePath } from "../../../shared/route-strategies";
import { IHouseHold, IHouseHoldDetails } from "../../household/household-model";
import { Utility } from "../../../shared/utilities/Utility";


@Component({
    selector: "compass-ui-income-jobendmodal",
    templateUrl: "./income-jobendmodal.component.html",
    styleUrls: ["./income-jobendmodal.component.scss"],
})

export class IncomeJobEndModalComponent implements OnInit {
    incomeJobRemoveForm: FormGroup | any;
    currentUser: IHouseHold = {};
    currentUserIndex!: string;
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
    applyNowState: IApplyNowState | undefined;
    fragment!: string;
    reasonForEmploymentEnd$: Observable<any> | undefined;
    reasonForEmploymentEnd: any;
    maxDateRange: any;

    constructor(
        private fb: FormBuilder,
        private route: Router,
        private service: ApplyNowStoreService,
        private activatedRoute: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private appStore: AppStoreService,
    ) { }


    ngOnInit(): void {
        this.maxDateRange = new Date().toISOString().slice(0, 10);
        this.incomeJobRemoveForm = this.fb.group({
            dateOfLastPay: ["", Validators.required, Utility.dateMaxValidator()],
            reasonForEmploymentEnd: [''],
        });

        this.service.getAppData().subscribe((d) => {
            this.applyNowState = { ...d };
            this.reasonForEmploymentEnd$ = this.appStore.getReasonForEmploymentEnd();
            this.reasonForEmploymentEnd$?.subscribe((s) => {
                this.reasonForEmploymentEnd = s;
                this.cd.detectChanges();
            });
            this.cd.detectChanges();
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
    }

    cancel(): void {
        this.route.navigate([
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_INCOME +
            "/" +
            RoutePath.APPLYNOW_INCOME_INCOMEJOBSUMMARY,
        ]);
    }

    isFieldValid(field: string): boolean {
        return (
            this.incomeJobRemoveForm.get(field).status !== "VALID" &&
            this.incomeJobRemoveForm.get(field).touched
        );
    }

    errorMap(field: string) {
    if (!this.isFieldValid(field)) {
      return "";
    }
    switch (field) {
      case "dateOfLastPay":
        if (this.incomeJobRemoveForm.get('dateOfLastPay').errors?.required) {
            return 'Date is required.'
        }
        if (this.incomeJobRemoveForm.get('dateOfLastPay').errors?.invalidDate) {
            return 'Date must be in the past.'
        }
        if (this.incomeJobRemoveForm.get("dateOfLastPay").errors.duetInvalidDate) {
            return "duetInvalidDate";
        }
        break;
      default:
        return "";
    }
    return "";
  }

    remove(): void {
        this.service.validateAllFormFields(this.incomeJobRemoveForm);
        if (this.incomeJobRemoveForm.status.toLowerCase() === "valid") {
            const storedHouseholdDetails = this.houseHoldDetails;
            const updatedHouseholdPersons =
                this.houseHoldDetails.houseHoldPersons?.map(
                    (person: IHouseHold) => {
                        const personToBeUpdated = { ...person };
                        const existingIndividualIncome = { ...personToBeUpdated.individualIncome };
                        if (
                            person.id?.toString() ===
                            this.currentUserIndex?.toString() &&
                            existingIndividualIncome.currentEmployment &&
                            existingIndividualIncome.currentEmployment.length > 0
                        ) {
                            const existingCurrentEmployment = [...existingIndividualIncome.currentEmployment];
                            existingCurrentEmployment.splice(parseInt(this.fragment), 1);
                            existingIndividualIncome.currentEmployment = existingCurrentEmployment;
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
                RoutePath.APPLYNOW_INCOME_INCOMEJOBSUMMARY,
            ]);
        }
    }

}