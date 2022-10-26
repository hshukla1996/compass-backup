import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PageErrorService } from "./page-error.service";

@Component({
    selector: "compass-ui-page-error",
    templateUrl: "./page-error.component.html",
    styleUrls: ["./page-error.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageErrorComponent implements OnInit {
    constructor() {}

    errorMessage!: string

    ngOnInit(): void {
        this.errorMessage = "Cause: " + PageErrorService.errorMessage
    }
}
