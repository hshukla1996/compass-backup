import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItemState } from '../../shared/menu-item-state';
import { RoutePath } from '../../shared/route-strategies';
import { ReferrralsGettingStartedStrategy } from '../../shared/route-strategies/referrals/getting-started';
import { ReferralStoreService } from '../referrals-store-service';

@Component({
  selector: 'compass-ui-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.scss'],
  providers: [ReferrralsGettingStartedStrategy],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GettingStartedComponent implements OnInit {
  @Output() formState = new EventEmitter<MenuItemState>();
  routePath: typeof RoutePath = RoutePath;

  constructor(
    private service: ReferralStoreService,
    private router: Router,
    private routingStratagy: ReferrralsGettingStartedStrategy,
    ) { }

  ngOnInit(): void {

    this.formState.emit(MenuItemState.INPROGRESS);
    this.service.formStateUpdated(this.routePath.REFERRALS_GETTINGSTARTED, MenuItemState.INPROGRESS)
  }

  ngOnDestroy(): void {
    this.formState.emit(MenuItemState.COMPLETED);
     this.service.formStateUpdated(this.routePath.REFERRALS_GETTINGSTARTED, MenuItemState.COMPLETED);

   }

  next() {
    this.router.navigate([this.routingStratagy.nextRoute()]);
  }

  previous() { 
    this.service.clearStore()

    this.router.navigate(['/']);
  }

}
