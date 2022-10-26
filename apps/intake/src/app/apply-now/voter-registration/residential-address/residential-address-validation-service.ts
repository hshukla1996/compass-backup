import { ChangeDetectorRef, Injectable, OnInit } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { RoutePath } from "../../../shared/route-strategies"; 
import { Router } from "@angular/router";
 
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { IAddressState } from "../voter-registration-model/voter-registration-model";

@Injectable()
export class ApplyNowVoterRegistrationGISValidationStrategy {
    static validatedAddress: any = {
        primay: "",
        mailing: "",
    };
    applynowState: any;
    householdAddress: any;

    private readonly url = "/api/intake/common/verifyaddress";
    constructor(
        private http: HttpClient,
        private cd: ChangeDetectorRef,
        private service: ApplyNowStoreService,
        private router: Router
    ) { }

    validateAddress(
        primaryAddress: IAddressState,
        mailingAddress: IAddressState
    ) {
        const addressObj = {
            streetAddressLine1: primaryAddress?.addressLine1,
            streetAddressLine2: primaryAddress?.addressline2,
            city: primaryAddress?.city,
            state: primaryAddress?.state,
            zip: primaryAddress?.zip,
            county: primaryAddress?.county, 
            zipExt: "",
        };

        const mailaddressObj = mailingAddress?.addressLine1
            ? {
                streetAddressLine1: mailingAddress?.addressLine1,
                streetAddressLine2: mailingAddress?.addressline2,
                city: mailingAddress?.city,
                state: mailingAddress?.state,
                zip: mailingAddress?.zip,
                county: mailingAddress?.county, 
                zipExt: "",
            }
            : null;
        return new Promise((resolve) => {
            if (primaryAddress.isAddressGISValidated && !mailingAddress?.addressLine1) {
                resolve(true)
            }
            else {
                this.http.post(this.url, addressObj).subscribe((address: any) => {
                    if (address) {
                        ApplyNowVoterRegistrationGISValidationStrategy.validatedAddress.primary =
                            address[0];
                    }

                    if (!mailingAddress?.addressLine1) {
                        if (
                            ApplyNowVoterRegistrationGISValidationStrategy.validatedAddress.primary
                        ) {
                            resolve(true);
                        } else {

                            resolve(false);
                        }
                    }
                });
            }

            if (mailaddressObj && !mailingAddress.isAddressGISValidated) {
                this.http
                    .post(this.url, mailaddressObj)
                    .subscribe((address: any) => {
                        if (address) {
                            // /alert(JSON.stringify(address))
                            // console.log("mailvailatadecgbnn", JSON.stringify(address))
                            ApplyNowVoterRegistrationGISValidationStrategy.validatedAddress.mailing =
                                address[0];
                            if (
                                ApplyNowVoterRegistrationGISValidationStrategy.validatedAddress
                                    .primary ||
                                ApplyNowVoterRegistrationGISValidationStrategy.validatedAddress
                                    .mailing
                            ) {
                                
                                resolve(true);
                            } else {
                                
                                resolve(false);
                            }
                        }
                    });
            }
        });
    }

    previousRoute(): string {
        // logic
        return (
            RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_RESIDENTIALADDRESS
        );
    }
}
