import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IApplyNowState } from '../../+state/apply-now.models';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowOtherIncomeInfoStrategy } from '../../../shared/route-strategies/apply-now/other-income-info';
import { ScreenQueueUtil } from '../../../shared/services/screen_queue_util.service';
import { UtilService } from '../../../shared/services/util.service';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, IHouseHoldDetails, PageDirection } from '../../household/household-model';

@Component({
  selector: 'compass-ui-other-income',
  templateUrl: './other-income.component.html',
  styleUrls: ['./other-income.component.scss'],
  providers: [ApplyNowOtherIncomeInfoStrategy]
})
export class OtherIncomeComponent implements OnInit {

  otherIncomeForm: FormGroup | any;
  otherIncomeDetailsMap: any[] = [];
  applyNowState!: IApplyNowState;
  householdPersons: IHouseHold[] = [];
  houseHoldDetails!: IHouseHoldDetails;
  fragment = "new";
  selectedData: string[] = [];
  displayError: boolean = false;

  constructor(private fb: FormBuilder,
    private service: ApplyNowStoreService,
    private routeStrategy: ApplyNowOtherIncomeInfoStrategy,
    private cd: ChangeDetectorRef,
    private router: Router,
    private utilService: UtilService,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.buildInitialForm();
    this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      this.houseHoldDetails = this.service.getHouseHoldDetails;
      this.householdPersons = this.applyNowState.houseHoldDetails?.houseHoldPersons || [];
      this.cd.detectChanges();
    });

    this.activatedRoute.fragment.subscribe((fragment) => {
      this.fragment = fragment || "";
      if (this.fragment == "new") {
        this.selectedData = [];
      }

      if (
        typeof this.houseHoldDetails.pageAction.otherIncomeDetailsMap === "object" &&
        this.fragment !== "new"
      ) {
        this.selectedData = Object.keys(
          this.houseHoldDetails.pageAction.otherIncomeDetailsMap
        );
        this.setupCheckboxFromState();
      }
    });
  }

  private setupCheckboxFromState() {
    let checkedList = this.householdPersons;
    let houseHold = this.applyNowState.houseHoldDetails;
    checkedList.forEach((person: any) => {
      if (houseHold?.income?.otherIncome?.individualNumbers?.find(ele => ele === +person.id)) {
        this.IdsWithOtherIncome.push(new FormControl(person.id))
      }
    });
  }

  get IdsWithOtherIncome(): FormArray {
    return <FormArray>this.otherIncomeForm.controls['IdsWithOtherIncome'];
  }

  getIndex(value: number): number {
    return this.IdsWithOtherIncome.controls.findIndex(ctrl => ctrl.value == value);
  }

  onCheckboxChange(personId: number, data: any) {
    if (data.checked) {
      this.IdsWithOtherIncome.push(new FormControl(personId));
      this.displayError = false;
    }
    else {
      let otherIncomeIndex = this.getIndex(personId)
      if (otherIncomeIndex > -1) {
        this.IdsWithOtherIncome.removeAt(otherIncomeIndex);
      }
    }
  }

  private buildInitialForm(): void {
    this.otherIncomeForm = this.fb.group({
      IdsWithOtherIncome: this.fb.array([]),
    })
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

  isPersonHavingOtherIncome(personId: number) {
    let index = this.getIndex(personId)
    if (index > -1) {
      return true;
    } else {
      return false;
    }
  }

  goBack(): void {
    this.router.navigate([this.routeStrategy.previousRoute()]);
  }

  goNext(): void {
    this.service.validateAllFormFields(this.otherIncomeForm);

    const houseHoldDetails = this.applyNowState.houseHoldDetails;
    const selectedUserIds: number[] = [];
    this.otherIncomeForm.value.IdsWithOtherIncome.forEach((person: any) => {
      selectedUserIds.push(person)
    })

    if(selectedUserIds.length === 0){
      this.displayError=true;
      return;
    }

    const existingIncome = {...houseHoldDetails?.income};
    const otherIncomeInfo = { ...existingIncome?.otherIncome };

    this.utilService.sortNames(selectedUserIds, this.householdPersons, 'id').forEach((ind) => {
      if (ind) {
        this.otherIncomeDetailsMap[ind] = false;
      }
    });

    const updatedPageAction = {
      ...houseHoldDetails.pageAction,
      otherIncomeDetailsMap: { ...this.otherIncomeDetailsMap },
      serviceDirection: PageDirection.NEXT
    };

    if (houseHoldDetails) {
      if (selectedUserIds.length > 0) {
        otherIncomeInfo.code = "Yes";
        otherIncomeInfo.individualNumbers = selectedUserIds;
        otherIncomeInfo.endDated = "";
      } else {
        otherIncomeInfo.code = "No";
        otherIncomeInfo.individualNumbers = [];
        otherIncomeInfo.endDated = "";
      }
      const updatedIncome = { ...existingIncome, ...{ otherIncome: otherIncomeInfo } }
     
      this.service.updateHouseHoldDetails(
        { ...houseHoldDetails, ...{income: updatedIncome}, ...{ pageAction: updatedPageAction } }
      )
    }
    this.router.navigate([this.routeStrategy.nextRoute()], { fragment: this.fragment });
  }

}
