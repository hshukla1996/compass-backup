import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'compass-ui-simpletitle-radios',
  templateUrl: './cw-simpletitle-radios.component.html',
  styleUrls: ['./cw-simpletitle-radios.component.scss']
})

export class CwSimpleTitleRadios implements OnInit {
  @Input() simpleTileRadiosData: any;
  simpleTileRadioForm: FormBuilder | any;
  selectedRadio: number = 0;
  formSubmitAttempt: boolean = false;
  @Output() nextPage = new EventEmitter<any>();
  @Output() previousPage = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.simpleTileRadioForm = this.fb.group({
      radios: this.fb.array([])
    });
  }

  GetValue({value}:any) {

    this.selectedRadio = value;
  }

  back() {
    this.previousPage.emit();
  }

  next() {
    this.formSubmitAttempt = true;
    if (this.simpleTileRadiosData['isRequired'] && this.selectedRadio) {
      this.nextPage.emit(this.selectedRadio);
    }
    if (!this.simpleTileRadiosData['isRequired']) {
      this.nextPage.emit(this.selectedRadio);
    }
  }
}
