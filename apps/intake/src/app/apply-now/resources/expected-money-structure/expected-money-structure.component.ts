import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output, Input, ChangeDetectorRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplyNowExpectedMoneyStructureStrategy } from '../../../shared/route-strategies/apply-now/expected-money-structure';
import { ApplyNowStoreService } from '../../apply-now-store-service';
// import { ApplyNowStoreService } from '../../apply-now-store-service';
import { ScreenQueueUtil } from '../../../shared/services/screen_queue_util.service';
import { IExpectingMoney, IHouseHold, IHouseHoldDetails } from '../../household/household-model';
import { IApplyNowState } from '../../+state/apply-now.models';



@Component({
  selector: 'compass-ui-expected-money-structure',
  templateUrl: './expected-money-structure.component.html',
  styleUrls: ['./expected-money-structure.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApplyNowExpectedMoneyStructureStrategy]
})
export class ExpectedMoneyStructureComponent implements OnInit {

  expectedMoneyStructureForm: FormGroup | any;
  houseHoldDetails!: IHouseHoldDetails;
  houseHoldPersons: IHouseHold[] = [];
  applyNowState: IApplyNowState | undefined;
  fragment = "new";
  // service: any;
  constructor(private fb: FormBuilder,
    private service: ApplyNowStoreService,
    private cd: ChangeDetectorRef,
    private routingStrategy: ApplyNowExpectedMoneyStructureStrategy,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private screenQueueUtil: ScreenQueueUtil
  ) { }

  ngOnInit(): void {

    this.expectedMoneyStructureForm = this.fb.group({
      description: [""],
      value: [""],
      date: [""]

    })
    this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      this.houseHoldDetails = this.service.getHouseHoldDetails;
      if (this.houseHoldDetails.houseHoldPersons) {
        this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
      }
      this.cd.detectChanges;
    });

    this.activatedRoute.fragment.subscribe((fragment) => {
      this.fragment = fragment || "new";
      if (this.fragment !== "new") {
        this.setFormValues(this.fragment);
      }
    });
  }
  setFormValues(fragment: any) {
    if (
      this.houseHoldDetails?.resources?.anyoneExpectingAnyResources &&
      this.houseHoldDetails?.resources.anyoneExpectingAnyResources.expectingMoneyCollection
      && this.houseHoldDetails?.resources.anyoneExpectingAnyResources.expectingMoneyCollection[fragment]
    ) {
      this.expectedMoneyStructureForm.patchValue(
        this.houseHoldDetails.resources.anyoneExpectingAnyResources.expectingMoneyCollection[fragment]
      );
    }
  }

  private updateExpectedMoneyResource(recentExpectedResource: IExpectingMoney): IExpectingMoney {

    recentExpectedResource.description = this.expectedMoneyStructureForm.get("description").value;
    recentExpectedResource.value = this.expectedMoneyStructureForm.get("value").value;
    recentExpectedResource.date = this.expectedMoneyStructureForm.get("date").value;
    return recentExpectedResource;
  }

  goBack() {
    this.screenQueueUtil.back();
  }

  goNext() {

    const existingHouseHoldDetails = this.houseHoldDetails;
    const resources = { ...existingHouseHoldDetails.resources };
    let anyOneExpectingResource = { ...resources.anyoneExpectingAnyResources };
    let expectingMoneyDetails = anyOneExpectingResource.expectingMoneyCollection || [];
    let recentExpectedMoneyDetail: IExpectingMoney;
    let updatedResources;

    if (this.fragment === "new") {
      recentExpectedMoneyDetail = {};
      recentExpectedMoneyDetail = this.updateExpectedMoneyResource(recentExpectedMoneyDetail);
      expectingMoneyDetails = [...expectingMoneyDetails, ...[recentExpectedMoneyDetail]]
    } else {
      expectingMoneyDetails = expectingMoneyDetails.map((detail, i) => {
        if (i === parseInt(this.fragment)) {
          recentExpectedMoneyDetail = { ...detail };
          recentExpectedMoneyDetail = this.updateExpectedMoneyResource(recentExpectedMoneyDetail);
          return { ...recentExpectedMoneyDetail };
        } else {
          return { ...detail }
        }
      });
    }

    anyOneExpectingResource = { ...anyOneExpectingResource, ...{ code: "Yes" }, ...{ expectingMoneyCollection: [...expectingMoneyDetails] } }
    updatedResources = { ...resources, ...{ anyoneExpectingAnyResources: anyOneExpectingResource } }

    if (existingHouseHoldDetails)
      this.service.updateHouseHoldDetails({
        ...existingHouseHoldDetails,
        ...{ resources: updatedResources },
      });

    this.router.navigate([this.routingStrategy.nextRoute()]);
  }

  errorMap(fieldName: string) {
    switch(fieldName) {
      case "date": {
        if (this.expectedMoneyStructureForm.get(fieldName)?.errors?.duetInvalidDate) {
          return "duetInvalidDate"
        }
        return ""
      }
      default: return ""
    }
  }
}
