import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutePath } from '../../shared/route-strategies';
import { ReportChangesService } from '../report-changes.service';
import { ChangeReportStoreService } from '../../+state/store-service/change-report-store.service';
import { IChangeReportState, IProviders } from '../../+state/models/change-report/change-report.model';
import { of } from 'rxjs';

@Component({
  selector: 'compass-ui-resource-changes',
  templateUrl: './resource-changes.component.html',
  styleUrls: ['./resource-changes.component.css']
})
export class ResourceChangesComponent implements OnInit {
  resourceChangeForm: FormGroup | any;
  displayError: boolean = false;
  changeReportState!: IChangeReportState;
  iProvider!: IProviders | any;
  resourceProvider!: IProviders | any;
  error: string = "No description is entered for the household resource changes";
  constructor(private router: Router, private fb: FormBuilder, private reportChangesService: ReportChangesService, private storeService: ChangeReportStoreService) { }

  ngOnInit(): void {
    this.resourceChangeForm = this.fb.group({
      description: ['']
    });
    const description = this.storeService.getDescription();
    this.resourceChangeForm.get('description').patchValue(description)

  }

  back() {
    this.router.navigate([RoutePath.REPORT_CHANGES_GATEPOST]);
  }
  next() {
    if (!this.resourceChangeForm.get('description').value) {
      this.displayError = true;
    }
    else {
      const resourceDetails = {
        description: this.resourceChangeForm.get('description').value,
        providerId: 0,
        providerName: null,
        providerType: null,
        accountNumber: null,
        legalEntityId: null,
        serviceLocationId: null,
        isPrimary: null,
        isDirectPay: null,
        heatingSourceCode: null,
        heatingSource: null,
        individualIdLinkedToAccount: 0,
        paymentName: null,
        isShutOffOrRanOutOfFuel: null,
        haveShutOffNoticeOrWillRunOutOfFuel: null,
        heatingSourceNotWorking: null,
        shutOffNoticeDate: '',
        daysOfFuelLeft: 0,
        phoneNumber: '',
        bestWayToContact: ''
      }
      console.log("description: value " + resourceDetails);
      this.storeService.updateResourceDetails(this.resourceChangeForm.get('description').value);
      this.reportChangesService.navigateToNextChange('RESOURCE_CHANGES');
    }
  }

}
