import { Component, OnInit } from "@angular/core";

@Component({
    selector: "compass-ui-authcode",
    templateUrl: "./authcode.component.html",
    styleUrls: ["./authcode.component.scss"],
})
export class AuthcodeComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {
        console.log("authcode Test");
    }
}
