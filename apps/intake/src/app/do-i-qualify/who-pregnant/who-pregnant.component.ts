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
import { ScreenQueueUtil } from '../../shared/services/screen_queue_util.service';
import { Utility } from '../../shared/utilities/Utility';
import { DoIQualifyStoreService } from '../do-i-qualify-store-service';
import { WHOSCREENDATA } from '../who-screen-data';
@Component({
  selector: 'compass-ui-who-pregnant',
  templateUrl: './who-pregnant.component.html',
  styleUrls: ['./who-pregnant.component.scss']
})
export class WhoPregnantComponent implements OnInit {



  basicDetails!: BasicDetail[];
  pregnantApplicant!: BasicDetail[];
  pregnancyForm!: FormGroup | any;
  selectedId = [] as any;
  public pregData = { ...WHOSCREENDATA }
  constructor(
     private storeService: DoIQualifyStoreService,
    private queueService: ScreenQueueUtil,
    ) {
 
  }
 
  ngOnInit(): void {
    this.basicDetails = this.storeService.getBasicDetails();
    if (this.basicDetails.length > 0) {
      this.pregnantApplicant = this.basicDetails.filter((val) => val.gender == 'F' && val.age >= 9 && val.age<=60)
      this.setupCheckboxFromState(this.pregnantApplicant)
    }

  }

  private setupCheckboxFromState(data: BasicDetail[]) {
    this.pregData.questionAnswers = [];
    this.basicDetails.forEach((person) => {
      if (person.isPregnant == true) {
        this.selectedId.push(person.id)
      }
      this.pregData.questionText ='diqWhoIsPregnant'
      this.pregData.subHeading = 'diqsituationsubheader'
      this.pregData.questionAnswers.push({
        id: person.id as unknown as number,
        isChecked: person.isPregnant == true ? true : false,
        label: `${person.firstName as string} ${person.lastName as string} ${Utility.getAge(person.dob)}`
      })
    });

  }
 
  showNextPage(selectUserIds: any) {
   
    selectUserIds.forEach((id: any) => {
      const index = this.basicDetails.findIndex((person: any) => person.id == id);
      if (index >= 0) {
        this.basicDetails = this.basicDetails.map((item, ind) => ((ind == index) ? {
          ...item,
          isPregnant: true
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
        isPregnant: false
      } : { ...item }));
    })

    this.storeService.updateBasicDetails({ basicDetails: this.basicDetails } as BasicDetails)
    this.queueService.next();
  }

  showPreviousPage() {
    this.queueService.back();
  }

}
