import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItemState } from '../../shared/menu-item-state';
import { RoutePath } from '../../shared/route-strategies';
import { ApplyNowStoreService } from '../apply-now-store-service';
import { ApplyNowPageActions } from '../+state/actions';
import { Store } from '@ngrx/store';
import { State } from '../../+state/app.state';

@Component({
  selector: 'compass-ui-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IncomeComponent implements OnInit {
  routePath: typeof RoutePath = RoutePath;
  @Output() formState = new EventEmitter<MenuItemState>();

  constructor(
    private store: Store<State>,
    private router: Router,
    private service: ApplyNowStoreService
    ) { }


  ngOnInit(): void {
    this.formState.emit(MenuItemState.INPROGRESS);
    this.service.formStateUpdated(
      this.routePath.APPLYNOW_INCOME,
      MenuItemState.INPROGRESS
    );
   // this.store.dispatch(ApplyNowPageActions.loadApplyNow());
  }
  ngOnDestroy(): void {
    this.formState.emit(MenuItemState.COMPLETED);
  }


  onSubmit() {
    this.router.navigate([
      RoutePath.APPLYNOW +
      "/" +
      RoutePath.APPLYNOW_INCOME +
      "/" +
      RoutePath.APPLYNOW_INCOME_INCOMEGATEPOST
    ]);
  }
  previousRoute(): void {
    // Custom logic here
    this.router.navigate([
      RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_INDIVIDUALDETAILS

    ]);
  }

}
