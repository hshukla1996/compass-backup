import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select } from '@ngrx/store';
import { IApplyNowState } from '../../+state/apply-now.models';
import { RoutePath } from '../../../shared/route-strategies';
import { UtilService } from '../../../shared/services/util.service';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IAnyoneHaveCash, ICash, IHouseHold, IHouseHoldDetails, IResources } from '../../household/household-model';
import { ApplyNowFinancialHoldingsStrategy } from '../../../shared/route-strategies/apply-now/financial-holdings';
import { ScreenQueueUtil } from '../resources-gatepost/resources-gatepost.path';
@Component({
  selector: 'compass-ui-financial-holdings',
  templateUrl: './financial-holdings.component.html',
  styleUrls: ['./financial-holdings.component.scss'],
  providers: [ApplyNowFinancialHoldingsStrategy]
})
export class FinancialHoldingsComponent implements OnInit {

  financialHoldingsForm: FormGroup | any;
  householdPersons: IHouseHold[] = [];
  applyNowState!: IApplyNowState;
  houseHoldDetails!: IHouseHoldDetails;
  displayError: boolean = false;

  fragment = "new";
  //screenQueueUtil: any;

  constructor(private fb: FormBuilder,
    private service: ApplyNowStoreService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private utilService: UtilService,
    private activatedRoute: ActivatedRoute,
    private routingStrategy: ApplyNowFinancialHoldingsStrategy,
    private queueService: ScreenQueueUtil,

  ) { }

  ngOnInit(): void {
    this.buildInitialForm();

    this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      this.houseHoldDetails = this.service.getHouseHoldDetails;
      this.householdPersons = this.applyNowState.houseHoldDetails?.houseHoldPersons || [];
      this.cd.detectChanges();
    });

    this.activatedRoute.fragment.subscribe((fragment) => {
      this.fragment = fragment || "new";
      if (this.fragment !== "new") {
        this.setupCheckboxFromState();
      }
    });
  }

  get financialHoldingOwners(): FormArray {
    return <FormArray>this.financialHoldingsForm.controls['financialHoldingOwners'];
  }

  private buildInitialForm(): void {
    this.financialHoldingsForm = this.fb.group({
      financialHoldingOwners: this.fb.array([]),
      isSomeoneOutsideHousehold: [""],
      ownerName: [""],
    })
  }

  private setupCheckboxFromState() {
    let cashResources = this.houseHoldDetails.resources?.anyoneHaveCash?.cashCollection
    if (cashResources && cashResources.length > 0) {
      cashResources[parseInt(this.fragment)].owner?.forEach(owner => {
        this.financialHoldingOwners.push(new FormControl(owner))
      });
    }

  }

  getIndex(value: string): number {
    return this.financialHoldingOwners.controls.findIndex(ctrl => ctrl.value == value);
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

  outsideOfHousedholdChanged(data: any) {
    if (data.checked) {
      this.financialHoldingsForm.patchValue({
        "isSomeoneOutsideHousehold": true
      });
    } else {
      this.financialHoldingsForm.patchValue({
        "isSomeoneOutsideHousehold": false
      });
    }
  }

  onCheckboxChange(personId: number, data: any) {
    if (data.checked) {
      this.financialHoldingOwners.push(new FormControl(personId));
    }
    else {
      let resourceIndex = this.getIndex(personId.toString())
      if (resourceIndex > -1) {
        this.financialHoldingOwners.removeAt(resourceIndex);
      }
    }
  }

  getFinancialHoldingState(personId: number): boolean {
    let index = this.getIndex(personId.toString())
    if (index > -1) {
      return true;
    } else {
      return false;
    }
  }

  goBack() {
    this.router.navigate([this.routingStrategy.previousRoute()], { fragment: this.fragment });
  }

  goNext() {
     this.service.validateAllFormFields(this.financialHoldingsForm);
    if (this.financialHoldingsForm.valid) {

      const selectedUserIds: string[] = [];
      const existingHouseHoldDetails = this.houseHoldDetails;
      const resources = { ...existingHouseHoldDetails.resources };
      let anyoneHaveCash = { ...resources.anyoneHaveCash };
      let cashDetails = anyoneHaveCash.cashCollection || [];
      let recentCashResource: ICash;
      let updatedResources;
      this.financialHoldingsForm.value.financialHoldingOwners.forEach((person: any) => {
        selectedUserIds.push(person)
      });''

      cashDetails = cashDetails.map((detail, i) => {
        if (i === parseInt(this.fragment)) {

          recentCashResource = { ...detail };
          recentCashResource.owner = [...selectedUserIds]

          if (this.financialHoldingsForm.get("isSomeoneOutsideHousehold").value) {
            recentCashResource.ownerName = this.financialHoldingsForm.get("ownerName").value;
          } else {
            recentCashResource.ownerName = "";
          }
          return { ...recentCashResource };
        } else {
          return { ...detail }
        }
      });

      anyoneHaveCash = { ...anyoneHaveCash, ...{ cashCollection: [...cashDetails] } }
      updatedResources = { ...resources, ...{ anyoneHaveCash:anyoneHaveCash } }

      if (existingHouseHoldDetails)
        this.service.updateHouseHoldDetails({
          ...existingHouseHoldDetails,
          ...{ resources: updatedResources },
        });

      this.router.navigate([this.routingStrategy.nextRoute()]);
      return true;
    }
    else {
      return false;
    }

  }

}