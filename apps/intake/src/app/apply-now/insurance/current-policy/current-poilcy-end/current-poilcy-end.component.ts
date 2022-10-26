import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { PageActionUtil } from "apps/intake/src/app/shared/services/page-action-util.service";
import { PageQueueService } from "apps/intake/src/app/shared/services/page-queue.service";
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from "apps/intake/src/app/shared/utilities/Utility";
import { Subscription } from "rxjs";
import { PageQueueName } from "../../../+state/apply-now.models";
import { AppStoreService } from "../../../../app-store-service";
import { PageDirection } from "../../../household/household-model";
import { OUTSIDE_HOUSEHOLD_ID, POLICY_END } from "../../model/insurance-constants";
import { PageQueueOneConfig } from "../../model/insurance-page-queue.util";
import { InsuranceStoreService } from "../../model/insurance-store.service";
import { InsuranceType } from "../../model/insurance.model";

@Component({
    selector: "compass-ui-current-poilcy-end",
    templateUrl: "./current-poilcy-end.component.html",
    styleUrls: ["./current-poilcy-end.component.scss"],
})
export class CurrentPoilcyEndComponent implements OnInit {
    private subscription!: Subscription
    currentPolicyEndForm!: FormGroup | any
    
    constructor(private fb: FormBuilder, private appService: AppStoreService, 
       
        private pageActionUtil: PageActionUtil, private router: Router,
        private insuraceStore: InsuranceStoreService,  private pq:PageQueueService,) {}
    policyEnd:any[] =[];
    visible:boolean =false;
    currentUserName:string=''
    currentUserindex:number=0;
    id!:any
    requiredFields=[] as any[]
    optionalFields=[] as any[]
    ngOnInit(): void 
    {
        
        this.pq.configQueue(PageQueueOneConfig)
        const insurance = this.insuraceStore.getInsurance();
        const map = this.insuraceStore.getMapName(insurance?.currentType as string, POLICY_END) as any;
        this.pageActionUtil.initPageMap(map.mapName, map.mapDirection, false);
        this.currentUserindex = this.pageActionUtil.currentUserIndex ?? 0;
        this.currentPolicyEndForm = this.fb.group({
            isInsuranceEnd: ['', ],
            policyEndDate: ['', ],
            reasonForFutureLossHealthInsurance: ['', ],
            employerStoppedCoverageChildrenLostInsurance: ['', ],
            
        });
        this.subscription = this.appService.getPolicyEndCoverage().subscribe((policyEnds) => {
            if(policyEnds.length==0)return;
            this.policyEnd = policyEnds;
            this._validateField();
            if(this.requiredFields.length==0 || this.optionalFields.length==0)
            {
                const direction=this.insuraceStore.getInsurance()?.currentDirection??'';
                if(direction==PageDirection.NEXT){
                    this.pq.next()
                }
                if(direction==PageDirection.BACK)
                {
                    this.pq.back();
                }
            }
            this._initData();
           
           
        })
           
        if (this.policyEnd.length == 0) {
            this.appService.dispatchPolicyEndCoverage();
        }
        this.currentPolicyEndForm.get('policyEndDate').valueChanges.subscribe((value: any) => {

            this.visible = (value !=='' && value!==undefined) ? true : false
            if (!this.visible) {

                this.currentPolicyEndForm.get('reasonForFutureLossHealthInsurance').patchValue("")

            }

        })
       
       
  
    }
    next()
    {
        
        this.currentPolicyEndForm.markAllAsTouched();
        if(!this.currentPolicyEndForm.valid)return;
        let policyEndData={
            policyEndDate: this.currentPolicyEndForm.get('policyEndDate').value,
            isInsuranceEnd: this.currentPolicyEndForm.get('isInsuranceEnd').value,
            reasonForFutureLossHealthInsurance: this.currentPolicyEndForm.get('reasonForFutureLossHealthInsurance').value,
            employerStoppedCoverageChildrenLostInsurance: this.currentPolicyEndForm.get('employerStoppedCoverageChildrenLostInsurance').value

        }
        this.insuraceStore.updateInsuranceInformation(policyEndData, this.id)

        const id=this.pageActionUtil.nextUserId();
        if(id<0){
            this.insuraceStore.storeDirection(PageDirection.NEXT)
            this.pq.next();
            return;
        }
        this.currentUserindex=id;
        this._initData();
    }
    back(){
        const id=this.pageActionUtil.backUserId();
        if(id<0){
            this.insuraceStore.storeDirection(PageDirection.BACK)
            this.pq.back();
            return;
        }
        this.currentUserindex=id;
        this._initData();
    }
    private _initData(){
    
            
            if(this.policyEnd.length==0)return;
            this.currentPolicyEndForm.reset();
            this.currentPolicyEndForm.markAsPristine();
            this.currentPolicyEndForm.get('reasonForFutureLossHealthInsurance').patchValue('')
            const insurance = this.insuraceStore.getInsurance();
         
            const persons=this.insuraceStore.getHouseholdPerson();
            if(persons.length>0)
            {
                this.id=(this.currentUserindex==persons.length)?OUTSIDE_HOUSEHOLD_ID:persons[this.currentUserindex].id;
                let insurances=insurance?.insurances??[];
                insurances=insurances.filter((ins)=>{
                    return ins.policyHolderIndividualNumber==this.id && ins.type==insurance?.currentType;
                })
                if(insurances.length>0)
                {
                    this.currentUserName =this.id == OUTSIDE_HOUSEHOLD_ID ? this.insuraceStore.getOutOfHouseHoldName(): persons[this.currentUserindex].firstName as any
                    this.currentPolicyEndForm.get('policyEndDate').patchValue(insurances[0].policyEndDate);
                    this.currentPolicyEndForm.get('isInsuranceEnd').patchValue(insurances[0].isInsuranceEnd)
                    this.currentPolicyEndForm.get('reasonForFutureLossHealthInsurance').patchValue(insurances[0].reasonForFutureLossHealthInsurance)
                    this.currentPolicyEndForm.get('employerStoppedCoverageChildrenLostInsurance').patchValue(insurances[0].employerStoppedCoverageChildrenLostInsurance)
                }
                

            }
    
        
        
     
    }
    private _validateField()
    {
        
    let householdBenefits = this.insuraceStore.getBenefits() as string[];
    const type=this.insuraceStore.getInsurance()?.currentType??''
    const fields = [{
      fieldName: 'isInsuranceEnd',
      optionalProgram: [] as string[],
      requiredProgram:(type==InsuranceType.Current)?[]:[]

    }, {
      fieldName: 'policyEndDate',
      optionalProgram: [] as string[],
      requiredProgram:(type==InsuranceType.Current)?[]:[]

    },
      {
        fieldName: 'reasonForFutureLossHealthInsurance',
        optionalProgram: [] as string[],
        requiredProgram: (type==InsuranceType.Current)?[]:[]

      },
      {
        fieldName: 'employerStoppedCoverageChildrenLostInsurance',
        optionalProgram: [] as string[],
        requiredProgram: (type==InsuranceType.Current)?[]:[]

      },
      
      ] as FormValidatorField[]
    if (householdBenefits != null && householdBenefits.length > 0) {
      const requiredOrOptionalValidatorField =
        {

          selectedPrograms: householdBenefits,
          requiredFields: [],
          formGroup: this.currentPolicyEndForm,
          fields: fields
        } as RequiredOrOptionalValidatorField
      Utility.setOrClearValidatorForFieldWithDifferntPrograms(requiredOrOptionalValidatorField)
      this.currentPolicyEndForm = requiredOrOptionalValidatorField.formGroup;
      this.requiredFields = [...requiredOrOptionalValidatorField.requiredFields] as any;
      this.optionalFields=[...requiredOrOptionalValidatorField.optionalFields] as any;
    }
}
}
