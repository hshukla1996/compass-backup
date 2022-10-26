import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ApplyNowPageActions } from '../../+state/actions';
import { IApplyNowState, IFromSummary } from '../../+state/apply-now.models';
import { getApplyNow,  } from '../../+state/apply-now.selectors';
import { AppPageActions } from '../../../+state/actions';
import { AppStoreService } from '../../../app-store-service';
import { UtilService } from '../../../shared/services/util.service';
import * as InsurancePageActions from './insurace-page-actions'
import { MAPPEDPROPETYNAMES, OUTSIDE_HOUSEHOLD_ID } from './insurance-constants';
import { CURREENT_INSURANCE_GATEPOST_VALUE, PRIOR_INSURANCE_GATEPOST_VALUE } from './insurance-page-queue.util';
import { EmployerOfferedInsurances, InsuranceCompany, Insurances, InsuranceState, InsuranceType, OutOfHouseholdPolicyHolder } from './insurance.model';
@Injectable({
  providedIn: 'root'
})
export class InsuranceStoreService {
private insuranceState!:IApplyNowState | null
private subscription!:Subscription
  constructor(private store: Store<IApplyNowState>, private utilService: UtilService,private appStore:AppStoreService) 
  {
    this.subscription=this.store.select(getApplyNow).subscribe((state) => {
      this.insuranceState = state;
    })
   }
   endSubscription()
   {
     this.subscription.unsubscribe();
   }
   getApplyNowState(){
     return this.insuranceState?.gettingStartedResponse
   }
   getInsurance(){
     return this.insuranceState?.insurance;
   }
   getHouseholdPerson(){
     return this.insuranceState?.houseHoldDetails?.houseHoldPersons ?? [];
    
   }
   getCurrentEmployer(index:number){
     const households=this.getHouseholdPerson();
     const curretEmp=households[index].individualIncome?.currentEmployment??[];
     return curretEmp;
   }
  updateInsurance(insurace: any)
  {
     this.store.dispatch(
       InsurancePageActions.storeInsurance({
         insurance: insurace,
       })
     );
   }
   getBenefits(){
     return this.insuranceState?.programSelection?.programs??[];
   }
  updateOutsideOfHouseHold(otherhousehold: OutOfHouseholdPolicyHolder)
   {
     let insurance={...this.insuranceState?.insurance};
     let insuraces = [...insurance?.insurances as Insurances[]];
     if (insurance!=null && insuraces!=null && insuraces.length>0)
     {
       const currentType=insurance.currentType;
       insuraces = insuraces.map((item, inde) => ((item.policyHolderIndividualNumber === OUTSIDE_HOUSEHOLD_ID && item.type == currentType) ?
         { ...item, otherPolicyHolder: (otherhousehold)}: { ...item }));
    
     }
    insurance.insurances = [...insuraces]
    this.updateInsurance(insurance);
   }
   updateEmployerOutsideOfHousehold(householdDetails:any)
   {
     let insurance = { ...this.insuranceState?.insurance };
     let employerIns = insurance.employerOfferedInsurances as EmployerOfferedInsurances[]
     if (insurance != null && employerIns.length > 0) {
       const currentType = insurance.currentType;
       employerIns = employerIns.map((item, inde) => ((item.individualNumber === OUTSIDE_HOUSEHOLD_ID) ?
         { ...item, ...householdDetails } : { ...item }));

     }
     insurance.employerOfferedInsurances = [...employerIns]
     this.updateInsurance(insurance);
   }

  updateFromSummary(fromSummary: IFromSummary) {
    this.store.dispatch(
      ApplyNowPageActions.storeIsFromSummary({ fromSummary: fromSummary })
    );
  }
  updateCovered(users: string[],currentDirection:string,currentUserId:any) 
  {
    let insurance = { ...this.insuranceState?.insurance };
    let insuraces = [...insurance?.insurances as Insurances[]];
    if (insurance != null && insuraces != null && insuraces.length > 0) {
      const currentType = insurance.currentType;
      insuraces = insuraces.map((item, inde) => (item.type == currentType && item.policyHolderIndividualNumber==currentUserId) ?
        { ...item, coverage: users } : { ...item });

    }
    insurance.currentDirection=currentDirection;
    insurance.insurances = [...insuraces]
    this.updateInsurance(insurance);
  }
  updateBenefits(benefits:string[],userId:string)
  {
    this.updateById(benefits, userId, 'benefits')
  }
  updateType(policyTypes:string[],userId:string)
  {
    this.updateById(policyTypes, userId,'policyTypes')
   
  }
  private updateById(propArr:any,userId:string,prop:any)
  {
    let insurance = { ...this.insuranceState?.insurance };
    let insuraces = [...insurance?.insurances as Insurances[]];
    if (insurance != null && insuraces != null && insuraces.length > 0) {
      const currentType = insurance.currentType;
      insuraces = insuraces.map((item:any, inde) => (item.type == currentType && item.policyHolderIndividualNumber == userId) ?
       ( { ...item, [prop]:propArr}) : { ...item });

    }
    insurance.insurances = [...insuraces]
    this.updateInsurance(insurance);
  }
  updateInsuranceCompany(insuranceCompany: InsuranceCompany,userId:string)
  {
    this.updateById(insuranceCompany, userId, 'insuranceCompany')
    
  }
  updateInsuranceInformation(policyInformation:any,userId:string){
    let insurance = { ...this.insuranceState?.insurance };
    let insuraces = [...insurance?.insurances as Insurances[]];
    if (insurance != null && insuraces != null && insuraces.length > 0) {
      const currentType = insurance.currentType;
      insuraces = insuraces.map((item: Insurances, inde) => (item.type == currentType && item.policyHolderIndividualNumber == userId) ?
        ({ ...item, ...policyInformation}) : { ...item });

    }
    insurance.insurances = [...insuraces]
    this.updateInsurance(insurance);
  }
  
  
  getInsuranceCompanyById(userId:string)
  {
   return this.getValuesByUserIdAndProp(userId,'insuranceCompany')
   
  }
  private getValuesByUserIdAndProp(userId:string,prop:string){
    let insurance = { ...this.insuranceState?.insurance };
    let insuraces = [...insurance?.insurances as Insurances[]];
    if (insurance != null && insuraces != null && insuraces.length > 0) {
      const currentType = insurance.currentType;
      insuraces = insuraces.filter((item: Insurances) => {
        return (item.type == currentType && item.policyHolderIndividualNumber == userId)
      })
      if (insuraces.length == 1) 
      {
       const obj=insuraces[0] as any;
       return obj[prop] 
      }


    }
    return []
  }
  getInsuranceCoverage(userId:string){
     
    const value=this.getValuesByUserIdAndProp(userId,'benefits')
    return value==null || value==undefined?[]:value;
  }
  setCurrentType(type:string){
    let insurance = { ...this.insuranceState?.insurance };
  }
  getOutOfHouseHold(){
    let insurance = { ...this.insuranceState?.insurance };
    let insuraces = [...insurance?.insurances as Insurances[]];
    if (insurance != null && insuraces != null && insuraces.length > 0) 
    {
      const currentType=insurance.currentType;
      insuraces = insuraces.filter((item)=>{
        
        return (item.policyHolderIndividualNumber === OUTSIDE_HOUSEHOLD_ID && item.type == currentType)
    });
    const _ins=insuraces[0];
    if(_ins!=null)
    {
      return _ins.otherPolicyHolder;
    }
  }
  return null;

  
}
getMapName(currentType:string,component:string){

  return MAPPEDPROPETYNAMES[currentType][component]
  


}


  getSelectedCoverageById(id: string) {
    const insurances=this.insuranceState?.insurance?.insurances??[]
    const insurance=insurances.filter((ins)=>{
      return ins.policyHolderIndividualNumber==id;
    })
    return (insurance?.length>0)?insurance[0].coverage:[];
  }
  getPersonIndex(id: string) {
    const households = this.getHouseholdPerson();
    
    const index = (id == OUTSIDE_HOUSEHOLD_ID) ? households.length : households.findIndex((person: any) => person.id == id);
    return index;
  }
  areProgramsExist(selectedPrograms: string[], conditionalPrograms: string[]) {
    if (selectedPrograms.length == 0) return false;
    return conditionalPrograms.some(value => {
      return selectedPrograms.indexOf(value) !== -1;
    });
  }
  getOutOfHouseHoldName(){
 
      const insurance=this.insuranceState?.insurance;
      const insurances=insurance?.insurances??[];
      const extractUser=insurances.filter((ins)=>ins.policyHolderIndividualNumber==OUTSIDE_HOUSEHOLD_ID && ins.type==insurance?.currentType);
      return extractUser.length>0 ? extractUser[0].otherPolicyHolder?.firstName:''
  
  }
  storeDirection(pageDirection:string){
    let insurance = { ...this.insuranceState?.insurance };
    insurance.currentDirection=pageDirection;
    this.updateInsurance(insurance);

  }
  getOutOfHouseHoldNameByType(type:string){
 
    const insurance=this.insuranceState?.insurance;
    const insurances=insurance?.insurances??[];
    const extractUser=insurances.filter((ins)=>ins.policyHolderIndividualNumber==OUTSIDE_HOUSEHOLD_ID && ins.type==type);
    return extractUser.length>0 ? extractUser[0].otherPolicyHolder?.firstName:''

}
getOutOfHouseHoldEmployerType(){
 
  const insurance=this.insuranceState?.insurance;
  const insurances=insurance?.employerOfferedInsurances??[];
  const extractUser=insurances.filter((ins)=>ins.individualNumber==OUTSIDE_HOUSEHOLD_ID);
  return extractUser.length>0 ? `${extractUser[0]?.otherIndividualFirstName??''} ${extractUser[0]?.otherIndividualLastName??''}`:''

}
  

  


}

