import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HouseholdFormDataService } from '../services/household-form-data.service';
import { HouseholdHead } from '../models/householdHead';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, FormArray } from '@angular/forms';
import { ApplyNowHouseholdBenefitsCoverageStrategy } from "../../../shared/route-strategies/apply-now/householdBenefitsCoverage";
import { Router } from "@angular/router";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { HouseholdBenefitCoverage } from "../models/householdBenefitCoverage";
import { IHouseHold } from '../household-model';
import { IApplyNowState } from '../../+state/apply-now.models';
import { ApplyNowHouseholdSnapScreenStrategy } from '../../../shared/route-strategies/apply-now/household-snap-screen';
import { ScreenQueueUtil } from '../../../shared/services/screen_queue_util.service';

@Component({
  selector: 'compass-ui-household-snap-screen',
  templateUrl: './household-snap-screen.component.html',
  styleUrls: ['./household-snap-screen.component.scss'],
  providers: [ApplyNowHouseholdSnapScreenStrategy]
})
export class HouseholdSnapScreenComponent implements OnInit {
  public age: any;
  public expanded = false;
  @Output() dataUpdated = new EventEmitter<HouseholdHead>();
  householdHead!: IHouseHold;
  householdPersons: IHouseHold[] = [];
  applyNowState!: IApplyNowState;
  indexExpanded = -1;
  displayError: boolean = false
  selectedUserids: string[] = [];
  // householdBenefitCoverage: HouseholdBenefitCoverage;
  householdSnapScreenForm: FormGroup | any;
  householdMembers: any[] = [];
  error = "Please select atleast one person";
  constructor(
    public householdFormDataService: HouseholdFormDataService,
    private fb: FormBuilder,
    private service: ApplyNowStoreService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private routingStratagy: ApplyNowHouseholdSnapScreenStrategy,
    private queueService: ScreenQueueUtil

  ) {

    // this.householdBenefitCoverage =
    //   householdFormDataService.householdBenefitCoverage;
  }

  ngOnInit(): void {
    this.householdSnapScreenForm = this.fb.group({
      id: this.fb.array([]),
    });
    this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      this.householdHead = this.applyNowState.houseHoldDetails?.householdHead;
      this.householdPersons = this.applyNowState.houseHoldDetails?.houseHoldPersons || [];
      this.householdPersons = this.householdPersons.filter(person => person.IsThisIndividualOutsideHousehold !== "Y");
      //    this.selectedUserids = this.applyNowState.houseHoldDetails.selectedForCoverage;
      this.cd.detectChanges();
    });
    if (this.applyNowState.houseHoldDetails) {
      this.householdMembers = this.householdPersons;
      if (this.selectedUserids.length === 0) {
        this.applyNowState.houseHoldDetails.selectedForSnapScreen.forEach((ind) => {
          if (ind) {
            this.selectedUserids.push(ind.toString())
          }
        })
        this.addIndividualsToForm(this.householdMembers)
      }
    }
  }
  private addIndividualsToForm(data: any) {
    data?.forEach(() => {
      if (this.individualFormArray)
        return this.individualFormArray.push(new FormControl())
    });
  }
  get f() { return this.householdSnapScreenForm.controls; }
  get individualFormArray(): FormArray {
    return this.f.id as FormArray;
  }


  onCheckboxChange(e: any) {
    if (e.target.checked) {
      this.selectedUserids = this.selectedUserids.concat([e.target.value]);
    } else {

      for (let i = 0; i < this.selectedUserids.length; i++) {

        if (this.selectedUserids[i] === e.target.value) {

          this.selectedUserids.splice(i, 1);
        }

      }
    }
  }

  getAge(dateString: any): any {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  onSubmit(): boolean {
    if (this.selectedUserids.length > 0) {
      let young = false;
      let elderly = false;
      this.householdMembers?.forEach((person) => {
        if (this.selectedUserids.includes(person.id!.toString())) {
            if (this.getAge(person.dateOfBirth) < 60) {
              young = true;
            } else {
              elderly = true;
            }
        }
      });
      let sevicesselected = [...(this.applyNowState?.programSelection?.programs ?? [])];
      if (elderly && !young) {
          sevicesselected = sevicesselected.filter((e) => e !== "FS");
          if (!sevicesselected.includes("ES")) {
              sevicesselected.push("ES");
          }
      }
      if (young && !elderly) {
          sevicesselected = sevicesselected.filter((e) => e !== "ES");
          if (!sevicesselected.includes("FS")) {
              sevicesselected.push("FS");
          }
      }
      if (elderly && young) {
          if (!sevicesselected.includes("FS")) {
              sevicesselected.push("FS");
          }
          if (!sevicesselected.includes("ES")) {
              sevicesselected.push("ES");
          }
      }
      this.service.updateHouseholdServicesSelected(sevicesselected);
      const storeHouseholdDetails = this.applyNowState.houseHoldDetails;
      const updatedHouseholddetails = { selectedForSnapScreen: this.selectedUserids }
      this.service.updateHouseHoldDetails({ ...storeHouseholdDetails, ...updatedHouseholddetails })
      this.queueService.next();
      return true;

    }
    else {
      this.displayError = true;
      return false;
    }

  }

  previous() {
    // this.router.navigate([this.routingStratagy.previousRoute()]);
    this.queueService.back();
  }


}







//   constructor(private fb: FormBuilder,
//     private service: ApplyNowStoreService,
//     private cd: ChangeDetectorRef,
//     private routingStrategy: ApplyNowHouseholdSnapScreenStrategy,
//     // private addroutingStrategy: ApplyNowResourcesBurialSpacesStrategy,
//     private router: Router) { }

//   ngOnInit(): void {
//   }
//   goBack() {
//     this.router.navigate([this.routingStrategy.previousRoute()]);
//   }
//   goNext() {
//     // this.service.validateAllFormFields(this.burialSpacesSummaryForm);
//     // if (this.burialSpacesSummaryForm.valid) {
//     this.router.navigate([this.routingStrategy.nextRoute()]);
//     //   return true;
//     // }
//     // else {
//     //   return false;
//     // }
//   }
// }
