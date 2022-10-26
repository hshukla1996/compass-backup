import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppStoreService } from "apps/intake/src/app/app-store-service";
import { ApplyNowService } from "apps/intake/src/app/shared/services/apply-now.service";
import { PageActionUtil, PageActionDirection } from "apps/intake/src/app/shared/services/page-action-util.service";
import { PageQueueService } from "apps/intake/src/app/shared/services/page-queue.service";
import { PageQueueName } from "../../../+state/apply-now.models";
import { ApplyNowStoreService } from "../../../apply-now-store-service";
import { IHouseHold } from "../../../household/household-model";
import { CurrentPolicyData } from "../../current-policy/currnt-policy-holder/current-policy-holder.data";
import { OUTSIDE_HOUSEHOLD_ID, OUTSIDEHOUSEHOLD_PATH, INSURANCE_DIVIDER_PATH, CURRENT_MAP_NAMES, EMP_MAP_NAMES } from "../../model/insurance-constants";
import { PageQueueOneConfig, PageQueueTWOConfig } from "../../model/insurance-page-queue.util";
import { InsuranceStoreService } from "../../model/insurance-store.service";
import { EmployerOfferedInsurances, Insurances, InsuranceType } from "../../model/insurance.model";
import { EmployerPolicyData } from "./employer-policy-holder.data";

@Component({
    selector: "compass-ui-employer-policy-holder",
    templateUrl: "./employer-policy-holder.component.html",
    styleUrls: ["./employer-policy-holder.component.scss"],
})
export class EmployerPolicyHolderComponent implements OnInit {
    constructor(private insuraceStore:InsuranceStoreService,
      
    private pageActionUtil: PageActionUtil, private router: Router,private pq:PageQueueService) {
       

    }

    public employerPolicyData = { ...EmployerPolicyData }
    selectedUserids:any[]=[]
    hasOutofHousehold:boolean=true;
    houseHoldHeadPersons: IHouseHold[] = [];
    ngOnInit(): void 
    {
        
        
        this.houseHoldHeadPersons = this.insuraceStore.getHouseholdPerson() as IHouseHold[]
        this.pq.configQueue(PageQueueTWOConfig)
        this._initCheckbox();
       
        
     

    }

private _initCheckbox(){
  
    if (this.houseHoldHeadPersons.length > 0) {
        const insurance = this.insuraceStore.getInsurance();
        const insurances = insurance?.employerOfferedInsurances;
        if (insurances != null && insurances.length > 0) {
            insurances.forEach((insurance) => {
               
                    this.selectedUserids.push(insurance.individualNumber);
                
               
            })

        }


    }
    this.employerPolicyData.questionAnswers = [];
    this.houseHoldHeadPersons.forEach((person) => {
        this.employerPolicyData.questionAnswers.push({
            id: person.id as unknown as number,
            isChecked: this.selectedUserids && this.selectedUserids.length > 0 ? this.selectedUserids.findIndex(x => parseInt(x) === person.id) > -1 : false,
            label: `${person.firstName as string} ${person.lastName as string}`
        })
    });
    if (this.hasOutofHousehold) {
        this.employerPolicyData.questionAnswers.push({
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
        //this.router.navigate([INSURANCE_DIVIDER_PATH]);
        this.pq.back();
    }

_storeValues(ids:any[]){
    this.pageActionUtil.emptyMap();
    let insurance = { ...this.insuraceStore.getInsurance() };
    let isnurances = insurance?.employerOfferedInsurances ?? [];
    let insurancesObj = [] as EmployerOfferedInsurances[];
    let selectedUserIds = ids.map(String)
    if (isnurances.length>0)
    {
        isnurances = isnurances.filter((ins) => {
            return selectedUserIds.indexOf(ins.individualNumber) > -1;
        })
        insurancesObj = [...isnurances]
    }
        if (isnurances.length<selectedUserIds.length)
        {
            selectedUserIds = selectedUserIds.filter((id)=>{
                return isnurances.findIndex((detail)=>detail.individualNumber==id) < 0
            })
            
           
        }
    EMP_MAP_NAMES.forEach((map) => {
        this.pageActionUtil.initPageMap(map.mapName, map.mapDirection, false);  
        selectedUserIds.forEach((id: string) => {
            const index = this.insuraceStore.getPersonIndex(id)
            this.pageActionUtil.changeMapValue(index, false);
        });
    
        this.pageActionUtil.updatePageActionDetail(PageActionDirection.NEXT, false)

    })
    selectedUserIds.forEach((id: string) => {
        const index = isnurances.findIndex((ins)=>ins.individualNumber==id);
        if(index== -1){
        let ins = (isnurances.length > 0) ? { ...isnurances[0] } : {} as EmployerOfferedInsurances
        ins.individualNumber= id.toString();
        
        insurancesObj.push(ins);
        }
        })
       
    insurance.currentType=InsuranceType.EMOPLOYEROFFERED;    
    insurance.employerOfferedInsurances = [...insurancesObj]
    this.insuraceStore.updateInsurance(insurance)

}
}
