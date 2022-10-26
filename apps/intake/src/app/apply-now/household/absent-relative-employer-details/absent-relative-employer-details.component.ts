import { ApplyNowAbsentRelativeEmployerDetailsStrategy } from "../../../shared/route-strategies/apply-now/absentRelativeEmployerDetails";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, HostListener } from "@angular/core";
import { HouseholdFormDataService } from '../services/household-form-data.service';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from "@angular/router";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { AppStoreService } from "../../../app-store-service";
import { IApplyNowState } from "../../+state/apply-now.models";
import { IAbsentRelative, IHouseHold, IHouseHoldDetails } from "../household-model";
import { delay, first, of, Subscription } from 'rxjs';
//import { ApplyNowGISValidationStrategy } from './household-address-validation-service'
import { ScreenQueueUtil } from "../../../shared/services/screen_queue_util.service";
import { PageActionUtil } from '../../../shared/services/page-action-util.service';
import { UtilService } from '../../../shared/services/util.service';
import {RoutePath} from "../../../shared/route-strategies";
import { Utility } from "../../../shared/utilities/Utility";

@Component({
    selector: "compass-ui-absent-relative-employer-details",
    templateUrl: "./absent-relative-employer-details.component.html",
    styleUrls: ["./absent-relative-employer-details.component.scss"],
    providers: [ApplyNowAbsentRelativeEmployerDetailsStrategy],
})
export class AbsentRelativeEmployerDetailsComponent implements OnInit {
    data: any;
    absentRelativeEmployerDetailsForm: FormGroup | any;
    applyNowState!: IApplyNowState;
    states: any;
    contactNumber: string = "";
    firstName: any;
    storedHouseHoldDetail!: IHouseHoldDetails;
    absentRelative!: IAbsentRelative[];
    currentUserName!: string;
    currentUserIndex!: number;
    currentUser: IAbsentRelative = {};
    absentRelatives: IAbsentRelative[] = [];
    visit: boolean = false;
    visitCount: any;
    showError = true;

    constructor(
        public householdFormDataService: HouseholdFormDataService,
        private queueService: ScreenQueueUtil,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private service: ApplyNowStoreService,
        private router: Router,
        private routingStrategy: ApplyNowAbsentRelativeEmployerDetailsStrategy,
        // private routingStratagy: ApplyNowGISValidationStrategy,
        private appService: AppStoreService
    ) {}
    @HostListener("paste", ["$event"]) blockPaste(e: KeyboardEvent) {
        e.preventDefault();
    }
    ngOnInit(): void {
        const x = sessionStorage.getItem("storageId");

        this.absentRelativeEmployerDetailsForm = this.fb.group({
            id: x,
            Address: {
                AddressLine1: "",
                AddressLine2: "",
                City: "",
                State: "",
                Zip: "",
            },
            EmployerName: "",
            EmployerPhoneNumber: "",
            EmployerPhoneNumberExtension: "",
        });

        this.appService.getStates().subscribe((states) => {
            this.states = states;
            this.cd.detectChanges();
        });

        this.service.getAppData().subscribe((d) => {
            this.storedHouseHoldDetail = d?.houseHoldDetails;
            this.applyNowState = { ...d };
            if (this.applyNowState.houseHoldDetails.absentRelative) {
                this.absentRelatives =
                    this.applyNowState.houseHoldDetails.absentRelative;
            }
            this.currentUser =
                this.extractUser(this.absentRelatives, this.currentUserIndex) ||
                "";
            this.absentRelativeEmployerDetailsForm
                .get("AddressLine1")
                .patchValue(this.currentUser.Employer?.Address?.AddressLine1);
            this.absentRelativeEmployerDetailsForm
                .get("AddressLine2")
                .patchValue(this.currentUser.Employer?.Address?.AddressLine2);
            this.absentRelativeEmployerDetailsForm
                .get("City")
                .patchValue(this.currentUser.Employer?.Address?.City);
            this.absentRelativeEmployerDetailsForm
                .get("State")
                .patchValue(this.currentUser.Employer?.Address?.State);
            this.absentRelativeEmployerDetailsForm
                .get("Zip")
                .patchValue(this.currentUser.Employer?.Address?.Zip);
            this.absentRelativeEmployerDetailsForm
                .get("EmployerName")
                .patchValue(this.currentUser.Employer?.EmployerName);
            this.absentRelativeEmployerDetailsForm
                .get("EmployerPhoneNumber")
                .patchValue(this.currentUser.Employer?.EmployerPhoneNumber);
            this.absentRelativeEmployerDetailsForm
                .get("EmployerPhoneNumberExtension")
                .patchValue(
                    this.currentUser.Employer?.EmployerPhoneNumberExtension
                );
            this.cd.detectChanges();
        });
        this.absentRelativeEmployerDetailsForm.get("Zip").setValidators(Utility.zipCodeValidator());
        this.absentRelativeEmployerDetailsForm.get("EmployerPhoneNumber").setValidators(Utility.phoneNumberValidator());
    }
    extractUser(persons: any, userId: any) {
        const currentUser = persons.filter((person: IAbsentRelative) => {
            return (
                person.id?.toString() === sessionStorage.getItem("storageId")
            );
        })[0];
        return currentUser;
    }

    OnlyNumberAllowed(event: { which: any; keyCode: any }, field: any): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode === 8 &&  this.absentRelativeEmployerDetailsForm.get(field).value.length < 3) {
            this.absentRelativeEmployerDetailsForm.value[field] = undefined;
            this.absentRelativeEmployerDetailsForm.get(field).errors = {};
            this.absentRelativeEmployerDetailsForm.get(field).value = undefined;
            this.absentRelativeEmployerDetailsForm.get(field).status = "VALID";
            this.absentRelativeEmployerDetailsForm.status = "VALID";
            return true;
        }
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    checkName(check: any) {
        let charCode = check.charCode;
        return (
            (charCode > 47 && charCode < 58) ||
            (charCode > 64 && charCode < 91) ||
            (charCode > 96 && charCode < 123) ||
            charCode == 39 ||
            charCode == 40 ||
            charCode == 41 ||
            charCode == 45 ||
            charCode == 44 ||
            charCode == 92
        );
    }
    checkAddress(check: any) {
        let charCode = check.charCode;
        return (
            (charCode > 47 && charCode < 58) ||
            (charCode > 64 && charCode < 91) ||
            (charCode > 96 && charCode < 123) ||
            charCode == 35 ||
            charCode == 45 ||
            charCode == 47
        );
    }
    checkCity(check: any) {
        let charCode = check.charCode;
        return (
            (charCode > 64 && charCode < 91) ||
            (charCode > 96 && charCode < 123) ||
            charCode == 39 ||
            charCode == 92 ||
            charCode == 45
        );
    }

    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return "";
        }

        switch (field) {
            case "AddressLine1":
                if (
                    this.absentRelativeEmployerDetailsForm.get("AddressLine1")
                        .errors.required
                ) {
                    return "No residential street address is entered";
                }
                break;
            case "City":
                if (
                    this.absentRelativeEmployerDetailsForm.get("City").errors
                        .required
                ) {
                    return "No city is entered";
                }
                break;
            case "State":
                if (
                    this.absentRelativeEmployerDetailsForm.get("State").errors
                        .required
                ) {
                    return "No state is selected from the dropdown";
                }
                break;
            case "Zip":
                if (
                    this.absentRelativeEmployerDetailsForm.get("Zip").errors
                        .required
                ) {
                    return "No zip code is entered";
                }
                else if (this.absentRelativeEmployerDetailsForm.get("Zip").errors.invalidNumber) {
                    return "Please enter 5 digit zip code";
                }
                break;
            default:
                return "";
                break;
        }
        return "";
    }

    isFieldValid(field: string): boolean {
        const formField = this.absentRelativeEmployerDetailsForm.get(field);
        return (
            formField &&
            this.absentRelativeEmployerDetailsForm.get(field).status !==
                "VALID" &&
            (this.absentRelativeEmployerDetailsForm.get(field).dirty ||
                this.absentRelativeEmployerDetailsForm.get(field).touched)
        );
    }

    GetValue(value: string) {
        this.contactNumber = value;
    }

    ContactNumberDiv: boolean = false;
    showContactNumber() {
        this.ContactNumberDiv = true;
    }
    onSubmit(): boolean {
        if (this.absentRelativeEmployerDetailsForm.status.toLowerCase() !== "valid") return false;
        var x = "absentRelativeEmployerDetails";
        sessionStorage.setItem("routingPath", x);
        this.service.validateAllFormFields(
            this.absentRelativeEmployerDetailsForm
        );
        const storedHouseholdDetails = this.applyNowState?.houseHoldDetails;
        const updatedHouseholdPersons =
            this.applyNowState?.houseHoldDetails.absentRelative?.map(
                (person: IAbsentRelative) => {
                    if (person.id === this.currentUser.id) {
                        const personToBeUpdated = { ...person };
                        personToBeUpdated.Employer = {
                            EmployerName:
                                this.absentRelativeEmployerDetailsForm.get(
                                    "EmployerName"
                                ).value,
                            EmployerPhoneNumber:
                                this.absentRelativeEmployerDetailsForm.get(
                                    "EmployerPhoneNumber"
                                ).value,
                            EmployerPhoneNumberExtension:
                                this.absentRelativeEmployerDetailsForm.get(
                                    "EmployerPhoneNumberExtension"
                                ).value,
                        };
                        personToBeUpdated.Employer.Address = {
                            AddressLine1:
                                this.absentRelativeEmployerDetailsForm.get(
                                    "AddressLine1"
                                ).value,
                            AddressLine2:
                                this.absentRelativeEmployerDetailsForm.get(
                                    "AddressLine2"
                                ).value,
                            City: this.absentRelativeEmployerDetailsForm.get(
                                "City"
                            ).value,
                            State: this.absentRelativeEmployerDetailsForm.get(
                                "State"
                            ).value,
                            Zip: this.absentRelativeEmployerDetailsForm.get(
                                "Zip"
                            ).value,
                        };
                        return personToBeUpdated;
                    } else {
                        return person;
                    }
                }
            );

        if (storedHouseholdDetails) {
            this.service.updateHouseHoldDetails({
                ...storedHouseholdDetails,
                ...{ absentRelative: updatedHouseholdPersons },
            });
        }
        this.router.navigate([
            RoutePath.APPLYNOW + 
            '/' + RoutePath.APPLYNOW_HOUSEHOLD + 
            '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDABSENTRELATIVENONRESIDENTIALPROPERTY]);
        return true;
    }

    previous() {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_HOUSEHOLD +
                "/" +
                RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVEADDRESS,
        ]);
    }
}
