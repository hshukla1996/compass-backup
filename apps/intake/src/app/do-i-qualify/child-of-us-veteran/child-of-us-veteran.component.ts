import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { BasicDetail, BasicDetails } from '../+state/do-i-qualify.models';
import { ScreenQueueUtil } from '../../shared/services/screen_queue_util.service';
import { DoIQualifyStoreService } from '../do-i-qualify-store-service';

@Component({
  selector: 'compass-ui-child-of-us-veteran',
  templateUrl: './child-of-us-veteran.component.html',
  styleUrls: ['./child-of-us-veteran.component.scss']
})
export class ChildOfUsVeteranComponent implements OnInit {

  basicDetails!: BasicDetail[];
  veteranForm!:FormGroup
  constructor(private formBuilder: FormBuilder, private storeService: DoIQualifyStoreService,
    private queueService: ScreenQueueUtil) {
    this.veteranForm = this.formBuilder.group({
      veteran: this.formBuilder.array([], [Validators.required])
    });
  }
 
   
 
  get veteranOptions(): FormArray {
    return <FormArray>this.veteranForm.controls['veteran'];
  }
  ngOnInit(): void {
    this.basicDetails = this.storeService.getBasicDetails();
    this.setupCheckboxFromState(this.basicDetails)
  }


  onCheckboxChange(index: number, e: any): void {

    if (e.checked) {
      this.veteranOptions.push(new FormControl(index));

    }
    else {

      let id = this.getIndex(index)
      if (id > -1) {
        this.veteranOptions.removeAt(id);

      }

    }
    this.basicDetails = this.basicDetails.map((item, inde) => ((inde == index) ? { ...item, isRelatedToVeteran: e.checked } : { ...item }));
    this.storeService.updateBasicDetails({ basicDetails: this.basicDetails } as BasicDetails);

  }
  private setupCheckboxFromState(data: BasicDetail[]) {

    const checkedList = data ?? [];
    let index = 0;
    checkedList.forEach((detail: any) => {


      if (detail.isRelatedToVeteran) 
      {
        this.veteranOptions.push(new FormControl(index));
      }
     

      index++;

    });
  }
  back() {
    this.queueService.back();
  }
  next() {
    this.veteranForm.markAllAsTouched();
    if(!this.veteranForm.valid)return
    this.queueService.next();
  }
  getIndex(value: number): number {
    return this.veteranOptions.controls.findIndex((val: any) => val.value == value);
  }
  isFieldValid(): boolean {
    return this.storeService.isFieldValid(this.veteranForm, 'veteran')
  }
}
