import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IApplyNowState, IPregnancySummaryScreenDetails } from '../../+state/apply-now.models';
import { AppStoreService } from '../../../app-store-service';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowIndividualDetailsPregnancyDetailsScreenStrategy } from '../../../shared/route-strategies/apply-now/individual-details-pregnancy-details-screen';
import { UtilService } from '../../../shared/services/util.service';
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, PageDirection } from '../../household/household-model';
import * as ProgramConstants from "../../../shared/constants/Individual_Programs_Constants";
@Component({
  selector: 'compass-ui-pregnancy-details-screen',
  templateUrl: './pregnancy-details-screen.component.html',
  styleUrls: ['./pregnancy-details-screen.component.scss'],
  providers: [ApplyNowIndividualDetailsPregnancyDetailsScreenStrategy]
})
export class PregnancyDetailsScreenComponent implements OnInit, OnDestroy {

  public babiesRequireds: any = [];

  public pregnancySummaryScreenDetailsForm!: FormGroup;

  public details: IPregnancySummaryScreenDetails[] = [];

  @ViewChild('pregnancySummaryScreenDetailsFormEle') pregnancySummaryScreenDetailsFormEle: any;

  @Input() data!: IPregnancySummaryScreenDetails | null;

  private eventsSubscription: Subscription | undefined;

  private formSubmitAttempt: boolean = false;

  private applyNowState: IApplyNowState | undefined;

  private routePath: typeof RoutePath = RoutePath;

  private pregnancyMap: any = {};

  private currentUserIndex!: any;

  public currentUser: IHouseHold = {};

  private householdMembers: IHouseHold[] = [];

  public headFirstName: string | undefined;

  private houseHoldHead!: IHouseHold;

  private houseHoldHeadPersons: IHouseHold[] = [];

  public requiredFields = [] as string[];

  /**
     * constructor of Pregnancy Summary Screen component
     * @param fb 
     */
  constructor(private fb: FormBuilder,
    private service: ApplyNowStoreService,
    private appService: AppStoreService,
    private activatedRoute: ActivatedRoute,
    private utilService: UtilService,
    private routingStrategy: ApplyNowIndividualDetailsPregnancyDetailsScreenStrategy,
    private router: Router) {
  }

  /**
   * Initialising the form with default values
   */
  public ngOnInit() {
    this.pregnancySummaryScreenDetailsForm = this.fb.group({
      pregnancyDueDate: [this.details && this.details.length > 0 ? this.details[0].pregnancyDueDate : ""],
      babiesRequired: [this.details && this.details.length > 0 ? this.details[0].babiesRequired : ""],
    });

    const activatedRoute$ = this.activatedRoute.params.
      subscribe((p) => {
        this.service.getAppData().subscribe(d => {

          this.applyNowState = { ...d };
          this.data = this.applyNowState.metaData;

          this.houseHoldHead = this.applyNowState.houseHoldDetails.householdHead;
          this.houseHoldHeadPersons = this.applyNowState.houseHoldDetails.houseHoldPersons as IHouseHold[];
          this.householdMembers = this.houseHoldHeadPersons;

          this.pregnancyMap = { ...this.applyNowState.houseHoldDetails.pageAction?.pregnancyMap } || {};

          if (Object.keys(p).length === 0) {
            if (this.utilService.isFirstRoute(this.pregnancyMap)) {
              this.currentUserIndex = Object.keys(this.pregnancyMap)[0]
            }
            else if (this.utilService.isLastRoute(this.pregnancyMap)) {
              this.currentUserIndex = Object.keys(this.pregnancyMap)[Object.keys(this.pregnancyMap).length - 1];
            }
          }
          else {
            this.currentUserIndex = p.userId || "";
          }

          this.currentUser = this.extractUser(this.householdMembers, this.currentUserIndex) || "";

          if (this.applyNowState.houseHoldDetails) {
            this.householdMembers = [this.applyNowState.houseHoldDetails.householdHead].concat(this.applyNowState.houseHoldDetails?.houseHoldPersons || []);
          }

          const houseHoldDetails = this.houseHoldHeadPersons.find(x => x.id == +this.currentUserIndex);
          if (houseHoldDetails) {
            this.headFirstName = houseHoldDetails.firstName;
            this.pregnancySummaryScreenDetailsForm.patchValue({
              babiesRequired: houseHoldDetails && houseHoldDetails.pregnancySummaryInformation ? houseHoldDetails.pregnancySummaryInformation.babiesRequired : "",
              pregnancyDueDate: houseHoldDetails && houseHoldDetails.pregnancySummaryInformation ? Utility.duetFormatDate(houseHoldDetails.pregnancySummaryInformation.pregnancyDueDate) : ""
            });
          }
        });

      });

    const babiesRequired$ = this.appService.getNumberOfExpectedBabies().subscribe((babiesRequired) => {
      this.babiesRequireds = babiesRequired;
    });

    const submitEvent$ = ApplyNowStoreService.submitEvent?.subscribe((val) => {
      const componentPath = val.split("/").pop();
      if (componentPath === this.routePath.APPLYNOW_INDIVIDUALDETAILS_PREGNANCYSUMMARYSCREEN) {
        this.formSubmitAttempt = true;
        this.pregnancySummaryScreenDetailsFormEle.onSubmit(true);
      }
    });
    
    this.setOrResetValidator();
    this.eventsSubscription?.add(submitEvent$);
    this.eventsSubscription?.add(babiesRequired$);
    this.eventsSubscription?.add(activatedRoute$);
  }

  private extractUser(persons: any, userId: any) {
    console.log(persons);
    console.log(userId);
    const currentUser = persons.filter((person: IHouseHold) => {
      return person.id?.toString() === userId.toString();
    })[0];
    return currentUser;
  }

  public isFieldValid(field: string) {
    return (this.pregnancySummaryScreenDetailsForm.get(field)?.status !== 'VALID' && this.pregnancySummaryScreenDetailsForm.get(field)?.touched) ||
      (this.pregnancySummaryScreenDetailsForm.get(field)?.untouched && this.formSubmitAttempt);
  }

  public goNext(): boolean {
    if (this.pregnancySummaryScreenDetailsForm.valid && this.applyNowState) {
      let storeHouseholdDetails = { ...this.applyNowState.houseHoldDetails };
      const storedHouseHoldPerson = [...this.applyNowState.houseHoldDetails.houseHoldPersons as IHouseHold[]];
      const updatedPersonDetails = storedHouseHoldPerson.map(obj => {
        if (obj.id == this.currentUserIndex) {
          const updatedouseHoldPerson = Object.assign({}, obj, { pregnancySummaryInformation: this.pregnancySummaryScreenDetailsForm.value });
          return updatedouseHoldPerson;
        }
        else {
          return obj;
        }
      });


      let isNextPage = false;
      this.pregnancyMap[this.currentUserIndex] = true;

      const updatedPageAction = {
        pregnancyMap: { ...storeHouseholdDetails.pageAction?.pregnancyMap, ...this.pregnancyMap },
        serviceDirection: PageDirection.NEXT
      };

      this.service.updateHouseHoldDetails({ ...storeHouseholdDetails, ...{ houseHoldPersons: updatedPersonDetails }, ...{ pageAction: updatedPageAction } })

      if (this.pregnancyMap != null) {
        isNextPage = this.utilService.isNextPage(this.pregnancyMap);
      }

      if (isNextPage) {
        this.utilService
          .getCurrentUserIdPageAction(this.pregnancyMap, PageDirection.NEXT)
          .subscribe((id: any) => {
            this.currentUserIndex = id.toString();
            this.pregnancySummaryScreenDetailsForm.reset();
            this.router.navigate([
              this.routingStrategy.currentRoute,
              { userId: this.currentUserIndex },
            ]);
          });
      } else {
        this.router.navigate([this.routingStrategy.nextRoute()]);
      }

      return true;
    } else {
      return false;
    }
  }

  public previous(): boolean {
    if (this.applyNowState) {
      this.pregnancyMap[this.currentUserIndex] = false;
      const storeHouseholdDetails = this.applyNowState.houseHoldDetails;
      const updatedPageAction = {
        pregnancyMap: { ...storeHouseholdDetails.pageAction?.pregnancyMap, ...this.pregnancyMap },
        serviceDirection: PageDirection.NEXT
      };

      this.service.updateHouseHoldDetails({ ...storeHouseholdDetails, ...{ pageAction: updatedPageAction } })

      if (Object.keys(this.pregnancyMap)[0].toString() !== this.currentUserIndex.toString()) {
        this.utilService
          .getCurrentUserIdPageAction(this.pregnancyMap, PageDirection.BACK)
          .subscribe((id: any) => {
            this.currentUserIndex = id.toString();
            this.router.navigate([
              this.routingStrategy.currentRoute, { userId: this.currentUserIndex }]);
          });
      } else {
        this.router.navigate([this.routingStrategy.previousRoute()]);
      }

      return true;
    }
    else {
      return false;
    }
  }

  setOrResetValidator() {
    let householdBenefits = this.service?.getBenefits() as string[];
    const fields = [{
      fieldName: 'pregnancyDueDate',
      optionalProgram: ProgramConstants.IND_PREGNANCYDETAILS_PREGNANCYDUE_OPTIONALPROGRAMS as string[],
      requiredProgram: [] as string[]

    }, {
      fieldName: 'babiesRequired',
      optionalProgram: [] as string[],
      requiredProgram: ProgramConstants.IND_PREGNANCYDETAILS_BABIESREQUIRED_REQUIREDPROGRAMS as string[]

    }] as FormValidatorField[];

    if (householdBenefits != null && householdBenefits.length > 0) {
      const requiredOrOptionalValidatorField =
        {
          selectedPrograms: householdBenefits,
          requiredFields: this.requiredFields,
          formGroup: this.pregnancySummaryScreenDetailsForm,
          fields: fields
        } as RequiredOrOptionalValidatorField
      Utility.setOrClearValidatorForFieldWithDifferntPrograms(requiredOrOptionalValidatorField)
      this.pregnancySummaryScreenDetailsForm = requiredOrOptionalValidatorField.formGroup;
      this.requiredFields = [...requiredOrOptionalValidatorField.requiredFields] as any;
    }
  }

  public get getUserFirstName(): string {
    return `${this.currentUser.firstName as string}'s`;
  }

  public ngOnDestroy(): void {
    this.eventsSubscription?.unsubscribe();
  }

  errorMap(fieldName:string) {
    switch(fieldName) {
      case "pregnancyDueDate": {
        if (this.pregnancySummaryScreenDetailsForm.get("pregnancyDueDate")?.errors?.duetInvalidDate) {
          return 'Please Enter Valid Date'
        }
        return ""
      }
      default: return ""
    }
  }
}
