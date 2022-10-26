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
            text1: "sa_changepassCStext1",
            text2: "sa_changepassCStext2",
            backButtonLabel: "sa_backtohome",
            nextButtonLabel: "sa_changepassCSnext",
        }
    }

    login() {
        // TODOAM6 login the user
    }

    backHome(): void {
        // TODOAM6 go back to compass home
    }
}
