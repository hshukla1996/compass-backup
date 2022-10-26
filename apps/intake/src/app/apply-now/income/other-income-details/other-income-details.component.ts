import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, delay, of } from 'rxjs';
import { IApplyNowState } from '../../+state/apply-now.models';
import { AppPageActions } from '../../../+state/actions';
import { AppStoreService } from '../../../app-store-service';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowOtherIncomeDetailsStrategy } from '../../../shared/route-strategies/apply-now/other-income-details';
import { ScreenQueueUtil } from '../../../shared/services/screen_queue_util.service';
import { UtilService } from '../../../shared/services/util.service';
import { RequiredOrOptionalValidatorField, Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, IHouseHoldDetails, IOtherIncomeDetails, PageDirection } from '../../household/household-model';
import { State as AppState } from './../../../+state';
import * as AppSelectors from './../../../+state/app.selectors'
import * as ProgramConstants from "../../../shared/constants/Individual_Programs_Constants";
import { FormValidatorField} from "../../../shared/utilities/Utility";
@Component({
  selector: 'compass-ui-other-income-details',
  templateUrl: './other-income-details.component.html',
  styleUrls: ['./other-income-details.component.scss'],
  providers: [ApplyNowOtherIncomeDetailsStrategy]
})
export class OtherIncomeDetailsComponent implements OnInit {

  otherIncomeDetailsForm: FormGroup | any | null;
  currentUser: IHouseHold = {};
  currentUserIndex!: string;
  otherIncomeDetailsMap!: any;
  houseHoldDetails!: IHouseHoldDetails;
  houseHoldPersons: IHouseHold[] = [];
  applyNowState: IApplyNowState | undefined;
  otherIncomeTypes$: Observable<any> | undefined;
  otherIncomeTypes: any;
  payList: any;
  fragment!: string;
  maxDateRange: any;
  requiredFields = [] as string[];

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private routeStrategy: ApplyNowOtherIncomeDetailsStrategy,
    private service: ApplyNowStoreService,
    private appService: AppStoreService,
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private utilService: UtilService,
    private appstore: Store<AppState>,
    private queueService: ScreenQueueUtil
  ) { }

  ngOnInit(): void {
    this.maxDateRange = this.addDays(30).toISOString().slice(0,10);
    this.otherIncomeDetailsForm = this.fb.group({
      incomeType: [""],
      otherIncomeDescription: [""],
      frequency: [""],
      grossIncome: [""],
      mostRecentPayDate: ["", Utility.dateMaxValidator()],
    }); 
    this.appstore.dispatch(AppPageActions.getOtherIncomeTypes());
    this.otherIncomeTypes$ = this.appstore.select(AppSelectors.getOtherIncomeTypes);

    this.otherIncomeTypes$?.subscribe((s) => {
      this.otherIncomeTypes = s;
      this.cd.detectChanges();
    });
    this.appService.getPay().subscribe((pay) => {
      this.payList = pay;
      this.cd.detectChanges();
    });

    of(true)
      .pipe(delay(300))
      .subscribe(() => {
        this.service.getAppData().subscribe(d => {
          this.applyNowState = { ...d };
          this.houseHoldDetails = this.service.getHouseHoldDetails;
          if (this.houseHoldDetails.houseHoldPersons) {
            this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons;
          }
          this.otherIncomeDetailsMap =
            {
              ...this.houseHoldDetails.pageAction?.otherIncomeDetailsMap,
            } || {};
          this.cd.detectChanges();
        });

        this.activatedRoute.fragment.subscribe((fragment) => {
          this.fragment = fragment || "new";
          if (this.fragment !== "new") this.setFormValues(this.fragment);
        });

        this.activatedRoute.params.
          subscribe((p) => {
            if (Object.keys(p).length === 0) {
              this.currentUserIndex =
                this.utilService.getCurrentUserIdOnNoParams(
                  this.otherIncomeDetailsMap
                );

            } else {
              this.currentUserIndex = p.userId || "";
            }

            if (this.houseHoldPersons.length > 0)
              this.currentUser =
                this.service.extractUser(
                  this.houseHoldPersons,
                  this.currentUserIndex
                ) || "";
            this.cd.detectChanges();
          });
      });
    this.setOrResetValidator(); 
  }

  addDays(days:number) {
    let result = new Date();
    result.setDate(result.getDate() + days);
    return result;
  }

  setFormValues(fragment: any) {
    setTimeout(() => {
      if (
        this.currentUser?.individualIncome?.otherIncome &&
        this.currentUser?.individualIncome.otherIncome[fragment]
      )
        this.otherIncomeDetailsForm.patchValue(
          this.currentUser.individualIncome.otherIncome[fragment]
        );
      this.cd.detectChanges();
    }, 100);
  }

  isFieldValid(field: string): boolean {
    return (
      this.otherIncomeDetailsForm.get(field).status !== "VALID" &&
      this.otherIncomeDetailsForm.get(field).touched
    );
  }
  errorMap(field: string) {
    if (!this.isFieldValid(field)) {
      return "";
    }
    switch (field) {
      case "incomeType":
        if (
          this.otherIncomeDetailsForm.get("incomeType").errors
            .required
        ) {
          return "Required Field";
        }
        break;
      case "otherIncomeDescription":
        if (
          this.otherIncomeDetailsForm.get("otherIncomeDescription").errors
            .required
        ) {
          return "Required Field";
        }
        break;
      case "frequency":
        if (
          this.otherIncomeDetailsForm.get("frequency").errors
            .required
        ) {
          return "Required Field";
        }
        break;
      case "grossIncome":
        if (
          this.otherIncomeDetailsForm.get("grossIncome").errors
            .required
        ) {
          return "This field is required";
        }
        if (
          this.otherIncomeDetailsForm.get("grossIncome").errors
            .invalidAmount
        ) {
          return "Please enter income less than 10000000"
        }
        break;
      case "mostRecentPayDate":
        if (
          this.otherIncomeDetailsForm.get("mostRecentPayDate").errors
            .required
        ) {
          return "Required Field";
        }
        if (this.otherIncomeDetailsForm.get('mostRecentPayDate').errors?.invalidDate) {
            return 'Date must be in the past.'
        }
        if (this.otherIncomeDetailsForm.get("mostRecentPayDate").errors.duetInvalidDate) {
            return "duetInvalidDate";
        }
        break;
      default:
        return "";
        break;
    }

    return "";
  }

  goBack(): void {
    this.otherIncomeDetailsMap[this.currentUserIndex] = false;
    const storeHouseholdDetails = this.houseHoldDetails;
    const updatedPageAction = {
      otherIncomeDetailsMap: {
        ...storeHouseholdDetails.pageAction?.otherIncomeDetailsMap,
        ...this.otherIncomeDetailsMap,
      },
      otherIncomeDetailsDirection: PageDirection.NEXT,
    };

    this.service.updateHouseHoldDetails({
      ...storeHouseholdDetails,
      ...{ pageAction: updatedPageAction },
    });

    if (
      Object.keys(this.otherIncomeDetailsMap)[0].toString() !==
      this.currentUserIndex.toString()
    ) {
      this.utilService
        .getCurrentUserIdPageAction(this.otherIncomeDetailsMap, PageDirection.BACK)
        .subscribe((id: any) => {
          this.currentUserIndex = id.toString();
          this.route.navigate([
            RoutePath.APPLYNOW
            + "/" + RoutePath.APPLYNOW_INCOME
            + "/" + RoutePath.APPLYNOW_INCOME_OTHERINCOME
            + "/" + RoutePath.APPLYNOW_INCOME_OTHERINCOMEDETAILS,
            { userId: this.currentUserIndex },
          ]);
        });
    } else {
      this.route.navigate([
        RoutePath.APPLYNOW
        + "/" + RoutePath.APPLYNOW_INCOME
        + "/" + RoutePath.APPLYNOW_INCOME_OTHERINCOME
      ]);
    }
  }

  goNext(): void {
    this.service.validateAllFormFields(this.otherIncomeDetailsForm);
    if (this.otherIncomeDetailsForm.status.toLowerCase() === "valid") {
      const existingHouseHoldDetails = this.houseHoldDetails;

      const existingOtherIncome = this.currentUser.individualIncome?.otherIncome || [];
      let otherIncomeDetails: IOtherIncomeDetails[];

      this.otherIncomeDetailsForm.value.grossIncome = this.otherIncomeDetailsForm.value.grossIncome.toString();
      if (this.fragment === "new") {
        otherIncomeDetails = [
          ...existingOtherIncome,
          ...[this.otherIncomeDetailsForm.value],
        ];
      } else if (existingOtherIncome.length === 0) {
        otherIncomeDetails = [this.otherIncomeDetailsForm.value];
      } else {
        otherIncomeDetails = existingOtherIncome.map((cs, i) => {
          if (i === parseInt(this.fragment)) {
            let updateOtherIncomeDetails: IOtherIncomeDetails = { ...cs };
            updateOtherIncomeDetails.incomeType = this.otherIncomeDetailsForm.get("incomeType").value;
            updateOtherIncomeDetails.frequency = this.otherIncomeDetailsForm.get("frequency").value;
            updateOtherIncomeDetails.grossIncome = this.otherIncomeDetailsForm.get("grossIncome").value.toString();
            updateOtherIncomeDetails.mostRecentPayDate = this.otherIncomeDetailsForm.get("mostRecentPayDate").value;
            updateOtherIncomeDetails.otherIncomeDescription = this.otherIncomeDetailsForm.get("otherIncomeDescription").value;
            return { ...updateOtherIncomeDetails };
          } else {
            return cs;
          }
        });
      }

      const updatedHouseholdPersons =
        this.houseHoldDetails.houseHoldPersons?.map(
          (person: IHouseHold) => {
            if (person.id === this.currentUser.id) {
              const personIndividualIncome = { ...person.individualIncome };
              personIndividualIncome.otherIncome = otherIncomeDetails;
              return { ...person, ...{ individualIncome: personIndividualIncome } };
            } else {
              return person;
            }
          }
        );

      if (existingHouseHoldDetails)
        this.service.updateHouseHoldDetails({
          ...existingHouseHoldDetails,
          ...{ houseHoldPersons: updatedHouseholdPersons },
        });

      //used to add address to last added income
      // if (this.fragment === "new") {
      //   this.fragment = String(otherIncomeDetails.length - 1);
      // }

      this.route.navigate([
        this.routeStrategy.nextRoute(),
        { userId: this.currentUserIndex }], { fragment: this.fragment });

    }
  }
  setOrResetValidator() {
    let householdBenefits = this.service?.getBenefits() as string[];
    const fields = [{
      fieldName: 'incomeType',
      optionalProgram: ProgramConstants.INCOME_OTHERINCOMEDETAILS_INCOMETYPE_OPTIONAL_PROGRAM as string[],
      requiredProgram: ProgramConstants.INCOME_OTHERINCOMEDETAILS_INCOMETYPE_REQUIRED_PROGRAM as string[]
    },
      {
        fieldName: 'otherIncomeDescription',
        optionalProgram: [] as string[],
        requiredProgram: ProgramConstants.INCOME_OTHERINCOMEDETAILS_OTHERINCOMEDESCRIPTION_REQUIRED_PROGRAM as string[]
      },
      {
        fieldName: 'frequency',
        optionalProgram: ProgramConstants.INCOME_OTHERINCOMEDETAILS_FREQUENCY_OPTIONAL_PROGRAM as string[],
        requiredProgram: ProgramConstants.INCOME_OTHERINCOMEDETAILS_FREQUENCY_REQUIRED_PROGRAM as string[]
      },
      {
        fieldName: 'grossIncome',
        optionalProgram: ProgramConstants.INCOME_OTHERINCOMEDETAILS_GROSSINCOME_OPTIONAL_PROGRAM as string[],
        requiredProgram: ProgramConstants.INCOME_OTHERINCOMEDETAILS_GROSSINCOME_REQUIRED_PROGRAM as string[]
      },
      {
        fieldName: 'mostRecentPayDate',
        optionalProgram: ProgramConstants.INCOME_OTHERINCOMEDETAILS_MOSTRECENTPAYDATE_OPTIONAL_PROGRAM as string[],
        requiredProgram: ProgramConstants.INCOME_OTHERINCOMEDETAILS_MOSTRECENTPAYDATE_REQUIRED_PROGRAM as string[]
      },


    
    ] as FormValidatorField[]
    if (householdBenefits != null && householdBenefits.length > 0) {
      const requiredOrOptionalValidatorField =
        {

          selectedPrograms: householdBenefits,
          requiredFields: this.requiredFields,
          formGroup: this.otherIncomeDetailsForm,
          fields: fields
        } as RequiredOrOptionalValidatorField
      Utility.setOrClearValidatorForFieldWithDifferntPrograms(requiredOrOptionalValidatorField)
      this.otherIncomeDetailsForm = requiredOrOptionalValidatorField.formGroup;
      this.requiredFields = [...requiredOrOptionalValidatorField.requiredFields] as any;
    }
  }

}
