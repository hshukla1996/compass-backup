import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeReportStoreService } from '../../+state/store-service/change-report-store.service';
import { RoutePath } from '../../shared/route-strategies';
import { ReportChangesService } from '../report-changes.service';

@Component({
  selector: 'compass-ui-pregnancy_other_household_changes',
  templateUrl: './pregnancy_other_household_changes.component.html',
  styleUrls: ['./pregnancy_other_household_changes.component.css']
})
export class PregnancyOtherHouseholdComponent implements OnInit {
  selectedOptions: string[] = [];
  displayError: boolean = false;
  error: string = "None of the options are selected";
  options: string[] = ['PREGNANCY_DETAILS', 'OTHER_HOUSEHOLD_CHANGES'];
  constructor(private router: Router, private reportChangeService: ReportChangesService,
    private storeService: ChangeReportStoreService) { }

  ngOnInit(): void {
    if (this.reportChangeService.selectedHouseholdChanges) {
      this.selectedOptions = [...this.reportChangeService.selectedHouseholdChanges];
    }
  }

  onBack() {
    this.router.navigate([RoutePath.REPORT_CHANGES_GATEPOST]);
  }
  onRadioSelect(card: string, isSelect: boolean) {
    this.displayError = false;
    if (isSelect) {
      this.selectedOptions.push(card);
    } else {
      this.selectedOptions = this.selectedOptions.filter(c => c !== card);
    }
  }

  onNext() {
    if (this.selectedOptions.length) {
      this.selectedOptions = this.options.filter(c => this.selectedOptions.includes(c));
      this.storeService.updateSelectedHouseholdChanges(this.selectedOptions);
      const route = this.selectedOptions[0];
      // @ts-ignore
      this.router.navigate([RoutePath[route]]);
    } else {
      this.displayError = true;
    }
  }
  // onNext() {
  //   if (this.selectedOption === 'pregnancyChange') {
  //     this.router.navigate([RoutePath.PREGNANCY_DETAILS]);
  //   } else if (this.selectedOption === 'otherHouseholdChange') {
  //     this.router.navigate([RoutePath.OTHER_HOUSEHOLD_CHANGES]);
  //   } else {
  //     this.displayError = true;
  //   }
  // }

}
