import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MenuItemState } from '../../../shared/menu-item-state';
import { IApplyNowState } from '../../+state/apply-now.models';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { RoutePath } from '../../../shared/route-strategies';
import { HouseholdFormDataService } from '../services/household-form-data.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import  HouseholdOutSidePersonData from '../../household/household-outside-person/household-outside-person.json';
import { IHouseHold } from '../../household/household-model';
import { HouseholdOutsidePersonCon } from "../models/householdOutsidePerson";
import { ApplyNowHouseholdOutsidePersonStrategy } from "../../../shared/route-strategies/apply-now/householdOutsidePerson";
import { FormArray, FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'compass-ui-household-outside-person',
  templateUrl: './household-outside-person.component.html',
  styleUrls: ['./household-outside-person.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApplyNowHouseholdOutsidePersonStrategy]
})
export class HouseholdOutsidePersonComponent implements OnInit {
  @ViewChild('householdOutsidePersonFormEle') householdOutsidePersonFormEle: any;
  routePath: typeof RoutePath = RoutePath;
  householdHead!: IHouseHold;
  householdPersons: IHouseHold[] = [];
  householdOutsidePersonCon: HouseholdOutsidePersonCon;
  @Output() dataUpdated = new EventEmitter<any>();
  @Output() formState = new EventEmitter<MenuItemState>();
  data: any;
  public age: any;
  public expanded = false;
  applyNowState!: IApplyNowState;
  private formSubmitAttempt: boolean = false;
  private eventsSubscription: Subscription | undefined;
  submitted = false;

  householdOutsidePersonForm: FormGroup | any;
  displayError: boolean = false;
  error: string = "No one in the household is selected."
  indexExpanded = -1;
  index = 1;
  selectedUserids: string[] = [];
  householdMembers: any[] = [];
  lessequal20: boolean = false;
  householdOutsidePersonJsonData: any;

  constructor(private fb: FormBuilder, private store: Store<any>, private service: ApplyNowStoreService, private cd: ChangeDetectorRef,
    private routingStrategy: ApplyNowHouseholdOutsidePersonStrategy,
    private router: Router, public householdFormDataService: HouseholdFormDataService
  ) {
    this.householdOutsidePersonCon = householdFormDataService.householdOutsidePersonCon;
  }

  ngOnInit(): void {
    this.householdOutsidePersonForm = this.fb.group({
      id: this.fb.array([]),
    });
    this.householdOutsidePersonJsonData = HouseholdOutSidePersonData;
    this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      this.householdHead = this.applyNowState.houseHoldDetails?.householdHead;
      this.householdPersons = this.applyNowState.houseHoldDetails?.houseHoldPersons || [];
      this.cd.detectChanges();
    });
    console.log("householdhead", this.householdHead)
    console.log("householdpersonsss", this.householdPersons)

    if (this.applyNowState.houseHoldDetails) {
      this.householdMembers = this.householdPersons;
      this.householdMembers = this.householdPersons.filter((p) => p.id !== parseInt(this.applyNowState.houseHoldDetails?.HeadofHousehold));
      this.applyNowState.houseHoldDetails.houseHoldPersons!.forEach((person) => {
        if (person.IsThisIndividualOutsideHousehold === "Y") {
          this.selectedUserids.push(person.id!.toString())
        }
      })
      this.addIndividualsToForm(this.householdMembers)
    }
    if (this.householdMembers.length >= 20) {
      this.lessequal20 = true;
    }
    else {
      this.lessequal20 = false;
    }
  }
  private addIndividualsToForm(data: any) {
    data?.forEach(() => {
      if (this.individualFormArray)
        return this.individualFormArray.push(new FormControl())
    });
  }
  get f() { return this.householdOutsidePersonForm.controls; }
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

  public showNextPage(selectedUserids: any) {
    this.selectedUserids = selectedUserids;
    console.log(this.selectedUserids)
    this.router.navigate([this.routingStrategy.nextRoute()]);
  }

  public showPreviousPage() {
    this.router.navigate([this.routingStrategy.previousRoute()]);
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

   addPerson() {
    this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDANOTHERPERSON]);
  }

  onSubmit(): boolean {

    const storeHouseholdDetails = this.applyNowState.houseHoldDetails;
    const clonedUpdatedPerson: IHouseHold[] = [];
    storeHouseholdDetails.houseHoldPersons?.forEach((person, index) => {
      const clonedPerson = { ...person };
      if (this.selectedUserids.indexOf(clonedPerson.id!.toString()) > -1) {
        clonedPerson.IsThisIndividualOutsideHousehold = 'Y';
      }
      else {
        clonedPerson.IsThisIndividualOutsideHousehold = 'N';
      }
      clonedUpdatedPerson.push(clonedPerson);
    })
    this.service.updateHouseHoldDetails({ ...storeHouseholdDetails, ...{ houseHoldPersons: clonedUpdatedPerson } })

    this.router.navigate([this.routingStrategy.nextRoute()]);
    return true;
  }

  previous() {
    this.router.navigate([this.routingStrategy.previousRoute()]);
  }
  ngOnDestroy(): void {
    this.dataUpdated.emit(this.householdOutsidePersonForm.value);
    // this.formState.emit(MenuItemState.COMPLETED);
  }
}
