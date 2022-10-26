import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from "@angular/core";
import { HouseholdFormDataService } from '../services/household-form-data.service';
import { HouseholdReviewAddress } from '../models/householdReviewAddress';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ApplyNowHouseholdAddressReviewStrategy } from '../../../shared/route-strategies/apply-now/householdAddressReview';
import { Router } from "@angular/router";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { AppStoreService } from "../../../app-store-service";
import { IApplyNowState, Programs } from "../../+state/apply-now.models";
import { IHouseHold, IHouseholdAddress } from "../household-model";
import { ApplyNowGISValidationStrategy } from "../household-address/household-address-validation-service";
import {RoutePath} from "../../../shared/route-strategies";


@Component({
  selector: "compass-ui-household-review-address",
  templateUrl: "./household-review-address.component.html",
  styleUrls: ["./household-review-address.component.scss"],
  providers: [ApplyNowHouseholdAddressReviewStrategy],
})
export class HouseholdReviewAddressComponent implements OnInit {
  householdReviewAddress: HouseholdReviewAddress;
  householdReviewAddressForm: FormGroup | any;
  selectedUserids: string[] = [];
  displayError: boolean = false;
  applicantAddError = false;
  mailingAddError = false;
  applyNowState!: IApplyNowState;
  houseHoldApplicantAddress!: IHouseholdAddress;
  houseHoldMailingAddress!: IHouseholdAddress;
  data: any;
  countyValue: any;
  //@Output() dataUpdated = new EventEmitter<HouseholdHead>();
  validatedAddress: any;
  sevicesselected: Array<any> = [];

  mailvalidatedAddress: any;
  counties: any;
  constructor(
    public householdFormDataService: HouseholdFormDataService,
    private householdRevAdd: FormBuilder,
    private routingStratagy: ApplyNowHouseholdAddressReviewStrategy,
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

    this.validatedAddress = ApplyNowGISValidationStrategy.validatedAddress;

    if (!this.validatedAddress.primary && !this.validatedAddress.mailing ) {
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
      this.sevicesselected = this.applyNowState?.programSelection?.programs || [];
      this.houseHoldApplicantAddress = this.applyNowState.houseHoldDetails.Household.applicantAddress as IHouseholdAddress;
      this.houseHoldMailingAddress = this.applyNowState.houseHoldDetails.Household.mailingAddress as IHouseholdAddress;
      this.getCountyName(this.houseHoldApplicantAddress.county);
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

  getCountyName(countyId: any) {
    this.appService.getCounties().subscribe((c: any) => {
      this.counties = c.tableRows;

      this.cd.detectChanges();
    });
    this.countyValue = this.counties.filter(
      (c: any) => c.id === countyId

    )[0]?.displayValue
    return this.counties.filter(
      (c: any) => c.id === countyId

    )[0]?.displayValue

  }
  getCountyId(countyName: any) {
    this.appService.getCounties().subscribe((c: any) => {
      this.counties = c.tableRows;
      console.log("---", this.counties, countyName )
      this.cd.detectChanges();
    });
    return this.counties.filter(
      (c: any) => c.displayValue.toLowerCase() === countyName.toLowerCase()

    )[0]?.id

  }
  onSubmit(): boolean {

    console.log(this.householdReviewAddressForm.get('uspsformat').value)
    const storedHouseHoldDetails =
      this.applyNowState?.houseHoldDetails;
    let updatedHousehold;
    let updatedApplicantAddress;
    let updatedMailingAddress;
    if (this.householdReviewAddressForm.get('uspsformat').value === "uspsform") {
      updatedApplicantAddress = {
        ...storedHouseHoldDetails?.Household.applicantAddress,
        isAddressGISValidated: true,
        addressLine1: this.validatedAddress.primary.street1,
        addressLine2: this.validatedAddress.primary.street2,
        county:this.getCountyId(this.validatedAddress.primary.county),
        city: this.validatedAddress.primary.city,
        state: this.validatedAddress.primary.state,
        zip: this.validatedAddress.primary.zip,
      }
      this.applicantAddError = false;
    }
    else if (this.householdReviewAddressForm.get('uspsformat').value === "enteredAddress") {
      updatedApplicantAddress = {
        ...storedHouseHoldDetails?.Household.applicantAddress,
        isAddressGISValidated: false,
        addressLine1: this.houseHoldApplicantAddress?.addressLine1,
        addressLine2: this.houseHoldApplicantAddress?.addressLine2,
        city: this.houseHoldApplicantAddress?.city,
        county:this.houseHoldApplicantAddress?.county,
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
          ...storedHouseHoldDetails?.Household.mailingAddress,
          addressLine1: this.validatedAddress.mailing?.street1,
          addressLine2: this.validatedAddress.mailing?.street2,
          city: this.validatedAddress.mailing?.city,
          county:this.getCountyId(this.validatedAddress.mailing.county),
          state: this.validatedAddress.mailing?.state,
          zip: this.validatedAddress.mailing?.zip,
          isAddressGISValidated: false,
        }
        this.mailingAddError = false;
      } else if (this.householdReviewAddressForm.get('addr').value === "enteredMailing") {
        updatedMailingAddress = {
          ...storedHouseHoldDetails?.Household.mailingAddress,
          addressLine1: this.houseHoldMailingAddress?.addressLine1,
          addressLine2: this.houseHoldMailingAddress?.addressLine2,
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
      updatedHousehold = {
        ...storedHouseHoldDetails?.Household,
        applicantAddress: updatedApplicantAddress,
        mailingAddress: updatedMailingAddress,
      }


    }
    else {
      updatedHousehold = {
        ...storedHouseHoldDetails?.Household,
        applicantAddress: updatedApplicantAddress,
      }
    }
    this.service.updateHouseHoldDetails({
      ...storedHouseHoldDetails,
      Household: updatedHousehold,
    });
    if (this.sevicesselected.indexOf(Programs.CA) > -1 ||
        this.sevicesselected.indexOf(Programs.LN) > -1 ||
        this.sevicesselected.indexOf(Programs.LI) > -1 ||
        this.sevicesselected.indexOf(Programs.WN) > -1 ||
        this.sevicesselected.indexOf(Programs.WNR) > -1 ||
        this.sevicesselected.indexOf(Programs.ECA) > -1) {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_HOUSEHOLD +
                "/" +
                RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDPREVIOUSADDRESS,
        ]);
    }
    else {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_HOUSEHOLD +
                "/" +
                RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDCONTACTINFO,
        ]);
    }
    return true;
  }

  previous() {
    this.router.navigate([
      RoutePath.APPLYNOW +
      "/" +
      RoutePath.APPLYNOW_HOUSEHOLD +
      "/" +
      RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDADDRESS
    ]);
  }
}
