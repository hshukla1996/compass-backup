import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import { Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { RoutePath } from "../../../shared/route-strategies";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { UtilService } from "../../../shared/services/util.service";
import { AppStoreService } from "../../../app-store-service";
import { IHouseHold, IHouseHoldDetails, PageDirection } from "../../household/household-model";
import {IApplyNowState, Programs} from "../../+state/apply-now.models";
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from "../../../shared/utilities/Utility";
import {IND_CITIZENSHIP_DETAIL_COUNTRYFROM_OPTIONAL_PROGRAM, IND_CITIZENSHIP_DETAIL_COUNTRY_OPTIONAL_PROGRAM, IND_CITIZENSHIP_DETAIL_DOC_OPTIONAL_PROGRAM, IND_CITIZENSHIP_DETAIL_SPONSOR_OPTIONAL_PROGRAM, IND_FOSTER_CARE, IND_GEN_DETAIL_CITIZENSHIP_OPTIONAL_PROGRAMS, IND_PRIMARY_CARE} from "../../../shared/constants/Individual_Programs_Constants";
import { id } from "date-fns/locale";
import { EntryScreenQueueUtil } from "../individuals-entry-gatepost";

@Component({
    selector: "ui-compass-citizenship",
    templateUrl: "./citizenship.component.html",
    styleUrls: ["./citizenship.component.css"],
})
export class CitizenshipComponent implements OnInit {
    citizenshipComponentForm: FormGroup | any | null;
    data: any;
    countries: any;
    docTypes: any;
    currentUser: IHouseHold = {};
    currentUserIndex!: string;
    personsMap!: any;
    maxDateRange!: any;
    houseHoldPersons: IHouseHold[] = [];
    houseHoldDetails!: IHouseHoldDetails;
    applyNowState: IApplyNowState | undefined;
    requiredFields = [] as string[];
    docMaxLength = 13;
    docMinLength = 0;
    fieldDisplays: any;
    docPattern = /^[a-zA-Z0-9]*$/;
    constructor(
        private fb: FormBuilder,
        private route: Router,
        private cd: ChangeDetectorRef,
        private service: ApplyNowStoreService,
        private activedRoute: ActivatedRoute,
        private utilService: UtilService,
        private appService: AppStoreService,
        private queueService: EntryScreenQueueUtil
    ) {}

    ngOnInit() {
        this.maxDateRange = new Date().toISOString().slice(0, 10);
        this.citizenshipComponentForm = this.fb.group({
            dateEnteredCountry: ["", Utility.dateMaxValidator()],
            countryComesFrom: [""],
            countryComesFrom1: [""],
            regNumber: [""],
            docType: [""],
            docID: ["", [Validators.minLength(6)]],
            docExpDate: [""],
            haveASponsor: [""],
            sopnsorType: [""],
        });
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        if (this.houseHoldDetails.houseHoldPersons) {
            this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
        }
        console.log("this.houseHoldDetails");
        console.log(this.houseHoldDetails);
        this.personsMap =
            {
                ...this.houseHoldDetails.pageAction?.personsMap,
            } || {};
        this.activedRoute.params.subscribe((p) => {
            if (Object.keys(p).length == 0) {
                this.currentUserIndex =
                    this.utilService.getCurrentUserIdOnNoParams(
                        this.personsMap
                    );
                console.log("Household details");
                console.log(this.houseHoldDetails);
            } else {
                this.currentUserIndex = p.userId || "";
            }
            if (this.houseHoldPersons.length > 0)
                this.currentUser =
                    this.service.extractUser(
                        this.houseHoldPersons,
                        this.currentUserIndex
                    ) || "";
            this.setProgramFieldValidations(this.currentUser);
            this.citizenshipComponentForm.controls[
                "dateEnteredCountry"
            ].setValidators([Utility.dateMaxValidator()]);

            console.log("this.currentUser.citizenship");
            console.log(this.currentUser.citizenship);
            // setTimeout(() => {
            this.citizenshipComponentForm
                .get("dateEnteredCountry")
                .patchValue(Utility.duetFormatDate(this.currentUser.citizenship?.dateEnteredUS));

            this.citizenshipComponentForm
                .get("countryComesFrom1")
                .patchValue(this.currentUser.citizenship?.otherCountry);
            this.citizenshipComponentForm
                .get("regNumber")
                .patchValue(
                    this.currentUser.citizenship?.alienRegistrationNumber
                );
            setTimeout(() => {
                this.citizenshipComponentForm
                    .get("countryComesFrom")
                    .patchValue(this.currentUser.citizenship?.country);
                this.citizenshipComponentForm
                    .get("docType")
                    .patchValue(this.currentUser.citizenship?.documentType);
            }, 500);

            this.citizenshipComponentForm
                .get("docExpDate")
                .patchValue(Utility.duetFormatDate(this.currentUser.citizenship?.documentExpiryDate));
            this.citizenshipComponentForm
                .get("docID")
                .patchValue(this.currentUser.citizenship?.documentIDNumber);
            console.log(
                this.currentUser.citizenship?.sponsor?.haveASponsorSpecified
            );
            this.citizenshipComponentForm
                .get("haveASponsor")
                .patchValue(
                    this.currentUser.citizenship?.sponsor
                        ?.haveASponsorSpecified !== null
                        ? this.currentUser.citizenship?.sponsor
                              ?.haveASponsorSpecified
                            ? "Yes"
                            : "No"
                        : ""
                );
            this.citizenshipComponentForm
                .get("sopnsorType")
                .patchValue(this.currentUser.citizenship?.sponsor?.sponsorType);
            // }, 500);
            this.cd.detectChanges();
        });
        this.appService.getCountries().subscribe((c) => {
            this.countries = c;
            this.cd.detectChanges();
        });
        this.appService.getDocumentTypes().subscribe((c) => {
            this.docTypes = c;
            this.cd.detectChanges();
        });
        this.citizenshipComponentForm
            ?.get("haveASponsor")
            .valueChanges.subscribe((selectedValue: string) => {
                console.log(selectedValue);
                if (selectedValue) {
                    this.citizenshipComponentForm
                        ?.get("sopnsorType")
                        .setValidators(Validators.required);
                } else {
                    this.citizenshipComponentForm
                        ?.get("sopnsorType")
                        .clearValidators();
                }
            });
        this.citizenshipComponentForm
            .get("docType")
            .valueChanges.subscribe((selectedValue: string) => {
                this.citizenshipComponentForm.get("docType").clearValidators();
                if (selectedValue === "3" || selectedValue === "15") {
                    this.docMaxLength = 13;
                    this.citizenshipComponentForm.controls[
                        "docID"
                    ].setValidators([
                        Validators.pattern(/^\d{9}[a-zA-Z]?\d?$/),
                    ]);
                }
                if (selectedValue === "2" || selectedValue === "5") {
                    this.docMaxLength = 13;
                    this.citizenshipComponentForm.controls[
                        "docID"
                    ].setValidators([
                        Validators.pattern(/^[a-zA-Z]{3}\d{10}$/),
                    ]);
                }
                if (selectedValue === "17" || selectedValue === "16") {
                    this.docMaxLength = 11;
                    this.citizenshipComponentForm.controls[
                        "docID"
                    ].setValidators([Validators.pattern(/^N[0-9]{10}$/)]);
                } else if (
                    selectedValue === "6" ||
                    selectedValue === "18" ||
                    selectedValue === "19"
                ) {
                    this.docMinLength = 6;
                    this.docMaxLength = 12;
                    this.citizenshipComponentForm.controls[
                        "docID"
                    ].setValidators([
                        Validators.pattern(/^[a-zA-Z0-9]{6,12}$/),
                    ]);
                }
            });
    }

    setProgramFieldValidations(currentUser: IHouseHold) {
        const applyNowService = this.service;
        const individualBenefits =
            this.service?.getAppliedBenefitsForIndividual(
                currentUser
            ) as string[];
        const fields = [
            {
                fieldName: "dateEnteredCountry",
                optionalProgram:
                    IND_CITIZENSHIP_DETAIL_COUNTRY_OPTIONAL_PROGRAM as string[],
                requiredProgram: [] as string[],
            },
            {
                fieldName: "countryComesFrom",
                optionalProgram:
                    IND_CITIZENSHIP_DETAIL_COUNTRYFROM_OPTIONAL_PROGRAM as string[],
                requiredProgram: [] as string[],
            },
            {
                fieldName: "regNumber",
                optionalProgram:
                    IND_CITIZENSHIP_DETAIL_COUNTRY_OPTIONAL_PROGRAM as string[],
                requiredProgram: [] as string[],
            },

            {
                fieldName: "docType",
                optionalProgram:
                    IND_CITIZENSHIP_DETAIL_DOC_OPTIONAL_PROGRAM as string[],
                requiredProgram: [] as string[],
            },
            {
                fieldName: "docID",
                optionalProgram:
                    IND_CITIZENSHIP_DETAIL_DOC_OPTIONAL_PROGRAM as string[],
                requiredProgram: [] as string[],
            },
            {
                fieldName: "docExpDate",
                optionalProgram:
                    IND_CITIZENSHIP_DETAIL_DOC_OPTIONAL_PROGRAM as string[],
                requiredProgram: [] as string[],
            },
            {
                fieldName: "haveASponsor",
                optionalProgram:
                    IND_CITIZENSHIP_DETAIL_SPONSOR_OPTIONAL_PROGRAM as string[],
                requiredProgram: [] as string[],
            },
        ] as FormValidatorField[];
        this.fieldDisplays = {};
        fields.forEach((fieldObj: FormValidatorField) => {
            this.fieldDisplays[fieldObj.fieldName] =
                this.service.areProgramsExist(individualBenefits, [
                    ...fieldObj.optionalProgram,
                    ...fieldObj.requiredProgram,
                ]);
        });
        if (individualBenefits != null && individualBenefits.length > 0) {
            const requiredOrOptionalValidatorField = {
                selectedPrograms: individualBenefits,
                requiredFields: [],
                formGroup: this.citizenshipComponentForm,
                fields: fields,
            } as RequiredOrOptionalValidatorField;
            Utility.setOrClearValidatorForFieldWithDifferntPrograms(
                requiredOrOptionalValidatorField
            );
            this.citizenshipComponentForm =
                requiredOrOptionalValidatorField.formGroup;
            this.requiredFields = [
                ...requiredOrOptionalValidatorField.requiredFields,
            ] as any;
        }
    }
    isFieldValid(field: string): boolean {
        if (field === "dateEnteredCountry")
            console.log(this.citizenshipComponentForm.get(field));
        if (this.citizenshipComponentForm.get(field).status !== "VALID") {
            console.log("invalid");
            console.log(field);
            console.log(this.citizenshipComponentForm.get(field).touched);
        }
        return (
            this.citizenshipComponentForm.get(field).status !== "VALID" &&
            this.citizenshipComponentForm.get(field).touched
        );
    }
    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return "";
        }
        switch (field) {
            case "countryComesFrom":
                if (this.requiredFields.indexOf("countryComesFrom") > -1) {
                    return "Country is required.";
                }
                break;
            case "dateEnteredCountry":
                if (this.requiredFields.indexOf("dateEnteredCountry") > -1) {
                    return "Date is required.";
                } else if (
                    this.citizenshipComponentForm.get("dateEnteredCountry")
                        .errors.invalidDate
                ) {
                    return "Date should not exceed today's date.";
                }
                if (this.citizenshipComponentForm.get("dateEnteredCountry").errors.duetInvalidDate) {
                    return "duetInvalidDate";
                }
                break;
            case "regNumber":
                if (this.requiredFields.indexOf("regNumber") > -1) {
                    return "Registration Number is required.";
                }
                break;
            case "docType":
                if (this.requiredFields.indexOf("docType") > -1) {
                    return "Document Type is required.";
                }

                break;
            case "docID":
                console.log(this.citizenshipComponentForm.get(field));
                if (this.requiredFields.indexOf("docID") > -1) {
                    return "Document ID Number is required.";
                }
                if (
                    this.citizenshipComponentForm.get("docID").errors
                        .minlength ||
                    this.citizenshipComponentForm.get("docID").errors.pattern
                ) {
                    return "Enter valid document number.";
                }
                break;

            case "docExpDate":
                if (this.requiredFields.indexOf("docExpDate") > -1) {
                    return "Document Expiration Date is required.";
                }
                if (this.citizenshipComponentForm.get("docExpDate").errors.duetInvalidDate) {
                    return "duetInvalidDate";
                }
                break;
            case "sopnsorType":
                if (this.requiredFields.indexOf("sopnsorType") > -1) {
                    return "Sponsor Type is required.";
                }
                break;
            default:
                return "";
                break;
        }

        return "";
    }
    restrictSplCharacters(event: any) {
        var inp = String.fromCharCode(event.keyCode);
        if (/[\\'.0-9a-zA-Z-]/.test(inp)) {
            return true;
        } else {
            event.preventDefault();
            return false;
        }
    }

    OnlyAlphaNumbAllowed(event: { which: any; keyCode: any }): boolean {
        var inp = String.fromCharCode(event.keyCode);

        if (/[A-Za-z0-9]/.test(inp)) {
            return true;
        } else {
            return false;
        }
    }
    get f() {
        return this.citizenshipComponentForm.controls;
    }
    onSubmit() {
        this.citizenshipComponentForm.markAllAsTouched();
        const isValid = this.citizenshipComponentForm.valid;
        if (!isValid) return;
        // this.service.validateAllFormFields(this.citizenshipComponentForm);
        if (this.citizenshipComponentForm.status.toLowerCase() === "valid") {
            const storedHouseholdDetails = this.service.getHouseHoldDetails;
            const benefits = this.service.getAppliedBenefitsForIndividual(
                this.currentUser
            );
            const getAdults =
                storedHouseholdDetails.houseHoldPersons?.filter(
                    (ind: IHouseHold) => {
                        return Utility.getAge(ind.dateOfBirth) > 18;
                    }
                ) || [];
            const showPrimaryCare = this.service.areProgramsExist(
                benefits as string[],
                IND_PRIMARY_CARE
            );
            const showFosterCare = this.service.areProgramsExist(
                benefits as string[],
                IND_FOSTER_CARE
            );

            const updatedHouseholdPersons =
                storedHouseholdDetails.houseHoldPersons?.map(
                    (person: IHouseHold) => {
                        console.log(person.id + "===" + this.currentUser.id);
                        if (
                            person.id?.toString() ===
                            this.currentUser.id?.toString()
                        ) {
                            const personToBeUpdated = { ...person };
                            personToBeUpdated.citizenship = {
                                ...person.citizenship,
                                dateEnteredUS:
                                    this.citizenshipComponentForm.get(
                                        "dateEnteredCountry"
                                    ).value,
                                country:
                                    this.citizenshipComponentForm.get(
                                        "countryComesFrom"
                                    ).value,
                                otherCountry:
                                    this.citizenshipComponentForm.get(
                                        "countryComesFrom1"
                                    ).value,
                                alienRegistrationNumber:
                                    this.citizenshipComponentForm.get(
                                        "regNumber"
                                    ).value,
                                documentType:
                                    this.citizenshipComponentForm.get("docType")
                                        .value,
                                documentExpiryDate:
                                    this.citizenshipComponentForm.get(
                                        "docExpDate"
                                    ).value,
                                documentIDNumber:
                                    this.citizenshipComponentForm.get("docID")
                                        .value,
                                sponsor: {
                                    ...person.citizenship?.sponsor,
                                    ...{
                                        sponsorType:
                                            this.citizenshipComponentForm.get(
                                                "haveASponsor"
                                            ).value === "Yes"
                                                ? this.citizenshipComponentForm.get(
                                                      "sopnsorType"
                                                  ).value
                                                : "",
                                    },
                                    ...{
                                        haveASponsorSpecified:
                                            this.citizenshipComponentForm.get(
                                                "haveASponsor"
                                            ).value === "Yes"
                                                ? true
                                                : false,
                                    },
                                    ...{
                                        typeSpecified:
                                            this.citizenshipComponentForm.get(
                                                "haveASponsor"
                                            ).value === "Yes"
                                                ? true
                                                : false,
                                    },
                                },
                            };
                            return personToBeUpdated;
                        } else {
                            return person;
                        }
                    }
                );

            if (storedHouseholdDetails) {
                this.service.updateHouseHoldDetails({
                    ...storedHouseholdDetails,
                    ...{ houseHoldPersons: updatedHouseholdPersons },
                });
            }
            //        if (this.citizenshipComponentForm.status.toLowerCase() === "valid") {
            if (
                this.citizenshipComponentForm.get("sopnsorType").value ===
                "organization"
            ) {
                this.route.navigate([
                    RoutePath.APPLYNOW +
                        "/" +
                        RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                        "/" +
                        RoutePath.APPLYNOW_ORG_SPONSOR_DETAILS,

                    { userId: this.currentUserIndex },
                ]);
            } else if (
                this.citizenshipComponentForm.get("sopnsorType").value ===
                "individual"
            ) {
                this.route.navigate([
                    RoutePath.APPLYNOW +
                        "/" +
                        RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                        "/" +
                        RoutePath.APPLYNOW_INDIVDUAL_SPONSOR_DETAILS,
                    { userId: this.currentUserIndex },
                ]);
            } else {
                if (
                    Utility.getAge(this.currentUser.dateOfBirth) < 18 &&
                    getAdults.length > 0 &&
                    showPrimaryCare
                ) {
                    this.route.navigate([
                        RoutePath.APPLYNOW +
                            "/" +
                            RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                            "/" +
                            RoutePath.APPLYNOW_PRIMARY_CARETACKER,
                        { userId: this.currentUserIndex },
                    ]);
                } else if (
                    Utility.getAge(this.currentUser.dateOfBirth) >= 18 &&
                    Utility.getAge(this.currentUser.dateOfBirth) <= 25 &&
                    showFosterCare
                ) {
                    this.route.navigate([
                        RoutePath.APPLYNOW +
                            "/" +
                            RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                            "/" +
                            RoutePath.APPLYNOW_ADULT_FOSTER_DETAILS,
                        { userId: this.currentUserIndex },
                    ]);
                } else {
                    let isNextPage = false;
                    this.personsMap[this.currentUserIndex] = true;
                    sessionStorage.setItem(
                        "lastpath",
                        RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                            "/" +
                            RoutePath.APPLYNOW_CITIZENSHIP
                    );
                    const updatedPageAction = {
                        ...storedHouseholdDetails?.pageAction,
                        personsMap: {
                            ...storedHouseholdDetails?.pageAction?.personsMap,
                            ...this.personsMap,
                        },
                        serviceDirection: PageDirection.NEXT,
                    };
                    if (storedHouseholdDetails)
                        this.service.updateHouseHoldDetails({
                            ...storedHouseholdDetails,
                            ...{ pageAction: updatedPageAction },
                            ...{ houseHoldPersons: updatedHouseholdPersons },
                        });
                    if (this.personsMap != null) {
                        isNextPage = this.utilService.isNextPage(
                            this.personsMap
                        );
                    }
                    if (isNextPage) {
                        this.utilService

                            .getCurrentUserIdPageAction(
                                this.personsMap,
                                PageDirection.NEXT
                            )

                            .subscribe((id: any) => {
                               
                                this.currentUserIndex = id;
                                this.currentUser = this.service.extractUser(
                                    this.houseHoldPersons,
                                    this.currentUserIndex
                                    
                                );
                              
                                this.queueService.initDynamicRoutes(
                                    this.currentUser,
                                    RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                                        "/" +
                                        RoutePath.APPLYNOW_DEMOGRAPHIC_SUMMARY
                                );
                                  this.queueService.updatePageQueueId(0);
                                this.queueService.navigateToPath();
                            });

                        // this.init();
                    } else {
                        this.route.navigate([
                            RoutePath.APPLYNOW +
                                "/" +
                                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                                "/" +
                                RoutePath.APPLYNOW_DEMOGRAPHIC_SUMMARY,
                        ]);
                    }
                }
            }
        }
    }
    previous(): void {
        this.route.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_INDIVIDUALDETAILS +
                "/" +
                RoutePath.APPLYNOW_DRIVING_LICENSE,
        ]);
    }
}

