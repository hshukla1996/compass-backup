import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'cw-simpletile-checkbox',
  templateUrl: './cw-simpletile-checkbox.component.html',
  styleUrls: ['./cw-simpletile-checkbox.component.scss']
})

export class CwSimpleTileCheckbox implements OnInit {
  @Input() alertTextRequired = false;
  @Input() isAlertApplicableinToolTip = true;
  @Input() alertText = '';
  @Input() simpleTileCheckboxData: any;
  @Input() selectedItems: any;
  simpleTileCheckboxForm: FormBuilder | any;
  selectedUserids: number[] = [];
  formSubmitAttempt: boolean = false;
  //TODO: Remove when multilingual implementation is done for this control. Currently being used in DIQ for taking translation text
  @Input() hasTranslation = false as boolean;
  @Output() nextPage = new EventEmitter<Array<number>>();
  @Output() previousPage = new EventEmitter<boolean>();
  @Output() addAnotherPerson = new EventEmitter<boolean>();
  @Output() alertTextClicked = new EventEmitter<boolean>();
  addHouseholdMember = "addHouseholdMember"

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    setTimeout(() => {
      this.selectedUserids = this.selectedItems || [];
    }, 10);
    this.simpleTileCheckboxForm = this.fb.group({
      checkbox: this.fb.array([])
    });
  }

  onCheckboxChange(index: number, e: any) {
    const c_index = this.simpleTileCheckboxData['questionAnswers'].findIndex((ans:any)=>ans.id==index);
    if (e.checked) {
      this.selectedUserids = Object.assign([], this.selectedUserids);
      this.selectedUserids.push(index);
    }
    else {
      this.selectedUserids=this.selectedUserids.filter((id)=>id.toString()!==index.toString())
    }
    this.simpleTileCheckboxData['questionAnswers'] = [...this.simpleTileCheckboxData['questionAnswers'].map((item: any, inde: any) => ((inde == c_index) ? { ...item,isChecked:e.checked}:{...item}))];
  }

  addPerson() {
    this.addAnotherPerson.emit();
  }

  back() {
    this.previousPage.emit();
  }

  next() {
    this.formSubmitAttempt = true;
    if (this.simpleTileCheckboxData['isRequired'] && this.selectedUserids.length > 0) {
      this.formSubmitAttempt = false;
      this.nextPage.emit(this.selectedUserids);
    }

    if (!this.simpleTileCheckboxData['isRequired'] && this.selectedUserids.length >=0) {
      this.formSubmitAttempt = false;
      this.nextPage.emit(this.selectedUserids);
    }
  }

  public onAlertTextClick() {
    this.alertTextClicked.emit(true);
  }

  /**
   * This is getting used when page queuing is implemented on a page.
   * Please check who-will-be-tax-claimed.component.ts file for reference;
   */
  public resetSelectedUserId(updatedUserId: number[]): void {
    this.selectedUserids = updatedUserId;
  }

  /**
   * This is getting used when page queuing is implemented on a page.
   * Please check who-will-be-tax-claimed.component.ts file for reference;
   */
  public resetSelectedUserId1(): void {
    this.selectedUserids = [];
  }
}