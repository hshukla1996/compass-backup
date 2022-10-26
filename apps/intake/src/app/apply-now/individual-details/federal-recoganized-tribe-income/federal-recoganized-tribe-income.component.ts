import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, identity, of, Subscription } from 'rxjs';
import { IApplyNowState } from '../../+state/apply-now.models';
import { AppStoreService } from '../../../app-store-service';
import { RoutePath } from '../../../shared/route-strategies';
import { UtilService } from '../../../shared/services/util.service';
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, PageDirection } from '../../household/household-model';
import { ScreenQueueUtil } from '../individuals-gatepost/individuals-gatepost.paths';
import * as ProgramConstants from "../../../shared/constants/Individual_Programs_Constants";

@Component({
  selector: 'compass-ui-federal-recoganized-tribe-income',
  templateUrl: './federal-recoganized-tribe-income.component.html',
  styleUrls: ['./federal-recoganized-tribe-income.component.scss'],
})
export class FederalRecoganizedTribeIncomeComponent implements OnInit {

  applyNowState: IApplyNowState | undefined;
  public selectedUserids: string[] = [];
  private eventsSubscription: Subscription | undefined;
  private houseHoldHeadPersons: IHouseHold[] = [];
  fderalRecoganizedTribeIncomeForm: FormGroup | any;
  private federalTaxIncomeMap: any = {};
  private federalRecoganizedMap: any = {};
  private currentUserIndex!: any;
  public currentUser: IHouseHold = {};
  public periods: any;
  public isReceivedServiceTextVisible = true;
  public requiredFields = [] as string[];
  constructor(
    private service: ApplyNowStoreService,
    private router: Router,
    private queueService: ScreenQueueUtil,
    private federalTribeInfoFormBuilder: FormBuilder,
    private utilService: UtilService,
    private activatedRoute: ActivatedRoute,
    private appService: AppStoreService
  ) {
  }

  ngOnInit(): void {
    this.fderalRecoganizedTribeIncomeForm = this.federalTribeInfoFormBuilder.group({
      perCapitaPayments: "",
      perCapitaPaymentAmount: "",
      perCapitaPaymentFrequency: "",
      indianTrustLandPayments: "",
      indiantTrustLandPaymentAmount: "",
      indiantTrustLandPaymentFrequency: "",
      culturalSignificance: "",
      culturalSignificanceAmount: "",
      culturalSignificanceFrequency: "",
    });

    const activatedRoute$ = this.activatedRoute.params.
      subscribe((p) => {
        const getData$ = this.service.getAppData().subscribe(d => {
          const getStates$ = this.appService.getAmountPeriodForTribes().subscribe((periods) => {
            this.periods = periods;
            this.applyNowState = { ...d };
            this.houseHoldHeadPersons = this.applyNowState.houseHoldDetails.houseHoldPersons as IHouseHold[];
            this.federalTaxIncomeMap = { ...this.applyNowState.houseHoldDetails.pageAction?.federalTaxIncomeMap } || {};
            this.federalRecoganizedMap = { ...this.applyNowState.houseHoldDetails.pageAction?.federalRecoganizedMap } || {};

            if (Object.keys(p).length === 0) {
              if (this.utilService.isFirstRoute(this.federalTaxIncomeMap)) {
                this.currentUserIndex = Object.keys(this.federalTaxIncomeMap)[0]
              }
              else if (this.utilService.isLastRoute(this.federalTaxIncomeMap)) {
                this.currentUserIndex = Object.keys(this.federalTaxIncomeMap)[Object.keys(this.federalTaxIncomeMap).length - 1];
              }
            }
            else {
              this.currentUserIndex = p.userId || "";
            }

            this.currentUser = this.extractUser(this.houseHoldHeadPersons, this.currentUserIndex) || "";

            const currentUserDetails = this.houseHoldHeadPersons.find((x) => x.id === +this.currentUserIndex) as IHouseHold;

            of(true).pipe(delay(10)).subscribe(() => {
              this.fderalRecoganizedTribeIncomeForm.patchValue({
                perCapitaPayments: currentUserDetails.federalTribeIncomeInformation?.perCapitaPayments,
                perCapitaPaymentAmount: currentUserDetails.federalTribeIncomeInformation?.perCapitaPaymentAmount,
                perCapitaPaymentFrequency: currentUserDetails.federalTribeIncomeInformation?.perCapitaPaymentFrequency,
                indianTrustLandPayments: currentUserDetails.federalTribeIncomeInformation?.indianTrustLandPayments,
                indiantTrustLandPaymentAmount: currentUserDetails.federalTribeIncomeInformation?.indiantTrustLandPaymentAmount,
                indiantTrustLandPaymentFrequency: currentUserDetails.federalTribeIncomeInformation?.indiantTrustLandPaymentFrequency,
                culturalSignificance: currentUserDetails.federalTribeIncomeInformation?.culturalSignificance,
                culturalSignificanceAmount: currentUserDetails.federalTribeIncomeInformation?.culturalSignificanceAmount,
                culturalSignificanceFrequency: currentUserDetails.federalTribeIncomeInformation?.culturalSignificanceFrequency,
              });
            });

          });

          this.eventsSubscription?.add(getStates$);
        });
        this.eventsSubscription?.add(getData$);
      });
    this.setValidators();
    this.eventsSubscription?.add(activatedRoute$);
  }

  /**
   * 
   * @param persons This will extract the user
   * @param userId 
   * @returns 
   */
  private extractUser(persons: any, userId: any) {
    console.log(persons);
    console.log(userId);
    const currentUser = persons.filter((person: IHouseHold) => {
      return userId ? person.id?.toString() === userId.toString() : false;
    })[0];
    return currentUser;
  }


  isFieldValid(field: string): boolean {
    const formField = this.fderalRecoganizedTribeIncomeForm.get(field);
    return (
      formField && this.fderalRecoganizedTribeIncomeForm.get(field).status !== "VALID" &&
      this.fderalRecoganizedTribeIncomeForm.get(field).touched
    );
  }

  public showNextPage() {
    if (this.fderalRecoganizedTribeIncomeForm.valid) {
      if (this.applyNowState && this.applyNowState.houseHoldDetails && this.applyNowState.houseHoldDetails.houseHoldPersons) {
        const storedHouseholdDetails = this.applyNowState.houseHoldDetails;
        const clonedUpdatedPerson: IHouseHold[] = [];
        this.applyNowState.houseHoldDetails.houseHoldPersons.forEach((person: IHouseHold) => {
          const clonedPerson = { ...person };
          if (person.id as number === +this.currentUserIndex) {
            clonedPerson.federalTribeIncomeInformation = this.fderalRecoganizedTribeIncomeForm.value;
          }
          else if (Object.keys(this.federalTaxIncomeMap).indexOf(this.currentUserIndex) === -1) {
            clonedPerson.federalTribeIncomeInformation = undefined;
          }

          clonedUpdatedPerson.push(clonedPerson);
        });

        let isNextPage = false;
        this.federalTaxIncomeMap[this.currentUserIndex] = true;

        const updatedPageAction = {
          federalRecoganizedMap: { ...storedHouseholdDetails.pageAction?.federalRecoganizedMap },
          federalTaxIncomeMap: { ...storedHouseholdDetails.pageAction?.federalTaxIncomeMap, ...this.federalTaxIncomeMap },
          serviceDirection: PageDirection.NEXT
        };


        if (storedHouseholdDetails) {
          this.service.updateHouseHoldDetails(
            { ...storedHouseholdDetails, ...{ houseHoldPersons: clonedUpdatedPerson, pageAction: updatedPageAction } }
          )
        }

        if (this.federalRecoganizedMap != null) {
          isNextPage = this.utilService.isNextPage(this.federalRecoganizedMap);
        }

        if (isNextPage) {
          this.utilService
            .getCurrentUserIdPageAction(this.federalRecoganizedMap, PageDirection.NEXT)
            .subscribe((id: any) => {
              this.router.navigate([
                RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALRECOGANIZEDTRIBEINFORMATION,
                { userId: id },
              ]);
            });
        } else {
          this.router.navigate([
            RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALRECOGANIZEDTRIBESUMMARY,
          ]);
        }
      }
    }
  }

  public showIsReceivedServiceText(showText: boolean): void {
    this.isReceivedServiceTextVisible = showText;
  }

  public showPreviousPage() {
    if (this.applyNowState) {
      this.federalTaxIncomeMap[this.currentUserIndex] = false;
      const storeHouseholdDetails = this.applyNowState.houseHoldDetails;
      const updatedPageAction = {
        federalRecoganizedMap: { ...storeHouseholdDetails.pageAction?.federalRecoganizedMap },
        federalTaxIncomeMap: { ...storeHouseholdDetails.pageAction?.federalTaxIncomeMap, ...this.federalTaxIncomeMap },
        serviceDirection: PageDirection.NEXT
      };

      this.service.updateHouseHoldDetails({ ...storeHouseholdDetails, ...{ pageAction: updatedPageAction } })

      if (Object.keys(this.federalTaxIncomeMap)[0].toString() !== this.currentUserIndex.toString()) {
        this.utilService
          .getCurrentUserIdPageAction(this.federalTaxIncomeMap, PageDirection.BACK)
          .subscribe((id: any) => {
            this.currentUserIndex = id.toString();
            this.router.navigate([
              RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALRECOGANIZEDTRIBEINCOME,
              { userId: this.currentUserIndex }]);
          });
      } else {
        this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALRECOGANIZEDTRIBEINFORMATION]);
      }

      return true;
    }
    else {
      return false;
    }
  }

  private setValidators(): void {
    let householdBenefits = this.service?.getBenefits() as string[];
    const fields = [{
      fieldName: 'perCapitaPayments',
      optionalProgram: ProgramConstants.IND_FEDERAL_TRIBE_INCOME_OPTIONALPROGRAMS as string[],
      requiredProgram: [] as string[]

    }, {
      fieldName: 'perCapitaPaymentAmount',
      optionalProgram: [],
      requiredProgram: ProgramConstants.IND_FEDERAL_TRIBE_INCOME_REQUIREDPROGRAMS as string[],

    }, {
      fieldName: 'perCapitaPaymentFrequency',
      optionalProgram: [],
      requiredProgram: ProgramConstants.IND_FEDERAL_TRIBE_INCOME_REQUIREDPROGRAMS as string[],

    }, {
      fieldName: 'indianTrustLandPayments',
      optionalProgram: ProgramConstants.IND_FEDERAL_TRIBE_INCOME_OPTIONALPROGRAMS as string[],
      requiredProgram: [] as string[]

    }, {
      fieldName: 'indiantTrustLandPaymentAmount',
      optionalProgram: [],
      requiredProgram: ProgramConstants.IND_FEDERAL_TRIBE_INCOME_REQUIREDPROGRAMS as string[],

    }, {
      fieldName: 'indiantTrustLandPaymentFrequency',
      optionalProgram: [],
      requiredProgram: ProgramConstants.IND_FEDERAL_TRIBE_INCOME_REQUIREDPROGRAMS as string[],

    }, {
      fieldName: 'culturalSignificance',
      optionalProgram: ProgramConstants.IND_FEDERAL_TRIBE_INCOME_OPTIONALPROGRAMS as string[],
      requiredProgram: [] as string[]

    }, {
      fieldName: 'culturalSignificanceAmount',
      optionalProgram: [],
      requiredProgram: ProgramConstants.IND_FEDERAL_TRIBE_INCOME_REQUIREDPROGRAMS as string[],

    }, {
      fieldName: 'culturalSignificanceFrequency',
      optionalProgram: [],
      requiredProgram: ProgramConstants.IND_FEDERAL_TRIBE_INCOME_REQUIREDPROGRAMS as string[],

    }] as FormValidatorField[];

    if (householdBenefits != null && householdBenefits.length > 0) {
      const requiredOrOptionalValidatorField =
        {
          selectedPrograms: householdBenefits,
          requiredFields: this.requiredFields,
          formGroup: this.fderalRecoganizedTribeIncomeForm,
          fields: fields
        } as RequiredOrOptionalValidatorField
      Utility.setOrClearValidatorForFieldWithDifferntPrograms(requiredOrOptionalValidatorField)
      this.fderalRecoganizedTribeIncomeForm = requiredOrOptionalValidatorField.formGroup;
      this.requiredFields = [...requiredOrOptionalValidatorField.requiredFields] as any;
    }

    const incomeControl = this.fderalRecoganizedTribeIncomeForm.get('perCapitaPaymentAmount');
    const incomePeriodControl = this.fderalRecoganizedTribeIncomeForm.get('perCapitaPaymentFrequency');
    this.fderalRecoganizedTribeIncomeForm.get('perCapitaPayments').valueChanges.subscribe((value1: any) => {
      if (value1.toUpperCase() === 'YES') {
        incomeControl.setValidators([Validators.required]);
        incomePeriodControl.setValidators([Validators.required, this.validatePeriod]);
      }
      else {
        incomeControl.setValue(null);
        incomePeriodControl.setValue(null);
        incomeControl.clearValidators();
        incomePeriodControl.clearValidators();
        incomeControl.updateValueAndValidity();
        incomePeriodControl.updateValueAndValidity();
      }
    });

    const income1Control = this.fderalRecoganizedTribeIncomeForm.get('indiantTrustLandPaymentAmount');
    const incomePeriod1Control = this.fderalRecoganizedTribeIncomeForm.get('indiantTrustLandPaymentFrequency');

    this.fderalRecoganizedTribeIncomeForm.get('indianTrustLandPayments').valueChanges.subscribe((value1: any) => {
      if (value1.toUpperCase() === 'YES') {
        income1Control.setValidators([Validators.required]);
        incomePeriod1Control.setValidators([Validators.required, this.validatePeriod]);
      }
      else {
        income1Control.setValue(null);
        incomePeriod1Control.setValue(null);
        income1Control.clearValidators();
        incomePeriod1Control.clearValidators();
        income1Control.updateValueAndValidity();
        incomePeriod1Control.updateValueAndValidity();
      }
    });

    const income2Control = this.fderalRecoganizedTribeIncomeForm.get('culturalSignificanceAmount');
    const incomePeriod2Control = this.fderalRecoganizedTribeIncomeForm.get('culturalSignificanceFrequency');

    this.fderalRecoganizedTribeIncomeForm.get('culturalSignificance').valueChanges.subscribe((value1: any) => {
      if (value1.toUpperCase() === 'YES') {
        income2Control.setValidators([Validators.required]);
        incomePeriod2Control.setValidators([Validators.required, this.validatePeriod]);
      }
      else {
        income2Control.setValue(null);
        incomePeriod2Control.setValue(null);
        income2Control.clearValidators();
        incomePeriod2Control.clearValidators();
        income2Control.updateValueAndValidity();
        incomePeriod2Control.updateValueAndValidity();
      }
    });
  }

  private validatePeriod(control: AbstractControl): { [key: string]: any } | null {
    if (control.value === '') {
      control.setErrors({});
    }
    return null;;
  }

  ngOnDestroy(): void {
    this.eventsSubscription?.unsubscribe();
  }
}
