import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: "compass-ui-cw-simpletile-confirmation",
    templateUrl: "./cw-simpletile-confirmation.component.html",
    styleUrls: ["./cw-simpletile-confirmation.component.scss"],
})
export class CwSimpletileConfirmationComponent implements OnInit {
    @Input() confirmationData: any
    @Output() next = new EventEmitter<boolean>();
    @Output() back = new EventEmitter<boolean>();

    constructor() {}

    ngOnInit(): void {}

    nextPage() {
        this.next.emit(true);
    }

    previousPage() {
        this.back.emit(true);
    }
}
