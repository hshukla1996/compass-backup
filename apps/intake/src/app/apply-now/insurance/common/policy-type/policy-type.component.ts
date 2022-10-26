import { ForwardRefHandling } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AppStoreService } from "apps/intake/src/app/app-store-service";
import { PageActionUtil } from "apps/intake/src/app/shared/services/page-action-util.service";
import { PageQueueService } from "apps/intake/src/app/shared/services/page-queue.service";
import { Utility } from "apps/intake/src/app/shared/utilities/Utility";
import { Subscription } from "rxjs";
import { PageQueueName } from "../../../+state/apply-now.models";
import { ApplyNowStoreService } from "../../../apply-now-store-service";
import { IHouseHold, PageDirection } from "../../../household/household-model";
import { OUTSIDE_HOUSEHOLD_ID, POLICY_TYPE } from "../../model/insurance-constants";
import { PageQueueOneConfig } from "../../model/insurance-page-queue.util";
import { InsuranceStoreService } from "../../model/insurance-store.service";
import { InsuranceType } from "../../model/insurance.model";

@Component({
    selector: "compass-ui-policy-type",
    templateUrl: "./policy-type.component.html",
    styleUrls: ["./policy-type.component.scss"],
})
export class PolicyTypeComponent implements OnInit {
    private subscription!: Subscription
    types=[] as any[]
    policyTypes = [] as any[];
    id!: any
    typesFormGroup: FormGroup | any; houseHoldPersons: IHouseHold[] = [];
    currentIndex = 0;
    currentUserName='' as string
    requiredField = []
    control!: FormControl
    requiredFields = [] as string[]
    optionalFields = [] as string[]
    isRequired=false as boolean
    constructor(private insuraceStore: InsuranceStoreService,
        private appStore: AppStoreService,
        private pageActionUtil: PageActionUtil, private router: Router, private fb: FormBuilder,
        private pq:PageQueueService) {
       

      
    }

    ngOnInit(): void {
        this.typesFormGroup = this.fb.group({

            typeName: ['',],

        });
        
        this.control = this.typesFormGroup.get('typeName') as FormControl;
        this.pq.configQueue(PageQueueOneConfig )
        this.subscription = this.appStore.getPolicyTypes().subscribe(data => {
            this.types = data;
            if(this.types.length>0){
                
                this._initData();

            }
        });
        if (this.types.length == 0) {
            this.appStore.dispatchPolicyTypes();
        }
      
    }
    private _initData() {
        this.typesFormGroup.reset();
        this.typesFormGroup.markAsPristine();
        const insurance = {...this.insuraceStore.getInsurance()};
        const map = this.insuraceStore.getMapName(insurance?.currentType ?? '', POLICY_TYPE) as any;
        this.pageActionUtil.initPageMap(map.mapName, map.mapDirection, false);
        this.currentIndex = this.pageActionUtil.currentUserIndex ?? 0;
            const houseHoldHeadPersons = this.insuraceStore.getHouseholdPerson() as IHouseHold[]
            if (houseHoldHeadPersons !== null && houseHoldHeadPersons !== undefined) {
                const benefits=insurance.currentType==InsuranceType.Current?[]:[];
                this.isRequired=Utility.areProgramsExist(this.insuraceStore.getBenefits() as string[],benefits)
                this.id =this.currentIndex==houseHoldHeadPersons.length?OUTSIDE_HOUSEHOLD_ID: houseHoldHeadPersons[this.currentIndex].id
                this.currentUserName = this.id == OUTSIDE_HOUSEHOLD_ID ? this.insuraceStore.getOutOfHouseHoldName(): houseHoldHeadPersons[this.currentIndex].firstName as any

                if (insurance !== null) {
                    const type = insurance?.currentType;
                    let insurances = insurance?.insurances ?? [];
                    if (insurances.length > 0) {
                        insurances = insurances.filter((ins) => {
                            return ins.policyHolderIndividualNumber == this.id && ins.type == type
                        })
                        if (insurances.length > 0) {
                            this.policyTypes = insurances[0]?.policyTypes ?? [];
                            if (this.policyTypes?.length > 0) {
                                
                                this.typesFormGroup.get('typeName').patchValue(this.policyTypes[0]);
                            }
                        }
                    }


                }


            }
        

      
    }
    ngDestroy() {
        this.subscription.unsubscribe();
    }
    next() {

        this.typesFormGroup.markAllAsTouched();
        const isValid = this.typesFormGroup.valid;
        if (!isValid) {
            return;
        }
        const values = [this.typesFormGroup.get('typeName').value]
        this.insuraceStore.updateInsuranceInformation({ policyTypes: values }, this.id)
        const id=this.pageActionUtil.nextUserId();
        if(id<0)
        {
            this.insuraceStore.storeDirection(PageDirection.NEXT)
            this.pq.next();
            return;
        }
        this.currentIndex=id;
        this._initData();
    }
   
    back() {
        const id=this.pageActionUtil.backUserId();
        if(id<0)
        {
            this.insuraceStore.storeDirection(PageDirection.BACK)
            this.pq.back();
            return;
        }
        this.currentIndex=id;
        this._initData();
    }
    isFieldValid(field: string): boolean {

        return (this.typesFormGroup.get(field).status !== 'VALID' && (this.typesFormGroup.get(field).dirty || this.typesFormGroup.get(field).touched))
    }
}
