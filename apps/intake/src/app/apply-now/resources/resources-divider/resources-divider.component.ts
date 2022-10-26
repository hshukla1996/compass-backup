import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MenuItemState } from '../../../shared/menu-item-state';
import { RoutePath } from '../../../shared/route-strategies';
import { filter, Subscription } from 'rxjs';
import { UtilService } from '../../../shared/services/util.service';
import { NavigationEnd, Router } from '@angular/router';
import { ApplyNowStoreService } from '../../apply-now-store-service';


@Component({
  selector: 'compass-ui-resources-divider',
  templateUrl: './resources-divider.component.html',
  styleUrls: ['./resources-divider.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourcesDividerComponent implements OnInit {
  
  routePath: typeof RoutePath = RoutePath;
  route: string | undefined = RoutePath.APPLYNOW_RESOURCES_RESOURCESGATEPOST;
  subscription = new Subscription();

  @Output() formState = new EventEmitter<MenuItemState>();


  constructor(
    private router: Router,
    private utilService: UtilService,
    private service: ApplyNowStoreService
  ) { }

  ngOnInit(){
    this.formState.emit(MenuItemState.INPROGRESS);
    this.service.formStateUpdated(
      this.routePath.APPLYNOW_RESOURCES,
      MenuItemState.INPROGRESS
    );
    this.subscription.add(
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(
          (e: any) => (this.route = this.utilService.getRouteName(e.url))
        )
    );
   //console.log("resourece divider");
  }
  receiveInputFromChild(val: any) {
    console.log(val);
  }

  ngOnDestroy() {
    this.formState.emit(MenuItemState.COMPLETED);
  }
  goBack (): void{
    this.router.navigate([
       RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_RESOURCES_RESOURCESDIVIDER
    ]);
  }

  goNext (): void{
    this.router.navigate([
      RoutePath.APPLYNOW + 
      '/' + RoutePath.APPLYNOW_RESOURCES +
      '/' + RoutePath.APPLYNOW_RESOURCES_RESOURCESGATEPOST
    ]);
   
  }
}

