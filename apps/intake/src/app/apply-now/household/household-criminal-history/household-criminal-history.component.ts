import { Component, OnInit } from '@angular/core';
import { HouseholdFormDataService } from '../services/household-form-data.service';
import { HouseholdCrimHistory } from '../models/householdCrimHistory';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder} from '@angular/forms';

@Component({
  selector: 'compass-ui-household-criminal-history',
  templateUrl: './household-criminal-history.component.html',
  styleUrls: ['./household-criminal-history.component.scss']
})
export class HouseholdCriminalHistoryComponent implements OnInit {
  householdCrimHistory : HouseholdCrimHistory;
  householdCrimHistoryForm : FormGroup | any;

  constructor(
      public householdFormDataService : HouseholdFormDataService,
      private householdCrimHis : FormBuilder
  ) { 
      this.householdCrimHistory = this.householdFormDataService.householdCrimHistory
  }

  ngOnInit(): void {
    this.householdCrimHistoryForm = this.householdCrimHis.group({
      chkOffense : '',
      chkFraud : '',
      chkParole : '',
      chkLawEnforcement : '',
      chkPrison : '',
      chkNone : ''
    })
  }

}
