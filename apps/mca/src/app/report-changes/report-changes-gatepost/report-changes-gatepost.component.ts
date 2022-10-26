import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeReportStoreService } from '../../+state/store-service/change-report-store.service';
import { RoutePath } from '../../shared/route-strategies';
import { ReportChangesService } from '../report-changes.service';

@Component({
  selector: 'compass-ui-report-changes-gatepost',
  templateUrl: './report-changes-gatepost.component.html',
  styleUrls: ['./report-changes-gatepost.component.css']
})
export class ReportChangesGatepostComponent implements OnInit {
  selectedCards: string[] = [];
  isLiheapCrisisSelected = false;
  displayError: boolean = false;
  error: string = "None of the options are selected";
  changes: string[] = ['ADDRESS_CHANGE', 'CONTACT_INFORMATION_CHANGE', 'INCOME_JOB_CHANGE', 'PREGNANCY_OTHER_HOUSEHOLD',
    'HOUSING_UTILITIES_CHANGES', 'RESOURCE_CHANGES', 'OTHER_COMMUNICATION_CHANGES'];
  constructor(private router: Router, private reportChangeService: ReportChangesService,
    private storeService: ChangeReportStoreService) { }

  ngOnInit(): void {
    if (this.reportChangeService.selectedChanges) {
      this.selectedCards = [...this.reportChangeService.selectedChanges];
    }
  }

  onCardSelect(card: string) {
    this.displayError = false;
    this.isLiheapCrisisSelected = false;
    if(this.selectedCards.includes(card)) {
      this.selectedCards = this.selectedCards.filter(c => c !== card);
    } else {
      this.selectedCards.push(card);
    }
  }

  back() {
    this.router.navigate([RoutePath.REPORT_CHANGES]);
  } 

  next() {
    if (!this.selectedCards.length && !this.isLiheapCrisisSelected) {
      this.displayError = true;
    }    
    // To maintain the order created all changes
    this.selectedCards = this.changes.filter(c => this.selectedCards.includes(c));
    this.storeService.updateSelectedChanges(this.selectedCards);
    if (this.isLiheapCrisisSelected) {
      this.router.navigate([RoutePath.CRISIS_START]);
    } else {
      const route = this.selectedCards[0];
      // @ts-ignore
      this.router.navigate([RoutePath[route]]); 
    }
  }

}
