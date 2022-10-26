import { Component, OnInit } from "@angular/core";
import { PageQueueService } from "apps/intake/src/app/shared/services/page-queue.service";

@Component({
    selector: "compass-ui-employer-insurance-information",
    templateUrl: "./employer-insurance-information.component.html",
    styleUrls: ["./employer-insurance-information.component.scss"],
})
export class EmployerInsuranceInformationComponent implements OnInit {
    constructor(private pq:PageQueueService) {}

    ngOnInit(): void {}
}
