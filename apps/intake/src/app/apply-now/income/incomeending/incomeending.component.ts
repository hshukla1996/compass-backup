import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IApplyNowState } from '../../+state/apply-now.models';
import { MenuItemState } from '../../../shared/menu-item-state';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowService } from '../../../shared/services/apply-now.service';
import { ApplyNowStoreService } from '../../apply-now-store-service';

@Component({
  selector: 'compass-ui-incomeending',
  templateUrl: './incomeending.component.html',
  styleUrls: ['./incomeending.component.scss']
})
export class IncomeendingComponent implements OnInit {
  serviceData!: any;
  visitCount: any;
  applyNowState!: IApplyNowState;
  isLoading = false;
  loadingText = "Loading...";
  routePath: typeof RoutePath = RoutePath;
  constructor(private route: Router, private service: ApplyNowStoreService, private applyNowService: ApplyNowService) { }

  ngOnInit(): void {
     if (sessionStorage.getItem('visitCount') !== null) {
        this.visitCount = 4;
        sessionStorage.setItem("visitCount", this.visitCount);
    }
    this.service.getAppData().subscribe((d) => {
      this.applyNowState = { ...d };
      this.serviceData = this.applyNowState.gettingStartedResponse;
    });
  }
  completeSection():void
  {

          this.service.formStateUpdated(
            this.routePath.APPLYNOW_INCOME,
            MenuItemState.COMPLETED
          );
          this.route.navigate([
            RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_EXPENSES
          ]);


  }
  goBack(): void
  {
    console.log("incomeending back method");
    this.route.navigate([
      RoutePath.APPLYNOW
      + "/" + RoutePath.APPLYNOW_INCOME
      + "/" + RoutePath.APPLYNOW_INCOME_SUMMARY]);
  }
}
