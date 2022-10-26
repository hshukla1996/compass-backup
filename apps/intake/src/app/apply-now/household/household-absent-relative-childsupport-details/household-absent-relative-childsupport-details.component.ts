import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IApplyNowState, Programs } from '../../+state/apply-now.models';
import { AppStoreService } from '../../../app-store-service';
import { ApplyNowHouseholdAbsentRelativeChildsupportScreenStrategy } from '../../../shared/route-strategies/apply-now/household-absent-relative-childsupport-screen';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { delay, first, of, Subscription } from 'rxjs';
import { IAbsentRelative, IAbsentRelativeChildSupportDetails, IHouseHold, PageDirection } from '../household-model';
import { UtilService } from '../../../shared/services/util.service';
import { RoutePath } from '../../../shared/route-strategies';
import { ScreenQueueUtil } from "../../../shared/services/screen_queue_util.service";
import { Utility } from '../../../shared/utilities/Utility';
@Component({
  selector: 'compass-ui-household-absent-relative-childsupport-details',
  templateUrl: './household-absent-relative-childsupport-details.component.html',
  styleUrls: ['./household-absent-relative-childsupport-details.component.scss'],
  providers: [ApplyNowHouseholdAbsentRelativeChildsupportScreenStrategy]
})
export class HouseholdAbsentRelativeChildsupportDetailsComponent implements OnInit {
  absentRelativeChildSupportDetailsForm: FormGroup | any;
  applyNowState!: IApplyNowState;
  data: any;
  detail!: IAbsentRelativeChildSupportDetails;
  maxDateRange: any;
  electricCompaniesList: any;
  householdHead!: IHouseHold;
  householdPersons: IHouseHold[] = [];
  selectedUserids: string[] = [];
  payList: any;
  selectedUsers: Array<any> = []
  currentServicesMap: any;
  householdMembers: IHouseHold[] = [];
  currentUserIndex!: any;
  currentUser: IAbsentRelative = {};
  absentRelatives: IAbsentRelative[] = [];
  visit: boolean = false;
  visitCount: any;
  programSelected: any;
  showRequired = false;
  isDateValid = true;

  constructor(
    private fb: FormBuilder,
    private routingStrategy: ApplyNowHouseholdAbsentRelativeChildsupportScreenStrategy,
    private router: Router,
    private appService: AppStoreService,
    private queueService: ScreenQueueUtil,
    private service: ApplyNowStoreService,
    private cd: ChangeDetectorRef,
    private utilService: UtilService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const memberId = this.activatedRoute.snapshot.paramMap.get("userId");
    const x = sessionStorage.getItem("storageId");
    this.maxDateRange = new Date().toISOString().slice(0, 10);
    this.absentRelativeChildSupportDetailsForm = this.fb.group({
      id: x,
      courtOrder: [''],
      voluntryPay: [''],
      voluntryPayOften: [''],
      voluntryWhenDidTheyPay: ['', Utility.dateMaxValidator()],
      voluntryWhomToPay: [''],
      courtNumber: [''],
      courtName: [''],
      courtOrderedPay: [''],
      courtOrderedPayOften: [''],
      courtOrderedWhenDidTheyPay: ['', Utility.dateMaxValidator()],
      courtOrderedWhomPayTo: ['']
    });

    this.appService.getPay().subscribe((pay) => {
      this.payList = pay;
      this.cd.detectChanges();
    });
    this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      this.programSelected = this.applyNowState?.programSelection?.programs || [];
      if (this.programSelected.indexOf(Programs.CA) > -1 ||
        this.programSelected.indexOf(Programs.CAR) > -1) {
        this.showRequired = true;
      }

      this.householdHead = this.applyNowState.houseHoldDetails?.householdHead;
      this.householdPersons = this.applyNowState.houseHoldDetails?.houseHoldPersons || [];
      this.currentServicesMap =
        {

          ...this.applyNowState.houseHoldDetails.pageAction

            ?.absentRelativeMap,

        } || {};


      this.activatedRoute.params.
        subscribe((p) => {
          if (Object.keys(p).length === 0) {

            if (this.utilService.isFirstRoute(this.currentServicesMap)) {
              this.currentUserIndex = Object.keys(this.currentServicesMap)[0]
            }

            else if (this.utilService.isLastRoute(this.currentServicesMap)) {

              this.currentUserIndex = Object.keys(this.currentServicesMap)[

                Object.keys(this.currentServicesMap).length - 1

              ];

            }

          }

          else {

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

      this.cd.detectChanges();
    });

    this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      this.data = this.applyNowState.metaData;
      if (this.applyNowState.houseHoldDetails.absentRelative) {
        this.absentRelatives = this.applyNowState.houseHoldDetails.absentRelative;
      }
      const childSupportDetails=
        this.absentRelatives.filter(
          (person) => person.id?.toString() === x
        );

      this.currentUser = this.extractUser(this.absentRelatives, this.currentUserIndex) || "";

      this.absentRelativeChildSupportDetailsForm.get('courtOrder').patchValue(this.currentUser.childSupport?.courtOrderedOrVoluntary)
      this.absentRelativeChildSupportDetailsForm.get('voluntryPay').patchValue(this.currentUser.childSupport?.voluntaryChildSupportAmount)
      this.absentRelativeChildSupportDetailsForm.get('voluntryPayOften').patchValue(this.currentUser.childSupport?.VoluntaryChildSupportAmountFrequency)
      this.absentRelativeChildSupportDetailsForm.get('voluntryWhenDidTheyPay').patchValue(Utility.duetFormatDate(this.currentUser.childSupport?.lastDatePaidVoluntaryChildSupport))
      this.absentRelativeChildSupportDetailsForm.get('voluntryWhomToPay').patchValue(this.currentUser.childSupport?.voluntaryChildSupportPaidToWhom)
      this.absentRelativeChildSupportDetailsForm.get('courtNumber').patchValue(this.currentUser.childSupport?.courtOrder?.courtOrderNumber)
      this.absentRelativeChildSupportDetailsForm.get('courtName').patchValue(this.currentUser.childSupport?.courtOrder?.courtName)
      this.absentRelativeChildSupportDetailsForm.get('courtOrderedPay').patchValue(this.currentUser.childSupport?.courtOrder?.courtOrderChildSupportAmount)
      this.absentRelativeChildSupportDetailsForm.get('courtOrderedPayOften').patchValue(this.currentUser.childSupport?.courtOrder?.courtOrderChildSupportAmountFrequency)
      this.absentRelativeChildSupportDetailsForm.get('courtOrderedWhenDidTheyPay').patchValue(Utility.duetFormatDate(this.currentUser.childSupport?.courtOrder?.courtOrderDate))
      this.householdMembers = this.householdPersons
      this.selectedUsers = [];

      for (let x = 0; x < this.householdMembers.length; x++) {
            this.selectedUsers.push({ id: this.householdMembers[x]['id'], name: this.householdMembers[x]['firstName'] + " " + this.householdMembers[x]['lastName']});
      }

      this.cd.detectChanges();
    });
  }

  extractUser(persons: any, userId: any) {
    const currentUser = persons.filter((person: IAbsentRelative) => {
      return person.id?.toString() === sessionStorage.getItem("storageId");
    })[0];
    return currentUser;
  }

  isFieldValid(field: string): boolean {
    if (this.absentRelativeChildSupportDetailsForm.get(field).status !== "VALID") {
    }
    return (
      this.absentRelativeChildSupportDetailsForm.get(field).status !== "VALID" &&
      this.absentRelativeChildSupportDetailsForm.get(field).touched
    );
  }
  errorMap(field: string) {
    if (!this.isFieldValid(field)) {
      return "";
    }
    switch (field) {
      case "courtOrderedWhenDidTheyPay":
         if (this.absentRelativeChildSupportDetailsForm.get('courtOrderedWhenDidTheyPay').errors?.invalidDate) {
            return 'Date must be in the past.'
        }
        if (this.absentRelativeChildSupportDetailsForm.get("courtOrderedWhenDidTheyPay").errors.duetInvalidDate) {
            return "duetInvalidDate";
        }
        break;
      case "voluntryWhenDidTheyPay":
        if (this.absentRelativeChildSupportDetailsForm.get('voluntryWhenDidTheyPay').errors?.invalidDate) {
            return 'Date must be in the past.'
        }
        if (this.absentRelativeChildSupportDetailsForm.get("voluntryWhenDidTheyPay").errors.duetInvalidDate) {
            return "duetInvalidDate";
        }
        break;
      default:
        return "";

    }

    return "";
  }

  onSubmit(): boolean {
    let isNextPage = false;
    this.currentServicesMap[this.currentUserIndex] = true;
    if (this.absentRelativeChildSupportDetailsForm.valid) {
      const houeholdDetails = this.applyNowState?.houseHoldDetails;

      const updatedAbsentRelative = {
        id: this.absentRelativeChildSupportDetailsForm.controls['id'].value,
        courtOrder: this.absentRelativeChildSupportDetailsForm.controls['courtOrder'].value,

        payForChildSupport: houeholdDetails.absentRelativeChildSupport.childsupport?.charAt(0),
        courtOrderedOrVoluntary: this.absentRelativeChildSupportDetailsForm.controls['courtOrder'].value,
        voluntaryChildSupportAmount: this.absentRelativeChildSupportDetailsForm.controls['voluntryPay'].value,
        VoluntaryChildSupportAmountFrequency: this.absentRelativeChildSupportDetailsForm.controls['voluntryPayOften'].value,
        lastDatePaidVoluntaryChildSupport: this.absentRelativeChildSupportDetailsForm.controls['voluntryWhenDidTheyPay'].value,
        voluntaryChildSupportPaidToWhom: this.absentRelativeChildSupportDetailsForm.controls['voluntryWhomToPay'].value,

      }
      const updatedAbsentRelativecourtDetails ={
        id: this.absentRelativeChildSupportDetailsForm.controls['id'].value,
        courtName: this.absentRelativeChildSupportDetailsForm.controls['courtName'].value,
        courtOrderNumber: this.absentRelativeChildSupportDetailsForm.controls['courtNumber'].value,
        courtOrderChildSupportAmount: this.absentRelativeChildSupportDetailsForm.controls['courtOrderedPay'].value,
        courtOrderDate: this.absentRelativeChildSupportDetailsForm.controls['courtOrderedWhenDidTheyPay'].value,
        courtOrderChildSupportAmountFrequency: this.absentRelativeChildSupportDetailsForm.controls['courtOrderedPayOften'].value,
        specialTerms: this.absentRelativeChildSupportDetailsForm.controls['courtOrderedWhomPayTo'].value,

      }

      const storedHouseholdDetails = this.applyNowState?.houseHoldDetails;
      const updatedHouseholdPersons = this.applyNowState?.houseHoldDetails.absentRelative?.map((person: IAbsentRelative) => {
        if (person.id === this.currentUser.id) {

          const personToBeUpdated = { ...person };
          personToBeUpdated.childSupport = updatedAbsentRelative;
          personToBeUpdated.childSupport.courtOrder = updatedAbsentRelativecourtDetails;
          return personToBeUpdated;
        }
        else {
          return person;
        }
      });

      const updatedPageAction = {
        ...houeholdDetails.pageAction,
        absentRelativeMap: {
          ...houeholdDetails.pageAction, ...{ absentRelativeMap: this.currentServicesMap }
        }
      }

      if (storedHouseholdDetails) {
        this.service.updateHouseHoldDetails(
          { ...storedHouseholdDetails, ...{ absentRelative: updatedHouseholdPersons }, pageAction: updatedPageAction }
        )
      }

      if (this.currentServicesMap != null) {

        isNextPage = this.utilService.isNextPage(this.currentServicesMap);
      }
      if (isNextPage) {
        this.utilService

          .getCurrentUserIdPageAction(this.currentServicesMap, PageDirection.NEXT)

          .subscribe((id: any) => {

              this.currentUserIndex = id.toString();

            this.router.navigate([RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDABSENTRELATIVESUMMARY,
              { userId: this.currentUserIndex }])

            });

      } else {
        //Next to pagequeue
        this.router.navigate([
          RoutePath.APPLYNOW +
          '/' + RoutePath.APPLYNOW_HOUSEHOLD +
          '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDABSENTRELATIVESUMMARY]);
      }
      return true;
    }
    return false;
  }
  previous() {
    this.currentServicesMap[this.currentUserIndex] = false;
    const storeHouseholdDetails = this.applyNowState.houseHoldDetails;
    const updatedPageAction = {
      ...storeHouseholdDetails.pageAction,
      absentRelativeMap: { ...storeHouseholdDetails.pageAction?.absentRelativeMap, ...this.currentServicesMap },

      serviceDirection: PageDirection.NEXT
    };
    this.service.updateHouseHoldDetails({ ...storeHouseholdDetails, ...{ pageAction: updatedPageAction } })
    if (

      Object.keys(this.currentServicesMap)[0].toString() !==

      this.currentUserIndex.toString()

    ) {
      this.utilService
        .getCurrentUserIdPageAction(
          this.currentServicesMap,
          PageDirection.BACK,
        )
        .subscribe((id: any) => {
          this.currentUserIndex = id.toString();
          this.router.navigate([
            this.routingStrategy.currentRoute,
            { userId: this.currentUserIndex },
          ]);
        });


      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDABSENTRELATIVECHILDSUPPORT]);

    } else {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_HOUSEHOLD + '/' + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDABSENTRELATIVECHILDSUPPORT]);
    }

  }
}




