import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { AppStoreService } from "../../../app-store-service";
import { RoutePath } from "../../../shared/route-strategies";
import { ApplyNowStoreService } from "../../apply-now-store-service";

@Component({
    selector: "compass-ui-upload-signature-summary",
    templateUrl: "./upload-signature-summary.component.html",
    styleUrls: ["./upload-signature-summary.component.scss"],
})
export class UploadSignatureSummaryComponent implements OnInit {
    constructor(private fb: FormBuilder, private router: Router, private service: ApplyNowStoreService, private cd: ChangeDetectorRef, private appService: AppStoreService,) { }

    file = { name: "TODO" };

    ngOnInit() { }

    next() {
        this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_POLITICALPARTY]);   

     }

    back() {
        this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_UPLOADSIGNATURE]); 

     }

    upload() { }

    delete() { }
}
