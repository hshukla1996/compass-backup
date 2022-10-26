import { Component, EventEmitter, Input, Output, } from '@angular/core';

@Component({
  selector: 'compass-ui-cw-button',
  templateUrl: './cw-button.component.html',
  styleUrls: ['./cw-button.component.scss']
})
export class CwButtonComponent {
  @Input() public textStyle: string = '';
  @Input() public buttonId: string = '';
  @Input() public buttonType: string = '';
  @Input() public buttonLabel: string = '';
  @Input() public disabled: boolean = false;
  @Output() onClick = new EventEmitter<string>();

  clicked() {
    this.onClick.emit(this.buttonLabel);
  }
}
