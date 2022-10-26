import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStoreService } from '../+state/store-service/app-store.service';
import { ChangeReportStoreService } from '../+state/store-service/change-report-store.service';
import { MyBenefitsStoreService } from '../+state/store-service/my-benefits-store.service';
import { MenuItemState } from '../shared/menu-item-state';
import { RoutePath } from '../shared/route-strategies';
import { DashboardStrategy } from '../shared/route-strategies/Dashboard/dashboard';
import { MyBenefitsService } from '../shared/services/my-benefits/my-benefits.service';

@Component({
  selector: 'compass-ui-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardStrategy],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  noBenefits=false; 
  showLinkCaseButton= false;
  myBenefitsData:any;
  showViewBenefitsButton=false;
  longinresponse:any;
  myBenefitsState:any;
  isLoading = true;
  loadingText = "Loading..."

  constructor(private routingStratagy: DashboardStrategy, private cd: ChangeDetectorRef,
    private route: Router, private mybenefitstore: MyBenefitsStoreService, private myBenefitsService: MyBenefitsService,private service: ChangeReportStoreService, private appService: AppStoreService) { }

  ngOnInit(): void {

    // this.service.formStateUpdated(this.routePath.REFERRALS_BASICDETAILS, MenuItemState.INPROGRESS);
    this.service.updateAddress()
    this.service.getAddress()
    this.appService.menuStateUpdated(RoutePath.DASHBOARD, MenuItemState.INPROGRESS)
    const data = localStorage.getItem('user_info') as string
    this.longinresponse = JSON.parse(data);
    console.log(this.longinresponse, "User Info not in if and else")

    // if (this.longinresponse !== null && this.longinresponse !== "" && this.longinresponse !== undefined){
     
    //     if (this.longinresponse?.countyCaseRecord && this.longinresponse.countyCaseRecord !== "" && this.longinresponse.recipientID && this.longinresponse.recipientID !== "") {
    //       this.myBenefitsService.getBenefits().subscribe((data: any) => {
    //         console.log("INSIDE the Case Information call") 
    //         // this.showViewBenefitsButton = true 
    //         this.myBenefitsData = data;

    //         console.log(this.showViewBenefitsButton, "this.showViewBenefitsButton") 
    //         if (this.myBenefitsData?.faultResponse?.code == "1022") {
    //           this.noBenefits = true;
    //           this.cd.detectChanges();  

    //         } else if (this.myBenefitsData !== null && this.myBenefitsData?.faultResponse?.code == "" || this.myBenefitsData?.faultResponse?.code == undefined ){ 
    //           this.myBenefitsData = data;
    //           this.showViewBenefitsButton = true 
    //           this.cd.detectChanges();  

    //         }  
    //       })

    //     } else if (!this.longinresponse?.countyCaseRecord && !this.longinresponse?.recipientID) {  
    //        this.showLinkCaseButton = true

    //     }

    //     this.cd.detectChanges(); 
    // }
}
viewBenefitDetails(){
  const viewBenefits = this.myBenefitsData;
  this.mybenefitstore.updateMyBenefits(viewBenefits);
  this.route.navigate([RoutePath.MYBENEFIT]); 
}
ngOnDestroy(){ 
  this.appService.menuStateUpdated(RoutePath.DASHBOARD,MenuItemState.COMPLETED)
}

linkYourCase(){
  this.route.navigate([RoutePath.LINK_CASE_SELECTION ]);
}

}
