import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IND_FAMILYPLANNING_REVIEW_CONDITIONALPROGRAMS, IND_FAMILYPLANNING_REVIEW_REQUIREDPROGRAMS } from '../../../shared/constants/Individual_Programs_Constants';
import { RoutePath } from '../../../shared/route-strategies';
import { PageActionUtil } from '../../../shared/services/page-action-util.service';
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold } from '../../household/household-model';

@Component({
  selector: 'compass-ui-family-planning-service-afraid',
  templateUrl: './family-planning-service-afraid.component.html',
  styleUrls: ['./family-planning-service-afraid.component.scss']
})
export class FamilyPlanningServiceAfraidComponent implements OnInit {

  familyPanningAfraidGroup: FormGroup | any; houseHoldPersons: IHouseHold[] = [];
isSamePage!:boolean;
  currentUserIndex!: number;
  currentUserName!: string;
  requiredFields = [] as string[]
  constructor(private fb: FormBuilder, private service: ApplyNowStoreService,
    private pageActionUtil: PageActionUtil, private router: Router) {

    this.familyPanningAfraidGroup = this.fb.group({

      familyPanningAfraid: ['', Validators.required],

    });

  }

  ngOnInit(): void {
    this.pageActionUtil.initPageMap("familyPlanningServiceAfraidMap", "familyPlanningServiceAfraidDirection", false);
    this.currentUserIndex = this.pageActionUtil.userIndex ?? 0;
    let householdBenefits = this.service?.getBenefits() as string[];

    const fields = [{
      fieldName: 'familyPanningAfraid',
      optionalProgram: IND_FAMILYPLANNING_REVIEW_CONDITIONALPROGRAMS as string[],
      requiredProgram: IND_FAMILYPLANNING_REVIEW_REQUIREDPROGRAMS as string[]

    }] as FormValidatorField[]
    if (householdBenefits != null && householdBenefits.length > 0) {
      const requiredOrOptionalValidatorField =
        {

          selectedPrograms: householdBenefits,
          requiredFields: [],
          formGroup: this.familyPanningAfraidGroup,
          fields: fields
        } as RequiredOrOptionalValidatorField
      Utility.setOrClearValidatorForFieldWithDifferntPrograms(requiredOrOptionalValidatorField)
      this.familyPanningAfraidGroup = requiredOrOptionalValidatorField.formGroup;
      this.requiredFields = [...requiredOrOptionalValidatorField.requiredFields] as any;
    }
    
    this.initUserDetail();

 
  }
  initUserDetail() {
    this.houseHoldPersons = this.service.getHouseholdPersons();
  
    if (this.houseHoldPersons.length > 0) {
 

      const reviewedForFamilyPlanningServices = this.houseHoldPersons[this.currentUserIndex].isAfraidOfPhysicalOrEmotionalOrOtherHarm as any;
      this.currentUserName = this.houseHoldPersons[this.currentUserIndex]?.firstName as any;
     
      if (reviewedForFamilyPlanningServices != null && reviewedForFamilyPlanningServices !== "") {
        this.familyPanningAfraidGroup.controls['familyPanningAfraid'].patchValue(reviewedForFamilyPlanningServices);
        this.isSamePage = false;

      }
      else {
        this.familyPanningAfraidGroup.controls['familyPanningAfraid'].patchValue();
        this.isSamePage = true
      }
    }
  }
  isFieldValid(field: string): boolean {

    return (this.familyPanningAfraidGroup.get(field).status !== 'VALID' && !this.isSamePage && (this.familyPanningAfraidGroup.get(field).dirty || this.familyPanningAfraidGroup.get(field).touched))
  }
  back() {
    const id = this.pageActionUtil.backUserId();
    if (id < 0) {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FAMILYPLANNINGREVIEWREVIEW]);
      return;
    }
    this.currentUserIndex = id;
    this.initUserDetail();

  }
  next() {
    
    const familyPanningAfraid = this.familyPanningAfraidGroup.controls['familyPanningAfraid'].value;
    const isValid = this.familyPanningAfraidGroup.valid;
    this.familyPanningAfraidGroup.markAllAsTouched();
    if (!isValid && familyPanningAfraid === "") {
      this.isSamePage=false;
      return;
    }

    const storedHouseholdDetails = this.service.getHouseHoldDetails;

    let persons = [...this.houseHoldPersons];
    persons = persons.map((item, ind) => ((ind == this.currentUserIndex) ? {
      ...item,
      isAfraidOfPhysicalOrEmotionalOrOtherHarm: familyPanningAfraid
    } : { ...item }));

    this.houseHoldPersons = [...persons];

    this.service.updateHouseHoldDetails(
      { ...storedHouseholdDetails, houseHoldPersons: this.houseHoldPersons } as any
    )
    const id = this.pageActionUtil.nextUserId();
    if (id < 0) {
      this.service.updateFromSummary({ isFromAdd: false, benefitId: null,userIds:null })
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FAMILYPLANNINGSUMMARY]);
      return;
    }
    this.currentUserIndex = id;
    this.initUserDetail();

  }

}
