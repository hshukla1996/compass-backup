import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'cw-commoncomponent',
  templateUrl: './cw-commoncomponent.component.html',
  styleUrls: ['./cw-commoncomponent.component.scss']
})
export class CwCommonComponent implements OnInit {

  constructor(private fb: FormBuilder) {}

  commomComponentForm = this.fb.group({
    booleanradio1: [''],
    booleanradio2: [''],
    inputtext: [''],
    checkbox: false,
    datepicker: [''],
    dropdown: ['']
  })

  @Input() commomComponentData: any;
  @Output() showCard = new EventEmitter<boolean>();

  ngOnInit() {}

  public showSubQuestion() {
    this.showCard.emit(true);
  }

  public hideSubQuestion() {
    this.showCard.emit(false);
  }

  onSubmit() {
      // this.router.navigate([this.routingStratagy.nextRoute()]);
  }

}
