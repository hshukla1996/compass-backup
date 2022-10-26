import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output, Input, ChangeDetectorRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, of } from 'rxjs';
import { IApplyNowState } from '../../+state/apply-now.models';
import { AppStoreService } from '../../../app-store-service';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowResourcesClosedOrEmptiedAccountDetailsStrategy } from '../../../shared/route-strategies/apply-now/closed-or-emptied-account-details';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IClosedEmptyAccountDetails, IClosedEmptyAccounts, IHouseHold, IHouseHoldDetails, IResources } from '../../household/household-model';
import { ScreenQueueUtil } from '../resources-gatepost/resources-gatepost.path';

@Component({
  selector: 'compass-ui-closed-or-emptied-account-details',
  templateUrl: './closed-or-emptied-account-details.component.html',
  styleUrls: ['./closed-or-emptied-account-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApplyNowResourcesClosedOrEmptiedAccountDetailsStrategy]
})
export class ClosedOrEmptiedAccountDetailsComponent implements OnInit {

  closedOrEmptiedAccountDetailsForm: FormGroup | any;
  public requiredFields = [] as string[];
  public states: any;
  householdPersons: IHouseHold[] = [];
  applyNowState!: IApplyNowState;
  houseHoldDetails!: IHouseHoldDetails;

  submitted = false;
  fragment = "new";

  constructor(private fb: FormBuilder,
    private service: ApplyNowStoreService,
    private cd: ChangeDetectorRef,
    private routingStrategy: ApplyNowResourcesClosedOrEmptiedAccountDetailsStrategy,
    private router: Router,
    private appService: AppStoreService,
    private screenQueueUtil: ScreenQueueUtil,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.closedOrEmptiedAccountDetailsForm = this.fb.group({
      accountType: [''],
      location: [''],
      accountNumber: [''],
      accountClosingDate: [''],
    });

    this.appService.getStates().subscribe((states) => {
      this.states = states;
      this.cd.detectChanges();
    });

    this.service.getAppData().subscribe((d) => {
      this.applyNowState = { ...d };
      this.houseHoldDetails = this.service.getHouseHoldDetails;
      this.householdPersons = this.applyNowState.houseHoldDetails?.houseHoldPersons || [];
      this.cd.detectChanges();
    });

    this.activatedRoute.fragment.subscribe((fragment) => {
      this.fragment = fragment || "new";
      if (this.fragment !== "new") {
        of(true).pipe(delay(10)).subscribe(() => {
          let accountDetails = this.houseHoldDetails.resources?.anyoneHaveClosedDetails?.accountDetails
          if (accountDetails && accountDetails.length > 0) {
            this.closedOrEmptiedAccountDetailsForm.patchValue({
              accountType: accountDetails[parseInt(this.fragment)].accountType,
              location: accountDetails[parseInt(this.fragment)].location,
              accountNumber: accountDetails[parseInt(this.fragment)].accountNumber,
              accountClosingDate: accountDetails[parseInt(this.fragment)].accountDateClosedDate,
            });
          }
        });
      }
    });
  }

  goBack() {
    this.screenQueueUtil.back();
  }

  goNext(): void {
    if (this.closedOrEmptiedAccountDetailsForm.valid) {
      let fragmentToAddDetails = 0;
      const existingAccountDetails = { ...this.houseHoldDetails.resources?.anyoneHaveClosedDetails };

      let updatedAccountDetails: IClosedEmptyAccounts;
      let updatedResources: IResources;

      if (this.fragment === "new") {
        const listOfAccountDetails = [] as IClosedEmptyAccountDetails[]
        let cash: IClosedEmptyAccountDetails = {};
        cash.accountDateClosedDate = this.closedOrEmptiedAccountDetailsForm.get('accountClosingDate')?.value;
        cash.accountNumber = this.closedOrEmptiedAccountDetailsForm.get('accountNumber')?.value;
        cash.accountType = this.closedOrEmptiedAccountDetailsForm.get('accountType')?.value;
        cash.location = this.closedOrEmptiedAccountDetailsForm.get('location')?.value;
        listOfAccountDetails.push(cash);

        updatedAccountDetails = {
          ...existingAccountDetails,
          ...{ code: "Yes" },
          ...{ accountDetails: [...existingAccountDetails.accountDetails || [], ...listOfAccountDetails] }
        };

        updatedResources = { ...this.houseHoldDetails.resources, ...{ anyoneHaveClosedDetails: updatedAccountDetails } };

        fragmentToAddDetails = updatedResources.anyoneHaveClosedDetails?.accountDetails ?
          (updatedResources.anyoneHaveClosedDetails.accountDetails.length) - 1 : 0

      } else {

        let existingResources = [] as IClosedEmptyAccountDetails[];
        if (existingAccountDetails && existingAccountDetails.accountDetails && existingAccountDetails.accountDetails.length > 0) {
          existingResources = [...existingAccountDetails.accountDetails];
          existingAccountDetails.accountDetails.forEach((resource, i) => {
            if (i === parseInt(this.fragment)) {
              resource = {
                ...resource, ...{
                  accountDateClosedDate: this.closedOrEmptiedAccountDetailsForm.get('accountClosingDate')?.value,
                  accountNumber: this.closedOrEmptiedAccountDetailsForm.get('accountNumber')?.value,
                  accountType: this.closedOrEmptiedAccountDetailsForm.get('accountType')?.value,
                  location: this.closedOrEmptiedAccountDetailsForm.get('location')?.value
                }
              };

              existingResources.splice(parseInt(this.fragment), 1, resource);
            }
          })
        }

        updatedAccountDetails = { ...existingAccountDetails, ...{ accountDetails: [...existingResources] } };

        updatedResources = { ...this.houseHoldDetails.resources, ...{ anyoneHaveClosedDetails: updatedAccountDetails } };
        fragmentToAddDetails = parseInt(this.fragment);

      }

      if (this.houseHoldDetails) {
        this.service.updateHouseHoldDetails(
          { ...this.houseHoldDetails, ...{ resources: updatedResources } }
        )
      }

      this.router.navigate([RoutePath.APPLYNOW +
        '/' + RoutePath.APPLYNOW_RESOURCES +
        '/' + RoutePath.APPLYNOW_RESOURCES_CLOSEDOREMPTIEDACCOUNT],
        { fragment: fragmentToAddDetails.toString() });
    }

  }

  public isFieldValid(field: string): boolean {
    const formField = this.closedOrEmptiedAccountDetailsForm.get(field);
    return (
      formField && this.closedOrEmptiedAccountDetailsForm.get(field).status !== "VALID" &&
      this.closedOrEmptiedAccountDetailsForm.get(field).touched
    );
  }

  public errorMap(field: string) {
    if (!this.isFieldValid(field)) {
      return "";
    }
    switch (field) {
      case "bankName":
        if (
          this.closedOrEmptiedAccountDetailsForm.get("bankName").errors.required
        ) {
          return "The Name of the bank or funeral home is required.";
        }
        if (
          this.closedOrEmptiedAccountDetailsForm.get("bankName").errors.maxlength
        ) {
          return "The Name of the bank or funeral home must be at less than 30 characters long.";
        }
        break;
      case "streetaddress":
        if (
          this.closedOrEmptiedAccountDetailsForm.get("streetaddress").errors.maxlength
        ) {
          return "Street Address must be at less than 26 characters long.";
        }
        break;
      case "streetaddress2":
        if (
          this.closedOrEmptiedAccountDetailsForm.get("streetaddress2").errors.maxlength
        ) {
          return "Street Address 2 must be at less than 26 characters long.";
        }
        break;
      case "city":
        if (
          this.closedOrEmptiedAccountDetailsForm.get("city").errors.maxlength
        ) {
          return "City must be at less than 26 characters long.";
        }
        break;
      case "zipcode":
        if (
          this.closedOrEmptiedAccountDetailsForm.get("zipcode").errors.maxlength
        ) {
          return "zipcode must be at less than 5 characters long.";
        }
        if (
          this.closedOrEmptiedAccountDetailsForm.get("zipcode").errors.pattern
        ) {
          return "Enter only numbers.";
        }
        break;
      case "accountClosingDate": {
        if (this.closedOrEmptiedAccountDetailsForm.get("accountClosingDate").errors.duetInvalidDate) {
          return "duetInvalidDate"
        }
        break;
      }
      default:
        return "";
        break;
    }

    return "";
  }

}
