import { ChangeDetectorRef, Component, Directive, EventEmitter, OnInit, Output, } from "@angular/core";
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators, AbstractControl, FormArray, } from "@angular/forms";
import { ApplyNowHouseholdHeadStrategy } from "../../../shared/route-strategies/apply-now/householdHead";
import { ActivatedRoute, Router } from "@angular/router";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { AppStoreService } from "../../../app-store-service";
import { IApplyNowState } from "../../+state/apply-now.models";
import { delay, Observable, of } from "rxjs";
import { IHouseHold } from "../household-model";
import { UtilService } from "../../../shared/services/util.service";
import { Utility } from "../../../shared/utilities/Utility";

@Component({
    selector: "compass-ui-household-head",
    templateUrl: "./household-head.component.html",
    styleUrls: ["./household-head.component.scss"],
    providers: [ApplyNowHouseholdHeadStrategy],
})
export class HouseholdHeadComponent implements OnInit {
    householdHeadForm: FormGroup | any;
    private formSubmitAttempt: boolean = false;
    firstNamelocal: string = "";
    genderError: boolean = false;
    applyNowState!: IApplyNowState;
    maxDateRange: any;
    suffixls: any[] = [];
    editedMember!: any;
    showAnotherName = false;
    memberRelationshipList!: FormArray;
    basicDetails: IHouseHold[] = [];
    relationships$: Observable<any> | undefined;
    relationships: any;
    basicDetails_relations: any;
    isDateValid = true;
    maleRelationship: any;
    femaleRelationship: any;
    today = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
    constructor(
        private fb: FormBuilder,
        private househead: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private service: ApplyNowStoreService,
        private cd: ChangeDetectorRef,
        private routingStratagy: ApplyNowHouseholdHeadStrategy,
        private appService: AppStoreService,
        private utilService: UtilService
    ) {
    }
    creatememberRelationship(): FormGroup {
        return this.fb.group({
            [this.basicDetails_relations[this.memberRelationshipList.length].id]: [null, [Validators.required]]
        });
    }
    get memberRelationshipFormGroup() {
        return this.householdHeadForm.get('memberRelationships') as FormArray;
    }
    ngOnInit(): void {
        const memberId = this.route.snapshot.paramMap.get("userId");

        this.maxDateRange = new Date().toISOString().slice(0, 10);
        this.householdHeadForm = this.fb.group({
            id: [''],
            firstName: ['', [Validators.required, Validators.pattern('[A-Za-z\-\'\\\\]+'), Validators.maxLength(11)]],
            midName: ['', [Validators.pattern('[A-Za-z]+'), Validators.maxLength(1)]],
            lastName: ['', [Validators.required, Validators.pattern('[A-Za-z\-\'\\\\]+'), Validators.maxLength(14)]],
            suffix: [''],
            dateOfBirth: ['', [Validators.required, Validators.maxLength(10), Utility.dateMaxValidator()]],
            gender: ['', Validators.required],
            otherName: [''],
            otherNameVal: [
                "",
                [
                this.myFormValidator(
                    () =>
                        this.householdHeadForm.value.otherName.includes(
                            "Y"
                        ),
                    Validators.required
                ),
                Validators.pattern("[A-Za-z-'\\\\]+"),
                Validators.maxLength(30),
            ],
            ],
            memberRelationships: this.fb.array([])
        });
        this.memberRelationshipList = this.householdHeadForm.get('memberRelationships') as FormArray;
        this.loadRelationship();


        this.service.getAppData().subscribe(d => {
            this.applyNowState = { ...d };
            this.editedMember =
                this.applyNowState.houseHoldDetails.houseHoldPersons ? this.applyNowState.houseHoldDetails.houseHoldPersons[0] : null;

            if (this.editedMember) {
                const editedMemberdata: any = {}
                for (const i in this.editedMember) {
                    if (i !== 'isThisIndividualHeadOfHousehold')
                        editedMemberdata[i] = this.editedMember[i]
                }
                this.householdHeadForm.setValue(editedMemberdata);
            }
            if (
                this.applyNowState.houseHoldDetails.householdHead.otherName ==
                "Y"
            ) {
                this.showAnotherName = true;
            }
            this.firstNamelocal =
                this.applyNowState.houseHoldDetails.householdHead.firstName ||
                "";
            this.cd.detectChanges();
        });

        this.householdHeadForm
            .get("otherNameVal")
            .valueChanges.subscribe((selectedValue: string) => {
                if (selectedValue === "Y") {
                    this.householdHeadForm
                        .get("otherNameVal")
                        .setValidators(Validators.required);
                } else {
                    this.householdHeadForm
                        .get("otherNameVal")
                        .clearValidators();
                }
            });

        this.appService.getSuffix().subscribe((suffix: any[]) => {
            let newSuffix = [...suffix];
            newSuffix.sort((a: any, b: any) => {
                return a.additionalColumns.FlexOrder - b.additionalColumns.FlexOrder
            });
            this.suffixls = newSuffix;

            this.cd.detectChanges();
        });
        this.appService.getMaleRelationships().subscribe((c: any) => {

            this.maleRelationship = c;

        });

        this.appService.getFemaleRelationships().subscribe((c: any) => {

            this.femaleRelationship = c;

        });
        this.basicDetails = this.service.getBasicDetails();
        this.basicDetails_relations = this.basicDetails.filter((ind) => ind.id !== this.getMinId());
        this.basicDetails_relations.forEach(() => this.memberRelationshipList.push(this.creatememberRelationship()))
        this.loadValues();

    }

    getMinId() {

        if (this.basicDetails.length == 0) return -1;
        const ids = this.basicDetails.map(person => {
            return person.id!;
        });
        const min = Math.min(...ids);
        return min;

    }

    loadValues() {
        const detail = this.service.getBasicDetails();

        if (detail.length > 0) {
            const index = this.getHouseHoldIndex();
            const data = (index > 0) ? detail[index] : detail[0];
            this.householdHeadForm.controls['firstName'].patchValue(data?.firstName)
            this.householdHeadForm.controls['midName'].patchValue(data?.midName)
            this.householdHeadForm.controls['lastName'].patchValue(data?.lastName)
            this.householdHeadForm.controls['suffix'].patchValue(data?.suffix)
            this.householdHeadForm.controls['dateOfBirth'].patchValue(Utility.duetFormatDate(data?.dateOfBirth));
            this.householdHeadForm.controls['gender'].patchValue((data?.gender === "M") ? "Male" : "Female")
            this.householdHeadForm.controls['otherName'].patchValue(data?.otherName ? (data?.otherName === "Y" ? "Yes" : "No") : '')
            this.householdHeadForm.controls['otherNameVal'].patchValue(data?.otherNameVal)
            this.householdHeadForm.controls['memberRelationships'].patchValue(data?.memberRelationships)
            if (data.otherName) {
                if(data.otherName ==="Y"){
                    this.showAnotherName = true
                }else{
                    this.showAnotherName = false
                }
            }


            if (data.gender === "M") {
                this.relationships = this.maleRelationship
            } else {
                this.relationships = this.femaleRelationship
            }
            this.basicDetails_relations.forEach((individualMap: IHouseHold, idx: number) => {
                const relationShipFormObj: any = {};
                let relationWithCurrentIndividual: any;
                let count = 0
                individualMap.memberRelationships?.forEach((indRel: any) => {
                    if (indRel.individualLookupId.toString() === this.getMinId().toString() && !count) {
                        relationWithCurrentIndividual = indRel.relationshipType
                      relationShipFormObj[individualMap.id!] = this.utilService.getInvRelationships(data?.gender!, relationWithCurrentIndividual)
                      this.getmemberRelationshipsFormGroup(idx).patchValue(relationShipFormObj)
                      count++;
                    }
                })
                    })

        }
    }

    getmemberRelationshipsFormGroup(index: number): FormGroup {
        this.memberRelationshipList = this.householdHeadForm.get('memberRelationships') as FormArray;
        const formGroup = this.memberRelationshipList.controls[index] as FormGroup;
        return formGroup;
    }

    getHouseHoldIndex() {

        const index = this.basicDetails.findIndex((detail) => detail.id == this.getMinId());
        return index;
    }


    loadRelationship() {
        this.relationships$ = this.appService.getRelationships();
        this.relationships$.subscribe((c) => {
            this.relationships = c;
            if (this.basicDetails.length == 1) {
                const data = this.basicDetails[0];

            }
            this.cd.detectChanges();
        });


    }

    changeGender(e: any, val: string): void {

        if (val === "M") {
            this.relationships = this.maleRelationship
        } else if (val === "F") {
            this.relationships = this.femaleRelationship
        }
        this.genderError = false;
    }
    dateOfBirthValidator(control: AbstractControl) {
        if (control) {
            if (
                control.value == null ||
                control.value === undefined ||
                control.value === ""
            ) {
                return { date_error: "date error message" };
            }
        }
        return null;
    }

    private myFormValidator(predicate: any, validator: any): any {
        return ((formControl: FormControl) => {
            if (!formControl.parent) {
                return null;
            }
            if (predicate()) {
                return validator(formControl);
            }
            return null;
        });
    }


    addAnotherName() {
        this.showAnotherName = true;
    }
    removeAnotherName() {
        this.householdHeadForm.get("otherNameVal").value = "";
        this.showAnotherName = false;
    }

    GetValue(value: string) {
        this.firstNamelocal = value;
    }

    isFieldValid(field: string): boolean {
        return (this.householdHeadForm.get(field).status !== 'VALID' && (this.householdHeadForm.get(field).dirty || this.householdHeadForm.get(field).touched))

    }

    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return ''

        }


        switch (field) {
            case "firstName":
                if (this.householdHeadForm.get("firstName").errors?.required) {
                    return "First Name is required.";
                }
                else {
                    return 'Enter only alphabets.';
                }
                break;
            case "midName":
                if (this.householdHeadForm.get("midName").errors?.pattern) {
                    return "Enter only alphabets.";
                }
                else {
                    const midNameControlValue = this.householdHeadForm.get("midName")
                    if (midNameControlValue.value.length > 1) {
                        return 'max length is 1 character.'
                    }
                    else {
                        of(true).pipe(delay(1)).subscribe(() => {
                            midNameControlValue.setErrors(null);
                        })
                    }
                }
                break;

            case "lastName":
                if (this.householdHeadForm.get("lastName").errors?.required) {
                    return "Last Name is required.";
                }
                else {
                    return 'Enter only alphabets.';
                }
                break;
            case "dateOfBirth":
                if (this.householdHeadForm.get('dateOfBirth').errors?.required) {
                    return 'Date Of Birth is required.'
                }
                if (this.householdHeadForm.get('dateOfBirth').errors?.invalidDate) {
                    return 'Date Of Birth must be in the past.'
                }
                if (this.householdHeadForm.get("dateOfBirth").errors.duetInvalidDate) {
                    return "duetInvalidDate";
                }
                break;
            case "gender":
                if (this.householdHeadForm.get("gender").errors?.required) {
                    return "Gender is required.";
                }
                break;
            case "otherNameVal":
                if (this.householdHeadForm.get("otherNameVal").errors?.required) {
                    return "Other Name is required.";
                }
                else {
                    return 'Enter only alphabets.';
                }
                break;
            default:
                return "";
                break;
        }
        return "";
    }

    updateData() {
        let updatedData = { ...this.getControlValues() };

        if (this.basicDetails.length > 0) {
            updatedData.id = this.getMinId();
            const index = this.getHouseHoldIndex();
            if (index >= 0) {
                this.basicDetails = [
                    ...this.basicDetails.slice(0, index),
                    {
                        ...this.basicDetails[index],
                        ...updatedData
                    },
                    ...this.basicDetails.slice(index + 1)
                ]
            }


        }
        else {
            this.basicDetails = [...this.basicDetails, ...[updatedData]];
        }
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

    showGender(gender: any) {
        if (gender !== '' && gender !== undefined) {
            return gender.charAt(0);
        }
        return '';
    }

    getControlValues() {
        const id = 1;

        const updatedData = {
            id: 1,
            firstName: this.householdHeadForm.controls['firstName'].value,
            midName: this.householdHeadForm.controls['midName'].value,
            lastName: this.householdHeadForm.controls['lastName'].value,
            suffix: this.householdHeadForm.controls['suffix'].value,
            age: this.getAge(this.householdHeadForm.controls['dateOfBirth'].value),

            gender: this.showGender(this.householdHeadForm.controls['gender'].value),
            dateOfBirth: this.householdHeadForm.controls['dateOfBirth'].value,
            otherName: this.householdHeadForm.controls['otherName'].value,
            otherNameVal: this.householdHeadForm.controls['otherNameVal'].value,

            memberRelationships: this.basicDetails_relations.map((br: IHouseHold, idx: number) => {
                return {
                    "individualLookupId": Object.keys(this.getmemberRelationshipsFormGroup(idx).value)[0],
                    "relationshipType": Object.values(this.getmemberRelationshipsFormGroup(idx).value)[0],
                }
            })
        } as unknown as IHouseHold

        return updatedData;
    }

    onSubmit(): boolean {

        if (!this.showAnotherName) {
            this.householdHeadForm.get('otherNameVal')?.setErrors(null);
            this.householdHeadForm.patchValue({
                otherNameVal: ''
            });
            this.householdHeadForm.updateValueAndValidity();
        }

        this.genderError = false;

        if (this.householdHeadForm.controls['gender'].value === "") {
            this.genderError = true;
        }

        const updatedHouseholdPerson = {
            id: this.editedMember?.id || Date.now(),
            dateOfBirth: this.householdHeadForm.controls['dateOfBirth'].value,
            firstName: this.householdHeadForm.controls['firstName'].value,
            gender: this.householdHeadForm.controls['gender'].value.charAt(0),
            lastName: this.householdHeadForm.controls['lastName'].value,
            midName: this.householdHeadForm.controls['midName'].value,
            otherName: this.householdHeadForm.controls['otherName'].value.charAt(0),
            otherNameVal: this.householdHeadForm.controls['otherNameVal'].value,
            suffix: this.householdHeadForm.controls["suffix"].value ? this.householdHeadForm.controls["suffix"].value : null,
            memberRelationships: this.basicDetails_relations.map((br: IHouseHold, idx: number) => {
                return {
                    "individualLookupId": Object.keys(this.getmemberRelationshipsFormGroup(idx).value)[0],
                    "relationshipType": Object.values(this.getmemberRelationshipsFormGroup(idx).value)[0],
                }
            })
        }

        this.service.validateAllFormFields(this.householdHeadForm);
        if (this.householdHeadForm.status.toLowerCase() === "valid") {
            const storedHouseHoldDetails = this.applyNowState?.houseHoldDetails;
            let updatedHouseHoldPersonObj;
            if (this.editedMember) {
                const updatedHouseHoldPersonArray =
                    storedHouseHoldDetails?.houseHoldPersons?.map(
                        (person) => {
                            if (person.id === this.editedMember.id) {
                                return updatedHouseholdPerson;
                            }

                            return person;
                        }
                    );

                updatedHouseHoldPersonObj = {
                    houseHoldPersons: updatedHouseHoldPersonArray,
                };
            } else {
                updatedHouseHoldPersonObj = {
                    houseHoldPersons: storedHouseHoldDetails
                        .houseHoldPersons
                        ? [
                            ...storedHouseHoldDetails.houseHoldPersons,
                            ...[updatedHouseholdPerson],
                        ]
                        : [updatedHouseholdPerson],
                };
            }
            this.service.updateHouseHoldDetails({

                ...storedHouseHoldDetails,
                ...updatedHouseHoldPersonObj,
            });

            this.router.navigate([this.routingStratagy.nextRoute()]);

            return true;
        } else {
            return false;
        }
    }
    previous() {
        this.router.navigate([this.routingStratagy.previousRoute()]);
    }
}
