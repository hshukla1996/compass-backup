import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output, Input, ChangeDetectorRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IApplyNowState } from '../../+state/apply-now.models';
import { ApplyNowResourceDetailsStrategy } from '../../../shared/route-strategies/apply-now/resource-details';
import { ScreenQueueUtil } from '../../../shared/services/screen_queue_util.service';
import { UtilService } from '../../../shared/services/util.service';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold } from '../../household/household-model';

@Component({
  selector: 'compass-ui-resources-details',
  templateUrl: './resources-details.component.html',
  styleUrls: ['./resources-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApplyNowResourceDetailsStrategy]
})
export class ResourcesDetailsComponent implements OnInit {
  resourceDetailsForm: FormGroup | any;
  currentUser: IHouseHold = {};
  applyNowState!: IApplyNowState;
  householdMembers: IHouseHold[] = [];
  currentUserIndex!: any;
  currentServicesMap: any;

  constructor(private fb: FormBuilder,
    private service: ApplyNowStoreService,
    private cd: ChangeDetectorRef,
    private routingStrategy: ApplyNowResourceDetailsStrategy,
    private router: Router,
    private screenQueueUtil: ScreenQueueUtil,
    private utilService: UtilService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.resourceDetailsForm = this.fb.group({
      typeofresource: ["", Validators.required],
      explanation: ["", [
        this.myFormValidator(() =>
          this.resourceDetailsForm.value.typeofresource.includes('other'),
          Validators.required
        ), Validators.maxLength(26)
      ]],
      location: ["", [Validators.maxLength(60), Validators.pattern('^[a-zA-Z0-9]*$')]],
      accountno: ["", [Validators.maxLength(25), Validators.pattern('^[a-zA-Z0-9`/-]*$')]],
      resourceestimatevalue: ["", [Validators.required, Validators.maxLength(9), Validators.pattern('^[0-9\.]*$')]]

    });
    this.currentServicesMap =
      {

        ...this.applyNowState.houseHoldDetails.pageAction

          ?.financialHoldingsMap,

      } || {};

    this.activatedRoute.params.
      subscribe((p) => {
        console.log(p, "this.p");
        if (Object.keys(p).length === 0) {

          if (this.utilService.isFirstRoute(this.currentServicesMap)) {
            this.currentUserIndex = Object.keys(this.currentServicesMap)[0]
          }

          else if (this.utilService.isLastRoute(this.currentServicesMap)) {

            this.currentUserIndex = Object.keys(this.currentServicesMap)[

              Object.keys(this.currentServicesMap).length - 1

            ];

          }

        }else {

          this.currentUserIndex =

            p.userId || "";

        }

        this.currentUser =
          this.extractUser(

            this.householdMembers,

            this.currentUserIndex

          ) || "";
        this.cd.detectChanges();

      });

  }

  extractUser(persons: any, userId: any) {
    const currentUser = persons.filter((person: IHouseHold) => {
      return person.id?.toString() === userId.toString();
    })[0];
    return currentUser;
  }

  private myFormValidator(predicate: Function, validator: any): any {
    return ((formControl: FormControl) => {
      if (!formControl.parent) {
        return null;
      }
      if (predicate()) {
        return validator(formControl);
      }
      return null;
    });
  }

  goBack() {
    this.screenQueueUtil.backPath();
  }
  goNext() {
    this.service.validateAllFormFields(this.resourceDetailsForm);
    if (this.resourceDetailsForm.valid) {
      this.screenQueueUtil.nextPath();
      return true;
    }
    else {
      return false;
    }
  }
}