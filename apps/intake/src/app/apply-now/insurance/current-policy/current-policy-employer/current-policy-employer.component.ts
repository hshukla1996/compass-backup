import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { PageActionDirection, PageActionUtil } from "apps/intake/src/app/shared/services/page-action-util.service";
import { PageQueueService } from "apps/intake/src/app/shared/services/page-queue.service";
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from "apps/intake/src/app/shared/utilities/Utility";
import { PageQueueName } from "../../../+state/apply-now.models";
import { PageDirection } from "../../../household/household-model";
import { COVERED_BY_NAME, CURRENT_POLICY_EMPLOYER_NAME, OUTSIDE_HOUSEHOLD_ID } from "../../model/insurance-constants";
import { PageQueueOneConfig } from "../../model/insurance-page-queue.util";
import { InsuranceStoreService } from "../../model/insurance-store.service";
import { InsuranceState, InsuranceType } from "../../model/insurance.model";

@Component({
    selector: "compass-ui-current-policy-employer",
    templateUrl: "./current-policy-employer.component.html",
    styleUrls: ["./current-policy-employer.component.scss"],
})
export class CurrentPolicyEmployerComponent implements OnInit {
    employerForm:FormGroup |any;
    currentUserName='' as string
    currentUserIndex=0 as any
    employments=[] as any[]
    id!:any
    insurance!:InsuranceState
    requiredFields=[] as any[]
    insuranceType='' as string
    constructor(private fb:FormBuilder,private insuranceStoreService:InsuranceStoreService,
        private pageActionUtil: PageActionUtil, private router: Router,  private pq:PageQueueService,) {}

    ngOnInit(): void {
        debugger
        this.employerForm = this.fb.group({
            employerName: [''],
           

        });
        this.pq.configQueue(PageQueueOneConfig)
        this._validateField();
        if(this.requiredFields.length==0){
            const direction=this.insurance.currentDirection;
            if(direction==PageDirection.NEXT)
            {
                this.pq.next();
            }
            if(direction==PageDirection.BACK)
            {
                this.pq.back();
            }
        }
        this.insurance = {...this.insuranceStoreService.getInsurance()} as InsuranceState ;
        
        const map = this.insuranceStoreService.getMapName(this.insurance ?.currentType as string, CURRENT_POLICY_EMPLOYER_NAME) as any;
        this.pageActionUtil.initPageMap(map.mapName, map.mapDirection, false);
        this.currentUserIndex = this.pageActionUtil.currentUserIndex ?? 0;
        this._initData()
   

    }
    next(){
         this.employerForm.markAllAsTouched();
         if(!this.employerForm.valid)return;
        const value = this.employerForm.get('employerName').value;
        this.insuranceStoreService.updateInsuranceInformation({employerName:value},this.id);
        const id=this.pageActionUtil.nextUserId();
        const persons = this.insuranceStoreService.getHouseholdPerson();
        if(id<0 || id==persons.length){
            this.insuranceStoreService.storeDirection(PageDirection.NEXT)
            this.pq.next();
            return;
        }
        this.currentUserIndex=id;
        this._initData();
    }
    back()
    {
        const id = this.pageActionUtil.backUserId();
        const persons = this.insuranceStoreService.getHouseholdPerson();
        if (id < 0 || id==persons.length) {
            this.insuranceStoreService.storeDirection(PageDirection.BACK)
            this.pq.back();
            return;
        }
        this.currentUserIndex = id;
        this._initData();
    } 
    _initData(){
        
       
       
        const persons = this.insuranceStoreService.getHouseholdPerson();
       
        if(this.currentUserIndex==persons.length){
            this.pageActionUtil.removeFromMap(this.currentUserIndex);
            this.pageActionUtil.init(PageActionDirection.BACK);
        }
        this.currentUserIndex = this.pageActionUtil.currentUserIndex ?? 0;
        this.employments = this.insuranceStoreService.getCurrentEmployer(this.currentUserIndex) as any[];
       
        this.id = (this.currentUserIndex == persons.length) ? OUTSIDE_HOUSEHOLD_ID : persons[this.currentUserIndex].id;
        this.currentUserName = this.id == OUTSIDE_HOUSEHOLD_ID ? this.insuranceStoreService.getOutOfHouseHoldName(): persons[this.currentUserIndex].firstName as any
        let insurances=this.insurance ?.insurances??[];
        insurances=insurances.filter((ins)=>{
            return ins.policyHolderIndividualNumber==this.id && this.insurance ?.currentType==ins.type;
        })
        if(insurances.length>0)
        {
            this.employerForm.reset();
            this.employerForm.markAsPristine();
            this.currentUserName=((this.id==OUTSIDE_HOUSEHOLD_ID)?insurances[0].otherPolicyHolder?.firstName:persons[this.currentUserIndex].firstName) as string
            const value=insurances[0].employerName;
            this.employerForm.get('employerName').patchValue(value??'')
           
        }

    }
    private _validateField()
    {
    let householdBenefits = this.insuranceStoreService.getBenefits() as string[];
    const fields = [{
      fieldName: 'employerName',
      optionalProgram: [] as string[],
      requiredProgram:(this.insuranceType==InsuranceType.Current)?[]:[]

    },
      ] as FormValidatorField[]
    if (householdBenefits != null && householdBenefits.length > 0) {
      const requiredOrOptionalValidatorField =
        {

          selectedPrograms: householdBenefits,
          requiredFields: [],
          formGroup: this.employerForm,
          fields: fields
        } as RequiredOrOptionalValidatorField
      Utility.setOrClearValidatorForFieldWithDifferntPrograms(requiredOrOptionalValidatorField)
      this.employerForm = requiredOrOptionalValidatorField.formGroup;
      this.requiredFields = [...requiredOrOptionalValidatorField.requiredFields] as any;
      //this.optionalFields=[...requiredOrOptionalValidatorField.optionalFields] as any;
    }
}
}
