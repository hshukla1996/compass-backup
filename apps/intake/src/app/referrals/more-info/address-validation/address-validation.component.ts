import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAddress, IIndividual } from '../../+state/household-details-model';
import { IReferralsState } from '../../+state/referrals.models';
import { AppStoreService } from '../../../app-store-service';
import { ReferrralsAddressValidationStrategy } from '../../../shared/route-strategies/referrals/address-validation';
import { ReferrralsContactInformationStrategy } from '../../../shared/route-strategies/referrals/contact-information';
import { ReferralStoreService } from '../../referrals-store-service';
import { ReferrralsGISValidationStrategy } from '../contact-information/gis-validation-service';

@Component({
  selector: 'compass-ui-address-validation',
  templateUrl: './address-validation.component.html',
  styleUrls: ['./address-validation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ReferrralsAddressValidationStrategy]
})
export class AddressValidationComponent implements OnInit {
  contactInformationForm!: FormGroup | any;
  addressForm!: FormGroup;
  contactInformation: IIndividual | undefined;
  states$: Observable<any> | undefined;
  referralState: IReferralsState | undefined;
  householdAddress: any;
  validatedAddress: any;
  isLoading = true;
  loadingText = "Loading..."
  addressValidationForm: FormGroup | any;
  addresstest: any;
  isAddressGISValidated: boolean = false
  constructor(private fb: FormBuilder, private route: Router,
    private service: ReferralStoreService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private appService: AppStoreService,
    private routingStratagy: ReferrralsAddressValidationStrategy,
    private store: Store<any>) { }

  ngOnInit(): void {
    this.addressValidationForm = this.fb.group({
      exampleRadios: new FormControl(null, [Validators.required]),


    });
    this.service.getAppData().subscribe(d => {
      this.referralState = { ...d };
      this.householdAddress = this.referralState.household.address;
      this.cd.detectChanges();
    });
    // console.log(this.householdAddress, 'householdAddress');
    // setTimeout(() => {
    this.isLoading = false
    this.validatedAddress = ReferrralsGISValidationStrategy.validatedAddress[0];
    this.cd.detectChanges();
    console.log(this.validatedAddress, 'validatedAddress');
    // }, 500)

  }


  isFieldValid(field: string): boolean {
   
    return (this.addressValidationForm.get(field).status !== 'VALID' && (this.addressValidationForm.get(field).dirty || this.addressValidationForm.get(field).touched))
  }
  onradioCheck(value: any) {
    if (value == "0") {
      this.addresstest = {
        state: this.validatedAddress.state,
        addressLine1: this.validatedAddress.street1,
        addressLine2: this.validatedAddress.street2,
        city: this.validatedAddress.city,
        zip: this.validatedAddress.zip,
        zipExtension: this.validatedAddress.zipExt,

      }
      this.isAddressGISValidated = true

    } else {
      this.addresstest = { ...this.householdAddress }
      this.isAddressGISValidated = false
    }


  }
  next() {
    const ssIncreased = this.addressValidationForm.controls['exampleRadios'].value;

    const isValid = this.addressValidationForm.valid;
    this.addressValidationForm.markAllAsTouched();
    if (ssIncreased === "") {

      return;
    }
    if (!isValid) return;
    const storedHouseholdDetails = this.referralState?.household;
    const updatedHouseholdContact = { ...storedHouseholdDetails, ...{ address: this.addresstest }, isAddressGISValidated: this.isAddressGISValidated }
    this.service.updatedHousehold(updatedHouseholdContact);
    this.router.navigate([this.routingStratagy.nextRoute()]);

  }

  previous() {
    this.router.navigate([this.routingStratagy.previousRoute()]);

  }

}
