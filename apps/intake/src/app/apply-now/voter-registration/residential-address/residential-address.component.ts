import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { delay, Observable, of } from "rxjs";
import { IApplyNowState } from "../../+state/apply-now.models";
import { AppStoreService } from "../../../app-store-service";
import { RoutePath } from "../../../shared/route-strategies";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { IHouseholdAddress } from "../../household/household-model";
import { HouseholdAddress } from "../../household/models/householdAddress";
import { HouseholdFormDataService } from "../../household/services/household-form-data.service";
import { ScreenQueueUtil } from "../../individual-details/individuals-medical-gatepost/individuals-medical-gatepost.path";
import { IAddressState } from "../voter-registration-model/voter-registration-model";
import { ApplyNowVoterRegistrationGISValidationStrategy } from "./residential-address-validation-service";

@Component({
    selector: "compass-ui-residential-address",
    templateUrl: "./residential-address.component.html",
    styleUrls: ["./residential-address.component.scss"],
    providers: [ApplyNowVoterRegistrationGISValidationStrategy],
})
export class ResidentialAddressComponent implements OnInit {
    constructor(public householdFormDataService: HouseholdFormDataService, private fb: FormBuilder, private router: Router, private queueService: ScreenQueueUtil, private householdAdd: FormBuilder,
        private routingStratagy: ApplyNowVoterRegistrationGISValidationStrategy, private service: ApplyNowStoreService, private cd: ChangeDetectorRef, private appService: AppStoreService,) { 
        this.householdAddress = this.householdFormDataService.householdAddress;
        }
    data: any;
    mailAddress = true;
    householdAddress: HouseholdAddress;
    residenceGroup: FormGroup | any;
    applyNowState!: IApplyNowState;
    detail!: IAddressState;
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
    unitTypes$: Observable<any> | undefined;
    unitTypes: any;
     // TODO: Dummy values, replace with loaded correct types
    
   
   
    ngOnInit() { 
        this.residenceGroup = this.fb.group({
            AddressLine1: ["", Validators.required],
            AddressLine2: [" "],
            City: ["", Validators.required],
            State: ["", Validators.required],
            Zip: ["", Validators.required],
            unitNumber: [""],
            unitType: [""],
            County: ["", Validators.required], 
            anotherAdd: ["", Validators.required],
            anotherAddress: [""],
            anotherAddress2: [""],
            anotherCity: [""],
            anotherState: [""],
            anotherZip: [""],
            anotherCounty: [""]


        });
        this.appService.getStates().subscribe((states) => {
            this.states = states;
            this.cd.detectChanges();
        });

        this.appService.getCounties().subscribe((c) => {
            this.counties = c;
            this.cd.detectChanges();
        });
        this.unitTypes$ = this.appService.getUnitTypes();
        this.unitTypes$.subscribe(d => {
            this.unitTypes = d;
            this.cd.detectChanges();
            console.log("this.unitTypes", this.unitTypes)

        });
        // this.schoolDistricts$ = this.appService.getSchoolDistricts();
        this.appService.getSchoolDistricts().subscribe((c) => {
            this.schoolDistricts = c;
            this.cd.detectChanges();
        });

        this.appService.getTownShip().subscribe((townShip) => {
            this.townships = townShip;
            this.cd.detectChanges();
        });

    
        this.service.getAppData().subscribe((d) => {
            this.applyNowState = { ...d };
            // this.data = this.applyNowState.metaData;
            this.detail = this.applyNowState.voterRegistration?.voterIndividual?.residentialAddress as IHouseholdAddress;

            // console.log("mailingbsb", this.detail);
            // const applyLTCValue =
            //     this.applyNowState.houseHoldDetails?.areYouWantToApplyLTC ?? "";

            // this.areYouWantToApplyLTC =
            //     applyLTCValue !== "" && applyLTCValue == "No" ? false : true;

            of(true)
                .pipe(delay(10))
                .subscribe(() => {
                    console.log(this.detail, "detail")
                    this.residenceGroup.patchValue({
                        AddressLine1: this.detail?.addressLine1,
                        AddressLine2: this.detail?.addressline2,
                        City: this.detail?.city, 
                        State: this.detail?.state,
                        Zip: this.detail?.zip,
                        County: this.detail?.county,  
                        unitNumber: this.detail?.unitnumber,
                        unitType: this.detail.unitType,
                        anotherAddress: this.applyNowState.voterRegistration?.voterIndividual?.mailingAddress?.addressLine1,
                        anotherAddress2:
                            this.applyNowState.voterRegistration?.voterIndividual?.mailingAddress?.addressline2,
                        anotherCity: this.applyNowState.voterRegistration?.voterIndividual?.mailingAddress?.city,
                        // anotherState: this.applyNowState.houseHoldDetails.Household.mailingAddress?.state,
                        anotherState: this.applyNowState.voterRegistration?.voterIndividual?.mailingAddress?.state,
                        anotherZip: this.applyNowState.voterRegistration?.voterIndividual?.mailingAddress?.zip, 
                        anotherCounty: this.applyNowState.voterRegistration?.voterIndividual?.mailingAddress?.county, 
                        anotherAdd:
                            (this.applyNowState.voterRegistration?.voterIndividual
                                ?.doYouPreferSeperateMailingAddress ? (this.applyNowState.voterRegistration?.voterIndividual?.doYouPreferSeperateMailingAddress === "Y" ? "Yes" : "No") : null),
                    });
                });
            if (
                this.applyNowState.voterRegistration?.voterIndividual?.doYouPreferSeperateMailingAddress == "Y"
            )
                this.anotherAddressCon = true;
            else this.anotherAddressCon = false;

            if (
                this.applyNowState.voterRegistration?.voterIndividual?.doYouPreferSeperateMailingAddress == "Yes"
            )
                this.mailAddress = true;
            else this.mailAddress = false;

            this.cd.detectChanges();
        });
        this.residenceGroup.get('AddressLine1').valueChanges.subscribe((val: any) => {
            if (val !== this.detail?.addressLine1) {
                this.changedApplicantAddress = true
            }

        });
        this.residenceGroup.get('AddressLine2').valueChanges.subscribe((val: any) => {
            if (val !== this.detail?.addressline2) {
                this.changedApplicantAddress = true
            }
        });
        this.residenceGroup.get('City').valueChanges.subscribe((val: any) => {
            if (val !== this.detail?.city) {
                this.changedApplicantAddress = true;
            }
        });
        this.residenceGroup.get('Zip').valueChanges.subscribe((val: any) => {
            if (val !== this.detail?.zip) {
                this.changedApplicantAddress = true;
            }
        });
        this.residenceGroup.get('anotherAddress').valueChanges.subscribe((val: any) => {
            if (val !== this.applyNowState.houseHoldDetails.Household.mailingAddress?.addressLine1)
                this.changedMailingAddress = true;
        });
        this.residenceGroup.get('anotherAddress2').valueChanges.subscribe((val: any) => {
            if (val !== this.applyNowState.houseHoldDetails.Household.mailingAddress?.addressLine2)
                this.changedMailingAddress = true;
        });
        this.residenceGroup.get('anotherCity').valueChanges.subscribe((val: any) => {
            if (val !== this.applyNowState.houseHoldDetails.Household
                .mailingAddress?.city)
                this.changedMailingAddress = true;
        });
        this.residenceGroup.get('anotherZip').valueChanges.subscribe((val: any) => {
            if (val !== this.applyNowState.houseHoldDetails.Household
                .mailingAddress?.zip)
                this.changedMailingAddress = true;
        });
        this.residenceGroup.get('anotherCounty').valueChanges.subscribe((val: any) => {
            if (val !== this.applyNowState.houseHoldDetails.Household
                .mailingAddress?.county)
                this.changedMailingAddress = true;
        });
         

    }

    checkChar(character: any) {
        var k;
        k = character.charCode;
        return ((k > 64 && k < 91) || (k > 96 && k < 123) || (k > 47 && k < 58) || k == 46 || k == 35 || k == 41 || k == 40 || k == 38 || k == 64 || k == 39 || k == 92 || k == 45 || k == 32 || k == 47 || k == 44);

    }

    checkCityChar(character: any) {
        var k;
        k = character.charCode;
        return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 39 || k == 92 || k == 45 || k == 32);

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
        this.residenceGroup
            .get("anotherAddress")
            .setValidators(Validators.required);
        this.residenceGroup
            .get("anotherCity")
            .setValidators(Validators.required);
        this.residenceGroup
            .get("anotherState")
            .setValidators(Validators.required);
        this.residenceGroup
            .get("anotherZip")
            .setValidators(Validators.required);
        this.residenceGroup
            .get("anotherCounty")
            .setValidators(Validators.required);
    }

    removeAnotherAddress() {
        this.anotherAddressCon = false;
        this.residenceGroup.get("anotherAddress").clearValidators();
        this.residenceGroup.get("anotherCity").clearValidators();
        this.residenceGroup.get("anotherState").clearValidators();
        this.residenceGroup.get("anotherZip").clearValidators();
        this.residenceGroup.get("anotherCounty").clearValidators();


        this.residenceGroup.get("anotherAddress")?.setErrors(null);
        this.residenceGroup.get("anotherZip")?.setErrors(null);
        this.residenceGroup.get("anotherState")?.setErrors(null);
        this.residenceGroup.get("anotherCity")?.setErrors(null);
        this.residenceGroup.get("anotherCounty")?.setErrors(null);

    }


    showMailAddress() {
        this.mailAddress = true;
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
                    this.residenceGroup.get("AddressLine1").errors
                        .required
                ) {
                    return "This is required.";
                }
                break;
            case "City":
                if (this.residenceGroup.get("City").errors.required) {
                    return "This is required.";
                }
                break;
            case "State":
                if (this.residenceGroup.get("State").errors.required) {
                    return "This is required.";
                }
                break;
            case "Zip":
                if (this.residenceGroup.get("Zip").errors.required) {
                    return "This is required.";
                }
                break;
            case "County":
                if (this.residenceGroup.get("County").errors.required) {
                    return "This is required.";
                }
                break;
            case "school":
                if (this.residenceGroup.get("school").errors.required) {
                    return "This is required.";
                }
                break;
            case "school1":
                if (this.residenceGroup.get("school1").errors.required) {
                    return "This is required.";
                }
                break;
            case "township":
                if (this.residenceGroup.get("township").errors.required) {
                    return "This is required.";
                }
                break;
            case "township1":
                if (
                    this.residenceGroup.get("township1").errors.required
                ) {
                    return "This is required.";
                }
                break;
            case "anotherAdd":
                if (
                    this.residenceGroup.get("anotherAdd").errors.required
                ) {
                    return "This is required.";
                }
                break;
            case "anotherAddress":
                if (
                    this.residenceGroup.get("anotherAddress").errors
                        .required
                ) {
                    return "This is required.";
                }
                break;
            case "anotherCity":
                if (
                    this.residenceGroup.get("anotherCity").errors.required
                ) {
                    return "This is required.";
                }
                break;
            case "anotherState":
                if (
                    this.residenceGroup.get("anotherState").errors
                        .required
                ) {
                    return "This is required.";
                }
                break;
            case "anotherZip":
                if (
                    this.residenceGroup.get("anotherZip").errors.required
                ) {
                    return "This is required.";
                }
                break;
            case "anotherCounty":
                if (
                    this.residenceGroup.get("anotherCounty").errors.required
                ) {
                    return "This is required.";
                }
                break;
            case "sendMail":
                if (this.residenceGroup.get("sendMail").errors.required) {
                    return "This is required.";
                }
                break;

            default:
                return "";
                break;
        }
        return "";
    }

    isFieldValid(field: string): boolean {
        const formField = this.residenceGroup.get(field);
        return (
            formField &&
            this.residenceGroup.get(field).status !== "VALID" &&
            this.residenceGroup.get(field).touched
        );
    }
    useAnyway() {
        // console.log("use Anyway");
        this.isAddressGISValidated = false;
        // this.router.navigate([
            this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_SELECTIDENTITYVERIFYMETHOD])

        // ]);
    }
    editAddress() {
        // console.log("edit address");
        this.isAddressGISValidated = false;
    }
    onSubmit(): boolean {
         
        this.service.validateAllFormFields(this.residenceGroup);
        if (!this.anotherAddressCon) {
            this.residenceGroup.get("anotherAddress")?.setErrors(null);
            this.residenceGroup.get("anotherCity")?.setErrors(null);
            this.residenceGroup.get("anotherZip")?.setErrors(null);
            this.residenceGroup.get("anotherState")?.setErrors(null);
            this.residenceGroup.get("anotherCounty")?.setErrors(null);

            this.residenceGroup.patchValue({
                anotherAddress: "",
                anotherCity: "",
                anotherZip: "",
                anotherState: "",
                anotherCounty: "",
            });
            this.residenceGroup.updateValueAndValidity();
        }

        if (this.residenceGroup.valid) {
            const storeHouseholdDetails = this.applyNowState?.voterRegistration;
            const storedHouseHold =
                this.applyNowState?.voterRegistration?.voterIndividual;
            this.loadingUSPS = true;
            const isApplicantAddressValidated = storedHouseHold?.residentialAddress?.isAddressGISValidated || false;
            const isMailingAddressValidated = storedHouseHold?.mailingAddress?.isAddressGISValidated || false;


            const updatedApplicantAddress = {
                addressLine1:
                    this.residenceGroup.get("AddressLine1").value,
                addressline2:
                    this.residenceGroup.get("AddressLine2").value,
                city: this.residenceGroup.get("City").value,
                state: this.residenceGroup.get("State").value ? this.residenceGroup.get("State").value : null,
                zip: this.residenceGroup.get("Zip").value,
                unitType: this.residenceGroup.get("unitType").value ? this.residenceGroup.get("unitType").value : null ,
                unitnumber: this.residenceGroup.get("unitNumber").value ,
                county: this.residenceGroup.get("County").value ? this.residenceGroup.get("County").value : null, 
                isAddressGISValidated: this.changedApplicantAddress ? false : isApplicantAddressValidated,
               
                // anotherAdd: this.residenceGroup.get("anotherAdd").value.charAt(0),

               
                zipExtension: "",


            };
            const updatedMailingAddress = {
                addressLine1:
                    this.residenceGroup.get("anotherAddress").value,
                addressline2:
                    this.residenceGroup.get("anotherAddress2").value,
                city: this.residenceGroup.get("anotherCity").value,
                state: this.residenceGroup.get("anotherState").value ? this.residenceGroup.get("anotherState").value : null,
                zip: this.residenceGroup.get("anotherZip").value,
                county: this.residenceGroup.get("anotherCounty").value ? this.residenceGroup.get("anotherCounty").value : null,
                isAddressGISValidated: this.changedApplicantAddress ? false : isMailingAddressValidated,
                zipExtension: "",
            };
  
            const updatedHousehold = {
                ...storedHouseHold,
                residentialAddress: updatedApplicantAddress,
                mailingAddress: updatedMailingAddress,
                doYouPreferSeperateMailingAddress:this.residenceGroup.get("anotherAdd").value.charAt(0),
            };
            console.log(updatedHousehold, "updatedHousehold")

            this.service.updatedVoterRegistrationDetails({
                ...storeHouseholdDetails,
                voterIndividual: updatedHousehold,
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
                            RoutePath.APPLYNOW_VOTERREGISTRATION +
                            "/" +
                            RoutePath.APPLYNOW_VOTERREGISTRATION_VALIDATEADDRESS,
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
    previous() {
        this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_VOTERRACE]);

        // if (!this.areYouWantToApplyLTC) {
        //     this.queueService.back();
        // } else {
        //     this.router.navigate([this.routingStratagy.previousRoute()]);
        // }
    }
}
