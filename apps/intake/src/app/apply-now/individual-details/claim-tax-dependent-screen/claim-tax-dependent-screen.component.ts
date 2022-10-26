import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IApplyNowState } from '../../+state/apply-now.models';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowIndividualDetailsClaimTaxDependentStrategy } from '../../../shared/route-strategies/apply-now/individual-details-claim-tax-dependent';
import { UtilService } from '../../../shared/services/util.service';
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, PageDirection } from '../../household/household-model';
import * as ProgramConstants from "../../../shared/constants/Individual_Programs_Constants";

@Component({
  selector: 'compass-ui-claim-tax-dependent-screen',
  templateUrl: './claim-tax-dependent-screen.component.html',
  styleUrls: ['./claim-tax-dependent-screen.component.scss'],
  providers: [ApplyNowIndividualDetailsClaimTaxDependentStrategy]
})
export class ClaimTaxDependentScreenComponent implements OnInit {

  applyNowState: IApplyNowState | undefined;
  private eventsSubscription: Subscription | undefined;
  public houseHoldHeadPersons: IHouseHold[] = [];
  private claimTaxDependentMap: any = {};
  private federalTaxReturnMap: any = {};
  private whoWillBeTaxClaimedMap: any = {};
  private currentUserIndex!: any;
  public currentUser: IHouseHold = {};
  public claimTaxDependentForm: FormGroup | any;
  public displayError: boolean = false;
  public questionText: string = '';
  public requiredFields = [] as string[];
  constructor(
    private service: ApplyNowStoreService,
    private router: Router,
    private routingStratagy: ApplyNowIndividualDetailsClaimTaxDependentStrategy,
    private utilService: UtilService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    // setTimeout(() => {
    //   let radioLabel = document.getElementsByClassName("form-check-label")[0];
    //   radioLabel.classList.add("mt-3");
    // }, 10);

    this.claimTaxDependentForm = this.fb.group({
      id: this.fb.array([]),
      isClaimTaxDependent: [""]
    });

    const activatedRoute$ = this.activatedRoute.params.
      subscribe((p) => {
        const getData$ = this.service.getAppData().subscribe(d => {
          this.applyNowState = { ...d };
          this.houseHoldHeadPersons = this.applyNowState.houseHoldDetails.houseHoldPersons as IHouseHold[];
          this.claimTaxDependentMap = { ...this.applyNowState.houseHoldDetails.pageAction?.claimTaxDependentMap } || {};
          this.federalTaxReturnMap = { ...this.applyNowState.houseHoldDetails.pageAction?.federalTaxReturnMap } || {};

          if (Object.keys(p).length === 0) {
            if (this.utilService.isFirstRoute(this.claimTaxDependentMap)) {
              this.currentUserIndex = Object.keys(this.claimTaxDependentMap)[0]
            }
            else if (this.utilService.isLastRoute(this.claimTaxDependentMap)) {
              this.currentUserIndex = Object.keys(this.claimTaxDependentMap)[Object.keys(this.claimTaxDependentMap).length - 1];
            }
          }
          else {
            this.currentUserIndex = p.userId || "";
          }

          this.currentUser = this.extractUser(this.houseHoldHeadPersons, this.currentUserIndex) || "";

          const currentUserDetails = this.houseHoldHeadPersons.find((x) => x.id === +this.currentUserIndex) as IHouseHold;

          if (currentUserDetails.filingStatus?.toUpperCase() === "Y") {
            const isHusband = currentUserDetails.memberRelationships?.filter(x => x.relationshipType === 'H');
            const isWife = currentUserDetails.memberRelationships?.filter(x => x.relationshipType === 'W');
            let spouseDetails;
            if (isHusband && isHusband.length > 0) {
              spouseDetails = this.houseHoldHeadPersons.find(x => x.id === +isHusband[0].individualLookupId)
            }

            if (isWife && isWife.length > 0) {
              spouseDetails = this.houseHoldHeadPersons.find(x => x.id === +isWife[0].individualLookupId)
            }

            this.questionText = `Will ${currentUserDetails.firstName} and ${spouseDetails?.firstName}  claim anyone as a tax dependent ?`
          }
          else {
            this.questionText = `Will ${currentUserDetails.firstName} claim anyone as a tax dependent ?`
          }

          this.claimTaxDependentForm.get('isClaimTaxDependent').patchValue(currentUserDetails.claimAsTaxDependent === 'Y' ? 'Yes' :
            currentUserDetails.claimAsTaxDependent === 'N' ? 'No' : '');
        });

        this.eventsSubscription?.add(getData$);

      });

    this.setOrResetValidator();
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
      return person.id?.toString() === userId.toString();
    })[0];
    return currentUser;
  }

  public showNextPage() {
    if (this.applyNowState && this.applyNowState.houseHoldDetails && this.applyNowState.houseHoldDetails.houseHoldPersons) {
      this.service.validateAllFormFields(this.claimTaxDependentForm);
      if (this.claimTaxDependentForm.status.toLowerCase() === 'valid') {
        const storedHouseholdDetails = this.applyNowState.houseHoldDetails;
        const clonedUpdatedPerson: IHouseHold[] = [];
        this.applyNowState.houseHoldDetails.houseHoldPersons.forEach((person: IHouseHold) => {
          const clonedPerson = { ...person };
          if (person.id === +this.currentUserIndex) {
            clonedPerson.claimAsTaxDependent = this.claimTaxDependentForm.value.isClaimTaxDependent && this.claimTaxDependentForm.value.isClaimTaxDependent.toUpperCase() === "YES" ? 'Y' : 'N';
            if (clonedPerson.claimAsTaxDependent?.toUpperCase() === "Y") {
              this.whoWillBeTaxClaimedMap[clonedPerson.id as number] = false;
            }
            else {
              clonedPerson.claimTaxDependentPersons = [];
            }
          }
          clonedUpdatedPerson.push(clonedPerson);
        });

        let isNextPage = false;
        this.claimTaxDependentMap[this.currentUserIndex] = true;

        const updatedPageAction = {
          federalTaxReturnMap: { ...storedHouseholdDetails.pageAction?.federalTaxReturnMap },
          claimTaxDependentMap: { ...storedHouseholdDetails.pageAction?.claimTaxDependentMap, ...this.claimTaxDependentMap },
          whoWillBeTaxClaimedMap: { ...storedHouseholdDetails.pageAction?.whoWillBeTaxClaimedMap, ...this.whoWillBeTaxClaimedMap },
          serviceDirection: PageDirection.NEXT
        };

        if (storedHouseholdDetails) {
          this.service.updateHouseHoldDetails(
            { ...storedHouseholdDetails, ...{ houseHoldPersons: clonedUpdatedPerson }, ...{ pageAction: updatedPageAction } }
          )
        }

        if (this.claimTaxDependentMap != null) {
          isNextPage = this.utilService.isNextPage(this.claimTaxDependentMap);
        }

        if (this.claimTaxDependentForm.value.isClaimTaxDependent.toUpperCase() === "YES") {
          this.router.navigate([this.routingStratagy.nextRoute(), { userId: this.currentUserIndex }]);
        }
        else {
          const isNextPageInFilingJointly = this.utilService.isNextPage(this.federalTaxReturnMap);
          if (isNextPageInFilingJointly) {
            this.utilService
              .getCurrentUserIdPageAction(this.federalTaxReturnMap, PageDirection.NEXT)
              .subscribe((id: any) => {
                this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FilingStatus, { userId: id }]);
              });
          }
          else if (isNextPage) {
            this.claimTaxDependentForm.reset();
            this.utilService
              .getCurrentUserIdPageAction(this.claimTaxDependentMap, PageDirection.NEXT)
              .subscribe((id: any) => {
                this.router.navigate([this.routingStratagy.currentRoute,
                { userId: id }]);
              });
          }
          else {
            this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALINCOMETAXRETURNSUMMARY]);
          }
        }
      }
      else {
        this.displayError = true;
        return false;
      }
    }

    return false;
  }

  public showPreviousPage() {
    if (this.applyNowState) {
      this.claimTaxDependentMap[this.currentUserIndex] = false;
      const storeHouseholdDetails = this.applyNowState.houseHoldDetails;
      const updatedPageAction = {
        federalTaxReturnMap: { ...storeHouseholdDetails.pageAction?.federalTaxReturnMap },
        claimTaxDependentMap: { ...storeHouseholdDetails.pageAction?.claimTaxDependentMap, ...this.claimTaxDependentMap },
        whoWillBeTaxClaimedMap: { ...storeHouseholdDetails.pageAction?.whoWillBeTaxClaimedMap, ...this.whoWillBeTaxClaimedMap },
        serviceDirection: PageDirection.NEXT
      };

      this.service.updateHouseHoldDetails({ ...storeHouseholdDetails, ...{ pageAction: updatedPageAction } })

      if (Object.keys(this.federalTaxReturnMap).indexOf(this.currentUserIndex) > -1) {
        this.router.navigate([
          RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FilingStatus, { userId: this.currentUserIndex }]);
      }
      else {
        this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FEDERALINCOMETAXRETURN]);
      }
      return true;
    }
    else {
      return false;
    }
  }


  isFieldValid(field: string): boolean {
    return (this.claimTaxDependentForm.get(field).status !== 'VALID' && this.claimTaxDependentForm.get(field).touched)
  }

  setOrResetValidator() {
    let householdBenefits = this.service?.getBenefits() as string[];
    const fields = [{
      fieldName: 'isClaimTaxDependent',
      optionalProgram: [] as string[],
      requiredProgram: ProgramConstants.IND_CLAIM_TAX_DEPENDENT_REQUIREDPROGRAMS as string[]

    }] as FormValidatorField[];

    if (householdBenefits != null && householdBenefits.length > 0) {
      const requiredOrOptionalValidatorField =
        {
          selectedPrograms: householdBenefits,
          requiredFields: this.requiredFields,
          formGroup: this.claimTaxDependentForm,
          fields: fields
        } as RequiredOrOptionalValidatorField
      Utility.setOrClearValidatorForFieldWithDifferntPrograms(requiredOrOptionalValidatorField)
      this.claimTaxDependentForm = requiredOrOptionalValidatorField.formGroup;
      this.requiredFields = [...requiredOrOptionalValidatorField.requiredFields] as any;
    }
  }
  
  errorMap(field: string) {
    if (!this.isFieldValid(field)) {
      return "";
    }

    switch (field) {
      case 'isClaimTaxDependent':
        if (this.claimTaxDependentForm.get('isClaimTaxDependent').errors.required) {
          return 'The question is not answered.'
        }
        break;
      default:
        return "";
        break;
    }
    return "";
  }

  ngOnDestroy(): void {
    this.eventsSubscription?.unsubscribe();
  }
}
