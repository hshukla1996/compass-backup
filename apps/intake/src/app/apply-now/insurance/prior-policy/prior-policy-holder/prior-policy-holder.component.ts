import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppStoreService } from "apps/intake/src/app/app-store-service";
import { ApplyNowService } from "apps/intake/src/app/shared/services/apply-now.service";
import { PageActionUtil, PageActionDirection } from "apps/intake/src/app/shared/services/page-action-util.service";
import { PageQueueService } from "apps/intake/src/app/shared/services/page-queue.service";
import { ApplyNowStoreService } from "../../../apply-now-store-service";
import { IHouseHold, PageDirection } from "../../../household/household-model";
import { CurrentPolicyData } from "../../current-policy/currnt-policy-holder/current-policy-holder.data";
import { CURRENT_MAP_NAMES, INSURANCE_DIVIDER_PATH, OUTSIDEHOUSEHOLD_PATH, OUTSIDE_HOUSEHOLD_ID, PRIOR_MAP_NAMES } from "../../model/insurance-constants";
import { PageQueueOneConfig } from "../../model/insurance-page-queue.util";
import { InsuranceStoreService } from "../../model/insurance-store.service";
import { Insurances, InsuranceType } from "../../model/insurance.model";
import { PriorPolicyData } from "./prior-policy-holder";

@Component({
    selector: "compass-ui-prior-policy-holder",
    templateUrl: "./prior-policy-holder.component.html",
    styleUrls: ["./prior-policy-holder.component.scss"],
})
export class PriorPolicyHolderComponent implements OnInit {
    constructor(private afsStore:ApplyNowStoreService,private insuraceStore:InsuranceStoreService,
        private appStore: AppStoreService, private applyNowService: ApplyNowService,
    private pageActionUtil: PageActionUtil, private router: Router,private pq:PageQueueService) {
        this.appStore.getComapanyNames().subscribe(data=>{
            
            this.comnapnies=data;
        })

    }
    private comnapnies=[] as any[]
    public priorPolicyData = { ...PriorPolicyData }
    selectedUserids:any[]=[]
    hasOutofHousehold:boolean=true;
    houseHoldHeadPersons: IHouseHold[] = [];
    ngOnInit(): void 
    {
        
        
        this.houseHoldHeadPersons = this.afsStore.getHouseholdPersons() as IHouseHold[]
        this.pq.configQueue(PageQueueOneConfig)
        this._initCheckbox();
        if(this.comnapnies.length==0){
            this.appStore.dispatchComapnyNames();
        }
        
     

    }

private _initCheckbox(){
  
    if (this.houseHoldHeadPersons.length > 0) {
        const insurance = this.afsStore.applyNow?.insurance;
        const insurances = insurance?.insurances;
        if (insurances != null && insurances.length > 0) {
            insurances.forEach((insurance) => {
               if(insurance.type==InsuranceType.PRIOR){
                    this.selectedUserids.push(insurance.policyHolderIndividualNumber);
                }
                
               
            })

        }


    }
    this.priorPolicyData.questionAnswers = [];
    this.houseHoldHeadPersons.forEach((person) => {
        this.priorPolicyData.questionAnswers.push({
            id: person.id as unknown as number,
            isChecked: this.selectedUserids && this.selectedUserids.length > 0 ? this.selectedUserids.findIndex(x => parseInt(x) === person.id) > -1 : false,
            label: `${person.firstName as string} ${person.lastName as string}`
        })
    });
    if (this.hasOutofHousehold) {
        this.priorPolicyData.questionAnswers.push({
            id: OUTSIDE_HOUSEHOLD_ID as unknown as number,
            isChecked: this.selectedUserids && this.selectedUserids.length > 0 ? this.selectedUserids.findIndex(x => x === OUTSIDE_HOUSEHOLD_ID) > -1 : false,
            label: `Someone Outside of the household`
        })
    }
}
    showNextPage(e:any)
    {
    

        this._storeValues(e);
       if(e.indexOf(OUTSIDE_HOUSEHOLD_ID) > -1)
       {
           this.router.navigate([OUTSIDEHOUSEHOLD_PATH]);
            return;
        
           
       }
       this.insuraceStore.storeDirection(PageDirection.NEXT)
       this.pq.next();
    }
    showPreviousPage(e:any)
    {
        this.insuraceStore.storeDirection(PageDirection.BACK)
        this.pq.back();

    }

    _storeValues(ids:any[]){
        debugger
        this.pageActionUtil.emptyMap();
        let insurance = { ...this.insuraceStore.getInsurance() };
        let isnurances = insurance?.insurances ?? [] as Insurances[];
        let insurancesObj = [] as Insurances[];
        let selectedUserIds =  [...new Set(ids.map(String))]
       
        if (isnurances.length>0)
        {
            isnurances = isnurances.filter((ins) => {
                return selectedUserIds.indexOf(ins.policyHolderIndividualNumber) > -1 && ins.type==InsuranceType.PRIOR;
            })
            insurancesObj = [...isnurances]
        }
            if (isnurances.length<selectedUserIds.length)
            {
                selectedUserIds = selectedUserIds.filter((id)=>{
                    return isnurances.findIndex((detail)=>detail.policyHolderIndividualNumber==id && detail.type==InsuranceType.PRIOR) < 0 
                })
                
               
            }
        PRIOR_MAP_NAMES.forEach((map) => {
            this.pageActionUtil.initPageMap(map.mapName, map.mapDirection, false);
            this.pageActionUtil.emptyMap();  
            selectedUserIds.forEach((id: string) => {
                const index = this.insuraceStore.getPersonIndex(id)
                this.pageActionUtil.changeMapValue(index, false);
                this.pageActionUtil.updatePageActionDetail(PageActionDirection.NEXT, false)
            });
        
           
    
        })
        const currentIns=isnurances.filter((ins)=>{
            return ins.type==InsuranceType.Current;
        })
        selectedUserIds.forEach((id: string) => {
            const index = isnurances.findIndex((ins)=>parseInt(ins.policyHolderIndividualNumber)==parseInt(id) && ins.type==InsuranceType.PRIOR);
            if(index== -1){
            let ins = (isnurances.length > 0) ? { ...isnurances[0] } : {} as Insurances
            ins.policyHolderIndividualNumber = id.toString();
            ins.type = InsuranceType.PRIOR;
            insurancesObj.push(ins);
          
            }
            })
            insurance.currentType=InsuranceType.PRIOR;    
            insurance.insurances =(currentIns.length>0)? [...currentIns,...insurancesObj]:[...insurancesObj];
            insurance.currentDirection=PageDirection.NEXT;
            this.insuraceStore.updateInsurance(insurance)
    
    }



}

