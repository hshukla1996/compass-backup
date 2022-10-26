import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MenuItemState } from '../../shared/menu-item-state';
import { RoutePath } from '../../shared/route-strategies';
import {Router} from '@angular/router';
import { ApplyNowStoreService } from '../apply-now-store-service';
@Component({
    selector: "compass-ui-getting-started",
    templateUrl: "./getting-started.component.html",
    styleUrls: ["./getting-started.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GettingStartedComponent implements OnInit {
    [x: string]: any;
    @Output() formState = new EventEmitter<MenuItemState>();
    routePath: typeof RoutePath = RoutePath;

    constructor(private service: ApplyNowStoreService, private route: Router) {}

    ngOnInit(): void {
        this.formState.emit(MenuItemState.INPROGRESS);
        this.service.formStateUpdated(
            this.routePath.APPLYNOW_GETTINGSTARTED,
            MenuItemState.INPROGRESS
        );
    }

    ngOnDestroy(): void {}
    next(): void {
        this.route.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_GETTINGSTARTED_IMPORTANTINFORMATION,
        ]);
    }
    back() {
        this.route.navigate([RoutePath.HOME]);
    }
}

