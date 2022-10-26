import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppStoreService } from "apps/intake/src/app/app-store-service";
import { PageActionUtil } from "apps/intake/src/app/shared/services/page-action-util.service";
import { PageQueueService } from "apps/intake/src/app/shared/services/page-queue.service";
import { Subscription } from "rxjs";
import { PageQueueName } from "../../../+state/apply-now.models";
import { IHouseHold } from "../../../household/household-model";
import { COVERED_BY_NAME, OUTSIDE_HOUSEHOLD_ID, POLICY_TYPE } from "../../model/insurance-constants";
import { PageQueueOneConfig, PageQueueTWOConfig } from "../../model/insurance-page-queue.util";
import { InsuranceStoreService } from "../../model/insurance-store.service";
import { EmployerOfferedInsurances } from "../../model/insurance.model";
import { CoveredByData } from "./employer-coverage.data";

@Component({
    selector: "compass-ui-employer-coverage-selection",
    templateUrl: "./employer-coverage-selection.component.html",
    styleUrls: ["./employer-coverage-selection.component.scss"],
})
export class EmployerCoverageSelectionComponent implements OnInit {
    private coverages=[] as  any[]
    emplyerOfferCoverageType = { ...CoveredByData }
    selectedIds=[] as any[]
    currentIndex=0 as number
    currentUserName='' as string
    houseHoldHeadPersons=[] as IHouseHold[]
     subscription!: Subscription
    id!: any
    constructor( private insuraceStore: InsuranceStoreService,
        private appStore: AppStoreService,
        private pageActionUtil: PageActionUtil, private pq:PageQueueService) {
       
    }
    ngOnInit(): void {
        this.pq.configQueue(PageQueueTWOConfig)
        this.subscription = this.appStore.getPolicyEmployeeCoverage().subscribe(data => {
            this.coverages = data;
            if(this.coverages.length==0)return;
            this._initData();
        });
       
        if (this.coverages.length == 0) {
            this.appStore.dispatchEmployeePolicyCoverage();
        }
    }
    private _initData(){
       
            
            const insurance = this.insuraceStore.getInsurance();
             const map = this.insuraceStore.getMapName(insurance?.currentType as string, POLICY_TYPE) as any;
             this.pageActionUtil.initPageMap(map.mapName, map.mapDirection, false);
            
            if (this.coverages.length > 0) {
                 this.houseHoldHeadPersons = this.insuraceStore.getHouseholdPerson() as IHouseHold[]
                 this.currentIndex = this.pageActionUtil.currentUserIndex ?? 0;
                 const id =this.currentIndex==this.houseHoldHeadPersons.length?OUTSIDE_HOUSEHOLD_ID: this.houseHoldHeadPersons[this.currentIndex].id;
                 this.currentUserName = id == OUTSIDE_HOUSEHOLD_ID ? this.insuraceStore.getOutOfHouseHoldName(): this.houseHoldHeadPersons[this.currentIndex].firstName as any
           
             const employerOfferedInsurances=insurance?.employerOfferedInsurances as EmployerOfferedInsurances[];
             if(employerOfferedInsurances?.length>0)
             {
                 const filerEmpInsurance=employerOfferedInsurances.filter((empIns)=>{
                     return empIns.individualNumber==this.id;
                 })
                 if(filerEmpInsurance.length>0)
                 {
                     const _selectedCoverage=filerEmpInsurance[0].typesOfCoverage as any[];
                     this.selectedIds = [..._selectedCoverage as any]
                 }
                
             }
                // 
                this.emplyerOfferCoverageType.questionAnswers = [];
                this.emplyerOfferCoverageType.questionText = this.emplyerOfferCoverageType.questionText.replace('{user}', this.currentUserName)
                this.coverages.forEach((coverage) => {
                    this.emplyerOfferCoverageType.questionAnswers.push({
                        id: coverage.id as unknown as number,
                        isChecked: this.selectedIds && this.selectedIds.length > 0 ? this.selectedIds.findIndex(x => x === coverage.id) > -1 : false,
                        label: coverage.displayValue
                    })
                });
            }
      

    }
    showPreviousPage(e:any)
    {
        const id=this.pageActionUtil.backUserId();
        if(id<0)
        {
            this.pq.back();
            return
        }
        this.currentIndex=id;
        this._initData();
    }
    showNextPage(e:any)
    {

       
        let insurance={...this.insuraceStore.getInsurance()};
        let emp_insurances=insurance?.employerOfferedInsurances??[] as EmployerOfferedInsurances[];
        if(emp_insurances.length>0)
        {
           
            const id=this.houseHoldHeadPersons[this.currentIndex].id;
            emp_insurances=emp_insurances.map((ins)=>(parseInt(ins.individualNumber)==id)?{...ins,typesOfCoverage:e}:{...ins}) as EmployerOfferedInsurances[]
            insurance.employerOfferedInsurances=[...emp_insurances];
            this.insuraceStore.updateInsurance(insurance);


        }
        const id=this.pageActionUtil.nextUserId();
        if(id<0)
        {
            this.pq.next();
            return
        }
        this.currentIndex=id;
        this._initData();
    }
  
}
