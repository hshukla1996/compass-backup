import { ThisReceiver } from '@angular/compiler';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,

} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BasicDetail, BasicDetails, PageAction } from '../+state/do-i-qualify.models';
import { PageActionDirection, PageActionUtil } from '../../shared/services/page-action-util.service';
import { ScreenQueueUtil } from '../../shared/services/screen_queue_util.service';
import { Utility } from '../../shared/utilities/Utility';
import { DoIQualifyStoreService } from '../do-i-qualify-store-service';
import { WHOSCREENDATA } from '../who-screen-data';

@Component({
  selector: 'compass-ui-one-more-jobs',
  templateUrl: './one-more-jobs.component.html',
  styleUrls: ['./one-more-jobs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OneMoreJobsComponent implements OnInit {


  basicDetails!: BasicDetail[];
  isValidated!: boolean;
  incomemap!: any
  oneOrMoreJobForm!: FormGroup | any;
  selectedId = [] as any;
  pageAction!: PageAction
  public oneorMoreData = { ...WHOSCREENDATA }
  constructor(private formBuilder: FormBuilder, private service: DoIQualifyStoreService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private queueService: ScreenQueueUtil,
    private pageActionUtil: PageActionUtil) {
    this.oneOrMoreJobForm = this.formBuilder.group({
      job: this.formBuilder.array([], [Validators.required])
    });
  }



  ngOnInit(): void {
    this.basicDetails = this.service.getBasicDetails();
    // this.incomemap = {};
    this.pageActionUtil.initPageMap("currentIncomeMap", "incomePageDirection", false);
    if (this.basicDetails.length == 1) {
      this.checkedDefault(this.basicDetails);
      this.queueService.next();
      return;
    }
    this.setupCheckboxFromState(this.basicDetails)


  }
  private checkedDefault(data: BasicDetail[]) {

    this.basicDetails = this.basicDetails.map((item, inde) => ((inde == 0) ? { ...item, incomeFromJobs: (item.incomeFromJobs == null || item.incomeFromJobs == undefined) ? 0 : item.incomeFromJobs, isEmployed: true } : { ...item }));
    this.pageActionUtil.changeMapValue(0, false);
    this.pageActionUtil.updatePageActionDetail(PageActionDirection.NEXT)
    this.service.updateBasicDetails({ basicDetails: this.basicDetails } as BasicDetails)


  }
  private setupCheckboxFromState(data: BasicDetail[]) {
    this.oneorMoreData.questionAnswers=[];
    this.basicDetails.forEach((person) => {
      if(person.isEmployed==true)
      {
        this.selectedId.push(person.id)
      }
      this.oneorMoreData.questionText = 'diqWhoHasOneOrMoreJobs'
      this.oneorMoreData.subHeading = 'diqSelectAllApply'
      this.oneorMoreData.questionAnswers.push({
        id: person.id as unknown as number,
        isChecked: person.isEmployed == true ? true : false,
        label: `${person.firstName as string} ${person.lastName as string} ${Utility.getAge(person.dob)}`
      })
    });

  }


  showNextPage(selectUserIds: any) {
    this.pageActionUtil.emptyMap();
    selectUserIds.forEach((id: any) => {
      const index = this.basicDetails.findIndex((person: any) => person.id == id);
      if (index >= 0) {
        this.basicDetails = this.basicDetails.map((item, ind) => ((ind == index) ? {
          ...item,
          isEmployed: true, incomeFromJobs: (item.incomeFromJobs != null && item.incomeFromJobs != undefined) ? item.incomeFromJobs : 0
        } : { ...item}));

        this.pageActionUtil.changeMapValue(index, false);
      }
      
    })
    this.pageActionUtil.updatePageActionDetail(PageActionDirection.NEXT)
    const ids =this.basicDetails.filter((person)=>{
      return selectUserIds.findIndex((id:any)=>id==person.id) == -1
    }).map((_ids)=> 
        _ids.id
    );
    ids.forEach((id)=>{
      this.basicDetails = this.basicDetails.map((item, ind) => ((item.id == id) ? {
        ...item,
        isEmployed: false, incomeFromJobs: 0
      } : { ...item }));
    })
   
    this.service.updateBasicDetails({ basicDetails: this.basicDetails } as BasicDetails)
    this.queueService.next();
  }

  showPreviousPage() {
    this.queueService.back();
  }
}
