import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { BasicDetail, BasicDetails, PageAction } from '../+state/do-i-qualify.models';
import { PageActionDirection, PageActionUtil } from '../../shared/services/page-action-util.service';
import { ScreenQueueUtil } from '../../shared/services/screen_queue_util.service';
import { Utility } from '../../shared/utilities/Utility';
import { DoIQualifyStoreService } from '../do-i-qualify-store-service';
import { WHOSCREENDATA } from '../who-screen-data';


@Component({
  selector: 'compass-ui-who-other-income',
  templateUrl: './who-other-income.component.html',
  styleUrls: ['./who-other-income.component.scss']
})
export class WhoOtherIncomeComponent implements OnInit {


  basicDetails!: BasicDetail[];
  isValidated!: boolean;
  currentOtherIncomeMap!: any
  whoHasOtherIncome!: FormGroup |any;
  pageAction!: PageAction
  selectedId = [] as any;
  public oneorMoreData = { ...WHOSCREENDATA }
  constructor( private service: DoIQualifyStoreService, 
  
    private queueService: ScreenQueueUtil,
    private pageActionUtil: PageActionUtil) {
 
  }
 
  ngOnInit(): void {
    this.basicDetails = this.service.getBasicDetails();
    this.pageActionUtil.initPageMap("currentOtherIncomeMap", "otherIncomePageDirection", false);
    this.setupCheckboxFromState(this.basicDetails)
  }
  private setupCheckboxFromState(data: BasicDetail[]) {
    this.oneorMoreData.questionText ='diqOtherIncomeWhoHasOtherIncome'
    this.oneorMoreData.subHeading ='diqSelectAllApply'
    
    this.oneorMoreData.questionAnswers = [];
    data.forEach((person) => {
      if (person.hasOtherIncome == true) {
        this.selectedId.push(person.id)
      }
      this.oneorMoreData.questionAnswers.push({
        id: person.id as unknown as number,
        isChecked: person.hasOtherIncome == true ? true : false,
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
          hasOtherIncome: true, incomeFromOtherJobs: (item.incomeFromOtherJobs != null && item.incomeFromOtherJobs != undefined) ? item.incomeFromOtherJobs : 0
        } : { ...item }));

        this.pageActionUtil.changeMapValue(index, false);
      }

    })
    this.pageActionUtil.updatePageActionDetail(PageActionDirection.NEXT)
    const ids = this.basicDetails.filter((person) => {
      return selectUserIds.findIndex((id: any) => id == person.id) == -1
    }).map((_ids) =>
      _ids.id
    );
    ids.forEach((id) => {
      this.basicDetails = this.basicDetails.map((item, ind) => ((item.id == id) ? {
        ...item,
        hasOtherIncome: false, incomeFromOtherJobs: 0
      } : { ...item }));
    })

    this.service.updateBasicDetails({ basicDetails: this.basicDetails } as BasicDetails)
    this.queueService.next();
  }

  showPreviousPage() {
    this.queueService.back();
  }

}
