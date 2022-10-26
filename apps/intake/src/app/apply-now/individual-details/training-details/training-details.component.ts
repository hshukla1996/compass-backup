import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { isThisISOWeek } from "date-fns";
import { IApplyNowState } from "../../+state/apply-now.models";
import { RoutePath } from "../../../shared/route-strategies";
import { UtilService } from "../../../shared/services/util.service";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import * as ProgramConstants from "../../../shared/constants/Individual_Programs_Constants";
import {
    IHouseHold,
    IHouseHoldDetails,
    ITrainingDetails,
    PageDirection,
} from "../../household/household-model";
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from "../../../shared/utilities/Utility";


@Component({
    selector: "ui-compass-training-details",
    templateUrl: "./training-details.component.html",
    styleUrls: ["./training-details.component.css"],
})
export class TrainingDetailsComponent implements OnInit {
    trainingDetailsForm: FormGroup | any | null;
    currentUser: IHouseHold = {};
    currentUserIndex!: string;
    trainingsMap!: any;
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
    applyNowState: IApplyNowState | undefined;
    fragment!: string;
    userTrainings!: any;
    maxDateRange = new Date().toISOString().slice(0, 10);
    nextFragment = 0;
    showNextFrgment = true;
    prevFragment = 1;
    showPrevFrgment = true;
    fieldDisplays:any = {};

    requiredFields=[] as string[]
    constructor(
        private fb: FormBuilder,
        private route: Router,
        private service: ApplyNowStoreService,
        private activedRoute: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private utilService: UtilService
    ) {}
    ngOnInit() {
        this.trainingDetailsForm = this.fb.group({
            nameOfTraining: ["", ],
            hrsSpendInProgramme: ["", ],
            programmeStartDate: ["", ],
            programmeEndDate: [""],
        });
      this.trainingDetailsForm.reset();

        this.activedRoute.params.subscribe((p) => {
          this.houseHoldDetails = this.service.getHouseHoldDetails;
          if (this.houseHoldDetails.houseHoldPersons) {
            this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
          }
          this.trainingsMap =
            {
              ...this.houseHoldDetails.pageAction?.trainingsMap,
            } || {};
            if (Object.keys(p).length == 0) {
                this.currentUserIndex =
                    this.utilService.getCurrentUserIdOnNoParams(
                        this.trainingsMap
                    );
            } else {
                this.currentUserIndex = p.userId || "";
            }

                this.currentUser =
                    this.service.extractUser(
                        this.houseHoldPersons,
                        this.currentUserIndex
                    ) || "";
          this.activedRoute.fragment.subscribe((fragment) => {
            this.fragment = fragment || "";
            if (this.fragment !== "new")
              this.setFormValues(this.fragment,this.currentUser);
          });
          this.setOrResetValidator(this.currentUser)
          this.trainingDetailsForm.controls['programmeStartDate'].setValidators([Utility.dateMaxValidator()]);
          this.trainingDetailsForm.controls['programmeEndDate'].setValidators([Utility.dateMinValidator()]);

          this.cd.detectChanges();

        });


    }
    setFormValues(fragment:any,currentUser:IHouseHold){

      let updatedFragment = fragment || '0';
      if (currentUser?.trainingInformation?.trainings) {
        updatedFragment = currentUser?.trainingInformation?.trainings?.length-1;
      }

      setTimeout(()=>{
      if(currentUser?.trainingInformation?.trainings?.length) {
          this.trainingDetailsForm.patchValue({
            nameOfTraining:
            currentUser.trainingInformation?.trainings[parseInt(updatedFragment)]
              ?.trainingInstitute,
            hrsSpendInProgramme:
            currentUser.trainingInformation?.trainings[parseInt(updatedFragment)]
              ?.estimatedHoursPerWeekCount,
            programmeStartDate:
            Utility.duetFormatDate(currentUser.trainingInformation?.trainings[parseInt(updatedFragment)]
            ?.trainingStartDate),
            programmeEndDate:
            Utility.duetFormatDate(currentUser.trainingInformation?.trainings[parseInt(updatedFragment)]
            ?.trainingEndDate),
          });
          }
      else {
        this.trainingDetailsForm.reset();
      }
        this.cd.detectChanges();
      },100)
     //   }, 100);

      this.cd.detectChanges();
    }

    get f() {
        return this.trainingDetailsForm.controls;
    }
    isFieldValid(field: string): boolean {
        if (this.trainingDetailsForm.get(field).status !== "VALID") {
        }
        return (
            this.trainingDetailsForm.get(field).status !== "VALID" &&
            this.trainingDetailsForm.get(field).touched
        );
    }
    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return "";
        }
        switch (field) {
            case "nameOfTraining":
                if (
                    this.trainingDetailsForm.get("nameOfTraining").errors
                        .required
                ) {
                    return "School Name is required.";
                }
                break;
            case "programmeStartDate":
                if (
                    this.trainingDetailsForm.get("programmeStartDate").errors
                        .required
                ) {
                    return "Program start date is required.";
                }
                else if (
                  this.trainingDetailsForm.get("programmeStartDate").errors
                    .invalidDate
                ) {
                  return "Date should not be more than today's date.";
                }
                if (this.trainingDetailsForm.get("programmeStartDate").errors.duetInvalidDate) {
                  return "duetInvalidDate"
                }
                break;
          case "programmeEndDate":
              if (
                this.trainingDetailsForm.get("programmeEndDate").errors
                  .invalidDate
              ) {
                return "Date should not be less than today's date.";
              }
              if (this.trainingDetailsForm.get("programmeEndDate").errors.duetInvalidDate) {
                return "duetInvalidDate"
              }
              break;
            case "hrsSpendInProgramme":
                if (
                    this.trainingDetailsForm.get("hrsSpendInProgramme").errors
                        .required
                ) {
                    return "Hours spent in programme is required.";
                }
                break;
            default:
                return "";

        }

        return "";
    }
    onSubmit(): void {
        this.service.validateAllFormFields(this.trainingDetailsForm);
        this.trainingDetailsForm.markAllAsTouched();
        if (this.trainingDetailsForm.status.toLowerCase() === "valid") {
            let isNextPage = false;
            this.trainingsMap[this.currentUserIndex] = true;

            const storedHouseholdDetails =this.service.getHouseHoldDetails;
            const trainingDetails = {
                trainingInstitute:
                    this.trainingDetailsForm.get("nameOfTraining").value,
                trainingStartDate:
                    this.trainingDetailsForm.get("programmeStartDate").value,
                trainingEndDate:
                    this.trainingDetailsForm.get("programmeEndDate").value,
                estimatedHoursPerWeekCount: this.trainingDetailsForm.get(
                    "hrsSpendInProgramme"
                ).value,
            };
          const storedTrainings =
            this.currentUser.trainingInformation?.trainings  || [];
          //iterantive over absent relatives , find the current from the absent relvative map and update address
          let currentTrainings: ITrainingDetails[];
          if (Number.isInteger(parseInt(this.fragment))) {
            currentTrainings = storedTrainings.map((td, i) => {
              if (i === parseInt(this.fragment)) {
                return trainingDetails;
              } else {
                return td;
              }
            });
          } else if(this.fragment === 'new') {
            currentTrainings = [
              ...storedTrainings,
              ...[trainingDetails],
            ];
          }
          else {
            const ind = storedTrainings.length? (storedTrainings.length - 1):storedTrainings.length
            const updatedStoredTraingings = [...storedTrainings]
            updatedStoredTraingings[ind] = trainingDetails
            currentTrainings = updatedStoredTraingings
          }
          const updatedHouseholdPersons =
              storedHouseholdDetails.houseHoldPersons?.map(
                    (person: IHouseHold) => {
                        const personToBeUpdated = { ...person };
                        if (
                            person.id?.toString() ===
                            this.currentUser.id?.toString()
                        ) {
                            personToBeUpdated.trainingInformation = {
                                isAttendingTraining: "Y",
                                trainings: currentTrainings,
                            };
                        }
                        return personToBeUpdated;
                    }
                );
            const updatedPageAction = {
                ...storedHouseholdDetails?.pageAction,
                trainingsMap: {
                    ...storedHouseholdDetails?.pageAction?.trainingsMap,
                    ...this.trainingsMap,
                },
                trainingDirection: PageDirection.NEXT,
            };
            if (storedHouseholdDetails)
                this.service.updateHouseHoldDetails({
                    ...storedHouseholdDetails,
                    ...{ pageAction: updatedPageAction },
                    ...{ houseHoldPersons: updatedHouseholdPersons },
                });

            this.trainingDetailsForm.reset();
            if (this.trainingsMap != null) {
                isNextPage = this.utilService.isNextPage(this.trainingsMap);
            }
            if (isNextPage) {
                this.utilService

                    .getCurrentUserIdPageAction(
                        this.trainingsMap,
                        PageDirection.NEXT
                    )

                    .subscribe((id: any) => {
                        this.currentUserIndex = id.toString();

                        this.route.navigate([
                            RoutePath.APPLYNOW +
                                "/" +
                                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                                "/" +
                                RoutePath.APPLYNOW_TRAINING_DETAILS,
                            { userId: this.currentUserIndex },
                        ],{fragment:this.fragment == "new" ? "new": ""});
                    });

                // this.init();
            } else {
                this.route.navigate([
                    RoutePath.APPLYNOW +
                        "/" +
                        RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                        "/" +
                        RoutePath.APPLYNOW_TRAINING_SUMMARY,
                ]);
            }
        }
    }
    previous(): void {

      this.trainingsMap[this.currentUserIndex] = false;
      const storeHouseholdDetails = this.service.getHouseHoldDetails;
      const updatedPageAction = {
        trainingsMap: { ...storeHouseholdDetails.pageAction?.studentsMap, ...this.trainingsMap },
        trainingDirection: PageDirection.BACK
      };

      this.service.updateHouseHoldDetails({ ...storeHouseholdDetails, ...{ pageAction: updatedPageAction } })

      if (Object.keys(this.trainingsMap)[0].toString() !== this.currentUserIndex.toString()) {
        this.utilService
          .getCurrentUserIdPageAction(this.trainingsMap, PageDirection.BACK)
          .subscribe((id: any) => {
            this.currentUserIndex = id.toString();
            this.route.navigate([
              RoutePath.APPLYNOW +
              "/" +
              RoutePath.APPLYNOW_INDIVIDUALDETAILS +
              "/" +
              RoutePath.APPLYNOW_TRAINING_DETAILS,
              { userId: this.currentUserIndex },
            ]);
          });
      } else {
        this.route.navigate([
          RoutePath.APPLYNOW +
          "/" +
          RoutePath.APPLYNOW_INDIVIDUALDETAILS +
          "/" +
          RoutePath.APPLYNOW_WHO_TRAIN,
        ]);
      }






    }



    setOrResetValidator(user:IHouseHold) {

        let householdBenefits = this.service?.getAppliedBenefitsForIndividual(user) as string[];

        const fields = [{
            fieldName: 'nameOfTraining',
            optionalProgram: [] as string[],
            requiredProgram: ProgramConstants.IND_TRAINING_DETAIL_INSTITUTENAME_REQUIREDPROGRAMS as string[]

        }, {
            fieldName: 'hrsSpendInProgramme',
            optionalProgram: [] as string[],
            requiredProgram: ProgramConstants.IND_TRAINING_DETAIL_HOURSWEEK_REQUIREDPROGRAMS as string[]

        }, {
            fieldName: 'programmeStartDate',
            optionalProgram: [] as string[],
            requiredProgram: ProgramConstants.IND_TRAINING_DETAIL_STARTDATE_REQUIREDPROGRAMS as string[]

        }, {
            fieldName: 'programmeEndDate',
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
                    formGroup: this.trainingDetailsForm,
                    fields: fields
                } as RequiredOrOptionalValidatorField
            Utility.setOrClearValidatorForFieldWithDifferntPrograms(requiredOrOptionalValidatorField)
            this.trainingDetailsForm = requiredOrOptionalValidatorField.formGroup;
            this.requiredFields = [...requiredOrOptionalValidatorField.requiredFields] as any;
        }
    }
}
