import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApplyNowHouseholdQuickSnapEndStrategy } from '../../../shared/route-strategies/apply-now/household-quick-snap-end';
import { ScreenQueueUtil } from '../../../shared/services/screen_queue_util.service';
import { IApplyNowState, Programs } from '../../+state/apply-now.models';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowStoreService } from "../../apply-now-store-service";


@Component({
  selector: 'compass-ui-household-quick-snap-end',
  templateUrl: './household-quick-snap-end.component.html',
  styleUrls: ['./household-quick-snap-end.component.scss'],
  providers: [ApplyNowHouseholdQuickSnapEndStrategy]
})
export class HouseholdQuickSnapEndComponent implements OnInit {
  applyNowState!: IApplyNowState;
  sevicesselected: Array<any> = [];

  constructor(
    private routingStrategy: ApplyNowHouseholdQuickSnapEndStrategy,
    private router: Router,
    private service: ApplyNowStoreService,
    private queueService: ScreenQueueUtil,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.service.getAppData().subscribe((d) => {
        this.applyNowState = { ...d };
        this.sevicesselected = this.applyNowState?.programSelection?.programs || [];
        this.cd.detectChanges();
    });
  }
  goBack() {
    this.router.navigate([this.routingStrategy.previousRoute()]);
  }

  goNext() {
    if (this.sevicesselected.indexOf(Programs.WN) > -1 ||
        this.sevicesselected.indexOf(Programs.LN) > -1 ||
        this.sevicesselected.indexOf(Programs.LI) > -1 ) {
          this.router.navigate([
              RoutePath.APPLYNOW +
                  "/" +
                  RoutePath.APPLYNOW_HOUSEHOLD +
                  "/" +
                  RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDLIVINGSIS,
          ]);
      }
      else if (this.sevicesselected.indexOf(Programs.LH) > -1 ||
          this.sevicesselected.indexOf(Programs.LW) > -1
      ) {
          this.router.navigate([
              RoutePath.APPLYNOW +
                  "/" +
                  RoutePath.APPLYNOW_HOUSEHOLD +
                  "/" +
                  RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDSITUATION,
          ]);
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
  }
}
