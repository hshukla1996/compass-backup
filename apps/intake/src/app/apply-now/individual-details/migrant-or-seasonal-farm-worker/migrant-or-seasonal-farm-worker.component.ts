import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IApplyNowState } from '../../+state/apply-now.models';
import { ApplyNowIndividualDetailsMigrantOrSeasonalFarmWorkerStrategy } from '../../../shared/route-strategies/apply-now/individual-details-migrant-or-seasonal-farm-worker';
import { Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold } from '../../household/household-model';
import { ScreenQueueUtil } from '../individuals-gatepost/individuals-gatepost.paths';

@Component({
  selector: 'compass-ui-migrant-or-seasonal-farm-worker',
  templateUrl: './migrant-or-seasonal-farm-worker.component.html',
  styleUrls: ['./migrant-or-seasonal-farm-worker.component.scss'],
  providers: [ApplyNowIndividualDetailsMigrantOrSeasonalFarmWorkerStrategy]
})
export class MigrantOrSeasonalFarmWorkerComponent implements OnInit {

  applyNowState: IApplyNowState | undefined;
  public selectedUserids: string[] = [];
  private eventsSubscription: Subscription | undefined;
  private houseHoldHeadPersons: IHouseHold[] = [];
  private householdMembers: IHouseHold[] = [];

  public migrantOrSeasonalFarmWorkerJsonData = {
    "questionText": "You told us someone is a migrant or seasonal farm worker. Tell us who. ",
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
    private routingStratagy: ApplyNowIndividualDetailsMigrantOrSeasonalFarmWorkerStrategy,
  ) {
  }

  ngOnInit(): void {
    const getData$ = this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      this.houseHoldHeadPersons = this.applyNowState.houseHoldDetails.houseHoldPersons as IHouseHold[];
      this.migrantOrSeasonalFarmWorkerJsonData.questionAnswers = [];
      this.householdMembers = this.houseHoldHeadPersons;

      this.houseHoldHeadPersons.forEach((person) => {
        if (person.migrantOrSeasonalWorker && person.migrantOrSeasonalWorker === 'Y') {
          this.selectedUserids.push(person.id as unknown as string);
        }
      });

      this.householdMembers.forEach((person) => {
        this.migrantOrSeasonalFarmWorkerJsonData.questionAnswers.push({
          id: person.id as unknown as number,
          isChecked: this.selectedUserids && this.selectedUserids.length > 0 ? this.selectedUserids.findIndex(x => +x === person.id) > -1 : false,
          label: Utility.getLabelText(person)
        })
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
          clonedPerson.migrantOrSeasonalWorker = 'Y';
        }
        else {
          clonedPerson.migrantOrSeasonalWorker = 'N';
        }

        clonedUpdatedPerson.push(clonedPerson);
      });

      if (storedHouseholdDetails) {
        this.service.updateHouseHoldDetails(
          { ...storedHouseholdDetails, ...{ houseHoldPersons: clonedUpdatedPerson } }
        )
      }
this.queueService.next();
     // this.router.navigate([this.routingStratagy.nextRoute()]);
    }
  }

  public showPreviousPage() {
      this.queueService.back();
 
   // this.router.navigate([this.routingStratagy.previousRoute()]);
  }

  ngOnDestroy(): void {
    this.eventsSubscription?.unsubscribe();
  }
}
