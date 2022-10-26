import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IND_SSI_CONDITIONALPROGRAMS, IND_SSI__REQUIREDPROGRAMS } from '../../../shared/constants/Individual_Programs_Constants';
import { RoutePath } from '../../../shared/route-strategies';
import { PageActionUtil } from '../../../shared/services/page-action-util.service';
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, IIndividualExistingBenefits } from '../../household/household-model';

@Component({
  selector: 'compass-ui-supplemental-security-income-details',
  templateUrl: './supplemental-security-income-details.component.html',
  styleUrls: ['./supplemental-security-income-details.component.scss']
})
export class SupplementalSecurityIncomeDetailsComponent implements OnInit {
  supplementalSecurityIncomeDetailsGroup: FormGroup | any; houseHoldPersons: IHouseHold[] = [];
  individualExistingBenefits!: IIndividualExistingBenefits |null
  currentUserIndex!: number;
  currentUserName!:string;
  isSamePage!:boolean
  requiredFields = [] as string[]
  constructor(private fb: FormBuilder, private service: ApplyNowStoreService,
    private pageActionUtil: PageActionUtil, private router: Router) { 

    this.supplementalSecurityIncomeDetailsGroup = this.fb.group({
     
      socialSecurityStarted: [''],
      socialSecurityIncreased: [''],
     
    });

  }

  ngOnInit(): void 
  {
    let householdBenefits = this.service?.getBenefits() as string[];
    const fields = [{
      fieldName:'socialSecurityStarted',
      optionalProgram: IND_SSI_CONDITIONALPROGRAMS as string[],
      requiredProgram: IND_SSI__REQUIREDPROGRAMS as string[]

    }, {
      fieldName: 'socialSecurityIncreased',
        optionalProgram: IND_SSI_CONDITIONALPROGRAMS as string[],
        requiredProgram: IND_SSI__REQUIREDPROGRAMS as string[]

      }] as FormValidatorField[]
    if (householdBenefits != null && householdBenefits.length > 0) {
      const requiredOrOptionalValidatorField =
        {

          selectedPrograms: householdBenefits,
          requiredFields: this.requiredFields,
          formGroup: this.supplementalSecurityIncomeDetailsGroup,
          fields:fields
        } as RequiredOrOptionalValidatorField
      Utility.setOrClearValidatorForFieldWithDifferntPrograms(requiredOrOptionalValidatorField)
      this.supplementalSecurityIncomeDetailsGroup = requiredOrOptionalValidatorField.formGroup;
      this.requiredFields = [...requiredOrOptionalValidatorField.requiredFields] as any;
    }  
 this.initUserDetail();
    
  }
  initUserDetail(){
    
    this.houseHoldPersons = this.service.getHouseholdPersons();
    this.pageActionUtil.initPageMap("SSIIncomeMap", "SSIIncomeMapDirection", false);
    if (this.houseHoldPersons.length > 0) {
      this.currentUserIndex = this.pageActionUtil.userIndex ?? 0;

      this.individualExistingBenefits = this.houseHoldPersons[this.currentUserIndex].individualExistingBenefits as any;
      this.currentUserName = this.houseHoldPersons[this.currentUserIndex]?.firstName as any;
      this.isSamePage = this.individualExistingBenefits != null && JSON.stringify(this.individualExistingBenefits)!=='{}' && !this.isNullOrUndefined(this.individualExistingBenefits.wasSSIStoppedBecauseSocialSecurityStarted) && !this.isNullOrUndefined(this.individualExistingBenefits.wasSSIStoppedBecauseSocialSecurityIncreased)?false:true;
     
        this.supplementalSecurityIncomeDetailsGroup.controls['socialSecurityIncreased'].patchValue(this.individualExistingBenefits?.wasSSIStoppedBecauseSocialSecurityIncreased ? (this.individualExistingBenefits?.wasSSIStoppedBecauseSocialSecurityIncreased === "Y" ? "Yes" : "No") : null);
        this.supplementalSecurityIncomeDetailsGroup.controls['socialSecurityStarted'].patchValue(this.individualExistingBenefits?.wasSSIStoppedBecauseSocialSecurityStarted ? (this.individualExistingBenefits?.wasSSIStoppedBecauseSocialSecurityStarted === "Y" ? "Yes" : "No") : null);
    }
  }
  isFieldValid(field: string): boolean {
   
    return (this.supplementalSecurityIncomeDetailsGroup.get(field).status !== 'VALID' && !this.isSamePage && (this.supplementalSecurityIncomeDetailsGroup.get(field).dirty || this.supplementalSecurityIncomeDetailsGroup.get(field).touched))
  }
  back(){
    const id = this.pageActionUtil.backUserId();
    if (id < 0) {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_SUPPLEMENTALSECURITYINCOME]);
      return;
    }
    this.currentUserIndex = id;
    this.initUserDetail();
   
  }
  next(){
    const ssIncreased = this.supplementalSecurityIncomeDetailsGroup.controls['socialSecurityIncreased'].value;
    const ssStarted = this.supplementalSecurityIncomeDetailsGroup.controls['socialSecurityStarted'].value;
    const isValid = this.supplementalSecurityIncomeDetailsGroup.valid;
    this.supplementalSecurityIncomeDetailsGroup.markAllAsTouched();
    
    if (!isValid)
    {
      this.isSamePage=false;
      return
    }

    const storedHouseholdDetails = this.service.getHouseHoldDetails;
    let individualExistingBenefits={} as any;
    individualExistingBenefits.wasSSIStoppedBecauseSocialSecurityIncreased =(ssIncreased!==null)? ssIncreased.charAt(0):null;
    individualExistingBenefits.wasSSIStoppedBecauseSocialSecurityStarted =(ssStarted!==null)? ssStarted.charAt(0):null;
    let persons = [...this.houseHoldPersons];
        persons = persons.map((item, ind) => ((ind == this.currentUserIndex) ? {
          ...item,
          individualExistingBenefits: individualExistingBenefits
        } : { ...item }));

    this.houseHoldPersons = [...persons];
   
    this.service.updateHouseHoldDetails(
      { ...storedHouseholdDetails, houseHoldPersons: this.houseHoldPersons } as any
    )
    this.service.updateFromSummary({ isFromAdd: false, benefitId: null,userIds:[] })
    const id = this.pageActionUtil.nextUserId();
    if (id < 0) {
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_SUPPLEMENTALSECURITYINCOMESUMMARY]);
    return;
    }
    this.currentUserIndex=id;
    this.initUserDetail();
    
  }
  isNullOrUndefined(property:any){
    return property!==undefined && property!==null && property!==""
  }

}
