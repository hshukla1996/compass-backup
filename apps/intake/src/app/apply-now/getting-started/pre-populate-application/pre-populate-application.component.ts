import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItemState } from '../../../shared/menu-item-state';
import { RoutePath } from '../../../shared/route-strategies';
@Component({
  selector: 'compass-ui-pre-populate-application',
  templateUrl: './pre-populate-application.component.html',
  styleUrls: ['./pre-populate-application.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrePopulateApplicationComponent implements OnInit {

  @Output() formState = new EventEmitter<MenuItemState>();

  constructor(private route: Router) { }
  next() {
    this.route.navigate([
      RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_GETTINGSTARTED_FAMILYSAFETY
    ]);
  }
  previous() {
    this.route.navigate([
      RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_GETTINGSTARTED_COMMUNITYPARTNERPASSWORD
    ]);
  }
  ngOnInit() {
    this.formState.emit(MenuItemState.INPROGRESS);
  }
  ngOnDestroy(): void {
    this.formState.emit(MenuItemState.COMPLETED);
  }

}
