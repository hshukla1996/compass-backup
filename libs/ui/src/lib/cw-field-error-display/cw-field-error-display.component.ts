import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'cw-field-error-display',
    templateUrl: './cw-field-error-display.component.html',
    styleUrls: ['./cw-field-error-display.component.css']
})
export class CwFieldErrorDisplayComponent {
    @Input() errorMsg: string | undefined;
    @Input() displayError: boolean | undefined;
}