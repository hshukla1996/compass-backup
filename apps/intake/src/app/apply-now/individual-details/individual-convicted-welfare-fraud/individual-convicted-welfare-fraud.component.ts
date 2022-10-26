import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IApplyNowState } from '../../+state/apply-now.models';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowIndividualConvictedWelfareFraudStrategy } from '../../../shared/route-strategies/apply-now/individual-convicted-welfare-fraud';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, PageDirection } from '../../household/household-model';
import { ScreenQueueUtil } from '../individuals-legal-gatepost/individuals-legal-gatepost.path';
import IndividualConvictedWelfareFraudJson from './individual-convicted-welfare-fraud.json';

@Component({
  selector: 'compass-ui-individual-convicted-welfare-fraud',
  templateUrl: './individual-convicted-welfare-fraud.component.html',
  styleUrls: ['./individual-convicted-welfare-fraud.component.scss'],
  providers: [ApplyNowIndividualConvictedWelfareFraudStrategy]
})
export class IndividualConvictedWelfareFraudComponent implements OnInit {
  jsonData: any;
  convictedWelfareFraudForm: FormGroup | any;
  applyNowState!: IApplyNowState;
  householdPersons: IHouseHold[] = [];
  selectedUserids: any[] = [];
  alreadySelected: any[] = [];
  householdMembers: any[] = [];

  constructor(private fb: FormBuilder,
    private service: ApplyNowStoreService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private queueService: ScreenQueueUtil) { }

  ngOnInit(): void {
    this.jsonData = IndividualConvictedWelfareFraudJson;
    this.convictedWelfareFraudForm = this.fb.group({
      selectedUserids: this.fb.array([]),
    });

    this.service.getAppData().subscribe(d => {
      this.applyNowState = { ...d };
      this.householdPersons = this.applyNowState.houseHoldDetails?.houseHoldPersons || [];
      this.alreadySelected = [...this.applyNowState?.whoWasConvictedForWelfareFraud?.individualNumbers ?? []];
      this.cd.detectChanges();
    });
    if (this.applyNowState.houseHoldDetails) {
      this.householdMembers = this.householdPersons;
      this.householdMembers.forEach((ind) => {
        if (ind) {
          if (this.selectedUserids.indexOf(parseInt(ind)) === -1) {
            this.selectedUserids.push(parseInt(ind.id));
          }
        }
      });
    }
    if (this.selectedUserids.length > 0) {
      IndividualConvictedWelfareFraudJson['questionAnswers'] = [];
      this.householdMembers.forEach((member, index) => {
        if (this.selectedUserids.indexOf(member['id']) !== -1) {
          let age = this.getAge(member['dateOfBirth']);
          let gender = member['gender'].substring(0, 1);
          let label = member['firstName'][0].toUpperCase() + member['firstName'].slice(1) + " " + member['lastName'][0].toUpperCase() + member['lastName'].slice(1) + " " + age;
          let check = this.alreadySelected.indexOf(member['id']) !== -1 ? true : false;
          IndividualConvictedWelfareFraudJson['questionAnswers'].push({
            id: member['id'],
            isChecked: check,
            label: label,
            disabled: false
          });
        }
      });
    }
    this.jsonData = IndividualConvictedWelfareFraudJson;
  }

  getAge(dateString: any): any {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  showNextPage(user: any) {
    let whoWasConvictedForWelfareFraud = {
        code: true,
        individualNumbers: user
    }
    this.service.updateIndividualConvictedWelfareFraud(whoWasConvictedForWelfareFraud);
    this.queueService.nextPath();
  }

  showPreviousPage() {
    if (this.queueService.state.pageQueue.currentPageId > 0) {
        this.queueService.backPath();
    }
    else {
        this.router.navigate([
        RoutePath.APPLYNOW + 
        '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS + 
        '/' + RoutePath.APPLYNOW_INDIVIDUALDETAILS_INDIVIDUALSLEGALGATEPOST]);
    }
  }

}
