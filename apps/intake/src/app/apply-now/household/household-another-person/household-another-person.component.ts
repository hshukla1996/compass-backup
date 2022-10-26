import { ChangeDetectorRef, Component, Directive, EventEmitter, OnInit, Output, } from "@angular/core";
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators, AbstractControl, FormArray, } from "@angular/forms";
import { ApplyNowHouseholdAnotherPersonStrategy } from '../../../shared/route-strategies/apply-now/householdAnotherPerson';
import { ActivatedRoute, Router } from "@angular/router";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { AppStoreService } from "../../../app-store-service";
import { HouseholdHead } from "../models/householdHead";
import { HouseholdFormDataService } from "../services/household-form-data.service";
import { IApplyNowState } from "../../+state/apply-now.models";
import { IHouseHold, IHouseHoldDetails } from "../household-model";
import { delay, Observable, of } from "rxjs";
import { BasicDetail, BasicDetails, IRelationships } from "../../../do-i-qualify/+state/do-i-qualify.models";
import { DoIQualifyStoreService } from "../../../do-i-qualify/do-i-qualify-store-service";
import { UtilService } from "../../../shared/services/util.service";
import { Utility } from "../../../shared/utilities/Utility";

@Component({
    selector: "compass-ui-household-another-person",
    templateUrl: "./household-another-person.component.html",
    styleUrls: ["./household-another-person.component.scss"],
    providers: [ApplyNowHouseholdAnotherPersonStrategy],
})
export class HouseholdAnotherPersonComponent implements OnInit {
    householdAnotherPerForm: FormGroup | any;
    firstNamelocal: string = "";
    genderError: boolean = false;
    storedHouseHoldDetails!: IHouseHoldDetails;
    editedMember!: any;
    maxDateRange: any;
    applyNowState!: IApplyNowState;
    suffixls: any[] = [];
    headName?: string = "";
    headLastName?: string = "";
    headMiddleName?: string = "";
    headSuffix?: string = "";
    headAge?: string = "";
    headGender?: string = "";
    basicDetails_relations: any;
    memberRelationshipList!: FormArray;
    basicDetails: IHouseHold[] = [];
    public headofHouseHold: any;
    showRelationship = false;
    isDateValid = true;
    maleRelationship: any;
    femaleRelationship: any;


    relationships$: Observable<any> | undefined;
    relationships: any;
    constructor(
        public householdFormDataService: HouseholdFormDataService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private appService: AppStoreService,
        private service: ApplyNowStoreService,
        private routingStratagy: ApplyNowHouseholdAnotherPersonStrategy,
        private diqservice: DoIQualifyStoreService,
        private utilService: UtilService

    ) {
    }
    creatememberRelationship(id: any): FormGroup {
        const idx = parseInt(id);
        return this.fb.group({
            [idx]: [null, [Validators.required]],
        });
    }
    get memberRelationshipFormGroup() {
        return this.householdAnotherPerForm.get(
            "memberRelationships"
        ) as FormArray;
    }
    getmemberRelationshipsFormGroup(index: number): FormGroup {
        this.memberRelationshipList = this.householdAnotherPerForm.get(
            "memberRelationships"
        ) as FormArray;

        const formGroup = this.memberRelationshipList.controls[
            index
        ] as FormGroup;
        return formGroup;
    }

    ngOnInit(): void {
        const memberId = this.route.snapshot.paramMap.get("userId");
        this.maxDateRange = new Date().toISOString().slice(0, 10);
        this.householdAnotherPerForm = this.fb.group({
            id: [""],
            firstName: [
                "",
                [
                    Validators.required,
                    Validators.pattern("[A-Za-z-'\\\\]+"),
                    Validators.maxLength(11),
                ],
            ],
            midName: [
                "",
                [
                    Validators.pattern("[A-Za-z-'\\\\]+"),
                    Validators.maxLength(1),
                ],
            ],
            lastName: [
                "",
                [
                    Validators.required,
                    Validators.pattern("[A-Za-z-'\\\\]+"),
                    Validators.maxLength(14),
                ],
            ],
            suffix: "",
            dateOfBirth: ["", [Validators.required, Validators.maxLength(10), Utility.dateMaxValidator()]],
            gender: ["", Validators.required],
            otherName: [""],
            otherNameVal: [
                "",
                [
                    this.myFormValidator(
                        () =>
                            this.householdAnotherPerForm.value.otherName.includes(
                                "Y"
                            ),
                        Validators.required
                    ),
                    Validators.pattern("[A-Za-z-'\\\\]+"),
                    Validators.maxLength(30),
                ],
            ],
            relationship: " nx ",
            memberRelationships: this.fb.array([]),
        });
        this.memberRelationshipList = this.householdAnotherPerForm.get(
            "memberRelationships"
        ) as FormArray;
        this.householdAnotherPerForm
            .get("otherNameVal")
            .valueChanges.subscribe((selectedValue: string) => {
                if (selectedValue === "Y") {
                    this.householdAnotherPerForm
                        .get("otherNameVal")
                        .setValidators(Validators.required);
                } else {
                    this.householdAnotherPerForm
                        .get("otherNameVal")
                        .clearValidators();
                }
            });

        this.appService.getMaleRelationships().subscribe((c: any) => {
            this.maleRelationship = c;
        });

        this.appService.getFemaleRelationships().subscribe((c: any) => {
            this.femaleRelationship = c;
        });

        this.relationships$ = this.appService.getRelationships();
        this.relationships$.subscribe((c) => {
            this.relationships = c;
            this.cd.detectChanges();
        });

        this.service.getAppData().subscribe((d) => {
            this.storedHouseHoldDetails = d?.houseHoldDetails;
            const firstPerson = this.storedHouseHoldDetails.houseHoldPersons
                ? this.storedHouseHoldDetails.houseHoldPersons[0]
                : null;
            if (firstPerson) {
                this.headName = firstPerson.firstName || "";
                this.headMiddleName = firstPerson.midName || "";
                this.headLastName = firstPerson.lastName || "";
                this.headSuffix = firstPerson.suffix || "";
                this.headAge = this.getAge(firstPerson.dateOfBirth);
                this.headGender = firstPerson.gender?.charAt(0);
            }

            if (memberId) {
                this.editedMember =
                    this.storedHouseHoldDetails.houseHoldPersons?.filter(
                        (person) => person.id?.toString() === memberId
                    )[0];

                setTimeout(() => {
                    this.loadValues();
                }, 500);
            }

            const data = this.editedMember;

            this.householdAnotherPerForm.controls["firstName"].patchValue(
                data?.firstName
            );
            this.householdAnotherPerForm.controls["midName"].patchValue(
                data?.midName
            );
            this.householdAnotherPerForm.controls["lastName"].patchValue(
                data?.lastName
            );
            this.householdAnotherPerForm.controls["suffix"].patchValue(
                data?.suffix
            );
            this.householdAnotherPerForm.controls["dateOfBirth"].patchValue(Utility.duetFormatDate(data?.dateOfBirth));
            this.householdAnotherPerForm.controls["gender"].patchValue(
                data?.gender ? (data?.gender === "M" ? "Male" : "Female") : null
            );
            this.householdAnotherPerForm.controls["otherName"].patchValue(data?.otherName ? (data?.otherName === "Y" ? "Yes" : "No") : ""),
                this.householdAnotherPerForm.controls[
                    "otherNameVal"
                ].patchValue(data?.otherNameVal);
            if (data?.otherName) {
                if (data?.otherName === "Y") {
                    this.showAnotherName = true;
                } else {
                    this.showAnotherName = false;
                }
            }
           
            if (data?.gender === "M" || data?.gender === "Male") {
                this.relationships = this.maleRelationship
            } else {
                this.relationships = this.femaleRelationship
            }

            this.cd.detectChanges();
        });

        if (this.editedMember?.id) {
            this.basicDetails_relations =
                this.storedHouseHoldDetails.houseHoldPersons?.filter(
                    (ind) => ind.id != this.editedMember.id
                );
        } else {
            this.basicDetails_relations =
                this.storedHouseHoldDetails.houseHoldPersons;
        }
        this.basicDetails_relations.forEach((ind: IHouseHold) => {
            if (ind.id)
                return this.memberRelationshipList.push(
                    this.creatememberRelationship(ind.id)
                );
        });
        this.appService.getSuffix().subscribe((suffix: any[]) => {
            let newSuffix = [...suffix];
            newSuffix.sort((a: any, b: any) => {
                return a.additionalColumns.FlexOrder - b.additionalColumns.FlexOrder
            });
            this.suffixls = newSuffix;
            this.cd.detectChanges();
        });
    }

    private myFormValidator(predicate: any, validator: any): any {
        return (formControl: FormControl) => {
            if (!formControl.parent) {
                return null;
            }
            if (predicate()) {
                return validator(formControl);
            }
            return null;
        };
    }

    GetValue(value: string) {
        this.firstNamelocal = value;
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

    changeGender(e: any, val: string): void {
        if (val === "M") {
            this.relationships = this.maleRelationship
        } else if (val === "F") {
            this.relationships = this.femaleRelationship
        }
       
        this.genderError = false;
        
        this.basicDetails_relations.forEach((individualMap: any, idx: number) => {
            const relationShipFormObj: any = {};

            relationShipFormObj[individualMap.id!] = null
            this.getmemberRelationshipsFormGroup(idx).patchValue(relationShipFormObj)
        })
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

    showAnotherName: boolean = false;
    addAnotherName() {
        this.showAnotherName = true;
    }
    removeAnotherName() {
        this.householdAnotherPerForm.get("otherNameVal").value = "";
        this.showAnotherName = false;
    }
    loadValues() {
        if (this.basicDetails_relations.length > 0) {
            this.basicDetails_relations.forEach(
                (individualMap: IHouseHold, idx: number) => {
                    const relationShipFormObj: any = {};
                    let relationWithCurrentIndividual: any;
                    individualMap.memberRelationships?.forEach(
                        (indRel: any) => {
                            if (
                                indRel.individualLookupId?.toString() ===
                                this.editedMember.id?.toString()
                            ) {
                                relationWithCurrentIndividual = indRel;
                            }
                        }
                    );
                    if (individualMap.gender && individualMap.id) {
                        relationShipFormObj[individualMap.id] =
                            this.utilService.getInvRelationships(
                                this.editedMember.gender,
                                relationWithCurrentIndividual.relationshipType
                            );
                    }
                    if (individualMap.gender && individualMap.id)
                        this.getmemberRelationshipsFormGroup(idx)?.patchValue(
                            relationShipFormObj
                        );
                }
            );
        }
    }
    isFieldValid(field: string): boolean {
        return (
            this.householdAnotherPerForm.get(field).status !== "VALID" &&
            (this.householdAnotherPerForm.get(field).dirty ||
                this.householdAnotherPerForm.get(field).touched)
        );
    }
    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return "";
        }

        switch (field) {
            case "firstName":
                if (
                    this.householdAnotherPerForm.get("firstName").errors
                        ?.required
                ) {
                    return "First Name is required.";
                } else {
                    return "Enter only alphabets.";
                }
                break;
            case "midName":
                if (
                    this.householdAnotherPerForm.get("midName").errors?.pattern
                ) {
                    return "Enter only alphabets.";
                } else {
                    const midNameControlValue =
                        this.householdAnotherPerForm.get("midName");
                    if (midNameControlValue.value.length > 1) {
                        return "max length is 1 character.";
                    } else {
                        of(true).pipe(delay(1)).subscribe(() => {
                            midNameControlValue.setErrors(null);
                        });
                    }
                }
                break;
            case "lastName":
                if (
                    this.householdAnotherPerForm.get("lastName").errors
                        ?.required
                ) {
                    return "Last Name is required.";
                } else {
                    return 'Enter only alphabets.';
                }
                break;
            case "dateOfBirth":
                if (this.householdAnotherPerForm.get("dateOfBirth").errors?.required) {
                    return "Date of Birth is required.";
                }
                if (this.householdAnotherPerForm.get('dateOfBirth').errors?.invalidDate) {
                    return 'Date Of Birth must be in the past.'
                }
                if (this.householdAnotherPerForm.get("dateOfBirth").errors.duetInvalidDate) {
                    return "duetInvalidDate";
                }
                break;
            case "gender":
                if (
                    this.householdAnotherPerForm.get("gender").errors?.required
                ) {
                    return "Gender is required.";
                }
                break;
            case "otherNameVal":
                if (
                    this.householdAnotherPerForm.get("otherNameVal").errors
                        ?.required
                ) {
                    return "Other Name is required.";
                } else {
                    return "Enter only alphabets.";
                }
                break;
            case "relationship":
                if (
                    this.householdAnotherPerForm.get("relationship").errors
                        ?.required
                ) {
                    return "Relationship is required.";
                } else {
                    return "please select the Relationship.";
                }
                break;
            default:
                return "";
                break;
        }
        return "";
    }

    onSubmit(): boolean {
        this.householdAnotherPerForm.markAllAsTouched();

        this.service.validateAllFormFields(this.householdAnotherPerForm);
        if (this.householdAnotherPerForm.status.toLowerCase() === "valid") {
            if (!this.showAnotherName) {
                this.householdAnotherPerForm.get("otherNameVal")?.setErrors(null);
                this.householdAnotherPerForm.patchValue({
                    otherNameVal: "",
                });
                this.householdAnotherPerForm.updateValueAndValidity();
            }

            this.genderError = false;

            if (this.householdAnotherPerForm.controls["gender"].value === "") {
                this.genderError = true;
            }
            this.basicDetails = [...this.service.getBasicDetails()];

            const updatedHouseholdPerson = {
                id: this.editedMember?.id || Date.now(),
                dateOfBirth:
                    this.householdAnotherPerForm.controls["dateOfBirth"].value,
                firstName: this.householdAnotherPerForm.controls["firstName"].value,
                gender: this.householdAnotherPerForm.controls[
                    "gender"
                ].value.charAt(0),
                lastName: this.householdAnotherPerForm.controls["lastName"].value,
                midName: this.householdAnotherPerForm.controls["midName"].value,
                otherName:
                    this.householdAnotherPerForm.controls["otherName"].value.charAt(
                        0
                    ),
                otherNameVal:
                    this.householdAnotherPerForm.controls["otherNameVal"].value,
                suffix: this.householdAnotherPerForm.controls["suffix"].value
                    ? this.householdAnotherPerForm.controls["suffix"].value
                    : null,
                relationship:
                    this.householdAnotherPerForm.controls["relationship"].value,
                memberRelationships: this.basicDetails_relations.map(
                    (br: IHouseHold, idx: number) => {
                        return {
                            individualLookupId: Object.keys(
                                this.getmemberRelationshipsFormGroup(idx).value
                            )[0],
                            relationshipType: Object.values(
                                this.getmemberRelationshipsFormGroup(idx).value
                            )[0],
                        };
                    }
                ),
                headOfHouse: false,
            } as unknown as IHouseHold;

            let updatedHouseHoldPersonObj;
            if (this.editedMember) {
                const updatedHouseHoldPersonArray =
                    this.storedHouseHoldDetails?.houseHoldPersons?.map(
                        (person) => {
                            const personToBeUpdated = { ...person };
                            if (
                                personToBeUpdated.id?.toString() ===
                                this.editedMember.id.toString()
                            ) {
                                return {
                                    ...personToBeUpdated,
                                    ...updatedHouseholdPerson,
                                };
                            }

                            return personToBeUpdated;
                        }
                    );

                updatedHouseHoldPersonObj = {
                    houseHoldPersons: updatedHouseHoldPersonArray,
                };
            } else {
                updatedHouseHoldPersonObj = {
                    houseHoldPersons: this.storedHouseHoldDetails
                        .houseHoldPersons
                        ? [
                            ...this.storedHouseHoldDetails.houseHoldPersons,
                            ...[updatedHouseholdPerson],
                        ]
                        : [updatedHouseholdPerson],
                };
            }
            this.service.updateHouseHoldDetails({
                ...this.storedHouseHoldDetails,
                ...updatedHouseHoldPersonObj,
            });
            this.updateRelations();
            this.router.navigate([this.routingStratagy.nextRoute()]);

            return true;
        } else {
            return false;
        }
    }

    previous() {
        this.router.navigate([this.routingStratagy.previousRoute()]);
    }

    updateRelations() {
        const updatedBasicDetails = this.storedHouseHoldDetails.houseHoldPersons
            ? [...this.storedHouseHoldDetails.houseHoldPersons]
            : [];

        for (let i = 0; i < updatedBasicDetails.length - 1; i++) {
            const getRelationshipFor = updatedBasicDetails[i].id;
            const currenMemberRelations: IRelationships[] = [];
            for (let j = 0; j < updatedBasicDetails.length; j++) {
                if (i === j) {
                    continue;
                }
                const getRelationshipTo = updatedBasicDetails[j].id;
                const relationToCurrentMember = updatedBasicDetails[
                    j
                ].memberRelationships?.filter(
                    (rel: IRelationships) =>
                        rel.individualLookupId.toString() ===
                        getRelationshipFor?.toString()
                )[0];
                if (relationToCurrentMember) {
                    const currentRelation =
                        relationToCurrentMember.relationshipType;
                    currenMemberRelations.push({
                        individualLookupId: getRelationshipTo!,
                        relationshipType: this.utilService.getInvRelationships(
                            updatedBasicDetails[i].gender!,
                            currentRelation
                        ),
                    });
                }
            }

            updatedBasicDetails[i] = {
                ...updatedBasicDetails[i],
                memberRelationships: currenMemberRelations,
            };
        }

        let storeHouseholdData!: IApplyNowState;

        this.service.getAppData().subscribe((d) => {
            storeHouseholdData = { ...d };
        });
        const storedHouseHoldDetails = storeHouseholdData?.houseHoldDetails;
        const updatedHouseholddetails = {
            ...storedHouseHoldDetails,
            houseHoldPersons: updatedBasicDetails,
        };
        this.service.updateHouseHoldDetails({
            ...storedHouseHoldDetails,
            ...updatedHouseholddetails,
        });
    }

    ngOnDestroy(): void {
    }
}
