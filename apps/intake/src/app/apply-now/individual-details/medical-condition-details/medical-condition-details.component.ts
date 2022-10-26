import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RoutePath } from '../../../shared/route-strategies';
import { Observable, delay, of } from 'rxjs';
import { IApplyNowState } from '../../+state/apply-now.models';
import { UtilService } from '../../../shared/services/util.service';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, PageDirection } from '../../household/household-model';
import { AppStoreService } from '../../../app-store-service';
import { ScreenQueueUtil } from '../individuals-medical-gatepost/individuals-medical-gatepost.path';
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from "../../../shared/utilities/Utility";
import * as ProgramConstants from "../../../shared/constants/Individual_Programs_Constants";

@Component({
  selector: 'compass-ui-medical-condition-details',
  templateUrl: './medical-condition-details.component.html',
  styleUrls: ['./medical-condition-details.component.scss']
})
export class MedicalConditionDetailsComponent implements OnInit {
    medicalConditionDetailsForm!: FormGroup;
    individualLabel = "";
    applyNowState: IApplyNowState | undefined;
    householdPersons: IHouseHold[] = [];
    householdMembers: any[] = [];
    medicalConditionMap: any[] = [];
    currentUser: IHouseHold = {};
    currentUserIndex!: any;
    userName = "John";
    showError = false;
    disabilitys$: Observable<any> | undefined;
    disabilitys: any;
    ssis$: Observable<any> | undefined;
    ssis: any;
    childDisabilitys$: Observable<any> | undefined;
    childDisabilitys: any;
    formSubmitAttempt = false;
    details!: any;
    isChild = false;
    maxDateRange: any;
    parentValid = false;
    childValid = false;
    requiredFields=[] as string[];

    constructor(private fb: FormBuilder,
    private service: ApplyNowStoreService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private appService: AppStoreService,
    private activedRoute: ActivatedRoute,
    private utilService: UtilService) { }

    ngOnInit(): void {
        this.maxDateRange = new Date().toISOString().slice(0, 10);
        this.medicalConditionDetailsForm = this.fb.group({
            medicalCondition: [''],
            beginDate: ['', Utility.dateMaxValidator()],
            disability: [''],
            ableToWork: [''],
            careChildren: [''],
            ssi: [''],
            childDisability: [''],
            developmentAge: [''],
        });
        this.service.getAppData().subscribe((d) => {
            this.applyNowState = { ...d };
            this.disabilitys$ = this.appService.getDisabilityType();
            this.ssis$ = this.appService.getDisabilitySsi();
            this.childDisabilitys$ = this.appService.getChildDisability();
            this.disabilitys$?.subscribe((s) => {
                this.disabilitys = s;
                this.cd.detectChanges();
            });
            this.ssis$?.subscribe((s) => {
                this.ssis = s;
                this.cd.detectChanges();
            });
            this.childDisabilitys$?.subscribe((s) => {
                this.childDisabilitys = s;
                this.cd.detectChanges();
            });
            this.householdPersons = this.applyNowState.houseHoldDetails?.houseHoldPersons || [];
            this.medicalConditionMap = {...this.applyNowState.houseHoldDetails.pageAction?.medicalConditionMap} || {};
            this.cd.detectChanges();
        });

        this.activedRoute.params.subscribe((p) => {
            if (Object.keys(p).length == 0) {
                this.currentUserIndex =
                    this.utilService.getCurrentUserIdOnNoParams(
                        this.medicalConditionMap
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
            this.individualLabel = "Tell us about {replace}'s medical condition.";
            this.individualLabel = this.individualLabel.replace("{replace}", this.userName);
            if (this.getAge(this.currentUser.dateOfBirth) < 19) {
                this.isChild = true;
                this.medicalConditionDetailsForm.get('medicalCondition')!.patchValue('');
                this.medicalConditionDetailsForm.get('beginDate')!.patchValue('');
            }
            this.medicalConditionDetailsForm.reset();
            this.cd.detectChanges();
        });
        
        
        this.applyNowState?.houseHoldDetails.houseHoldPersons!.forEach((person: IHouseHold) => {
            const clonedPerson = { ...person };
            if (clonedPerson.firstName === this.userName) {
                if (this.getAge(this.currentUser.dateOfBirth) < 19) {
                    this.isChild = true;
                    this.details = clonedPerson.medicalConditionDetails!;
                    of(true).pipe(delay(10)).subscribe(() => {
                        this.medicalConditionDetailsForm.patchValue({
                            medicalCondition: this.details?.medicalCondition,
                            beginDate: Utility.duetFormatDate(this.details?.beginDate),
                            childDisability: this.details?.childDisability,
                            developmentAge: this.details?.developmentAge
                        })
                    });
                }
                else {
                    this.details = clonedPerson.medicalConditionDetails!;
                    of(true).pipe(delay(10)).subscribe(() => {
                        this.medicalConditionDetailsForm.patchValue({
                            medicalCondition: this.details?.medicalCondition,
                            beginDate: this.details?.beginDate,
                            disability: this.details?.disability,
                            ableToWork:Utility.getYesNoValue(this.details?.ableToWork),
                            careChildren: Utility.getYesNoValue(this.details?.careChildren),
                            ssi: this.details?.ssi
                        })
                    });
                }
            }
        });
        this.setOrResetValidator();
    }
    getYesNoValue(value:string){

    }

    isFieldValid(field: string): boolean {
        return (
            this.medicalConditionDetailsForm.get(field)!.status !== "VALID" &&
            this.medicalConditionDetailsForm.get(field)!.touched
        );
    }

    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return "";
        }
        switch (field) {
            case 'medicalCondition':
                if (this.medicalConditionDetailsForm.get("medicalCondition")!.errors!.required) {
                    return "This is required";
                }
                break;
            case 'beginDate':
                if (this.medicalConditionDetailsForm.get("beginDate")!.errors!.required) {
                    return "This is required";
                }
                if (this.medicalConditionDetailsForm.get('beginDate')!.errors?.invalidDate) {
                    return 'Date must be in the past.'
                }
                if (this.medicalConditionDetailsForm.get("beginDate")!.errors?.duetInvalidDate) {
                    return "duetInvalidDate";
                }
                break;
            case 'disability':
                if (this.medicalConditionDetailsForm.get("disability")!.errors!.required) {
                    return "This is required";
                }
                break;
            case 'ableToWork':
                if (this.medicalConditionDetailsForm.get("ableToWork")!.errors!.required) {
                    return "This is required";
                }
                break;
            case 'careChildren':
                if (this.medicalConditionDetailsForm.get("careChildren")!.errors!.required) {
                    return "This is required";
                }
                break;
            case 'ssi':
                if (this.medicalConditionDetailsForm.get("ssi")!.errors!.required) {
                    return "This is required";
                }
                break;
            case 'childDisability':
                if (this.medicalConditionDetailsForm.get("childDisability")!.errors!.required) {
                    return "This is required";
                }
                break;
            case 'developmentAge':
                if (this.medicalConditionDetailsForm.get("developmentAge")!.errors!.required) {
                    return "This is required";
                }
                break;
        }
        return "";
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

    next() {
        debugger
        this.service.validateAllFormFields(this.medicalConditionDetailsForm);
        this.formSubmitAttempt = true;
        this.medicalConditionDetailsForm.value.ableToWork = this.medicalConditionDetailsForm.value.ableToWork.charAt(0);
        this.medicalConditionDetailsForm.value.careChildren = this.medicalConditionDetailsForm.value.careChildren.charAt(0);
        this.parentValid = this.medicalConditionDetailsForm.get('medicalCondition')!.status === "VALID"
                        && this.medicalConditionDetailsForm.get('beginDate')!.status === "VALID"
                        && this.medicalConditionDetailsForm.get('disability')!.status === "VALID"
                        && this.medicalConditionDetailsForm.get('ableToWork')!.status === "VALID"
                        && this.medicalConditionDetailsForm.get('careChildren')!.status === "VALID"
                        && this.medicalConditionDetailsForm.get('ssi')!.status === "VALID"
        
        this.childValid = this.medicalConditionDetailsForm.get('medicalCondition')!.status === "VALID"
                    &&  this.medicalConditionDetailsForm.get('beginDate')!.status === "VALID"
                    &&  this.medicalConditionDetailsForm.get('childDisability')!.status === "VALID"
                    &&  this.medicalConditionDetailsForm.get('developmentAge')!.status === "VALID"

        if (this.formSubmitAttempt && (this.parentValid || this.childValid)) {
            const storedHouseholdDetails = this.applyNowState?.houseHoldDetails;
            const clonedUpdatedPerson: IHouseHold[] = [];

            this.applyNowState?.houseHoldDetails.houseHoldPersons!.forEach((person: IHouseHold) => {
                const clonedPerson = { ...person };
                if (clonedPerson.firstName === this.userName) {
                    clonedPerson.medicalConditionDetails = { ...this.medicalConditionDetailsForm.value }
                }
                clonedUpdatedPerson.push(clonedPerson);
            });

            let isNextPage = false;
            this.medicalConditionMap[this.currentUserIndex] = true;
            const updatedPageAction = {
                ...storedHouseholdDetails?.pageAction,
                medicalConditionMap: {
                    ...storedHouseholdDetails?.pageAction?.medicalConditionMap,
                    ...this.medicalConditionMap,
                },
                medicalConditionDirection: PageDirection.NEXT,
            };

            if (storedHouseholdDetails) {
                this.service.updateHouseHoldDetails({
                    ...storedHouseholdDetails,
                    ...{ houseHoldPersons: clonedUpdatedPerson, pageAction: updatedPageAction },
                });
            }

            if (this.medicalConditionMap != null) {
                isNextPage = this.utilService.isNextPage(this.medicalConditionMap);
            }

            if (isNextPage) {
                this.utilService
                    .getCurrentUserIdPageAction(
                        this.medicalConditionMap,
                        PageDirection.NEXT
                    )
                    .subscribe((id: any) => {
                        this.currentUserIndex = id.toString();
                        this.router.navigate([
                            RoutePath.APPLYNOW +
                                "/" +
                                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                                "/" +
                                RoutePath.APPLYNOW_INDIVIDUALDETAILS_MEDICALCONDITIONDETAILS,
                            { userId: this.currentUserIndex },
                        ]);
                    });
            } else {
                this.router.navigate([
                    RoutePath.APPLYNOW +
                        "/" +
                        RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                        "/" +
                        RoutePath.APPLYNOW_INDIVIDUALDETAILS_MEDICALCONDITIONSUMMARY,
                ]);
            }
        }
    }

    checkChar(character: any) {
        var k;
        k = character.charCode;
        return ((k > 64 && k < 91) || (k > 96 && k < 123) || (k > 47 && k < 58) || k == 39 || k == 92 || k == 45);
    }

    back() {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS_MEDICALCONDITION,
        ]);
    }

    setOrResetValidator(){
        let householdBenefits = this.service?.getBenefits() as string[];
        const fields = [{
            fieldName: 'medicalCondition',
            optionalProgram: ProgramConstants.IND_MEDICALCONDITION_MEDICALCONDITION_OPTIONALPROGRAMS as string[],
            requiredProgram: ProgramConstants.IND_MEDICALCONDITION_MEDICALCONDITION_REQUIREDPROGRAMS as string[]
        }, {
            fieldName: 'beginDate',
            optionalProgram: [] as string[],
            requiredProgram: ProgramConstants.IND_MEDICALCONDITION_BEGINDATE_REQUIREDPROGRAMS as string[]
        }, {
            fieldName: 'disability',
            optionalProgram: [] as string[],
            requiredProgram: ProgramConstants.IND_MEDICALCONDITION_DISABILITY_REQUIREDPROGRAMS as string[]
        }, {
            fieldName: 'ableToWork',
            optionalProgram: [] as string[],
            requiredProgram: ProgramConstants.IND_MEDICALCONDITION_ABLETOWORK_REQUIREDPROGRAMS as string[]
        }, {
            fieldName: 'careChildren',
            optionalProgram: [] as string[],
            requiredProgram: ProgramConstants.IND_MEDICALCONDITION_CARECHILDREN_REQUIREDPROGRAMS as string[]
        }, {
            fieldName: 'ssi',
            optionalProgram: [] as string[],
            requiredProgram: ProgramConstants.IND_MEDICALCONDITION_SSI_REQUIREDPROGRAMS as string[]
        }, {
            fieldName: 'childDisability',
            optionalProgram: [] as string[],
            requiredProgram: ProgramConstants.IND_MEDICALCONDITION_CHILDDISABILITY_REQUIREDPROGRAMS as string[]
        }, {
            fieldName: 'developmentAge',
            optionalProgram: ProgramConstants.IND_MEDICALCONDITION_DEVELOPMENTAGE_OPTIONALPROGRAMS as string[],
            requiredProgram: [] as string[]
        }
        
        ] as FormValidatorField[]
        if (householdBenefits != null && householdBenefits.length > 0) {
            const requiredOrOptionalValidatorField =
                {

                    selectedPrograms: householdBenefits,
                    requiredFields: this.requiredFields,
                    formGroup: this.medicalConditionDetailsForm,
                    fields: fields
                } as RequiredOrOptionalValidatorField
            Utility.setOrClearValidatorForFieldWithDifferntPrograms(requiredOrOptionalValidatorField)
            this.medicalConditionDetailsForm = requiredOrOptionalValidatorField.formGroup;
            this.requiredFields = [...requiredOrOptionalValidatorField.requiredFields] as any;
        }
    }
}