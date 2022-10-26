import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MenuItemState } from '../../../shared/menu-item-state';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { RoutePath } from '../../../shared/route-strategies';
import { Router, RouteReuseStrategy } from '@angular/router';
import {ApplyNowInsuranceStrategy} from '../../../shared/route-strategies/apply-now/insurance';

import { share } from 'rxjs';
import { Validators } from '@angular/forms';
import { CURRENT_POLICY_HOLDER_PATH } from '../model/insurance-constants';

@Component({
    selector: "compass-ui-insurance-divider",
    templateUrl: "./insurance-divider.component.html",
    styleUrls: ["./insurance-divider.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ApplyNowInsuranceStrategy]
})
export class InsuranceDividerComponent implements OnInit {
  @Output() formState = new EventEmitter<MenuItemState>();
  routePath: typeof RoutePath = RoutePath;
  submitted = false;

  constructor(
   
    private router: Router) { }

    ngOnInit(): void {
     

    }
    previous() {
        //this.router.navigate([this.routingStrategy.previousRoute()]);
    }
    onSubmit(): void {
       
       // this.service.validateAllFormFields(this.insuranceForm);
       // localStorage.setItem("insurance", JSON.stringify(this.insuranceForm.value));
       // if(form is valid)
        this.router.navigate([CURRENT_POLICY_HOLDER_PATH]);
        
    }
    ngOnDestroy(): void {
        //  this.formState.emit(MenuItemState.COMPLETED);
    }
}
