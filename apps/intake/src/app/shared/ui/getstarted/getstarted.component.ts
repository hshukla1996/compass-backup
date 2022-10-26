import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RoutePath } from "../../route-strategies";

@Component({
    selector: "compass-ui-getstarted",
    templateUrl: "./getstarted.component.html",
    styleUrls: ["./getstarted.component.scss"],
})
export class GetstartedComponent implements OnInit {
    constructor(private route: Router,) { }

    ngOnInit(): void { }

    applyNow() {
        this.route.navigate([
            RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_GETTINGSTARTED
        ]);
    }
    doIQualify() {
        this.route.navigate([
            RoutePath.DOIQUALIFY
        ]);
    }
}
