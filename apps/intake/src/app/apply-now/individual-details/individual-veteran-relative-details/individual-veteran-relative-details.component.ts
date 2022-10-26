import { ChangeDetectorRef, Component, OnInit  } from "@angular/core";
import { FormGroup} from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { Store } from "@ngrx/store";
import { IApplyNowState } from "../../+state/apply-now.models";
import { AppStoreService } from "../../../app-store-service";
import { RoutePath } from "../../../shared/route-strategies";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { IHouseHold } from "../../household/household-model";
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from "../../../shared/utilities/Utility";
import * as ProgramConstants from "../../../shared/constants/Individual_Programs_Constants";
import {UtilService} from "../../../shared/services/util.service";
@Component({
    selector: "ui-compass-individual-veteran-relative-details",
    templateUrl: "./individual-veteran-relative-details.component.html",
    styleUrls: ["./individual-veteran-relative-details.component.css"],
})
export class IndividaulVeteranRelativeDetailsComponent implements OnInit {
    individaulVeteranRelativeDetailsForm: FormGroup | any | null;
    data: any;
  currentUserIndex!: string;
  maxDateRange = new Date().toISOString().slice(0, 10);
    applyNowState: IApplyNowState | undefined;
    vetrelativeMap!:any;
    currentUser!:IHouseHold;
    serviceBranches!: any[];
    houseHoldPersons: IHouseHold[] = [];
  fieldDisplays:any = {};
    listOfIndividuals!: { key: any; value: string | undefined }[];
    requiredFields = [] as string[]
    constructor(
        private fb: FormBuilder,
        private service: ApplyNowStoreService,
        private cd: ChangeDetectorRef,
        private activedRoute: ActivatedRoute,
        private route: Router,
        private appService: AppStoreService,
        private utilService: UtilService
    ) {}
    ngOnInit() {
        this.individaulVeteranRelativeDetailsForm = this.fb.group({
            veteranName: ["" ],
            someOneOutSideVeteranName: ["" ],
            branchOfService: ["",],
            dateEntered: ["", Utility.dateMaxValidator()],
            dateDischarged: ["", Utility.dateMaxValidator()],
            claimNumber: [""],
        });
        this.maxDateRange = new Date().toISOString().slice(0, 10);
        this.service.getAppData().subscribe((d) => {
            this.applyNowState = { ...d };
            if (this.applyNowState.houseHoldDetails.houseHoldPersons) {
                this.houseHoldPersons =
                    this.applyNowState.houseHoldDetails.houseHoldPersons;
                this.listOfIndividuals = this.houseHoldPersons.map((ind) => {
                    return {
                        key: ind.id,
                        value: ind.firstName,
                    };
                });
                this.data = this.getData();
            }
        });
        this.appService.getServiceBranches().subscribe((c) => {
            this.serviceBranches = c;
            this.cd.detectChanges();
        });
        //personToBeUpdated.veteranRelationInformation
      this.activedRoute.params.subscribe((p) => {
        if (Object.keys(p).length == 0) {
          this.currentUserIndex = "";
        } else {
          this.currentUserIndex = p.userId || "";
        }
      if(this.currentUserIndex ) {

        if(this.currentUserIndex !== "999") {
          this.currentUser =
            this.service.extractUser(
              this.houseHoldPersons,
              this.currentUserIndex
            ) || "";
          this.individaulVeteranRelativeDetailsForm.patchValue({
            veteranName: "999",
            branchOfService: this.currentUser.veteranRelationInformation?.branchOfService,
            dateEntered: Utility.duetFormatDate(this.currentUser.veteranRelationInformation?.dateVeteranEntered),
            dateDischarged: Utility.duetFormatDate(this.currentUser.veteranRelationInformation?.dateVeteranLeft),
            claimNumber: this.currentUser.veteranRelationInformation?.verteranClaimNumber,
          })
          this.setOrResetValidator(this.currentUser)
        }
        else {
          this.currentUser =
            this.applyNowState?.houseHoldDetails?.otherVetPerson as IHouseHold;
          this.individaulVeteranRelativeDetailsForm.patchValue({
             veteranName: this.currentUserIndex,
            someOneOutSideVeteranName: this.currentUser.firstName,
            branchOfService: this.currentUser.veteranRelationInformation?.branchOfService,
            dateEntered: Utility.duetFormatDate(this.currentUser.veteranRelationInformation?.dateVeteranEntered),
            dateDischarged: Utility.duetFormatDate(this.currentUser.veteranRelationInformation?.dateVeteranLeft),
            claimNumber: this.currentUser.veteranRelationInformation?.verteranClaimNumber,
        })
          this.fieldDisplays = {
            veteranName: true,
            someOneOutSideVeteranName:true,
            branchOfService:true,
            dateEntered: true,
            dateDischarged:true,
            claimNumber:true,
          };
        }

      }


      });
    }

    get f() {
        return this.individaulVeteranRelativeDetailsForm.controls;
    }
    getData() {
        return {
            nameOfTheVeteranList: [
                ...(this.listOfIndividuals || []),
                ...[
                    {
                        key: "999",
                        value: "Someone Outside the Household",
                    },
                ],
            ]
        };
    }
  selectPerson(personId:any){
      if(personId === "999") {
        this.currentUserIndex = "999"
        this.currentUser = {
          id:999,
          firstName: this.individaulVeteranRelativeDetailsForm.get('someOneOutSideVeteranName').value,
        }
        this.fieldDisplays = {
          veteranName: true,
          someOneOutSideVeteranName:true,
          branchOfService:true,
          dateEntered: true,
          dateDischarged:true,
          claimNumber:true,
        };
      }
      else{
        this.currentUserIndex = personId
        this.currentUser = this.houseHoldPersons.filter((ind: IHouseHold, i) => ind.id == personId)[0]
        this.setOrResetValidator(this.currentUser)
      }
    }
  isFieldValid(field: string): boolean {
    return (
      this.individaulVeteranRelativeDetailsForm.get(field).status !== "VALID" &&
      this.individaulVeteranRelativeDetailsForm.get(field).touched
    );
  }
  errorMap(field: string) {
    if (!this.isFieldValid(field)) {
      return "";
    }
    switch (field) {
      case "veteranName":
        if (
          this.individaulVeteranRelativeDetailsForm.get("veteranName").errors
            .required
        ) {
          return "Veteran Name is required.";
        }
        break;
      case "someOneOutSideVeteranName":
        if(this.individaulVeteranRelativeDetailsForm.get("someOneOutSideVeteranName").errors.required){
          return "Veteran Name is required.";
        }
        break;
      case "branchOfService":
        if (
          this.individaulVeteranRelativeDetailsForm.get("branchOfService").errors
            .required
        ) {
          return "Branch of service is required.";
        }
        break;
      case "dateEntered":
        if (
          this.individaulVeteranRelativeDetailsForm.get("dateEntered").errors
            .required
        ) {
          return "Date entered is required.";
        }
        if (this.individaulVeteranRelativeDetailsForm.get('dateEntered').errors?.invalidDate) {
            return 'Date must be in the past.'
        }
        if (this.individaulVeteranRelativeDetailsForm.get("dateEntered").errors.duetInvalidDate) {
            return "duetInvalidDate";
        }
        break;
      case "dateDischarged":
        if (
          this.individaulVeteranRelativeDetailsForm.get("dateDischarged").errors
            .required
        ) {
          return "Date discharged is required.";
        }
        if (this.individaulVeteranRelativeDetailsForm.get('dateDischarged').errors?.invalidDate) {
            return 'Date must be in the past.'
        }
        if (this.individaulVeteranRelativeDetailsForm.get("dateDischarged").errors.duetInvalidDate) {
            return "duetInvalidDate";
        }
        break;

      default:
        return "";
        break;
    }

    return "";
  }
    onSubmit(): void {

        this.individaulVeteranRelativeDetailsForm.markAllAsTouched();
        const isValid = this.individaulVeteranRelativeDetailsForm.valid;
        if(!isValid)return;
        const storedHouseholdDetails = this.applyNowState?.houseHoldDetails;
        let veteranName = "",
            status = "";
        if (
            this.individaulVeteranRelativeDetailsForm.get(
                "veteranName"
            ).value === "Someone Outside the Household"
        ) {
            veteranName =
            this.individaulVeteranRelativeDetailsForm.get(
                "someOneOutSideVeteranName"
            ).value;
            status = "N";
        } else {
            veteranName =
            this.individaulVeteranRelativeDetailsForm.get(
                "veteranName"
            ).value;
            status = "Y";
        }
const vetInfo = {
        veteranName: veteranName,
          branchOfService:
        this.individaulVeteranRelativeDetailsForm.get(
          "branchOfService"
        ).value,
          dateVeteranEntered:
        this.individaulVeteranRelativeDetailsForm.get(
          "dateEntered"
        ).value,
          dateVeteranLeft:
        this.individaulVeteranRelativeDetailsForm.get(
          "dateDischarged"
        ).value,
          verteranClaimNumber:
        this.individaulVeteranRelativeDetailsForm.get(
          "claimNumber"
        ).value,
          status: status,
      }

        let updatedHouseholdPersons =
 this.applyNowState?.houseHoldDetails.houseHoldPersons?.map(
                (person: IHouseHold) => {
                  const personToBeUpdated = {...person};
                   if (person.id?.toString() === this.currentUser?.id?.toString()) {
                   personToBeUpdated.veteranRelationInformation = {
                       ...personToBeUpdated.veteranRelationInformation,
                      ...vetInfo
                     };
                   }
                        return personToBeUpdated;
                }
            )
      if(storedHouseholdDetails) {
        if (this.currentUserIndex == "999") {
         const otherVet = { id:999,
              firstName: this.individaulVeteranRelativeDetailsForm.get('someOneOutSideVeteranName').value,
            veteranRelationInformation : vetInfo
          }

          this.service.updateHouseHoldDetails({
            ...storedHouseholdDetails,
            ...{otherVetPerson:otherVet},
          });
        } else {

          this.service.updateHouseHoldDetails({
            ...storedHouseholdDetails,
            ...{houseHoldPersons: updatedHouseholdPersons},
          });
        }
      }
        this.route.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_WHO_VETERAN_RELATIVE,
          { userId: this.currentUserIndex },
        ]);
    }

    previous() {
        this.route.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_MILATARY_SUMMARY,
        ]);
    }
    setOrResetValidator(user:IHouseHold) {
        const householdBenefits = this.service?.getAppliedBenefitsForIndividual(user) as string[];

        const fields = [{
            fieldName: 'veteranName',
            optionalProgram: ProgramConstants.IND_DETAIL_MILATARYBOS_OPTIONALPROGRAMS as string[],
            requiredProgram: ProgramConstants.IND_DETAIL_MILATARYBOS_REQUIREDPROGRAMS as string[]

        }, {
            fieldName: 'someOneOutSideVeteranName',
            optionalProgram: ProgramConstants.IND_DETAIL_MILATARYDE_OPTIONALPROGRAMS as string[],
            requiredProgram: ProgramConstants.IND_DETAIL_MILATARYBOS_REQUIREDPROGRAMS as string[]

        }, {
            fieldName: 'branchOfService',
            optionalProgram: ProgramConstants.IND_DETAIL_MILATARYDD_OPTIONALPROGRAMS as string[],
            requiredProgram: ProgramConstants.IND_DETAIL_MILATARYBOS_REQUIREDPROGRAMS as string[]

        }, {
            fieldName: 'dateEntered',
            optionalProgram: ProgramConstants.IND_CURRENTEDUCATION_EXPECTGRADUATE_OPTIONALPROGRAMS as string[],
            requiredProgram: [] as string[]

            }, {
            fieldName: 'dateDischarged',
                optionalProgram: ProgramConstants.IND_CURRENTEDUCATION_EXPECTGRADUATE_OPTIONALPROGRAMS as string[],
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
                    formGroup: this.individaulVeteranRelativeDetailsForm,
                    fields: fields
                } as RequiredOrOptionalValidatorField
            Utility.setOrClearValidatorForFieldWithDifferntPrograms(requiredOrOptionalValidatorField)
            this.individaulVeteranRelativeDetailsForm = requiredOrOptionalValidatorField.formGroup;
            this.requiredFields = [...requiredOrOptionalValidatorField.requiredFields] as any;
        }
    }
}
