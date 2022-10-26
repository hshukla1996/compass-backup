import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { accordian, modalData } from '../../../shared/constants/Constants';
import { RoutePath } from '../../../shared/route-strategies';
import { PageActionDirection, PageActionUtil } from '../../../shared/services/page-action-util.service';
import { UtilService } from '../../../shared/services/util.service';
import { Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold } from '../../household/household-model';
import { ScreenQueueUtil } from '../individuals-medical-gatepost/individuals-medical-gatepost.path';

@Component({
  selector: 'compass-ui-supplemental-security-income-summary',
  templateUrl: './supplemental-security-income-summary.component.html',
  styleUrls: ['./supplemental-security-income-summary.component.scss']
})
export class SupplementalSecurityIncomeSummaryComponent implements OnInit {
  jsonData: any;
  houseHoldPersons: IHouseHold[] = [];
  deletedUserId!: number;
  modalData = {...modalData}
 ssiSummaryData = {
    "questionText": "Your household's past SSI",
   "subHeading": "Review the entries below to make sure all past SSI is shown.",
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
    "addtionalButton": "Add Past SSI"
  }
  constructor(private service: ApplyNowStoreService,
    private pageActionUtil: PageActionUtil, private router: Router, private utilService: UtilService, private queueService: ScreenQueueUtil) { }

  ngOnInit(): void 
  {
    
    this.houseHoldPersons = this.service.getHouseholdPersons();
    this.pageActionUtil.initPageMap("SSIIncomeMap", "SSIIncomeMapDirection", false);
    this.ssiSummaryData['questionAnswers'] = [];
    this.houseHoldPersons.forEach((abrel, i) => {
      const indiBenefit = abrel.individualExistingBenefits as any;
      
      if (indiBenefit != null && indiBenefit!==undefined && indiBenefit?.wasSSIStoppedBecauseSocialSecurityIncreased != '' && indiBenefit?.wasSSIStoppedBecauseSocialSecurityStarted != '') {
        this.ssiSummaryData['questionAnswers'].push({

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
    
    this.jsonData = this.ssiSummaryData;
    if (this.ssiLen() == this.houseHoldPersons.length) 
    {
      this.jsonData['addtionalButton'] = '';
    }
  }
  private getAccordianLabel(person: IHouseHold): accordian[] {
    const indiBenefit=person.individualExistingBenefits;
    let accordingData: accordian[] = [];
    accordingData.push({
      "label": `Did SSI stop because Social Security started?`,
      "value": (indiBenefit?.wasSSIStoppedBecauseSocialSecurityStarted?.charAt(0) == 'Y' ? 'YES' : indiBenefit?.wasSSIStoppedBecauseSocialSecurityStarted?.charAt(0) == 'N')?'NO':'' ?? '',
      "bold": false
    });

    accordingData.push({
      "label": `Did SSI stop because Social Security increased?`,
      "value": (indiBenefit?.wasSSIStoppedBecauseSocialSecurityIncreased?.charAt(0) == 'Y' ? 'YES' : indiBenefit?.wasSSIStoppedBecauseSocialSecurityIncreased?.charAt(0) == 'N'?'NO':'') ?? '',
      "bold": false
    });

    return accordingData;
  }
  editClicked(id: any) {
    const index = this.getPersonIndex(id);
    this.updateMap(index)
   this.ssiIncomeDetailPath();

  }

  addPastSSI(e: any) {
    const ssiInPast = this.service.getHouseholdHasAnyoneReceivedSSIInThePast();
    const code = ssiInPast?.code as boolean;
    const ids = ssiInPast?.individualNumbers as number[]
    if (ids.length==this.houseHoldPersons.length)return;
    this.service.updateFromSummary({ isFromAdd: true, benefitId: null })
    this.ssiIncomePath();
  }
  deleteClicked(id: any) {
    this.deletedUserId = id;

  }
  back() {

    const persons = this.houseHoldPersons.filter((person: IHouseHold) => {
      const indiBenefit=person.individualExistingBenefits;
      return indiBenefit?.wasSSIStoppedBecauseSocialSecurityIncreased != '' && indiBenefit?.wasSSIStoppedBecauseSocialSecurityStarted!=''

    })
    if (persons.length == 0) {
      this.ssiIncomePath();
      return;
    }
    const len = persons.length;
    const id = persons[len - 1].id;
    const maxIndex = this.houseHoldPersons.findIndex((person) => person.id == id);

    this.updateMap(maxIndex)
    this.ssiIncomeDetailPath();
  }
  next() {
    //
    this.queueService.next();
  }
  updateMap(index: number) {
    this.pageActionUtil.emptyMap();
    this.pageActionUtil.changeMapValue(index, false)
    this.pageActionUtil.updatePageActionDetail(PageActionDirection.NEXT, true)
  }


  getPersonIndex(id: any) {
    const userIndex = this.houseHoldPersons.findIndex((person: IHouseHold) => person.id == id);
    return userIndex;
  }

  continueClicked() {
    this.jsonData['questionAnswers'].forEach((element: any) => {
      if (element['userId'] === this.deletedUserId) {
        element['accordionHeader'] = "";
      }
    });
    const individualExistingBenefits={} as any;
    let persons = [...this.houseHoldPersons];
    persons = persons.map((item, ind) => ((item.id == this.deletedUserId) ? {
      ...item,
      individualExistingBenefits: individualExistingBenefits

    } : { ...item }));
    //return persons;
    this.houseHoldPersons = [...persons]
    const ssiInPast = this.service.getHouseholdHasAnyoneReceivedSSIInThePast();
    let filteredIds=(ssiInPast?.individualNumbers as number[]).filter((ids)=>ids!=this.deletedUserId);

    const code = filteredIds.length<=0?false:true;
    let householdHasAnyoneReceivedSSIInThePast = {
      code: code,
      individualNumbers: filteredIds,
    }
    const storedHouseholdDetails = this.service.getHouseHoldDetails;
    this.service.updateHouseHoldDetails(
      { ...storedHouseholdDetails, houseHoldPersons: this.houseHoldPersons } as any
    )
   
    this.service.storeHouseholdHasAnyoneReceivedSSIInThePast(householdHasAnyoneReceivedSSIInThePast)
    this.service.updateFromSummary({ isFromAdd: false, benefitId: null })
    if (this.ssiLen() == this.houseHoldPersons.length) {
      this.jsonData['addtionalButton'] = '';
    }
    else
    {
      this.jsonData['addtionalButton'] = '+ Add Past SSI';
   
    }
  }
  ssiIncomePath(){
   this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_SUPPLEMENTALSECURITYINCOME]);
  }
  ssiIncomeDetailPath(){
    this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_SUPPLEMENTALSECURITYINCOMEDETAIL]);
  }
  ssiLen(){
    const hasSSI = this.houseHoldPersons.filter((person: IHouseHold) => {
      const indiBenefit = person.individualExistingBenefits as any;
      return indiBenefit != null && JSON.stringify(indiBenefit)!=='{}' && indiBenefit !== undefined && indiBenefit?.wasSSIStoppedBecauseSocialSecurityIncreased != '' && indiBenefit?.wasSSIStoppedBecauseSocialSecurityStarted != ''
    })
    return hasSSI.length;
  }

}
