import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { ApplyNowPageActions } from '../+state/actions';
import { MenuItemState } from '../../shared/menu-item-state';
import { RoutePath } from '../../shared/route-strategies';
import { UtilService } from '../../shared/services/util.service';
import { Store } from '@ngrx/store';
import { State } from '../../+state/app.state';
import { ApplyNowHouseholdStrategy } from '../../shared/route-strategies/apply-now/household';
import { ApplyNowStoreService } from '../apply-now-store-service';

@Component({
    selector: "compass-ui-household",
    templateUrl: "./household.component.html",
    styleUrls: ["./household.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ApplyNowHouseholdStrategy],
})
export class HouseholdComponent implements OnInit, OnDestroy {
    routePath: typeof RoutePath = RoutePath;
    route: string | undefined = RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDHEAD;
    subscription = new Subscription();

    @Output() formState = new EventEmitter<MenuItemState>();

    constructor(
        private store: Store<State>,
        private router: Router,
        private utilService: UtilService,
        private routingStratagy: ApplyNowHouseholdStrategy,
        private service: ApplyNowStoreService
    ) {}

    ngOnDestroy() {
        //  this.formState.emit(MenuItemState.COMPLETED);
    }

    ngOnInit() {
        this.formState.emit(MenuItemState.INPROGRESS);
        this.service.formStateUpdated(
            this.routePath.APPLYNOW_HOUSEHOLD,
            MenuItemState.INPROGRESS
         );
        // this.store.dispatch(ApplyNowPageActions.loadApplyNow());

        this.subscription.add(
            this.router.events
                .pipe(filter((event) => event instanceof NavigationEnd))
                .subscribe(
                    (e: any) =>
                        (this.route = this.utilService.getRouteName(e.url))
                )
        );
    }

    onSubmit() {
        this.router.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_HOUSEHOLD +
                "/" +
                RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDHEAD
        ]);
    }
    previousRoute(): void {
        // Custom logic here
        this.router.navigate([
            RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_GETTINGSTARTED_GETTINGSTARTEDENDING

        ]);
    }
}