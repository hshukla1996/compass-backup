import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HouseholdFormDataService } from '../services/household-form-data.service';
import { HouseholdWater } from '../models/householdWater';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from "@angular/router";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { AppStoreService } from "../../../app-store-service";
import { ApplyNowHouseholdWaterQuesStrategy } from '../../../shared/route-strategies/apply-now/householdWaterQues';
import { IApplyNowState, Programs } from '../../+state/apply-now.models';
import { IHouseholdWaterQuestions } from '../household-model';
import { ScreenQueueUtil } from '../../../shared/services/screen_queue_util.service';
import { RoutePath } from '../../../shared/route-strategies';

@Component({
    selector: "compass-ui-househol-water",
    templateUrl: "./househol-water.component.html",
    styleUrls: ["./househol-water.component.scss"],
    providers: [ApplyNowHouseholdWaterQuesStrategy],
})
export class HouseholWaterComponent implements OnInit {
    householdWater: HouseholdWater;
    householdWaterForm: FormGroup | any;
    applyNowState!: IApplyNowState;
    data: any;
    detail: any;
    sevicesselected: Array<any> = [];
    rentWater = false;

    constructor(
        public householdFormDataService: HouseholdFormDataService,
        private fb: FormBuilder,
        private householdWat: FormBuilder,
        private router: Router,
        private service: ApplyNowStoreService,
        private routingStrategy: ApplyNowHouseholdWaterQuesStrategy,
        private cd: ChangeDetectorRef,
        private appService: AppStoreService,
        private queueService: ScreenQueueUtil
    ) {
        this.householdWater = this.householdFormDataService.householdWater;
    }

    ngOnInit(): void {

        this.householdWaterForm = this.fb.group({
            waterRent: [''],
            wasteRent: [''],
            payingForDrinkingWater: ['', Validators.required],

        })

        this.service.getAppData().subscribe(d => {
            this.applyNowState = { ...d };
            this.data = this.applyNowState.metaData;
            this.detail = this.applyNowState.houseHoldDetails.householdWaterQuestions as IHouseholdWaterQuestions
            // console.log("mailingbsb", this.detail)
            this.sevicesselected = this.applyNowState?.programSelection?.programs || [];
            this.householdWaterForm.patchValue({
                waterRent: this.detail?.waterRent,
                wasteRent: this.detail?.wasteRent,
                payingForDrinkingWater: this.detail?.payingForDrinkingWater
            })
            console.log("---", this.applyNowState.houseHoldDetails.houSituation)
            const selectedValue = this.applyNowState.houseHoldDetails.houSituation
            if (selectedValue === '5' || selectedValue === '1') {
                this.householdWaterForm.get('waterRent').clearValidators();
                this.householdWaterForm.get('wasteRent').clearValidators();
                this.rentWater = false;

            } else {

                this.householdWaterForm.get('waterRent').setValidators(Validators.required);
                this.householdWaterForm.get('wasteRent').setValidators(Validators.required);
                this.rentWater = true;
            }

            this.cd.detectChanges();
        });

        // this.appService.getRelationships().subscribe(data => {
        //     console.log("relationship---", data);
        //     this.relationships = data;
        // });
    }


    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return "";
        }

        switch (field) {
            case "waterRent":
                if (this.householdWaterForm.get("waterRent").errors.required) {
                    return "Please Select.";
                }
                break;
            case "wasteRent":
                if (this.householdWaterForm.get("wasteRent").errors.required) {
                    return "Please Select.";
                }
                break;
            case "payingForDrinkingWater":
                if (this.householdWaterForm.get("payingForDrinkingWater").errors.required) {
                    return "Please Select.";
                }
                break;
            default:
                return "";
                break;
        }
        return "";
    }

    isFieldValid(field: string): boolean {
        // return (
        //     this.householdWaterForm.get(field).status !== "VALID" &&
        //     this.householdWaterForm.get(field).touched

        return (this.householdWaterForm.get(field).status !== 'VALID' &&
            (this.householdWaterForm.get(field).dirty || this.householdWaterForm.get(field).touched))



    }

    onSubmit() {
        // this.service.validateAllFormFields(this.householdWaterForm);
        // if (this.householdWaterForm.status.toLowerCase() === "valid") {
        //     this.router.navigate([this.routingStratagy.nextRoute()]);
        //     return true;
        // } else {
        //     return false;
        // }
        this.service.validateAllFormFields(this.householdWaterForm);
        if (this.householdWaterForm.valid) {
            const storeHouseholdWaterQuestions = this.applyNowState?.houseHoldDetails;
            const storedHouseHoldWaterQuestions = this.applyNowState?.houseHoldDetails.householdWaterQuestions;
            //.Household.ApplicantAddress;
            //jp

            const updatedHouseholdElectricProvider = {
                ...storedHouseHoldWaterQuestions, householdWaterQuestions: this.householdWaterForm.value
            }
            this.service.updateHouseHoldWaterQuestions({

                ...storeHouseholdWaterQuestions, ...updatedHouseholdElectricProvider
            })
            // this.queueService.next();
            if (this.sevicesselected.indexOf(Programs.HA) > -1 ||
                this.sevicesselected.indexOf(Programs.CA) > -1 ||
                this.sevicesselected.indexOf(Programs.CAR) > -1 ||
                this.sevicesselected.indexOf(Programs.LN) > -1 ||
                this.sevicesselected.indexOf(Programs.LI) > -1 ||
                this.sevicesselected.indexOf(Programs.WN) > -1 ||
                this.sevicesselected.indexOf(Programs.WNR) > -1 ||
                this.sevicesselected.indexOf(Programs.WAR) > -1 ||
                this.sevicesselected.indexOf(Programs.FS) > -1 ||
                this.sevicesselected.indexOf(Programs.FSR) > -1 ||
                this.sevicesselected.indexOf(Programs.ECA) > -1 ||
                this.sevicesselected.indexOf(Programs.ES) > -1 ||
                this.sevicesselected.indexOf(Programs.ESR) > -1) {
                    this.router.navigate([
                        RoutePath.APPLYNOW +
                            "/" +
                            RoutePath.APPLYNOW_HOUSEHOLD +
                            "/" +
                            RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDGATEPOST,
                    ]);
            }
            else if (this.sevicesselected.indexOf(Programs.LH) > -1) {
                this.router.navigate([RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDMEMBERSITUATIONGATEPOST])
            }
            else if (this.sevicesselected.indexOf(Programs.LW) > -1) {
                this.router.navigate([RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSUMMARY])
            }
            else {
                this.router.navigate([
                    RoutePath.APPLYNOW +
                        "/" +
                        RoutePath.APPLYNOW_HOUSEHOLD +
                        "/" +
                        RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDGATEPOST,
                ]);
            }

            return true;
        } else {
            return false;
        }
    }



    previous() {
        if (this.sevicesselected.indexOf(Programs.LH) > -1) {
            this.router.navigate([RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDELECTRICPROVIDER])
        } else {
            this.router.navigate([this.routingStrategy.previousRoute()]);
        }
        // this.router.navigate([this.routingStrategy.previousRoute()]);
        // this.queueService.back();
    }
}
