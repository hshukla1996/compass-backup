import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MenuItemState } from '../../../shared/menu-item-state';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowStoreService } from '../../apply-now-store-service';

@Component({
    selector: "compass-ui-insurance-ending",
    templateUrl: "./insurance-ending.component.html",
    styleUrls: ["./insurance-ending.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InsuranceEndingComponent implements OnInit {
    @Output() formState = new EventEmitter<MenuItemState>();
    routePath: typeof RoutePath = RoutePath;
  
    constructor(private service: ApplyNowStoreService) { 

    }
  
    ngOnInit(): void {
   
    }
    ngOnDestroy(): void {
     this.formState.emit(MenuItemState.COMPLETED);
     this.service.formStateUpdated(this.routePath.APPLYNOW_INSURANCE, MenuItemState.COMPLETED);//Added comment, will change to yellow color
    }
  }
  