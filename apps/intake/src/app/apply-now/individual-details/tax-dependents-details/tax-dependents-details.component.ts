import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, of, Subscription } from 'rxjs';
import { IApplyNowState, ITaxDependentsDetails } from '../../+state/apply-now.models';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowIndividualDetailsTaxDependentsDetailsStrategy } from '../../../shared/route-strategies/apply-now/individual-details-tax-dependents-details';
import { UtilService } from '../../../shared/services/util.service';
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, PageDirection } from '../../household/household-model';
import * as ProgramConstants from "../../../shared/constants/Individual_Programs_Constants";

@Component({
  selector: 'compass-ui-tax-dependents-details',
  templateUrl: './tax-dependents-details.component.html',
  styleUrls: ['./tax-dependents-details.component.scss'],
  providers: [ApplyNowIndividualDetailsTaxDependentsDetailsStrategy]
})
export class TaxDependentsDetailsComponent implements OnInit {
  taxDependentsDetailsForm!: FormGroup;

  details!: ITaxDependentsDetails;

  private eventsSubscription: Subscription | undefined;

  applyNowState: IApplyNowState | undefined;

  routePath: typeof RoutePath = RoutePath;

  private houseHoldHeadPersons: IHouseHold[] = [];

  public householdMembers: IHouseHold[] = [];

  private taxDependentMap: any = {};

  private currentUserIndex!: any;

  public currentUser: IHouseHold = {};

  public requiredFields = [] as string[];
  /**
   * constructor of Tax Dependents details component
   * @param fb 
   */
  constructor(private fb: FormBuilder,
    private service: ApplyNowStoreService,
    private routingStrategy: ApplyNowIndividualDetailsTaxDependentsDetailsStrategy,
    private router: Router,
    private utilService: UtilService,
    private activatedRoute: ActivatedRoute) {
  }

  /**
   * Initialising the form with default values
   */
  ngOnInit() {
    this.taxDependentsDetailsForm = this.fb.group({
      selectedPerson: [''],
    });

    const activatedRoute$ = this.activatedRoute.params.
      subscribe((p) => {
        const getAppData$ = this.service.getAppData().subscribe(d => {
          this.applyNowState = { ...d };

          this.taxDependentMap = { ...this.applyNowState.houseHoldDetails.pageAction?.taxDependentMap } || {};

          if (Object.keys(p).length === 0) {
            if (this.utilService.isFirstRoute(this.taxDependentMap)) {
              this.currentUserIndex = Object.keys(this.taxDependentMap)[0]
            }
            else if (this.utilService.isLastRoute(this.taxDependentMap)) {
              this.currentUserIndex = Object.keys(this.taxDependentMap)[Object.keys(this.taxDependentMap).length - 1];
            }
          }
          else {
            this.currentUserIndex = p.userId || "";
          }

          this.houseHoldHeadPersons = this.applyNowState.houseHoldDetails.houseHoldPersons as IHouseHold[];
          this.currentUser = this.extractUser(this.houseHoldHeadPersons, this.currentUserIndex) || "";

          const filteredUserId: number[] = [];
          this.householdMembers =  this.houseHoldHeadPersons; // TODO:- this is temp fix for demo. Need to rething the startegy.
          // TODO:- Code Needs to be refactored
          // this.houseHoldHeadPersons.filter((x) => {
          //   const isPersonHusband = x.memberRelationships?.filter(x => x.relationshipType === "H");
          //   const isPersonWife = x.memberRelationships?.filter(x => x.relationshipType === "W");
          //   if (x.filingStatus?.toUpperCase() === "YES") {
          //     if (x.isFederalTaxReturn && !filteredUserId.includes(x.id as number)) {
          //       let lookUpId: number = 0;
          //       if (isPersonHusband && isPersonHusband.length > 0) {
          //         lookUpId = isPersonHusband[0].individualLookupId;
          //       }
          //       else if (isPersonWife && isPersonWife.length > 0) {
          //         lookUpId = isPersonWife[0].individualLookupId;
          //       }
          //       filteredUserId.push(+lookUpId);
          //       if (!this.householdMembers.find(z => z.id === x.id)) {
          //         this.householdMembers.push(x);
          //       }
          //     }
          //     else {
          //       if (!filteredUserId.includes(x.id as number)) {
          //         if (!this.householdMembers.find(z => z.id === x.id)) {
          //           this.householdMembers.push(x);
          //         }
          //       }
          //     }
          //   }
          //   else {
          //     if (!this.householdMembers.find(z => z.id === x.id)) {
          //       this.householdMembers.push(x);
          //     }
          //   }
          // });

          // const alreadyClaimedTaxDependent: IHouseHold[] = [];
          // this.householdMembers.forEach((y) => {
          //   this.houseHoldHeadPersons.forEach(x => {
          //     if (x.claimTaxDependentPersons && x.claimTaxDependentPersons.length > 0) {
          //       if (x.claimTaxDependentPersons?.includes(y.id as number)) {
          //         if (!alreadyClaimedTaxDependent.find(x => x.id === y.id)) {
          //           alreadyClaimedTaxDependent.push(y);
          //         }
          //       }
          //     }
          //   });
          // });

          // this.householdMembers = this.householdMembers.filter(x => !alreadyClaimedTaxDependent.find(z => z.id === x.id));
          // this.householdMembers = this.householdMembers.filter(x => x.id !== +this.currentUserIndex && x.isFederalTaxReturn);
          
          of(true).pipe(delay(10)).subscribe(() => {
            this.taxDependentsDetailsForm.patchValue({
              selectedPerson: this.currentUser.taxClaimedPerson
            });
          });
        });

        this.eventsSubscription?.add(getAppData$);

      });

      this.setOrResetValidator();
    this.eventsSubscription?.add(activatedRoute$);
  }

  private extractUser(persons: any, userId: any) {
    const currentUser = persons.filter((person: IHouseHold) => {
      return person.id?.toString() === userId.toString();
    })[0];
    return currentUser;
  }

  public isFieldValid(field: string) {
    return (this.taxDependentsDetailsForm.get(field)?.status !== 'VALID');
  }

  public goNext(): boolean {
    if (this.taxDependentsDetailsForm.valid && this.applyNowState) {
      let storeHouseholdDetails = { ...this.applyNowState.houseHoldDetails };
      const storedHouseHoldPerson = [...this.applyNowState.houseHoldDetails.houseHoldPersons as IHouseHold[]];
      const updatedPersonDetails = storedHouseHoldPerson.map(obj => {
        if (obj.id == this.currentUserIndex) {
          const updatedouseHoldPerson = Object.assign({}, obj, { taxClaimedPerson: this.taxDependentsDetailsForm.value.selectedPerson });
          return updatedouseHoldPerson;
        }
        else {
          return obj;
        }
      });

      let isNextPage = false;
      this.taxDependentMap[this.currentUserIndex] = true;

      const updatedPageAction = {
        taxDependentMap: { ...storeHouseholdDetails.pageAction?.taxDependentMap, ...this.taxDependentMap },
        serviceDirection: PageDirection.NEXT
      };

      this.service.updateHouseHoldDetails({ ...storeHouseholdDetails, ...{ houseHoldPersons: updatedPersonDetails }, ...{ pageAction: updatedPageAction } })

      if (this.taxDependentMap != null) {
        isNextPage = this.utilService.isNextPage(this.taxDependentMap);
      }

      if (isNextPage) {
        this.utilService
          .getCurrentUserIdPageAction(this.taxDependentMap, PageDirection.NEXT)
          .subscribe((id: any) => {
            this.currentUserIndex = id.toString();
            this.taxDependentsDetailsForm.reset();
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
      this.taxDependentMap[this.currentUserIndex] = false;
      const storeHouseholdDetails = this.applyNowState.houseHoldDetails;
      const updatedPageAction = {
        taxDependentMap: { ...storeHouseholdDetails.pageAction?.taxDependentMap, ...this.taxDependentMap },
        serviceDirection: PageDirection.NEXT
      };

      this.service.updateHouseHoldDetails({ ...storeHouseholdDetails, ...{ pageAction: updatedPageAction } })

      if (Object.keys(this.taxDependentMap)[0].toString() !== this.currentUserIndex.toString()) {
        this.utilService
          .getCurrentUserIdPageAction(this.taxDependentMap, PageDirection.BACK)
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
      fieldName: 'selectedPerson',
      optionalProgram: [] as string[],
      requiredProgram: ProgramConstants.IND_TAX_DEPENDENT_DETAILS_REQUIREDPROGRAMS as string[]

    }] as FormValidatorField[];

    if (householdBenefits != null && householdBenefits.length > 0) {
      const requiredOrOptionalValidatorField =
        {
          selectedPrograms: householdBenefits,
          requiredFields: this.requiredFields,
          formGroup: this.taxDependentsDetailsForm,
          fields: fields
        } as RequiredOrOptionalValidatorField
      Utility.setOrClearValidatorForFieldWithDifferntPrograms(requiredOrOptionalValidatorField)
      this.taxDependentsDetailsForm = requiredOrOptionalValidatorField.formGroup;
      this.requiredFields = [...requiredOrOptionalValidatorField.requiredFields] as any;
    }
  }
  
  public goToHouseHoldScreen(): void {
    this.router.navigate([RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_HOUSEHOLD + "/" + RoutePath.APPLYNOW_HOUSEHOLD_HOUSEHOLDANOTHERPERSON])
  }
  
  public ngOnDestroy(): void {
    this.eventsSubscription?.unsubscribe();
  }
}
