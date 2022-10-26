/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';
import { IAddress, IHousehold } from '../../+state/contact-information-model';
import { IIndividual, IRelationships } from '../../+state/household-details-model';
import { IReferralsState } from '../../+state/referrals.models';
import { AppStoreService } from '../../../app-store-service';
import { HouseholdAddress } from '../../../apply-now/household/models/householdAddress';
import { MenuItemState } from '../../../shared/menu-item-state';
import { RoutePath } from '../../../shared/route-strategies';
import { ReferrralsContactInformationStrategy } from '../../../shared/route-strategies/referrals/contact-information';
import { ReferralStoreService } from '../../referrals-store-service';
import { HttpClient } from '@angular/common/http';
import { ReferrralsGISValidationStrategy } from './gis-validation-service';
import { ScreenQueueUtil } from "../../../shared/services/screen_queue_util.service";
import { UtilService } from '../../../shared/services/util.service';
import {Utility} from "../../../shared/utilities/Utility";

@Component({
    selector: "compass-ui-contact-information",
    templateUrl: "./contact-information.component.html",
    styleUrls: ["./contact-information.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ReferrralsGISValidationStrategy],
})
export class ContactInformationComponent implements OnInit, OnDestroy {
    @ViewChild("contactInfo") contactInformationFormEle: any;

    @Output() formState = new EventEmitter<MenuItemState>();
    routePath: typeof RoutePath = RoutePath;
    private readonly url = "/api/intake/common/verifyaddress";
    // private formSubmitAttempt: boolean = false;
    contactInformationForm!: FormGroup | any;
    addressForm!: FormGroup;
    contactInformation: IIndividual | undefined;
    states$: Observable<any> | undefined;
    referralState: IReferralsState | undefined;
    states: any;
    editedMember!: any;

    showModal = "";
    selectedState: any;
    storeddata: any;
    phoneNumber: any;
    emailAddress: any;
    addressLine2: any;
    addressLine1: any;
    showRequired = "";
    city: any;
    zip: any;
    addressData: IAddress | undefined;
    addressArray: IAddress[] = [];
    selectedInd: any;
    selectedPref: any;
    selectedrelation: any;
    individuals: IIndividual[] = [];
    household!: IIndividual;
    resultArray!: [];
    allUsers: any;
    showcard = false;
    getrelationships: any = [];
    relationshipsToIndividual: any;
    relations: any = {};
    relationValue: any;
    isAddressGISValidated = true;
    showPhoneNumrequired = "";
    showEmailRequired = "";
    stateFlag = false;
    memberRelationshipList!: FormArray;
    isLoading = true;
    getEmail = "";
    confirm = "";
    showAddressFieldsRequired = "";
    @ViewChild("closeModal") closeModal!: ElementRef;
    basicDetails_relations: IIndividual[] = [];
    internal_relations: IIndividual[] = [];
    otherRelationshipList!: FormArray;
    currentServices: any;
    constructor(
        private fb: FormBuilder,
        private route: Router,
        private service: ReferralStoreService,
        private cd: ChangeDetectorRef,
        private router: Router,
        private appService: AppStoreService,
        private routingStratagy: ReferrralsGISValidationStrategy,
        private location: Location,
        private queueService: ScreenQueueUtil,
        private utilService: UtilService,
        private http: HttpClient,
        private store: Store<any>
    ) {}
    GetEmail(value: string) {
        this.getEmail = value;
    }
    getConfirmEmail(value: string) {
        this.confirm = value;
    }
    isFieldValid(field: string): boolean {
         
        if (this.getEmail !== this.confirm && field == "confirmEmail") {
            return true;
        }

        // return (this.contactInformationForm.get(field).status !== 'VALID' && (this.contactInformationForm.get(field).dirty || this.contactInformationForm.get(field).touched))

        return (
            this.contactInformationForm.get(field)?.status !== "VALID" && (this.contactInformationForm.get(field)?.dirty ||
            this.contactInformationForm.get(field)?.touched)
        );
    }

    OnlyNumberAllowed(event: { which: any; keyCode: any, }, field: any): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        console.log(this.showPhoneNumrequired.length) 

        if (charCode === 8 && this.contactInformationForm.get(field).value.length < 4 && this.showPhoneNumrequired.length==0) {
            this.contactInformationForm.value[field] = undefined;
            this.contactInformationForm.get(field).errors = {};
            this.contactInformationForm.get(field).value = '';
            this.contactInformationForm.get(field).status = "VALID";
            this.contactInformationForm.status = "VALID";
            return true;
        }
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return " ";
        }
        switch (field) {
            case "usersField":
                if (
                    this.contactInformationForm.get("usersField").errors
                        .required
                ) {
                    return "Select Main Contact for the Household";
                }
                break;
            case "firstName":
                if (
                    this.contactInformationForm.get("firstName").errors.required
                ) {
                    return "First Name is required.";
                }
                break;

            case "lastName":
                if (
                    this.contactInformationForm.get("lastName").errors.required
                ) {
                    return "Last Name is required.";
                }
                break;
            case "individualNumber":
                if (
                    this.contactInformationForm.get("individualNumber").errors
                        .required
                ) {
                    return "Select the Main Contact for the Household.";
                }
                break;
            case "contactPreference":
                if (
                    this.contactInformationForm.get("contactPreference")?.errors
                        ?.required
                ) {
                    return "This is required.";
                }
                break;
            case "phoneNumber":
                if (
                    this.contactInformationForm.get("phoneNumber").errors
                        .required
                ) {
                    return "Enter the Phone Number.";
                }
              if (
                this.contactInformationForm.get("phoneNumber").errors.invalidNumber
              ) {
                return "Enter valid Phone Number.";
              }
                
                break;
            case "confirmEmail":
                if (this.getEmail !== this.confirm) {
                    return "Email and Confirm email should match";
                } else {
                    return "This is required";
                }
                break;
            case "zip":
                if (
                    this.contactInformationForm.get("zip").errors
                        .required
                ) {
                    return "This is required";
                }
                if (
                    this.contactInformationForm.get("zip").errors
                        .invalidNumber
                ) {
                    return "Enter 5 digit zip code";
                }
                // if (this.getEmail !== this.confirm) {
                //     return "Email and Confirm email should match";
                // } else {
                //     return "This is required";
                // }
                break;

            default:
                break;
        }

        return "";
    }
    getAge(dateString: any): any {
        const today = new Date();
        const birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    creatememberRelationship(id: any): FormGroup {
        const idx = parseInt(id);
        return this.fb.group({
            [idx]: [null],
        });
    }
    get memberRelationshipFormGroup() {
        // console.log("relationship", this.householdAnotherPerForm.get("memberRelationships"));
        return this.contactInformationForm.get(
            "memberRelationships"
        ) as FormArray;
    }
    getmemberRelationshipsFormGroup(index: number): FormGroup {
        this.memberRelationshipList = this.contactInformationForm.get(
            "memberRelationships"
        ) as FormArray;

        const formGroup = this.memberRelationshipList.controls[
            index
        ] as FormGroup;
        return formGroup;
    }

    createOtherRelationship(id: any): FormGroup {
        const idx = parseInt(id);
        return this.fb.group({
            [idx]: [null],
        });
    }
    get otherRelationshipFormGroup() {
        // console.log("relationship", this.householdAnotherPerForm.get("memberRelationships"));
        return this.contactInformationForm.get(
            "otherRelationships"
        ) as FormArray;
    }
    getotherRelationshipsFormGroup(index: number): FormGroup {
        this.otherRelationshipList = this.contactInformationForm.get(
            "otherRelationships"
        ) as FormArray;

        const formGroup = this.otherRelationshipList.controls[
            index
        ] as FormGroup;
        return formGroup;
    }
    ngOnInit() {
        this.contactInformationForm = this.fb.group({
            firstName: [""],
            lastName: [""],
            contactPreference: ["", Validators.required],
            phoneNumber: [""],
            individualNumber: [""],
            emailAddress: [
                ""
            ],
            confirmEmail: [
                "", ],
            state: [""],
            addressLine1: [""],
            addressLine2: [""],
            city: [""],
            zip: [""],
            zipExtension: [""],
            conditionalFirstName: [""],
            conditionalLastName: [""],
            // relationshipsToIndividual: this.fb.array([]),
            otherRelationships: this.fb.array([]),
            memberRelationships: this.fb.array([]),
            // otherRelationships: this.fb.array([]),
        });
        this.memberRelationshipList = this.contactInformationForm.get(
            "memberRelationships"
        ) as FormArray;
        this.otherRelationshipList = this.contactInformationForm.get(
            "otherRelationships"
        ) as FormArray;
        // this.otherRelationshipList?.clear();
        // this.otherRelationshipList?.reset();
        // this.otherRelationshipList?.clearValidators()
        console.group(this.internal_relations, " this.internal_relations");
        this.internal_relations = [];

        // this.showcard = true
        // this.memberRelationshipList = this.contactInformationForm.get(
        //     "memberRelationships"
        // ) as FormArray;

        // this.otherRelationshipList = this.contactInformationForm.get(
        //     "otherRelationships"
        // ) as FormArray;

        this.appService.getRelationships().subscribe((c = []) => {
            this.getrelationships = c;

            this.cd.detectChanges();
        });
        this.individuals = this.service.getIndividuals ?? [];
        this.household = this.service.getHousehold ?? [];
        this.referralState = this.service.getReferralState;
        this.currentServices =
            this.referralState.pageAction?.currentServicesMap;
        // this.basicDetails_relations = this.individuals;
        this.cd.detectChanges();

        // this.service.getAppData().subscribe((d) => {
        // this.referralState = { ...d };
        this.states$ = this.appService.getStates();
        this.states$?.subscribe((s) => {
            this.states = s;
            this.cd.detectChanges();
        });
        this.contactInformationForm.get("phoneNumber").setValidators(Utility.phoneNumberValidator());

        setTimeout(() => { 
            this.selectPerson(this.referralState?.household.individualNumber); 
            this.contactInformationForm
                .get("usersField")
                .patchValue(this.referralState?.household?.individualNumber);

            this.contactInformationForm
                .get("contactPreference")
                .patchValue(this.referralState?.household.contactPreference);
            this.contactInformationForm
                .get("phoneNumber")
                .patchValue(this.referralState?.household?.phoneNumber);
            this.contactInformationForm
                .get("emailAddress")
                .patchValue(this.referralState?.household?.emailAddress);
            this.contactInformationForm
                .get("confirmEmail")
                .patchValue(this.referralState?.household?.emailAddress);
            if (this.household.individualNumber == 100) {
                console.log(this.household.individualNumber);
                this.showcard = true;
                this.contactInformationForm
                    .get("usersField")
                    .patchValue("outsideHousehold");
                this.contactInformationForm
                    .get("conditionalFirstName")
                    .patchValue(this.referralState?.household?.firstName);
                this.contactInformationForm
                    .get("conditionalLastName")
                    .patchValue(this.referralState?.household?.lastName);

                this.household?.relationshipsToIndividual?.forEach(
                    (rel:any, idx:any) => {
                        this.getotherRelationshipsFormGroup(idx)?.patchValue({
                            [rel.individualLookupId]: rel.relationshipType,
                        });
                    }
                );
            } else {
                this.household?.relationshipsToIndividual?.forEach(
                    (rel:any, idx:any) => {
                        this.getmemberRelationshipsFormGroup(idx)?.patchValue({
                            [rel.individualLookupId]: rel.relationshipType,
                        });
                    }
                );
            }
            // this.contactInformationForm.get('confirmEmail').patchValue(this.referralState?.household?.confirmEmail);

            this.contactInformationForm
                .get("state")
                .patchValue(this.referralState?.household?.address?.state);
            this.contactInformationForm
                .get("addressLine1")
                .patchValue(
                    this.referralState?.household?.address?.addressLine1
                );
            this.contactInformationForm
                .get("addressLine2")
                .patchValue(
                    this.referralState?.household?.address?.addressLine2
                );
            this.contactInformationForm
                .get("city")
                .patchValue(this.referralState?.household?.address?.city);
            this.contactInformationForm
                .get("zip")
                .patchValue(this.referralState?.household?.address?.zip);
            this.contactInformationForm
                .get("zipExtension")
                .patchValue(this.referralState?.household?.address?.zipExt);
        }, 500);
        this.internal_relations = [];
        this.cd.detectChanges();
        // });

        //  this.basicDetails_relations.forEach((ind, i) => {
        //    return this.memberRelationshipList.push(
        //      this.creatememberRelationship(parseInt(ind.individualNumber))
        // );
        // });
        this.contactInformationForm
            .get("state")
            .valueChanges.subscribe((selectedValue: string) => {
                this.selectedState = selectedValue;
            });

        this.contactInformationForm
            .get("contactPreference")
            .valueChanges.subscribe((selectedValue: string) => {
                 
                this.selectedPref = selectedValue;
                // this.contactInformationForm
                //     .get("phoneNumber")
                //     .clearValidators();
                this.contactInformationForm
                    .get("emailAddress")
                    .clearValidators();
                this.contactInformationForm
                    .get("confirmEmail")
                    .clearValidators();
                this.contactInformationForm
                    .get("addressLine1")
                    .clearValidators();
                // this.contactInformationForm
                //     .get("addressLine2")
                //     .clearValidators();
                this.contactInformationForm.get("city").clearValidators();
                // this.contactInformationForm.get("state").clearValidators();
                this.stateFlag = false;

                // this.contactInformationForm.get("zip").clearValidators();
                this.contactInformationForm.get("zip").setValidators(Utility.zipCodeValidator());

                this.showRequired = "";
                if (this.selectedPref == "P") {
                    
                    console.log(this.contactInformationForm," this.contactInformationForm")
                    this.contactInformationForm.get("phoneNumber").setValidators(Validators.required, Utility.phoneNumberValidator());
                    this.showPhoneNumrequired = "(required)";
                    // this.contactInformationForm.get("phoneNumber").setValidators();

                    this.contactInformationForm
                        .get("emailAddress")
                        .clearValidators();
                    this.contactInformationForm
                        .get("confirmEmail")
                        .clearValidators();
                    this.showEmailRequired = "";
                    this.contactInformationForm
                        .get("addressLine1")
                        .clearValidators();
                    this.contactInformationForm
                        .get("addressLine2")
                        .clearValidators();
                    this.contactInformationForm.get("city").clearValidators();
                    this.contactInformationForm.get("state").clearValidators();
                    this.stateFlag = false;

                    this.contactInformationForm.get("zip").clearValidators();
                    this.contactInformationForm.get("zip").setValidators(Utility.zipCodeValidator());

                    this.showAddressFieldsRequired = "";
                } else if (this.selectedPref == "E") {
                    this.contactInformationForm.get("phoneNumber").setValidators(Utility.phoneNumberValidator());

                    this.contactInformationForm
                        .get("emailAddress")
                        .setValidators(Validators.required);
                    this.contactInformationForm
                        .get("confirmEmail")
                        .setValidators(Validators.required);
                    this.contactInformationForm
                        .get("phoneNumber")
                        .clearValidators();
                    this.showPhoneNumrequired = "";
                    this.showEmailRequired = "(required)";
                    this.contactInformationForm
                        .get("addressLine1")
                        .clearValidators();
                    this.contactInformationForm
                        .get("addressLine2")
                        .clearValidators();
                    this.contactInformationForm.get("city").clearValidators();
                    this.contactInformationForm.get("state").clearValidators();
                    this.stateFlag = false;

                    this.contactInformationForm.get("zip").clearValidators();
                    this.contactInformationForm.get("zip").setValidators(Utility.zipCodeValidator());

                    this.showAddressFieldsRequired = "";
                } else if (this.selectedPref == "M") {
                    
                    console.log(this.contactInformationForm, " this.contactInformationForm")

                    this.contactInformationForm
                        .get("addressLine1")
                        .setValidators(Validators.required);
                    // this.contactInformationForm
                    //     .get("addressLine2")
                    //     .setValidators(Validators.required);
                    this.contactInformationForm
                        .get("phoneNumber")
                        .clearValidators();
                    this.contactInformationForm
                        .get("city")
                        .setValidators(Validators.required);
                    this.contactInformationForm
                        .get("state")
                        .setValidators(Validators.required);
                    this.stateFlag = true;
                    this.contactInformationForm
                        .get("zip")
                        .setValidators(Validators.required);
                    
                    this.contactInformationForm.get("zip").setValidators(Utility.zipCodeValidator());

                    this.showPhoneNumrequired = "";
                    this.contactInformationForm.get("phoneNumber").setValidators(Utility.phoneNumberValidator());

                    this.contactInformationForm
                        .get("emailAddress")
                        .clearValidators();
                    this.contactInformationForm
                        .get("confirmEmail")
                        .clearValidators();
                    this.showEmailRequired = "";
                    this.showAddressFieldsRequired = "(required)"; 
                }
          this.contactInformationForm
            .get("confirmEmail")
            .setValidators(Utility.ConfirmEmailValidator("emailAddress")); 
                this.contactInformationForm
                    .get("phoneNumber")
                    .updateValueAndValidity();
                this.contactInformationForm
                    .get("emailAddress")
                    .updateValueAndValidity();

                this.contactInformationForm
                    .get("confirmEmail")
                    .updateValueAndValidity();

                this.contactInformationForm
                    .get("addressLine1")
                    .updateValueAndValidity();
                this.contactInformationForm
                    .get("addressLine2")
                    .updateValueAndValidity();
                this.contactInformationForm
                    .get("city")
                    .updateValueAndValidity();
                this.contactInformationForm
                    .get("state")
                    .updateValueAndValidity();
                this.contactInformationForm.get("zip").updateValueAndValidity();
                this.contactInformationForm.get("phoneNumber").setValidators(Utility.phoneNumberValidator());
                this.contactInformationForm.get("zip").setValidators(Utility.zipCodeValidator());


            });
        // this.contactInformationForm.get("phoneNumber").setValidators(Utility.phoneNumberValidator());

    }
    // get memberRelationshipFormGroup() {
    //     return this.contactInformationForm.get(
    //         "memberRelationships"
    //     ) as FormArray;
    // }
    // get otherRelationshipFormGroup() {
    //     return this.contactInformationForm.get(
    //         "otherRelationships"
    //     ) as FormArray;
    // }
    // "relationshipsToIndividual": [
    //     {
    //         "individualLookupId": 0,
    //         "relationshipType": "C"
    //     }
    // ]

    getRelationvalue(e: any, id: any) {
        this.relations[id] = e.target.value;
    }

    get f() {
        return this.contactInformationForm.controls;
    }

    getValue(individualNumber: any, property: any) {
        console.log(individualNumber, "individualNumber");
        const detail = this.individuals.filter(
            (relation: any) => relation.individualNumber == individualNumber
        );
        return detail.length > 0 ? detail[0].firstName : "";
    }
    getValueLastName(individualNumber: any, property: any) {
        const detail = this.individuals.filter(
            (relation: any) => relation.individualNumber == individualNumber
        );
        return detail.length > 0 ? detail[0].lastName : "";
    }
    selectPerson(person: any) {
        this.internal_relations = [];
        this.selectedInd = person;
        this.otherRelationshipList.clear();
        this.memberRelationshipList.clear();

        if (
            this.selectedInd === "outsideHousehold" ||
            person?.toString() === "100"
        ) {
            this.showcard = true;

            this.contactInformationForm
                .get("conditionalFirstName")
                .setValidators(Validators.required);
            this.contactInformationForm
                .get("conditionalLastName")
                .setValidators(Validators.required);
            this.service.getIndividuals.forEach((ind: IIndividual) => {
                return this.otherRelationshipList.push(
                    this.createOtherRelationship(ind.individualNumber)
                );
            });
        } else if (parseInt(person) !== 100) {
            this.showcard = false;

            // if (this.selectedInd){
            this.internal_relations = this.individuals.filter((ind) => {
                console.log(ind.individualNumber, "ind.individualNumber");
                console.log(this.selectedInd, "this.selectedInd");

                return (
                    ind.individualNumber?.toString() !==
                    this.selectedInd?.toString()
                );
            });
            console.log(this.internal_relations, "internal_relations");
this.internal_relations.forEach((ind: IIndividual) => {
        return this.memberRelationshipList.push(
            this.creatememberRelationship(ind.individualNumber)
        );
});


            this.contactInformationForm
                .get("conditionalFirstName")
                .clearValidators();
            this.contactInformationForm
                .get("conditionalLastName")
                .clearValidators();
        }

        this.contactInformationForm
            .get("conditionalFirstName")
            .updateValueAndValidity();
        this.contactInformationForm
            .get("conditionalLastName")
            .updateValueAndValidity();
    }

    getSelectedNum(selectedValue: any) {
        if (
            this.selectedInd === "outsideHousehold" ||
            this.selectedInd?.toString() === "100"
        ) {
            return "100";
        } else {
            return selectedValue;
        }
    }
    async onSubmit() {
        // this.household = this.service.getHousehold ?? [];

        const individualNumber = this.getSelectedNum(
            this.contactInformationForm.get("usersField").value
        );
        // this.selectedInd.toString() === "outsideHousehold" || "100"
        //     ? "100"
        //     : this.contactInformationForm.get("usersField").value;
        const firstName =
            this.selectedInd?.toString() === "outsideHousehold" ||
            this.selectedInd?.toString() === "100"
                ? this.contactInformationForm.get("conditionalFirstName").value
                : this.getValue(individualNumber, "firstName");
        const lastName =
            this.selectedInd?.toString() === "outsideHousehold" ||
            this.selectedInd?.toString() === "100"
                ? this.contactInformationForm.get("conditionalLastName").value
                : this.getValueLastName(individualNumber, "lastName");
        const contactPreference = this.contactInformationForm.get(
            "contactPreference"
        ).value
            ? this.contactInformationForm.get("contactPreference").value
            : "";
        const emailAddress = this.contactInformationForm.get("emailAddress")
            .value
            ? this.contactInformationForm.get("emailAddress").value
            : "";
        const phoneNumber = this.contactInformationForm.get("phoneNumber").value
            ? this.contactInformationForm.get("phoneNumber").value
            : "";
        const address1 = this.contactInformationForm.get("addressLine1").value
            ? this.contactInformationForm.get("addressLine1").value
            : "";
        const address2 = this.contactInformationForm.get("addressLine2")?.value
            ? this.contactInformationForm.get("addressLine2")?.value
            : "";
        const state = this.contactInformationForm.get("state").value
            ? this.contactInformationForm.get("state").value
            : "";
        const city = this.contactInformationForm.get("city").value
            ? this.contactInformationForm.get("city").value
            : "";
        const zip = this.contactInformationForm.get("zip").value?.toString()
            ? this.contactInformationForm.get("zip").value?.toString()
            : "";
        const zipExt = "";
        let relationships;
        if (
            this.selectedInd === "outsideHousehold" ||
            this.selectedInd?.toString() === "100"
        ) {

            relationships = this.individuals.map(
                (ind: IIndividual, idx: number) => {
                    console.log(this.getotherRelationshipsFormGroup(idx).value, "this.getotherRelationshipsFormGroup(idx).value")
                    if (Object.values(
                        this.getotherRelationshipsFormGroup(idx).value
                    )[0]) {  
                         
                    return {
                        individualLookupId: Object.keys(
                            this.getotherRelationshipsFormGroup(idx).value
                        )[0],
                        relationshipType: Object.values(
                            this.getotherRelationshipsFormGroup(idx).value
                        )[0],
                    };
                } 
                else{
                        return  null
                        // {
                            // individualLookupId: Object.keys(
                            //     this.getotherRelationshipsFormGroup(idx).value
                            // )[0],
                            // relationshipType: "0"
                        // }
                }
                }
            ).filter(obj => {if(obj) return true
            else return false});
        } else { 
            relationships = this.internal_relations.map(
                (ind: IIndividual, idx: number) => { 
                    if (this.getmemberRelationshipsFormGroup(idx).value){ 
                    return {
                        individualLookupId: ind.individualNumber,
                        relationshipType: Object.values(
                            this.getmemberRelationshipsFormGroup(idx).value
                        )[0],
                    };
                    }
                    else {
                        return {
                            // individualLookupId: ind.individualNumber,
                            // relationshipType:"0"
                        }
                    }
                }
            ).filter(obj => {
                if (obj.relationshipType && obj.relationshipType !== "0") return true
                else return false
            });
        }
        // const  relation = relationships.filter((item: any) => {

        //     return item.relationshipType != null &&  (typeof item.relationshipType == "string" && item.relationshipType !== "0")
        // })
        const contactInfoObj = {
            firstName: firstName,
            lastName: lastName,
            individualNumber: individualNumber,
            contactPreference: contactPreference,
            emailAddress: emailAddress,
            phoneNumber: phoneNumber,
            relationshipsToIndividual: relationships,
            address: {
                addressLine1: address1,
                addressLine2: address2,
                state: state,
                city: city,
                zip: zip,
                zipExtension: zipExt,
            },
        };
        this.contactInformationForm.markAllAsTouched();
        if (this.contactInformationForm.valid) {
            const storedHouseholdDetails = this.referralState?.household;
            const updatedHouseholdContact = {
                ...storedHouseholdDetails,
                ...contactInfoObj,
                isAddressGISValidated: this.isAddressGISValidated,
            };
            this.individuals = this.service.getIndividuals ?? [];
            const updatedIndi = this.individuals.map((ind) => {
                const newuser = { ...ind };
                const selectedUsers = Object.keys(this.currentServices);
                if (selectedUsers.indexOf(ind.individualNumber) == -1) {
                    console.log(ind.individualNumber, "ind.individualNumber");

                    newuser.reasonForReferral = "";
                    newuser.county = "";

                    // selectedUsers.indexOf(ind.individualNumber)
                }
                return newuser;
            });
            this.service.updateIndividualDetails(updatedIndi);

            this.service.updatedHousehold(updatedHouseholdContact);
            // if (this.selectedInd === "outsideHousehold") {
            // this.updateRelations(contactInfoObj)
            // }
            if (this.selectedPref == "M") {
                await this.validateAddress();
                // this.routingStratagy.validateAddress();
            } else {
                this.router.navigate([
                    RoutePath.REFERRALS + "/" + RoutePath.REFERRALS_SUMMARY,
                ]);
            }
            return true;
        }
        return true;
    }
    async validateAddress(): Promise<any> {
        this.household = this.service.getHousehold ?? [];

        const addressObj = {
            streetAddressLine1: this.household.address?.addressLine1,
            streetAddressLine2: this.household.address?.addressLine2,
            city: this.household.address?.city,
            state: this.household.address?.state,
            zip: this.household.address?.zip,
            county: "",
            isMailingAddress: true,
            zipExt: "",
        };
        const address = (await this.http
            .post(this.url, addressObj)
            .pipe(take(1))
            .toPromise()) as any;

        if (address.length) {
            this.isLoading = false;
            console.log(address, "add");
            ReferrralsGISValidationStrategy.validatedAddress = address;
            this.isAddressGISValidated = true;
            return this.router.navigate([
                RoutePath.REFERRALS +
                    "/" +
                    RoutePath.REFERRALS_ADDRESSVALIDATION,
            ]);
        } else {
            this.isAddressGISValidated = false;
        }
        this.cd.detectChanges();
    }
    useAnyway() {
        setTimeout(() => {
            this.closeModal.nativeElement.click();
            this.router.navigate([
                RoutePath.REFERRALS + "/" + RoutePath.REFERRALS_SUMMARY,
            ]);
        }, 100);
    }
    editAddress() {
        this.router.navigate([
            RoutePath.REFERRALS + "/" + RoutePath.REFERRALS_CONTACTINFORMATION,
        ]);
        this.isAddressGISValidated = true;
        // this.closeModal.nativeElement.click();
    }
    previous() {
        this.queueService.back();
    }

    ngOnDestroy() {
        this.formState.emit(MenuItemState.COMPLETED);
        this.service.formStateUpdated(
            this.routePath.REFERRALS_MOREINFORMATION,
            MenuItemState.COMPLETED
        );
    }
}
