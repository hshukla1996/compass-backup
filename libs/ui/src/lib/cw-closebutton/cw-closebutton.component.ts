import { Component, EventEmitter, Input, Output, } from '@angular/core';

@Component({
  selector: 'compass-ui-cw-closebutton',
  templateUrl: './cw-closebutton.component.html',
  styleUrls: ['./cw-closebutton.component.scss']
})
export class CwClosebuttonComponent {
  @Input() public disabled: boolean = false;
  @Output() onClick = new EventEmitter<string>();

  clicked() {
      this.onClick.emit('clicked');
  }

}
