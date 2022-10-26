import { ChangeDetectorRef, Injectable, OnInit } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { RoutePath } from "../../../shared/route-strategies";
// import { ReferralStoreService } from '../../referrals-store-service';
// import { IIndividual } from '../../+state/household-details-model';
import { Router } from "@angular/router";
import {
    IHouseHold,
    IHouseholdAddress,
    IPrimaryHousehold,
} from "../household-model";
import { ApplyNowStoreService } from "../../apply-now-store-service";

@Injectable()
export class ApplyNowGISValidationStrategy {
    static validatedAddress: any = {
        primay: "",
        mailing: "",
    };
    applynowState: any;
    householdAddress: any;
    household!: IPrimaryHousehold;

    private readonly url = "/api/intake/common/verifyaddress";
    constructor(
        private http: HttpClient,
        private cd: ChangeDetectorRef,
        private service: ApplyNowStoreService,
        private router: Router
    ) {}

    validateAddress(
        primaryAddress: IHouseholdAddress,
        mailingAddress: IHouseholdAddress
    ) {
        const addressObj = {
            streetAddressLine1: primaryAddress?.addressLine1,
            streetAddressLine2: primaryAddress?.addressLine2,
            city: primaryAddress?.city,
            state: primaryAddress?.state,
            zip: primaryAddress?.zip,
            county: primaryAddress?.county,
            isMailingAddress: primaryAddress?.isThisAddressEffectiveImmediately,
            zipExt: "0000",
        };

        const mailaddressObj = mailingAddress?.addressLine1
            ? {
                  streetAddressLine1: mailingAddress?.addressLine1,
                  streetAddressLine2: mailingAddress?.addressLine1,
                  city: mailingAddress?.city,
                  state: mailingAddress?.state,
                  zip: mailingAddress?.zip,
                  county: mailingAddress?.county,
                  isMailingAddress:
                      mailingAddress?.isThisAddressEffectiveImmediately,
                  zipExt: "0000",
              }
            : null;
        return new Promise((resolve) => {
          if(primaryAddress.isAddressGISValidated && !mailingAddress?.addressLine1) {
            resolve(true)
          }
          else {
            this.http.post(this.url, addressObj).subscribe((address: any) => {
                if (address) {
                    ApplyNowGISValidationStrategy.validatedAddress.primary =
                        address[0];
                }

                if (!mailingAddress?.addressLine1) {
                    if (
                        ApplyNowGISValidationStrategy.validatedAddress.primary
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
                            ApplyNowGISValidationStrategy.validatedAddress.mailing =
                                address[0];
                            if (
                                ApplyNowGISValidationStrategy.validatedAddress
                                    .primary ||
                                ApplyNowGISValidationStrategy.validatedAddress
                                    .mailing
                            ) {
                                /*  this.router.navigate([
                                RoutePath.APPLYNOW +
                                    "/" +
                                    RoutePath.APPLYNOW_HOUSEHOLD +
                                    "/" +
                                    RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDREVIEWADDRESS,
                            ]);*/
                                resolve(true);
                            } else {
                                /*  this.router.navigate([
                                RoutePath.APPLYNOW +
                                    "/" +
                                    RoutePath.APPLYNOW_HOUSEHOLD +
                                    "/" +
                                    RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDPREVIOUSADDRESS,
                            ]);*/
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
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_HOUSEHOLD +
            "/" +
            RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDFACILITYSCREEN
        );
    }
}
