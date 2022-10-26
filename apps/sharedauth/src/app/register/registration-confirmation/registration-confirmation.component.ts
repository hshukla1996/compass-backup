import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
    selector: "compass-ui-registration-confirmation",
    templateUrl: "./registration-confirmation.component.html",
    styleUrls: ["./registration-confirmation.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationConfirmationComponent implements OnInit {
    constructor() {}
    data: any
    isAfs!: boolean

    ngOnInit(): void {
        this.isAfs = true // TODOAM2 Get if user is registering from AFS

        this.data = {
            title: "sa_registerCStitle",
            text1: "sa_registerCStext1",
            text2: (this.isAfs) ? "sa_registerCStext2Afs": "sa_registerCStext2Nonafs",
            backButtonLabel: (this.isAfs) ? "": "sa_backtohome",
            nextButtonLabel: (this.isAfs) ? "sa_registerCSnextAfs": "sa_registerCSnextNonafs",
            navLinkText: (this.isAfs) ? "sa_registerCSnavLinkAfs": "",
            navLink: (this.isAfs) ? this.saveAndExit : null
        }
    }

    login() {
        // TODOAM login the user
    }

    backHome(): void {
        // TODOAM go back to compass home
    }

    saveAndExit(): void {
        // TODOAM2 save and exit afs application
    }
}
