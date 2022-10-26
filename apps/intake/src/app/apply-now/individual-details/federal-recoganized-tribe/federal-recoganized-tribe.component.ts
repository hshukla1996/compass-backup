import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IApplyNowState } from '../../+state/apply-now.models';
import { ApplyNowIndividualDetailsFederalRecoganizedTribeStrategy } from '../../../shared/route-strategies/apply-now/individual-details-federal-recoganized-tribe';
import { UtilService } from '../../../shared/services/util.service';
import { Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, PageDirection } from '../../household/household-model';
import { ScreenQueueUtil } from '../individuals-gatepost/individuals-gatepost.paths';

@Component({
  selector: 'compass-ui-federal-recoganized-tribe',
  templateUrl: './federal-recoganized-tribe.component.html',
  styleUrls: ['./federal-recoganized-tribe.component.scss'],
  providers: [ApplyNowIndividualDetailsFederalRecoganizedTribeStrategy]
})
export class FederalRecoganizedTribeComponent implements OnInit {

  applyNowState: IApplyNowState | undefined;
  public selectedUserids: string[] = [];
  private eventsSubscription: Subscription | undefined;
  private houseHoldHeadPersons: IHouseHold[] = [];
  private householdMembers: IHouseHold[] = [];
  private federalRecoganizedMap: any = {};

  public federalRecoganziedTribeJsonData = {
    "questionText": "You said somebody is part of a federally recognized tribe. Tell us who.",
    "subHeading": "Select all that apply.",
    "toolTip": "",
    "isRequired": true,
    "requiredText": "You must select an option.",
    "questionAnswers": [{
      "id": 1,
      "label": "Test",
      "isChecked": false
    }]
  };

  constructor(
    private service: ApplyNowStoreService,
    private router: Router,
    private queueService: ScreenQueueUtil,
    private routingStratagy: ApplyNowIndividualDetailsFederalRecoganizedTribeStrategy,
    private utilService: UtilService
  ) {
  }

  ngOnInit(): void {
    const getData$ = this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      this.houseHoldHeadPersons = this.applyNowState.houseHoldDetails.houseHoldPersons as IHouseHold[];
      this.federalRecoganziedTribeJsonData.questionAnswers = [];
      this.householdMembers = this.houseHoldHeadPersons;

      this.houseHoldHeadPersons.forEach((person) => {
        if (person.isFederalTribe) {
          this.selectedUserids.push(person.id as unknown as string);
        }
      });

      this.householdMembers.forEach((person) => {
        this.federalRecoganziedTribeJsonData.questionAnswers.push({
          id: person.id as unknown as number,
          isChecked: this.selectedUserids && this.selectedUserids.length > 0 ? this.selectedUserids.findIndex(x => +x === person.id) > -1 : false,
          label: Utility.getLabelText(person)
        });
      });
    });

    this.eventsSubscription?.add(getData$);
  }

  public showNextPage(selectedUserids: any) {
    if (this.applyNowState && this.applyNowState.houseHoldDetails && this.applyNowState.houseHoldDetails.houseHoldPersons) {
      const storedHouseholdDetails = this.applyNowState.houseHoldDetails;
      const clonedUpdatedPerson: IHouseHold[] = [];
      this.applyNowState.houseHoldDetails.houseHoldPersons.forEach((person: IHouseHold) => {
        const clonedPerson = { ...person };
        if (selectedUserids.indexOf(person.id as number) > -1) {
          clonedPerson.isFederalTribe = true;
        }
        else {
          clonedPerson.isFederalTribe = false;
        }

        clonedUpdatedPerson.push(clonedPerson);
      });

      if (selectedUserids.length > 0) {
        this.utilService.sortNames(selectedUserids, this.householdMembers, 'id').forEach((ind) => {
          if (ind) {
            this.federalRecoganizedMap[ind] = false;
          }
        });

        const updatedPageAction = {
          federalRecoganizedMap: this.federalRecoganizedMap,
          federalTaxIncomeMap: this.federalRecoganizedMap,
          serviceDirection: PageDirection.NEXT
        };

        if (storedHouseholdDetails) {
          this.service.updateHouseHoldDetails(
            { ...storedHouseholdDetails, ...{ houseHoldPersons: clonedUpdatedPerson }, ...{ pageAction: updatedPageAction } }
          )
        }
        // this.queueService.next();
        this.router.navigate([this.routingStratagy.nextRoute()]);
      }
    }
  }

  public showPreviousPage() {
    this.queueService.back();
  }

  ngOnDestroy(): void {
    this.eventsSubscription?.unsubscribe();
  }
}
