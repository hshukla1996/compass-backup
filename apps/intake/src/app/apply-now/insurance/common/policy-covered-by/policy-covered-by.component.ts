import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IdSelector } from "@ngrx/entity";
import { AppStoreService } from "apps/intake/src/app/app-store-service";
import { RoutePath } from "apps/intake/src/app/shared/route-strategies";
import { PageActionUtil } from "apps/intake/src/app/shared/services/page-action-util.service";
import { PageQueueService } from "apps/intake/src/app/shared/services/page-queue.service";
import { Utility } from "apps/intake/src/app/shared/utilities/Utility";
import { PageQueueName } from "../../../+state/apply-now.models";
import { ApplyNowStoreService } from "../../../apply-now-store-service";
import { IHouseHold, PageDirection } from "../../../household/household-model";
import { CurrentPolicyData } from "../../current-policy/currnt-policy-holder/current-policy-holder.data";
import { OUTSIDE_HOUSEHOLD_ID, INSURANCE_DIVIDER_PATH, POLICY_HOLDER_PROPERTY_NAME, COVERED_BY_NAME, CURRENT_POLICY_COVEREDBY_PROGRAMS, PRIOR_POLICY_COVEREDBY_PROGRAMS } from "../../model/insurance-constants";
import { PageQueueOneConfig } from "../../model/insurance-page-queue.util";
import { InsuranceStoreService } from "../../model/insurance-store.service";
import { Insurances, InsuranceType } from "../../model/insurance.model";
import { CoveredByData } from "./policy-covered-by.data";

@Component({
    selector: "compass-ui-policy-covered-by",
    templateUrl: "./policy-covered-by.component.html",
    styleUrls: ["./policy-covered-by.component.scss"],
})
export class PolicyCoveredByComponent implements OnInit {

    constructor(private afsStore: ApplyNowStoreService, private insuraceStore: InsuranceStoreService,
        private pageActionUtil: PageActionUtil, private router: Router,private pq:PageQueueService
        ) {
       

    }
   
    public coveredByData = { ...CoveredByData }
    selectedUserids: any[] = []
    hasOutofHousehold: boolean = true;
    houseHoldHeadPersons: IHouseHold[] = [];
    currentType='' as any
    currentIndex!:number;
    currentUserName='' as string
    outsideHousehold={} as any
    id!:any
    ngOnInit(): void {
        const insurance=this.insuraceStore.getInsurance();
        this.currentType = insurance?.currentType;
        this.pq.configQueue(PageQueueOneConfig )
        const map = this.insuraceStore.getMapName(this.currentType, COVERED_BY_NAME) as any;
         this.pageActionUtil.initPageMap(map.mapName, map.mapDirection, false);
        this.currentIndex = this.pageActionUtil.currentUserIndex ?? 0;
  
        this._initValues()
        

       

    }
private _initValues(){
    const insurance=this.insuraceStore.getInsurance();
    const insurances=insurance?.insurances??[];
    this.currentType = insurance?.currentType;
    
    this.houseHoldHeadPersons = this.insuraceStore.getHouseholdPerson() as IHouseHold[]
    
  
    this.currentUserName = this.houseHoldHeadPersons[this.currentIndex]?.firstName??''
    
    this._initCheckbox(insurances,insurance?.currentType??'');
}
    private _initCheckbox(insurances:Insurances[],currentType:string |null) {


        if (this.houseHoldHeadPersons.length > 0) {
           
           
            const len=this.houseHoldHeadPersons.length;
           this.id=((len==this.currentIndex)?OUTSIDE_HOUSEHOLD_ID:this.houseHoldHeadPersons[this.currentIndex].id) as string;
            this.currentUserName = this.id == OUTSIDE_HOUSEHOLD_ID ? this.insuraceStore.getOutOfHouseHoldName(): this.houseHoldHeadPersons[this.currentIndex].firstName as any
            const _insurances=insurances.filter((ins)=>{
               return parseInt(ins.policyHolderIndividualNumber)==parseInt(this.id) && ins.type==this.currentType;
            })
            if(_insurances.length>0)
            {
                this.selectedUserids=[];
                _insurances[0].coverage?.forEach((cov)=>{
                    this.selectedUserids.push(parseInt(cov));
                })
            }
        


        }
        this.coveredByData.questionText =this._getQuestionText(this.currentUserName);
        this.coveredByData.questionAnswers = [];
        const benefits=this.currentType==InsuranceType.Current?CURRENT_POLICY_COVEREDBY_PROGRAMS:PRIOR_POLICY_COVEREDBY_PROGRAMS
        this.coveredByData.isRequired=Utility.areProgramsExist(this.insuraceStore.getBenefits() as string[],benefits)
        
        this.houseHoldHeadPersons.forEach((person) => {
            this.coveredByData.questionAnswers.push({
                id: person.id as unknown as number,
                isChecked: this.selectedUserids && this.selectedUserids.length > 0 ? this.selectedUserids.findIndex(x => x === person.id) > -1 : false,
                label: `${person.firstName as string} ${person.lastName as string}`
            })
        });
      
       
    }
  
  
    showNextPage(e: any) {

        this._storeValues(e);
      
        const id = this.pageActionUtil.nextUserId();
        if (id < 0) 
        {
            
            this.pq.next();
            return;
        }
        this.currentIndex = id;
        this._initValues();
    }
    showPreviousPage(e: any) {
        
        const id = this.pageActionUtil.backUserId();
        if (id < 0) {
           this.insuraceStore.storeDirection(PageDirection.BACK);
            if(this.hasOutsideHouseHold()){
                let path= `${RoutePath.APPLYNOW}/${RoutePath.APPLYNOW_INSURANCE}/${RoutePath.APPLYNOW_INSURANCE_OUTOFHOUSEPOLICYHOLDER}`
                this.pq.updatePageQueueId(-1);
                this.router.navigate([path]);
                return;
            }
            this.pq.back();
            return;
        }
        this.currentIndex = id;
        this._initValues();
      

    }
    private hasOutsideHouseHold(){
        const insurance=this.insuraceStore.getInsurance();
        const insurances=insurance?.insurances??[];
        return insurances.filter((ins)=>{
            return parseInt(ins.policyHolderIndividualNumber)==parseInt(OUTSIDE_HOUSEHOLD_ID)
        }).length > 0
    }

    _storeValues(ids: any[]) 
    {
    
    this.insuraceStore.updateCovered([...new Set(ids)],PageDirection.NEXT,this.id);

    }
    _getQuestionText(userName:string)
    {
        switch(this.currentType)
        {
            case InsuranceType.Current:
                return `Who in this household is covered by ${userName}'s policy?`
            case InsuranceType.PRIOR:
                return `Who in this household was covered by ${userName}'s prior policy?`
        }
        return ''
    }
    

}
