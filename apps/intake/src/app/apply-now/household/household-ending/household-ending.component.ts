import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItemState } from '../../../shared/menu-item-state';
import { RoutePath } from '../../../shared/route-strategies';
import { Router } from '@angular/router';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { ApplyNowHouseholdhouseholdEndingStrategy } from '../../../shared/route-strategies/apply-now/householdEnding';
import { ScreenQueueUtil, ScreenQueueRouteNameDIQ } from '../../../shared/services/screen_queue_util.service';
import { ApplyNowService } from '../../../shared/services/apply-now.service';
import * as data from '../../../shared/services/afs_household_requested_ui.json';
import { IApplyNowState } from '../../+state/apply-now.models';
import { ThisReceiver } from '@angular/compiler';
@Component({
    selector: "compass-ui-household-ending",
    templateUrl: "./household-ending.component.html",
    styleUrls: ["./household-ending.component.scss"],
    providers: [ApplyNowHouseholdhouseholdEndingStrategy],
})
export class HouseholdEndingComponent implements OnInit, OnDestroy {
    routePath: typeof RoutePath = RoutePath;
    visitCount: any;
    householdData: any = (data as any).default;
    applyNowState!: IApplyNowState;
    serviceData!: any;


    constructor(
        private router: Router,
        private service: ApplyNowStoreService,
        private queueService: ScreenQueueUtil,
        private routingStrategy: ApplyNowHouseholdhouseholdEndingStrategy,
        private applyNowService: ApplyNowService
    ) { }

    ngOnInit(): void {
        if (sessionStorage.getItem('visitCount') !== null) {
            this.visitCount = 2;
            sessionStorage.setItem("visitCount", this.visitCount);
        }

        // this.applyNowService.postSubmitApplyNow(data).subscribe((data: any) => {
        //   this.gettingstarted = data;
        //   this.isLoading = false;
        //   ApplyNowStoreService.triggerNext.next(data.id)
        //   this.cd.detectChanges();

        //

    }
    ngOnDestroy(): void {
        // this.service.formStateUpdated(
        //     this.routePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDENDING,
        //     MenuItemState.INPROGRESS
        // );
    }

    back() {
        //this.queueService.back();
        //this.router.navigate([this.routingStrategy.previousRoute()]);
        // const y = sessionStorage.getItem("routingPathEnd");
        this.router.navigate([
            RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSUMMARY,
        ]);
    }

    next() {

                    this.service.formStateUpdated(
                        this.routePath.APPLYNOW_HOUSEHOLD,
                        MenuItemState.COMPLETED
                    );
                    this.router.navigate([this.routingStrategy.nextRoute()]);


    }
}
