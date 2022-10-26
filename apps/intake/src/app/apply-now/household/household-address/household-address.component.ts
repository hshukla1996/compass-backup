import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from "@angular/core";
import { HouseholdFormDataService } from "../services/household-form-data.service";
import { HouseholdAddress } from "../models/householdAddress";
import {
    FormGroup,
    FormControl,
    ReactiveFormsModule,
    FormBuilder,
    Validators,
    AbstractControl,
} from "@angular/forms";
import { ApplyNowHouseholdAddressStrategy } from "../../../shared/route-strategies/apply-now/householdAddress";
import { Router } from "@angular/router";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { AppStoreService } from "../../../app-store-service";
import { IApplyNowState, Programs } from "../../+state/apply-now.models";
import { IHouseholdAddress } from "../household-model";
import { delay, first, of, Subscription } from "rxjs";
import { ApplyNowGISValidationStrategy } from "./household-address-validation-service";
import { ScreenQueueUtil } from "../../../shared/services/screen_queue_util.service";
import { RoutePath } from "../../../shared/route-strategies";
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from "../../../shared/utilities/Utility";
import * as ProgramConstants from "../../../shared/constants/Individual_Programs_Constants";

@Component({
    selector: "compass-ui-household-address",
    templateUrl: "./household-address.component.html",
    styleUrls: ["./household-address.component.scss"],
    providers: [ApplyNowGISValidationStrategy],
})
export class HouseholdAddressComponent implements OnInit {
    data: any;
    mailAddress = true;
    householdAddress: HouseholdAddress;
    householdAddressForm: FormGroup | any;
    applyNowState!: IApplyNowState;
    detail!: IHouseholdAddress;
    states: any;
    counties: any;
    schoolDistricts: any;
    townships: any[] = [];
    selectedSchoolDistrictName: any;
    selectedTownshipName: any;
    areYouWantToApplyLTC: any;
    anotherAddressCon = false;
    isAddressGISValidated = false;
    loadingUSPS = false;
    changedApplicantAddress = false;
    changedMailingAddress = false;
    today = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
    isDateValid = true;
    requiredFields = [] as string[];
    optionalFields = [] as string[];
    sevicesselected: Array<any> = [];

    constructor(
        public householdFormDataService: HouseholdFormDataService,
        private queueService: ScreenQueueUtil,
        private householdAdd: FormBuilder,
        private cd: ChangeDetectorRef,
        private service: ApplyNowStoreService,
        private router: Router,
        private routingStratagy: ApplyNowGISValidationStrategy,
        private appService: AppStoreService
    ) {
        this.householdAddress = this.householdFormDataService.householdAddress;
    }

    ngOnInit(): void {
        this.householdAddressForm = this.householdAdd.group({
            AddressLine1: [""],
            AddressLine2: [""],
            City: [""],
            State: [""],
            Zip: [""],
            County: [""],
            school: [""],
            school1: [""],
            township: [""],
            township1: [""],
            anotherAdd: [""],
            anotherAddress: [""],
            anotherAddress2: [""],
            anotherCity: [""],
            anotherState: [""],
            anotherZip: [""],
            sendMail: this.householdAdd.group({
                Yes: false,
                no: true,
            }),
            sendMailStartDate: ["", Utility.dateMinValidator()],
            years: " ",
            months: " ",
        });

        this.appService.getStates().subscribe((states) => {
            this.states = states;
            this.states = this.states.filter((state: any) => state.id !== 'PA');
            this.cd.detectChanges();
        });

        this.appService.getCounties().subscribe((c) => {
            this.counties = c;
            this.cd.detectChanges();
        });
        this.appService.getSchoolDistricts().subscribe((c) => {
            this.schoolDistricts = c;
            this.cd.detectChanges();
        });

        this.appService.getTownShip().subscribe((townShip) => {
            this.townships = townShip;
            this.cd.detectChanges();
        });

        this.householdAddressForm
            .get("township")
            .valueChanges.subscribe((selectedValue: string) => {
                this.selectedTownshipName = selectedValue;

                if (selectedValue === "99999") {
                    this.householdAddressForm
                        .get("township1")
                        .setValidators(Validators.required);
                } else {
                    this.householdAddressForm
                        .get("township1")
                        .clearValidators();
                }
                this.householdAddressForm
                    .get("township1")
                    .updateValueAndValidity();
            });
        this.householdAddressForm
            .get("school")
            .valueChanges.subscribe((selectedValue: string) => {
                this.selectedSchoolDistrictName = selectedValue;
                if (selectedValue === "99999") {
                    this.householdAddressForm
                        .get("school1")
                        .setValidators(Validators.required);
                } else {
                    this.householdAddressForm.get("school1").clearValidators();
                }
                this.householdAddressForm
                    .get("school1")
                    .updateValueAndValidity();
            });
        this.service.getAppData().subscribe((d) => {
            this.applyNowState = { ...d };
            this.sevicesselected = this.applyNowState?.programSelection?.programs || [];
            this.data = this.applyNowState.metaData;
            this.detail = this.applyNowState.houseHoldDetails.Household
                .applicantAddress as IHouseholdAddress;

            const applyLTCValue =
                this.applyNowState.houseHoldDetails?.areYouWantToApplyLTC ?? "";

            this.areYouWantToApplyLTC =
                applyLTCValue !== "" && applyLTCValue == "N" ? false : true;

            of(true)
                .pipe(delay(10))
                .subscribe(() => {
                    this.householdAddressForm.patchValue({
                        AddressLine1: this.detail?.addressLine1,
                        AddressLine2: this.detail?.addressLine2,
                        City: this.detail?.city,
                        State: this.detail?.state ? this.detail?.state : "PA",
                        Zip: this.detail?.zip,
                        County: this.detail?.county,
                        school: this.detail?.schoolDistrict,
                        township: this.detail?.township,
                        years: this.applyNowState.houseHoldDetails.Household
                            ?.fromHowManyYearsAtThisAddress,
                        months: this.applyNowState.houseHoldDetails.Household
                            ?.fromHowManyMonthsAtThisAddress,
                        anotherAddress:
                            this.applyNowState.houseHoldDetails.Household
                                .mailingAddress?.addressLine1,
                        anotherAddress2:
                            this.applyNowState.houseHoldDetails.Household
                                .mailingAddress?.addressLine2,
                        anotherCity:
                            this.applyNowState.houseHoldDetails.Household
                                .mailingAddress?.city,
                        anotherState: this.applyNowState.houseHoldDetails.Household
                            .mailingAddress?.state ? this.applyNowState.houseHoldDetails.Household
                                .mailingAddress?.state : "PA",
                        anotherZip:
                            this.applyNowState.houseHoldDetails.Household
                                .mailingAddress?.zip,
                        sendMail:
                            this.applyNowState.houseHoldDetails.Household
                                .mailingAddress
                                ?.isThisAddressEffectiveImmediately,
                        sendMailStartDate:
                        Utility.duetFormatDate(this.applyNowState.houseHoldDetails.Household
                                .mailingAddress?.addressEffectiveDate),
                        anotherAdd:
                            (this.applyNowState.houseHoldDetails.Household
                                ?.doYouPreferSeperateMailingAddress ? (this.applyNowState.houseHoldDetails.Household
                                    ?.doYouPreferSeperateMailingAddress === "Y" ? "Yes" : "No") : null),
                    });
                });
            if (
                this.applyNowState.houseHoldDetails.Household
                    ?.doYouPreferSeperateMailingAddress == "Y"
            )
                this.showAnotherAddress()
            else this.removeAnotherAddress()

            if (
                this.applyNowState.houseHoldDetails.Household.mailingAddress
                    ?.isThisAddressEffectiveImmediately
            )
                this.mailAddress = true;
            else this.mailAddress = false;

            this.cd.detectChanges();
        });
        this.householdAddressForm.get('AddressLine1').valueChanges.subscribe((val: any) => {
            if (val && val !== this.detail?.addressLine1) {
                this.changedApplicantAddress = true
            }

        });
        this.householdAddressForm.get('AddressLine2').valueChanges.subscribe((val: any) => {
            if (val && val !== this.detail?.addressLine2) {
                this.changedApplicantAddress = true
            }
        });


        this.householdAddressForm.get('City').valueChanges.subscribe((val: any) => {
            if (val && val !== this.detail?.city) {
                this.changedApplicantAddress = true;
            }
        });
        this.householdAddressForm.get('County').valueChanges.subscribe((val: any) => {
            if (val && val !== this.detail?.county) {
                this.changedApplicantAddress = true
            }
        });
        this.householdAddressForm.get('Zip').valueChanges.subscribe((val: any) => {
            if (val && val !== this.detail?.zip) {
                this.changedApplicantAddress = true;
            }
        });
        this.householdAddressForm.get('anotherAddress').valueChanges.subscribe((val: any) => {
            if (val && val !== this.applyNowState.houseHoldDetails.Household.mailingAddress?.addressLine1) {
                this.changedMailingAddress = true;
            }
        });
        this.householdAddressForm.get('anotherAddress2').valueChanges.subscribe((val: any) => {
            if (val && val !== this.applyNowState.houseHoldDetails.Household.mailingAddress?.addressLine2) {
                this.changedMailingAddress = true;
            }
        });
        this.householdAddressForm.get('anotherCity').valueChanges.subscribe((val: any) => {
            if (val && val !== this.applyNowState.houseHoldDetails.Household
                .mailingAddress?.city) {
                this.changedMailingAddress = true;
            }
        });
        this.householdAddressForm.get('anotherZip').valueChanges.subscribe((val: any) => {
            if (val && val !== this.applyNowState.houseHoldDetails.Household
                .mailingAddress?.zip) {
                this.changedMailingAddress = true;
            }
        });
        this.setOrResetValidator();
        this.householdAddressForm.get("Zip").setValidators(Utility.zipCodeValidator());
    }

    checkAddress(check: any) {
        let charCode = check.charCode;
        return ((charCode > 47 && charCode < 58) || (charCode > 64 && charCode < 91)
            || (charCode > 96 && charCode < 123) || charCode == 39 || charCode == 35
            || charCode == 46 || charCode == 92 || charCode == 45 || charCode == 32);
    }

    checkCity(check: any) {
        let charCode = check.charCode;
        return ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123)
            || charCode == 39 || charCode == 92 || charCode == 45 || charCode == 32);
    }

    OnlyNumberAllowed(event: { which: any; keyCode: any }): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }


    showAnotherAddress() {
        this.anotherAddressCon = true;
        this.householdAddressForm
            .get("anotherAddress")
            .setValidators(Validators.required);
        this.householdAddressForm
            .get("anotherCity")
            .setValidators(Validators.required);
        this.householdAddressForm
            .get("anotherState")
            .setValidators(Validators.required);
        this.householdAddressForm
            .get("anotherZip")
            .setValidators(Validators.required);
        if (this.mailAddress) this.householdAddressForm.get("sendMailStartDate").addValidators(Utility.dateMinValidator())
    }

    removeAnotherAddress() {
        this.anotherAddressCon = false;
        this.householdAddressForm.get("anotherAddress").clearValidators();
        this.householdAddressForm.get("anotherCity").clearValidators();
        this.householdAddressForm.get("anotherState").clearValidators();
        this.householdAddressForm.get("anotherZip").clearValidators();

        this.householdAddressForm.get("anotherAddress")?.setErrors(null);
        this.householdAddressForm.get("anotherZip")?.setErrors(null);
        this.householdAddressForm.get("anotherState")?.setErrors(null);
        this.householdAddressForm.get("anotherCity")?.setErrors(null);
    }


    showMailAddress() {
        this.mailAddress = true;
        this.householdAddressForm.get("sendMailStartDate").addValidators(Utility.dateMinValidator())
    }
    hideMailAddress() {
        this.mailAddress = false;
    }

    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return "";
        }

        switch (field) {
            case "AddressLine1":
                if (
                    this.householdAddressForm.get("AddressLine1").errors
                        .required
                ) {
                    return "No residential street address is entered";
                }
                break;
            case "City":
                if (this.householdAddressForm.get("City").errors.required) {
                    return "No city is entered";
                }
                break;
            case "State":
                if (this.householdAddressForm.get("State").errors.required) {
                    return "No state is selected from the dropdown";
                }
                break;
            case "Zip":
                if (this.householdAddressForm.get("Zip").errors.required) {
                    return "No zip code is entered";
                }
                else if ((this.householdAddressForm.get("Zip").errors.invalidNumber)) {
                    return "Please enter 5 digit zip code";
                }
                break;
            case "County":
                if (this.householdAddressForm.get("County").errors.required) {
                    return "No county is selected from the dropdown";
                }
                break;
            case "school":
                if (this.householdAddressForm.get("school").errors.required) {
                    return "No school district is selected from the dropdown";
                }
                break;
            case "school1":
                if (this.householdAddressForm.get("school1").errors.required) {
                    return "No school district is entered";
                }
                break;
            case "township":
                if (this.householdAddressForm.get("township").errors.required) {
                    return "No city/town/borough is selected from the dropdown";
                }
                break;
            case "township1":
                if (
                    this.householdAddressForm.get("township1").errors.required
                ) {
                    return "No township is entered";
                }
                break;
            case "anotherAdd":
                if (
                    this.householdAddressForm.get("anotherAdd").errors.required
                ) {
                    return "Please select if another address.";
                }
                break;
            case "anotherAddress":
                if (
                    this.householdAddressForm.get("anotherAddress").errors
                        .required
                ) {
                    return "No residential street address is entered";
                }
                break;
            case "anotherCity":
                if (
                    this.householdAddressForm.get("anotherCity").errors.required
                ) {
                    return "No city is entered";
                }
                break;
            case "anotherState":
                if (
                    this.householdAddressForm.get("anotherState").errors
                        .required
                ) {
                    return "No state is selected from the dropdown";
                }
                break;
            case "anotherZip":
                if (
                    this.householdAddressForm.get("anotherZip").errors.required
                ) {
                    return "No zip code is entered";
                }
                break;
            case "sendMail":
                if (this.householdAddressForm.get("sendMail").errors.required) {
                    return "Please select if start sending mail";
                }
                break;
            case "sendMailStartDate":
                if (this.householdAddressForm.get("sendMailStartDate").errors.duetInvalidDate) {
                    return "duetInvalidDate";
                }
                if (this.householdAddressForm.get("sendMailStartDate").errors.invalidDate) {
                    return "Date can't be in the past";
                }
                break;

            default:
                return "";
                break;
        }
        return "";
    }

    isFieldValid(field: string): boolean {
        return (
            this.householdAddressForm.get(field).status !== "VALID" &&
            (this.householdAddressForm.get(field).dirty ||
                this.householdAddressForm.get(field).touched)
        );
    }
    useAnyway() {
        this.isAddressGISValidated = false;
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

    }
    editAddress() {
        this.isAddressGISValidated = false;
    }
    onSubmit(): boolean {
        let months = this.householdAddressForm.get('months').value > 11 ? true : false
        if (months) return false;
        if (this.isDateValid) {
            this.service.validateAllFormFields(this.householdAddressForm);
            if (!this.anotherAddressCon) {
                this.householdAddressForm.get("anotherAddress")?.setErrors(null);
                this.householdAddressForm.get("anotherCity")?.setErrors(null);
                this.householdAddressForm.get("anotherZip")?.setErrors(null);
                this.householdAddressForm.get("anotherState")?.setErrors(null);
                this.householdAddressForm.patchValue({
                    anotherAddress: "",
                    anotherCity: "",
                    anotherZip: "",
                    anotherState: "",
                });
                this.householdAddressForm.updateValueAndValidity();
            }

            if (this.householdAddressForm.valid) {
                const storeHouseholdDetails = this.applyNowState?.houseHoldDetails;
                const storedHouseHold =
                    this.applyNowState?.houseHoldDetails.Household;
                this.loadingUSPS = true;
                const isApplicantAddressValidated = storedHouseHold?.applicantAddress?.isAddressGISValidated || false;
                const isMailingAddressValidated = storedHouseHold?.applicantAddress?.isAddressGISValidated || false;


                const updatedApplicantAddress = {
                    addressLine1:
                        this.householdAddressForm.get("AddressLine1").value,
                    addressLine2:
                        this.householdAddressForm.get("AddressLine2").value,
                    city: this.householdAddressForm.get("City").value,
                    state: this.householdAddressForm.get("State").value,
                    zip: this.householdAddressForm.get("Zip").value,
                    county: this.householdAddressForm.get("County").value,
                    schoolDistrict: this.householdAddressForm.get("school").value,
                    township: this.householdAddressForm.get("township").value,
                    isAddressGISValidated: this.changedApplicantAddress ? false : isApplicantAddressValidated,
                    sendMail: this.householdAddressForm.get("sendMail").value.Yes ? 'Y' : 'N',
                    anotherAdd: this.householdAddressForm.get("anotherAdd").value.charAt(0),

                    isThisAddressEffectiveImmediately:
                        this.mailAddress,
                    zipExtension: "",


                };

                const updatedMailingAddress = {
                    addressLine1:
                        this.householdAddressForm.get("anotherAddress").value,
                    addressLine2:
                        this.householdAddressForm.get("anotherAddress2").value,
                    city: this.householdAddressForm.get("anotherCity").value,
                    state: this.householdAddressForm.get("anotherState").value,
                    zip: this.householdAddressForm.get("anotherZip").value,
                    isThisAddressEffectiveImmediately:
                        this.mailAddress,
                    addressEffectiveDate:
                        this.householdAddressForm.get("sendMailStartDate").value,
                    isAddressGISValidated: this.changedApplicantAddress ? false : isMailingAddressValidated,
                    zipExtension: "",
                };
                const updatedHousehold = {
                    ...storedHouseHold,
                    applicantAddress: updatedApplicantAddress,
                    mailingAddress: updatedMailingAddress,
                    fromHowManyYearsAtThisAddress:
                        this.householdAddressForm.get("years").value,
                    fromHowManyMonthsAtThisAddress:
                        this.householdAddressForm.get("months").value,
                    doYouPreferSeperateMailingAddress:
                        this.householdAddressForm.get("anotherAdd").value.charAt(0),
                };
                this.service.updateHouseHoldDetails({
                    ...storeHouseholdDetails,
                    Household: updatedHousehold,
                });
                if (updatedApplicantAddress.isAddressGISValidated && updatedMailingAddress.isAddressGISValidated) {
                    this.useAnyway();
                    return false;
                }
                else if (updatedApplicantAddress.isAddressGISValidated && !updatedMailingAddress.addressLine1) {
                    this.useAnyway()
                    return false;
                }

                this.routingStratagy
                    .validateAddress(updatedApplicantAddress, updatedMailingAddress)
                    .then((validated) => {
                        this.loadingUSPS = false;
                        if (validated) {
                            this.router.navigate([
                                RoutePath.APPLYNOW +
                                "/" +
                                RoutePath.APPLYNOW_HOUSEHOLD +
                                "/" +
                                RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDREVIEWADDRESS,
                            ]);
                        } else {
                            this.isAddressGISValidated = true;
                        }
                    });
                return true;
            } else {
                return false;
            }
        }
        return false;
    }
    previous() {

        if (!this.areYouWantToApplyLTC) {
            this.queueService.back();
        } else {
            this.router.navigate([this.routingStratagy.previousRoute()]);
        }
    }
    setOrResetValidator() {
        let householdBenefits = this.service?.getBenefits() as string[];
        const fields = [{
            fieldName: 'AddressLine1',
            optionalProgram: [] as string[],
            requiredProgram: ProgramConstants.HOU_ADDRESS_VALIDATION_ADDRESS1_REQUIRED_PROGRAM as string[]
        },
        {
            fieldName: 'AddressLine2',
            optionalProgram: ProgramConstants.HOU_ADDRESS_VALIDATION_ADDRESS2_OPTIONAL_PROGRAM as string[],
            requiredProgram: [] as string[]
        },
        {
            fieldName: 'City',
            optionalProgram: [] as string[],
            requiredProgram: ProgramConstants.HOU_ADDRESS_VALIDATION_CITY_REQUIRED_PROGRAM as string[]
        },
        {
            fieldName: 'State',
            optionalProgram: [] as string[],
            requiredProgram: ProgramConstants.HOU_ADDRESS_VALIDATION_STATE_REQUIRED_PROGRAM as string[]
        },
        {
            fieldName: 'Zip',
            optionalProgram: [] as string[],
            requiredProgram: ProgramConstants.HOU_ADDRESS_VALIDATION_ZIP_REQUIRED_PROGRAM as string[]
        },
        {
            fieldName: 'County',
            optionalProgram: [] as string[],
            requiredProgram: ProgramConstants.HOU_ADDRESS_VALIDATION_COUNTY_REQUIRED_PROGRAM as string[]
        },
        {
            fieldName: 'school',
            optionalProgram: ProgramConstants.HOU_ADDRESS_VALIDATION_SCHOOL_OPTIONAL_PROGRAM as string[],
            requiredProgram: ProgramConstants.HOU_ADDRESS_VALIDATION_SCHOOL_REQUIRED_PROGRAM as string[]
        },
        {
            fieldName: 'township',
            optionalProgram: ProgramConstants.HOU_ADDRESS_VALIDATION_TOWNSHIP_OPTIONAL_PROGRAM as string[],
            requiredProgram: ProgramConstants.HOU_ADDRESS_VALIDATION_TOWNSHIP_REQUIRED_PROGRAM as string[]
        },
        {
            fieldName: 'township1',
            optionalProgram: [] as string[],
            requiredProgram: ProgramConstants.HOU_ADDRESS_VALIDATION_TOWNSHIP1_REQUIRED_PROGRAM as string[]
        },
        {
            fieldName: 'anotherAdd',
            optionalProgram: [] as string[],
            requiredProgram: ProgramConstants.HOU_ADDRESS_VALIDATION_ADDANOTHER_REQUIRED_PROGRAM as string[]
        },
        {
            fieldName: 'years',
            optionalProgram: ProgramConstants.HOU_ADDRESS_VALIDATION_HOWLONG_OPTIONAL_PROGRAM as string[],
            requiredProgram: [] as string[],
        }
        ] as FormValidatorField[]
        if (householdBenefits != null && householdBenefits.length > 0) {
            const requiredOrOptionalValidatorField =
                {

                    selectedPrograms: householdBenefits,
                    requiredFields: this.requiredFields,
                    optionalFields: this.optionalFields,
                    formGroup: this.householdAddressForm,
                    fields: fields
                } as RequiredOrOptionalValidatorField
            Utility.setOrClearValidatorForFieldWithDifferntPrograms(requiredOrOptionalValidatorField)
            this.householdAddressForm = requiredOrOptionalValidatorField.formGroup;
            this.requiredFields = [...requiredOrOptionalValidatorField.requiredFields] as any;
            this.optionalFields = [...requiredOrOptionalValidatorField.optionalFields] as any;
        }
    }
}
