import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'compass-ui-cw-dropdown',
  templateUrl: './cw-dropdown.component.html',
  styleUrls: ['./cw-dropdown.component.scss']
})
export class CwDropdownComponent {
  @Input() selectStyle: string = '';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() bindLabel: string = '';
  @Input() dropdownlabel: string = '';
  @Input() dropdownData: any;
  @Input() selectedItem: any = "";
  @Input() required: boolean = false;
  @Output() onSelect = new EventEmitter<{}>();

  detectChangedSelection(event: any) {
    this.onSelect.emit(event.value);
  }
}
