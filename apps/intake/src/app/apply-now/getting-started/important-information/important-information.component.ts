import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItemState } from '../../../shared/menu-item-state';
import { Router } from "@angular/router";
import { RoutePath } from "../../../shared/route-strategies";
@Component({
    selector: "compass-ui-important-information",
    templateUrl: "./important-information.component.html",
    styleUrls: ["./important-information.component.scss"],
})
export class ImportantInformationComponent implements OnInit {
    constructor(private route: Router) {}

    @Output() formState = new EventEmitter<MenuItemState>();

    ngOnInit(): void {
        this.formState.emit(MenuItemState.INPROGRESS);
    }
    ngOnDestroy(): void {
        //  this.formState.emit(MenuItemState.COMPLETED);
    }

    previous(): void {
        this.route.navigate([
            RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_GETTINGSTARTED
        ]);
    }

    next(): void {
      this.route.navigate([
          RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_GETTINGSTARTED_GATEPOST
      ]);
    }
}
