import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MenuItemState } from '../../shared/menu-item-state';
import { RoutePath } from '../../shared/route-strategies';
import { filter, Subscription } from 'rxjs';
import { UtilService } from '../../shared/services/util.service';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'compass-ui-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourcesComponent implements OnInit {
  routePath: typeof RoutePath = RoutePath;
  route: string | undefined = RoutePath.APPLYNOW_RESOURCES_RESOURCESGATEPOST;
  subscription = new Subscription();

  @Output() formState = new EventEmitter<MenuItemState>();
  

  constructor(private router: Router,
    private utilService: UtilService
  ) { }
  ngOnInit() {
    this.formState.emit(MenuItemState.INPROGRESS);
    this.subscription.add(
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(
          (e: any) => (this.route = this.utilService.getRouteName(e.url))
        )
    );
  }
  //
  receiveInputFromChild(val:any){
    console.log(val);
  }

  ngOnDestroy() {
    this.formState.emit(MenuItemState.COMPLETED);
  }
}