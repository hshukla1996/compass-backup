import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HouseholdFormDataService } from '../services/household-form-data.service';
import { HouseholdHead } from '../models/householdHead';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, FormArray } from '@angular/forms';
import { ApplyNowHouseholdBenefitsCoverageStrategy } from "../../../shared/route-strategies/apply-now/householdBenefitsCoverage";
import { Router } from "@angular/router";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { HouseholdBenefitCoverage } from "../models/householdBenefitCoverage";
import { IHouseHold, IhouseholdSnapDisability } from '../household-model';
import { IApplyNowState } from '../../+state/apply-now.models';
import { ScreenQueueRouteNameHousehold, ScreenQueueUtil } from '../../../shared/services/screen_queue_util.service';
import { ApplyNowHouseholdSnapDisabilityStrategy } from '../../../shared/route-strategies/apply-now/household-snap-disability';
import { delay, first, of, Subscription } from 'rxjs';

@Component({
  selector: 'compass-ui-household-snap-disability',
  templateUrl: './household-snap-disability.component.html',
  styleUrls: ['./household-snap-disability.component.scss'],
  providers: [ApplyNowHouseholdSnapDisabilityStrategy]
})
export class HouseholdSnapDisabilityComponent implements OnInit {
  public age: any;
  public expanded = false;
  @Output() dataUpdated = new EventEmitter<HouseholdHead>();
  householdHead!: IHouseHold;
  householdPersons: IHouseHold[] = [];
  applyNowState!: IApplyNowState;
  detail!: IhouseholdSnapDisability;
  data: any;
  indexExpanded = -1;
  displayError: boolean = false
  selectedUserids: string[] = [];
  sevicesselected: any[] = [];
  // householdBenefitCoverage: HouseholdBenefitCoverage;
  householdSnapDisabilityForm: FormGroup | any;
  householdMembers: any[] = [];
  error = "Please select atleast one person";
  constructor(
    public householdFormDataService: HouseholdFormDataService,
    private fb: FormBuilder,
    private service: ApplyNowStoreService,
    private router: Router,
    private cd: ChangeDetectorRef, private queueService: ScreenQueueUtil,
    private routingStratagy: ApplyNowHouseholdSnapDisabilityStrategy,

  ) {
    // this.householdBenefitCoverage =
    //   householdFormDataService.householdBenefitCoverage;
  }

  ngOnInit(): void {
    this.householdSnapDisabilityForm = this.fb.group({
      isPermenantDisability: [''],
      isage60permenantlydisabled: [''],
      earningsfordisabled: ['']

    })
    this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      this.data = this.applyNowState.metaData;
      this.detail = this.applyNowState.houseHoldDetails.householdSnapDisbility as IhouseholdSnapDisability;

      of(true).pipe(delay(10)).subscribe(() => {
        this.householdSnapDisabilityForm.patchValue({
          isPermenantDisability: this.detail?.isPermenantDisability,
          isage60permenantlydisabled: this.detail?.isage60permenantlydisabled,
          earningsfordisabled: this.detail?.earningsfordisabled

        })
      });
      this.cd.detectChanges();
    });
  }


  private addIndividualsToForm(data: any) {
    data?.forEach(() => {
      if (this.individualFormArray)
        return this.individualFormArray.push(new FormControl())
    });
  }
  get f() { return this.householdSnapDisabilityForm.controls; }
  get individualFormArray(): FormArray {
    return this.f.id as FormArray;
  }

  areProgramsExist(selectedPrograms: any[], conditionalPrograms: string[]) {

    if (selectedPrograms.length == 0) return false;

    return conditionalPrograms.every(value => {

      return selectedPrograms.indexOf(value) !== -1;

    });

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


  onSubmit() {
    if (this.householdSnapDisabilityForm.get("isPermenantDisability").value === "no"){
      this.householdSnapDisabilityForm.get("isage60permenantlydisabled").setValue("no");
      this.householdSnapDisabilityForm.get("earningsfordisabled").setValue("no");
    }

    if (this.householdSnapDisabilityForm.valid) {
      const storeHouseholdSnapDisability = this.applyNowState?.houseHoldDetails;
      const storedHouseHoldSnapDisability = this.applyNowState?.houseHoldDetails.householdSnapDisbility;
      const updatedHouseholdSnapDisability = {
        ...storedHouseHoldSnapDisability, householdSnapDisbility: this.householdSnapDisabilityForm.value
      }

      this.service.updateHouseHoldDetails({
        ...storeHouseholdSnapDisability, ...updatedHouseholdSnapDisability
      })
      this.queueService.next();
      return true;
    }
    else {
      this.displayError = true;
      return false;
    }

  }

  previous() {
    //this.router.navigate([this.routingStratagy.previousRoute()]);
    this.queueService.back();
  }


}