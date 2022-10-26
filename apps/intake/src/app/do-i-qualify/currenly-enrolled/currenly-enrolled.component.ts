import {
  
  Component,
  
  OnInit,
  
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { BasicDetail, BasicDetails, PageAction } from '../+state/do-i-qualify.models';
import { PageActionDirection, PageActionUtil } from '../../shared/services/page-action-util.service';
import { ScreenQueueUtil} from '../../shared/services/screen_queue_util.service';
import { Utility } from '../../shared/utilities/Utility';
import { DoIQualifyStoreService } from '../do-i-qualify-store-service';
import { WHOSCREENDATA } from '../who-screen-data';


@Component({
  selector: 'compass-ui-currenly-enrolled',
  templateUrl: './currenly-enrolled.component.html',
  styleUrls: ['./currenly-enrolled.component.scss']
})
export class CurrenlyEnrolledComponent implements OnInit {

  basicDetails!: BasicDetail[];
  selectedId = [] as any;
  public enrolledData = { ...WHOSCREENDATA }
  constructor(

    private storeService: DoIQualifyStoreService,
    private queueService: ScreenQueueUtil,
    private pageActionUtil: PageActionUtil
    ) 
    
    {
  }



  ngOnInit(): void {
  
    this.basicDetails = this.storeService.getBasicDetails();
    this.pageActionUtil.initPageMap("currentlyEnrolledMap", "currentlyEnrolledPageDirection", false);
    this.setCurrenlyEnrolledMapFromState(this.basicDetails);
    
  }


  showNextPage(selectUserIds: any) {
    this.pageActionUtil.emptyMap();
    selectUserIds.forEach((id: any) => {
      const index = this.basicDetails.findIndex((person: any) => person.id == id);
      if (index >= 0) {
        this.basicDetails = this.basicDetails.map((item, ind) => ((ind == index) ? {
          ...item,
          hasEnrolledInSchool: true, schoolType: (item.schoolType != null && item.schoolType != undefined && item.schoolType !='') ? item.schoolType : ''
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
        hasEnrolledInSchool: false, schoolType: ''
      } : { ...item }));
    })

    this.storeService.updateBasicDetails({ basicDetails: this.basicDetails } as BasicDetails)
    this.queueService.next();
  }

  showPreviousPage() {
    this.queueService.back();
  }
  setCurrenlyEnrolledMapFromState(data:BasicDetail[]) {
    this.enrolledData.questionText = 'diqCurrentlyEnrolled'
    this.enrolledData.subHeading = 'diqSelectAllApply'

    this.enrolledData.questionAnswers = [];
    data.forEach((person) => {
      if (person.hasEnrolledInSchool == true) {
        this.selectedId.push(person.id)
      }
      this.enrolledData.questionAnswers.push({
        id: person.id as unknown as number,
        isChecked: person.hasEnrolledInSchool == true ? true : false,
        label: `${person.firstName as string} ${person.lastName as string} ${Utility.getAge(person.dob)}`
      })
    });
  }
  

}
