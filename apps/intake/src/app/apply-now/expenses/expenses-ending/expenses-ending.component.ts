import { Component, OnInit } from '@angular/core';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IApplyNowState } from '../../+state/apply-now.models';
import { ApplyNowService } from '../../../shared/services/apply-now.service';
import { MenuItemState } from '../../../shared/menu-item-state';
import { Router } from "@angular/router";
import { RoutePath } from '../../../shared/route-strategies';

@Component({
  selector: 'compass-ui-expenses-ending',
  templateUrl: './expenses-ending.component.html',
  styleUrls: ['./expenses-ending.component.scss']
})
export class ExpensesEndingComponent implements OnInit {
  routePath: typeof RoutePath = RoutePath;
  visitCount: any;
  isLoading = false;
  loadingText = "Loading...";
  applyNowState!: IApplyNowState;
  serviceData!: any;
  constructor(
    private route: Router,
    private service: ApplyNowStoreService,
    private applyNowService: ApplyNowService
  ) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('visitCount') !== null) {
      this.visitCount = 5;
      sessionStorage.setItem("visitCount", this.visitCount);
    }
   
  }
  next(){
      this.service.formStateUpdated(
          this.routePath.APPLYNOW_EXPENSES,
          MenuItemState.COMPLETED
      );
      this.route.navigate([
          RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_INSURANCE,
      ]);

  }

  back(){
    this.route.navigate([
      RoutePath.APPLYNOW +
      "/" +
      RoutePath.APPLYNOW_EXPENSES +
      "/" +
      RoutePath.APPLYNOW_EXPENSESSUMMARY,
    ]);

  }


}
