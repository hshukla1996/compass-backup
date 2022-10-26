import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HouseholdFormDataService } from '../services/household-form-data.service';
import { HouseholdHead } from '../models/householdHead';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, FormArray } from '@angular/forms';
import { Router } from "@angular/router";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { HouseholdBenefitCoverage } from "../models/householdBenefitCoverage";
import { IHouseHold } from '../household-model';
import { IApplyNowState } from '../../+state/apply-now.models';
import { ApplyNowHouseholdSchoolMealsStrategy } from '../../../shared/route-strategies/apply-now/household-school-meals';
import { ScreenQueueUtil } from '../../../shared/services/screen_queue_util.service';

@Component({
  selector: 'compass-ui-household-school-meals',
  templateUrl: './household-school-meals.component.html',
  styleUrls: ['./household-school-meals.component.scss'],
  providers: [ApplyNowHouseholdSchoolMealsStrategy]
})
export class HouseholdSchoolMealsComponent implements OnInit {
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
  householdSchoolMealsForm: FormGroup | any;
  householdMembers: any[] = [];
  error = "Please select atleast one person";
  constructor(
    public householdFormDataService: HouseholdFormDataService,
    private fb: FormBuilder,
    private service: ApplyNowStoreService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private queueService: ScreenQueueUtil,
    private routingStratagy: ApplyNowHouseholdSchoolMealsStrategy,

  ) {

    // this.householdBenefitCoverage =
    //   householdFormDataService.householdBenefitCoverage;
  }

  ngOnInit(): void {
    this.householdSchoolMealsForm = this.fb.group({
      id: this.fb.array([]),
    });
    
    this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      this.householdHead = this.applyNowState.houseHoldDetails?.householdHead;
      this.householdPersons = this.applyNowState.houseHoldDetails?.houseHoldPersons || [];
      this.householdPersons = this.householdPersons.filter(person => person.IsThisIndividualOutsideHousehold !== "Y");
      //    this.selectedUserids = this.applyNowState.houseHoldDetails.selectedForCoverage;

      if (this.applyNowState.houseHoldDetails) {
        this.householdMembers = this.householdPersons;
        
        if (this.selectedUserids.length === 0) {
          this.householdMembers = this.householdPersons.filter((p) => this.getAge(p.dateOfBirth) < 22);
          this.applyNowState.houseHoldDetails.selectedForSchoolMeals.forEach((ind) => {
            if (ind) {
              this.selectedUserids.push(ind.toString())
            }
          })
          this.addIndividualsToForm(this.householdMembers)
        }
      }

      this.cd.detectChanges();
    });
  }

  private addIndividualsToForm(data: any) {
    data?.forEach(() => {
      if (this.individualFormArray)
        return this.individualFormArray.push(new FormControl())
    });
  }
  get f() { return this.householdSchoolMealsForm.controls; }
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

      const storeHouseholdSchoolMeals = this.applyNowState.houseHoldDetails;
      const updatedHouseholdSchoolMeals = { selectedForSchoolMeals: this.selectedUserids }

      this.service.updateHouseHoldDetails({ ...storeHouseholdSchoolMeals, ...updatedHouseholdSchoolMeals })
      this.queueService.next();
      return true;

    }
    else {
      this.displayError = true;
      return false;
    }
  }

  previous() {

    this.queueService.back();
  }
}






