
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { BasicDetail, BasicDetails, PageAction } from '../+state/do-i-qualify.models';
import { PageActionUtil } from '../../shared/services/page-action-util.service';
import { ScreenQueueUtil } from '../../shared/services/screen_queue_util.service';
import { UtilService } from '../../shared/services/util.service';
import { DoIQualifyStoreService } from '../do-i-qualify-store-service';




@Component({
  selector: 'compass-ui-other-income',
  templateUrl: './other-income.component.html',
  styleUrls: ['./other-income.component.scss'],

})
export class OtherIncomeComponent implements OnInit {

  @Input() data!: BasicDetails | null;
  @Output() dataUpdated = new EventEmitter<BasicDetails>();
  basicDetails!: BasicDetail[];
  currentId = new BehaviorSubject<number>(0);
  currentUserName!: string;
  userName$ = new BehaviorSubject<string>(this.currentUserName);
  currentUserIndex!: number;
  monthlyOtherIncomeForm!: FormGroup | any
  isValidate!: boolean;
  currentOtherIncomeMap!: any
  pageAction!: PageAction;
  showTooltip=true;
  constructor(private formBuilder: FormBuilder, private router: Router, private doIQualifyService: DoIQualifyStoreService,
    private queueService: ScreenQueueUtil,
    private utilService: UtilService, private pageActionUtil: PageActionUtil) {
    this.monthlyOtherIncomeForm = this.formBuilder.group({
      monthlyOtherIncomeAmount: new FormControl(null, [Validators.pattern('[0-9\.]+'),
        Validators.maxLength(10)])
    });

  }
  getUserId() {
    return this.currentId.asObservable();
  }
  getUserName() {
    return this.userName$.asObservable();
  }
 
  ngOnInit(): void {

    this.basicDetails = this.doIQualifyService.getBasicDetails();
    this.pageActionUtil.initPageMap("currentOtherIncomeMap", "otherIncomePageDirection", false);
    if (this.basicDetails.length > 0) {
      this.initUserDetail();
    }
    this.monthlyOtherIncomeForm.valueChanges.subscribe((d:any) => {
     // this.updateMonthlyIncome(this.currentUserIndex);
      this.isValidate = this.isValidated();
    });
    this.isValidate = this.isValidated();
  }
  updateMonthlyIncome(id: number): void {
    
    const value = this.utilService.getNumericPropertyValue(this.monthlyOtherIncomeForm.value.monthlyOtherIncomeAmount)
    this.basicDetails = this.basicDetails.map((item, inde) => ((inde == id) ? { ...item, incomeFromOtherJobs: value } : { ...item, incomeFromOtherJobs: this.utilService.getNumericPropertyValue(item.incomeFromOtherJobs) }));
    this.pageActionUtil.changeMapValue(this.currentUserIndex, true);
    this.doIQualifyService.updateBasicDetails({ basicDetails: this.basicDetails } as BasicDetails)
    
  }

  back() 
  {
   

    const id = this.pageActionUtil.backUserId();
    if (id < 0) {
      this.queueService.back();
      return;
    }
    this.currentUserIndex = id;
    this.initUserDetail();
    
  }
  next() 
  {
  
    this.monthlyOtherIncomeForm.markAllAsTouched();
    this.updateMonthlyIncome(this.currentUserIndex);
    const id = this.pageActionUtil.nextUserId();
    if (id < 0) {
      this.queueService.next();
      return;
    }
    this.currentUserIndex = id;
    this.initUserDetail();


  }
  initUserDetail() {

    this.currentUserIndex = this.pageActionUtil.userIndex ?? 0;
    this.currentUserName = this.basicDetails[this.currentUserIndex].firstName || "";
    const income = this.basicDetails[this.currentUserIndex].incomeFromOtherJobs;
    let value = this.utilService.getNumericPropertyValue(income);
    value=(value>0)?value:null;

      this.monthlyOtherIncomeForm.patchValue({ monthlyOtherIncomeAmount: value })
    this.showTooltip=false;
  }
  isValidated(){
  return this.monthlyOtherIncomeForm.valid ? true : false;
  }
 
  isFieldValid() {
    return this.doIQualifyService.isFieldValid(this.monthlyOtherIncomeForm, 'monthlyOtherIncomeAmount')
  }
  showAccordianTooltip(){
    this.showTooltip = !this.showTooltip;
  }



}

