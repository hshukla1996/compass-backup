import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasicDetail, BasicDetails } from '../+state/do-i-qualify.models';
import { DoIQualifyService } from '../../shared/services/do-i-qualify.service';
import { ScreenQueueUtil } from '../../shared/services/screen_queue_util.service';
import { Utility } from '../../shared/utilities/Utility';
import { DoIQualifyStoreService } from '../do-i-qualify-store-service';
import { WHOSCREENDATA } from '../who-screen-data';
@Component({
  selector: 'compass-ui-who-foster-care',
  templateUrl: './who-foster-care.component.html',
  styleUrls: ['./who-foster-care.component.scss']
})
export class WhoFosterCareComponent implements OnInit {

  basicDetails!: BasicDetail[];
  filteredBasicDetails!: BasicDetail[];
  fosterCareForm!: FormGroup | any;
  public fosterCareData = { ...WHOSCREENDATA }
  selectedId = [] as any;
  constructor(private formBuilder: FormBuilder, private storeService: DoIQualifyStoreService,
    private queueService: ScreenQueueUtil) {
   
  }
 
  ngOnInit(): void {
    this.basicDetails = this.storeService.getBasicDetails();
    this.filteredBasicDetails = this.basicDetails.filter((person)=>person.age>=18 && person.age<=25)
    this.setupCheckboxFromState(this.filteredBasicDetails)

  }
  private setupCheckboxFromState(data: BasicDetail[]) {
    this.fosterCareData.questionText = 'diqFosterCare'
    this.fosterCareData.subHeading = 'diqsituationsubheader'

    this.fosterCareData.questionAnswers = [];
    data.forEach((person) => {
      if (person.wasInFosterCareOnEighteenthBirthdayOrLater == true) {
        this.selectedId.push(person.id)
      }
      this.fosterCareData.questionAnswers.push({
        id: person.id as unknown as number,
        isChecked: person.wasInFosterCareOnEighteenthBirthdayOrLater == true ? true : false,
        label: `${person.firstName as string} ${person.lastName as string} ${Utility.getAge(person.dob)}`
      })
    });
   
  }

 
  showPreviousPage() {
    this.queueService.back();
  }
  showNextPage(selectUserIds: any) {
   
   
    selectUserIds.forEach((id: any) => {
      const index = this.basicDetails.findIndex((person: any) => person.id == id);
      if (index >= 0) {
        this.basicDetails = this.basicDetails.map((item, ind) => ((ind == index) ? {
          ...item,
          wasInFosterCareOnEighteenthBirthdayOrLater: true, 
        } : { ...item }));

      
      }

    })
    
    const ids = this.basicDetails.filter((person) => {
      return selectUserIds.findIndex((id: any) => id == person.id) == -1
    }).map((_ids) =>
      _ids.id
    );
    ids.forEach((id) => {
      this.basicDetails = this.basicDetails.map((item, ind) => ((item.id == id) ? {
        ...item,
        wasInFosterCareOnEighteenthBirthdayOrLater: false
      } : { ...item }));
    })

    this.storeService.updateBasicDetails({ basicDetails: this.basicDetails } as BasicDetails)
    this.queueService.next();
  }
  
}
