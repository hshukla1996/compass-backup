import { Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { BasicDetail, BasicDetails } from '../+state/do-i-qualify.models';
import { ScreenQueueUtil } from '../../shared/services/screen_queue_util.service';
import { Utility } from '../../shared/utilities/Utility';
import { DoIQualifyStoreService } from '../do-i-qualify-store-service';
import { WHOSCREENDATA } from '../who-screen-data';

@Component({
  selector: 'compass-ui-who-has-disability',
  templateUrl: './who-has-disability.component.html',
  styleUrls: ['./who-has-disability.component.scss']
})
export class WhoHasDisabilityComponent implements OnInit {

  basicDetails!: BasicDetail[];

  public disabilityCareData = { ...WHOSCREENDATA }
  selectedId = [] as any;
  constructor(private formBuilder: FormBuilder, private storeService: DoIQualifyStoreService,
    private queueService: ScreenQueueUtil) {
    
  }

  ngOnInit(): void {
    this.basicDetails = this.storeService.getBasicDetails();
    this.setupCheckboxFromState(this.basicDetails)
  }
 
  

  private setupCheckboxFromState(data: BasicDetail[]) {

    this.disabilityCareData.questionText = 'diqWhoHasDisability'
    this.disabilityCareData.subHeading = 'diqsituationsubheader'

    this.disabilityCareData.questionAnswers = [];
    data.forEach((person) => {
      if (person.isDisabled == true) {
        this.selectedId.push(person.id)
      }
      this.disabilityCareData.questionAnswers.push({
        id: person.id as unknown as number,
        isChecked: person.isDisabled == true ? true : false,
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
          isDisabled: true,
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
        isDisabled: false
      } : { ...item }));
    })

    this.storeService.updateBasicDetails({ basicDetails: this.basicDetails } as BasicDetails)
    this.queueService.next();
  }
}


