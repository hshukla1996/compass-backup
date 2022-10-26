import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HouseholdFormDataService } from '../services/household-form-data.service';
import { HouseholdRecordNo } from '../models/householdRecordNo';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ApplyNowHouseholdhouseholdCountryRecNoStrategy } from '../../../shared/route-strategies/apply-now/householdCountryRecNo';
import { Router } from '@angular/router';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { AppStoreService } from '../../../app-store-service';
import { IApplyNowState } from '../../+state/apply-now.models';
import { delay, first, of, Subscription } from 'rxjs';
import { IHouseholdCountyRecNo, IHouseholdElectricProvider } from '../household-model';
import { ScreenQueueUtil } from '../../../shared/services/screen_queue_util.service';

@Component({
  selector: 'compass-ui-household-country-rec-no',
  templateUrl: './household-country-rec-no.component.html',
  styleUrls: ['./household-country-rec-no.component.scss'],
  providers: [ApplyNowHouseholdhouseholdCountryRecNoStrategy]
})
export class HouseholdCountryRecNoComponent implements OnInit {

  // householdRecordNo : HouseholdRecordNo;
  householdRecordNoForm: FormGroup | any;
  applyNowState!: IApplyNowState;
  data: any;
  detail: any;


  constructor(
    // public householdFormDataService : HouseholdFormDataService,
    
    private fb: FormBuilder,
    private routingStrategy: ApplyNowHouseholdhouseholdCountryRecNoStrategy,
    private router: Router,
    private appService: AppStoreService,
    private service: ApplyNowStoreService,
    private cd: ChangeDetectorRef,
    private queueService: ScreenQueueUtil
  ) {
    // this.householdRecordNo = this.householdFormDataService.householdRecordNo
  }

  ngOnInit(): void {
    this.householdRecordNoForm = this.fb.group({
      recordNo: ['', [Validators.maxLength(9), Validators.pattern('^[0-9\.]*$')]]
    })
    this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      this.data = this.applyNowState.metaData;
      this.detail = this.applyNowState.houseHoldDetails.householdCountyRecNo as IHouseholdCountyRecNo;
      // console.log("mailingbsb", this.detail)
      })

      of(true).pipe(delay(10)).subscribe(() => {
        this.householdRecordNoForm.patchValue({
          recordNo: this.detail?.recordNo,
        })
      });
      this.cd.detectChanges();
  }
  

  OnlyNumberAllowed(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  goBack() {
    if (this.queueService.state.pageQueue.currentPageId > 0) {
        this.queueService.backPath();
    }
    else {
        this.router.navigate([
        RoutePath.APPLYNOW + 
        '/' + RoutePath.APPLYNOW_HOUSEHOLD + 
        '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDGATEPOST]);
    }
  }
  goNext() {
    var x = 'householdCountryRecNo';
    sessionStorage.setItem("routingPath", x);
    
    if (this.householdRecordNoForm.valid) {
      const storeHouseholdCountyRecNo= this.applyNowState?.houseHoldDetails;
      const storedHouseHoldCountyRecNo = this.applyNowState?.houseHoldDetails.householdCountyRecNo;

      const updatedHouseholdCountyRecNo = {
        ...storedHouseHoldCountyRecNo, householdCountyRecNo: this.householdRecordNoForm.value
      }
      this.service.updateHouseHoldDetails({
        ...storeHouseholdCountyRecNo, ...updatedHouseholdCountyRecNo
      })
      // this.router.navigate([this.routingStrategy.nextRoute()]);
      this.queueService.next();
      return true;
    } else {
      return false;
    }

  }

  isFieldInvalid(field: string) {
    let control = this.householdRecordNoForm.get(field)
    return !control.valid && control.touched
  }

  errorMap(field: string) {
    let control = this.householdRecordNoForm.get(field)
    switch(field) {
      case "recordNo": {
        if (control?.errors?.pattern) {
          return "Invalid pattern"
        }
        return ""
      }
      default: return ""
    }
  }

}
