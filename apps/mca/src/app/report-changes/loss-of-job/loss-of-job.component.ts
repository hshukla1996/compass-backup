import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeReportStoreService } from '../../+state/store-service/change-report-store.service';
import { RefDataStoreService } from '../../+state/store-service/ref-data-store.service';
import { RoutePath } from '../../shared/route-strategies';
import { ReportChangesService } from '../report-changes.service';

@Component({
  selector: 'compass-ui-loss-of-job',
  templateUrl: './loss-of-job.component.html',
  styleUrls: ['./loss-of-job.component.css']
})
export class LossOfJobComponent implements OnInit {
  countyObj: any = {};
  county!: any;
  constructor(private router: Router, private reportChangesService: ReportChangesService,
    private refDatService: RefDataStoreService, private service: ChangeReportStoreService) { }

  ngOnInit(): void {
    this.county = this.service.getCounty();
    this.refDatService.initCountyOffices().subscribe((res) => {
      res.forEach(option => {
        const obj = this.countyObj[option.id] ? this.countyObj[option.id] : {};
        obj.officeName = option.displayValue;
        this.countyObj[option.id] = obj
      });
    })
    this.refDatService.initCountyOfficeAddress().subscribe((res) => {
      res.forEach(option => {
        const obj = this.countyObj[option.id] ? this.countyObj[option.id] : {};
        obj.address = option.displayValue;
        this.countyObj[option.id] = obj
      });
    })
    this.refDatService.initCountyEmail().subscribe((res) => {
      res.forEach(option => {
        const obj = this.countyObj[option.id] ? this.countyObj[option.id] : {};
        obj.email = option.displayValue;
        this.countyObj[option.id] = obj
      });
    })
    this.refDatService.initCountyFax().subscribe((res) => {
      res.forEach(option => {
        const obj = this.countyObj[option.id] ? this.countyObj[option.id] : {};
        obj.fax = option.displayValue;
        this.countyObj[option.id] = obj
      });
    })
    this.refDatService.initCountyPhone().subscribe((res) => {
      res.forEach(option => {
        const obj = this.countyObj[option.id] ? this.countyObj[option.id] : {};
        obj.phoneNumber = option.displayValue;
        this.countyObj[option.id] = obj
      });
    })

  }


  onBack() {
    this.router.navigate([RoutePath.INCOME_JOB_CHANGE]);
  }

  onNext() {
    this.reportChangesService.navigateToNextIncomeChange('LOSS_OF_JOB');
  }

}
