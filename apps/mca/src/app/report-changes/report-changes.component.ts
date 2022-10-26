import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IChangeReportState, REPORT_DATA } from '../+state/models/change-report/change-report.model';
import { ChangeReportStoreService } from '../+state/store-service/change-report-store.service';
import { RefDataStoreService } from '../+state/store-service/ref-data-store.service';
import { RoutePath } from '../shared/route-strategies';
import { ReportChangesService } from './report-changes.service';

@Component({
  selector: 'compass-ui-report-changes',
  templateUrl: './report-changes.component.html',
  styleUrls: ['./report-changes.component.css']
})
export class ReportChangesComponent implements OnInit {
  pillExpandIndex = -1;
  caseDetails: any = {};
  loading = true;
  countyObj: any = {};
  districtObj: any = {};
  selectedCaseNo: number = 1;
  ticketHistory: any[] = [];
  scannedDocHistory: any[] = [];
  ticketPageSize = 5;
  ticketPage = 1;
  ticketTotalPages = 0;
  showAlert = false;
  constructor(private router: Router, private reportService: ReportChangesService,
    private storeService: ChangeReportStoreService, private refService: RefDataStoreService) {
      if (this.reportService.getPreviousUrl() && this.reportService.getPreviousUrl().includes(RoutePath.REPORT_SUMMARY)) {
        this.showAlert = true;
      }
     }

  ngOnInit(): void {
    this.reportService.getCaseInformation().subscribe(res => {
      this.caseDetails = res;
      this.loading = false;
    });
    this.refService.initCounties().subscribe((c) => {
      c.forEach(county => this.countyObj[county.id] = county.displayValue);
    })
    this.refService.initSchoolDistricts().subscribe((c) => {
      c.forEach(option => this.districtObj[option.id] = option.displayValue);
    });
  }

  onPillClick(index: number){
    this.pillExpandIndex = this.pillExpandIndex === index ? -1 : index;
  }

  onSelectCase(caseInfo: any){    
    this.selectedCaseNo = caseInfo.caseNumber;
    this.loading = true;
    let ticketLoaded = false, docLoaded = false;
    this.reportService.getTickets({ caseNumber: 0 }).subscribe(res => {
      ticketLoaded = true;
      if(docLoaded) {
        this.loading = false;
      }
      this.ticketHistory = res;
     this.ticketTotalPages = Math.ceil(this.ticketHistory.length/this.ticketPageSize);
    })
    this.reportService.getScannedDocuments({ caseNumber: 0 }).subscribe(res => {
      docLoaded = true;
      this.scannedDocHistory = res;
      if(ticketLoaded) {
        this.loading = false;
      }
    })

    const caseData = { ...caseInfo };

    caseData.individualInformation = [...caseData.individualsInformation];
    caseData.headOfHousehold = caseData.headOfHouseholdName;

    delete caseData.individualsInformation;
    delete caseData.headOfHouseholdName;
    
    this.storeService.updateChangeReportState(caseData);
  }

  viewTicketDetails(ticket: any) {  
    this.router.navigate([RoutePath.VIEW_TICKET_DETAILS], {queryParams: {ticketNumber: 0}});
  }

  navigateToGatepost() { 
    // this.storeService.updateChangeReportState(REPORT_DATA);
    this.router.navigate([RoutePath.REPORT_CHANGES_GATEPOST]);
  }

  uploadDoc(){
    this.router.navigate([RoutePath.UPLOAD_GATEPOST]);
  }

  navigate() {
    this.router.navigate([''])
  }

}
