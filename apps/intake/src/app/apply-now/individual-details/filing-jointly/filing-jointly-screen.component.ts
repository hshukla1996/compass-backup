import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IApplyNowState } from '../../+state/apply-now.models';
import { ApplyNowIndividualDetailsFilingStatusStrategy } from '../../../shared/route-strategies/apply-now/individual-details-filing-status';
import { UtilService } from '../../../shared/services/util.service';
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, IRelationships, PageDirection } from '../../household/household-model';
import * as ProgramConstants from "../../../shared/constants/Individual_Programs_Constants";

@Component({
  selector: 'compass-ui-filing-jointly',
  templateUrl: './filing-jointly-screen.component.html',
  styleUrls: ['./filing-jointly-screen.component.scss'],
  providers: [ApplyNowIndividualDetailsFilingStatusStrategy]
})
export class FilingJointlyComponent implements OnInit {

  private applyNowState: IApplyNowState | undefined;
  private eventsSubscription: Subscription | undefined;
  public houseHoldHeadPersons: IHouseHold[] = [];
  private HouseHoldHeadNameObject?: IHouseHold;
  private HouseHoldHeadSpouseObject!: IHouseHold;
  private currentFederalTaxReturnMap: any = {};
  private claimTaxDependentMap: any = {};
  private currentUserIndex!: any;
  public currentUser: IHouseHold = {};
  public questionText: string = '';
  public filingJointlyForm: FormGroup | any;
  public displayError: boolean = false;
  public requiredFields = [] as string[];
  constructor(
    private service: ApplyNowStoreService,
    private router: Router,
    private routingStratagy: ApplyNowIndividualDetailsFilingStatusStrategy,
    private utilService: UtilService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    // setTimeout(() => {
    //   let radioLabel = document.getElementsByClassName("form-check-label")[0];
    //   radioLabel.classList.add("mt-3");
    // }, 10);

    this.filingJointlyForm = this.fb.group({
      id: this.fb.array([]),
      isJointlyApplied: [""]
    });

    this.HouseHoldHeadNameObject = undefined;
    const activatedRoute$ = this.activatedRoute.params.
      subscribe((p) => {
        const getData$ = this.service.getAppData().subscribe(d => {
          this.applyNowState = { ...d };
          this.houseHoldHeadPersons = this.applyNowState.houseHoldDetails.houseHoldPersons as IHouseHold[];
          this.currentFederalTaxReturnMap = { ...this.applyNowState.houseHoldDetails.pageAction?.federalTaxReturnMap } || {};
          this.claimTaxDependentMap = { ...this.applyNowState.houseHoldDetails.pageAction?.claimTaxDependentMap } || {};
          if (Object.keys(p).length === 0) {
            if (this.utilService.isFirstRoute(this.currentFederalTaxReturnMap)) {
              this.currentUserIndex = Object.keys(this.currentFederalTaxReturnMap)[0]
            }
            else if (this.utilService.isLastRoute(this.currentFederalTaxReturnMap)) {
              this.currentUserIndex = Object.keys(this.currentFederalTaxReturnMap)[Object.keys(this.currentFederalTaxReturnMap).length - 1];
            }
          }
          else {
            this.currentUserIndex = p.userId || "";
          }

          this.currentUser = this.extractUser(this.houseHoldHeadPersons, this.currentUserIndex) || "";

          const currentUserDetails = this.houseHoldHeadPersons.find((x) => x.id === +this.currentUserIndex) as IHouseHold;
          const isMemberHusband = (currentUserDetails.memberRelationships as IRelationships[]).find(x => x.relationshipType === 'H');
          const isMemberWife = (currentUserDetails.memberRelationships as IRelationships[]).find(x => x.relationshipType === 'W');

          if (isMemberHusband != null) {
            this.HouseHoldHeadNameObject = currentUserDetails;
            this.HouseHoldHeadSpouseObject = this.houseHoldHeadPersons.find(x => x.id === +isMemberHusband.individualLookupId) as IHouseHold
          }
          else if (isMemberWife != null) {
            this.HouseHoldHeadNameObject = currentUserDetails;
            this.HouseHoldHeadSpouseObject = this.houseHoldHeadPersons.find(x => x.id === +isMemberWife.individualLookupId) as IHouseHold;
          }

          this.questionText = `Will ${this.HouseHoldHeadNameObject?.firstName} file taxes jointly with ${this.HouseHoldHeadSpouseObject
            .firstName}`

          this.filingJointlyForm.get('isJointlyApplied').patchValue(currentUserDetails.filingStatus
            && currentUserDetails.filingStatus === "Y" ? 'Yes' : currentUserDetails.filingStatus === "N" ? 'No' : '');

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
      return userId ? person.id?.toString() === userId.toString() : false;
    })[0];
    return currentUser;
  }

  public showNextPage(): boolean {
    if (this.applyNowState && this.applyNowState.houseHoldDetails && this.applyNowState.houseHoldDetails.houseHoldPersons) {
      this.service.validateAllFormFields(this.filingJointlyForm);
      if (this.filingJointlyForm.status.toLowerCase() === 'valid') {
        const storedHouseholdDetails = this.applyNowState.houseHoldDetails;
        let spouseLookupId: number = 0;
        const clonedUpdatedPerson: IHouseHold[] = [];
        this.applyNowState.houseHoldDetails.houseHoldPersons.forEach((person: IHouseHold) => {
          const clonedPerson = { ...person };
          if (person.id === +this.currentUserIndex) {
            clonedPerson.filingStatus = this.filingJointlyForm.value.isJointlyApplied && this.filingJointlyForm.value.isJointlyApplied.toUpperCase() === 'YES' ? 'Y' : 'N';
            clonedPerson.claimTaxDependentPersons = [];
            let isPersonHusband = clonedPerson.memberRelationships?.filter(x => x.relationshipType === 'H');
            let isPersonWife = clonedPerson.memberRelationships?.filter(x => x.relationshipType === 'W');
            if (isPersonHusband && isPersonHusband.length > 0) {
              spouseLookupId = isPersonHusband[0].individualLookupId;
            }
            if (isPersonWife && isPersonWife.length > 0) {
              spouseLookupId = isPersonWife[0].individualLookupId;
            }
          }
          clonedUpdatedPerson.push(clonedPerson);
        });

        const spouseObject = clonedUpdatedPerson.find(x => x.id === +spouseLookupId);
        if (spouseObject) {

          spouseObject.filingStatus = this.filingJointlyForm.value.isJointlyApplied && this.filingJointlyForm.value.isJointlyApplied.toUpperCase() === "YES" ? 'Y' : 'N';
          const isSpouseFillingReturn = this.applyNowState.houseHoldDetails.houseHoldPersons.find(x => x.id === +spouseLookupId)?.isFederalTaxReturn;

          if (this.filingJointlyForm.value.isJointlyApplied?.toUpperCase() === "NO" && (isSpouseFillingReturn && isSpouseFillingReturn === 'Y')) {
            spouseObject.claimTaxDependentPersons = [];
            const isAvailable = Object.keys(this.currentFederalTaxReturnMap).find(x => +x === +spouseLookupId);
            if (!isAvailable) {
              this.claimTaxDependentMap[spouseLookupId] = false;
              let sortedTaxDependentMap: any = {};
              this.utilService.sortNames(Object.keys(this.claimTaxDependentMap), [], '').forEach((id) => {
                sortedTaxDependentMap[id] = false;
              });

              this.claimTaxDependentMap = sortedTaxDependentMap;
            }
          }
          else {
            delete this.claimTaxDependentMap[spouseLookupId];
          }
        }

        // let isNextPage = false;
        this.currentFederalTaxReturnMap[this.currentUserIndex] = true;

        const updatedPageAction = {
          federalTaxReturnMap: { ...storedHouseholdDetails.pageAction?.federalTaxReturnMap, ...this.currentFederalTaxReturnMap },
          claimTaxDependentMap: { ...storedHouseholdDetails.pageAction?.claimTaxDependentMap, ...this.claimTaxDependentMap },
          serviceDirection: PageDirection.NEXT
        };

        if (storedHouseholdDetails) {
          this.service.updateHouseHoldDetails(
            { ...storedHouseholdDetails, ...{ houseHoldPersons: clonedUpdatedPerson }, ...{ pageAction: updatedPageAction } }
          )
        }

        // if (this.currentFederalTaxReturnMap != null) {
        //   isNextPage = this.utilService.isNextPage(this.currentFederalTaxReturnMap);
        // }


        this.router.navigate([this.routingStratagy.nextRoute(), { userId: this.currentUserIndex }]);
        // if (isNextPage) {
        //   this.utilService
        //     .getCurrentUserIdPageAction(this.currentFederalTaxReturnMap, PageDirection.NEXT)
        //     .subscribe((id: any) => {
        //       this.currentUserIndex = id.toString();
        //       this.filingJointlyForm.reset();
        //       this.router.navigate([
        //         this.routingStratagy.currentRoute,
        //         { userId: this.currentUserIndex },
        //       ]);
        //     });
        // } else {
        //   this.router.navigate([this.routingStratagy.nextRoute()]);
        // }
      }
      else {
        this.displayError = true;
        return false;
      }
    }

    return false;
  }

  public showPreviousPage() {
    this.router.navigate([this.routingStratagy.previousRoute()]);
  }


  isFieldValid(field: string): boolean {
    return (this.filingJointlyForm.get(field).status !== 'VALID' && this.filingJointlyForm.get(field).touched)
  }

  setOrResetValidator() {
    let householdBenefits = this.service?.getBenefits() as string[];
    const fields = [{
      fieldName: 'isJointlyApplied',
      optionalProgram: [] as string[],
      requiredProgram: ProgramConstants.IND_FILING_JOINTLY_REQUIREDPROGRAMS as string[]

    }] as FormValidatorField[];

    if (householdBenefits != null && householdBenefits.length > 0) {
      const requiredOrOptionalValidatorField =
        {
          selectedPrograms: householdBenefits,
          requiredFields: this.requiredFields,
          formGroup: this.filingJointlyForm,
          fields: fields
        } as RequiredOrOptionalValidatorField
      Utility.setOrClearValidatorForFieldWithDifferntPrograms(requiredOrOptionalValidatorField)
      this.filingJointlyForm = requiredOrOptionalValidatorField.formGroup;
      this.requiredFields = [...requiredOrOptionalValidatorField.requiredFields] as any;
    }
  }
  
  errorMap(field: string) {
    if (!this.isFieldValid(field)) {
      return "";
    }

    switch (field) {
      case 'isJointlyApplied':
        if (this.filingJointlyForm.get('isJointlyApplied').errors.required) {
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
