import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {  FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import {  IApplyNowState, IFromSummary } from '../../+state/apply-now.models';
import { RoutePath } from '../../../shared/route-strategies';
import { PageActionDirection, PageActionUtil } from '../../../shared/services/page-action-util.service';
import { Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, IHouseHoldDetails } from '../../household/household-model';
import { ScreenQueueUtil } from '../individuals-medical-gatepost/individuals-medical-gatepost.path';
import { BenefitRecievedData } from './benefits-not-received';
import { AppStoreService } from '../../../app-store-service';

@Component({
  selector: 'compass-ui-benefits-not-received',
  templateUrl: './benefits-not-received.component.html',
  styleUrls: ['./benefits-not-received.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BenefitsNotReceviedComponent implements OnInit, OnDestroy {


  public benefitNotRecievedData = { ...BenefitRecievedData }
  selectedUserids!: number[]
  isFromAdd!: boolean;
  public form!: FormGroup | any;

  @ViewChild('formEle') formEle: any;

  applyNowState: IApplyNowState | undefined;

  houseHoldHeadPersons: IHouseHold[] = [];
  benefitTypes!: any[]
  constructor(private _formBuilder: FormBuilder,
    private service: ApplyNowStoreService,
    private pageActionUtil: PageActionUtil,
    private router: Router,
    private appService: AppStoreService,
    private queueService: ScreenQueueUtil) {
    this.appService.getBenefitTypes().subscribe((types) => {
      this.benefitTypes = types;
    })

  }

  ngOnInit(): void {
    this.pageActionUtil.initPageMap("benefitNotRecievedMap", "benefitNotRecievedDirection", false);

    let selectedIds = [] as any;

    this.houseHoldHeadPersons = this.service.getHouseholdPersons() as IHouseHold[]
    let fromSummaryData = this.service.getFromSummaryData() as IFromSummary;
    this.isFromAdd = (fromSummaryData != null && fromSummaryData.isFromAdd != null && fromSummaryData.isFromAdd != undefined) ? fromSummaryData.isFromAdd : false
    this.houseHoldHeadPersons.forEach((person) => {
      const benefitsNotReceivedInformation = person.benefitsNotReceivedInformation;
      const hasNotRecieved = (benefitsNotReceivedInformation?.hasAppliedForBenefitButNotReceived=='Y')?true:false;
      const benefits = benefitsNotReceivedInformation?.benefits??[];
      if (hasNotRecieved == true && (benefits.length < this.benefitTypes.length)) {
        selectedIds.push(person.id);
      }
    })
    let persons = [...this.houseHoldHeadPersons];
    this.selectedUserids = [...selectedIds] as number[];
    if (this.isFromAdd) {

      this.selectedUserids = [...fromSummaryData?.userIds??[]];
      
    }
  
     


    this.benefitNotRecievedData.questionAnswers = [];
    persons.forEach((person) => {
      this.benefitNotRecievedData.questionAnswers.push({
        id: person.id as unknown as number,
        isChecked: this.selectedUserids && this.selectedUserids.length > 0 ? this.selectedUserids.findIndex(x => x === person.id) > -1 : false,
        label: `${person.firstName as string} ${person.lastName as string} ${Utility.getAge(person.dateOfBirth)}`
      })
    });



  }



  public ngOnDestroy(): void {
  }
  showNextPage(selectUserIds: any) {
    this.pageActionUtil.emptyMap();
    let persons = [...this.houseHoldHeadPersons];
    selectUserIds.forEach((id: any) => {
      const index = this.houseHoldHeadPersons.findIndex((person: any) => person.id == id);
      if (index >= 0) {
        persons = persons.map((item, ind) => ((ind == index) ? {
          ...item,
          benefitsNotReceivedInformation: { ...item.benefitsNotReceivedInformation, hasAppliedForBenefitButNotReceived: 'Y' }
        } : { ...item }));

        this.pageActionUtil.changeMapValue(index, false);
      }
    })
     this.houseHoldHeadPersons = [...persons];
    // const storedHouseholdDetails = this.applyNowState?.houseHoldDetails;
    // this.service.updateHouseHoldDetails(
    //   { ...storedHouseholdDetails, houseHoldPersons: this.houseHoldHeadPersons } as any
    // )
    const obj={
      "benefitsNotReceivedInformation":{}
    }
    this.removeUncheckedOptionsAndStore(selectUserIds, obj)
    this.service.updateFromSummary({ isFromAdd: this.isFromAdd, benefitId: null, userIds: selectUserIds })
    this.pageActionUtil.updatePageActionDetail(PageActionDirection.NEXT, false)
    this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_BENEFITSNOTRECEIVEDDETAILS]);

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
  removeUncheckedOptionsAndStore(selectedUserIds: number[], obj: any) {
    
    let persons = [...this.houseHoldHeadPersons];

    if (!this.isFromAdd) {
      const _persons = [...this.service.getUncheckedPropertyOfIndividual(this.houseHoldHeadPersons, selectedUserIds, obj)] as IHouseHold[]
      if (_persons.length > 0) {
        persons = [..._persons];
      }
    }


    this.houseHoldHeadPersons = [...persons];
    const storedHouseholdDetails = this.service.getHouseHoldDetails;
    this.service.updateHouseHoldDetails(
      { ...storedHouseholdDetails, houseHoldPersons: this.houseHoldHeadPersons } as any
    )

  }
}
