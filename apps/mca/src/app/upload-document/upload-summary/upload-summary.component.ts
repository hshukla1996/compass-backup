import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RoutePath } from "../../shared/route-strategies";

@Component({
    selector: "compass-ui-upload-summary",
    templateUrl: "./upload-summary.component.html",
    styleUrls: ["./upload-summary.component.scss"],
})
export class UploadSummaryComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit(): void {}

    addAnotherDoc() {
        this.router.navigate([RoutePath.UPLOAD_DOCUMENT]);
    }

    upload() {
        this.router.navigate([RoutePath.UPLOAD_CONFIRMATION]);
    }

    onBack(){
        this.router.navigate([RoutePath.UPLOAD_DOCUMENT]);
    }
}
