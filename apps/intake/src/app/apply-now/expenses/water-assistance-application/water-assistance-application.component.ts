import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { IApplyNowState } from "../../+state/apply-now.models";
import { ApplyNowExpensesWaterAsstAppStrategy } from "../../../shared/route-strategies/apply-now/expenses-water-assistance-application";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { delay, first, of, Subscription } from "rxjs";
import { RoutePath } from "../../../shared/route-strategies";
import { IHouseHold, IHouseHoldDetails } from "../../household/household-model";
import { LiwapService } from "./liwap.service";

@Component({
    selector: "compass-ui-water-assistance-application",
    templateUrl: "./water-assistance-application.component.html",
    styleUrls: ["./water-assistance-application.component.scss"],
    providers: [ApplyNowExpensesWaterAsstAppStrategy],
})
export class WaterAssistanceApplicationComponent implements OnInit {
    waterAsstApplicationForm: FormGroup | any;
    drinkingWaterList: any[] = [];
    detail: any;
    //states: any;
    currentUser: IHouseHold = {};
    currentUserIndex!: string;
    houseHoldDetails!: IHouseHoldDetails;
    houseHoldPersons: IHouseHold[] = [];
    applyNowState!: IApplyNowState;
    isDrinikingWaterVisible = false;
    isWasteWaterVisible = false;
    drinkingWaterProvider: any;
    wasteWaterProvider: any;
    drinkingWaterData: any;
    wasteWaterData: any;
    drinkingWaterProviderList = [
        {
            id: "3000352",
            value: "BORO OF SOMERSET",
        },
        {
            id: "3000523",
            value: "BOROUGH OF RIDGWAY",
        },
        {
            id: "3000621",
            value: "MCALISTERVILLE AREA JOINT AUTHORITY",
        },
        {
            id: "3000635",
            value: "MOUNT UNION BOROUGH",
        },
    ];

    wasteWaterProviderList = [
        {
            id: "3000352",
            value: "BORO OF SOMERSET",
        },
        {
            id: "3000523",
            value: "BOROUGH OF RIDGWAY",
        },
        {
            id: "3000557",
            value: "COUDERSPORT MUNICIPAL AUTHORITY",
        },
        {
            id: "3000562 ",
            value: "DEER CREEK DRAINAGE BASIN AUTHORITY",
        },
    ];

    constructor(
        private fb: FormBuilder,
        private routingStrategy: ApplyNowExpensesWaterAsstAppStrategy,
        private router: Router,
        private service: ApplyNowStoreService,
        private liwapService: LiwapService
    ) {}

    ngOnInit(): void {
        this.waterAsstApplicationForm = this.fb.group({
            drinkingWater: ["0"],
            OtherDrinkingWater: [
                "",
                [
                    this.myFormValidator(
                        () =>
                            this.waterAsstApplicationForm.value.drinkingWater?.includes(
                                "Other"
                            ),
                        Validators.required
                    ),
                    Validators.pattern("[A-Za-z-'\\\\]+"),
                    Validators.maxLength(256),
                ],
            ],

            whoseNamedrinkingWaterAcc: [""],

            OtherDrinkingWaterAccHolder: [
                "",
                [
                    this.myFormValidator(
                        () =>
                            this.waterAsstApplicationForm.value.whoseNamedrinkingWaterAcc?.includes(
                                "Other"
                            ),
                        Validators.required
                    ),
                    Validators.pattern("[A-Za-z-'\\\\]+"),
                    Validators.maxLength(30),
                ],
            ],
            wasteWater: [""],
            OtherWasteWater: [
                "",
                [
                    this.myFormValidator(
                        () =>
                            this.waterAsstApplicationForm.value.wasteWater?.includes(
                                "Other"
                            ),
                        Validators.required
                    ),
                    Validators.pattern("[A-Za-z-'\\\\]+"),
                    Validators.maxLength(256),
                ],
            ],
            whoseNamewasteWaterAcc: [""],
            OtherWasteWaterAccHolder: [
                "",
                [
                    this.myFormValidator(
                        () =>
                            this.waterAsstApplicationForm.value.whoseNamewasteWaterAcc?.includes(
                                "Other"
                            ),
                        Validators.required
                    ),
                    Validators.pattern("[A-Za-z-'\\\\]+"),
                    Validators.maxLength(30),
                ],
            ],
        });
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        if (this.houseHoldDetails.houseHoldPersons) {
            this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
        }
        this.service.getAppData().subscribe((d) => {
            this.applyNowState = { ...d };
            this.detail =
                this.applyNowState.houseHoldDetails.expenses?.waterAssistanceApplication;
            let wastewaterAsstValue = "";
            let wastewaterAccAsstValue = "";
            let drinkingWaterValue = "";
            let drinkingWaterAccValue = "";
            const waterType =
                this.applyNowState.houseHoldDetails.householdWaterQuestions.payingForDrinkingWater
                    .charAt(0)
                    .toUpperCase();
            if (waterType === "D") {
                this.getLiwapServiceData("D");
            } else if (waterType === "W") {
                this.getLiwapServiceDataforWasteWater("W");
            } else {
                this.getLiwapServiceData("D"),
                    this.getLiwapServiceDataforWasteWater("W");
            }
            if (
                this.applyNowState.houseHoldDetails.householdWaterQuestions
                    .payingForDrinkingWater === "both" ||
                this.applyNowState.houseHoldDetails.householdWaterQuestions
                    .payingForDrinkingWater === "DrinkingWater" ||
                this.applyNowState.houseHoldDetails.householdWaterQuestions
                    .payingForDrinkingWater === "WasteWater"
            ) {
                if (
                    this.applyNowState.houseHoldDetails.householdWaterQuestions
                        .payingForDrinkingWater === "both"
                ) {
                    this.isWasteWaterVisible = true;
                    this.isDrinikingWaterVisible = true;
                    this.waterAsstApplicationForm.controls[
                        "drinkingWater"
                    ].setValidators([Validators.required]);
                    this.waterAsstApplicationForm.controls[
                        "whoseNamedrinkingWaterAcc"
                    ].setValidators([Validators.required]);
                    this.waterAsstApplicationForm.controls[
                        "wasteWater"
                    ].setValidators([Validators.required]);
                    this.waterAsstApplicationForm.controls[
                        "whoseNamewasteWaterAcc"
                    ].setValidators([Validators.required]);
                    drinkingWaterValue = this.detail?.drinkingWater;
                    drinkingWaterAccValue =
                        this.detail?.whoseNamedrinkingWaterAcc;
                    wastewaterAsstValue = this.detail?.wasteWater;
                    wastewaterAccAsstValue =
                        this.detail?.whoseNamewasteWaterAcc;
                } else {
                    this.waterAsstApplicationForm.controls[
                        "wasteWater"
                    ].clearValidators();
                    this.waterAsstApplicationForm.controls[
                        "whoseNamewasteWaterAcc"
                    ].clearValidators();
                    this.waterAsstApplicationForm.controls[
                        "drinkingWater"
                    ].clearValidators();
                    this.waterAsstApplicationForm.controls[
                        "whoseNamedrinkingWaterAcc"
                    ].clearValidators();
                }
                if (
                    this.applyNowState.houseHoldDetails.householdWaterQuestions
                        .payingForDrinkingWater === "DrinkingWater"
                ) {
                    this.isDrinikingWaterVisible = true;
                    this.waterAsstApplicationForm.controls[
                        "drinkingWater"
                    ].setValidators([Validators.required]);
                    this.waterAsstApplicationForm.controls[
                        "whoseNamedrinkingWaterAcc"
                    ].setValidators([Validators.required]);
                    wastewaterAsstValue = "";
                    wastewaterAccAsstValue = "";
                    drinkingWaterValue = this.detail?.drinkingWater;
                    drinkingWaterAccValue =
                        this.detail?.whoseNamedrinkingWaterAcc;
                } else {
                    this.waterAsstApplicationForm.controls[
                        "drinkingWater"
                    ].clearValidators();
                    this.waterAsstApplicationForm.controls[
                        "whoseNamedrinkingWaterAcc"
                    ].clearValidators();
                }
                if (
                    this.applyNowState.houseHoldDetails.householdWaterQuestions
                        .payingForDrinkingWater === "WasteWater"
                ) {
                    this.isWasteWaterVisible = true;
                    this.waterAsstApplicationForm.controls[
                        "wasteWater"
                    ].setValidators([Validators.required]);
                    this.waterAsstApplicationForm.controls[
                        "whoseNamewasteWaterAcc"
                    ].setValidators([Validators.required]);
                    wastewaterAsstValue = this.detail?.wasteWater;
                    wastewaterAccAsstValue =
                        this.detail?.whoseNamewasteWaterAcc;
                    drinkingWaterValue = "";
                    drinkingWaterAccValue = "";
                    // this.waterAsstApplicationForm.controls["drinkingWater"]= "";
                } else {
                    this.waterAsstApplicationForm.controls[
                        "wasteWater"
                    ].clearValidators();
                    this.waterAsstApplicationForm.controls[
                        "whoseNamewasteWaterAcc"
                    ].clearValidators();
                }
            }

            of(true)
                .pipe(delay(10))
                .subscribe(() => {
                    //setTimeout(() => {
                    this.waterAsstApplicationForm.patchValue({
                        drinkingWater: drinkingWaterValue,
                        OtherDrinkingWater: this.detail?.OtherDrinkingWater,
                        whoseNamedrinkingWaterAcc: drinkingWaterAccValue,
                        OtherDrinkingWaterAccHolder:
                            this.detail?.OtherDrinkingWaterAccHolder,
                        wasteWater: wastewaterAsstValue,
                        OtherWasteWater: this.detail?.OtherWasteWater,
                        whoseNamewasteWaterAcc: wastewaterAccAsstValue,
                        OtherWasteWaterAccHolder:
                            this.detail?.OtherWasteWaterAccHolder,
                    });
                    //}, 1000);
                });
        });

        // const waterType = this.applyNowState.houseHoldDetails.householdWaterQuestions.payingForDrinkingWater.charAt(0).toUpperCase()
        // if (waterType === 'D'){
        //   this.getLiwapServiceData('D')
        // } else if (waterType ==='W'){
        //   this.getLiwapServiceDataforWasteWater('W')
        // }else{
        //   this.getLiwapServiceData('D'),
        //   this.getLiwapServiceDataforWasteWater('W')

        // }
    }

    getLiwapServiceData(type: any) {
        const dw = {
            county: this.applyNowState.houseHoldDetails.Household
                .applicantAddress?.county,
            waterSource: type,
            // waterSource: "1"
        };
        // console.log("waterre", this.applyNowState.houseHoldDetails)
        // console.log("drinkingwater", dw)
        this.liwapService.getDrinkingWater(dw).subscribe((result: any) => {
            // console.log("waterdata", result)
            this.drinkingWaterData! = result["providers"];
            console.log("drinking water", this.drinkingWaterData);
            //this.fderalRecoganizedTribeIncomeForm.get("perCapitaPaymentAmount");
        });
    }

    getLiwapServiceDataforWasteWater(type: any) {
        const ww = {
            county: this.applyNowState.houseHoldDetails.Household
                .applicantAddress?.county,
            waterSource: type,
            // waterSource: "1"
        };
        // console.log("waterre", this.applyNowState.houseHoldDetails)
        // console.log("drinkingwater", ww)
        this.liwapService.getDrinkingWater(ww).subscribe((result: any) => {
            // console.log("waterdata", result)
            this.wasteWaterData! = result["providers"];
            // console.log("drinking water",this.drinkingWaterData)
            //}
        });
    }

    private myFormValidator(predicate: any, validator: any): any {
        return (formControl: FormControl) => {
            if (!formControl.parent) {
                return null;
            }
            if (predicate()) {
                return validator(formControl);
            }
            return null;
        };
    }

    OnlyNumberAllowed(event: { which: any; keyCode: any }): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    drinkingWaterReset() {
        if (
            this.waterAsstApplicationForm.controls["drinkingWater"].value !=
            "Other"
        ) {
            this.waterAsstApplicationForm.get("OtherDrinkingWater").value = "";
        }
    }

    wasteWaterReset() {
        if (
            this.waterAsstApplicationForm.controls["wasteWater"].value !=
            "Other"
        ) {
            this.waterAsstApplicationForm.get("OtherWasteWater").value = "";
        }
    }

    wasteWaterAccReset() {
        if (
            this.waterAsstApplicationForm.controls["whoseNamewasteWaterAcc"]
                .value != "Other"
        ) {
            this.waterAsstApplicationForm.get(
                "OtherWasteWaterAccHolder"
            ).value = "";
        }
    }

    drinkWaterAccReset() {
        if (
            this.waterAsstApplicationForm.controls["whoseNamedrinkingWaterAcc"]
                .value != "Other"
        ) {
            this.waterAsstApplicationForm.get(
                "OtherDrinkingWaterAccHolder"
            ).value = "";
        }
    }

    isFieldValid(field: string): boolean {
        return (
            this.waterAsstApplicationForm.get(field).status !== "VALID" &&
            (this.waterAsstApplicationForm.get(field).dirty ||
                this.waterAsstApplicationForm.get(field).touched)
        );
    }

    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return "";
        }

        switch (field) {
            // case "City":
            //   if (this.householdAddressForm.get("City").errors.required) {
            //     return "No city is entered";
            //   }
            //   break;
            case "drinkingWater":
                if (
                    this.waterAsstApplicationForm.get("drinkingWater").errors
                        .required
                ) {
                    return "This field is required.";
                } else {
                    return "Enter only alphabets.";
                }
                break;

            case "OtherDrinkingWater":
                if (
                    this.waterAsstApplicationForm.get("OtherDrinkingWater")
                        .errors?.required
                ) {
                    return "This field is required.";
                }
                break;
            case "whoseNamedrinkingWaterAcc":
                if (
                    this.waterAsstApplicationForm.get(
                        "whoseNamedrinkingWaterAcc"
                    ).errors?.required
                ) {
                    return "This field is required.";
                }
                break;
            case "OtherDrinkingWaterAccHolder":
                if (
                    this.waterAsstApplicationForm.get(
                        "OtherDrinkingWaterAccHolder"
                    ).errors?.required
                ) {
                    return "This field is required.";
                }
                break;
            case "wasteWater":
                if (
                    this.waterAsstApplicationForm.get("wasteWater").errors
                        ?.required
                ) {
                    return "This field is required.";
                }
                break;
            case "OtherWasteWater":
                if (
                    this.waterAsstApplicationForm.get("OtherWasteWater").errors
                        ?.required
                ) {
                    return "This field is required.";
                }
                break;
            case "whoseNamewasteWaterAcc":
                if (
                    this.waterAsstApplicationForm.get("whoseNamewasteWaterAcc")
                        .errors?.required
                ) {
                    return "This field is required.";
                }
                break;
            case "OtherWasteWaterAccHolder":
                if (
                    this.waterAsstApplicationForm.get(
                        "OtherWasteWaterAccHolder"
                    ).errors?.required
                ) {
                    return "This field is required.";
                }
                break;
            default:
                return "";
                break;
        }
        return "";
    }

    goBack() {
        this.router.navigate([this.routingStrategy.previousRoute()]);
        // this.queueService.back();
    }
    goNext() {
        this.service.validateAllFormFields(this.waterAsstApplicationForm);
        if (
            this.waterAsstApplicationForm.get("drinkingWater").value != "Other"
        ) {
            this.waterAsstApplicationForm
                .get("OtherDrinkingWater")
                ?.setErrors(null);
            this.waterAsstApplicationForm.patchValue({
                OtherDrinkingWater: "",
            });
            this.waterAsstApplicationForm.updateValueAndValidity();
        }
        if (
            this.waterAsstApplicationForm.get("whoseNamedrinkingWaterAcc")
                .value != "Other"
        ) {
            this.waterAsstApplicationForm
                .get("OtherDrinkingWaterAccHolder")
                ?.setErrors(null);
            this.waterAsstApplicationForm.patchValue({
                OtherDrinkingWaterAccHolder: "",
            });
            this.waterAsstApplicationForm.updateValueAndValidity();
        }
        if (this.waterAsstApplicationForm.get("wasteWater").value != "Other") {
            this.waterAsstApplicationForm
                .get("OtherWasteWater")
                ?.setErrors(null);
            this.waterAsstApplicationForm.patchValue({
                OtherWasteWater: "",
            });
            this.waterAsstApplicationForm.updateValueAndValidity();
        }
        if (
            this.waterAsstApplicationForm.get("whoseNamewasteWaterAcc").value !=
            "Other"
        ) {
            this.waterAsstApplicationForm
                .get("OtherWasteWaterAccHolder")
                ?.setErrors(null);
            this.waterAsstApplicationForm.patchValue({
                OtherWasteWaterAccHolder: "",
            });
            this.waterAsstApplicationForm.updateValueAndValidity();
        }

        console.log(this.waterAsstApplicationForm.value);
        if (this.waterAsstApplicationForm.valid) {
            const storeHouseholdDetails = this.applyNowState?.houseHoldDetails;
            const storedHouseHold =
                this.applyNowState?.houseHoldDetails.expenses;
            const updatedHousehold = {
                ...storedHouseHold,
                waterAssistanceApplication: this.waterAsstApplicationForm.value,
            };

            this.service.updateHouseHoldDetails({
                ...storeHouseholdDetails,
                expenses: updatedHousehold,
            });

            if (
                this.applyNowState?.houseHoldDetails?.householdWaterQuestions
                    .payingForDrinkingWater === "both" ||
                this.applyNowState?.houseHoldDetails?.householdWaterQuestions
                    .payingForDrinkingWater === "DrinkingWater"
            ) {
                this.router.navigate([this.routingStrategy.nextRoute()]);
            } else {
                this.router.navigate([
                    RoutePath.APPLYNOW +
                        "/" +
                        RoutePath.APPLYNOW_EXPENSES +
                        "/" +
                        RoutePath.APPLYNOW_EXPENSESWASTEWATERADDRESS,
                ]);
            }
        }
    }
}
