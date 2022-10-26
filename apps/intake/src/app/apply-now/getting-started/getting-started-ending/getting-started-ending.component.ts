import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MenuItemState } from '../../../shared/menu-item-state';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { gettingStartedURL } from '../../../shared/constants/Constants';
import { GettingStartedService } from '../../../shared/services/getting-started.service';
@Component({
    selector: "compass-ui-getting-started-ending",
    templateUrl: "./getting-started-ending.component.html",
    styleUrls: ["./getting-started-ending.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GettingStartedEndingComponent implements OnInit {
    @Output() formState = new EventEmitter<MenuItemState>();
    routePath: typeof RoutePath = RoutePath;
    gettingstarted: any;
    isLoading = true;
    loadingText = "Loading..."
    visitCount: any;

    constructor(private service: ApplyNowStoreService, private route: Router,  private cd: ChangeDetectorRef, private gettingStartedService: GettingStartedService) {}
    ngOnInit() {
        this.service.formStateUpdated(
            this.routePath.APPLYNOW_GETTINGSTARTED,
            MenuItemState.COMPLETED
        );
        if (sessionStorage.getItem('visitCount')== null) {
            this.visitCount = 1;
            sessionStorage.setItem("visitCount", this.visitCount);
        }
        this.gettingStartedService.getAFSGettingStarted().subscribe((data: any) => {
            this.gettingstarted = data;
            this.isLoading = false;
            ApplyNowStoreService.triggerNext.next(data.id)
            this.cd.detectChanges();
        })
        // this.service.updatedGettingStarted(this.gettingstarted);


    }

    saveAndExit(): void {
        this.route.navigate(["/"])
    }

    ngOnDestroy(): void {
        // this.formState.emit(MenuItemState.COMPLETED);
       
    }

    nextRoute(): void {
        // Custom logic here
        const gettingStartedEnding = this.gettingstarted;
        this.service.updatedGettingStarted(gettingStartedEnding);
        console.log(gettingStartedEnding)
        this.route.navigate([
            RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_HOUSEHOLD,
        ]);
    }

    previousRoute(): void {
        // Custom logic here
        this.route.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_GETTINGSTARTED_FAMILYSAFETY,
        ]);
    }
}

function gettingStarted(gettingStarted: any) {
    throw new Error('Function not implemented.');
}
