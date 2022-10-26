import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { IApplyNowState } from "../../+state/apply-now.models";
import { AppStoreService } from "../../../app-store-service";
import { ApplyNowHouseholdAbsentRelativeChildsupportStrategy } from "../../../shared/route-strategies/apply-now/household-absent-relative-childsupport";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import {
    IAbsentRelative,
    IAbsentRelativeChildSupport,
    IHouseHold,
    PageDirection,
} from "../household-model";
import { delay, first, of, Subscription } from "rxjs";
import { RoutePath } from "../../../shared/route-strategies";
import { UtilService } from "../../../shared/services/util.service";
import { ScreenQueueUtil } from "../../../shared/services/screen_queue_util.service";
@Component({
    selector: "compass-ui-household-absent-relative-childsupport",
    templateUrl: "./household-absent-relative-childsupport.component.html",
    styleUrls: ["./household-absent-relative-childsupport.component.scss"],
    providers: [ApplyNowHouseholdAbsentRelativeChildsupportStrategy],
})
export class HouseholdAbsentRelativeChildsupportComponent implements OnInit {
    absentRelativeChildSupportForm: FormGroup | any;
    applyNowState!: IApplyNowState;
    data: any;
    detail!: IAbsentRelativeChildSupport;
    absentRelatives!: IAbsentRelative[];
    currentServicesMap: any;
    householdMembers: IHouseHold[] = [];
    currentUser: IHouseHold = {};
    currentUserIndex!: any;
    visit: boolean = false;
    visitCount: any;

    constructor(
        private fb: FormBuilder,
        private routingStrategy: ApplyNowHouseholdAbsentRelativeChildsupportStrategy,
        private router: Router,
        private queueService: ScreenQueueUtil,
        private appService: AppStoreService,
        private service: ApplyNowStoreService,
        private cd: ChangeDetectorRef,
        private utilService: UtilService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const memberId = this.activatedRoute.snapshot.paramMap.get("userId");
        this.currentUserIndex = sessionStorage.getItem("storageId");

        this.absentRelativeChildSupportForm = this.fb.group({
            childsupport: [""],
            id: this.currentUserIndex,
        });

        setTimeout(() => {
            let radioLabel =
                document.getElementsByClassName("form-check-label")[0];
            // radioLabel.classList.add("mt-3");
        }, 10);

        this.service.getAppData().subscribe((d) => {
            this.applyNowState = { ...d };
            this.data = this.applyNowState.metaData;
            this.detail = this.applyNowState.houseHoldDetails
                .absentRelativeChildSupport as IAbsentRelativeChildSupport;
            // console.log("mailingbsb", this.detail)
            this.absentRelatives =
                this.applyNowState.houseHoldDetails.absentRelative || [];
            this.currentServicesMap =
                {
                    ...this.applyNowState.houseHoldDetails.pageAction
                        ?.absentRelativeMap,
                } || {};



            this.currentUser =
                this.service.extractUser(
                    this.absentRelatives,

                    this.currentUserIndex
                ) || "";

            of(true)
                .pipe(delay(10))
                .subscribe(() => {
                    this.absentRelativeChildSupportForm.patchValue({
                        childsupport: this.detail?.childsupport ? (this.detail?.childsupport === "Y" ? "Yes" : "No") : null,
                    });
                });
            this.cd.detectChanges();
        });

    }

    goBack() {
        // this.router.navigate([this.routingStrategy.previousRoute()]);
        // this.currentServicesMap[this.currentUserIndex] = false;
        // const storeHouseholdDetails = this.applyNowState.houseHoldDetails;
        // const updatedPageAction = {
        //   nursingHomeMap: { ...storeHouseholdDetails.pageAction?.absentRelativeMap, ...this.currentServicesMap },

        //   serviceDirection: PageDirection.NEXT
        // };
        // this.service.updateHouseHoldDetails({ ...storeHouseholdDetails, ...{ pageAction: updatedPageAction } })
        // if (

        //   Object.keys(this.currentServicesMap)[0].toString() !==

        //   this.currentUserIndex.toString()

        // ) {
        //   this.utilService
        //     .getCurrentUserIdPageAction(
        //       this.currentServicesMap,
        //       PageDirection.BACK,
        //     )
        //     .subscribe((id: any) => {
        //       this.currentUserIndex = id.toString();
        //       this.router.navigate([
        //         this.routingStrategy.currentRoute,
        //         { userId: this.currentUserIndex },
        //       ]);
        //     });

        //   //    this.init();

        // } else {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_HOUSEHOLD +
                "/" +
                RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDABSENTRELATIVENONRESIDENTIALPROPERTY,
        ]);
        //this.queueService.back();
    }
    goNext() {
        // if (this.householdAppliedBeforeForm.valid) {
        const storeHouseholdAppliedBeforeBenefits =
            this.applyNowState?.houseHoldDetails;
        const storedHouseholdAppliedBeforeBenefits =
            this.applyNowState?.houseHoldDetails.absentRelativeChildSupport;

        this.absentRelativeChildSupportForm.value.childsupport = this.absentRelativeChildSupportForm.value.childsupport === "Yes" ? "Y" : "N";
        const updatedHouseholdAppliedBefore = {
            ...storedHouseholdAppliedBeforeBenefits,
            absentRelativeChildSupport:
                this.absentRelativeChildSupportForm.value,
        };
        this.service.updateHouseHoldDetails({
            ...storeHouseholdAppliedBeforeBenefits,
            ...updatedHouseholdAppliedBefore,
        });
        let isNextPage = false;
        this.currentServicesMap[this.currentUserIndex] = true;

        if (this.currentServicesMap != null) {

            isNextPage = this.utilService.isNextPage(this.currentServicesMap);
        }

        //Next to pagequeue
        if (
            this.absentRelativeChildSupportForm.get("childsupport").value ===
            "Yes"
        ) {
            this.router.navigate([
                RoutePath.APPLYNOW + 
                '/' + RoutePath.APPLYNOW_HOUSEHOLD + 
                '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDABSENTRELATIVECHILDSUPPORTSCREEN]);
        } else {
            this.router.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_HOUSEHOLD +
                    "/" +
                    RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDABSENTRELATIVESUMMARY,
            ]);
        }
    }

    //   } else {
    //     return false;
    //   }
}
