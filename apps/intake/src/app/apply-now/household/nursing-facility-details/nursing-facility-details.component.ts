import { ApplyNowNursingFacilityDetailsStrategy } from "../../../shared/route-strategies/apply-now/nursingFacilityDetails";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { HouseholdFormDataService } from '../services/household-form-data.service';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from "@angular/router";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { AppStoreService } from "../../../app-store-service";
import { IApplyNowState } from "../../+state/apply-now.models";
import { INursingFacilityDetails, IHouseHoldDetails } from "../household-model";
import { NursingFacilityDetailsCon } from "../models/nursingFacilityDetailsCon"
import { delay, first, of, Subscription } from 'rxjs';
import { ScreenQueueUtil } from "../../../shared/services/screen_queue_util.service";
import { RoutePath } from '../../../shared/route-strategies';
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from "../../../shared/utilities/Utility";

@Component({
  selector: 'compass-ui-nursing-facility-details',
  templateUrl: './nursing-facility-details.component.html',
  styleUrls: ['./nursing-facility-details.component.scss'],
  providers: [ApplyNowNursingFacilityDetailsStrategy]
})

export class NursingFacilityDetailsComponent implements OnInit {
  nursingFacilityDetailsCon!: INursingFacilityDetails;
  data: any;
  nursingFacilityDetailsForm: FormGroup | any;
  applyNowState!: IApplyNowState;
  detail!: INursingFacilityDetails;
  states: any;
  areYouWantToApplyLTC: any;
  contactNumber: string = "";
  today = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
  firstName: any;
  storedHouseHoldDetail!: IHouseHoldDetails;


  constructor(
    public householdFormDataService: HouseholdFormDataService,
    private queueService: ScreenQueueUtil,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private service: ApplyNowStoreService,
    private router: Router,
    private routingStratagy: ApplyNowNursingFacilityDetailsStrategy,
    private appService: AppStoreService
  ) {
    this.nursingFacilityDetailsCon = this.householdFormDataService.nursingFacilityDetailsCon;
  }

  ngOnInit(): void {
    this.nursingFacilityDetailsForm = this.fb.group({
      AddressLine1: " ",
      AddressLine2: " ",
      City: " ",
      State: ["", Validators.required],
      Zip: ["", Utility.zipCodeValidator()],
      FacilityName: ["", Validators.required],
      nursingFacilityStartDate: ["", Utility.dateMaxValidator()],
      nursingFacilityEndDate: ["", Utility.dateMaxValidator()]
    }
    );


    this.appService.getStates().subscribe((states) => {
      this.states = states;
      this.cd.detectChanges();
    });


    this.service.getAppData().subscribe(d => {

      this.storedHouseHoldDetail = d?.houseHoldDetails;
      const firstPerson = this.storedHouseHoldDetail.absentRelative ? this.storedHouseHoldDetail.absentRelative[0] : null;
      if (firstPerson) {
        this.firstName = firstPerson.firstName || ""
      }

      this.applyNowState = { ...d };

      this.detail = this.applyNowState.houseHoldDetails.nursingFacility.NursingFacilityDetails as INursingFacilityDetails;

      of(true).pipe(delay(10)).subscribe(() => {
        this.nursingFacilityDetailsForm.patchValue({
          AddressLine1: this.detail?.AddressLine1,
          AddressLine2: this.detail?.AddressLine2,
          City: this.detail?.City,
          State: this.detail?.State,
          Zip: this.detail?.Zip,
          FacilityName: this.detail?.FacilityName,
          nursingFacilityStartDate: Utility.duetFormatDate(this.detail?.nursingFacilityStartDate),
          nursingFacilityEndDate: Utility.duetFormatDate(this.detail?.nursingFacilityEndDate)
        })
      });
      this.cd.detectChanges();
    });
  }

  OnlyNumberAllowed(event: { which: any; keyCode: any }): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  errorMap(field: string) {
    if (!this.isFieldValid(field)) {
      return "";
    }

    switch (field) {

      /*  case "AddressLine1":
         if (this.nursingFacilityDetailsForm.get("AddressLine1").errors.required) {
           return "No residential street address is entered";
         }
         break;
       case "City":
         if (this.nursingFacilityDetailsForm.get("City").errors.required) {
           return "No city is entered";
         }
         break; */
      case "State":
        if (this.nursingFacilityDetailsForm.get("State").errors.required) {
          return "No State is selected for Nursing Home Facility";
        }
        break;
      /*  case "Zip":
         if (this.nursingFacilityDetailsForm.get("Zip").errors.required) {
           return "No zip code is entered";
         }
         break; */
      case "nursingFacilityStartDate":
        if (this.nursingFacilityDetailsForm.get("nursingFacilityStartDate").errors.required) {
          return "No move in date is entered";
        }
        if (this.nursingFacilityDetailsForm.get('nursingFacilityStartDate').errors?.invalidDate) {
          return 'Date must be in the past.'
        }
        if (this.nursingFacilityDetailsForm.get("nursingFacilityStartDate").errors.duetInvalidDate) {
          return "duetInvalidDate";
        }
        break;
      case "nursingFacilityEndDate":
        if (this.nursingFacilityDetailsForm.get('nursingFacilityEndDate').errors?.invalidDate) {
          return 'Date must be in the past.'
        }
        if (this.nursingFacilityDetailsForm.get("nursingFacilityEndDate").errors.duetInvalidDate) {
          return "duetInvalidDate";
        }
        break;
      case "FacilityName":
        if (this.nursingFacilityDetailsForm.get("FacilityName").errors.required) {
          return "No Facility Name is entered";
        }
        break;
      default:
        return "";
        break;
    }
    return "";
  }

  isFieldValid(field: string): boolean {
    return (
        this.nursingFacilityDetailsForm.get(field).status !== "VALID" &&
        (this.nursingFacilityDetailsForm.get(field).dirty ||
            this.nursingFacilityDetailsForm.get(field).touched)
    );
  }

  GetValue(value: string) {
    this.contactNumber = value;
  }

  ContactNumberDiv: boolean = false;
  showContactNumber() {
    this.ContactNumberDiv = true;
  }
  onSubmit(): boolean {
    this.service.validateAllFormFields(this.nursingFacilityDetailsForm);
    if (this.nursingFacilityDetailsForm.valid) {
      const storeHouseholdDetails = this.applyNowState?.houseHoldDetails;
      const storedNursingFacility = this.applyNowState?.houseHoldDetails.nursingFacility;


      const updatedNursingFacility = {
        ...storedNursingFacility, NursingFacilityDetails: this.nursingFacilityDetailsForm.value
      }

      this.service.updateHouseHoldDetails({
        ...storeHouseholdDetails, nursingFacility: updatedNursingFacility
      })
      this.router.navigate([this.routingStratagy.nextRoute()]);
      return true;
    } else {
      return false;
    }
  }
  previous() {
    if (this.queueService.state.pageQueue.currentPageId > 0) {
        this.queueService.backPath();
    }
    else {
        this.router.navigate([
        RoutePath.APPLYNOW +
        '/' + RoutePath.APPLYNOW_HOUSEHOLD +
        '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDMEMBERSITUATIONGATEPOST]);
    }

  }
}
