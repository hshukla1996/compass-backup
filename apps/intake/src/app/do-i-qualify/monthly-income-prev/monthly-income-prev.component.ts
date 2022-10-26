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
  selector: 'compass-ui-monthly-income-prev',
  templateUrl: './monthly-income-prev.component.html',
  styleUrls: ['./monthly-income-prev.component.scss']
})
export class MonthlyIncomePrevComponent implements OnInit {

  @Input() data!: BasicDetails | null;
  @Output() dataUpdated = new EventEmitter<BasicDetails>();
  basicDetails!:BasicDetail[];
  currentStepId!:number;
  currentUserName!:string;
  monthlyIncomeForm!:FormGroup;
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
    this.emitData(id,false);

    //this.dataUpdated.emit({basicDetails:this.basicDetails,monthlyIncomeStepId:id} as BasicDetails );  
  }
  emitData(id:number,isOnInit:boolean){
    // let curr=this.data?.steps??null;
    // if(curr!=null){
    // let isIncluded=curr.visitedSteps.filter(val=>val==id).length>0;
    // let arr_=(isIncluded)?({...curr.visitedSteps.filter(val=>val!=id)}):([...curr.visitedSteps,id]);
    // this.dataUpdated.emit({basicDetails:this.basicDetails,steps:{currentId:id,visitedSteps:{...curr.visitedSteps,id}}} as BasicDetails );  
  }

ngDestroy()
{


}

}
