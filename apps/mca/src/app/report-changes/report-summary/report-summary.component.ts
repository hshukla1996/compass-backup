import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IChangeReportState, IHouseHoldInformation, IIndividualInformation } from '../../+state/models/change-report/change-report.model';
import { ChangeReportStoreService } from '../../+state/store-service/change-report-store.service';
import { RefDataStoreService } from '../../+state/store-service/ref-data-store.service';
import { RoutePath } from '../../shared/route-strategies';
import { ReportChangesService } from '../report-changes.service';

@Component({
  selector: 'compass-ui-report-summary',
  templateUrl: './report-summary.component.html',
  styleUrls: ['./report-summary.component.css']
})
export class ReportSummarycomponent implements OnInit {
  changeReportState!: IChangeReportState;
  householdInformation!: IHouseHoldInformation | any;
  individualInformations!: IIndividualInformation[] | any;
  cancelCard!: string;
  countyObj: any = {};
  districtObj: any = {};
  townshipObj: any = {};
  payObj: any = {};
  loading = false;
  confirmModal = false;
  constructor(private router: Router, private storeService: ChangeReportStoreService,
    private refService: RefDataStoreService, private service: ReportChangesService) { }

  ngOnInit(): void {
    this.storeService.getAppData().subscribe((d) => {
      this.changeReportState = { ...d };
      this.householdInformation = this.changeReportState.householdInformation;
      this.individualInformations = this.changeReportState.individualInformation || [];
    });
    this.refService.initCounties().subscribe((c) => {
      c.forEach(county => this.countyObj[county.id] = county.displayValue);
    })
    this.refService.initPays().subscribe((c) => {
      c.forEach(option => this.payObj[option.id] = option.displayValue);
    });
    this.refService.initSchoolDistricts().subscribe((c) => {
      c.forEach(option => this.districtObj[option.id] = option.displayValue);
    });
    this.refService.initTownships().subscribe((c) => {
      c.forEach(option => this.townshipObj[option.id] = option.displayValue);
    });
  }


  onBack() {    
    this.confirmModal = true;
  }

  leave() {
    this.router.navigate([""]);
  }

  onEditNavigate(route: string) {
    // @ts-ignore
    this.router.navigate([RoutePath[route]]);
  }

  navigate() {
    this.router.navigate([''])
  }

  onCancel(card: string) {
    this.cancelCard = card;

  }

  onCancelModal() {
    this.cancelCard = '';
  }
  onConfirmModal() {
    let reportState = {...this.changeReportState};
    if (this.cancelCard === 'ADDRESS_CHANGE') {
      const householdInfo: any = {...this.householdInformation};
      delete householdInfo.mailingAddress;
      delete householdInfo.residentAddress;
      reportState = {
        ...reportState,
        householdInformation: householdInfo
      }
    } else if (this.cancelCard === 'CONTACT_INFORMATION_CHANGE') {
      const householdInfo: any = { ...this.householdInformation };
      delete householdInfo.householdContactInformation;
      reportState = {
        ...reportState,
        householdInformation: householdInfo
      }
    } else if (this.cancelCard === 'WAGE_CHANGES') {
      const indInfos = [ ...this.individualInformations ].map(info => {
        delete info.employmentInformation;
        return info;
      });
      reportState = {
        ...reportState,
        individualInformation: indInfos
      }
    } else if (this.cancelCard === 'PREGNANCY_OTHER_HOUSEHOLD') {
      const householdInfo: any = { ...this.householdInformation };
      const indInfos = [...this.individualInformations].map(info => {
        delete info.pregnancy;
        return info;
      });
      delete householdInfo.otherHouseholdChanges;
      reportState = {
        ...reportState,
        householdInformation: householdInfo,
        individualInformation: indInfos
      }
    } else if (this.cancelCard === 'HOUSING_UTILITIES_CHANGES') {
      const householdInfo: any = { ...this.householdInformation };     
      delete householdInfo.shelterAndUtilitiesExpense;
      reportState = {
        ...reportState,
        householdInformation: householdInfo
      }
    }
    else if (this.cancelCard === 'RESOURCE_CHANGES') {
      const householdInfo: any = { ...this.householdInformation };
      delete householdInfo.resources;
      reportState = {
        ...reportState,
        householdInformation: householdInfo
      }
    }
    else if (this.cancelCard === 'OTHER_COMMUNICATION_CHANGES') {
      const householdInfo: any = { ...this.householdInformation };
      delete householdInfo.otherCommunications;
      reportState = {
        ...reportState,
        householdInformation: householdInfo
      }
    }
    this.storeService.updateChangeReportState(reportState);
    this.cancelCard = '';
  }

  attachSubmit() {
    this.router.navigate([RoutePath.UPLOAD_GATEPOST])
  }

  onSubmit() {
    this.storeService.getAppData().subscribe((d) => {
      const reportData = { ...d };
      delete reportData.selectedChanges;
      delete reportData.selectedHouseholdChanges;
      delete reportData.selectedIncomeChanges;
      this.loading = true;
      this.service.saveReportChanges(reportData).subscribe(res => {
        this.loading = false;
        this.router.navigate([RoutePath.REPORT_CHANGES]);
      })
    });
  }

}
