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
  selector: 'compass-ui-family-planning-service-review',
  templateUrl: './family-planning-service-review.component.html',
  styleUrls: ['./family-planning-service-review.component.scss']
})
export class FamilyPlanningServiceReviewComponent implements OnInit {

  familyPanningReviewdGroup: FormGroup | any; houseHoldPersons: IHouseHold[] = [];
  
  currentUserIndex!: number;
  currentUserName!: string;
  isSamePage!:boolean
  requiredFields = [] as string[]
  constructor(private fb: FormBuilder, private service: ApplyNowStoreService,
    private pageActionUtil: PageActionUtil, private router: Router) {

    this.familyPanningReviewdGroup = this.fb.group({

      familyPanningReviewd: [''],
    
    });

  }

  ngOnInit(): void {


    this.pageActionUtil.initPageMap("familyPlanningServiceMap", "familyPlanningServiceDirection", false);
    this.currentUserIndex = this.pageActionUtil.userIndex ?? 0;
    let householdBenefits = this.service?.getBenefits() as string[];
    
    const fields = [{
      fieldName: 'familyPanningReviewd',
      optionalProgram: IND_FAMILYPLANNING_REVIEW_CONDITIONALPROGRAMS as string[],
      requiredProgram: IND_FAMILYPLANNING_REVIEW_REQUIREDPROGRAMS as string[]

    }] as FormValidatorField[]
    if (householdBenefits != null && householdBenefits.length > 0) {
      const requiredOrOptionalValidatorField =
        {

          selectedPrograms: householdBenefits,
          requiredFields: [],
          formGroup: this.familyPanningReviewdGroup,
          fields: fields
        } as RequiredOrOptionalValidatorField
      Utility.setOrClearValidatorForFieldWithDifferntPrograms(requiredOrOptionalValidatorField)
      this.familyPanningReviewdGroup = requiredOrOptionalValidatorField.formGroup;
      this.requiredFields = [...requiredOrOptionalValidatorField.requiredFields] as any;
    }
    this.initUserDetail();

  }
  initUserDetail() {
    this.houseHoldPersons = this.service.getHouseholdPersons();

    if (this.houseHoldPersons.length > 0) {
     

      const reviewedForFamilyPlanningServices = this.houseHoldPersons[this.currentUserIndex].reviewedForFamilyPlanningServices as any;
      this.currentUserName = this.houseHoldPersons[this.currentUserIndex]?.firstName as any;
      this.isSamePage = (reviewedForFamilyPlanningServices != null && reviewedForFamilyPlanningServices !== "")?false:true;
      this.familyPanningReviewdGroup.controls['familyPanningReviewd'].patchValue(reviewedForFamilyPlanningServices);
      

    }
  }
  isFieldValid(field: string): boolean {

    return (this.familyPanningReviewdGroup.get(field).status !== 'VALID' && !this.isSamePage && (this.familyPanningReviewdGroup.get(field).dirty || this.familyPanningReviewdGroup.get(field).touched))
  }
  back() {
    const id = this.pageActionUtil.backUserId();
    if (id < 0) {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FAMILYPLANNINGSERVICES]);
      return;
    }
    this.currentUserIndex = id;
    this.initUserDetail();

  }
  next() {
    const familyPanningReviewd = this.familyPanningReviewdGroup.controls['familyPanningReviewd'].value;
    const isValid = this.familyPanningReviewdGroup.valid;
    this.familyPanningReviewdGroup.markAllAsTouched();
    
    if (!isValid && familyPanningReviewd === "") {
      this.isSamePage = false;
      return;
    }

    const storedHouseholdDetails = this.service.getHouseHoldDetails;
    
    let persons = [...this.houseHoldPersons];
    persons = persons.map((item, ind) => ((ind == this.currentUserIndex) ? {
      ...item,
      reviewedForFamilyPlanningServices: familyPanningReviewd
    } : { ...item }));

    this.houseHoldPersons = [...persons];

    this.service.updateHouseHoldDetails(
      { ...storedHouseholdDetails, houseHoldPersons: this.houseHoldPersons } as any
    )
    const id = this.pageActionUtil.nextUserId();
    if (id < 0) {
    this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FAMILYPLANNINGREVIEWREVIEWAFRAID]); ;
    return;
    }
    this.currentUserIndex = id;
    this.initUserDetail();

  }
}
