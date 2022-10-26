import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IApplyNowState } from '../../+state/apply-now.models';
import { ApplyNowIndividualDetailsHomelessnessStrategy } from '../../../shared/route-strategies/apply-now/individual-details-homelessness';
import { UtilService } from '../../../shared/services/util.service';
import { Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold } from '../../household/household-model';
import { ScreenQueueUtil } from '../individuals-gatepost/individuals-gatepost.paths';

@Component({
  selector: 'compass-ui-homeless',
  templateUrl: './homelessness.component.html',
  styleUrls: ['./homelessness.component.scss'],
  providers: [ApplyNowIndividualDetailsHomelessnessStrategy]
})
export class HomelessComponent implements OnInit {

  applyNowState: IApplyNowState | undefined;
  public selectedUserids: string[] = [];
  private eventsSubscription: Subscription | undefined;
  private houseHoldHeadPersons: IHouseHold[] = [];
  private householdMembers: IHouseHold[] = [];

  public homelessJsonData = {
    "questionText": "You told us someone is homeless. Tell us who. ",
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
    private routingStratagy: ApplyNowIndividualDetailsHomelessnessStrategy,
  ) {
  }

  ngOnInit(): void {
    const getData$ = this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      this.houseHoldHeadPersons = this.applyNowState.houseHoldDetails.houseHoldPersons as IHouseHold[];
      this.homelessJsonData.questionAnswers = [];
      this.householdMembers = this.houseHoldHeadPersons;

      this.houseHoldHeadPersons.forEach((person) => {
        if (person.isHomeless && person.isHomeless === 'Y') {
          this.selectedUserids.push(person.id as unknown as string);
        }
      });

      this.householdMembers.forEach((person) => {
        this.homelessJsonData.questionAnswers.push({
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
          clonedPerson.isHomeless = 'Y';
        }
        else {
          clonedPerson.isHomeless = 'N';
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
    //this.router.navigate([this.routingStratagy.previousRoute()]);
  }

  ngOnDestroy(): void {
    this.eventsSubscription?.unsubscribe();
  }
}
