import { Component, OnInit } from "@angular/core";
import { RoutePath } from "apps/intake/src/app/shared/route-strategies";
import { ApplyNowPageActions } from "../../../+state/actions";
import { PageQueueName, Programs } from "../../../+state/apply-now.models";
import { CURREENT_INSURANCE_GATEPOST_VALUE, InsuranceGatePostOneGetObject, INSURANCE_GATEPOST_ONE_DEFAULT_PATH, PRIOR_INSURANCE_GATEPOST_VALUE } from "../../model/insurance-page-queue.util";

import { INSURANCE_GATEPOST_ONE, INSURANCE_GATEPOST_TWO } from "../gatepost.data";
import { InsuranceStoreService } from "../../model/insurance-store.service";
import { isNgTemplate } from "@angular/compiler";
import { PageQueueService } from "apps/intake/src/app/shared/services/page-queue.service";

@Component({
    selector: "compass-ui-insurance-gatepost",
    templateUrl: "./insurance-gatepost.component.html",
    styleUrls: ["./insurance-gatepost.component.scss"],
})
export class InsuranceGatepostComponent implements OnInit {
    selectedPaths=[] as string[]
    gatepostData = { ...INSURANCE_GATEPOST_ONE}
    constructor(private pq: PageQueueService, private store: InsuranceStoreService) {}

    ngOnInit(): void {
        this._initData();
    }
    private _initData(){

      
        const areProgramExist=this.areProgramExist();
        let insurance = { ...this.store.getInsurance() }
        this.gatepostData.questionAnswers.forEach((ques,i)=>{
            this.gatepostData.questionAnswers[i].isRequired = areProgramExist;
            this.gatepostData.questionAnswers[i].show=true; 
            switch (ques.value) {
                case CURREENT_INSURANCE_GATEPOST_VALUE:
                    this.gatepostData.questionAnswers[i].isYesChecked = insurance.doesAnyoneHaveHealthInsurance=='Y'?true:false
                    this.gatepostData.questionAnswers[i].isNoChecked = insurance.doesAnyoneHaveHealthInsurance == 'N' ? true : false
                    break;
                case PRIOR_INSURANCE_GATEPOST_VALUE:
                    this.gatepostData.questionAnswers[i].isYesChecked = insurance.didAnyoneApplyingForHaveHealthInsuranceInLast90Days == 'Y' ? true : false
                    this.gatepostData.questionAnswers[i].isNoChecked = insurance.didAnyoneApplyingForHaveHealthInsuranceInLast90Days == 'N' ? true : false
                    break;
                    ;
            }
        })

    }
    private areProgramExist(){
        const benefits = this.store.getBenefits();
        return this.store.areProgramsExist(benefits, [Programs.HC, Programs.HA, Programs.MAR, Programs.MCR, Programs.CHR, Programs.ABR, Programs.CA, Programs.CAR, Programs.LN, Programs.LNR, Programs.LIR, Programs.FP, Programs.FPR, Programs.WN, Programs.WNR, Programs.WAR]);
    }
    showNextPage(selectedItems: any) {
        let selectedValues = [] as string[]
        let doesAnyoneHaveHealthInsurance = '';
        let didAnyoneApplyingForHaveHealthInsuranceInLast90Days = '';
        selectedItems.questionAnswers.forEach((item: any) => {
            if (item.isYesChecked) {
                selectedValues.push(item.value)
            }
            switch (item.value) {
                case CURREENT_INSURANCE_GATEPOST_VALUE:
                    doesAnyoneHaveHealthInsurance = (item.isYesChecked) ? 'Y' : (item.isNoChecked) ? 'N' : ''
                    break;
                case PRIOR_INSURANCE_GATEPOST_VALUE:
                    didAnyoneApplyingForHaveHealthInsuranceInLast90Days = (item.isYesChecked) ? 'Y' : (item.isNoChecked) ? 'N' : ''
                    break;
            }

        });
        let insurance={...this.store.getInsurance()}
        if(insurance!==null)
        {
            insurance.doesAnyoneHaveHealthInsurance = doesAnyoneHaveHealthInsurance
            insurance.didAnyoneApplyingForHaveHealthInsuranceInLast90Days = didAnyoneApplyingForHaveHealthInsuranceInLast90Days
            this.store.updateInsurance(insurance);
        }
        debugger
        this.pq.configGatePostQueue({
            defaultPath: INSURANCE_GATEPOST_ONE_DEFAULT_PATH, pageQueueName: PageQueueName.GATEPOSTONE, actionName: ApplyNowPageActions.updatePageQueueData,
            gateWaypathName: `insurance/${RoutePath.APPLYNOW_INSURANCE_INSURANCE_GATEPOST}`,
            currentModule: RoutePath.APPLYNOW,
            getPathNameFunction: InsuranceGatePostOneGetObject,
            reducerObjectType: 'applyNow',
            lastPath: `insurance/${RoutePath.APPLYNOW_INSURANCE_EMPLOYER_OFFEREDINSURANCE_GATEPOST}`,
            selectedPath: selectedValues as any[]
        })
        this.pq.gotoFirstPage();
    }
    showPreviousPage()
    {

    }
}
