import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MenuItemState } from '../../../shared/menu-item-state';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowStoreService } from '../../apply-now-store-service';

@Component({
    selector: "compass-ui-rsadb-add-benefits",
    templateUrl: "./rsadb-add-benefits.component.html",
    styleUrls: ["./rsadb-add-benefits.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RsadbAddBenefitsComponent implements OnInit {
    @Output() formState = new EventEmitter<MenuItemState>();
    routePath: typeof RoutePath = RoutePath;
  
    constructor(private service: ApplyNowStoreService) { 

    }
  
    ngOnInit(): void {
   
    }
    ngOnDestroy(): void {
     this.formState.emit(MenuItemState.COMPLETED);
     this.service.formStateUpdated(this.routePath.APPLYNOW_REVIEWANDSUBMIT, MenuItemState.COMPLETED);
    }
  }
  