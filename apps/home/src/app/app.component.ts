import { Component, Inject } from "@angular/core";
import { DOCUMENT } from '@angular/common';

@Component({
    selector: "compass-ui-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    title = "Compass Refresh Home";

    constructor(@Inject(DOCUMENT) private document: Document) { }
}





