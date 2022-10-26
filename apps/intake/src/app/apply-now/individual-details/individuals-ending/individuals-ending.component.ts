import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { data } from '@compass-ui/data';
import { IApplyNowState } from '../../+state/apply-now.models';
import { MenuItemState } from '../../../shared/menu-item-state';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowIndividualDetailsIndividualsendingStrategy } from '../../../shared/route-strategies/apply-now/individual-details-individuals-ending';
import { ApplyNowService } from '../../../shared/services/apply-now.service';
import { ScreenQueueUtil } from '../../../shared/services/screen_queue_util.service';
import { ApplyNowStoreService } from '../../apply-now-store-service';

@Component({
  selector: 'compass-ui-individuals-ending',
  templateUrl: './individuals-ending.component.html',
  styleUrls: ['./individuals-ending.component.scss'],
  providers: [ApplyNowIndividualDetailsIndividualsendingStrategy]
})
export class IndividualsEndingComponent implements OnInit, OnDestroy {
  routePath: typeof RoutePath = RoutePath;
  visitCount: any;
  individualsData: any = (data as any).default;
  applyNowState!: IApplyNowState;
  serviceData!: any;
  isLoading = false;
  loadingText = "Loading..."
  @Output() formState = new EventEmitter<MenuItemState>();

  constructor(
    private router: Router,
    private service: ApplyNowStoreService,
    private queueService: ScreenQueueUtil,
    private routingStrategy: ApplyNowIndividualDetailsIndividualsendingStrategy,
    private applyNowService: ApplyNowService

  ) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('visitCount') !== null) {
        this.visitCount = 3;
        sessionStorage.setItem("visitCount", this.visitCount);
    }
    this.service.getAppData().subscribe((d) => {
      this.applyNowState = { ...d };
      this.serviceData = this.applyNowState.gettingStartedResponse;
    });

  }

  ngOnDestroy(): void {
   this.formState.emit(MenuItemState.COMPLETED);
   this.service.formStateUpdated(this.routePath.APPLYNOW_INDIVIDUALDETAILS, MenuItemState.COMPLETED);
  }

  back() {
    this.router.navigate([
      RoutePath.APPLYNOW +
      "/" + RoutePath.APPLYNOW_INDIVIDUALDETAILS +
      "/" + RoutePath.APPLYNOW_INDIVIDUALDETAILS_INDIVIDUALSSUMMARY]);
  }

  next() {
    this.service.formStateUpdated(
      this.routePath.APPLYNOW_INDIVIDUALDETAILS,
      MenuItemState.COMPLETED
    );

            this.router.navigate([
              RoutePath.APPLYNOW +
              "/" + RoutePath.APPLYNOW_INCOME]);
        }
}
