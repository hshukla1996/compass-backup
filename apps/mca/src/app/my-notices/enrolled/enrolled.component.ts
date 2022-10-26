import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { MyNotices } from "../../+state/models/my-notices/my-notices.model";
import { GetEnrollmentServices } from "../../shared/services/my-notices/my-notices-get-enrollment.service";

@Component({
    selector: "compass-ui-enrolled",
    templateUrl: "./enrolled.component.html",
    styleUrls: ["./enrolled.component.scss"],
})
export class EnrolledComponent implements OnInit {
    @Output() onEnroll = new EventEmitter();

    enrolled: any;
    //enrolledSection = false;

    constructor(
        private getEnrollmentServices: GetEnrollmentServices
    ) {}

    ngOnInit() {}
    goToUnenroll(data: any) {
        this.onEnroll.emit(data);
    }
}
