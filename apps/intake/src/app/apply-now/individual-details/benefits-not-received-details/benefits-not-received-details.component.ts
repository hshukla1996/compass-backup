import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApplyNowStoreService } from '../../apply-now-store-service';

import { AppStoreService } from '../../../app-store-service';
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from '../../../shared/utilities/Utility';

import { PageActionUtil } from '../../../shared/services/page-action-util.service';
import { IHouseHold } from '../../household/household-model';
import { from } from 'rxjs';
import { IBenefits, IBenefitsNotReceivedInformation, IFromSummary } from '../../+state/apply-now.models';
import { RoutePath } from '../../../shared/route-strategies';
import { Router } from '@angular/router';
import { IND_BENEFITNOTRECEIVED_DETAIL_CONDITIONALPROGRAMS, IND_BENEFITNOTRECEIVED_DETAIL_REQUIREDPROGRAMS } from '../../../shared/constants/Individual_Programs_Constants';


@Component({
  selector: 'compass-ui-benefits-not-received-details',
  templateUrl: './benefits-not-received-details.component.html',
  styleUrls: ['./benefits-not-received-details.component.scss']
})
export class BenefitsNotReceviedDetailsComponent implements OnInit, OnDestroy {

 
  public benefitTypes: any = [];
  public _benefitTypes: any = [];
  public benefitsNotReceviedDetailsForm!: FormGroup |any;
  householdPersons!: IHouseHold[]
  maxDateRange: any;
   currentUserName!:string
   currentUserIndex!:number
   currentBenefit!:string | null
   isSamePage!:boolean;
   isDisabled!:boolean;
  requiredFields = [] as string[]
  constructor(private fb: FormBuilder,
    private service: ApplyNowStoreService,
    private cd: ChangeDetectorRef,
    private appService: AppStoreService,
    private pageActionUtil: PageActionUtil, private router: Router, ) {
      this.benefitsNotReceviedDetailsForm = this.fb.group({
      benefitType: ['', ],
      benefitApplyDate: ['', Utility.dateMaxValidator()],
      applyForBenefits: ['', ],
      benefitReceivedDate: ['', Utility.dateMaxValidator()],
    });
    this.appService.getBenefitTypes().subscribe((types) => {
      this.benefitTypes = types;
      this._benefitTypes=types;
    })

  }

  /**
   * Initialising the form with default values
   */
  ngOnInit() {
    
    
    let householdBenefits = this.service?.getBenefits() as string[];
    const fields = [{
      fieldName: 'benefitType',
      optionalProgram: IND_BENEFITNOTRECEIVED_DETAIL_CONDITIONALPROGRAMS as string[],
      requiredProgram: IND_BENEFITNOTRECEIVED_DETAIL_REQUIREDPROGRAMS as string[]

    }, {
      fieldName: 'benefitApplyDate',
      optionalProgram: IND_BENEFITNOTRECEIVED_DETAIL_CONDITIONALPROGRAMS as string[],
      requiredProgram: IND_BENEFITNOTRECEIVED_DETAIL_REQUIREDPROGRAMS as string[]

    },
      {
        fieldName: 'applyForBenefits',
        optionalProgram: IND_BENEFITNOTRECEIVED_DETAIL_CONDITIONALPROGRAMS as string[],
        requiredProgram: IND_BENEFITNOTRECEIVED_DETAIL_REQUIREDPROGRAMS as string[]

      },
      {
        fieldName: 'benefitReceivedDate',
        optionalProgram: IND_BENEFITNOTRECEIVED_DETAIL_CONDITIONALPROGRAMS as string[],
        requiredProgram: IND_BENEFITNOTRECEIVED_DETAIL_REQUIREDPROGRAMS as string[]

      }] as FormValidatorField[]
    if (householdBenefits != null && householdBenefits.length > 0) {
      const requiredOrOptionalValidatorField =
        {

          selectedPrograms: householdBenefits,
          requiredFields: [],
          formGroup: this.benefitsNotReceviedDetailsForm,
          fields: fields
        } as RequiredOrOptionalValidatorField
      Utility.setOrClearValidatorForFieldWithDifferntPrograms(requiredOrOptionalValidatorField)
      this.benefitsNotReceviedDetailsForm = requiredOrOptionalValidatorField.formGroup;
      this.requiredFields = [...requiredOrOptionalValidatorField.requiredFields] as any;
    }  
    this.initUserDetails();
  }



 
  isFieldValid(field: string): boolean {
  
    
   return  (this.requiredFields.indexOf(field) > -1) ? (this.benefitsNotReceviedDetailsForm.get(field).status !== 'VALID' && (this.benefitsNotReceviedDetailsForm.get(field).dirty || this.benefitsNotReceviedDetailsForm.get(field).touched) &&  !this.isSamePage):false
    
  }

  errorMap(field: string) {
    if (!this.isFieldValid(field)) {
      return "";
    }
    switch (field) {
      case "benefitApplyDate":
        if (this.benefitsNotReceviedDetailsForm.get('benefitApplyDate').errors?.required) {
            return 'Date is required.'
        }
        if (this.benefitsNotReceviedDetailsForm.get('benefitApplyDate').errors?.invalidDate) {
            return 'Date must be in the past.'
        }
        if (this.benefitsNotReceviedDetailsForm.get("benefitApplyDate").errors.duetInvalidDate) {
            return "duetInvalidDate";
        }
        break;
      case "benefitReceivedDate":
        if (this.benefitsNotReceviedDetailsForm.get('benefitReceivedDate').errors?.required) {
            return 'Date is required.'
        }
        if (this.benefitsNotReceviedDetailsForm.get('benefitReceivedDate').errors?.invalidDate) {
            return 'Date must be in the past.'
        }
        if (this.benefitsNotReceviedDetailsForm.get("benefitReceivedDate").errors.duetInvalidDate) {
            return "duetInvalidDate";
        }
        break;
      default:
        return "";
    }
    return "";
  }

  
  public ngOnDestroy(): void {
    //this.eventsSubscription?.unsubscribe();
  }
  back(){
    this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_BENEFITSNOTRECEIVED]);
  }
  validate(field:string){
    return (this.benefitsNotReceviedDetailsForm.get(field).status !== 'VALID' && (this.benefitsNotReceviedDetailsForm.get(field).dirty || this.benefitsNotReceviedDetailsForm.get(field).touched))
  }
  next(){

    this.benefitsNotReceviedDetailsForm.markAllAsTouched();
  
    const isValid = this.benefitsNotReceviedDetailsForm.valid;
  
    if (!isValid) {
      this.isSamePage=false;
      return;
    }
    const benefitType = this.benefitsNotReceviedDetailsForm.get('benefitType').value
    const benefitApplyDate = this.benefitsNotReceviedDetailsForm.get('benefitApplyDate').value
    const applyForBenefits = this.benefitsNotReceviedDetailsForm.get('applyForBenefits').value
    const benefitReceivedDate = this.benefitsNotReceviedDetailsForm.get('benefitReceivedDate').value
    let benefits = [...this.getBenefits] as any[]
    if (this.getBenefitId != null)
    {
      benefits = [...this.updateBenefitById(this.getBenefitId,benefitType)]
    }
    else if (this.currentBenefit != null && this.isExistBenefitId(benefits, this.currentBenefit))
    {
      benefits = [...this.updateBenefitById(this.currentBenefit, benefitType)]
    }
    else
    {
      benefits.push({
        code: benefitType,
        dateApplied: benefitApplyDate,
        howMuch: applyForBenefits,
        expectedDate: benefitReceivedDate
      })
    }
    
    let persons=[...this.householdPersons]
    let benefitsNotReceivedData={} as IBenefitsNotReceivedInformation
   
    benefitsNotReceivedData.benefits = benefits

    persons = persons.map((item, ind) => ((ind == this.currentUserIndex) ? {
    
      ...item,
      benefitsNotReceivedInformation: { ...item.benefitsNotReceivedInformation, benefits:benefits }
    } : { ...item,benefitsNotReceivedInformation:{...item.benefitsNotReceivedInformation }}));

    const storedHouseholdDetails = this.service.getHouseHoldDetails;
    this.service.updateHouseHoldDetails(
      { ...storedHouseholdDetails, houseHoldPersons: persons } as any
    )
    const id = this.pageActionUtil.nextUserId();
    if (id < 0) {
      this.service.updateFromSummary({ isFromAdd: false, benefitId: null,userIds:[] })
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_BENEFITSNOTRECEIVEDSUMMARY]);
      return;
    }
    this.currentUserIndex = id;
    this.initUserDetails();
  }
  initUserDetails()
  {
  
    this.maxDateRange = new Date().toISOString().slice(0, 10);
    this.householdPersons = this.service.getHouseholdPersons() as IHouseHold[]
    this.pageActionUtil.initPageMap("benefitNotRecievedMap", "benefitNotRecievedDirection", false);
    this.currentUserIndex = this.pageActionUtil.userIndex ?? 0;
   
    this.currentUserName=this.householdPersons[this.currentUserIndex]?.firstName??"";
    let benefits = [...this.getBenefits] as any
    let fromSummaryData = this.service.getFromSummaryData() as IFromSummary;
    const isFromAdd = (fromSummaryData != null && fromSummaryData.isFromAdd != null && fromSummaryData.isFromAdd != undefined) ? fromSummaryData.isFromAdd : false
    const benefitId = this.getBenefitId;
    if (benefitId!=null){
     benefits= [...this.getBenefitDetailById(benefits,benefitId)];
     const _benefits=benefits.filter((benef:any)=>benef.code!==benefitId)
      this.benefitTypes = this.benefitTypes.filter((type: any) => {
        return _benefits.findIndex((benfit: any) => benfit.code == type.displayValue && type.code != benefitId) == -1
      })
    }
    else
    {
      const last = benefits?.length - 1;
      this.benefitTypes=this.benefitTypes.filter((type:any)=>{
        return (benefits?.length > 0 && !isFromAdd && last>=0) ? benefits.findIndex((benfit: any) => benfit.code == type.displayValue && benfit?.code!==benefits[last].code) == -1:
         benefits.findIndex((benfit: any) => benfit.code==type.displayValue) ==-1
      })
    }
   
    if (benefits?.length > 0 && !isFromAdd)
    {
      const last = benefits?.length - 1;
      this.currentBenefit = benefits[last].code
      this.benefitsNotReceviedDetailsForm.controls['benefitType'].patchValue(benefits[last].code)
      this.benefitsNotReceviedDetailsForm.controls['benefitApplyDate'].patchValue(Utility.duetFormatDate(benefits[last].dateApplied))
      this.benefitsNotReceviedDetailsForm.controls['applyForBenefits'].patchValue(benefits[last].howMuch)
      this.benefitsNotReceviedDetailsForm.controls['benefitReceivedDate'].patchValue(Utility.duetFormatDate(benefits[last].expectedDate))
      this.isSamePage=false;

    }
    else{
      this.benefitsNotReceviedDetailsForm.controls['benefitType'].patchValue('')
      this.benefitsNotReceviedDetailsForm.controls['benefitApplyDate'].patchValue('')
      this.benefitsNotReceviedDetailsForm.controls['applyForBenefits'].patchValue('')
      this.benefitsNotReceviedDetailsForm.controls['benefitReceivedDate'].patchValue('')
      this.isSamePage=true;
    }
    
    
    
      
  }
  get getBenefits(){
    const benefitNotRecieved = this.householdPersons[this.currentUserIndex].benefitsNotReceivedInformation;
    let benefits = benefitNotRecieved?.benefits??[] as IBenefits[];
    return benefits
  }
  getBenefitDetailById(benefits:any[],benefitId:any){
    const benefit=benefits.filter((benefit:any)=>{
      return benefit.code===benefitId;
    })
    return benefit;
  }
  isExistBenefitId(benefits: IBenefits[],benefitId:string){
    benefits=benefits.filter((benefit:IBenefits)=>benefit.code===benefitId);
    return benefits.length>0;
  }
  get getBenefitId(){
    
    const fromSummary = this.service?.getFromSummaryData() as unknown as IFromSummary;
    if (fromSummary==null)return null;
    const benefitId = fromSummary?.benefitId;
    return benefitId;
  }

  
  getBenefitById(benefitType:string){
    let benefits=[...this.getBenefits]
    if(benefits.length>0){
      benefits=benefits.filter((benefit:any)=>benefit.code==benefitType) }
      if(benefits.length>0){
        return benefits[0].code;
      }
      return null;
  }
  updateBenefitById(previousId:any,newId:any){
    let benefits = [...this.getBenefits] as IBenefits[]
   
    const benefitApplyDate = this.benefitsNotReceviedDetailsForm.get('benefitApplyDate').value
    const applyForBenefits = this.benefitsNotReceviedDetailsForm.get('applyForBenefits').value
    const benefitReceivedDate = this.benefitsNotReceviedDetailsForm.get('benefitReceivedDate').value
    if(benefits.length>0)
    {
      benefits = benefits.map((item, ind) => ((item.code == previousId) ? {
        ...item,
        code:newId,
        dateApplied: benefitApplyDate,
        howMuch: applyForBenefits,
        expectedDate: benefitReceivedDate
      } : { ...item }));
    }
    return benefits
  }
  isDropDownDisable(){
    
    const person=this.householdPersons[this.currentUserIndex];
    const benefit = person?.benefitsNotReceivedInformation
    const benefits = (benefit!=null && JSON.stringify(benefit)!=='{}')?benefit?.benefits ?? []:[];
    const val = benefits.length < this._benefitTypes.length ? false : true;
    return val;
  }
}
