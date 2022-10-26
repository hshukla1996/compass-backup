import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItemState } from '../../../shared/menu-item-state';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowStoreService } from '../../apply-now-store-service';

@Component({
    selector: "compass-ui-rsdvd-divider",
    templateUrl: "./rsdvd-divider.component.html",
    styleUrls: ["./rsdvd-divider.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RsdvdDividerComponent implements OnInit {
    @Output() formState = new EventEmitter<MenuItemState>();
    routePath: typeof RoutePath = RoutePath;
  
    constructor(private service: ApplyNowStoreService, private router: Router,) { }
  
      ngOnInit(): void {
          this.formState.emit(MenuItemState.INPROGRESS);
          this.service.formStateUpdated(this.routePath.APPLYNOW_REVIEWANDSUBMIT, MenuItemState.INPROGRESS)
  
      }
      ngOnDestroy(): void {
          //  this.formState.emit(MenuItemState.COMPLETED);
      }
    back(){

    }
    next(){
        //this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION ]);
        this.router.navigate([
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_REVIEWANDSUBMIT +
            "/" +
            RoutePath.APPLYNOW_REVIEWANDSUBMIT_MACHIPPROVIDER,
        ]);
    }
  }
  

