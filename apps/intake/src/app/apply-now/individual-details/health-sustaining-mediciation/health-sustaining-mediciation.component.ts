import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutePath } from '../../../shared/route-strategies';
import { Subscription } from 'rxjs';
import { IApplyNowState } from '../../+state/apply-now.models';
import { UtilService } from '../../../shared/services/util.service';
import { Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold } from '../../household/household-model';
import { ScreenQueueUtil } from '../individuals-medical-gatepost/individuals-medical-gatepost.path';

@Component({
  selector: 'compass-ui-health-sustaining-medication',
  templateUrl: './health-sustaining-mediciation.component.html',
  styleUrls: ['./health-sustaining-mediciation.component.scss']  
})
export class HealthSustainingMedicationComponent implements OnInit {

  applyNowState: IApplyNowState | undefined;
  public selectedUserids: string[] = [];
  private eventsSubscription: Subscription | undefined;
  private houseHoldHeadPersons: IHouseHold[] = [];
  private householdMembers: IHouseHold[] = [];

  public healthSustainingMedicationJsonData = {
    "questionText": "You told us someone has a medical condition that needs health sustaining medication.Tell us who.",
    "subHeading": "Select all that apply.",
    "toolTip": "",
    "isRequired": false,
    "requiredText": "Please select at least one",
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
  ) {
  }

  ngOnInit(): void {
    const getData$ = this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      this.houseHoldHeadPersons = this.applyNowState.houseHoldDetails.houseHoldPersons as IHouseHold[];
      this.healthSustainingMedicationJsonData.questionAnswers = [];
      this.householdMembers = this.houseHoldHeadPersons;

      this.houseHoldHeadPersons.forEach((person) => {
        if (person.isHealthSustainingMedication) {
          this.selectedUserids.push(person.id as unknown as string);
        }
      });

      this.householdMembers.forEach((person) => {
        this.healthSustainingMedicationJsonData.questionAnswers.push({
          id: person.id as unknown as number,
          isChecked: this.selectedUserids && this.selectedUserids.length > 0 ? this.selectedUserids.findIndex(x => +x === person.id) > -1 : false,
          label: `${person.firstName as string} ${person.lastName as string} ${Utility.getAge(person.dateOfBirth)} 
          `
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
          clonedPerson.isHealthSustainingMedication = true;
        }
        else {
          clonedPerson.isHealthSustainingMedication = false;
        }

        clonedUpdatedPerson.push(clonedPerson);
      });

      if (storedHouseholdDetails) {
        this.service.updateHouseHoldDetails(
          { ...storedHouseholdDetails, ...{ houseHoldPersons: clonedUpdatedPerson } }
        )
      }
      this.queueService.nextPath();
      // this.router.navigate([this.routingStratagy.nextRoute()]);
    }
  }

  public showPreviousPage() {
    if (this.queueService.state.pageQueue.currentPageId > 0) {
      this.queueService.backPath();
    }
    else {
      this.router.navigate([
      RoutePath.APPLYNOW + 
      '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + 
      '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_INDIVIDUALSMEDICALGATEPOST]);
    }
    //this.router.navigate([this.routingStratagy.previousRoute()]);
  }

  ngOnDestroy(): void {
    this.eventsSubscription?.unsubscribe();
  }
}
