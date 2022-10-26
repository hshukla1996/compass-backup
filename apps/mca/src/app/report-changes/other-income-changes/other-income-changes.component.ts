import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IChangeReportState } from '../../+state/models/change-report/change-report.model';
import { ChangeReportStoreService } from '../../+state/store-service/change-report-store.service';
import { RoutePath } from '../../shared/route-strategies';
import { ReportChangesService } from '../report-changes.service';

@Component({
  selector: 'compass-ui-other-income-changes',
  templateUrl: './other-income-changes.component.html',
  styleUrls: ['./other-income-changes.component.css']
})
export class OtherIncomeChangesComponent implements OnInit {
  incomeForm: FormGroup | any;
  displayError: boolean = false;
  error: string = "Description is not entered";
  changeReportState!: IChangeReportState;
  constructor(private router: Router, private fb: FormBuilder,
    private reportChangesService: ReportChangesService, private storeService: ChangeReportStoreService) { }

  ngOnInit(): void {
    this.incomeForm = this.fb.group({
      description: ['']
    });
    this.storeService.getAppData().subscribe((d) => {
      this.changeReportState = { ...d };
      if(this.changeReportState.householdInformation) {
        this.incomeForm.get('description').setValue(this.changeReportState.householdInformation.otherIncomeDescription)
      }
    });
  }

  onBack() {
    this.router.navigate([RoutePath.INCOME_JOB_CHANGE]);
  }

  onNext() {
    if (!this.incomeForm.get('description').value) {
      this.displayError = true;
    } else {
      this.storeService.updateOtherIncomeChanges(this.incomeForm.get('description').value);
      this.reportChangesService.navigateToNextIncomeChange('OTHER_INCOME_CHANGES');
    }
  }

}
