import { ChangeDetectorRef, Component, OnInit  } from "@angular/core";
import { FormGroup} from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { Store } from "@ngrx/store";
import {RoutePath} from "../../../shared/route-strategies";
import { AppStoreService } from "../../../app-store-service";
import { IHouseHold, IHouseHoldDetails, PageDirection } from "../../household/household-model";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { IApplyNowState } from "../../+state/apply-now.models";
import { UtilService } from "../../../shared/services/util.service";
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from "../../../shared/utilities/Utility";
import * as ProgramConstants from "../../../shared/constants/Individual_Programs_Constants";
import {
  IND_GEN_DETAIL_CITIZENSHIP_REQUIRED_PROGRAMS,
  IND_GEN_DETAIL_DOD_OPTIONAL_PROGRAM,
  IND_GEN_DETAIL_DOS_REQUIRED_PROGRAM, IND_GEN_DETAIL_GRAD_OPTIONAL_PROGRAM, IND_GEN_DETAIL_GRAD_REQUIRED_PROGRAM,
  IND_GEN_DETAIL_MARITALSTATUS_OPTIONAL_PROGRAMS,
  IND_GEN_DETAIL_MARITALSTATUS_REQUIRED_PROGRAMS, IND_GEN_DETAIL_RUNAWAY_REQUIRED_PROGRAM,
  IND_GEN_DETAIL_SPOUSENAME_OPTIONAL_PROGRAMS,
  INDIVIDUAL_PROGRAMS
} from "../../../shared/constants/Individual_Programs_Constants";
@Component({
    selector: "ui-compass-current-education-details",
    templateUrl: "./current-education-details.component.html",
    styleUrls: ["./current-education-details.component.css"],
})
export class CurrentEducationDetailsComponent implements OnInit {
    currentEducationDetailsForm: FormGroup | any | null;
    data: any;
      maxDateRange = new Date().toISOString().slice(0, 10);
    schoolTypes!: any;
    schoolGrades!: any;
    currentUser: IHouseHold = {};
    currentUserIndex!: string;
    studentsMap!: any;
    partTimeOrFullTime!: any;
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
    applyNowState: IApplyNowState | undefined;
    requiredFields=[] as string[]
  fieldDisplays:any = {};
    constructor(
        private fb: FormBuilder,
        private route: Router,
        private service: ApplyNowStoreService,
        private activedRoute: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private utilService: UtilService,
        private appService: AppStoreService
    ) {}

    ngOnInit() {
        this.currentEducationDetailsForm = this.fb.group({
            schoolName: ["", ],
            schoolType: ["", ],
            fullOrPartTime: ["", ],
            educationEndDate: ["", Utility.dateMinValidator()],
        });
      this.currentEducationDetailsForm.reset()
      this.maxDateRange = new Date().toISOString().slice(0, 10);
      this.houseHoldDetails = this.service.getHouseHoldDetails;
      if (this.houseHoldDetails.houseHoldPersons) {
        this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
      }
        this.studentsMap =
            {
                ...this.houseHoldDetails.pageAction?.studentsMap,
            } || {};

        this.activedRoute.params.subscribe((p) => {
          this.houseHoldDetails = this.service.getHouseHoldDetails;
          if (this.houseHoldDetails.houseHoldPersons) {
            this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
          }
            if (Object.keys(p).length == 0) {
                this.currentUserIndex =
                    this.utilService.getCurrentUserIdOnNoParams(
                        this.studentsMap
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
          this.currentEducationDetailsForm.controls['educationEndDate'].setValidators([Utility.dateMinValidator()]);
       //   if (Object.keys(p).length) {
            this.setFormValues()
         /// }

            this.cd.detectChanges();
        });
        this.appService.getSchoolTypes().subscribe((c) => {
            this.schoolTypes = c;
            this.cd.detectChanges();
        });
        this.appService.getSchoolGrades().subscribe((c) => {
            this.schoolGrades = c;
            this.cd.detectChanges();
        });

    }
    setEducationType(ptOrFt: string) {
        this.partTimeOrFullTime = ptOrFt;
    }

  setFormValues() {
    if (
      this.currentUser.currentEducation
    ) {
     setTimeout(() => {

        this.partTimeOrFullTime =
          this.currentUser.currentEducation?.fullOrPartTime || "";
        this.setEducationType(this.partTimeOrFullTime)
        this.currentEducationDetailsForm.setValue(this.currentUser.currentEducation)


    }, 100);
      this.cd.detectChanges();
    }
  }
    get f() {
        return this.currentEducationDetailsForm.controls;
    }
    isFieldValid(field: string): boolean {
        return (
            this.currentEducationDetailsForm.get(field).status !== "VALID" &&
            this.currentEducationDetailsForm.get(field).touched
        );
    }
    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return "";
        }
        switch (field) {
            case "schoolName":
                if (
                    this.currentEducationDetailsForm.get("schoolName").errors
                        .required
                ) {
                    return "School Name is required.";
                }
                break;
            case "schoolType":
                if (
                    this.currentEducationDetailsForm.get("schoolType").errors
                        .required
                ) {
                    return "School Type is required.";
                }
                break;
          case "educationEndDate":
            if (
              this.currentEducationDetailsForm.get("educationEndDate").errors.invalidDate) {
                return "Date must be in the future";
            }
            if (this.currentEducationDetailsForm.get("educationEndDate").errors.duetInvalidDate) {
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
         this.service.validateAllFormFields(
                    this.currentEducationDetailsForm
                );
            if (
                this.currentEducationDetailsForm.status.toLowerCase() ===
                "valid"
            ) {
        const storedHouseholdDetails = this.service.getHouseHoldDetails;
        const updatedHouseholdPersons =
          storedHouseholdDetails.houseHoldPersons?.map(
                (person: IHouseHold) => {
                    if (person.id === this.currentUser.id) {
                        const personToBeUpdated = { ...person };
                        personToBeUpdated.currentEducation = this.currentEducationDetailsForm.value;
                        console.log(personToBeUpdated);
                        return personToBeUpdated;
                    } else {
                        return person;
                    }
                }
            );

        let isNextPage = false;
        this.studentsMap[this.currentUserIndex] = true;
        const updatedPageAction = {
            ...storedHouseholdDetails?.pageAction,
            studentsMap: {
                ...storedHouseholdDetails?.pageAction?.studentsMap,
                ...this.studentsMap,
            },
            studentDirection: PageDirection.NEXT,
        };
        if (storedHouseholdDetails)
            this.service.updateHouseHoldDetails({
                ...storedHouseholdDetails,
                ...{ pageAction: updatedPageAction },
                ...{ houseHoldPersons: updatedHouseholdPersons },
            });
        if (this.studentsMap != null) {
            isNextPage = this.utilService.isNextPage(this.studentsMap);
        }
        if (isNextPage) {
            this.utilService

                .getCurrentUserIdPageAction(
                    this.studentsMap,
                    PageDirection.NEXT
                )

                .subscribe((id: any) => {
                    this.currentUserIndex = id.toString();
                  this.currentEducationDetailsForm.reset()
                    this.route.navigate([
                        RoutePath.APPLYNOW +
                            "/" +
                            RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                            "/" +
                            RoutePath.APPLYNOW_CURRENT_EDUCATON_DETAILS,
                        { userId: this.currentUserIndex },
                    ]);
                });

            // this.init();
        } else {
            this.route.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                    "/" +
                    RoutePath.APPLYNOW_CURRENT_EDUCATON_SUMMARY,
            ]);
        }
    }
    }
    previous(): void {

      this.studentsMap[this.currentUserIndex] = false;
      const storeHouseholdDetails = this.service.getHouseHoldDetails;
      const updatedPageAction = {
        studentsMap: { ...storeHouseholdDetails.pageAction?.studentsMap, ...this.studentsMap },
        studentDirection: PageDirection.NEXT
      };

      this.service.updateHouseHoldDetails({ ...storeHouseholdDetails, ...{ pageAction: updatedPageAction } })

      if (Object.keys(this.studentsMap)[0].toString() !== this.currentUserIndex.toString()) {
        this.utilService
          .getCurrentUserIdPageAction(this.studentsMap, PageDirection.BACK)
          .subscribe((id: any) => {
            this.currentUserIndex = id.toString();
            this.route.navigate([
              RoutePath.APPLYNOW +
              "/" +
              RoutePath.APPLYNOW_INDIVIDUALDETAILS +
              "/" +
              RoutePath.APPLYNOW_CURRENT_EDUCATON_DETAILS,
              { userId: this.currentUserIndex },
            ]);
          });
      } else {
        this.route.navigate([
          RoutePath.APPLYNOW +
          "/" +
          RoutePath.APPLYNOW_INDIVIDUALDETAILS +
          "/" +
          RoutePath.APPLYNOW_WHO_CURRENT_STUDENT,
        ]);
      }


    }
    setOrResetValidator(currentUser:IHouseHold){
        const householdBenefits = this.service?.getAppliedBenefitsForIndividual(currentUser) as string[];
        const fields = [{
            fieldName: 'schoolName',
            optionalProgram: ProgramConstants.IND_CURRENTEDUCATION_SCHOOLNAME_OPTIONALPROGRAMS as string[],
            requiredProgram: ProgramConstants.IND_CURRENTEDUCATION_SCHOOLNAME_REQUIREDPROGRAMS as string[]

        }, {
            fieldName: 'schoolType',
            optionalProgram: ProgramConstants.IND_CURRENTEDUCATION_SCHOOLTYPE_OPTIONALPROGRAMS as string[],
            requiredProgram: ProgramConstants.IND_CURRENTEDUCATION_SCHOOLTYPE_REQUIREDPROGRAMS as string[]

        }, {
            fieldName: 'fullOrPartTime',
            optionalProgram: ProgramConstants.IND_CURRENTEDUCATION_ATTENDSCHOOLE_OPTIONALPROGRAMS as string[],
            requiredProgram: ProgramConstants.IND_CURRENTEDUCATION_ATTENDSCHOOLE_REQUIREDPROGRAMS as string[]

        }, {
            fieldName: 'educationEndDate',
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
                    formGroup: this.currentEducationDetailsForm,
                    fields: fields
                } as RequiredOrOptionalValidatorField
            Utility.setOrClearValidatorForFieldWithDifferntPrograms(requiredOrOptionalValidatorField)
            this.currentEducationDetailsForm = requiredOrOptionalValidatorField.formGroup;
            this.requiredFields = [...requiredOrOptionalValidatorField.requiredFields] as any;
        }
    }
}
