import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { PageActionUtil } from "apps/intake/src/app/shared/services/page-action-util.service";
import { PageQueueService } from "apps/intake/src/app/shared/services/page-queue.service";
import { Subscription } from "rxjs";
import { AppStoreService } from "../../../../app-store-service";
import { IHouseHold, PageDirection } from "../../../household/household-model";
import { OUTSIDE_HOUSEHOLD_ID, POLICY_END } from "../../model/insurance-constants";
import { PageQueueOneConfig } from "../../model/insurance-page-queue.util";
import { InsuranceStoreService } from "../../model/insurance-store.service";
import { Insurances, InsuranceType } from "../../model/insurance.model";

@Component({
    selector: "compass-ui-prior-poilcy-end",
    templateUrl: "./prior-poilcy-end.component.html",
    styleUrls: ["./prior-poilcy-end.component.scss"],
})
export class PriorPoilcyEndComponent implements OnInit {
    priorPolicyEndForm!: FormGroup | any
    private subscription!: Subscription
    currentIndex=0 as number
    currentUserName='' as string
    householdPerons=[] as IHouseHold[]
    currentType='' as string
    id!:any
  policyEnd: any[] = [];
    constructor(private fb: FormBuilder, private appService: AppStoreService,
        private pageActionUtil:PageActionUtil,
         private insuraceStore: InsuranceStoreService,private pq:PageQueueService) { }
   

    ngOnInit(): void {
        this.priorPolicyEndForm = this.fb.group({
            policyStartDate: ['',],
            policyEndDate: ['',],
            reasonForLosingHealthInsurance: ['',],
            didApplyUnemploymentCompensation:[''],
            employerStoppedCoverageChildrenLostInsurance: ['',],

        });
        this.pq.configQueue(PageQueueOneConfig )
        this.subscription = this.appService.getPolicyEndCoverage().subscribe((policyEnds) => {
            this.policyEnd = policyEnds;
            this._init();
        });
        if (this.policyEnd.length == 0) {
            this.appService.dispatchPolicyEndCoverage();
        }

    }
    private _init()
    {
        this.priorPolicyEndForm.reset();
        this.priorPolicyEndForm.markAsPristine();
        const insurance={...this.insuraceStore.getInsurance()};
        const insurances=insurance.insurances??[];
        this.householdPerons=this.insuraceStore.getHouseholdPerson();
        
        const map = this.insuraceStore.getMapName(insurance?.currentType as string, POLICY_END) as any;
        this.pageActionUtil.initPageMap(map.mapName, map.mapDirection, false);
        this.currentIndex = this.pageActionUtil.currentUserIndex ?? 0;
        this.id =this.currentIndex==this.householdPerons.length?OUTSIDE_HOUSEHOLD_ID: this.householdPerons[this.currentIndex].id;
        this.currentUserName = this.id == OUTSIDE_HOUSEHOLD_ID ? this.insuraceStore.getOutOfHouseHoldName(): this.householdPerons[this.currentIndex].firstName as any
        this._loadValues(insurances)
        this.priorPolicyEndForm.markAsPristine();

    }
    private _loadValues(insurances:Insurances[])
    {
        debugger
        const filter_ins=insurances.filter((ins)=>{
            return ins.policyHolderIndividualNumber==this.id && ins.type==InsuranceType.PRIOR
        })
        if(filter_ins.length>0)
        {

            this.priorPolicyEndForm.get('policyStartDate').patchValue(filter_ins[0].policyStartDate)
            this.priorPolicyEndForm.get('policyEndDate').patchValue(filter_ins[0].policyEndDate)
            this.priorPolicyEndForm.get('reasonForLosingHealthInsurance').patchValue(filter_ins[0].reasonForLosingHealthInsurance)
            this.priorPolicyEndForm.get('didApplyUnemploymentCompensation').patchValue(filter_ins[0].didApplyUnemploymentCompensation)
            this.priorPolicyEndForm.get('employerStoppedCoverageChildrenLostInsurance').patchValue(filter_ins[0].employerStoppedCoverageChildrenLostInsurance)
        }
        
    }
    
    back(){
        const id=this.pageActionUtil.backUserId();
        if(id<0){
            this.insuraceStore.storeDirection(PageDirection.BACK)
            this.pq.back();
            return
        }
        this.currentIndex=id;
        this._init();
    }
    next(){
        let policyEndData = {} as any
        for (const field in this.priorPolicyEndForm.controls) { 
            const control = this.priorPolicyEndForm.get(field); 
            policyEndData[field]=control.value
        }
       
        this.insuraceStore.updateInsuranceInformation(policyEndData, this.id)
        const id=this.pageActionUtil.nextUserId();
        if(id<0){
            this.insuraceStore.storeDirection(PageDirection.NEXT)
            this.pq.next();
            return;
        }
        this.currentIndex=id;
        this._init();
    }
}
