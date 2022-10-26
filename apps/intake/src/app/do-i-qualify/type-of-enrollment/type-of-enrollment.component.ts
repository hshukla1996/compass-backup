import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { BasicDetail, BasicDetails, PageAction } from '../+state/do-i-qualify.models';
import { AppStoreService } from '../../app-store-service';
import { DoIQualifyService } from '../../shared/services/do-i-qualify.service';
import { PageActionDirection, PageActionUtil } from '../../shared/services/page-action-util.service';
import { ScreenQueueUtil } from '../../shared/services/screen_queue_util.service';
import { UtilService } from '../../shared/services/util.service';
import { DoIQualifyStoreService } from '../do-i-qualify-store-service';


@Component({
  selector: 'compass-ui-type-of-enrollment',
  templateUrl: './type-of-enrollment.component.html',
  styleUrls: ['./type-of-enrollment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypeOfEnrollmentComponent implements OnInit {

  schoolTypeForm!: FormGroup | any;
  basicDetails!: BasicDetail[];
  currentUserName!: string;
  userName$ = new BehaviorSubject<string>(this.currentUserName);
  currentUserIndex!: number;
  schoolTypes!:any;
  isValidated!:boolean

  constructor(fb: FormBuilder, private dataStore: DoIQualifyStoreService, 
    private cd: ChangeDetectorRef,
    private appService: AppStoreService,
    private queueService: ScreenQueueUtil,
    private pageActionUtil: PageActionUtil,
    private utilService:UtilService) 
    {
    this.schoolTypeForm = fb.group({
      schoolType: ['',],
    });

  }
  getUserName() {
    return this.userName$.asObservable();
  }
  ngOnInit(): void {
    this.basicDetails = this.dataStore.getBasicDetails();
    this.pageActionUtil.initPageMap("currentlyEnrolledMap", "currentlyEnrolledPageDirection", false);
    if (this.basicDetails.length > 0) 
    {
      this.initSchoolType();
    }
    this.isValidated = this.schoolType.valid ? true : false;
    this.schoolTypeForm.valueChanges.subscribe((d:any) => {

      this.updateSchoolType(this.currentUserIndex);
      this.isValidated = this.schoolType.valid ? true : false;

    });
    this.appService.getSchoolTypes().subscribe(c => {
      this.schoolTypes = c;
      this.cd.detectChanges();
    });
  }

  changeSchool(e: any) {

    this.schoolTypeForm.get('schoolType')?.setValue(e.target.value, { onlySelf: true })

  }

  get schoolType() {
    return this.schoolTypeForm.get('schoolType');
  }
  updateSchoolType(id: number): void {
    const value = this.utilService.getObjectPropertyValue(this.schoolTypeForm.value.schoolType )
    this.basicDetails = this.basicDetails.map((item, inde) => ((inde == id) ? {
      ...item, schoolType: value
    } : { ...item, schoolType: this.utilService.getObjectPropertyValue(item.schoolType) }));
    this.pageActionUtil.changeMapValue(this.currentUserIndex, true);
    this.dataStore.updateBasicDetails({ basicDetails: this.basicDetails } as BasicDetails)



  }

  getSchoolType(value: string) {
    return this.schoolTypes.filter((val: any) => val.schoolType == value)

  }
  initSchoolType() 
  {
    
    this.currentUserIndex = this.pageActionUtil.userIndex ?? 0;
    const schoolType = this.basicDetails[this.currentUserIndex]?.schoolType ?? "";
    this.schoolTypeForm.get('schoolType')?.setValue(schoolType);
    this.userName$.next(this.basicDetails[this.currentUserIndex].firstName || "")
    this.getUserName().subscribe((name)=>{
      this.currentUserName =name ;
    })
  }

  back() {
    const id = this.pageActionUtil.backUserId();
    if (id < 0) {
      this.queueService.back();
      return;
    }
    this.currentUserIndex = id;
    this.initSchoolType();

  }
  next() {

    this.schoolTypeForm.markAllAsTouched();
    const id = this.pageActionUtil.nextUserId();
    if (id < 0) {
      this.queueService.next();
      return;
    }
    this.currentUserIndex = id;
    this.initSchoolType();
    
  }
  isFieldValid() {
    return this.dataStore.isFieldValid(this.schoolTypeForm, 'schoolType')
  }

}
