import { ChangeDetectorRef, Component, OnInit  } from "@angular/core";
import {FormControl, FormGroup} from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { Store } from "@ngrx/store";
import { IApplyNowState } from "../../+state/apply-now.models";
import { AppStoreService } from "../../../app-store-service";
import { RoutePath } from "../../../shared/route-strategies";
import { UtilService } from "../../../shared/services/util.service";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { IHouseHold, IRepresentative, PageDirection } from "../../household/household-model";
import {Utility} from "../../../shared/utilities/Utility";


@Component({
    selector: "ui-compass-addition-contact-more-details",
    templateUrl: "./addition-contact-more-details.component.html",
    styleUrls: ["./addition-contact-more-details.component.css"],
})
export class AdditionalContactMoreDetailsComponent implements OnInit {
    additionalContactMoreDetailsForm: FormGroup | any | null;
    data: any;
    selectedPref: any;
    poaMap!: any;
    houseHoldPersons: IHouseHold[] = [];
    currentUserIndex!: string;
    currentUser!: IHouseHold;
    currentContact!: IRepresentative;
    currentContactDetails!: IHouseHold;
    getEmail = "";
    confirm = "";
    showPhoneNumrequired = "";
    showAddressFieldsRequired = "";
    states!: any[];
    applyNowState: IApplyNowState | undefined;
    fragment!: string;
    phoneNumber: any;
    emailAddress: any;
    showEmailRequired = "";
    addressLine2: any;
    addressLine1: any;
    showRequired = "";
    city: any;
    zip: any;
    constructor(
        private fb: FormBuilder,
        private route: Router,
        private cd: ChangeDetectorRef,
        private activedRoute: ActivatedRoute,
        private service: ApplyNowStoreService,
        private utilService: UtilService,
        private appService: AppStoreService
    ) {
        this.data = this.getData();
    }
    ngOnInit() {
        this.additionalContactMoreDetailsForm = this.fb.group({
            addressLine1: [""],
            addressLine2: [""],
            city: [""],
            state: [""],
            zip: [""],
            phoneNumber: ["",Validators.pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/)],
            secondaryContactNumber: ["",Validators.pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/)],
            otherContactNumber: [],
            emailAddress: ["",[Validators.email]],
            confirmEmailAddress: ["",[Validators.email,Utility.ConfirmEmailValidator('emailAddress')]],
            contactPreference: ["", Validators.required],
        });
        this.appService.getStates().subscribe((states) => {
            this.states = states;
            this.cd.detectChanges();
        });
        this.activedRoute.fragment.subscribe((fragment) => {
            if (fragment) {
                this.fragment = fragment;
            }
        });
        this.service.getAppData().subscribe((d) => {
            this.applyNowState = { ...d };
            if (this.applyNowState.houseHoldDetails.houseHoldPersons) {
                this.houseHoldPersons =
                    this.applyNowState.houseHoldDetails.houseHoldPersons;
            }
            this.poaMap =
                {
                    ...this.applyNowState.houseHoldDetails.pageAction?.poaMap,
                } || {};
        });
        this.activedRoute.params.subscribe((p) => {
            this.currentUserIndex = p.userId || "";
            this.currentUser =
                this.service.extractUser(
                    this.houseHoldPersons,
                    this.currentUserIndex
                ) || "";
            //alert(JSON.stringify(this.currentContact));
            if (
                this.currentUser.representativeContactInformation
                    ?.representativeContactPersons
            ) {
                this.currentContact =
                    this.currentUser.representativeContactInformation?.representativeContactPersons[
                        parseInt(this.fragment)
                    ];

                this.currentContactDetails =
                    this.service.extractUser(
                        this.houseHoldPersons,
                        this.currentContact.partOfHousehold?.individualNumber
                    ) || "";
                setTimeout(() => {
                    this.additionalContactMoreDetailsForm.patchValue({
                        phoneNumber: this.currentContact.homePhoneNumber,
                        secondaryContactNumber: this.currentContact.workPhone,
                        otherContactNumber:
                            this.currentContact.otherPhoneNumber,
                        emailAddress: this.currentContact.emailAddress,
                      confirmEmailAddress: this.currentContact.emailAddress,
                        contactPreference:
                            this.currentContact.preferredMethodOfContact,
                        addressLine1: this.currentContact.address?.addressLine1,
                        addressLine2: this.currentContact.address?.addressline2,
                        city: this.currentContact.address?.city,
                        state: this.currentContact.address?.state,
                        zip: this.currentContact.address?.zip,
                    });
                }, 100);
            }
        });

    }
      selectCommunicationMode(selectedValue: any){
                this.selectedPref = selectedValue;
                this.additionalContactMoreDetailsForm
                    .get("phoneNumber")
                    .clearValidators();
            this.additionalContactMoreDetailsForm
              .get("secondaryContactNumber")
              .clearValidators();
          this.additionalContactMoreDetailsForm
            .get("otherContactNumber")
            .clearValidators();
                this.additionalContactMoreDetailsForm
                    .get("emailAddress")
                    .clearValidators();

                this.additionalContactMoreDetailsForm
                    .get("addressLine1")
                    .clearValidators();
                this.additionalContactMoreDetailsForm
                    .get("addressLine2")
                    .clearValidators();
                this.additionalContactMoreDetailsForm
                    .get("city")
                    .clearValidators();
                this.additionalContactMoreDetailsForm
                    .get("state")
                    .clearValidators();
                this.additionalContactMoreDetailsForm
                    .get("zip")
                    .clearValidators();
                this.showRequired = "";
                this.showAddressFieldsRequired = "";
                if (this.selectedPref == "P") {
                    this.additionalContactMoreDetailsForm
                        .get("phoneNumber")
                        .setValidators(Validators.required);
                  this.additionalContactMoreDetailsForm
                    .get("secondaryContactNumber")
                    .setValidators(Validators.required);
                  this.additionalContactMoreDetailsForm
                    .get("otherContactNumber")
                    .setValidators(Validators.required);
                    this.showPhoneNumrequired = "(required)";
                    this.additionalContactMoreDetailsForm
                        .get("emailAddress")
                        .clearValidators();

                    this.showEmailRequired = "";
                    this.additionalContactMoreDetailsForm
                        .get("addressLine1")
                        .clearValidators();
                    this.additionalContactMoreDetailsForm
                        .get("addressLine2")
                        .clearValidators();
                    this.additionalContactMoreDetailsForm
                        .get("city")
                        .clearValidators();
                    this.additionalContactMoreDetailsForm
                        .get("state")
                        .clearValidators();
                    this.additionalContactMoreDetailsForm
                        .get("zip")
                        .clearValidators();
                    this.showAddressFieldsRequired = "";
                } else if (this.selectedPref == "E") {
                    this.additionalContactMoreDetailsForm
                        .get("emailAddress")
                        .setValidators(Validators.required);

                    this.additionalContactMoreDetailsForm
                        .get("phoneNumber")
                        .clearValidators();
                  this.additionalContactMoreDetailsForm
                    .get("secondaryContactNumber")
                    .clearValidators();
                  this.additionalContactMoreDetailsForm
                    .get("otherContactNumber")
                    .clearValidators();
                    this.showPhoneNumrequired = "";
                    this.showEmailRequired = "(required)";
                    this.additionalContactMoreDetailsForm
                        .get("addressLine1")
                        .clearValidators();
                    this.additionalContactMoreDetailsForm
                        .get("addressLine2")
                        .clearValidators();
                    this.additionalContactMoreDetailsForm
                        .get("city")
                        .clearValidators();
                    this.additionalContactMoreDetailsForm
                        .get("state")
                        .clearValidators();
                    this.additionalContactMoreDetailsForm
                        .get("zip")
                        .clearValidators();
                    this.showAddressFieldsRequired = "";
                } else if (this.selectedPref == "M") {
                    this.additionalContactMoreDetailsForm
                        .get("addressLine1")
                        .setValidators(Validators.required);
                    // this.contactInformationForm
                    //     .get("addressLine2")
                    //     .setValidators(Validators.required);
                    this.additionalContactMoreDetailsForm
                        .get("city")
                        .setValidators(Validators.required);
                    this.additionalContactMoreDetailsForm
                        .get("state")
                        .setValidators(Validators.required);
                    this.additionalContactMoreDetailsForm
                        .get("zip")
                        .setValidators(Validators.required);
                    this.additionalContactMoreDetailsForm
                        .get("phoneNumber")
                        .clearValidators();
                  this.additionalContactMoreDetailsForm
                    .get("secondaryContactNumber")
                    .clearValidators();
                  this.additionalContactMoreDetailsForm
                    .get("otherContactNumber")
                    .clearValidators();
                    this.additionalContactMoreDetailsForm
                        .get("emailAddress")
                        .clearValidators();

                    this.showEmailRequired = "";
                    this.showPhoneNumrequired = "";
                    this.showAddressFieldsRequired = "(required)";
                }
                this.additionalContactMoreDetailsForm
                    .get("phoneNumber")
                    .updateValueAndValidity();
              this.additionalContactMoreDetailsForm
                .get("secondaryContactNumber")
                .updateValueAndValidity();
              this.additionalContactMoreDetailsForm
                .get("otherContactNumber")
                .updateValueAndValidity();
                this.additionalContactMoreDetailsForm
                    .get("emailAddress")
                    .updateValueAndValidity();


                this.additionalContactMoreDetailsForm
                    .get("addressLine1")
                    .updateValueAndValidity();
                this.additionalContactMoreDetailsForm
                    .get("addressLine2")
                    .updateValueAndValidity();
                this.additionalContactMoreDetailsForm
                    .get("city")
                    .updateValueAndValidity();
                this.additionalContactMoreDetailsForm
                    .get("state")
                    .updateValueAndValidity();
                this.additionalContactMoreDetailsForm
                    .get("zip")
                    .updateValueAndValidity();
        this.additionalContactMoreDetailsForm.controls["zip"].setValidators(Utility.zipCodeValidator());
        // this.additionalContactMoreDetailsForm.get("phoneNumber").setValidators(Utility.phoneNumberValidator());this.additionalContactMoreDetailsForm.get("phoneNumber").setValidators(Utility.phoneNumberValidator());
        // this.additionalContactMoreDetailsForm.get("secondaryContactNumber").setValidators(Utility.phoneNumberValidator());
        // this.additionalContactMoreDetailsForm.get("otherContactNumber").setValidators(Utility.phoneNumberValidator());
        this.additionalContactMoreDetailsForm
          .get("zip")
          .updateValueAndValidity();
        // this.additionalContactMoreDetailsForm
        //   .get("phoneNumber")
        //   .updateValueAndValidity();
        // this.additionalContactMoreDetailsForm
        //   .get("secondaryContactNumber")
        //   .updateValueAndValidity();
        // this.additionalContactMoreDetailsForm
        //   .get("otherContactNumber")
        //   .updateValueAndValidity();

        this.cd.detectChanges();
    }


    get f() {
        return this.additionalContactMoreDetailsForm.controls;
    }

  OnlyNumberAllowed(event: { which: any; keyCode: any }, field: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode === 8 &&  this.additionalContactMoreDetailsForm.get(field).value.length < 4  ) {
      this.additionalContactMoreDetailsForm.value[field] = undefined;
      this.additionalContactMoreDetailsForm.get(field).errors = {};
      this.additionalContactMoreDetailsForm.get(field).status = "VALID";
      this.additionalContactMoreDetailsForm.status = "VALID";
      return true;
    }
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

    GetEmail(value: string) {
        this.getEmail = value;
    }
    getConfirmEmail(value: string) {
        this.confirm = value;
    }

    isFieldValid(field: string): boolean {

        return (
            this.additionalContactMoreDetailsForm.get(field)?.status !==
                "VALID" &&
            this.additionalContactMoreDetailsForm.get(field)?.touched
        );
    }

    errorMap(field: string) {
        switch (field) {
            case "contactPreference":
                if (
                    this.additionalContactMoreDetailsForm.get(
                        "contactPreference"
                    )?.errors?.required
                ) {
                    return "Select Best way to Contact.";
                }
                break;
            case "phoneNumber":
                if (
                    this.additionalContactMoreDetailsForm.get("phoneNumber")
                        .errors?.required
                ) {
                    return "Enter the Phone Number.";
                }
                if (
                    this.additionalContactMoreDetailsForm.get("phoneNumber")
                        .errors?.pattern
                ) {
                    return "Enter a valid phone number.";
                }
                break;
          case "secondaryContactNumber":
            if (
              this.additionalContactMoreDetailsForm.get("secondaryContactNumber")
                .errors?.pattern
            ) {
              return "Enter a valid phone number.";
            }
            break;
          case "otherContactNumber":
            if (
              this.additionalContactMoreDetailsForm.get("otherContactNumber")
                .errors?.pattern
            ) {
              return "Enter a valid phone number.";
            }
            break;
            case "confirmEmailAddress":
                if (this.getEmail !== this.confirm) {
                    return "Email and Confirm email should match";
                } else {
                    return "This is required";
                }
                break;
            case "zip":
                if (
                    this.additionalContactMoreDetailsForm.get("zip").errors

                ) {
                    return "Please enter valid zip code";
                }
                break;
            default:
                break;
        }

        return "";
    }

    getData() {
        return {
            contacts: [
                {
                    key: "mobile",
                    value: "Mobile",
                },
                {
                    key: "mail",
                    value: "Through Mail",
                },
            ],
        };
    }

    onSubmit() {
          this.additionalContactMoreDetailsForm.markAllAsTouched();

   if (this.additionalContactMoreDetailsForm.status.toLowerCase() === "valid") {
        let isNextPage = false;
        this.poaMap[this.currentUserIndex] = true;
        const storedHouseholdDetails = this.applyNowState?.houseHoldDetails;
        const contactDetails = {
            firstName:
                this.currentContact.firstName ||
                this.currentContactDetails.firstName,

            lastName:
                this.currentContact.lastName ||
                this.currentContactDetails.lastName,
            homePhoneNumber:
                this.additionalContactMoreDetailsForm.get("phoneNumber").value,
            workPhone: this.additionalContactMoreDetailsForm.get(
                "secondaryContactNumber"
            ).value,
            otherPhoneNumber:
                this.additionalContactMoreDetailsForm.get("otherContactNumber")
                    .value,
            emailAddress:
                this.additionalContactMoreDetailsForm.get("emailAddress").value,
            preferredMethodOfContact:
                this.additionalContactMoreDetailsForm.get("contactPreference")
                    .value,
            address: {
                state: this.additionalContactMoreDetailsForm.get("state").value,
                addressLine1:
                    this.additionalContactMoreDetailsForm.get("addressLine1")
                        .value,
                addressline2:
                    this.additionalContactMoreDetailsForm.get("addressLine2")
                        .value,
                city: this.additionalContactMoreDetailsForm.get("city").value,
                zip: this.additionalContactMoreDetailsForm.get("zip").value,
                isThisAddressEffectiveImmediately: true,
                addressEffectiveDate: new Date().toISOString().slice(0, 10),
                zipExtension: "",
            },
        };
        const currentContacts =
            this.currentUser.representativeContactInformation
                ?.representativeContactPersons || [];
        const currentPersonRepresentive = currentContacts.map(
            (ct: IRepresentative, i) => {
                if (i === parseInt(this.fragment)) {
                    this.fragment = i.toString();
                    const finalContactObj = { ...ct, ...contactDetails };
                    return finalContactObj;
                } else {
                    return ct;
                }
            }
        );
        const updatedHouseholdPersons = this.houseHoldPersons?.map(
            (person: IHouseHold) => {
                const personToBeUpdated = { ...person };
                if (person.id?.toString() === this.currentUser.id?.toString()) {
                    personToBeUpdated.representativeContactInformation = {
                        hasRepresentativeAttorneyOrContact: "Y",
                        isAttendingTraining: "Y",
                        representativeContactPersons: currentPersonRepresentive,
                    };
                }
                return personToBeUpdated;
            }
        );

        this.additionalContactMoreDetailsForm.reset();

        const updatedPageAction = {
            ...storedHouseholdDetails?.pageAction,
            poaMap: {
                ...storedHouseholdDetails?.pageAction?.poaMap,
                ...this.poaMap,
            },
            serviceDirection: PageDirection.NEXT,
        };
       if (storedHouseholdDetails)
            this.service.updateHouseHoldDetails({
                ...storedHouseholdDetails,
                ...{ pageAction: updatedPageAction },
                ...{ houseHoldPersons: updatedHouseholdPersons },
            });
        if (this.poaMap != null) {
            isNextPage = this.utilService.isNextPage(this.poaMap);
        }
        if (isNextPage) {
            this.utilService

                .getCurrentUserIdPageAction(this.poaMap, PageDirection.NEXT)

                .subscribe((id: any) => {
                    this.currentUserIndex = id.toString();

                    this.route.navigate([
                        RoutePath.APPLYNOW +
                            "/" +
                            RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                            "/" +
                            RoutePath.APPLYNOW_ADDITIONAL_CONTACT_DETAILS,
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
                    RoutePath.APPLYNOW_ADDITIONAL_CONTACT_SUMMARY,
            ]);

        }
    }
    }

    previous(): void {
        this.route.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_ADDITIONAL_CONTACT_DETAILS,
            { userId: this.currentUserIndex },
        ]);
    }
}
