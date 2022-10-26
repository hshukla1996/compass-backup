import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IChangeReportState, IHouseHoldInformation } from '../../+state/models/change-report/change-report.model';
import { ChangeReportStoreService } from '../../+state/store-service/change-report-store.service';
import { RoutePath } from '../../shared/route-strategies';
import { ReportChangesService } from '../report-changes.service';

@Component({
  selector: 'compass-ui-address-select',
  templateUrl: './address-select.component.html',
  styleUrls: ['./address-select.component.css']
})
export class AddressSelectComponent implements OnInit {
  selectedResidentailAddress!: string;
  selectedMailAddress!: string;
  displayError: boolean = false;
  changeReportState!: IChangeReportState;
  householdInformation!: IHouseHoldInformation | any;
  error: string = "None of the options are selected";
  constructor(private router: Router, private reportChangeService: ReportChangesService,
    private storeService: ChangeReportStoreService) { }

  ngOnInit(): void {
    this.storeService.getAppData().subscribe((d) => {
      this.changeReportState = { ...d };
      this.householdInformation = this.changeReportState.householdInformation;
      this.selectedResidentailAddress = this.householdInformation.residentAddress.isMailingAddress ? 'custom' : 'usps';
      this.selectedMailAddress = this.householdInformation.mailingAddress.isMailingAddress ? 'custom' : 'usps';
    });
  }

  onSelectResidential(addressType: string) {
    this.selectedResidentailAddress = addressType;
    this.displayError = false;
  }

  onSelectMailing(addressType: string) {
    this.selectedMailAddress = addressType;
    this.displayError = false;
  }

  onNext() {
    if (!this.selectedMailAddress && !this.selectedResidentailAddress) {
      this.displayError = true;
      return;
    }
    const mailingAddress = {
      ...this.householdInformation.mailingAddress,
      isMailingAddress: this.selectedMailAddress === 'custom' ? true : false
    };
    const residentAddress = {
      ...this.householdInformation.residentAddress,
      isMailingAddress: this.selectedResidentailAddress === 'custom' ? true : false
    }
    this.storeService.updateResidentAddress({
      ...residentAddress
    })
    this.storeService.updateMailingAddress({
      ...mailingAddress
    });
    this.reportChangeService.navigateToNextChange('ADDRESS_CHANGE');
  }


  onBack() {
    this.router.navigate([RoutePath.ADDRESS_CHANGE]);
  }

}
