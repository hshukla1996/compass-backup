import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RoutePath } from "../../shared/route-strategies";

@Component({
    selector: "compass-ui-upload-confirmation",
    templateUrl: "./upload-confirmation.component.html",
    styleUrls: ["./upload-confirmation.component.scss"],
})
export class UploadConfirmationComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit(): void {}

    upload() {
        this.router.navigate([RoutePath.UPLOAD_GATEPOST]);
    }
}
