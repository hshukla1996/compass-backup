import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HouseholdFormDataService } from '../services/household-form-data.service';
import { HouseholdLived } from '../models/householdLived';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ApplyNowHouseholdLivedInPAStrategy } from '../../../shared/route-strategies/apply-now/householdLivedInPA';
import { Router } from '@angular/router';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IApplyNowState } from '../../+state/apply-now.models';
import { IHouseholdLivedInPA } from '../household-model';
import { delay, first, of, Subscription } from 'rxjs';
import { ScreenQueueUtil } from '../../../shared/services/screen_queue_util.service';
import { Utility } from '../../../shared/utilities/Utility';

@Component({
    selector: "compass-ui-household-lived",
    templateUrl: "./household-lived.component.html",
    styleUrls: ["./household-lived.component.scss"],
    providers: [ApplyNowHouseholdLivedInPAStrategy],
})
export class HouseholdLivedComponent implements OnInit {
    householdLived: HouseholdLived;
    householdLivedForm: FormGroup | any;
    applyNowState!: IApplyNowState;
    data: any;
    detail!: IHouseholdLivedInPA;
    maxDateRange = new Date().toISOString().slice(0, 10);
    isDateValid = true;

    constructor(
        public householdFormDataService: HouseholdFormDataService,
        private householdLiv: FormBuilder,
        private router: Router,
        private routingStrategy: ApplyNowHouseholdLivedInPAStrategy,
        private service: ApplyNowStoreService,
        private cd: ChangeDetectorRef,
        private queueService: ScreenQueueUtil
    ) {
        this.householdLived = this.householdFormDataService.householdLived;
    }

    ngOnInit(): void {
          this.maxDateRange = new Date().toISOString().slice(0, 10);
        this.householdLivedForm = this.householdLiv.group({
            years: [""],
            months: [""],
            monthsMoved: [""],
        });

        this.service.getAppData().subscribe((d) => {
            this.applyNowState = { ...d };
            this.detail = this.applyNowState.houseHoldDetails
                .householdLivedInPA as IHouseholdLivedInPA;
            // console.log("mailingbsb", this.detail)
            this.householdLivedForm.get('years').patchValue(this.detail.years)
            this.householdLivedForm.get('months').patchValue(this.detail.months)
            if (this.detail.monthsMoved !== "") {
                this.showMonthsMovedIn = true
                this.householdLivedForm.get('monthsMoved').patchValue(Utility.duetFormatDate(this.detail.monthsMoved))
            }  
            // of(true)
            //     .pipe(delay(10))
            //     .subscribe(() => {
            //         this.householdLivedForm.patchValue({
            //             years: this.detail?.years,
            //             months: this.detail?.months,
            //             monthsMoved: this.detail.monthsMoved,
            //         });
            //     });
            this.cd.detectChanges();
        });
    }

    OnlyNumberAllowed(event: { which: any; keyCode: any }): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }
    showMonthsMovedIn: boolean = false;

    GetVal() {
       
        if (this.householdLivedForm.get("months").value >= "10"  ) {
            this.showMonthsMovedIn = false;
            this.householdLivedForm.get("monthsMoved").value = ""
 


        }
     else if (
            this.householdLivedForm.get("years").value === "" &&
            this.householdLivedForm.get("months").value <= "2"  &&
            this.householdLivedForm.get("months").value >= "0"
        ) { 
            this.showMonthsMovedIn = true;
        } else if (
            this.householdLivedForm.get("years").value === "0" &&
            this.householdLivedForm.get("months").value <= "2" &&
            this.householdLivedForm.get("months").value >= "0"
        ) { 

            // this.householdLivedForm.controls["monthsMoved"].setValidators([Validators.required]);
            this.householdLivedForm.controls['monthsMoved'].setValidators([Utility.dateMaxValidator()]);
            this.showMonthsMovedIn = true;
        }
        else { 
            this.householdLivedForm.controls["monthsMoved"].clearValidators();
            this.showMonthsMovedIn = false;
            this.householdLivedForm.get("monthsMoved").value = "" 
            
        }
    }


    isFieldValid(field: string): boolean {
        if (this.householdLivedForm.get(field).status !== "VALID") {
        }
        return (
            this.householdLivedForm.get(field).status !== "VALID" &&
            this.householdLivedForm.get(field).touched
        );
    }
    errorMap(field: string) {
        if (!this.isFieldValid(field)) {
            return "";
        }
        switch (field) {
            case "monthsMoved":
                if (this.householdLivedForm.get("monthsMoved").errors.required) {
                    return "No date is selected";
                }
                if (this.householdLivedForm.get("monthsMoved").errors.invalidDate) {
                    return "Date must be in the past";
                }
                if (this.householdLivedForm.get("monthsMoved").errors.duetInvalidDate) {
                    return "duetInvalidDate";
                }
                break;
            default:
                return "";

        }

        return "";
    }

    goBack() {
        this.router.navigate([this.routingStrategy.previousRoute()]);
        // this.queueService.back();
    }
    goNext() {
        let months = this.householdLivedForm.get('months').value > 11 ? true : false
        if (months) return false;
        this.service.validateAllFormFields(this.householdLivedForm);
         if (this.householdLivedForm.valid) {
        const storeHouseholdlivedPA = this.applyNowState?.houseHoldDetails;
        const storedHouseholdlivedPA = this.applyNowState?.houseHoldDetails.householdLivedInPA as IHouseholdLivedInPA;

        const updatedHouseholdlivedPA = {
            ...storedHouseholdlivedPA,
            householdLivedInPA: this.householdLivedForm.value,
        };
        this.service.updateHouseHoldDetails({
            ...storeHouseholdlivedPA,
            ...updatedHouseholdlivedPA,
        });
        this.router.navigate([this.routingStrategy.nextRoute()]);

         return true;
        } else {
         return false;
        }
    }

    // addMonthsMovedIn(){

    //     if(this.householdLivedForm.month<=2)
    //       this.showMonthsMovedIn = true;
    //     else
    //       this.showMonthsMovedIn = false;
    //   }
}
