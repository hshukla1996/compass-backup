import { Component, OnInit } from "@angular/core";
import { ApplyNowStoreService } from "../../../apply-now-store-service";

import { InsuranceStoreService } from "../../model/insurance-store.service";

import { CurrentPolicyData } from './current-policy-holder.data'

import { Router } from "@angular/router";
import { PageActionDirection, PageActionUtil } from "../../../../shared/services/page-action-util.service";
import { AppStoreService } from "../../../../app-store-service";
import { IHouseHold, PageDirection } from "../../../household/household-model";
import { OUTSIDE_HOUSEHOLD_ID, INSURANCE_DIVIDER_PATH, OUTSIDEHOUSEHOLD_PATH, CURRENT_MAP_NAMES } from "../../model/insurance-constants";
import { Insurances, InsuranceType } from "../../model/insurance.model";
import { ApplyNowService } from "apps/intake/src/app/shared/services/apply-now.service";
import { PageQueueService } from "apps/intake/src/app/shared/services/page-queue.service";
import { PageQueueName } from "../../../+state/apply-now.models";
import { PageQueueOneConfig } from "../../model/insurance-page-queue.util";

@Component({
    selector: "compass-ui-currnt-policy-holder",
    templateUrl: "./currnt-policy-holder.component.html",
    styleUrls: ["./currnt-policy-holder.component.scss"],
})
export class CurrntPolicyHolderComponent implements OnInit {

    
    constructor(private afsStore:ApplyNowStoreService,private insuraceStore:InsuranceStoreService,
    private pageActionUtil: PageActionUtil, private router: Router,
    private pq: PageQueueService) {
       

    }

    public currentPolicyData = { ...CurrentPolicyData }
    selectedUserids:any[]=[]
    hasOutofHousehold:boolean=true;
    houseHoldHeadPersons: IHouseHold[] = [];
    ngOnInit(): void 
    {
        
        debugger
        this.houseHoldHeadPersons = this.insuraceStore.getHouseholdPerson() as IHouseHold[]
        this.pq.configQueue(PageQueueOneConfig)
        this._initCheckbox();
        
    }

private _initCheckbox(){
  
    if (this.houseHoldHeadPersons.length > 0) {
        const insurance = this.afsStore.applyNow?.insurance;
        const insurances = insurance?.insurances;
        if (insurances != null && insurances.length > 0) {
            insurances.forEach((insurance) => {
                    this.selectedUserids.push(insurance.policyHolderIndividualNumber);
            })

        }

    }
    this.currentPolicyData.questionAnswers = [];
    this.houseHoldHeadPersons.forEach((person) => {
        this.currentPolicyData.questionAnswers.push({
            id: person.id as unknown as number,
            isChecked: this.selectedUserids && this.selectedUserids.length > 0 ? this.selectedUserids.findIndex(x => parseInt(x) === person.id) > -1 : false,
            label: `${person.firstName as string} ${person.lastName as string}`
        })
    });
    if (this.hasOutofHousehold) {
        this.currentPolicyData.questionAnswers.push({
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
       this.pq.next();
    }
    showPreviousPage(e:any)
    {   
        this.pq.back();
        //this.router.navigate([INSURANCE_DIVIDER_PATH]);

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
                return selectedUserIds.indexOf(ins.policyHolderIndividualNumber) > -1 && ins.type==InsuranceType.Current;
            })
            insurancesObj = [...isnurances]
        }
            if (isnurances.length<selectedUserIds.length)
            {
                selectedUserIds = selectedUserIds.filter((id)=>{
                    return isnurances.findIndex((detail)=>detail.policyHolderIndividualNumber==id && detail.type==InsuranceType.Current) < 0 
                })
                
               
            }
        CURRENT_MAP_NAMES.forEach((map) => {
            this.pageActionUtil.initPageMap(map.mapName, map.mapDirection, false);
            this.pageActionUtil.emptyMap();  
            selectedUserIds.forEach((id: string) => {
                const index = this.insuraceStore.getPersonIndex(id)
                this.pageActionUtil.changeMapValue(index, false);
                this.pageActionUtil.updatePageActionDetail(PageActionDirection.NEXT, false)
            });
        
           
    
        })
        const currentIns=isnurances.filter((ins)=>{
            return ins.type==InsuranceType.PRIOR;
        })
        selectedUserIds.forEach((id: string) => {
            const index = isnurances.findIndex((ins)=>parseInt(ins.policyHolderIndividualNumber)==parseInt(id) && ins.type==InsuranceType.Current);
            if(index== -1){
            let ins = (isnurances.length > 0) ? { ...isnurances[0] } : {} as Insurances
            ins.policyHolderIndividualNumber = id.toString();
            ins.type = InsuranceType.Current;
            insurancesObj.push(ins);
          
            }
            })
            insurance.currentType=InsuranceType.Current;    
            insurance.insurances =(currentIns.length>0)? [...currentIns,...insurancesObj]:[...insurancesObj];
            insurance.currentDirection=PageDirection.NEXT;
            this.insuraceStore.updateInsurance(insurance)
    
    }


}
