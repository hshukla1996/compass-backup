import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { IApplyNowState } from "../../+state/apply-now.models";
import { AppStoreService } from "../../../app-store-service"; 
import { ApplyNowVoterReviewAddressStrategy } from "../../../shared/route-strategies/apply-now/voter-review-address";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { ApplyNowGISValidationStrategy } from "../../household/household-address/household-address-validation-service";
import { IHouseholdAddress } from "../../household/household-model";
import { HouseholdReviewAddress } from "../../household/models/householdReviewAddress";
import { HouseholdFormDataService } from "../../household/services/household-form-data.service";
import { ApplyNowVoterRegistrationGISValidationStrategy } from "../residential-address/residential-address-validation-service";
import { IAddressState } from "../voter-registration-model/voter-registration-model";

@Component({
    selector: "compass-ui-voter-address-review",
    templateUrl: "./voter-address-review.component.html",
    styleUrls: ["./voter-address-review.component.scss"], 
    providers: [ApplyNowVoterReviewAddressStrategy],
})
export class VoterAddressReviewComponent implements OnInit {
    householdReviewAddress: HouseholdReviewAddress;
    householdReviewAddressForm: FormGroup | any;
    selectedUserids: string[] = [];
    displayError: boolean = false;
    applicantAddError = false;
    mailingAddError = false;
    applyNowState!: IApplyNowState;
    houseHoldApplicantAddress!: IAddressState;
    houseHoldMailingAddress!: IAddressState;
    data: any;
    //@Output() dataUpdated = new EventEmitter<HouseholdHead>();
    validatedAddress: any;

    mailvalidatedAddress: any;
    constructor(
        public householdFormDataService: HouseholdFormDataService,
        private householdRevAdd: FormBuilder,
        private routingStratagy: ApplyNowVoterReviewAddressStrategy,
        private router: Router,
        private cd: ChangeDetectorRef,
        private appService: AppStoreService,
        private service: ApplyNowStoreService
    ) {
        this.householdReviewAddress =
            householdFormDataService.householdReviewAddress;
        //window.onbeforeunload = (e) =>{

        // this.router.navigate([this.routingStratagy.previousRoute()]);
        //}
    }

    ngOnInit(): void {
        this.householdReviewAddressForm = this.householdRevAdd.group({
            uspsformat: "",
            addr: ""
        });

        this.validatedAddress = ApplyNowVoterRegistrationGISValidationStrategy.validatedAddress;
        if (this.validatedAddress.primary === "" && this.validatedAddress.mailing === "") {
            this.previous();
        }

        // console.log("fromusps",this.mailvalidatedAddress)
        //   setTimeout(() => {
        // this.validatedAddress = ApplyNowGISValidationStrategy.validatedAddress[0];
        //     this.cd.detectChanges();
        // console.log(this.mailvalidatedAddress, 'mailvalidatedAddress');
        // }, 500)



        this.service.getAppData().subscribe(d => {
            this.applyNowState = { ...d };
            this.houseHoldApplicantAddress = this.applyNowState.voterRegistration?.voterIndividual?.residentialAddress as IAddressState;
            this.houseHoldMailingAddress = this.applyNowState.voterRegistration?.voterIndividual?.mailingAddress as IAddressState;
            this.cd.detectChanges();
        })
    }

    isFieldValid(field: string): boolean {
        return (
            this.householdReviewAddressForm.get(field).status !== "VALID" &&
            this.householdReviewAddressForm.get(field).touched
        );
    }

    /*onSubmit(): boolean {
        if (this.selectedUserids.length > 0) {
            const storeHouseholdDetails = this.applyNowState.houseHoldDetails;
            const updatedHouseholddetails = {
                : this.selectedUserids,
            };

            this.service.updateHouseHoldDetails({
                ...storeHouseholdDetails,
                ...updatedHouseholddetails,
            });
            this.router.navigate([this.routingStratagy.nextRoute()]);
            return true;
        } else {
            this.displayError = true;
            return false;
        }
    }*/

    onSubmit(): boolean {
        console.log(this.householdReviewAddressForm.get('uspsformat').value)
        const storedHouseHoldDetails =
            this.applyNowState?.voterRegistration;
        let updatedHousehold;
        let updatedApplicantAddress;
        let updatedMailingAddress;
        if (this.householdReviewAddressForm.get('uspsformat').value === "uspsform") {
            updatedApplicantAddress = {

                ...storedHouseHoldDetails?.voterIndividual?.residentialAddress,
                isAddressGISValidated: true,
                addressLine1: this.validatedAddress.primary.street1,
                addressline2: this.validatedAddress.primary.street2,
                city: this.validatedAddress.primary.city,
                state: this.validatedAddress.primary.state,
                zip: this.validatedAddress.primary.zip,
            }
            this.applicantAddError = false;
        }
        else if (this.householdReviewAddressForm.get('uspsformat').value === "enteredAddress") {
            updatedApplicantAddress = {
                ...storedHouseHoldDetails?.voterIndividual?.residentialAddress,
                isAddressGISValidated: false,
                addressLine1: this.houseHoldApplicantAddress?.addressLine1,
                addressline2: this.houseHoldApplicantAddress?.addressline2,
                city: this.houseHoldApplicantAddress?.city,
                state: this.houseHoldApplicantAddress?.state,
                zip: this.houseHoldApplicantAddress?.zip,
            }
            this.applicantAddError = false;
        }
        else {
            this.applicantAddError = true;
            return false;
        }

        if (this.houseHoldMailingAddress.addressLine1 && this.validatedAddress.mailing) {
            if (this.householdReviewAddressForm.get('addr').value === "uspsmailingform") {
                updatedMailingAddress = {
                    ...storedHouseHoldDetails?.voterIndividual?.mailingAddress,
                    addressLine1: this.validatedAddress.mailing?.street1,
                    addressline2: this.validatedAddress.mailing?.street2,
                    city: this.validatedAddress.mailing?.city,
                    state: this.validatedAddress.mailing?.state,
                    zip: this.validatedAddress.mailing?.zip,
                    isAddressGISValidated: false,
                }
                this.mailingAddError = false;
            } else if (this.householdReviewAddressForm.get('addr').value === "enteredMailing") {
                updatedMailingAddress = {
                    ...storedHouseHoldDetails?.voterIndividual?.mailingAddress,
                    addressLine1: this.houseHoldMailingAddress?.addressLine1,
                    addressline2: this.houseHoldMailingAddress?.addressline2,
                    city: this.houseHoldMailingAddress?.city,
                    state: this.houseHoldMailingAddress?.state,
                    zip: this.houseHoldMailingAddress?.zip,
                    isAddressGISValidated: false,

                }
                this.mailingAddError = false;
            }
            else {
                this.mailingAddError = true;
                return false;
            }
            updatedHousehold = {  ...storedHouseHoldDetails?.voterIndividual, residentialAddress: updatedApplicantAddress,  mailingAddress: updatedMailingAddress,
            }


        }
        else {
            updatedHousehold = {
                ...storedHouseHoldDetails?.voterIndividual,
                residentialAddress: updatedApplicantAddress,
            }
        }
        this.service.updatedVoterRegistrationDetails({
            ...storedHouseHoldDetails,
            voterIndividual: updatedHousehold,
        });
        this.router.navigate([this.routingStratagy.nextRoute()]);
        return true;
    }

    previous() {
        this.router.navigate([this.routingStratagy.previousRoute()]);
    }
}
