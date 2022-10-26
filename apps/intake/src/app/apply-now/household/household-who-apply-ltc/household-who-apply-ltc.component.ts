import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MenuItemState } from '../../../shared/menu-item-state';
import { IApplyNowState } from '../../+state/apply-now.models';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { RoutePath } from '../../../shared/route-strategies';
import { HouseholdFormDataService } from '../services/household-form-data.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IHouseHold, PageDirection } from '../../household/household-model';
import { HouseholdWhoApplyLtcCon } from "../models/householdWhoApplyLtcCon";
import { ApplyNowHouseholdWhoApplyLtcStrategy } from "../../../shared/route-strategies/apply-now/householdWhoApplyLtc";
import { FormArray, FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import   HouseholdWhoApplyLtcData from '../../household/household-who-apply-ltc/household-who-apply-ltc.json';
import { UtilService } from '../../../shared/services/util.service';

@Component({
  selector: 'compass-ui-household-who-apply-ltc',
  templateUrl: './household-who-apply-ltc.component.html',
  styleUrls: ['./household-who-apply-ltc.component.scss'],
  providers: [ApplyNowHouseholdWhoApplyLtcStrategy]
})
export class HouseholdWhoApplyLtcComponent implements OnInit {
  @ViewChild('householdWhoApplyLtcFormEle') householdWhoApplyLtcFormFormEle: any;
  routePath: typeof RoutePath = RoutePath;
  householdHead!: IHouseHold;
  householdPersons: IHouseHold[] = [];
  householdWhoApplyLtcCon: HouseholdWhoApplyLtcCon;
  @Output() dataUpdated = new EventEmitter<any>();
  @Output() formState = new EventEmitter<MenuItemState>();
  data: any;
  nursingHomeMap:any={};
  public age: any;
  public expanded = false;
  applyNowState!: IApplyNowState;
  private formSubmitAttempt: boolean = false;
  private eventsSubscription: Subscription | undefined;
  submitted = false;
  householdWhoApplyLtcForm: FormGroup | any;
  displayError: boolean = false;
  error: string = "No one in the household is selected."
  indexExpanded = -1;
  selectedUserids: string[] = [];
  householdMembers: any[] = []
  householdWhoApplyLtcJsonData: any;

  constructor(private fb: FormBuilder, private store: Store<any>,
    private utilService: UtilService,
    private service: ApplyNowStoreService, private cd: ChangeDetectorRef,
    private routingStrategy: ApplyNowHouseholdWhoApplyLtcStrategy,
    private router: Router, public householdFormDataService: HouseholdFormDataService
  ) {
    this.householdWhoApplyLtcCon = householdFormDataService.householdWhoApplyLtcCon;
  }

  ngOnInit(): void {
    this.householdWhoApplyLtcForm = this.fb.group({
      id: this.fb.array([]),
    });
    this.householdWhoApplyLtcJsonData = HouseholdWhoApplyLtcData;
    this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      this.householdHead = this.applyNowState.houseHoldDetails?.householdHead;
      this.householdPersons = this.applyNowState.houseHoldDetails?.houseHoldPersons || [];
      this.cd.detectChanges();
    });

    if (this.applyNowState.houseHoldDetails) {
      this.householdMembers = this.householdPersons.filter(person => person.IsThisIndividualOutsideHousehold !== "Y");
      this.utilService.sortNames(this.selectedUserids, this.householdMembers, 'id').forEach((ind) => {
        if (ind) {

          this.nursingHomeMap[ind] = false;
        }
      })
      this.applyNowState.houseHoldDetails.householdWhoApplyLtc.forEach((ind) => {
        if (ind) {
          this.selectedUserids.push(ind.toString())
        }
      })
      this.addIndividualsToForm(this.householdMembers)
    }
  }

  private addIndividualsToForm(data: any) {
    data?.forEach(() => {
      if (this.individualFormArray)
        return this.individualFormArray.push(new FormControl())
    });
  }

  get f() { return this.householdWhoApplyLtcForm.controls; }
  get individualFormArray(): FormArray {
    return this.f.id as FormArray;
  }

  /**
   * This method will be called on checkbox change
   * @param e
   */
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

  public showNextPage(selectedUserids: any) {
    this.selectedUserids = selectedUserids;
    this.router.navigate([this.routingStrategy.nextRoute()]);
  }

  public showPreviousPage() {
    this.router.navigate([this.routingStrategy.previousRoute()]);
  }

  onSubmit(): boolean {
    if (this.selectedUserids.length > 0) {
      const storeHouseholdDetails = this.applyNowState.houseHoldDetails;
      const updatedHouseholddetails = { householdWhoApplyLtc: this.selectedUserids }
      this.utilService.sortNames(this.selectedUserids, this.householdMembers, 'id').forEach((ind) => {
        if (ind) {

          this.nursingHomeMap[ind] = false;
        }
      })

      const updatedPageAction = {
        ...storeHouseholdDetails.pageAction,
        nursingHomeMap: { ...this.nursingHomeMap },
        serviceDirection: PageDirection.NEXT
      };
      
      this.service.updateHouseHoldDetails({ ...storeHouseholdDetails, ...updatedHouseholddetails, ...{pageAction:updatedPageAction} })
      this.router.navigate([this.routingStrategy.nextRoute()]);
      return true;
    }
    else {
      this.displayError = true;
      return false;
    }
  }

  previous() {
    this.router.navigate([this.routingStrategy.previousRoute()]);
  }
  ngOnDestroy(): void {
    this.dataUpdated.emit(this.householdWhoApplyLtcForm.value);
  }
}
