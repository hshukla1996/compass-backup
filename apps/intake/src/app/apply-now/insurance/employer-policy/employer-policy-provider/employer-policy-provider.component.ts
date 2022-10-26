import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { PageActionUtil } from "apps/intake/src/app/shared/services/page-action-util.service";
import { PageQueueService } from "apps/intake/src/app/shared/services/page-queue.service";
import { PageQueueName } from "../../../+state/apply-now.models";
import { IHouseHold } from "../../../household/household-model";
import { EMPLOYER_CONTACT_INFORMAION, EMPLOYER_POLICY_INFORMATION, OUTSIDE_HOUSEHOLD_ID } from "../../model/insurance-constants";
import { PageQueueOneConfig, PageQueueTWOConfig } from "../../model/insurance-page-queue.util";
import { InsuranceStoreService } from "../../model/insurance-store.service";
import { EmployerOfferedInsurances } from "../../model/insurance.model";

@Component({
    selector: "compass-ui-employer-policy-provider",
    templateUrl: "./employer-policy-provider.component.html",
    styleUrls: ["./employer-policy-provider.component.scss"],
})
export class EmployerPolicyProviderComponent implements OnInit {
    constructor(private fb:FormBuilder,private insuranceStore:InsuranceStoreService,
        private pageActionUtil:PageActionUtil,private pq:PageQueueService) {}
    employerForm:FormGroup|any
    householdPersons=[] as IHouseHold[]
    currentIndex=0 as number
   currentUserName='' as string
   employments=[] as any[]
   id!:any
    ngOnInit(): void {
     
            this.employerForm = this.fb.group({
                employerName: [''],
                employerIdNumber: [''],
               
                
            });
            this.pq.configQueue(PageQueueTWOConfig)
            this._init();

       
    }
    private _init(){
        this.employerForm.reset();
        this.employerForm.markAsPristine();
        let insurance={...this.insuranceStore.getInsurance()};
        const houseHoldHeadPersons = this.insuranceStore.getHouseholdPerson() as IHouseHold[]
        const map = this.insuranceStore.getMapName(insurance?.currentType as string, EMPLOYER_POLICY_INFORMATION) as any;
        this.pageActionUtil.initPageMap(map.mapName, map.mapDirection, false);
        this.employments = this.insuranceStore.getCurrentEmployer(this.currentIndex) as any[];
        let emp_insurances=insurance?.employerOfferedInsurances??[] as EmployerOfferedInsurances[];
        this.currentIndex = this.pageActionUtil.currentUserIndex ?? 0;
        const id =this.currentIndex==houseHoldHeadPersons.length?OUTSIDE_HOUSEHOLD_ID: houseHoldHeadPersons[this.currentIndex].id;
        this.currentUserName = id == OUTSIDE_HOUSEHOLD_ID ? this.insuranceStore.getOutOfHouseHoldName(): houseHoldHeadPersons[this.currentIndex].firstName as any
        const ins_info=emp_insurances.filter((inf)=>{
            return inf.individualNumber==this.id
        })
        if(ins_info.length>0)
        {
            const employerName=ins_info[0].employerIdNumber as any;
           const employerId=ins_info[0].employerIdNumber;
           this.employerForm.get('employerName').patchValue(employerName)
           this.employerForm.get('employerIdNumber').patchValue(employerId)
        }
    }
    next(){
        this.employerForm.markAllAsTouched();

        if(!this.employerForm.valid)return;
        let insurance={...this.insuranceStore.getInsurance()};
        let empOfferedIns=insurance?.employerOfferedInsurances??[].map((ins:EmployerOfferedInsurances)=>(ins.individualNumber==this.id)?{...ins,employerIdNumber:'',employerName:''}:{...ins})
        if(empOfferedIns.length>0)
        {
            insurance.employerOfferedInsurances=[...empOfferedIns];
            this.insuranceStore.updateInsurance(insurance);
        }
        const id=this.pageActionUtil.nextUserId();
        if(id<0)
        {
            this.pq.next();
            return;
        }
        this.currentIndex=id;
        this._init();
    }
    back(){
        const id=this.pageActionUtil.backUserId();
        if(id<0)
        {
            this.pq.back();
            return;
        }
        this.currentIndex=id;
        this._init();
    }
}
