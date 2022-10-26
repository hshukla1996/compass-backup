import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IApplyNowState } from '../../+state/apply-now.models';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowIndividualDetailsPaidUnpaidMedicalBillsStrategy } from '../../../shared/route-strategies/apply-now/individual-details-paid-unpaid-medical-bills';
import { UtilService } from '../../../shared/services/util.service';
import { Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold } from '../../household/household-model';
import { ScreenQueueUtil } from '../individuals-medical-gatepost/individuals-medical-gatepost.path';

@Component({
  selector: 'compass-ui-paid-unpaid-medical-bills',
  templateUrl: './paid-unpaid-medical-bills.component.html',
  styleUrls: ['./paid-unpaid-medical-bills.component.scss'],
  providers: [ApplyNowIndividualDetailsPaidUnpaidMedicalBillsStrategy]
})
export class PaidUnpaidMedicalBillsComponent implements OnInit {

  applyNowState: IApplyNowState | undefined;
  public selectedUserids: string[] = [];
  private eventsSubscription: Subscription | undefined;
  private houseHoldHeadPersons: IHouseHold[] = [];
  private householdMembers: IHouseHold[] = [];

  public paidUnpaidMedicalBillsJsonData = {
    "questionText": "You told us someone has paid or unpaid medical bills that have a date of service that happened this month or within the past 3 months.Tell us who.",
    "subHeading": "Select all that apply.",
    "toolTip": "",
    "isRequired": true,
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
    private routingStratagy: ApplyNowIndividualDetailsPaidUnpaidMedicalBillsStrategy,
    private utilService: UtilService,
    private queueService: ScreenQueueUtil,
  ) {
  }

  ngOnInit(): void {
    const getData$ = this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      this.houseHoldHeadPersons = this.applyNowState.houseHoldDetails.houseHoldPersons as IHouseHold[];
      this.paidUnpaidMedicalBillsJsonData.questionAnswers = [];
      this.householdMembers = this.houseHoldHeadPersons;

      this.houseHoldHeadPersons.forEach((person) => {
        if (person.isPaidMedicalBills) {
          this.selectedUserids.push(person.id as unknown as string);
        }
      });

      this.householdMembers.forEach((person) => {
        this.paidUnpaidMedicalBillsJsonData.questionAnswers.push({
          id: person.id as unknown as number,
          isChecked: this.selectedUserids && this.selectedUserids.length > 0 ? this.selectedUserids.findIndex(x => +x === person.id) > -1 : false,
          label: `${this.getPersonName(person)} ${Utility.getAge(person.dateOfBirth)} 
          `
        })
      });
    });

    this.eventsSubscription?.add(getData$);
  }
  getPersonName(person:any){
 
    if(person!=null && person!==undefined){
        const firstName=(person.firstName!==undefined && person.firstName!==null)?person.firstName:''
        const lastName=(person.lastName!==undefined && person.lastName!==null)?person.lastName:''
        const midName=(person.midName!==undefined && person.midName!==null)?person.lastName:''
        const fullName=`${firstName} ${midName} ${lastName}`
        return fullName;
    }
    return '';
  }

  public showNextPage(selectedUserids: any) {

    if (this.applyNowState && this.applyNowState.houseHoldDetails && this.applyNowState.houseHoldDetails.houseHoldPersons) {
      const storedHouseholdDetails = this.applyNowState.houseHoldDetails;
      const clonedUpdatedPerson: IHouseHold[] = [];
      this.applyNowState.houseHoldDetails.houseHoldPersons.forEach((person: IHouseHold) => {
        const clonedPerson = { ...person };
        if (selectedUserids.indexOf(person.id as number) > -1) {
          clonedPerson.isPaidMedicalBills = true;
        }
        else {
          clonedPerson.isPaidMedicalBills = false;
        }

        clonedUpdatedPerson.push(clonedPerson);
      });

      if (storedHouseholdDetails) {
        this.service.updateHouseHoldDetails(
          { ...storedHouseholdDetails, ...{ houseHoldPersons: clonedUpdatedPerson } }
        )
      }
      // this.queueService.nextPath();
      this.router.navigate([this.routingStratagy.nextRoute()]);
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
