
import 
{
  Component,
  OnInit,
} from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BasicDetail, BasicDetails, PageAction } from '../+state/do-i-qualify.models';
import { DoIQualifyStoreService } from '../do-i-qualify-store-service';
import { ScreenQueueUtil } from '../../shared/services/screen_queue_util.service';
import { PageActionUtil } from '../../shared/services/page-action-util.service';
import { UtilService } from '../../shared/services/util.service';

@Component({
  selector: 'compass-ui-monthly-income',
  templateUrl: './monthly-income.component.html',
  styleUrls: ['./monthly-income.component.scss']
})
export class MonthlyIncomeComponent implements OnInit 
{

  basicDetails!:BasicDetail[];
  currentUserName!:string;
  currentUserIndex!:number
  monthlyIncomeForm!: FormGroup | any;
  isValidate!:boolean;

  constructor(
    private formBuilder: FormBuilder, 
    private doIQualifyService:DoIQualifyStoreService,
    private queueService: ScreenQueueUtil,
    private pageActionUtil: PageActionUtil,
    private utilService:UtilService
    ) {

    this.monthlyIncomeForm = this.formBuilder.group({
      monthlyIncomeAmount: new FormControl(null, [Validators.required, Validators.pattern('[0-9\.]+'),
        Validators.maxLength(10)])
    });
    
   }

//basicdetails - a,b 
  ngOnInit(): void 
  {   
    this.pageActionUtil.initPageMap("currentIncomeMap", "incomePageDirection", false);
    this.basicDetails=this.doIQualifyService.getBasicDetails();
    this.isValidate = this.monthlyIncomeForm.valid ? true : false;
    if(this.basicDetails.length>0)
    {
      this.initUserDetail();
    }
    this.monthlyIncomeForm.valueChanges.subscribe((d:any) => 
    {
         
      this.isValidate = this.monthlyIncomeForm.valid ? true : false;
    });
   
  }
  updateMonthlyIncome(id:number):void{
  
    const value = this.utilService.getNumericPropertyValue(this.monthlyIncomeForm.value.monthlyIncomeAmount)
    this.basicDetails = this.basicDetails.map((item, inde) => ((inde == id) ? { ...item, incomeFromJobs: value } : {
      ...item, incomeFromJobs: this.utilService.getNumericPropertyValue(item.incomeFromJobs)
}));
  
   
    this.pageActionUtil.changeMapValue(this.currentUserIndex,true);
    this.doIQualifyService.updateBasicDetails({ basicDetails: this.basicDetails } as BasicDetails)
  }

    back()
    {
      const id = this.pageActionUtil.backUserId();
      if (id < 0) {
        if(this.basicDetails.length==1)
        {
          this.queueService.updatePageQueueId(-1);
         
        }
        this.queueService.back();
        return;
      }
      this.currentUserIndex = id;
      this.initUserDetail();
    }
    next(){
      this.monthlyIncomeForm.markAllAsTouched();
      //if (!this.isValidate) return;
      this.updateMonthlyIncome(this.currentUserIndex);
      const id=this.pageActionUtil.nextUserId();
      if(id<0)
      {
        this.queueService.next();
        return;
      }
      this.currentUserIndex=id;
      this.initUserDetail();
    }
    initUserDetail()
    {
      
      this.currentUserIndex = this.pageActionUtil.userIndex??0;
      this.currentUserName = this.basicDetails[this.currentUserIndex].firstName || "";
      const income = this.basicDetails[this.currentUserIndex].incomeFromJobs;
      let value = this.utilService.getNumericPropertyValue(income);
      value=(value>0)?value:null;
      this.monthlyIncomeForm.patchValue({ monthlyIncomeAmount:  value })
    }
    
    isFieldValid(){
      return this.doIQualifyService.isFieldValid(this.monthlyIncomeForm,'monthlyIncomeAmount')
    }

}

