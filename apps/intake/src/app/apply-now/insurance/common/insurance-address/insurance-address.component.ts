import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AppStoreService } from "apps/intake/src/app/app-store-service";
import { PageActionUtil } from "apps/intake/src/app/shared/services/page-action-util.service";
import { PageQueueService } from "apps/intake/src/app/shared/services/page-queue.service";
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from "apps/intake/src/app/shared/utilities/Utility";

import { Subscription } from "rxjs";
import { PageQueueName } from "../../../+state/apply-now.models";
import { ApplyNowStoreService } from "../../../apply-now-store-service";
import { PageDirection } from "../../../household/household-model";
import { NSLPSummaryComponent } from "../../../individual-details/nslp-summary/nslp-summary.component";
import { ADDRESS, OUTSIDE_HOUSEHOLD_ID, POLICY_ADDRESS_PROPERTY_NAME } from "../../model/insurance-constants";
import { PageQueueOneConfig } from "../../model/insurance-page-queue.util";
import { InsuranceStoreService } from "../../model/insurance-store.service";
import { IInsuranceAddress, Insurances, InsuranceState, InsuranceType } from "../../model/insurance.model";
import * as InsuranceConstants from "../../model/insurance-constants";
@Component({
    selector: "compass-ui-insurance-address",
    templateUrl: "./insurance-address.component.html",
    styleUrls: ["./insurance-address.component.scss"],
})
export class InsuranceAddressComponent implements OnInit {
    addressForm!: FormGroup | any
    private subscription!: Subscription
    currentIndex: number = 0;
    addressProps = ['addressLine1', 'addressLine2','city','state','zip']
    otherAddressProps = ['otheraddressLine1', 'otheraddressLine2', 'othercity', 'otherzip', 'otherstate'] as string[]
    visible = false as boolean
    states = [] as any[];
    currentType='' as string;
    current=InsuranceType.Current
    currentUserName='' as string
    optionalFields=[] as string[]
    requiredFields=[] as string[];
    @Input() props: any;

   

    constructor(private fb: FormBuilder, private appService: AppStoreService,
         private insuraceStore: InsuranceStoreService,
        private afsStore: ApplyNowStoreService, private pageActionUtil: PageActionUtil,
        
        private pq:PageQueueService) { 
            
           
        }

    ngOnInit(): void {
        this.addressForm = this.fb.group({
            addressLine1: [''],
            addressLine2: [''],
            city: [''],
            zip: [''],
            state: [''],
            phone: [''],
            isPolicyAddressSame: [''],
            otheraddressLine1: [''],
            otheraddressLine2: [''],
            othercity: [''],
            otherzip: [''],
            otherstate: ['']
        });
        this.addressForm.get('isPolicyAddressSame').valueChanges.subscribe((value: any) => {
            this.visible = (value == 'N') ? true : false
           if(!this.visible)
           {
            this.otherAddressProps.forEach((addressProps)=>{
                this.addressForm.get(addressProps).patchValue('')
            })
           }
           
          

        })
        this.subscription = this.appService.getStates().subscribe((states) => {
            this.states = states;
            if(this.states.length==0)return;
          
            this._initAddress();
            this._validateField();
          //  if(this.requiredFields.length==0 || this.optionalFields.length==0)
          //  {
          //      const direction=this.insuraceStore.getInsurance()?.currentDirection;
          //      if(direction==PageDirection.NEXT){
          //          this.pq.next();
          //      }
          //      if(direction==PageDirection.BACK){
          //       this.pq.back();
          //   }
          //   return;
          //  }
        })

        this.pq.configQueue(PageQueueOneConfig )
    }
    private _initAddress(){
        
        const insurance=this.insuraceStore.getInsurance();
        const insurances=insurance?.insurances??[];
        this.currentType=insurance?.currentType??'';
        const map = this.insuraceStore.getMapName(this.currentType as string, ADDRESS) as any;
        this.pageActionUtil.initPageMap(map.mapName, map.mapDirection, false);
        this.currentIndex = this.pageActionUtil.currentUserIndex ?? 0;
        const persons=this.insuraceStore.getHouseholdPerson();
        if(persons.length>0)
        {
            const len=persons.length;
            const id=((len==this.currentIndex)?OUTSIDE_HOUSEHOLD_ID:persons[this.currentIndex].id) as string;
            this.currentUserName = id == OUTSIDE_HOUSEHOLD_ID ? this.insuraceStore.getOutOfHouseHoldName(): persons[this.currentIndex].firstName as any
            
            const _insurance=insurances.filter((ins)=>{
                return ins.policyHolderIndividualNumber==id && ins.type==insurance?.currentType;
            })
            if(_insurance.length>0)
            {
                this.addressForm.reset()
                this.addressForm.markAsPristine()
                const address=_insurance[0].insuranceCompany?.address as any;
                const otherAddress=_insurance[0].policyHolderAddress as any ;
               const phoneNumber= _insurance[0].insuranceCompany?.phoneNumber
                const selectedType= _insurance[0].isPolicyAddressSame
                

                if(address!==undefined && address!==null){
                    this.addressProps.forEach((addressProp)=>{
                        this.addressForm.get(addressProp).patchValue(address[addressProp]??'')
                    })
                    if(otherAddress!==undefined &&otherAddress!==null){
                        this.otherAddressProps.forEach((addressProps)=>{
                            this.addressForm.get(addressProps).patchValue(otherAddress[addressProps.replace('other','')])
                        })
                    }
                    
                }
                this.addressForm.get('phone').patchValue(phoneNumber);
                this.addressForm.get('isPolicyAddressSame').patchValue(selectedType);
               
              
            }
           
        }
    }
    next() {
        this.addressForm.markAllAsTouched();
        if (!this.addressForm.valid) return;
        let address = {} as any;
        let otherAddress={} as any;
        const insurance = this.insuraceStore.getInsurance() as InsuranceState;
        if (insurance == null || insurance == undefined) return;
      this.addressProps.forEach((prop)=>{
          address[prop] = this.addressForm.get(prop).value
      }) 
        this.otherAddressProps.forEach((prop,i) => {
            otherAddress[this.addressProps[i]] = this.addressForm.get(prop).value
        }) 
        const addressFormObj={
         address:address,
         policyHolderAddress:otherAddress,
            phoneNumber: this.addressForm.get('phone').value,
            selectedType: this.addressForm.get('isPolicyAddressSame').value
        } as AddressForm
       
        this._savePolicyAddress(insurance, addressFormObj)
        const id=this.pageActionUtil.nextUserId();
        if(id<0)
        {  
            
            this.insuraceStore.storeDirection(PageDirection.NEXT);
            this.pq.next();
            return;
        }
        this.currentIndex=id;
        this._initAddress();
    }
    back() {
        const id=this.pageActionUtil.backUserId();
        if(id<0)
        {
            this.insuraceStore.storeDirection(PageDirection.BACK);
            this.pq.back();

            return;
        }
        this.currentIndex=id;
        this._initAddress();
    }
 
    private _savePolicyAddress(insurance:InsuranceState,addressForm:AddressForm) {

        let insurances = [...insurance?.insurances];
        let _insurance = { ... insurance } as InsuranceState;
        const persons = this.afsStore.getHouseHoldDetails?.houseHoldPersons??[];
        if (persons.length > 0 && insurances.length>0) {

            const id=this.currentIndex==persons.length?OUTSIDE_HOUSEHOLD_ID:persons[this.currentIndex].id as any;
           
            insurances= insurances.map((ins)=>(ins.policyHolderIndividualNumber == id && ins.type == insurance.currentType) ? {
                        ...ins, isPolicyAddressSame:addressForm.selectedType, insuranceCompany: { ...ins.insuranceCompany, address: addressForm.address, phoneNumber: addressForm.phoneNumber},
                        policyHolderAddress: ((addressForm.selectedType == 'N') ? addressForm.policyHolderAddress:null)
                    }:{...ins}
                    ) as Insurances[]
            _insurance.insurances=[...insurances];
            _insurance.currentDirection=PageDirection.NEXT;
            this.insuraceStore.updateInsurance(_insurance);
            
           
        }
    }
    
    ngDestroy() {
        this.subscription.unsubscribe();
    }
    private _validateField()
    {
    let householdBenefits = this.insuraceStore.getBenefits() as string[];
   
    const fields = [{
      fieldName: 'addressLine1',
      optionalProgram: [] as string[],
      requiredProgram:(this.currentType==InsuranceType.Current)?InsuranceConstants.CURRENTPOLICYCOMPANY_COMPANYNAME_PROGRAMS:InsuranceConstants.PRIORPOLICYCOMPANY_COMPANYNAME_PROGRAMS

    }, {
      fieldName: 'addressLine2',
      optionalProgram: [] as string[],
      requiredProgram:(this.currentType==InsuranceType.Current)?InsuranceConstants.CURRENTPOLICYCOMPANY_OTHERCOMAPNY_PROGRAMS:InsuranceConstants.PRIORPOLICYCOMPANY_OTHERCOMAPNY_PROGRAMS

    },
      {
        fieldName: 'city',
        optionalProgram: [] as string[],
        requiredProgram: (this.currentType==InsuranceType.Current)?InsuranceConstants.CURRENTPOLICYCOMPANY_PLOICYNUMBER_PROGRAMS:InsuranceConstants.PRIORPOLICYCOMPANY_PLOICYNUMBER_PROGRAMS

      },
      {
        fieldName: 'state',
        optionalProgram: [] as string[],
        requiredProgram: (this.currentType==InsuranceType.Current)?InsuranceConstants.CURRENTPOLICYCOMPANY_POLICYSTART_PROGRAMS:InsuranceConstants.PRIORPOLICYCOMPANY_POLICYSTART_PROGRAMS

      },
      {
        fieldName: 'zip',
        optionalProgram: [] as string[],
        requiredProgram: (this.currentType==InsuranceType.Current)?InsuranceConstants.CURRENTPOLICYCOMPANY_PREMIUM_PROGRAMS:InsuranceConstants.PRIORPOLICYCOMPANY_PREMIUM_PROGRAMS

      },
      {
        fieldName: 'phone',
        optionalProgram: [] as string[],
        requiredProgram: (this.currentType==InsuranceType.Current)?InsuranceConstants.CURRENTPOLICYCOMPANY_HOWOFTEN_PROGRAMS:InsuranceConstants.PRIORPOLICYCOMPANY_HOWOFTEN_PROGRAMS

      },
      {
        fieldName: 'isPolicyAddressSame',
        optionalProgram: [] as string[],
        requiredProgram: (this.currentType==InsuranceType.Current)?InsuranceConstants.CURRENTPOLICYCOMPANY_GROUPNUMBER_PROGRAMS:InsuranceConstants.PRIORPOLICYCOMPANY_GROUPNUMBER_PROGRAMS

      },
      {
        fieldName: 'otheraddressLine1',
        optionalProgram: [] as string[],
        requiredProgram: (this.currentType==InsuranceType.Current)?InsuranceConstants.CURRENTPOLICYCOMPANY_GROUPNUMBER_PROGRAMS:InsuranceConstants.PRIORPOLICYCOMPANY_GROUPNUMBER_PROGRAMS

      },
      {
        fieldName: 'otheraddressLine2',
        optionalProgram: [] as string[],
        requiredProgram: (this.currentType==InsuranceType.Current)?InsuranceConstants.CURRENTPOLICYCOMPANY_GROUPNUMBER_PROGRAMS:InsuranceConstants.PRIORPOLICYCOMPANY_GROUPNUMBER_PROGRAMS

      },
      {
        fieldName: 'othercity',
        optionalProgram: [] as string[],
        requiredProgram: (this.currentType==InsuranceType.Current)?InsuranceConstants.CURRENTPOLICYCOMPANY_GROUPNUMBER_PROGRAMS:InsuranceConstants.PRIORPOLICYCOMPANY_GROUPNUMBER_PROGRAMS

      },
      {
        fieldName: 'otherzip',
        optionalProgram: [] as string[],
        requiredProgram: (this.currentType==InsuranceType.Current)?InsuranceConstants.CURRENTPOLICYCOMPANY_GROUPNUMBER_PROGRAMS:InsuranceConstants.PRIORPOLICYCOMPANY_GROUPNUMBER_PROGRAMS

      },
      {
        fieldName: 'otherstate',
        optionalProgram: [] as string[],
        requiredProgram: (this.currentType==InsuranceType.Current)?InsuranceConstants.CURRENTPOLICYCOMPANY_GROUPNUMBER_PROGRAMS:InsuranceConstants.PRIORPOLICYCOMPANY_GROUPNUMBER_PROGRAMS

      },
      ] as FormValidatorField[]
    if (householdBenefits != null && householdBenefits.length > 0) {
      const requiredOrOptionalValidatorField =
        {

          selectedPrograms: householdBenefits,
          requiredFields: [],
          formGroup: this.addressForm,
          fields: fields
        } as RequiredOrOptionalValidatorField
      Utility.setOrClearValidatorForFieldWithDifferntPrograms(requiredOrOptionalValidatorField)
      this.addressForm = requiredOrOptionalValidatorField.formGroup;
      this.requiredFields = [...requiredOrOptionalValidatorField.requiredFields] as any;
      this.optionalFields=[...requiredOrOptionalValidatorField.optionalFields] as any;
    }
    
    }
    errorMap(field:string){
       return '';
    }
 
}
interface AddressForm{
    address:IInsuranceAddress,
    phoneNumber:string,
    selectedType:string,
    policyHolderAddress: IInsuranceAddress
}

