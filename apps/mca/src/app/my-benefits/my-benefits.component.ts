import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { RoutePath } from '../shared/route-strategies';
import { myBenefitsData } from '../../data/my-benefits';
import { loadCounties } from '../+state/ref-data/ref-data.actions';
import { AppState } from '../+state';
import { select, Store } from '@ngrx/store';
import { Post } from '../+state/models/post.model';

import { MyBenefitsService } from '../shared/services/my-benefits/my-benefits.service'; 
import { MyBenefits } from '../+state/models/my-benefits/my-benefits.model';
import { MyBenefitsStoreService } from '../+state/store-service/my-benefits-store.service';
import { getCounties } from '../+state/selectors/ref-data.selectors';
import { RefDataStoreService } from '../+state/store-service/ref-data-store.service';
@Component({
  selector: 'compass-ui-my-benefits',
  templateUrl: './my-benefits.component.html',
  styleUrls: ['./my-benefits.component.scss']
})
export class MyBenefitsComponent implements OnInit {
  routePath: typeof RoutePath = RoutePath;
  route: string | undefined = RoutePath.MYBENEFIT;
  myBenefitsState: MyBenefits | undefined; 
  caseNumbers: any
  pillExpand = false
  selectedCase = 0
  NaN!:number
  backTobenefits = RoutePath.DASHBOARD 
  progCardExpand: any[] = [];
  healthcareExpand: any[] = [];
  foodstampsExpand: any[] = [];
  liheapExpand: any[] = [];
  liwhapExpand: any[] = [];
  subscription = new Subscription();
  myBenefitsData: any;
  mycaseInformation: any;
  firstuser=0;
  // myBenefitsInformation = myBenefitsData.
  counties!: any[];
  constructor(private refService: RefDataStoreService, private store: Store<AppState>, private service: MyBenefitsStoreService, private cd: ChangeDetectorRef, private myBenefitsService: MyBenefitsService) { }

swapcaseInformation(item:number){
  const caseInformation = this.myBenefitsData.casesInformationDetail;
  caseInformation[0] = this.myBenefitsData.casesInformationDetail[item];
  caseInformation[item] = this.myBenefitsData.casesInformationDetail[0];
}

  updateSelected(item: any) {
    this.pillExpand = false

    this.mycaseInformation = this.myBenefitsData.casesInformationDetail;
    let tempCase: any;  
    tempCase = this.myBenefitsData.casesInformationDetail[0]; 
    // this.mycaseInformation = this.mycaseInformation.map((item:any, index:any) => {
    //   (index == 0) ? { ...item, ...this.myBenefitsData.casesInformationDetail[item] } : { ...item }
    // }) 
    this.mycaseInformation[0] = {...this.myBenefitsData.casesInformationDetail[item]};
    this.mycaseInformation[item] = tempCase 
    this.firstuser = item
    this.selectedCase = item
    this.cd.detectChanges();
  }

  showCA(){
    let isCA= false;
    this.caseNumbers[0].benefitsInformation.forEach((benefit: { categoryCode: string; })=>{
      if (benefit.categoryCode == 'CA'){
        isCA = true;
      }
    })
    return isCA
  }
  showFoodStamps() {
    let isFS = false;
    this.caseNumbers[0].benefitsInformation.forEach((benefit: { categoryCode: string; }) => {
      if (benefit.categoryCode == 'FS') {
        isFS = true;
      }
    })
    return isFS
  }
  showLH(){
    let isLH = false;
    this.caseNumbers[0].benefitsInformation.forEach((benefit: { categoryCode: string; }) => {
      if (benefit.categoryCode == 'LH') {
        isLH = true;
      }
    })
    return isLH 
  }
  showLW(){
    let isLW = false;
    this.caseNumbers[0].benefitsInformation.forEach((benefit: { categoryCode: string; }) => {
      if (benefit.categoryCode == 'LW') {
        isLW = true;
      }
    })
    return isLW 
  }
  showChip(){
    let isCHIP = false;
    this.caseNumbers[0].benefitsInformation.forEach((benefit: { categoryCode: string; }) => {
      if (benefit.categoryCode == 'CHIP') {
        isCHIP = true;
      }
    })
    return isCHIP
  }
  showMA(){
    let isMA = false;
    this.caseNumbers[0].benefitsInformation.forEach((benefit: { categoryCode: string; }) => {
      if (benefit.categoryCode == 'MA') {
        isMA = true;
      }
    })
    return isMA
  }
 
 getFirstuser(i=0){ 
   console.log(this.myBenefitsData?.casesInformationDetail[i], "this.myBenefitsData?.casesInformationDetail[i]")
   return this.myBenefitsData?.casesInformationDetail[i]
 }
  ngOnInit() { 
    this.myBenefitsState = this.service.getMyBenefitsState;

    // this.myBenefitsData = myBenefitsData;
    this.myBenefitsData = this.myBenefitsState
    this.mycaseInformation = this.myBenefitsData.casesInformationDetail;

    this.caseNumbers = this.mycaseInformation
    // this.myBenefitsService.getBenefits().subscribe((data: any) => {
    // this.myBenefitsData = data;

    
      // this.cd.detectChanges();
    // })

    this.refService.initCounties().subscribe((c) => {
      this.counties = c;
    })
    // this.getBenefitsInformation();
  }


}

