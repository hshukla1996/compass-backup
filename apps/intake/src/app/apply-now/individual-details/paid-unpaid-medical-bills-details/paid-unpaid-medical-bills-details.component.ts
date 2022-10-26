import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IApplyNowState } from '../../+state/apply-now.models';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowIndividualDetailsPaidUnpaidMedicalBillsDetailsStrategy } from '../../../shared/route-strategies/apply-now/individual-details-paid-unpaid-medical-bills-details';
import { UtilService } from '../../../shared/services/util.service';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { ScreenQueueUtil } from '../individuals-medical-gatepost/individuals-medical-gatepost.path';

@Component({
  selector: 'compass-ui-paid-unpaid-medical-bills-details',
  templateUrl: './paid-unpaid-medical-bills-details.component.html',
  styleUrls: ['./paid-unpaid-medical-bills-details.component.scss'],
  providers: [ApplyNowIndividualDetailsPaidUnpaidMedicalBillsDetailsStrategy]
})
export class PaidUnpaidBillsDetailsComponent implements OnInit {

  applyNowState: IApplyNowState | undefined;
  public selectedUserids: string[] = [];
  private eventsSubscription: Subscription | undefined;  

  constructor(
    private service: ApplyNowStoreService,
    private router: Router,
    private routingStratagy: ApplyNowIndividualDetailsPaidUnpaidMedicalBillsDetailsStrategy,
    private utilService: UtilService,
    private queueService: ScreenQueueUtil,
  ) {
  }

  ngOnInit(): void {
  }

  public showNextPage() {
    this.queueService.next();
    // this.router.navigate([this.routingStratagy.nextRoute()]);    
  }

  public showPreviousPage() {
    this.router.navigate([RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_INDIVIDUALDETAILS + "/" + RoutePath.APPLYNOW_INDIVIDUALDETAILS_MEDICALBILLS])
    //this.router.navigate([this.routingStratagy.previousRoute()]);
  }

  ngOnDestroy(): void {    
  }
}
