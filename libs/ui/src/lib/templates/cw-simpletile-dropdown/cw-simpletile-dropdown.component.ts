import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'cw-simpletile-dropdown',
  templateUrl: './cw-simpletile-dropdown.component.html',
  styleUrls: ['./cw-simpletile-dropdown.component.scss']
})

export class CwSimpleTileDropdown implements OnInit {
    @Input() simpleTileDropdownData: any;
    simpleTileDropdownForm: FormBuilder | any;

    @Output() nextPage = new EventEmitter<Array<number>>();
    @Output() previousPage = new EventEmitter<boolean>();

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.simpleTileDropdownForm = this.fb.group({
            dropdown: ""
        })
    }

    dropdownNext() {
        this.nextPage.emit(this.simpleTileDropdownForm.get('dropdown').value);
    }

    dropdownBack() {
        this.previousPage.emit();
    }
}