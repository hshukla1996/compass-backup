import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { BasicDetail, BasicDetails } from '../+state/do-i-qualify.models';


@Component({
  selector: 'compass-ui-monthly-income-next',
  templateUrl: './monthly-income-next.component.html',
  styleUrls: ['./monthly-income-next.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthlyIncomeNextComponent implements OnInit {

  @Input() data!: BasicDetails | null;
  @Output() dataUpdated = new EventEmitter<BasicDetails>();
  basicDetails!:BasicDetail[];
  currentId!:number;
  currentUserName!:string;
  monthlyIncomeForm!:FormGroup;
  isValidate!:boolean
  constructor(private formBuilder:FormBuilder) {
    this.monthlyIncomeForm = this.formBuilder.group({
      monthlyIncomeAmount: new FormControl(0,[Validators.required])
    });
   }
//basicdetails - a,b 
  ngOnInit(): void 
  {
   
  
   
    
  }
  updateMonthlyIncome(id:number):void{
  
    const index=this.basicDetails.findIndex((basciDetail)=>basciDetail.id==id);
    if(index<0)return;
    this.basicDetails=[
      ...this.basicDetails.slice(0, index),
      {
        ...this.basicDetails[index],
        incomeFromJobs:this.monthlyIncomeForm.value.monthlyIncomeAmount,
        
      },
      ...this.basicDetails.slice(index + 1)
    ]
    
   this.emitData(id)
  }
  emitData(id:number){
   
   // this.dataUpdated.emit({basicDetails:this.basicDetails,currentMonthlyJobId:id} as BasicDetails );  
    }
    
  

}

