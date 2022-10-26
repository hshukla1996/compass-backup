import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItemState } from '../../../shared/menu-item-state';
import { RoutePath } from "../../../shared/route-strategies";
import { Router } from "@angular/router";
@Component({
    selector: "compass-ui-family-safety",
    templateUrl: "./family-safety.component.html",
    styleUrls: ["./family-safety.component.scss"],
})
export class FamilySafetyComponent implements OnInit {
    constructor(private route: Router) {}

    @Output() formState = new EventEmitter<MenuItemState>();

    ngOnInit(): void {
        this.formState.emit(MenuItemState.INPROGRESS);
    }
    ngOnDestroy(): void {
        //  this.formState.emit(MenuItemState.COMPLETED);
    }
    nextRoute(): void {
        // Custom logic here

        this.route.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_GETTINGSTARTED_GETTINGSTARTEDENDING
        ]);
    }

    previousRoute(): void {
        // Custom logic here
        this.route.navigate([
            RoutePath.APPLYNOW +
                "/" +
            RoutePath.APPLYNOW_GETTINGSTARTED_EXISTINGACCOUNT,
        ]);
    }
}
