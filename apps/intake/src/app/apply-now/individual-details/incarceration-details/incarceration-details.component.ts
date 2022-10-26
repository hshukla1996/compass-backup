import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { IApplyNowState, IFromSummary } from '../../+state/apply-now.models';
import { IHouseHold, PageDirection } from '../../household/household-model';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, delay, of } from 'rxjs';
import { AppStoreService } from '../../../app-store-service';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowIndividualDetailsCurrentSnapOrTanfBenefitsStrategy } from '../../../shared/route-strategies/apply-now/individual-details-current-snap-or-tanf-benefits';
import { ScreenQueueUtil } from '../individuals-legal-gatepost/individuals-legal-gatepost.path';
import { UtilService } from "../../../shared/services/util.service";
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from "../../../shared/utilities/Utility";
import * as ProgramConstants from "../../../shared/constants/Individual_Programs_Constants";

@Component({
  selector: 'compass-ui-incarceration-details',
  templateUrl: './incarceration-details.component.html',
  styleUrls: ['./incarceration-details.component.scss']
})
export class IncarcerationDetailsComponent implements OnInit {
    incarcerationDetailsForm!: FormGroup;
    applyNowState: IApplyNowState | undefined;
    householdPersons: IHouseHold[] = [];
    householdMembers: any[] = [];
    currentlyInPrisonMap: any[] = [];
    countys$: Observable<any> | undefined;
    countys: any;
    individualLabel = "";
    userName = "John";
    currentUser: IHouseHold = {};
    currentUserIndex!: any;
    details!: any;
    formSubmitAttempt: boolean = false;
    maxDateRange: any;
    showError = false;
    fromSummaryData!: IFromSummary;
    requiredFields=[] as string[];
    isDateValid = true;

    constructor(private fb: FormBuilder,
    private service: ApplyNowStoreService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private appService: AppStoreService,
    private utilService: UtilService) { }

    ngOnInit(): void {
        this.maxDateRange = new Date().toISOString().slice(0, 10);
        this.incarcerationDetailsForm = this.fb.group({
            countyOfPlacement: [''],
            incarceratedAdmissionDate: ['', Utility.dateMaxValidator()],
            incarceratedDischargeDate: ['']
        });
        this.service.getAppData().subscribe((d) => {
            this.applyNowState = { ...d };
            this.countys$ = this.appService.getCountyOfPlacement();
            this.countys$?.subscribe((s) => {
                this.countys = s;
                this.cd.detectChanges();
            });
            this.householdPersons = this.applyNowState.houseHoldDetails?.houseHoldPersons || [];
            this.fromSummaryData = this.service.getFromSummaryData() as IFromSummary;
            this.currentlyInPrisonMap = {...this.applyNowState.houseHoldDetails.pageAction?.currentlyInPrisonMap} || {};
            this.cd.detectChanges();
        });

         this.activedRoute.params.subscribe((p) => {
            if (Object.keys(p).length == 0) {
                this.currentUserIndex =
                    this.utilService.getCurrentUserIdOnNoParams(
                        this.currentlyInPrisonMap
                    );
            } else {
                this.currentUserIndex = p.userId || "";
            }
            if (this.householdPersons.length > 0) {
                this.currentUser =
                    this.service.extractUser(
                        this.householdPersons,
                        this.currentUserIndex
                    ) || "";
            }
            this.userName = this.currentUser.firstName!;
            this.individualLabel = "Tell us {replace}'s incarceration details.";
            this.individualLabel = this.individualLabel.replace(this.individualLabel.split("us ")[1].split("'")[0], this.userName);
            this.incarcerationDetailsForm.get('countyOfPlacement')!.patchValue('');
            this.incarcerationDetailsForm.get('incarceratedAdmissionDate')!.patchValue('');
            this.incarcerationDetailsForm.get('incarceratedDischargeDate')!.patchValue('');
            this.incarcerationDetailsForm.reset();
            this.cd.detectChanges();
        });

        this.applyNowState?.houseHoldDetails.houseHoldPersons!.forEach((person: IHouseHold) => {
            const clonedPerson = { ...person };
            if (clonedPerson.firstName === this.userName) {
                this.details = clonedPerson.incarcerated!
                of(true).pipe(delay(10)).subscribe(() => {
                    this.incarcerationDetailsForm.patchValue({
                        countyOfPlacement: this.details?.countyOfPlacement,
                        incarceratedAdmissionDate: Utility.duetFormatDate(this.details?.incarceratedAdmissionDate),
                        incarceratedDischargeDate: Utility.duetFormatDate(this.details?.incarceratedDischargeDate)
                    })
                });
            }
        });
        
        this.individualLabel = "Tell us {replace}'s incarceration details.";
        this.individualLabel = this.individualLabel.replace(this.individualLabel.split("us ")[1].split("'")[0], this.userName);
        this.setOrResetValidator();
    }

    isFieldValid(field: string): boolean {
        return (
            this.incarcerationDetailsForm.get(field)!.status !== "VALID" &&
            this.incarcerationDetailsForm.get(field)!.touched
        );
    }

    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return "";
        }
        switch (field) {
            case 'countyOfPlacement':
                if (this.incarcerationDetailsForm.get("countyOfPlacement")!.errors!.required) {
                    return "This is required";
                }
                break;
            case 'incarceratedAdmissionDate':
                if (this.incarcerationDetailsForm.get("incarceratedAdmissionDate")!.errors!.required) {
                    return "This is required";
                }
                if (this.incarcerationDetailsForm.get('incarceratedAdmissionDate')!.errors?.invalidDate) {
                    return 'Date must be in the past.'
                }
                if (this.incarcerationDetailsForm.get("incarceratedAdmissionDate")!.errors?.duetInvalidDate) {
                    return "duetInvalidDate";
                }
                break;
            case 'incarceratedDischargeDate':
                if (this.incarcerationDetailsForm.get("incarceratedDischargeDate")!.errors!.required) {
                    return "This is required";
                }
                if (this.incarcerationDetailsForm.get("incarceratedDischargeDate")!.errors?.duetInvalidDate) {
                    return "duetInvalidDate";
                }
                break;
        }
        return "";
    }
    
    next() {
        this.service.validateAllFormFields(this.incarcerationDetailsForm);
        this.formSubmitAttempt = true;
        this.showError = this.incarcerationDetailsForm.status === "VALID" ? false : true;
        if (this.formSubmitAttempt && !this.showError) {
            const storedHouseholdDetails = this.applyNowState?.houseHoldDetails;
            const clonedUpdatedPerson: IHouseHold[] = [];

            this.applyNowState?.houseHoldDetails.houseHoldPersons!.forEach((person: IHouseHold) => {
                const clonedPerson = { ...person };
                if (clonedPerson.firstName === this.userName) {
                    clonedPerson.incarcerated = { ...this.incarcerationDetailsForm.value }
                }
                clonedUpdatedPerson.push(clonedPerson);
            });

            let isNextPage = false;
            this.currentlyInPrisonMap[this.currentUserIndex] = true;
            const updatedPageAction = {
                ...storedHouseholdDetails?.pageAction,
                currentlyInPrisonMap: {
                    ...storedHouseholdDetails?.pageAction?.currentlyInPrisonMap,
                    ...this.currentlyInPrisonMap,
                },
                currentlyInPrisonDirection: PageDirection.NEXT,
            };

            if (storedHouseholdDetails) {
                 this.service.updateHouseHoldDetails({
                    ...storedHouseholdDetails,
                    ...{ houseHoldPersons: clonedUpdatedPerson, pageAction: updatedPageAction },
                });
            }
            if (this.fromSummaryData?.isFromEdit) {
                this.router.navigate([
                    RoutePath.APPLYNOW +
                        "/" +
                        RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                        "/" +
                        RoutePath.APPLYNOW_INDIVIDUALDETAILS_INCARCERATIONSUMMARY,
                ]);
            }
            if (this.currentlyInPrisonMap != null) {
                isNextPage = this.utilService.isNextPage(this.currentlyInPrisonMap);
            }
            
            if (isNextPage) {
                this.utilService
                    .getCurrentUserIdPageAction(
                        this.currentlyInPrisonMap,
                        PageDirection.NEXT
                    )
                    .subscribe((id: any) => {
                        this.currentUserIndex = id.toString();
                        this.router.navigate([
                            RoutePath.APPLYNOW +
                                "/" +
                                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                                "/" +
                                RoutePath.APPLYNOW_INDIVIDUALDETAILS_INCARCERATIONDETAILS,
                            { userId: this.currentUserIndex },
                        ]);
                    });
            } else {
                this.router.navigate([
                    RoutePath.APPLYNOW +
                        "/" +
                        RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                        "/" +
                        RoutePath.APPLYNOW_INDIVIDUALDETAILS_INCARCERATIONSUMMARY,
                ]);
            }
        }
    }

    back() {
        this.router.navigate([
        RoutePath.APPLYNOW +
          "/" +
          RoutePath.APPLYNOW_INDIVIDUALDETAILS +
          "/" +
          RoutePath.APPLYNOW_INDIVIDUALDETAILS_CURRENTLYINPRISON,
          { userId: this.currentUserIndex },
    ]);
    }

    setOrResetValidator(){
        let householdBenefits = this.service?.getBenefits() as string[];
        const fields = [{
            fieldName: 'countyOfPlacement',
            optionalProgram: [] as string[],
            requiredProgram: ProgramConstants.IND_INCARCERATION_COUNTYOFPLACEMENT_REQUIREDPROGRAMS as string[]
        }, {
            fieldName: 'incarceratedAdmissionDate',
            optionalProgram: [] as string[],
            requiredProgram: ProgramConstants.IND_INCARCERATION_INCARCERATIONADMISSIONDATE_REQUIREDPROGRAMS as string[]
        }, {
            fieldName: 'incarceratedDischargeDate',
            optionalProgram: ProgramConstants.IND_INCARCERATION_INCARCERATIONRELEASEDATE_OPTIONALPROGRAMS as string[],
            requiredProgram: ProgramConstants.IND_INCARCERATION_INCARCERATIONRELEASEDATE_REQUIREDPROGRAMS as string[]
        }
        ] as FormValidatorField[]
        if (householdBenefits != null && householdBenefits.length > 0) {
            const requiredOrOptionalValidatorField =
                {

                    selectedPrograms: householdBenefits,
                    requiredFields: this.requiredFields,
                    formGroup: this.incarcerationDetailsForm,
                    fields: fields
                } as RequiredOrOptionalValidatorField
            Utility.setOrClearValidatorForFieldWithDifferntPrograms(requiredOrOptionalValidatorField)
            this.incarcerationDetailsForm = requiredOrOptionalValidatorField.formGroup;
            this.requiredFields = [...requiredOrOptionalValidatorField.requiredFields] as any;
        }
    }
}