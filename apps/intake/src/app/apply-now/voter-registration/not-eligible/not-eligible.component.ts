import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "compass-ui-not-eligible",
    templateUrl: "./not-eligible.component.html",
    styleUrls: ["./not-eligible.component.scss"],
})
export class NotEligibleComponent implements OnInit {
    constructor(private router: Router,) { }

    ngOnInit() { }

    back() {
        this.router.navigate(['/']);

     }
}
