import { Component, OnInit } from "@angular/core";
import { PageQueueService } from "apps/intake/src/app/shared/services/page-queue.service";
import { RoutePath } from "apps/intake/src/app/shared/route-strategies";
import { ApplyNowPageActions } from "../../../+state/actions";
import { Programs, PageQueueName } from "../../../+state/apply-now.models";
import { CURREENT_INSURANCE_GATEPOST_VALUE, PRIOR_INSURANCE_GATEPOST_VALUE, INSURANCE_GATEPOST_ONE_DEFAULT_PATH, InsuranceGatePostOneGetObject, EMPLOYER_CHILDREN_INSURANCE_GATEPOST_VALUE, EMPLOYER_INSURANCE_GATEPOST_VALUE, InsuranceGatePostTwoGetObject, PageQueueTWOConfig } from "../../model/insurance-page-queue.util";
import { InsuranceStoreService } from "../../model/insurance-store.service";
import { InsuranceState } from "../../model/insurance.model";
import { INSURANCE_GATEPOST_TWO } from "../gatepost.data";
import { Utility } from "apps/intake/src/app/shared/utilities/Utility";

@Component({
    selector: "compass-ui-employer-offered-insurance-gatepost",
    templateUrl: "./employer-offered-insurance-gatepost.component.html",
    styleUrls: ["./employer-offered-insurance-gatepost.component.scss"],
})
export class EmployerOfferedInsuranceGatepostComponent implements OnInit {
    selectedPaths = [] as string[]
    gatepostData = { ...INSURANCE_GATEPOST_TWO }
    constructor(private pq: PageQueueService, private store: InsuranceStoreService) { }

    ngOnInit(): void {
        this._initData();
    }
    private _initData() {


      
        let insurance = { ...this.store.getInsurance() } as InsuranceState
       let isExist=false;
        this.gatepostData.questionAnswers.forEach((ques, i) => {
          
            switch (ques.value) {
                case EMPLOYER_INSURANCE_GATEPOST_VALUE:
                    isExist = this.areProgramExist([Programs.HC, Programs.HA, Programs.MAR, Programs.MCR, Programs.CA, Programs.CAR, Programs.CHR, Programs.FP, Programs.FPR] as string[])
                    this.gatepostData.questionAnswers[i].isYesChecked = insurance.hasMemberCanGetInsuranceThroughJob == 'Y' ? true : false
                    this.gatepostData.questionAnswers[i].isNoChecked = insurance.hasMemberCanGetInsuranceThroughJob == 'N' ? true : false
                   
                    
                    break;
                case EMPLOYER_CHILDREN_INSURANCE_GATEPOST_VALUE:
                    isExist = this.areProgramExist([Programs.HC,  Programs.MCR, Programs.CA, Programs.CAR, Programs.CHR] as string[])
                    this.gatepostData.questionAnswers[i].isYesChecked = insurance?.healthInsuranceForChildrenFromWork?.code == 'Y' ? true : false
                    this.gatepostData.questionAnswers[i].isNoChecked = insurance?.healthInsuranceForChildrenFromWork?.code == 'N' ? true : false

                    break;
                    
                    
            }
            if (isExist) {
                this.gatepostData.questionAnswers[i].isRequired = isExist;
                this.gatepostData.questionAnswers[i].show = true;
            }
        })

    }
    private areProgramExist(conditionalPrograms:string[]) {
        const benefits = this.store.getBenefits();
        return this.store.areProgramsExist(benefits, conditionalPrograms);
    }
    showNextPage(selectedItems: any) {
        debugger
        let selectedValues = [] as string[]
        let hasMemberCanGetInsuranceThroughJob = '';
        let isHealthInsuranceForChildrenFromWork = '';
        selectedItems.questionAnswers.forEach((item: any) => {
            if (item.isYesChecked) {
                selectedValues.push(item.value)
            }
            switch (item.value) {
                case EMPLOYER_INSURANCE_GATEPOST_VALUE:
                    hasMemberCanGetInsuranceThroughJob = (item.isYesChecked) ? 'Y' : (item.isNoChecked) ? 'N' : ''
                    break;
                case EMPLOYER_CHILDREN_INSURANCE_GATEPOST_VALUE:
                    isHealthInsuranceForChildrenFromWork = (item.isYesChecked) ? 'Y' : (item.isNoChecked) ? 'N' : ''
                    break;
            }

        });
        let insurance = { ...this.store.getInsurance() }
        if (insurance !== null) {
            insurance.hasMemberCanGetInsuranceThroughJob = hasMemberCanGetInsuranceThroughJob
            insurance.healthInsuranceForChildrenFromWork = { code: isHealthInsuranceForChildrenFromWork,individualNumbers:[]} 
            this.store.updateInsurance(insurance);
        }
       
        
        this.pq.configQueue({
            ...PageQueueTWOConfig,
            selectedPath: selectedValues as any[]
        })
        this.pq.gotoFirstPage();
    }
    showPreviousPage() {
        this.pq.back();
    }
    _getAge(userId:any){
        const persons=this.store.getHouseholdPerson();
        const person=persons.filter((per)=>{
            return per.id==parseInt(userId);
        })
        if(person.length>0){
            return Utility.getAge(person[0].dateOfBirth)
        }
       return 0;
    }
}
