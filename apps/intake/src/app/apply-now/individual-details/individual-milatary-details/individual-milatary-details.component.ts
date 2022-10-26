import { ChangeDetectorRef, Component, OnInit  } from "@angular/core";
import { FormGroup} from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { Store } from "@ngrx/store";
import { IApplyNowState } from "../../+state/apply-now.models";
import { AppStoreService } from "../../../app-store-service";
import { RoutePath } from "../../../shared/route-strategies";
import { UtilService } from "../../../shared/services/util.service";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from "../../../shared/utilities/Utility";
import * as ProgramConstants from "../../../shared/constants/Individual_Programs_Constants";
import {
    IHouseHold,
    PageDirection,
    IHouseHoldDetails,
} from "../../household/household-model";

@Component({
    selector: "ui-compass-individual-milatary-details",
    templateUrl: "./individual-milatary-details.component.html",
    styleUrls: ["./individual-milatary-details.component.css"],
})
export class IndividaulMilataryDetailsComponent implements OnInit {
    individaulMilataryDetailsForm: FormGroup | any | null;
    data: any;
    currentUser: IHouseHold = {};
    currentUserIndex!: string;
    militaryMap!: any;
    houseHoldPersons: IHouseHold[] = [];
    applyNowState: IApplyNowState | undefined;
    serviceBranches!: any[];
    houseHoldDetails!: IHouseHoldDetails;
    requiredFields=[] as string[]
  fieldDisplays:any = {};
  maxDateRange = new Date().toISOString().slice(0, 10);
    constructor(
        private fb: FormBuilder,
        private route: Router,
        private service: ApplyNowStoreService,
        private appService: AppStoreService,
        private activedRoute: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private utilService: UtilService
    ) {
    }
    ngOnInit() {
        this.individaulMilataryDetailsForm = this.fb.group({
            branchOfService: ["", ],
            dateEntered: ["", Utility.dateMaxValidator()],
            dateDischarged: ["", Utility.dateMaxValidator()],
            claimNumber: [""],
        });
        this.service.getAppData().subscribe((d) => {
            this.applyNowState = { ...d };
            if (this.applyNowState.houseHoldDetails.houseHoldPersons) {
                this.houseHoldPersons =
                    this.applyNowState.houseHoldDetails.houseHoldPersons;
            }
            this.militaryMap =
                {
                    ...this.applyNowState.houseHoldDetails.pageAction
                        ?.militaryMap,
                } || {};
        });
        this.appService.getServiceBranches().subscribe((c) => {
            this.serviceBranches = c;
            this.cd.detectChanges();
        });
        this.activedRoute.params.subscribe((p) => {
            if (Object.keys(p).length == 0) {
                this.currentUserIndex =
                    this.utilService.getCurrentUserIdOnNoParams(
                        this.militaryMap
                    );
            } else {
                this.currentUserIndex = p.userId || "";
            }
            if (this.houseHoldPersons.length > 0)
                this.currentUser =
                    this.service.extractUser(
                        this.houseHoldPersons,
                        this.currentUserIndex
                    ) || "";
          this.setOrResetValidator(this.currentUser);
          this.individaulMilataryDetailsForm.controls['dateEntered'].setValidators([Utility.dateMaxValidator()]);
          this.individaulMilataryDetailsForm.controls['dateDischarged'].setValidators([Utility.dateMaxValidator()]);
            this.cd.detectChanges();
        });

    }

    get f() {
        return this.individaulMilataryDetailsForm.controls;
    }
  isFieldValid(field: string): boolean {

    return (
      this.individaulMilataryDetailsForm.get(field).status !== "VALID" &&
      this.individaulMilataryDetailsForm.get(field).touched
    );
  }
  errorMap(field: string) {
    if (!this.isFieldValid(field)) {
      return "";
    }
    switch (field) {
      case "dateEntered":
        if (
          this.individaulMilataryDetailsForm.get("dateEntered").errors
            .required
        ) {
          return "Date entered is required.";
        }
        else if (
          this.individaulMilataryDetailsForm.get("dateEntered").errors
            .invalidDate
        ) {
          return "Date should not be more than today's date.";
        }
        if (this.individaulMilataryDetailsForm.get("dateEntered").errors.duetInvalidDate) {
            return "duetInvalidDate";
        }
        break;
      case "dateDischarged":
        if (
          this.individaulMilataryDetailsForm.get("dateDischarged").errors
            .required
        ) {
          return "Date discharged is required.";
        }
        else if (
          this.individaulMilataryDetailsForm.get("dateDischarged").errors
            .invalidDate
        ) {
          return "Date should not be more than today's date.";
        }
        if (this.individaulMilataryDetailsForm.get("dateDischarged").errors.duetInvalidDate) {
            return "duetInvalidDate";
        }
        break;
      default:
        return "";

    }

    return "";
  }
    onSubmit(): void {
        this.individaulMilataryDetailsForm.markAllAsTouched();
        const isValid = this.individaulMilataryDetailsForm.valid;
        if (!isValid) return;
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        const storedHouseholdDetails = this.houseHoldDetails;
        const updatedHouseholdPersons =
            this.houseHoldDetails.houseHoldPersons?.map(
                (person: IHouseHold) => {
                    if (person.id === this.currentUser.id) {
                        const personToBeUpdated = { ...person };
                        personToBeUpdated.veteran = {
                            ...personToBeUpdated.veteran,
                            branchOfService:
                                this.individaulMilataryDetailsForm.get(
                                    "branchOfService"
                                ).value,
                            dateVeteranEntered:
                                this.individaulMilataryDetailsForm.get(
                                    "dateEntered"
                                ).value,
                            dateVeteranLeft:
                                this.individaulMilataryDetailsForm.get(
                                    "dateDischarged"
                                ).value,
                            verteranClaimNumber:
                                this.individaulMilataryDetailsForm.get(
                                    "claimNumber"
                                ).value,
                        };
                        return personToBeUpdated;
                    } else {
                        return person;
                    }
                }
            );
        // if (storedHouseholdDetails)
        //     this.service.updateHouseHoldDetails({
        //         ...storedHouseholdDetails,
        //         ...{ houseHoldPersons: updatedHouseholdPersons },
        //     });
        //const storedHouseholdDetails = this.applyNowState?.houseHoldDetails;

        let isNextPage = false;
        this.militaryMap[this.currentUserIndex] = true;
        const updatedPageAction = {
            ...storedHouseholdDetails?.pageAction,
            militaryMap: {
                ...storedHouseholdDetails?.pageAction?.militaryMap,
                ...this.militaryMap,
            },
            serviceDirection: PageDirection.NEXT,
        };
        if (storedHouseholdDetails)
            this.service.updateHouseHoldDetails({
                ...storedHouseholdDetails,
                ...{ pageAction: updatedPageAction },
                ...{ houseHoldPersons: updatedHouseholdPersons },
            });
        if (this.militaryMap != null) {
            isNextPage = this.utilService.isNextPage(this.militaryMap);
        }
        if (isNextPage) {
            this.utilService

                .getCurrentUserIdPageAction(
                    this.militaryMap,
                    PageDirection.NEXT
                )

                .subscribe((id: any) => {
                    this.currentUserIndex = id.toString();

                    this.route.navigate([
                        RoutePath.APPLYNOW +
                            "/" +
                            RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                            "/" +
                            RoutePath.APPLYNOW_MILATARY_STATUS,
                        { userId: this.currentUserIndex },
                    ]);
                });
        } else {
            this.route.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                    "/" +
                    RoutePath.APPLYNOW_MILATARY_SUMMARY,
            ]);
        }
    }

    previous() {
        this.route.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_MILATARY_STATUS,
        ]);
    }
    setOrResetValidator(ind:IHouseHold) {

        let householdBenefits = this.service?.getAppliedBenefitsForIndividual(ind) as string[];

        const fields = [{
            fieldName: 'branchOfService',
            optionalProgram: ProgramConstants.IND_DETAIL_MILATARYBOS_OPTIONALPROGRAMS as string[],
            requiredProgram: ProgramConstants.IND_DETAIL_MILATARYBOS_REQUIREDPROGRAMS as string[]

        }, {
            fieldName: 'dateEntered',
            optionalProgram: ProgramConstants.IND_DETAIL_MILATARYDE_OPTIONALPROGRAMS as string[],
            requiredProgram: [] as string[]

        }, {
            fieldName: 'dateDischarged',
            optionalProgram: ProgramConstants.IND_DETAIL_MILATARYDD_OPTIONALPROGRAMS as string[],
            requiredProgram: [] as string[]

        }, {
            fieldName: 'claimNumber',
            optionalProgram: ProgramConstants.IND_CURRENTEDUCATION_EXPECTGRADUATE_OPTIONALPROGRAMS as string[],
            requiredProgram: [] as string[]

        }] as FormValidatorField[]
      this.fieldDisplays = {};
      fields.forEach((fieldObj:FormValidatorField)=>{
        this.fieldDisplays[fieldObj.fieldName] = this.service
          .areProgramsExist(householdBenefits,[...fieldObj.optionalProgram,...fieldObj.requiredProgram])
      })
        if (householdBenefits != null && householdBenefits.length > 0) {
            const requiredOrOptionalValidatorField =
                {

                    selectedPrograms: householdBenefits,
                    requiredFields: this.requiredFields,
                    formGroup: this.individaulMilataryDetailsForm,
                    fields: fields
                } as RequiredOrOptionalValidatorField
            Utility.setOrClearValidatorForFieldWithDifferntPrograms(requiredOrOptionalValidatorField)
            this.individaulMilataryDetailsForm = requiredOrOptionalValidatorField.formGroup;
            this.requiredFields = [...requiredOrOptionalValidatorField.requiredFields] as any;
        }
    }
}
