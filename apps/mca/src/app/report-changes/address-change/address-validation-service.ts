import { ChangeDetectorRef, Injectable, OnInit } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { IAddress } from "../../+state/models/change-report/change-report.model";

@Injectable()
export class MCAGISValidationStrategy {
    static validatedAddress: any = {
        primay: "",
        mailing: "",
    };
    applynowState: any;
    householdAddress: any;

    private readonly url = "/api/intake/common/verifyaddress";
    constructor(
        private http: HttpClient
    ) {}

    validateAddress(
        primaryAddress: IAddress,
        mailingAddress: IAddress
    ) {
        const addressObj = {
            streetAddressLine1: primaryAddress?.streetAddressLine1,
            streetAddressLine2: primaryAddress?.streetAddressLine2,
            city: primaryAddress?.city,
            state: primaryAddress?.state,
            zip: primaryAddress?.zip,
            county: primaryAddress?.county,
            isMailingAddress: primaryAddress?.isMailingAddress,
            zipExt: "",
        };

        const mailaddressObj = mailingAddress?.streetAddressLine1
            ? {
                  streetAddressLine1: mailingAddress?.streetAddressLine1,
                  streetAddressLine2: mailingAddress?.streetAddressLine2,
                  city: mailingAddress?.city,
                  state: mailingAddress?.state,
                  zip: mailingAddress?.zip,
                  county: mailingAddress?.county,
                  isMailingAddress:
                      mailingAddress?.isMailingAddress,
                  zipExt: "",
              }
            : null;
        return new Promise((resolve) => {
            this.http.post(this.url, addressObj).subscribe((address: any) => {
                if (address) {
                    MCAGISValidationStrategy.validatedAddress.primary =
                        address[0];
                }

                if (!mailingAddress?.streetAddressLine1) {
                    if (
                        MCAGISValidationStrategy.validatedAddress.primary
                    ) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }
            });
            if (mailaddressObj) {
                this.http
                    .post(this.url, mailaddressObj)
                    .subscribe((address: any) => {
                        if (address) {
                            // /alert(JSON.stringify(address))
                            // console.log("mailvailatadecgbnn", JSON.stringify(address))
                            MCAGISValidationStrategy.validatedAddress.mailing =
                                address[0];
                            if (
                                MCAGISValidationStrategy.validatedAddress
                                    .primary ||
                                MCAGISValidationStrategy.validatedAddress
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
}
