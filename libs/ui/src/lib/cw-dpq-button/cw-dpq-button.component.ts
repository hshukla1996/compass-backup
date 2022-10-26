import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'compass-ui-cw-dpq-button',
  templateUrl: './cw-dpq-button.component.html',
  styleUrls: ['./cw-dpq-button.component.scss']
})
//Buttons for Dynamic Page Queue
export class CwDpqButtonComponent implements OnInit {
  @Input() public nextButtonStyle: string = 'btn btn-primary';
  @Input() public backButtonStyle: string = 'btn btn-outline-tertiary';
  @Input() public backButtonId: string = 'backButtonID';
  @Input() public nextButtonId: string = 'nextButtonID';
  @Input() public backButtonType: string = 'button';
  @Input() public nextButtonType: string = 'button';
  @Input() public nextButtonLabel: string = '';
  @Input() public backButtonLabel: string = '';
  @Input() public disabledBackButton: boolean = false;
  @Input() public disabledNextButton: boolean = false;
  @Output() next = new EventEmitter<{}>();
  @Output() back = new EventEmitter<{}>();
  constructor() { }

  ngOnInit(): void {
  }
  nextClicked(e:any){
    this.next.emit();
  }
  backClicked(e:any){
    this.back.emit();
  }

}
