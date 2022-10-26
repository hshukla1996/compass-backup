import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

import { PageActionUtil } from "apps/intake/src/app/shared/services/page-action-util.service";
import { PageQueueService } from "apps/intake/src/app/shared/services/page-queue.service";
import { PageQueueName } from "../../../+state/apply-now.models";
import { IHouseHold } from "../../../household/household-model";
import { EMPLOYER_CONTACT_INFORMAION, OUTSIDE_HOUSEHOLD_ID } from "../../model/insurance-constants";
import { PageQueueOneConfig, PageQueueTWOConfig } from "../../model/insurance-page-queue.util";
import { InsuranceStoreService } from "../../model/insurance-store.service";
import { EmployerOfferedInsurances } from "../../model/insurance.model";

@Component({
    selector: "compass-ui-employer-contact-information",
    templateUrl: "./employer-contact-information.component.html",
    styleUrls: ["./employer-contact-information.component.scss"],
})
export class EmployerContactInformationComponent implements OnInit {
    contactForm:FormGroup|any
    householdPersons=[] as IHouseHold[]
    currentIndex=0 as number
    currentUserName='' as string
    constructor(private fb:FormBuilder,private insuranceStore:InsuranceStoreService,
        private pageActionUtil:PageActionUtil,private pq:PageQueueService) {}

    ngOnInit(): void {
        this.contactForm = this.fb.group({
            name: [''],
            phone: [''],
            phoneExtension: [''],
            email: [''],
            confirmEmail:['']
            
        });
        this.pq.configQueue(PageQueueTWOConfig)
    }
    private _init(){
        let insurance={...this.insuranceStore.getInsurance()};
        const map = this.insuranceStore.getMapName(insurance?.currentType as string, EMPLOYER_CONTACT_INFORMAION) as any;
        this.pageActionUtil.initPageMap(map.mapName, map.mapDirection, false);
        this.householdPersons=this.insuranceStore.getHouseholdPerson();
        let emp_insurances=insurance?.employerOfferedInsurances??[] as EmployerOfferedInsurances[];
        this.currentIndex = this.pageActionUtil.currentUserIndex ?? 0;
        const id =this.currentIndex==this.householdPersons.length?OUTSIDE_HOUSEHOLD_ID: this.householdPersons[this.currentIndex].id;
        this.currentUserName = id == OUTSIDE_HOUSEHOLD_ID ? this.insuranceStore.getOutOfHouseHoldName(): this.householdPersons[this.currentIndex].firstName as any
        const ins_info=emp_insurances.filter((inf)=>{
            return inf.individualNumber==id
        })
        if(ins_info.length>0)
        {
            const contact_info=ins_info[0].employerContactInformation as any;
            Object.keys(this.contactForm).forEach(key => {
                this.contactForm.get(key).patchValue(contact_info[key])
              });
        }
    }
    next()
    {

        this.contactForm.markAllAsTouched();

        if(!this.contactForm.valid)return;
        let obj={} as any;
        Object.keys(this.contactForm).forEach(key => {
            obj[key]=this.contactForm.get(key).value;
          });
        let insurance={...this.insuranceStore.getInsurance()};
        let emp_insurances=insurance?.employerOfferedInsurances??[] as EmployerOfferedInsurances[];
        if(emp_insurances.length>0)
        {
            
            const id=this.householdPersons[this.currentIndex].id;
            emp_insurances=emp_insurances.map((ins)=>(parseInt(ins.individualNumber)==id)?{...ins,employerContactInformation:obj}:{...ins}) as EmployerOfferedInsurances[]
            insurance.employerOfferedInsurances=[...emp_insurances];
            this.insuranceStore.updateInsurance(insurance);


        }
        const id=this.pageActionUtil.backUserId();
        if(id<0)
        {
            this.pq.next();
            return
        }
        this.currentIndex=id;
        this._init();

    }
    back(){
        const id=this.pageActionUtil.backUserId();
        if(id<0)
        {
            this.pq.back();
            return
        }
        this.currentIndex=id;
        this._init();
    }
    
}
