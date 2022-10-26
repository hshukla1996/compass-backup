import { ApplyNowAbsentRelativeAddressStrategy } from "../../../shared/route-strategies/apply-now/absentRelativeAddress";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { HouseholdFormDataService } from '../services/household-form-data.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { AppStoreService } from "../../../app-store-service";
import { IApplyNowState } from "../../+state/apply-now.models";
import { IHouseHoldDetails, IAbsentRelative } from "../household-model";
//import { ApplyNowGISValidationStrategy } from './household-address-validation-service'
import { ScreenQueueUtil } from "../../../shared/services/screen_queue_util.service";
import { PageActionUtil } from '../../../shared/services/page-action-util.service';
import { UtilService } from '../../../shared/services/util.service';
import { ActivatedRoute, Router } from '@angular/router';
import {RoutePath} from "../../../shared/route-strategies";
import { Utility } from "../../../shared/utilities/Utility";

@Component({
  selector: 'compass-ui-absent-relative-address',
  templateUrl: './absent-relative-address.component.html',
  styleUrls: ['./absent-relative-address.component.scss'],
  providers: [ApplyNowAbsentRelativeAddressStrategy]
})
export class AbsentRelativeAddressComponent implements OnInit {

  absentRelativeAddressForm: FormGroup | any;
  applyNowState!: IApplyNowState;
  storedHouseHoldDetail!: IHouseHoldDetails;
  currentUserName!: string;
  states: any;
  personsMap!: any;
  currentUser: IAbsentRelative = {};
  currentServicesMap: any;
  currentUserIndex!: any;
  absentRelatives: IAbsentRelative[] = [];
  visit: boolean=false;
  visitCount: any;
  showError = true;

  today = new Date().toJSON().slice(0, 10).replace(/-/g, '-');

  constructor(
    public householdFormDataService: HouseholdFormDataService,
    private queueService: ScreenQueueUtil,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private pageActionUtil: PageActionUtil,
    private service: ApplyNowStoreService,
    private activedRoute: ActivatedRoute,
    private utilService: UtilService,
    private router: Router,
    private routingStrategy: ApplyNowAbsentRelativeAddressStrategy,
    // private routingStratagy: ApplyNowGISValidationStrategy,
    private appService: AppStoreService
  ) {

  }

  ngOnInit(): void {
    const x = sessionStorage.getItem("storageId");
    this.absentRelativeAddressForm = this.fb.group({
      id: x,
      AddressLine1: "",
      AddressLine2: "",
      City: "",
      State: "",
      Zip: "",
      PhoneNumber: ""
    });

    //this.pageActionUtil.initPageMap("currentIncomeMap", "incomePageDirection", false);
    this.appService.getStates().subscribe((states) => {
      this.states = states;
      this.cd.detectChanges();
    });

    this.service.getAppData().subscribe(d => {
      this.storedHouseHoldDetail = d?.houseHoldDetails;
      this.applyNowState = { ...d };
      if (this.applyNowState.houseHoldDetails.absentRelative) {
        this.absentRelatives = this.applyNowState.houseHoldDetails.absentRelative;
      }
      this.currentUser = this.extractUser(this.absentRelatives, this.currentUserIndex) || "";
      this.absentRelativeAddressForm.get('AddressLine1').patchValue(this.currentUser.Address?.AddressLine1)
      this.absentRelativeAddressForm.get('AddressLine2').patchValue(this.currentUser.Address?.AddressLine2)
      this.absentRelativeAddressForm.get('City').patchValue(this.currentUser.Address?.City)
      this.absentRelativeAddressForm.get('State').patchValue(this.currentUser.Address?.State)
      this.absentRelativeAddressForm.get('Zip').patchValue(this.currentUser.Address?.Zip)
      this.absentRelativeAddressForm.get('PhoneNumber').patchValue(this.currentUser.Address?.PhoneNumber)
      this.cd.detectChanges();
    });

    this.currentServicesMap =
      {
        ...this.applyNowState.houseHoldDetails.pageAction
          ?.absentRelativeMap,
      } || {};

    this.activedRoute.params.subscribe((p) => {
      if (Object.keys(p).length === 0) {
        if (this.utilService.isFirstRoute(this.currentServicesMap)) {
          this.currentUserIndex = Object.keys(
            this.currentServicesMap
          )[0];
        } else if (
          this.utilService.isLastRoute(this.currentServicesMap)
        ) {
          this.currentUserIndex = Object.keys(this.currentServicesMap)[
            Object.keys(this.currentServicesMap).length - 1
          ];
        }
      } else {
        this.currentUserIndex = p.userId || "";
      }
      this.currentUser =
        this.extractUser(
          this.absentRelatives,
          this.currentUserIndex
        ) || "";
    });
    this.absentRelativeAddressForm.get("Zip").setValidators(Utility.zipCodeValidator());
    this.absentRelativeAddressForm.get("PhoneNumber").setValidators(Utility.phoneNumberValidator());
    this.cd.detectChanges();
  };

  OnlyNumberAllowed(event: { which: any; keyCode: any }, field: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode === 8 &&  this.absentRelativeAddressForm.get(field).value.length < 4) {
        this.absentRelativeAddressForm.value[field] = undefined;
        this.absentRelativeAddressForm.get(field).errors = {};
        this.absentRelativeAddressForm.get(field).status = "VALID";
        this.absentRelativeAddressForm.status = "VALID";
        return true;
    }
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
      case "AddressLine1":
        if (this.absentRelativeAddressForm.get("AddressLine1").errors.required) {
          return "No residential street address is entered";
        }
        break;
      case "City":
        if (this.absentRelativeAddressForm.get("City").errors.required) {
          return "No city is entered";
        }
        break;
      case "State":
        if (this.absentRelativeAddressForm.get("State").errors.required) {
          return "No state is selected from the dropdown";
        }
        break;
      case "Zip":
        if (this.absentRelativeAddressForm.get("Zip").errors.required) {
          return "No zip code is entered";
        }
        break;
      default:
        return "";
        break;
    }
    return "";
  }

  isFieldValid(field: string): boolean {
    const formField = this.absentRelativeAddressForm.get(field);
    return (
      formField && this.absentRelativeAddressForm.get(field).status !== "VALID" &&
      (this.absentRelativeAddressForm.get(field).dirty ||
        this.absentRelativeAddressForm.get(field).touched)
    );
  }

  extractUser(persons: any, userId: any) {
    const currentUser = persons.filter((person: IAbsentRelative) => {
      return person.id?.toString() === sessionStorage.getItem("storageId");
    })[0];
    return currentUser;
  }

  onSubmit(): boolean {
    this.service.validateAllFormFields(this.absentRelativeAddressForm);

    if (this.absentRelativeAddressForm.status.toLowerCase() !== "valid") return false;
      const storedHouseholdDetails = this.applyNowState?.houseHoldDetails;
      const updatedHouseholdPersons = this.applyNowState?.houseHoldDetails.absentRelative?.map((person: IAbsentRelative) => {
        if (person.id === this.currentUser.id) {
          const personToBeUpdated = { ...person };
          personToBeUpdated.Address = this.absentRelativeAddressForm.value
          return personToBeUpdated;
        }
        else {
          return person;
        }
      });

      if (storedHouseholdDetails) {
        this.service.updateHouseHoldDetails(
          { ...storedHouseholdDetails, ...{ absentRelative: updatedHouseholdPersons } }
        )
      }
      
    this.router.navigate([
      RoutePath.APPLYNOW + 
      '/' + RoutePath.APPLYNOW_HOUSEHOLD + 
      '/' + RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVEEMPLOYERDETAILS]);
    return true;
  }
  previous() {

      this.router.navigate( [RoutePath.APPLYNOW +
        "/" +
        RoutePath.APPLYNOW_HOUSEHOLD +
        "/" +
        RoutePath.APPLYNOW_HOUSEHOLD_ABSENTRELATIVERESPONSIBLEFOR]);

  }
}

