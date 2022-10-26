import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangeReportStoreService } from '../../+state/store-service/change-report-store.service';
import { RoutePath } from '../../shared/route-strategies';
import { ReportChangesService } from '../report-changes.service';

@Component({
  selector: 'compass-ui-other-communication-changes',
  templateUrl: './other-communication-changes.component.html',
  styleUrls: ['./other-communication-changes.component.css']
})
export class OtherCommunicationChangesComponent implements OnInit {
  changeForm: FormGroup | any;
  displayError: boolean = false;
  error: string = "No description is entered";
  constructor(private router: Router, private fb: FormBuilder, private reportChangesService: ReportChangesService, private storeService: ChangeReportStoreService) { }

  ngOnInit(): void {
    this.changeForm = this.fb.group({
      description: ['']
    });
    const otherCommunication = this.storeService.getOtherCommunicationChanges();
    this.changeForm.get('description').patchValue(otherCommunication)
  }

  back() {
    this.router.navigate([RoutePath.REPORT_CHANGES_GATEPOST]);
  }
  next() {
    if (!this.changeForm.get('description').value) {
      this.displayError = true;
    } else {

      this.storeService.updateOtherCommunication(this.changeForm.get('description').value);
      this.reportChangesService.navigateToNextChange('OTHER_COMMUNICATION_CHANGES');
    }
  }


}
