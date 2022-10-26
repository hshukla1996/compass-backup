import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RefDataStoreService } from '../../+state/store-service/ref-data-store.service';
import { RoutePath } from '../../shared/route-strategies';
import { ReportChangesService } from '../report-changes.service';

@Component({
  selector: 'compass-ui-view-ticket-details',
  templateUrl: './view-ticket-details.component.html',
  styleUrls: ['./view-ticket-details.component.css']
})
export class ViewTicketDetailsComponent implements OnInit {
  loading = true;
  ticketInfo: any = {};
  countyObj: any = {};
  districtObj: any = {};
  townshipObj: any = {};
  constructor(private router: Router, private route: ActivatedRoute,
    private reportService: ReportChangesService, private refService: RefDataStoreService) { }

  ngOnInit(): void { 
    this.reportService.getTicketDetail({ ticketNumber: this.route.snapshot.queryParamMap.get('ticketNumber') }).subscribe(res => {
      this.loading = false;
      this.ticketInfo = res;
     });
    this.refService.initCounties().subscribe((c) => {
      c.forEach(county => this.countyObj[county.id] = county.displayValue);
    })
    this.refService.initSchoolDistricts().subscribe((c) => {
      c.forEach(option => this.districtObj[option.id] = option.displayValue);
    });
    this.refService.initTownships().subscribe((c) => {
      c.forEach(option => this.townshipObj[option.id] = option.displayValue);
    });
  }

  back() {
    this.router.navigate([RoutePath.REPORT_CHANGES])
  }

  navigate() {
    this.router.navigate([''])
  }

}
