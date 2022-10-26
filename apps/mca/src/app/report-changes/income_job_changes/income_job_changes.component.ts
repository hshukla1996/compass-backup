import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeReportStoreService } from '../../+state/store-service/change-report-store.service';
import { RoutePath } from '../../shared/route-strategies';
import { ReportChangesService } from '../report-changes.service';

@Component({
  selector: 'compass-ui-income_job_changes',
  templateUrl: './income_job_changes.component.html',
  styleUrls: ['./income_job_changes.component.css']
})
export class IncomeJobChangesComponent implements OnInit {
  incomeChanges: string[] = [];
  displayError: boolean = false;
  error: string = "None of the options are selected";
  changes: string[] = ['WAGE_CHANGES', 'LOSS_OF_JOB', 'NEW_JOB_CHANGES', 'UNEMPLOYMENT_SCREEN', 'SSI_CHANGES',
    'RSDI_CHANGES', 'OTHER_INCOME_CHANGES'];
  constructor(private router: Router, private reportChangeService: ReportChangesService,
    private storeService: ChangeReportStoreService) { }

  ngOnInit(): void {
    if (this.reportChangeService.selectedIncomeChanges) {
      this.incomeChanges = [...this.reportChangeService.selectedIncomeChanges];
    }
  }

  onBack() {
    this.router.navigate([RoutePath.REPORT_CHANGES_GATEPOST]);
  }

  onRadioSelect(card: string, isSelect: boolean) {
    this.displayError = false;
    if (isSelect) {
      this.incomeChanges.push(card);
    } else {
      this.incomeChanges = this.incomeChanges.filter(c => c !== card);
    }
  }

  onNext() {
    if (this.incomeChanges.length) {
      this.incomeChanges = this.changes.filter(f => this.incomeChanges.includes(f));
      this.storeService.updateSelectedIncomeChanges(this.incomeChanges);
      const route = this.incomeChanges[0];
      // @ts-ignore
      this.router.navigate([RoutePath[route]]);
    } else {
      this.displayError = true;
    }
  }

}
