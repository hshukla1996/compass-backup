import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { RoutePath } from '../../../shared/route-strategies';
import { ReferralStoreService } from '../../referrals-store-service';
import { IIndividual } from '../../+state/household-details-model';
import { Router } from '@angular/router';

@Injectable()
export class ReferrralsGISValidationStrategy {
    household!: IIndividual;
    isAddressGISValidated: boolean | undefined;
    static validatedAddress: any;
    private readonly url = '/api/intake/common/verifyaddress';
    constructor(private http: HttpClient,
        private service: ReferralStoreService, private router: Router,) {

    }
    validateAddress() {
        this.household = this.service.getHousehold ?? [];

        const addressObj = {
            streetAddressLine1: this.household.address?.addressLine1,
            streetAddressLine2: this.household.address?.addressLine2,
            city: this.household.address?.city,
            state: this.household.address?.state,
            zip: this.household.address?.zip,
            county: "",
            isMailingAddress: true,
            zipExt: ""
        }
       
        this.http.post(this.url, addressObj).subscribe((address:any) => {
            if (address.length) {
                ReferrralsGISValidationStrategy.validatedAddress = address;
                this.isAddressGISValidated = true
                return this.router.navigate([RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_ADDRESSVALIDATION]);
            }
            else {
                this.isAddressGISValidated = false
                return 
            }
        }, (error) => {                              //Error callback
            console.error('error caught in component')
            return this.router.navigate([RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_SUMMARY]); 
        }
        )
   
    

    }

    previousRoute(): string {
        // logic
        return RoutePath.REFERRALS + '/' + RoutePath.REFERRALS_MOREINFORMATION;
    }
}
