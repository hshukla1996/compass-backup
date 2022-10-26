import { Component, Inject, OnInit } from "@angular/core";
import { DOCUMENT } from '@angular/common';

@Component({
    selector: "compass-ui-cmphometemp",
    templateUrl: "./cmphometemp.component.html",
    styleUrls: ["./cmphometemp.component.scss"],
})
export class CmphometempComponent implements OnInit {
    constructor(@Inject(DOCUMENT) private document: Document,) {}

    ngOnInit(): void {}
    getApp(app: string) {
        this.document.location.href = app;
    }
}
