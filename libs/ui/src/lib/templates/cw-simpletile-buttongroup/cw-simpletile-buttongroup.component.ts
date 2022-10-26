import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'cw-simpletile-buttongroup',
  templateUrl: './cw-simpletile-buttongroup.component.html',
  styleUrls: ['./cw-simpletile-buttongroup.component.scss']
})

export class CwSimpleTileButtongroup implements OnInit {
    @Input() simpleTileButtongroupData: any;
    @Input() booleanShow: any;
    simpleTileButtongroupForm: FormBuilder | any; 
    @Output() booleanRadio = new EventEmitter<string>();
    @Output() showCard = new EventEmitter<boolean>();
    @Output() nextPage = new EventEmitter<boolean>();
    @Output() previousPage = new EventEmitter<boolean>();
    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.simpleTileButtongroupForm = this.fb.group({
            buttongroup: [""]
        });
        setTimeout(() => {
            let yesRadioLabel = document.getElementsByClassName("form-check-label")[0];
            if (this.simpleTileButtongroupData['legend'] === '') {
                yesRadioLabel.classList.add("mt-3");
            }
        }, 500);
    }

    showSubQuestion(radio: string) {
        this.booleanShow = false;
        this.booleanRadio.emit(radio);
        this.showCard.emit(true);
    }

    hideSubQuestion(radio: string) {
        this.booleanShow = false;   
        this.booleanRadio.emit(radio);
        this.showCard.emit(false);
    }

    next(): void {
        this.nextPage.emit(true);
    }

    back(): void {
        this.previousPage.emit(true);
    }
}