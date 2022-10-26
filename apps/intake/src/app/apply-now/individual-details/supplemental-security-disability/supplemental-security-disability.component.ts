import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IApplyNowState, IHouseholdHasAnyoneReceivedSSDInThePast } from '../../+state/apply-now.models';
import { RoutePath } from '../../../shared/route-strategies';
import { PageActionDirection, PageActionUtil } from '../../../shared/services/page-action-util.service';
import { Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold } from '../../household/household-model';
import { ScreenQueueUtil } from '../individuals-medical-gatepost/individuals-medical-gatepost.path';
import { SupplementDisability } from './supplemental-security-disability';

@Component({
  selector: 'compass-ui-supplemental-security-disability',
  templateUrl: './supplemental-security-disability.component.html',
  styleUrls: ['./supplemental-security-disability.component.scss']
})
export class SupplementalSecurityDisabilityComponent implements OnInit {
  public supplementDisability = { ...SupplementDisability }
  selectedUserids!: number[]
  applyNowState: IApplyNowState | undefined;
  houseHoldPersons: IHouseHold[] = [];
  householdHasAnyoneReceivedSSDInThePast!: IHouseholdHasAnyoneReceivedSSDInThePast | null
  constructor(private service: ApplyNowStoreService,
    private pageActionUtil: PageActionUtil, private router: Router, private queueService: ScreenQueueUtil) { }

  ngOnInit(): void {
    this.pageActionUtil.initPageMap("SSDMap", "SSDMapDirection", false);
    this.houseHoldPersons = this.service.getHouseholdPersons()
    this.householdHasAnyoneReceivedSSDInThePast = this.service.getHouseholdHasAnyoneReceivedSSDInThePast();
    if (this.householdHasAnyoneReceivedSSDInThePast != null) {
      this.selectedUserids = this.householdHasAnyoneReceivedSSDInThePast.individualNumbers;
    }
    this.supplementDisability.questionAnswers = [];
    this.houseHoldPersons.forEach((person) => {
      
      this.supplementDisability.questionAnswers.push({
        id: person.id as unknown as number,
        isChecked: this.selectedUserids && this.selectedUserids.length > 0 ? this.selectedUserids.findIndex(x => x === person.id) > -1 : false,
        label: `${person.firstName as string} ${person.lastName as string} ${Utility.getAge(person.dateOfBirth)} 
          (${Utility.getGenderCode(person.gender as string)})`
      })
    });
  }
  showNextPage(selectUserIds: any) {
    this.pageActionUtil.emptyMap();
    let persons = [...this.houseHoldPersons];
    selectUserIds.forEach((id: any) => {
      const index = this.houseHoldPersons.findIndex((person: any) => person.id == id);
      if (index >= 0) {


        this.pageActionUtil.changeMapValue(index, false);
      }
    })


    let householdHasAnyoneReceivedSSDInThePast = {
      code: true,
      individualNumbers: selectUserIds
    }
    this.service.storeHouseholdHasAnyoneReceivedSSDInThePast(householdHasAnyoneReceivedSSDInThePast)
    this.pageActionUtil.updatePageActionDetail(PageActionDirection.NEXT)
    this.queueService.next();

  }


  showPreviousPage() {
    if (this.queueService.state.pageQueue.currentPageId > 0) {
      this.queueService.backPath();
    }
  }

}