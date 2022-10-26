import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IApplyNowState, IFamilyPlanningServicesData, IFromSummary } from '../../+state/apply-now.models';
import { RoutePath } from '../../../shared/route-strategies';
import { PageActionDirection, PageActionUtil } from '../../../shared/services/page-action-util.service';
import { Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold } from '../../household/household-model';
import { FamilyPlanningService } from './family-planning-service';
import { ScreenQueueUtil } from '../individuals-medical-gatepost/individuals-medical-gatepost.path';

@Component({
  selector: 'compass-ui-family-planning-services',
  templateUrl: './family-planning-services.component.html',
  styleUrls: ['./family-planning-services.component.scss']
})
export class FamilyPlanningServicesComponent implements OnInit {
  public familyPlanningService = { ...FamilyPlanningService }
  selectedUserids!: number[]

  houseHoldPersons: IHouseHold[] = [];
  isFromAdd!: boolean
  fromSummaryData!: IFromSummary
  constructor(private service: ApplyNowStoreService,
    private pageActionUtil: PageActionUtil, 
    private router: Router,
    private queueService: ScreenQueueUtil) { }

  ngOnInit(): void 
  {
    this.pageActionUtil.initPageMap("familyPlanningServiceMap", "familyPlanningServiceDirection", false);
    this.pageActionUtil.initOtherMap([{ "mapName": "familyPlanningServiceAfraidMap", "directionName":"familyPlanningServiceAfraidDirection"}], PageActionDirection.NEXT)
    this.houseHoldPersons = this.service.getHouseholdPersons();
    let selectedIds = this.houseHoldPersons.filter((person: IHouseHold) => person.agreeToFamilyPlanningServiceOnly==="Y").map((idx)=>idx.id);
    this.selectedUserids=[...selectedIds] as number[];
    this.fromSummaryData = this.service.getFromSummaryData() as IFromSummary;
    this.isFromAdd = (this.fromSummaryData!=null && this.fromSummaryData.isFromAdd!=null && this.fromSummaryData.isFromAdd!=undefined)?this.fromSummaryData.isFromAdd:false
    let persons = [...this.houseHoldPersons];
    
    if (this.isFromAdd) 
    {
      const previousIds = this.fromSummaryData?.userIds ?? [];
      persons = [...(previousIds.length > 0)? persons.filter((person) => {
        return previousIds.findIndex(x => x === person.id) > -1;
      }) : persons.filter((person) => {
        return this.selectedUserids.findIndex(x => x === person.id) == -1;
      })]
     
      this.selectedUserids = (previousIds.length > 0) ? [...previousIds]: [];
    }
    this.familyPlanningService.questionAnswers = [];
    persons.forEach((person) => {

      this.familyPlanningService.questionAnswers.push({
        id: person.id as unknown as number,
        isChecked: this.selectedUserids && this.selectedUserids.length > 0 ? this.selectedUserids.findIndex(x => x === person.id) > -1 : false,
        label: `${person.firstName as string} ${person.lastName as string} ${Utility.getAge(person.dateOfBirth)}`
      })
    });

  }
  showNextPage(selectUserIds: any) {
    
    this.pageActionUtil.emptyMap();
    this.pageActionUtil.emptyOtherMap("familyPlanningServiceAfraidMap");
    const obj = {
      "reviewedForFamilyPlanningServices": ""
      , "agreeToFamilyPlanningServiceOnly": "",
      "isAfraidOfPhysicalOrEmotionalOrOtherHarm":""
    } as any
   
     let persons=[...this.houseHoldPersons]
    selectUserIds=[...selectUserIds.sort()];
      selectUserIds.forEach((id: any) => {
        const index = persons.findIndex((idx: any) => idx.id == id)
        
        if (index >= 0) {

          persons = persons.map((item: any, ind: any) => ((ind == index) ? {
            ...item,
            agreeToFamilyPlanningServiceOnly: "Y",
            isAfraidOfPhysicalOrEmotionalOrOtherHarm: (item?.isAfraidOfPhysicalOrEmotionalOrOtherHarm),

          } : { ...item }));
          this.pageActionUtil.changeMapValue(index, false);
          this.pageActionUtil.changeOtherMapValue("familyPlanningServiceAfraidMap", index, false)
        }
      
      })
    
   
    this.houseHoldPersons = [...persons];
    const storedHouseholdDetails = this.service.getHouseHoldDetails;
  
    // this.service.updateHouseHoldDetails(
    //   { ...storedHouseholdDetails, houseHoldPersons: this.houseHoldPersons } as any
    // )
    this.removeUncheckedOptionsAndStore(selectUserIds,obj)
    this.pageActionUtil.updatePageActionDetail(PageActionDirection.NEXT,true)
    this.service.updateFromSummary({ isFromAdd: this.isFromAdd, benefitId: null,userIds:selectUserIds })
    this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FAMILYPLANNINGREVIEWREVIEW]);
  }


  showPreviousPage() {
    if (this.queueService.state.pageQueue.currentPageId > 0) {
        this.queueService.backPath();
    }
    else {
        this.router.navigate([
        RoutePath.APPLYNOW + 
        '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + 
        '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_INDIVIDUALSMEDICALGATEPOST]);
    }
  }
  removeUncheckedOptionsAndStore(selectedUserIds: number[],obj:any) {
    let persons=[...this.houseHoldPersons];

    if (!this.isFromAdd){
     const _persons= [...this.service.getUncheckedPropertyOfIndividual(this.houseHoldPersons, selectedUserIds, obj)] as IHouseHold[]
     if(_persons.length>0)
     {
       persons=[..._persons];
     }
    }


    this.houseHoldPersons = [...persons];
    const storedHouseholdDetails = this.service.getHouseHoldDetails;
    this.service.updateHouseHoldDetails(
      { ...storedHouseholdDetails, houseHoldPersons: this.houseHoldPersons } as any
    )

  }
  

}
