import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IApplyNowState, IFromSummary, IHouseholdHasAnyoneReceivedSSDInThePast, IHouseholdHasAnyoneReceivedSSIInThePast } from '../../+state/apply-now.models';
import { RoutePath } from '../../../shared/route-strategies';
import { PageActionDirection, PageActionUtil } from '../../../shared/services/page-action-util.service';
import { Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold } from '../../household/household-model';
import { SupplementSecurityIncome } from './supplement-security-income';
import { ScreenQueueUtil } from '../individuals-medical-gatepost/individuals-medical-gatepost.path';

@Component({
  selector: 'compass-ui-supplemental-security-income',
  templateUrl: './supplemental-security-income.component.html',
  styleUrls: ['./supplemental-security-income.component.scss']
})

export class SupplementalSecurityIncomeComponent implements OnInit {
  public supplementSecurityIncome = { ...SupplementSecurityIncome }
  selectedUserids!: number[]
  applyNowState: IApplyNowState | undefined;
  houseHoldPersons: IHouseHold[] = [];
  householdHasAnyoneReceivedSSIInThePast!: IHouseholdHasAnyoneReceivedSSIInThePast | null
  isFromAdd!:boolean
  fromSummaryData!:IFromSummary
  constructor(private service: ApplyNowStoreService,
    private pageActionUtil: PageActionUtil, 
    private router: Router,
    private queueService: ScreenQueueUtil) { }

  ngOnInit(): void {
    
    this.pageActionUtil.initPageMap("SSIIncomeMap", "SSIIncomeMapDirection", false);
    this.houseHoldPersons = this.service.getHouseholdPersons();
    this.householdHasAnyoneReceivedSSIInThePast = this.service.getHouseholdHasAnyoneReceivedSSIInThePast();

    if (this.householdHasAnyoneReceivedSSIInThePast != null) {
      this.selectedUserids = this.householdHasAnyoneReceivedSSIInThePast.individualNumbers;
    }
    this.fromSummaryData=this.service.getFromSummaryData() as IFromSummary;
    this.isFromAdd = (this.fromSummaryData != null && this.fromSummaryData.isFromAdd != null && this.fromSummaryData.isFromAdd != undefined) ? this.fromSummaryData.isFromAdd : false
    let persons = [...this.houseHoldPersons];
    if (this.isFromAdd)
    {
     
      const previousIds = this.fromSummaryData?.userIds ?? [];
      persons = [...(previousIds.length > 0) ? persons.filter((person) => {
        return previousIds.findIndex(x => x === person.id) > -1;
      }) : persons.filter((person) => {
        return this.selectedUserids.findIndex(x => x === person.id) == -1;
      })]

      this.selectedUserids = (previousIds.length > 0) ? [...previousIds] : [];
    }
    
    this.supplementSecurityIncome.questionAnswers = [];
    persons.forEach((person) => {

      this.supplementSecurityIncome.questionAnswers.push({
        id: person.id as unknown as number,
        isChecked: this.selectedUserids && this.selectedUserids.length > 0 ? this.selectedUserids.findIndex(x => x === person.id) > -1 : false,
        label: `${person.firstName as string} ${person.lastName as string} ${Utility.getAge(person.dateOfBirth)}`
      })
    });

  }
  showNextPage(selectUserIds: any) {
    if(selectUserIds.length==0)return;
    this.pageActionUtil.emptyMap();
    let userId = [...selectUserIds].sort();
    
    userId.forEach((id: any) => {
      const index = this.houseHoldPersons.findIndex((person: any) => person.id == id);
      if (index >= 0) {

        this.pageActionUtil.changeMapValue(index, false);
        //
      }
    })

    const ssiInPast = this.service.getHouseholdHasAnyoneReceivedSSIInThePast();
    let ids=[...ssiInPast?.individualNumbers??[] as number[]];
    let _selectedUsersIds=[] as number[];
    userId.forEach((id)=>{
      if(ids.indexOf(id)==-1){
        _selectedUsersIds.push(id);
      }
    })
    ids = [...ids.concat(_selectedUsersIds)]
    let householdHasAnyoneReceivedSSIInThePast = {
      code: true,
      individualNumbers: ids as number[],
      
    }
    this.service.updateFromSummary({ isFromAdd: this.isFromAdd, benefitId: null, userIds: selectUserIds})
    this.service.storeHouseholdHasAnyoneReceivedSSIInThePast(householdHasAnyoneReceivedSSIInThePast)
   // this.removeUncheckedOptionsAndStore(selectUserIds);
    this.pageActionUtil.updatePageActionDetail(PageActionDirection.NEXT)
    //this.queueService.nextPath();
    this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_SUPPLEMENTALSECURITYINCOMEDETAIL]);
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
  removeUncheckedOptions(selectedUserIds: number[]) {
   
    let persons = [...this.service.getUncheckedPropertyOfIndividual(this.houseHoldPersons, selectedUserIds,  { "individualExistingBenefits"
:{}})] as IHouseHold[];
    if(persons.length==0)return;

    this.houseHoldPersons = [...persons];
    const storedHouseholdDetails = this.service.getHouseHoldDetails;
    this.service.updateHouseHoldDetails(
      { ...storedHouseholdDetails, houseHoldPersons: this.houseHoldPersons } as any
    )

  }
  removeUncheckedOptionsAndStore(selectedUserIds: number[], obj: any={}) {
    let persons = [...this.houseHoldPersons];

    if (!this.isFromAdd) {
      const _persons = [...this.service.getUncheckedPropertyOfIndividual(this.houseHoldPersons, selectedUserIds, {
        "individualExistingBenefits"
          : {}
      })] as IHouseHold[];
      if (_persons.length > 0) {
        persons = [..._persons];
      }
    }


    this.houseHoldPersons = [...persons];
    const storedHouseholdDetails = this.service.getHouseHoldDetails;
    this.service.updateHouseHoldDetails(
      { ...storedHouseholdDetails, houseHoldPersons: this.houseHoldPersons } as any
    )

  }

}
