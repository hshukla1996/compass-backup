import { Component, Input, OnInit } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
    selector: "cw-login-modal",
    templateUrl: "./cw-login-modal.component.html",
    styleUrls: ["./cw-login-modal.component.scss"],
})
export class CwLoginModalComponent implements OnInit {
    name = 'Set iframe source';
    @Input() url: string = "/sharedauth/";

    urlSafe!: SafeResourceUrl;

    constructor(public sanitizer: DomSanitizer) { }

    ngOnInit() {
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    }
}


