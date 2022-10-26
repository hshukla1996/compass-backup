import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RoutePath } from "../../../shared/route-strategies";
import { InsuranceStoreService } from "../model/insurance-store.service";
import { Insurances, InsuranceType } from "../model/insurance.model";

@Component({
    selector: "compass-ui-insurance-main-summary",
    templateUrl: "./insurance-main-summary.component.html",
    styleUrls: ["./insurance-main-summary.component.scss"],
})
export class InsuranceMainSummaryComponent implements OnInit {
    currentInsuranceCount:number=0;
    priorInsuranceCount:number=0;
    employerInsuranceCount:number=0;

    constructor(private insuranceStore:InsuranceStoreService,private router: Router,) {}

    ngOnInit(): void {

        const insurace=this.insuranceStore.getInsurance();
        if(insurace!==null)
        {
            const currentInsurance = insurace?.insurances??[].filter((ins: Insurances)=>{
                return ins.type==InsuranceType.Current
            });
            this.currentInsuranceCount=(currentInsurance.length>0)?currentInsurance.length:0;
            const priorInsurace = insurace?.insurances ?? [].filter((ins: Insurances) => {
                return ins.type == InsuranceType.PRIOR
            });
            this.priorInsuranceCount = (priorInsurace.length > 0) ? priorInsurace.length : 0;
            const empInsurance=insurace?.employerOfferedInsurances??[];
            this.employerInsuranceCount=empInsurance?.length>0?empInsurance?.length:0;
        }

    }
    navigateToInsuranceSituation(){
        this.router.navigate(
            [
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_INSURANCE +
                    "/" +
                    RoutePath.APPLYNOW_INSURANCE_INSURANCE_GATEPOST,
            ]
        );
    }
    navigateToCurrentInsurance(){
        let insurance={...this.insuranceStore.getInsurance()}
        insurance.currentType=InsuranceType.Current;
        this.insuranceStore.updateInsurance(insurance);
        this.router.navigate(
            [
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_INSURANCE +
                    "/" +
                    RoutePath.APPLYNOW_INSURANCE_CURRENTPOLICYHOLDER,
            ]
        );
    }
    navigateToPriorInsurance(){
        let insurance = { ...this.insuranceStore.getInsurance() }
        insurance.currentType = InsuranceType.PRIOR;
        this.insuranceStore.updateInsurance(insurance);
        this.router.navigate(
            [
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_INSURANCE +
                    "/" +
                    RoutePath.APPLYNOW_INSURANCE_PRIORPOLICY_HOLDER,
            ]
        );
    }
    navigateToEmployerOfferedSituation(){
        this.router.navigate(
            [
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_INSURANCE +
                    "/" +
                    RoutePath.APPLYNOW_INSURANCE_EMPLOYER_OFFEREDINSURANCE_GATEPOST,
            ]
        );

    }
    navigateToEmployerOfferedIsurance(){
        let insurance = { ...this.insuranceStore.getInsurance() }
        insurance.currentType = InsuranceType.EMOPLOYEROFFERED;
        this.insuranceStore.updateInsurance(insurance);
        this.router.navigate(
            [
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_INSURANCE +
                    "/" +
                    RoutePath.APPLYNOW_INSURANCE_EMPLOYER_POLICY_HOLDER,
            ]
        );
    }
    next(){
        this.router.navigate(
            [
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_INSURANCE +
                    "/" +
                    RoutePath.APPLYNOW_INSURANCE_INSURANCEENDING,
            ]
        );
        
    }
    back(){
//navigate to
        let insurance = { ...this.insuranceStore.getInsurance() }
        const type=insurance.currentType;
        let path='';
        switch(type)
        {
            case InsuranceType.Current:
            case InsuranceType.PRIOR:
            case InsuranceType.EMOPLOYEROFFERED:
                path=RoutePath.APPLYNOW_INSURANCE_INSURANCESUMMARY;
                break; 
            default:
                path=RoutePath.APPLYNOW_INSURANCE_EMPLOYER_OFFEREDINSURANCE_GATEPOST;
                break;
        }
        this.router.navigate(
            [
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_INSURANCE +
                    "/" +
                    path,
            ]
        );
       
       
    }



}
