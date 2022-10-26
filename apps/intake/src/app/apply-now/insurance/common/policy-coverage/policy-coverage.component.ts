import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppStoreService } from "apps/intake/src/app/app-store-service";
import { PageActionUtil } from "apps/intake/src/app/shared/services/page-action-util.service";
import { PageQueueService } from "apps/intake/src/app/shared/services/page-queue.service";
import { Utility } from "apps/intake/src/app/shared/utilities/Utility";
import { id } from "date-fns/locale";
import { Subscription } from "rxjs";
import { PageQueueName } from "../../../+state/apply-now.models";

import { IHouseHold, PageDirection } from "../../../household/household-model";
import { COVERAGE_PROPERTY_NAME, COVERED_BY_NAME, CURRENT_POLICY_COVEREDBY_PROGRAMS, OUTSIDE_HOUSEHOLD_ID, POLICY_COVERAGE, PRIOR_POLICY_COVEREDBY_PROGRAMS } from "../../model/insurance-constants";
import { PageQueueOneConfig } from "../../model/insurance-page-queue.util";
import { InsuranceStoreService } from "../../model/insurance-store.service";
import { InsuranceState, InsuranceType } from "../../model/insurance.model";
import { CoveredByData } from "./policy-coverage.data";

@Component({
    selector: "compass-ui-policy-coverage",
    templateUrl: "./policy-coverage.component.html",
    styleUrls: ["./policy-coverage.component.scss"],
})
export class PolicyCoverageComponent implements OnInit {
    private subscription!: Subscription
    private coverages=[] as  any[]
     currentCoverage = { ...CoveredByData }
    private currentIndex=0;
     selectedIds=[] as any[]
    private _selectedCoverage=[] as any[]
    private _id!:any;
    requiredFields=[] as any[]

    constructor( private insuraceStore: InsuranceStoreService,
        private appStore: AppStoreService,
        private pageActionUtil: PageActionUtil, private router: Router,
        private pq:PageQueueService) {
       
    }
    ngOnInit(): void {
        debugger
      
        this._initData();
        this.pq.configQueue(PageQueueOneConfig )
    }
     showNextPage(e:any)
     {
         debugger
        this._storeValues(e); 
         const id = this.pageActionUtil.nextUserId();
         if (id < 0) {
            this.insuraceStore.storeDirection(PageDirection.NEXT);
            this.pq.next();
             return;
         }
         this.currentIndex = id;
         this._initData();
    }
     showPreviousPage(e:any)
    {
        debugger
        const id=this.pageActionUtil.backUserId();
        if(id<0){
            this.insuraceStore.storeDirection(PageDirection.BACK);
           this.pq.back();
            return;
        }
        this.currentIndex=id;
         this._initData();
        

    }
    private  _storeValues(ids:any[])
    {
        this._selectedCoverage=[...ids];
        this.insuraceStore.updateInsuranceInformation({ benefits: this._selectedCoverage }, this._id)
    }
    ngDestroy(){
        this.subscription.unsubscribe();
        this.insuraceStore.endSubscription();
    }
    private _initData(){
        this.subscription = this.appStore.getPolicyCoverage().subscribe(data => {
            debugger
            if(data.length==0)return;
            const insurance = this.insuraceStore.getInsurance() as InsuranceState;
            const map = this.insuraceStore.getMapName(insurance?.currentType as string, POLICY_COVERAGE) as any;
            this.pageActionUtil.initPageMap(map.mapName, map.mapDirection, false);
            this.coverages = data;
            if (this.coverages.length > 0) {
                const houseHoldHeadPersons = this.insuraceStore.getHouseholdPerson() as IHouseHold[]
                this.currentIndex=this.pageActionUtil.currentUserIndex;
                this._id =this.currentIndex==houseHoldHeadPersons.length?OUTSIDE_HOUSEHOLD_ID: houseHoldHeadPersons[this.currentIndex].id;
                const name = this._id == OUTSIDE_HOUSEHOLD_ID ? this.insuraceStore.getOutOfHouseHoldName(): houseHoldHeadPersons[this.currentIndex].firstName as any
                this._selectedCoverage = this.insuraceStore.getInsuranceCoverage(this._id as any) as any;
                this.selectedIds = [...this._selectedCoverage as any]
                const obj=this._getText(insurance,name);
                this.currentCoverage.questionText=obj.questionText;
                this.currentCoverage.subHeading=obj.subHeading;
                this.currentCoverage.isRequired=this._isRequired(insurance);
                this.currentCoverage.questionAnswers = [];
                this.currentCoverage.questionText = this.currentCoverage.questionText.replace('{user}', name)
                this.coverages.forEach((coverage) => {
                    this.currentCoverage.questionAnswers.push({
                        id: coverage.id as unknown as number,
                        isChecked: this.selectedIds && this.selectedIds.length > 0 ? this.selectedIds.findIndex(x => x === coverage.id) > -1 : false,
                        label: coverage.displayValue
                    })
                });
            }
        })

        if (this.coverages.length == 0) {
            this.appStore.dispatchPolicyCoverage();
        }
    }
    private _isRequired(insurance:InsuranceState){
        const benefits=this.insuraceStore.getBenefits();
        const  requiredProgram=(insurance.currentType==InsuranceType.Current)?(CURRENT_POLICY_COVEREDBY_PROGRAMS as string[]):PRIOR_POLICY_COVEREDBY_PROGRAMS
    
          if (benefits != null && benefits.length > 0) 
          {
          
           return  Utility.areProgramsExist(benefits,requiredProgram)
           
          }
        return false;
    }
    private _getOutsideHouseholdName(){
        const insurance=this.insuraceStore.getInsurance();
        const insurances=insurance?.insurances??[];
        const extractUser=insurances.filter((ins)=>ins.policyHolderIndividualNumber==OUTSIDE_HOUSEHOLD_ID && ins.type==insurance?.currentType);
        return extractUser.length>0 ? extractUser[0].otherPolicyHolder?.firstName:''
    }
    private _getText(insurance:InsuranceState,userName:string){
        let obj={
            questionText:`What is covered by ${userName}'s policy`,
            subHeading:'Select all that apply.'
        }
        if(insurance.currentType==InsuranceType.PRIOR)
        {
            
                obj.questionText=`What was covered by ${userName}'s prior policy?`
             
        }
        return obj;

    }


}
