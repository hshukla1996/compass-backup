import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { ApplyNowHouseholdElectricProviderStrategy } from '../../../shared/route-strategies/apply-now/household-electric-provider';
import { FormBuilder, Validators } from '@angular/forms';
import { AppStoreService } from '../../../app-store-service';
import { IApplyNowState, Programs } from '../../+state/apply-now.models';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { delay, first, of, Observable,from ,Subscription } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';
import { IHouseHoldDetails, IHouseholdElectricProvider } from '../household-model';
import { ScreenQueueUtil } from '../../../shared/services/screen_queue_util.service';
import { RoutePath } from '../../../shared/route-strategies';
import { LiheapService } from '../../expenses/expenses-heating-assistance/liheap.service';


@Component({
    selector: "compass-ui-household-electric-provider",
    templateUrl: "./household-electric-provider.component.html",
    styleUrls: ["./household-electric-provider.component.scss"],
    providers: [ApplyNowHouseholdElectricProviderStrategy],
})
export class HouseholdElectricProviderComponent implements OnInit {
    houseHoldDetails!: IHouseHoldDetails;
    householdElectricProviderForm: FormGroup | any;
    heatingAssistanceData: any;
    waterSources!:Observable<string[]>;
    electricCompaniesList = [
        {
            key: "2325",
            value: "ADAMS ELECTRIC COOPERATIVE INC",
        },
        {
            key: "2731906",
            value: "First Energy Corp",
        },
        {
            key: "2309",
            value: "PPL Electric Utilities Corp",
        },
        {
            key: "2320",
            value: "UGI UTILITIES INC",
        },
    ];

    applyNowState!: IApplyNowState;
    data: any;
    detail: any;
    sevicesselected:string[] = [];

    constructor(
        private fb: FormBuilder,
        private routingStrategy: ApplyNowHouseholdElectricProviderStrategy,
        private router: Router,
        private appService: AppStoreService,
        private service: ApplyNowStoreService,
        private cd: ChangeDetectorRef,
        private queueService: ScreenQueueUtil,
        private liheapService: LiheapService,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit(): void {
        console.log(this.spinner, "this.spinner");
        this.spinner.show();
        this.householdElectricProviderForm = this.fb.group({
            electricCompany: [""],
            acconumber: ["", [Validators.maxLength(25)]],
        });

        this.service.getAppData().subscribe(d => {
            this.applyNowState = { ...d };
        });
        // this.appService.getElectricCompany().subscribe(data => {
        //   // console.log("relationship---", data);
        //   this.electricCompaniesList = data;
        // });
        this.houseHoldDetails = this.service.getHouseHoldDetails;
        // console.log("householddetailssss", this.houseHoldDetails)
       
            this.detail =this.houseHoldDetails
                .householdElectricProvider as IHouseholdElectricProvider;
            // console.log("mailingbsb", this.detail)
            this.sevicesselected =
                this.service.getBenefits() as string[] || [];

            
            
      
        this.getLiheapServiceData();
      
    }

    getLiheapServiceData() {
        const dw = {
            county: this.houseHoldDetails.Household?.applicantAddress?.county || "50",
        };
        this.liheapService.getDrinkingWater(dw).subscribe( (result: any) => {
                this.heatingAssistanceData! = result["providers"];
                setTimeout(() => {
                    this.householdElectricProviderForm.patchValue({
                        electricCompany: this.detail?.electricCompany,
                        acconumber: this.detail?.acconumber,
                    });
                }, 500);
                this.spinner.hide();
        })
    }

    goBack() {
        // this.queueService.back();
        this.router.navigate([this.routingStrategy.previousRoute()]);
    }
    goNext() {
        // if (this.householdElectricProviderForm.valid) {
        const storeHouseholdElectricProvider =
            this.applyNowState?.houseHoldDetails;
        const storedHouseHoldElectricprovider =
            this.applyNowState?.houseHoldDetails.householdElectricProvider;

        this.householdElectricProviderForm.value.electricCompany =
            this.householdElectricProviderForm.value.electricCompany === ""
                ? null
                : this.householdElectricProviderForm.value.electricCompany;

        const updatedHouseholdElectricProvider = {
            ...storedHouseHoldElectricprovider,
            householdElectricProvider: this.householdElectricProviderForm.value,
        };
        this.service.updateHouseHoldElectricProvider({
            ...storeHouseholdElectricProvider,
            ...updatedHouseholdElectricProvider,
        });
        console.log("trtrr", this.sevicesselected);
        if (this.sevicesselected.indexOf(Programs.LW) > -1) {
            this.router.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_HOUSEHOLD +
                    "/" +
                    RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDWATERQUES,
            ]);
        } 
        else if (this.sevicesselected.indexOf(Programs.LH) > -1) {
                this.router.navigate([RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDMEMBERSITUATIONGATEPOST])
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
        // this.queueService.next();
        return true;
        // } else {
        //  return false;
        // }
    }
}
