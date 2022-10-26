import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { accordian, modalData } from '../../../shared/constants/Constants';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowIndividualDetailsWhoWillBeTaxClaimedStrategy } from '../../../shared/route-strategies/apply-now/individual-details-who-will-be-tax-claimed';
import { PageActionDirection, PageActionUtil } from '../../../shared/services/page-action-util.service';
import { UtilService } from '../../../shared/services/util.service';
import { Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold } from '../../household/household-model';
import { ScreenQueueUtil } from '../individuals-medical-gatepost/individuals-medical-gatepost.path';

@Component({
  selector: 'compass-ui-family-planning-service-summary',
  templateUrl: './family-planning-service-summary.component.html',
  styleUrls: ['./family-planning-service-summary.component.scss']
})

export class FamilyPlanningServiceSummaryComponent implements OnInit {
  jsonData: any;
  houseHoldPersons: IHouseHold[] = [];
deletedUserId!:number;
  modalData = { ...modalData }
  familyPlanningSummaryData = {
    "questionText": "People who want to be reviewed for coverage for the Family Planning Service Program",
    "subHeading": "Look below to make sure all people who want to be reviewed for the Family Planning Services program are here. ",
    "toolTip": "",
    "questionAnswers": [
      {
        "accordionHeader": "{replace} Sample 65 (M)",
        "accordionSubHeading": "",
        "accordionRightHeading": "",
        "accordionRightSubHeading": "",
        "userId": 1,
        "accordionData": [{}],
        "editButton": "Edit",
        "deleteButton": "Delete"
      },
    ],
    "addtionalButton": "Add More People to be Reviewed"
  }
  constructor(private service: ApplyNowStoreService, private queueService: ScreenQueueUtil,
    private pageActionUtil: PageActionUtil, private router: Router,private utilService:UtilService) { }

  ngOnInit(): void 
  {
    this.houseHoldPersons = this.service.getHouseholdPersons();
    this.pageActionUtil.initPageMap("familyPlanningServiceMap", "familyPlanningServiceDirection", false);
    this.pageActionUtil.initOtherMap([{ "mapName": "familyPlanningServiceAfraidMap", "directionName": "familyPlanningServiceAfraidDirection" }], PageActionDirection.NEXT)
    this.familyPlanningSummaryData['questionAnswers'] = [];

    this.houseHoldPersons.forEach((abrel, i) => {
      
      if (abrel.isAfraidOfPhysicalOrEmotionalOrOtherHarm != '' && abrel.agreeToFamilyPlanningServiceOnly != '' && abrel.reviewedForFamilyPlanningServices!='')
      {
      this.familyPlanningSummaryData['questionAnswers'].push({

        accordionHeader: `${abrel.firstName as string
          } ${abrel.lastName as string} ${Utility.getAge(abrel.dateOfBirth)}` || '',
        accordionSubHeading: '',
        accordionRightHeading: '',
        accordionRightSubHeading: '',
        userId: abrel.id || 0,
        accordionData: this.getAccordianLabel(abrel),
        editButton: "Edit",
        deleteButton: "Delete"
      })
      }
     
    })
    this.jsonData = this.familyPlanningSummaryData;
    const ids = [...this.getFilteredPersons()];
    this.jsonData['addtionalButton'] = (ids.length == this.houseHoldPersons.length) ?'':'Add More People to be Reviewed'
  }
  private getAccordianLabel(person: IHouseHold): accordian[] {
    let accordingData: accordian[] = [];
    accordingData.push({
      "label": `Does ${person.firstName} want to be reviewed only for the Family Planning Services Program and NOT for full health care coverage?`,
      "value": (person?.reviewedForFamilyPlanningServices?.charAt(0) == 'Y' ? 'YES' : person?.reviewedForFamilyPlanningServices?.charAt(0) == 'N')?'NO':'' ?? '',
      "bold": false
    });

    accordingData.push({
      "label": `Is ${person.firstName}  afraid that information sent to where they live about Family Planning Services could cause physical, emotional or other harm from their spouse, parents, or other person?`,
      "value": (person?.isAfraidOfPhysicalOrEmotionalOrOtherHarm?.charAt(0) == 'Y' ? 'YES' : person?.isAfraidOfPhysicalOrEmotionalOrOtherHarm?.charAt(0) == 'N'?'NO':'') ?? '',
      "bold": false
    });

    return accordingData;
  }
  editClicked(id: any) {
   
    const index=this.getPersonIndex(id);
    this.updateMap(index)

    this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FAMILYPLANNINGREVIEWREVIEW]);

  }

  addFamilyPlanningService(e: any) {
    const ids =  [...this.getFilteredPersons()];
    if (ids.length == this.houseHoldPersons.length) return;
    this.service.updateFromSummary({ isFromAdd: true, benefitId: null })
    this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FAMILYPLANNINGSERVICES]);
    return;
  }
  deleteClicked(id: any) {
    this.deletedUserId=id;
    
  }
  back() {
    
    const persons = [...this.getFilteredPersons()]
    if(persons.length==0){
      this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FAMILYPLANNINGSERVICES]);
      return;
    }
    const len = persons.length;
    const id = persons[len - 1].id;
    const maxIndex=this.houseHoldPersons.findIndex((person)=>person.id==id);

    this.updateMap(maxIndex)
    this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_FAMILYPLANNINGREVIEWREVIEW]);
  }
  next() {
//
this.queueService.next();
  }
  updateMap(index:number){
    this.pageActionUtil.emptyMap();
    this.pageActionUtil.emptyOtherMap("familyPlanningServiceAfraidMap");
    this.pageActionUtil.changeMapValue(index, false)
    this.pageActionUtil.changeOtherMapValue("familyPlanningServiceAfraidMap", index, false)
    this.pageActionUtil.updatePageActionDetail(PageActionDirection.NEXT, true)
  }
  

  getPersonIndex(id:any)
  {
    const userIndex=this.houseHoldPersons.findIndex((person:IHouseHold)=>person.id==id);
    return userIndex;
  }
  
  continueClicked() {
    
    this.jsonData['questionAnswers'].forEach((element: any) => {
      if (element['userId'] === this.deletedUserId) {
        element['accordionHeader'] = "";
      }
    });
     let persons=[...this.houseHoldPersons];
    persons = persons.map((item, ind) => ((item.id == this.deletedUserId) ? {
      ...item,
      isAfraidOfPhysicalOrEmotionalOrOtherHarm: '',
      reviewedForFamilyPlanningServices: ""
      , agreeToFamilyPlanningServiceOnly: ""
     
    } : { ...item }));
    //return persons;
    this.houseHoldPersons=[...persons]
    const storedHouseholdDetails = this.service.getHouseHoldDetails;
    this.service.updateHouseHoldDetails(
      { ...storedHouseholdDetails, houseHoldPersons: this.houseHoldPersons } as any
    )
    const ids = [...this.getFilteredPersons()];
    this.jsonData['addtionalButton'] = (ids.length == this.houseHoldPersons.length) ? '' : '+ Add More People to be Reviewed'
  }
  getFilteredPersons(){
    const persons = this.houseHoldPersons.filter((person: IHouseHold) => {
      return person.isAfraidOfPhysicalOrEmotionalOrOtherHarm != '' && person.reviewedForFamilyPlanningServices != '' && person.agreeToFamilyPlanningServiceOnly != ''

    })
    return persons;
  }

}
