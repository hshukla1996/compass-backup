import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "compass-ui-change-confirmation",
    templateUrl: "./change-confirmation.component.html",
    styleUrls: ["./change-confirmation.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeConfirmationComponent implements OnInit {
    constructor(
        private router: Router
    ) {}

    data!: any

    ngOnInit(): void {
        this.data = {
            title: "sa_greatJob",
            text1: "sa_forgotpassCStext1",
            text2: "sa_forgotpassCStext2",
            backButtonLabel: "sa_backtohome",
            nextButtonLabel: "sa_forgotpassCSnext",
        }
    }

    login() {
        // TODOAM7 login the user
    }

    backHome(): void {
        // TODOAM7 go back to compass home
    }
}
