import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'cw-modal',
  templateUrl: './cw-modal.component.html',
  styleUrls: ['./cw-modal.component.scss']
})

export class CwModal implements OnInit {
    @Input() modalData: any;
    @Output() continue = new EventEmitter<boolean>();

    ngOnInit(): void {
        
    }

    continueClicked() {
        this.continue.emit(true);
    }
}