import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, RequiredValidator, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { AppStoreService } from "apps/intake/src/app/app-store-service";
import { PageActionUtil } from "apps/intake/src/app/shared/services/page-action-util.service";
import { PageQueueService } from "apps/intake/src/app/shared/services/page-queue.service";
import { FormValidatorField, RequiredOrOptionalValidatorField, Utility } from "apps/intake/src/app/shared/utilities/Utility";
import { zip } from "rxjs";
import { PageQueueName, Programs } from "../../../+state/apply-now.models";
import { PageDirection } from "../../../household/household-model";
import * as InsuranceConstants from "../../model/insurance-constants";
import { PageQueueOneConfig } from "../../model/insurance-page-queue.util";
import { InsuranceStoreService } from "../../model/insurance-store.service";
import { InsuranceCompany, Insurances, InsuranceType } from "../../model/insurance.model";

@Component({
    selector: "compass-ui-current-insurance-comapny",
    templateUrl: "./current-insurance-comapny.component.html",
    styleUrls: ["./current-insurance-comapny.component.scss"],
})
export class CurrentInsuranceComapnyComponent implements OnInit {
    inusranceCompanyForm: FormGroup | any
    howOftenPremiumPaid = [] as any[]
    companyNames = [] as any[];
    visible = false as boolean
    currentIndex = 0 as any
    currentUserName = '' as string

    optionalFields=[] as string[]
    requiredFields=[] as string[]
    currentType='' as string
    groupNumberTooltip=false as boolean
    policyTooltip=false as boolean
    constructor(private fb: FormBuilder, private appStore: AppStoreService, private insuranceStore: InsuranceStoreService,
        private pq:PageQueueService, private pageActionUtil: PageActionUtil) {
        this.inusranceCompanyForm = this.fb.group({
            insuranceCompanyName: ['', ],
            otherInsuranceCompanyName: ['',],
            policyNumber: ['', ],
            policyStartDate: ['',],
            premiumAmount: ['',],
            howOftenThePremiumIsPaid: [''],
            groupNumber: ['']
        });

    }


    ngOnInit(): void {
        debugger
        const _pay = this.appStore.getPay();
        const _companyNames = this.appStore.getComapanyNames()
        this.pq.configQueue(PageQueueOneConfig)
        let insurance = { ...this.insuranceStore.getInsurance() };
        let insurances = insurance?.insurances ?? [];
        const map = this.insuranceStore.getMapName(insurance?.currentType ?? '', InsuranceConstants.POLICY_COMPANY) as any;
        this.pageActionUtil.initPageMap(map.mapName, map.mapDirection, false);
        this.currentIndex = this.pageActionUtil.currentUserIndex ?? 0;
        zip([_pay, _companyNames]).subscribe(([premium, companyNames]) => {

            this.howOftenPremiumPaid = premium;
            this.companyNames = companyNames;
            if (this.companyNames.length > 0 || this.howOftenPremiumPaid.length > 0) 
            {
                this._init();
                this._validateField();
                // if(this.requiredFields.length==0 || this.optionalFields.length==0)
                // {
                //     const currentDirection=this.insuranceStore.getInsurance()?.currentDirection??''
                //     if(currentDirection=='')return;
                //     currentDirection==PageDirection.NEXT?this.pq.next():this.pq.back()
                //      return;
                   
                // }
              
            }
           
        })
        if (this.companyNames.length == 0 || this.howOftenPremiumPaid.length == 0) {
            this.appStore.dispatchPay();
            this.appStore.dispatchComapnyNames();

        }
        this.inusranceCompanyForm.get('insuranceCompanyName').valueChanges.subscribe((val: any) => {

            this.visible = false;
            if (val == '98') {
                this.visible = true;
                this.inusranceCompanyForm.get('otherInsuranceCompanyName').setValidators(Validators.required);
            }
            else {

                this.inusranceCompanyForm.get('otherInsuranceCompanyName').setValidators(Validators.nullValidator);
                this.inusranceCompanyForm.get('otherInsuranceCompanyName').patchValue('')
            }
        })

    }

    back() {
        const id = this.pageActionUtil.backUserId();
        if (id < 0) {
            this.insuranceStore.storeDirection(PageDirection.BACK)
            this.pq.back();
            return;
        }
        this.currentIndex = id;
        this._init();

    }
    next() {
        debugger
        this.inusranceCompanyForm.markAllAsTouched();;
        if (!this.inusranceCompanyForm.valid) return;
        let insurance = { ...this.insuranceStore.getInsurance() };
        let insurances = [...insurance?.insurances ?? []] as Insurances[];
        const persons = this.insuranceStore.getHouseholdPerson();
        if (persons.length > 0 && insurances.length > 0) {
            const id = this.currentIndex==persons.length?InsuranceConstants.OUTSIDE_HOUSEHOLD_ID:  persons[this.currentIndex].id;
          
            const insuranceCompany = {
                insuranceCompanyName: this.inusranceCompanyForm.get('insuranceCompanyName').value,
                otherInsuranceCompanyName: this.inusranceCompanyForm.get('otherInsuranceCompanyName').value,

            };
            const policyNumber = this.inusranceCompanyForm.get('policyNumber').value
            const policyStartDate = this.inusranceCompanyForm.get('policyStartDate').value
            const premiumAmount = this.inusranceCompanyForm.get('premiumAmount').value
            const howOftenThePremiumIsPaid = this.inusranceCompanyForm.get('howOftenThePremiumIsPaid').value
            const groupNumber = this.inusranceCompanyForm.get('groupNumber').value
            insurances = insurances.map((item: Insurances) => (parseInt(item.policyHolderIndividualNumber) == id) ? {
                ...item, insuranceCompany: { ...item.insuranceCompany, ...insuranceCompany },
                groupNumber: groupNumber, policyNumber: policyNumber, premiumAmount: premiumAmount, policyStartDate: policyStartDate, howOftenThePremiumIsPaid: howOftenThePremiumIsPaid
            } : { ...item }) as Insurances[];
            insurance.currentType = InsuranceType.Current;
            insurance.insurances = [...insurances]
            this.insuranceStore.updateInsurance(insurance)

        }
        const id = this.pageActionUtil.nextUserId();
        if (id < 0) {
            this.insuranceStore.storeDirection(PageDirection.NEXT)
            this.pq.next();
            return;
        }
        this.currentIndex = id;
        this._init();
    }
    ngDestroy() {
        //end subscription
    }
    private _init() {
        this.inusranceCompanyForm.reset();
        this.inusranceCompanyForm.markAsPristine()
        let insurance = { ...this.insuranceStore.getInsurance() };
        let insurances = insurance?.insurances ?? [];
        const map = this.insuranceStore.getMapName(insurance?.currentType ?? '', InsuranceConstants.POLICY_COMPANY) as any;
        this.pageActionUtil.initPageMap(map.mapName, map.mapDirection, false);
        this.currentIndex = this.pageActionUtil.currentUserIndex ?? 0;
        const persons = this.insuranceStore.getHouseholdPerson();
        const id =this.currentIndex==persons.length?InsuranceConstants.OUTSIDE_HOUSEHOLD_ID: persons[this.currentIndex].id;
        this.currentUserName =id==InsuranceConstants.OUTSIDE_HOUSEHOLD_ID?this.insuranceStore.getOutOfHouseHoldName()??'': persons[this.currentIndex]?.firstName ?? ''
        insurances = insurances.filter((ins) => {
            return ins.policyHolderIndividualNumber == id && ins.type==insurance.currentType;
        })
        if (insurances.length > 0) {
            debugger
            const insCompany = insurances[0].insuranceCompany;
            const companyName=insCompany?.insuranceCompanyName;
            this.inusranceCompanyForm.get('insuranceCompanyName').patchValue(companyName)
            this.inusranceCompanyForm.get('otherInsuranceCompanyName').patchValue(insCompany?.otherInsuranceCompanyName),
            this.inusranceCompanyForm.get('policyNumber').patchValue(insurances[0].policyNumber)
            this.inusranceCompanyForm.get('policyStartDate').patchValue(insurances[0].policyStartDate)
            this.inusranceCompanyForm.get('premiumAmount').patchValue(insurances[0].premiumAmount)
            this.inusranceCompanyForm.get('howOftenThePremiumIsPaid').patchValue(insurances[0].howOftenThePremiumIsPaid)
            this.inusranceCompanyForm.get('groupNumber').patchValue(insurances[0].groupNumber)
        }
this.policyTooltip=false;
this.groupNumberTooltip=false;
    }
    private _validateField()
    {
        debugger
    let householdBenefits = this.insuranceStore.getBenefits() as string[];
    const fields = [{
      fieldName: 'insuranceCompanyName',
      optionalProgram:[Programs.HA] as string[],
      requiredProgram:(this.currentType==InsuranceType.Current)?[Programs.HA]:[Programs.HA]

    }, {
      fieldName: 'otherInsuranceCompanyName',
      optionalProgram: [Programs.HA] as string[],
      requiredProgram:(this.currentType==InsuranceType.Current)?[Programs.HA]:[Programs.HA]

    },
      {
        fieldName: 'policyNumber',
        optionalProgram: [Programs.HA] as string[],
        requiredProgram: (this.currentType==InsuranceType.Current)?[Programs.HA]:[Programs.HA]
      },
      {
        fieldName: 'policyStartDate',
        optionalProgram: [Programs.HA] as string[],
        requiredProgram: (this.currentType==InsuranceType.Current)?[]:[]

      },
      {
        fieldName: 'premiumAmount',
        optionalProgram: [Programs.HA] as string[],
        requiredProgram: (this.currentType==InsuranceType.Current)?[]:[]

      },
      {
        fieldName: 'howOftenThePremiumIsPaid',
        optionalProgram: [Programs.HA] as string[],
        requiredProgram: (this.currentType==InsuranceType.Current)?[]:[]

      },
      {
        fieldName: 'groupNumber',
        optionalProgram: [Programs.HA] as string[],
        requiredProgram: (this.currentType==InsuranceType.Current)?[]:[]

      },
      ] as FormValidatorField[]
    if (householdBenefits != null && householdBenefits.length > 0) {
      const requiredOrOptionalValidatorField =
        {

          selectedPrograms: householdBenefits,
          requiredFields: [],
          formGroup: this.inusranceCompanyForm,
          fields: fields
        } as RequiredOrOptionalValidatorField
      Utility.setOrClearValidatorForFieldWithDifferntPrograms(requiredOrOptionalValidatorField)
      this.inusranceCompanyForm = requiredOrOptionalValidatorField.formGroup;
      this.requiredFields = [...requiredOrOptionalValidatorField.requiredFields] as any;
      this.optionalFields=[...requiredOrOptionalValidatorField.optionalFields] as any;
    }
    
    }
    

    
}
