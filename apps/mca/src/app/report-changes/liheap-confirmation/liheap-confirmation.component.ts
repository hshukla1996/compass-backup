import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RoutePath } from "../../shared/route-strategies";

@Component({
    selector: "compass-ui-liheap-confirmation",
    templateUrl: "./liheap-confirmation.component.html",
    styleUrls: ["./liheap-confirmation.component.scss"],
})
export class LiheapConfirmationComponent implements OnInit {

    constructor(private router: Router) {}

    ngOnInit(): void {}

    newApplication() {
        this.router.navigate([RoutePath.LIHEAP_CASH_INFORMATION]);
    }

    onBack() {

    }
}
