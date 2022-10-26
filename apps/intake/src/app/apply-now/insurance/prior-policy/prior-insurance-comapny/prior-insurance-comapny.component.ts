import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppStoreService } from "apps/intake/src/app/app-store-service";
import { PageActionUtil } from "apps/intake/src/app/shared/services/page-action-util.service";
import { PageQueueService } from "apps/intake/src/app/shared/services/page-queue.service";
import { IHouseHold, PageDirection } from "../../../household/household-model";
import { OUTSIDE_HOUSEHOLD_ID } from "../../model/insurance-constants";
import { PageQueueOneConfig } from "../../model/insurance-page-queue.util";

import { InsuranceStoreService } from "../../model/insurance-store.service";
import { InsuranceCompany, Insurances, InsuranceType } from "../../model/insurance.model";

@Component({
    selector: "compass-ui-prior-insurance-comapny",
    templateUrl: "./prior-insurance-comapny.component.html",
    styleUrls: ["./prior-insurance-comapny.component.scss"],
})
export class PriorInsuranceComapnyComponent implements OnInit {
    inusranceCompanyForm: FormGroup | any
    howOftenPremiumPaid = [] as any[]
    householdPersons = [] as IHouseHold[]
    currentIndex = 0 as number;
    currentType = "" as string
    currentUserName='' as string
    id!: any
    filer_insurances = [] as Insurances[]
    constructor(private fb: FormBuilder,
        private insuranceStore: InsuranceStoreService,
        private pageActionUtil: PageActionUtil,
        private pq:PageQueueService) {
        this.inusranceCompanyForm = this.fb.group({
            insuranceCompanyName: ['', [,]],
            groupNumber: [''],
            policyNumber: ['', [,]],

        });


    }


    ngOnInit(): void {
        this.pq.configQueue(PageQueueOneConfig )
        this._init();
    }
    private _init() {
        this.inusranceCompanyForm.reset();
        const insurance = this.insuranceStore.getInsurance();
        const insurances = insurance?.insurances;
        this.currentType = insurance?.currentType ?? '';
        this.householdPersons = this.insuranceStore.getHouseholdPerson();
        this.currentIndex = this.pageActionUtil.currentUserIndex ?? 0;
        this.id =this.currentIndex==this.householdPersons.length?OUTSIDE_HOUSEHOLD_ID: this.householdPersons[this.currentIndex].id;
        this.currentUserName = this.id == OUTSIDE_HOUSEHOLD_ID ? this.insuranceStore.getOutOfHouseHoldName(): this.householdPersons[this.currentIndex].firstName as any
        this.filer_insurances = insurances?.filter((ins) => {
            return parseInt(ins.policyHolderIndividualNumber) == this.id && ins.type==InsuranceType.PRIOR;
        }) as Insurances[]
        if (this.filer_insurances?.length > 0) {
            let comapny = this.filer_insurances[0].insuranceCompany;
            this._patchValues(comapny?.insuranceCompanyName ?? '', this.filer_insurances[0]?.policyNumber ?? '', this.filer_insurances[0]?.groupNumber ?? '')
            this.inusranceCompanyForm.markAsPristine();
        }
    }
    private _patchValues(companyName: string, policyNumber: string, groupNumber: string) {
        this.inusranceCompanyForm.get('insuranceCompanyName').patchValue(companyName)
        this.inusranceCompanyForm.get('groupNumber').patchValue(groupNumber)
        this.inusranceCompanyForm.get('policyNumber').patchValue(policyNumber)
    }
    private _getValues() {
        let obj = {} as any;
        obj['insuranceCompanyName'] = this.inusranceCompanyForm.get('insuranceCompanyName').value;
        obj['groupNumber'] = this.inusranceCompanyForm.get('groupNumber').value
        obj['policyNumber'] = this.inusranceCompanyForm.get('policyNumber').value;
        return obj;
    }
    next() {
        this.inusranceCompanyForm.markAllAsTouched();
        if (!this.inusranceCompanyForm.valid) return;
        let insurance = { ...this.insuranceStore.getInsurance() };
        let insurances = [...insurance?.insurances ?? []];
        const formValues = { ...this._getValues() }
        insurances = insurances.map((ins) => (ins.policyHolderIndividualNumber == this.id && ins.type==InsuranceType.PRIOR) ? {
            ...ins,
            groupNumber: formValues['groupNumber'],
            policyNumber: formValues['policyNumber'],
            insuranceCompany: { ...ins.insuranceCompany, insuranceCompanyName: formValues['insuranceCompanyName'] }
        } : { ...ins }) as Insurances[]
        insurance.insurances = [...insurances]
        this.insuranceStore.updateInsurance(insurance)
        const id = this.pageActionUtil.nextUserId();
        if (id < 0) {
            this.insuranceStore.storeDirection(PageDirection.NEXT)
            this.pq.next();
            return;
        }
        this.currentIndex = id;
        this._init();

    }
    back() {
        const id = this.pageActionUtil.backUserId();
        if (id < 0) {
            this.insuranceStore.storeDirection(PageDirection.BACK)
            return;
        }
        this.currentIndex = id;
        this._init();
    }
}
