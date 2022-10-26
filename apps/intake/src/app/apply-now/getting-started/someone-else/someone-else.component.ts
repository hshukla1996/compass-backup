import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { MenuItemState } from "../../../shared/menu-item-state";
import { Router } from "@angular/router";
import { RoutePath } from "../../../shared/route-strategies";
import {
    FormGroup,
    FormControl,
    ReactiveFormsModule,
    FormBuilder,
    Validators,
    AbstractControl,
} from "@angular/forms";

@Component({
    selector: "compass-ui-someone-else",
    templateUrl: "./someone-else.component.html",
    styleUrls: ["./someone-else.component.scss"],
})
export class SomeoneElseComponent implements OnInit {
    constructor(private route: Router) {}

    ngOnInit(): void {}

    previous(): void {
        this.route.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_GETTINGSTARTED_GATEPOST,
        ]);
    }
    submit(): void {
        this.route.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_GETTINGSTARTED_EXISTINGACCOUNT,
        ]);
    }
}
