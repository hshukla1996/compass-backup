import { ThisReceiver } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { _INITIAL_REDUCERS } from "@ngrx/store/src/tokens";
import { AppStoreService } from "apps/intake/src/app/app-store-service";
import { accordian, modalData } from "apps/intake/src/app/shared/constants/Constants";
import { RoutePath } from "apps/intake/src/app/shared/route-strategies";
import { PageActionDirection, PageActionUtil } from "apps/intake/src/app/shared/services/page-action-util.service";
import { PageQueueService } from "apps/intake/src/app/shared/services/page-queue.service";
import { Utility } from "apps/intake/src/app/shared/utilities/Utility";
import { zip } from "rxjs";
import { IhoseholdTypeofFacility, IHouseHold } from "../../../household/household-model";
import { EmployerOfferedInsuranceGatepostComponent } from "../../gateposts/employer-offered-insurance-gatepost/employer-offered-insurance-gatepost.component";
import { CURRENT_MAP_NAMES, EMP_MAP_NAMES, MAPPEDPROPETYNAMES, OUTSIDE_HOUSEHOLD_ID, POLICY_HOLDER_PROPERTY_NAME, PRIOR_MAP_NAMES } from "../../model/insurance-constants";
import { PageQueueOneConfig } from "../../model/insurance-page-queue.util";
import { InsuranceStoreService } from "../../model/insurance-store.service";
import { EmployerOfferedInsurances, Insurances, InsuranceState, InsuranceType } from "../../model/insurance.model";

@Component({
    selector: "compass-ui-insurance-summary",
    templateUrl: "./insurance-summary.component.html",
    styleUrls: ["./insurance-summary.component.scss"],
})
export class InsuranceSummaryComponent implements OnInit {
    constructor(private storeService: InsuranceStoreService, private pageActionUtil: PageActionUtil, private pq:PageQueueService,private router:Router,private appStore: AppStoreService) {}
    insuranceType!:string;
    deleteUserId!:string
    modalData = { ...modalData }
    jsonData: any;
    employerOfferedInsurances=[] as any;
    cpInsurances=[] as any[]
    insurances=[] as any
    coverage=[] as any[]
    types=[] as any;
    howOftenPremiumPaid=[] as any[]
    companyNames=[] as any[]
    insurancePolicyCoverageData=[] as any[]
    employerCoverageData=[] as any[]
    insuranceSummaryData = {
        "questionText": "Summary Header",
        "subHeading": "Summary SubHeader",
        "toolTip": "",
        "questionAnswers": [
           
        ]as any,
        "addtionalButton": ""
    }
    ngOnInit(): void 
    {
      const _pay = this.appStore.getPay();
        const _companyNames = this.appStore.getComapanyNames()
        const types=this.appStore.getPolicyTypes();
        const insurancePolicyCoverage=this.appStore.getPolicyCoverage();
        const employerCoverage=this.appStore.getPolicyEmployeeCoverage();
        zip([_pay, _companyNames,types,insurancePolicyCoverage,employerCoverage]).subscribe(([premium, companyNames,types,insurancePolicyCoverageData,employerCoverageData]) => {
        this.howOftenPremiumPaid = premium;
        this.companyNames = companyNames;
        this.types=types;
        this.insurancePolicyCoverageData=insurancePolicyCoverageData;
         this.employerCoverageData=employerCoverageData;
        if(this.insurancePolicyCoverageData.length==0 || this.employerCoverageData.length==0)return;
        this._initData();
       })
       
    }
    private _initData()
    {
        const insurance=this.storeService.getInsurance();
        this.insuranceType=insurance?.currentType??'';
        if(this.insuranceType==InsuranceType.Current){
          this.pq.configQueue(PageQueueOneConfig);
        }
        const summaryTextAndButtonText = this.getSummaryHeaderAndButtonText();
        this.employerOfferedInsurances=insurance?.employerOfferedInsurances??[] as any[];
        this.cpInsurances=insurance?.insurances??[];

        this.insurances = (this.insuranceType == InsuranceType.Current || this.insuranceType == InsuranceType.PRIOR) ? this.cpInsurances
         : this.employerOfferedInsurances
        this.insurances.forEach((abrel:any) => {
            this.insuranceSummaryData['questionText']=summaryTextAndButtonText.header;
            this.insuranceSummaryData['subHeading']=summaryTextAndButtonText.subHeader
            this.insuranceSummaryData['addtionalButton']=summaryTextAndButtonText.buttonText;
            const accordianHeaderData=this._getAccordianHeader(abrel);
                this.insuranceSummaryData['questionAnswers'].push({

                    accordionHeader:accordianHeaderData.header ,
                    accordionSubHeading: accordianHeaderData.subHeader,
                    accordionRightHeading: '',
                    accordionRightSubHeading: '',
                    userId: (this.insuranceType == InsuranceType.Current || this.insuranceType == InsuranceType.PRIOR) ? abrel.policyHolderIndividualNumber : abrel.individualNumber,
                    accordionData: (this.insuranceType == InsuranceType.Current || this.insuranceType == InsuranceType.PRIOR)?this.getAccordianLabelForCurrentAndPriorPolicy(abrel):this.getAccordianLabelForEmployerOfferedPolicy(abrel),
                    editButton: "Edit",
                    deleteButton: "Delete"
                })
            

        })
        this.jsonData = {...this.insuranceSummaryData};
    }
    private getAccordianLabelForCurrentAndPriorPolicy(insurance:Insurances){
       
        let username=this.getUserDetailById(insurance.policyHolderIndividualNumber,insurance.type);
       return this.getCurrentPriorPolicyInformation(insurance,username??'')
        
    }
    private getAccordianLabelForEmployerOfferedPolicy(inusrance:EmployerOfferedInsurances)
    {
        let username=this.getUserDetailById(inusrance.individualNumber,InsuranceType.EMOPLOYEROFFERED);
       return this.getEmployerPolicyInformation(inusrance,username??'');
    }
    private getEmployerPolicyInformation(insurance:EmployerOfferedInsurances,username:string){
      let accordingData: accordian[] = [];
      let coveredByText='';
      let coverage='';
  
     
 
      let address=`${insurance.address?.addressLine1??''}
      ${insurance.address?.addressline2??''}
      ${insurance.address?.city??''}
      ${insurance.address.state??''}
      ${insurance.address.zip??''}
      `
      insurance.coveredByEmployerInsuranceIndividuals?.forEach((coverage)=>{
        coveredByText+=`${this.getUserDetailById(coverage,InsuranceType.EMOPLOYEROFFERED)}`;
    })
     
      insurance.typesOfCoverage?.forEach((coverage)=>{
          coveredByText+=`${this.getUserDetailById(coverage,coverage)}`;
      })
    
      const policy={
          coverageText:coverage,
          address:address,
          username:username,
          coveredBy:coveredByText,
        
          empInsurance:insurance

      } as Policy
    this.employerPolicyAccordian(accordingData,policy);

    }
    private getCurrentPriorPolicyInformation(insurance:Insurances,username:string){
      
        let accordingData: accordian[] = [];
        let coveredByText='';
        let coverage='';
        const type=insurance.type;
        const policyTypes=insurance.policyTypes;
        let policyTypeText="";
        let address=`${insurance.insuranceCompany?.address?.addressLine1??''}
        ${insurance.insuranceCompany?.address?.addressline2??''}
        ${insurance.insuranceCompany?.address?.city??''}
        ${insurance.insuranceCompany?.address?.state??''}
        ${insurance.insuranceCompany?.address?.zip??''}
        `
        let policyHolderAddress=`${insurance.policyHolderAddress?.addressLine1??''}
        ${insurance.policyHolderAddress?.addressline2 ??''}
        ${insurance.policyHolderAddress?.city??''}
        ${insurance.policyHolderAddress?.state??''}
        ${insurance.policyHolderAddress?.zip??''}
        `
       
        insurance.coverage?.forEach((coverage)=>{
            coveredByText+=`${this.getUserDetailById(coverage,insurance.type)}`;
        })
        insurance.benefits?.forEach((benefit)=>{
            coverage+=this.getDispayValueBy(this.insurancePolicyCoverageData,`${benefit}`)
        })
        policyTypes?.forEach((type)=>{
            policyTypeText+=this.getDispayValueBy(this.types,`${type}`);
        })
        const policy={
            coverageText:coverage,
            address:address,
            policyHolderAddress:policyHolderAddress,
            coveredBy:coveredByText,username:username,
            insurance:insurance

        } as Policy
        this.setPolicyUserName(accordingData,policy);
        if(type==InsuranceType.Current)
        {

            this.currentPolicyAccordian(accordingData,policy);
        }

        if(type==InsuranceType.PRIOR)
        {
           
            this.priorPolicyAccordian(accordingData,policy);
        }


        
        return accordingData;
    }
    private getUserDetailById(id:any,type:string=''){
        if(id==OUTSIDE_HOUSEHOLD_ID){
         return (type==InsuranceType.EMOPLOYEROFFERED)?this.storeService.getOutOfHouseHoldEmployerType(): this.storeService.getOutOfHouseHoldNameByType(type);
        }
        let persons=this.storeService.getHouseholdPerson();
        persons=persons.filter((person)=>{
            return person.id==id;
        })
        return (persons.length>0)?`${persons[0].firstName} ${persons[0].lastName}`:''
    }
    edit(id:any)
    {
       // this.deleteUserId=id;
        const index = this.storeService.getPersonIndex(id);
        this.resetMap(index);
        this.storeService.updateFromSummary({ isFromAdd: false, benefitId: null, isFromEdit: true })
        this.pq.gotoFirstPageFromSummary();

    }
    delete(id:any)
    {
        this.deleteUserId=id;
    }
    add(e: any)
    {
        
        this.storeService.updateFromSummary({ isFromAdd: true, benefitId: null,isFromEdit:false })
       
        this.pq.gotoFirstPageFromSummary(0);

    }
    getDispayValueBy(arr=[] as any[],id:string){
      const coveage=arr.filter((coverage)=>{
        return coverage.id==id
      })
      return (coveage.length>0)?coveage[0].displayValue:''

    }
   
    continueClicked(){
        const id=this.deleteUserId;
        const insurance = this.storeService.getInsurance() as InsuranceState;
        switch(this.insuranceType)
        {
            case InsuranceType.Current:
            case InsuranceType.PRIOR:
                this.deleteCurrentOrPriorInsurance(id, insurance);
            break;
            case InsuranceType.EMOPLOYEROFFERED:
                this.deleteEmployerOfferedInsurance(id, insurance);
                break;
        }
        
    }
   
    private deleteCurrentOrPriorInsurance(id:string,insurance:InsuranceState)
    {

        let _ins={...insurance};
        this.insurances=_ins.insurances.filter((ins)=>{
            return ins.policyHolderIndividualNumber!==id;
        })
        _ins.insurances=this.insurances;
        this.storeService.updateInsurance(_ins);
        this._initData();
    }
    private deleteEmployerOfferedInsurance(id: string, insurance: InsuranceState)
    {
        let _ins = { ...insurance };
        _ins.employerOfferedInsurances = _ins.employerOfferedInsurances.filter((ins) => {
            return ins.sequenceNumber !== id;
        })
        this.storeService.updateInsurance(_ins);
    }
  private  gotoBackPage()
    {
        this.pq.back();
    }
    private goToNextPage(){
        
        this.pq.next();
    }
    back(){
        this.gotoBackPage();
    }
    next(){
        this.goToNextPage();
    }
    private getSummaryHeaderAndButtonText(){
        let text = {
            header:'',
            subHeader:'',
            buttonText:''
        };
        const persons=this.storeService.getHouseholdPerson();
        switch (this.insuranceType) {
            case InsuranceType.Current:
                text.header = 'Your current health or medical insurance.',
                text.subHeader='Review the entries to make sure everything looks correct.',
                text.buttonText=(persons.length==this.currentPriorPolicyCount(InsuranceType.Current))?'':'Add Health or Medical Insurance'
                break;
            case InsuranceType.PRIOR:
                text.header = '',
                    text.subHeader = 'Review the entries to make sure everything looks correct.',
                    text.buttonText = (persons.length==this.currentPriorPolicyCount(InsuranceType.PRIOR))?'':'Add Health or Medical Insurance'
                break;
            case InsuranceType.EMOPLOYEROFFERED:
                text.header = 'Your employer offered health insurance.',
                    text.subHeader = 'Review the entries to make sure everything looks correct.',
                    text.buttonText =  (persons.length==this.employerPolicyCount())?'':'Add Health or Medical Insurance'
                break;
                default:null
        }
        return text;
    }
    private currentPriorPolicyCount(type:string){
      const count=  this.cpInsurances.filter((ins)=>{
          return ins.type==type
      }).length
      return count;
    }
    private employerPolicyCount(){
       
        return this.employerOfferedInsurances.length;
    }
    resetMap(index:any){
        const maps = this.getMap();
        maps.forEach((map:any)=>{
            
            if(JSON.stringify(map)!='{}')
            {
                const mapName = map.mapName;
                const mapDirection = map.mapDirection;
                this.pageActionUtil.initPageMap(mapName, mapDirection, false);
                this.pageActionUtil.emptyMap();
                this.pageActionUtil.changeMapValue(index, false)
                this.pageActionUtil.updatePageActionDetail(PageActionDirection.NEXT, true)
            }
        })
    }
    private getMap()
    {
        switch(this.insuranceType)
        {
            case InsuranceType.Current:
                return CURRENT_MAP_NAMES;
            case InsuranceType.PRIOR:
                return PRIOR_MAP_NAMES;
            case InsuranceType.EMOPLOYEROFFERED:
                return EMP_MAP_NAMES
            }
        return [];
    }
    private _getAccordianHeader(insurance:any){
        let obj={
            header:'',
            subHeader:''
        } as any
        const persons=this.storeService.getHouseholdPerson();
        switch(this.insuranceType)
        {
            case InsuranceType.Current:
            case InsuranceType.PRIOR:
                return this._getCurrentPriorPolicyHeader(insurance,persons,obj)
            case InsuranceType.EMOPLOYEROFFERED:
                return this._getEmployerPolicyHolderHeader(insurance,persons,obj)
            }
            return obj;
    }
    private _getCurrentPriorPolicyHeader(insurance:Insurances,persons:IHouseHold[],obj:any={})
    {
        
        const id=insurance.policyHolderIndividualNumber;
        
        obj.header=`${this.getDispayValueBy(this.companyNames, insurance.insuranceCompany?.insuranceCompanyName??'')} ${insurance.insuranceCompany?.otherInsuranceCompanyName??''}`
        if(id==OUTSIDE_HOUSEHOLD_ID){
         const person=   this.storeService.getOutOfHouseHold();
         
         obj.subHeader=`${person?.firstName??''} ${person?.lastName??''}`
         return obj;
        }
        const policyPerson=persons.filter((perso)=>{
            return perso.id==parseInt(id)
        })
        if(policyPerson.length>0){
            obj.subHeader=`${policyPerson[0].firstName??''} ${policyPerson[0].lastName??''} ${Utility.getAge(policyPerson[0].dateOfBirth)}`
        }
        return obj;


    }

    private _getEmployerPolicyHolderHeader(empInsurance:EmployerOfferedInsurances,persons:IHouseHold[],obj:any={}){
        const insurance={...this.storeService.getInsurance()};
        const insurances=insurance?.insurances??[] as Insurances[]
    
        const id=empInsurance.individualNumber;
        const filtered_ins=insurances.filter((_ins)=>{
            return _ins.policyHolderIndividualNumber==id && _ins.type==InsuranceType.PRIOR
        }) 
        if(filtered_ins.length==0)return;
        obj.subHeader=`${this.getDispayValueBy(this.employerCoverageData, filtered_ins[0].insuranceCompany?.insuranceCompanyName??'')} ${filtered_ins[0].insuranceCompany?.otherInsuranceCompanyName??''}`
        if(id==OUTSIDE_HOUSEHOLD_ID){
            const person=   this.storeService.getOutOfHouseHold();
          
            obj.header=`${person?.firstName??''} ${person?.lastName??''}`
            return obj;
           }
           const policyPerson=persons.filter((perso)=>{
               return perso.id==parseInt(id)
           })
           if(policyPerson.length>0){
               obj.header=`${policyPerson[0].firstName??''} ${policyPerson[0].lastName??''} ${Utility.getAge(policyPerson[0].dateOfBirth)}`
           }
    }
    private currentPolicyAccordian(accordingData:accordian[],policy:Policy)
    {
        accordingData.push({
            "label": `Policy Holder`,
            "value": policy.username??'',
            "bold": false
          });
      
          accordingData.push({
            "label": `Who is in the household is covered by  ${policy.username}'s policy`,
            "value": policy.coveredBy,
            "bold": false
          });
         
           
            accordingData.push({
              "label": `Policy Number`,
              "value": policy.insurance?.policyNumber??'',
              "bold": false
            });
            accordingData.push({
              "label": `Group Number`,
              "value": policy.insurance?.groupNumber??'',
              "bold": false
            });
            accordingData.push({
              "label": `What date did this policy start?`,
              "value": policy.insurance?.policyStartDate??'',
              "bold": false
            });
            accordingData.push({
              "label": `How much is ${policy.username}'s premium for this health insurance? (The amount paid each month)`,
              "value": policy.insurance?.premiumAmount??'',
              "bold": false
            });
            accordingData.push({
              "label": `How often does {Individual.FirstName} pay the premium?`,
              "value": this.getDispayValueBy(this.howOftenPremiumPaid,policy.insurance?.howOftenThePremiumIsPaid??''),
              "bold": false
            });
            accordingData.push({
              "label": `Policy Contact Address`,
              "value": policy.address??'',
              "bold": false
            });
            accordingData.push({
              "label": `Insurance Company Phone Number`,
              "value": policy.insurance.insuranceCompany?.phoneNumber??'',
              "bold": false
            });
            accordingData.push({
              "label": `Policy Holder Address`,
              "value": policy.policyHolderAddress??'',
              "bold": false
            });
          
            accordingData.push({
              "label": `What is covered by ${policy.username}'s policy?`,
              "value": policy.coverageText??'',
              "bold": false
            });
            accordingData.push({
              "label": `What type of policy is this?`,
              "value": policy.policyTypeText??'',
              "bold": false
            });
            accordingData.push({
              "label": `Employer Name`,
              "value": policy.insurance.employerName??'',
              "bold": false
            });
            
            accordingData.push({
              "label": `Will this health insurance end?`,
              "value": this.getYesNoValue(policy.insurance.isInsuranceEnd??''),
              "bold": false
            });
            accordingData.push({
              "label": ` What date will this policy end? (If known)`,
              "value": Utility.formatDate(policy.insurance.policyEndDate)??'',
              "bold": false
            });
            accordingData.push({
              "label": `Why did ${policy.username} lose or choose to end coverage?`,
              "value": policy.insurance.reasonForFutureLossHealthInsurance??'',
              "bold": false
            });
            accordingData.push({
              "label": ` Will this cause your children to lose health insurance?`,
              "value": (this.getYesNoValue(policy.insurance.employerStoppedCoverageChildrenLostInsurance??'')),
              "bold": false
            });
    }
    private employerPolicyAccordian(accordingData:accordian[],policy:Policy)
    {
        accordingData.push({
            "label": `Policy Holder`,
            "value": policy.username??'',
            "bold": false
          });
      
          accordingData.push({
            "label": `Social Security Number (SSN)`,
            "value": policy.empInsurance?.otherIndividualSocialSecurityNumber??'',
            "bold": false
          });
         
           
            accordingData.push({
              "label": `Employer Name`,
              "value": policy.empInsurance?.employerName??'',
              "bold": false
            });
           
            accordingData.push({
              "label": `Employer Identification Number (EIN)`,
              "value": policy.empInsurance?.employerIdNumber??'',
              "bold": false
            });
            accordingData.push({
              "label": `Employer Contact Name`,
              "value": policy.empInsurance?.employerContactInformation.name??'',
              "bold": false
            });
            
              accordingData.push({
                "label": `Employer Contact Phone Number`,
                "value": policy.empInsurance?.employerContactInformation.phone??'',
                "bold": false
              });
              accordingData.push({
                "label": `Employer Contact Extension`,
                "value": policy.empInsurance?.employerContactInformation.phoneExtension??'',
                "bold": false
              });
            accordingData.push({
              "label": `Who in your household is (or could be) covered by ${policy.username}'s policy?`,
              "value": policy.coveredBy??'',
              "bold": false
            });
            accordingData.push({
              "label": `Does ${policy.username}'s plan offer any of these types of coverage?`,
              "value": policy.insurance.insuranceCompany?.phoneNumber??'',
              "bold": false
            });
            accordingData.push({
              "label": `Is ${policy.username} currently eligible for coverage offered by this employer, or will they become eligible for coverage in the next 3 months?`,
              "value": this.getYesNoValue(policy.empInsurance?.eligibleThreeMonths??''),
              "bold": false
            });
          
            accordingData.push({
              "label": `What date is (or will) ${policy.empInsurance?.eligibleDate} be eligible for coverage?`,
              "value": policy.coverageText??'',
              "bold": false
            });
            accordingData.push({
              "label": `Does ${policy.username}'s health plan meet the minimum value standard?`,
              "value": this.getYesNoValue(policy.empInsurance?.employerPlanMinValueStandard??''),
              "bold": false
            });
            accordingData.push({
              "label": `How much does (or would) ${policy.username} have to pay in premiums for this insurance?`,
              "value": policy.empInsurance?.currentEmployeePremiumCostField??'',
              "bold": false
            });
            
            accordingData.push({
              "label": `How often does (or would) ${policy.username} pay the premium?`,
              "value": policy.empInsurance?.currentEmployeePremiumFrequency??'',
              "bold": false
            });
            accordingData.push({
              "label": `Will ${policy.username}'s health plan change soon?`,
              "value": policy.empInsurance?.willHealthPlanChangeSoon??'' ,
              "bold": false
            });
            accordingData.push({
              "label": `What date will ${policy.username}'s health plan change?`,
              "value": policy.empInsurance?.whenWillEmployersPlanChange??'',
              "bold": false
            });
            accordingData.push({
                "label": `What will change in ${policy.username}'s health insurance?`,
                "value": policy.empInsurance?.whatWillChangeEmployerPlan??'' ,
                "bold": false
              });
            accordingData.push({
              "label": `Will ${policy.username}'s new health plan meet the minimum value standard? `,
              "value": (this.getYesNoValue(policy.empInsurance?.newEmployerPlanMinValueStandard??'')),
              "bold": false
            });
            accordingData.push({
                "label": `How much would ${policy.username} have to pay in premiums for this insurance?`,
                "value": (this.getYesNoValue(policy.empInsurance?.newEmployerPlanPremium??'')),
                "bold": false
              });
              accordingData.push({
                "label": `How often would ${policy.username} pay the premium?`,
                "value": policy.empInsurance?.howOftenNewPremiumPay??'',
                "bold": false
              });
            
    }
    private setPolicyUserName(accordingData:accordian[],policy:Policy){
        let otherHouseholdName=''
       
        const id=policy.insurance.policyHolderIndividualNumber;
        if(policy.insurance.otherPolicyHolder!==null && policy.insurance.otherPolicyHolder!==undefined){
            otherHouseholdName=`${policy.insurance.otherPolicyHolder.firstName??''} ${policy.insurance.otherPolicyHolder.lastName??''}`
           
        }
        accordingData.push({
            "label": `Policy Holder`,
            "value":(id==OUTSIDE_HOUSEHOLD_ID)?policy.username??'':otherHouseholdName,
            "bold": false
          });
    }
    private priorPolicyAccordian(accordingData:accordian[],policy:Policy)
    {
        
      
            accordingData.push({
                "label": `Was this insurance court-ordered?`,
                "value": this.getYesNoValue(policy.insurance?.otherPolicyHolder?.isThisPolicyCourtOrdered??''),
                "bold": false
              });
         
           accordingData.push({
            "label": `Who is in the household is covered by  ${policy.username}'s prior policy?`,
            "value": policy.coveredBy,
            "bold": false
          });
          accordingData.push({
            "label": `Prior Insurance Company Name`,
            "value": policy.insurance?.insuranceCompany?.insuranceCompanyName??'',
            "bold": false
          });
            accordingData.push({
              "label": `Prior Policy Number`,
              "value": policy.insurance?.policyNumber??'',
              "bold": false
            });
            accordingData.push({
              "label": `Prior Group Number`,
              "value": policy.insurance?.groupNumber??'',
              "bold": false
            });
            accordingData.push({
              "label": `What date did this policy start?`,
              "value": policy.insurance?.policyStartDate??'',
              "bold": false
            });
            accordingData.push({
                "label": `Prior Policy Contact Address`,
                "value": policy.address??'',
                "bold": false
              });
              accordingData.push({
                "label": `Prior Insurance Company Phone Number`,
                "value": policy.insurance.insuranceCompany?.phoneNumber??'',
                "bold": false
              });
            accordingData.push({
              "label": `Was ${policy.username}'s address on this policy the same as the address entered earlier?`,
              "value": this.getYesNoValue(policy.insurance?.isPolicyAddressSame),
              "bold": false
            });
            accordingData.push({
                "label": `Policy Holder Address`,
                "value": policy.policyHolderAddress??'',
                "bold": false
              });
            accordingData.push({
              "label": `What was covered by ${policy.username}'s policy?`,
              "value": policy.coverageText??'',
              "bold": false
            });
            accordingData.push({
              "label": `What type of policy was this?`,
              "value": policy.policyTypeText??'',
              "bold": false
            });
           
            accordingData.push({
              "label": `Policy Holder Address`,
              "value": policy.policyHolderAddress??'',
              "bold": false
            });
          
            accordingData.push({
              "label": `What date did this policy start?`,
              "value": Utility.formatDate(policy.insurance.policyStartDate??''),
              "bold": false
            });
            accordingData.push({
              "label": `What date did this policy end?`,
              "value": Utility.formatDate(policy.insurance.policyEndDate??''),
              "bold": false
            });
            accordingData.push({
              "label": `Employer Name`,
              "value": policy.insurance.employerName??'',
              "bold": false
            });
            
            accordingData.push({
              "label": `Why did ${policy.username} lose or choose to end coverage?`,
              "value": policy.insurance.reasonForLosingHealthInsurance??'',
              "bold": false
            });
            accordingData.push({
              "label": ` Did ${policy.username} apply for unemployment compensation when this insurance was lost?`,
              "value": this.getYesNoValue(policy.insurance.didApplyUnemploymentCompensation??''),
              "bold": false
            });
            accordingData.push({
              "label": `Did this cause your children to lose health insurance?`,
              "value": this.getYesNoValue(policy.insurance.employerStoppedCoverageChildrenLostInsurance??''),
              "bold": false
            });
           
    }
    private getYesNoValue(value:string)
    {
        switch(value.toLowerCase()){
            case 'y':
                return 'Yes';
            case 'n':
                return 'No';
           
        }
        return ''
    }
    
   


}
interface Policy{
coverage?:[],
address:string,
policyHolderAddress?:string,
username:string,
coverageText:string,
policyTypeText:string,
policyHolderText:string,
coveredBy:string,
insurance:Insurances,
empInsurance?:EmployerOfferedInsurances
}


