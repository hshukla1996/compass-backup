import { Component, OnInit } from "@angular/core";
import { AppStoreService } from "apps/intake/src/app/app-store-service";
import { de } from "date-fns/locale";
import { Observable,forkJoin, from, combineLatest, zip, of, map, withLatestFrom } from "rxjs";

@Component({
    selector: "compass-ui-employer-policy-additional-detail",
    templateUrl: "./employer-policy-additional-detail.component.html",
    styleUrls: ["./employer-policy-additional-detail.component.scss"],
})
export class EmployerPolicyAdditionalDetailComponent implements OnInit {
    employeePaidPremium=[] as any[]
    employerChangePolicy=[] as any[]
    constructor(private appStore:AppStoreService) {

    }

    ngOnInit(): void {
        //this.pq.setCurrentQueue(PageQueueName.GATEPOSTTWO)
       const _premium=this.appStore.getEmployerPaidPremiumPolicy()
       const _change=this.appStore.getEmployerEmployerChangePolicy();
       zip([_premium,_change]).subscribe(([premium,change])=>{
        this.employeePaidPremium=premium;
        this.employerChangePolicy=change;
        if(this.employeePaidPremium.length>0 || this.employerChangePolicy.length>0)
        {

            
        }
       })
     
        

          if(this.employeePaidPremium.length==0 || this.employerChangePolicy.length==0)
        {
            this.appStore.dispatchEmployerChangePolicy();
            this.appStore.dispatchEmployerPaidPremiumPolicy();
        }

    }
    _init(){
        
    }
}
