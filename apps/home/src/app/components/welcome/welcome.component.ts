import { Component, OnInit } from "@angular/core";

@Component({
    selector: "compass-ui-welcome",
    templateUrl: "./welcome.component.html",
    styleUrls: ["./welcome.component.scss"],
})
export class WelcomeComponent implements OnInit {

    // applynowPath = RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_GETTINGSTARTED;
    // getstarted = RoutePath.GETSTARTED;

    constructor() { }

    ngOnInit(): void { }
}
