import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, of } from 'rxjs';
import { IChangeReportState, IHouseholdContactInformation } from '../../+state/models/change-report/change-report.model';
import { ChangeReportStoreService } from '../../+state/store-service/change-report-store.service';
import { RoutePath } from '../../shared/route-strategies';
import { ReportChangesService } from '../report-changes.service';

@Component({
  selector: 'compass-ui-contact_information_change',
  templateUrl: './contact_information_change.component.html',
  styleUrls: ['./contact_information_change.component.css']
})
export class ContactInformationChangeComponent implements OnInit {
  contactChangeForm: FormGroup | any;
  changeReportState!: IChangeReportState;
  contactInformation!: IHouseholdContactInformation | any;
  displayError: boolean = false;
  error: string = "Email addresses are not matched ";
  constructor(private fb: FormBuilder, private router: Router,
    private reportChangeService: ReportChangesService, private storeService: ChangeReportStoreService) { }

  ngOnInit(): void {
    this.contactChangeForm = this.fb.group({
      email: '',
      confirmEmail: '',
      phoneNumber: '',
      secondContactNumber: '',
      otherContactNumber: '',
    });
    this.storeService.getAppData().subscribe((d) => {
      this.changeReportState = { ...d };
      this.contactInformation = this.changeReportState.householdInformation?.householdContactInformation;
      of(true)
        .pipe(delay(10))
        .subscribe(() => {
          this.contactChangeForm.patchValue({
            email: this.contactInformation?.emailAddress,
            confirmEmail: this.contactInformation?.reEnterEmailAddress,
            phoneNumber: this.contactInformation?.mainContactNumber.phoneNumber,
            secondContactNumber: this.contactInformation?.secondContactNumber.phoneNumber,
            otherContactNumber: this.contactInformation?.otherContactNumber.phoneNumber
          })
        })
      })
  }

  onNext() {
    if (this.contactChangeForm.get('email').value != this.contactChangeForm.get('confirmEmail').value) {
      this.displayError = true;
    } else {
      const contactDetails = {
        mainContactNumber: {
          phoneNumber: this.contactChangeForm.get('phoneNumber').value,
          isMobileNumber: true
        },
        secondContactNumber: {
          phoneNumber: this.contactChangeForm.get('secondContactNumber').value,
          isMobileNumber: false
        },
        otherContactNumber: {
          phoneNumber: this.contactChangeForm.get('otherContactNumber').value,
          isMobileNumber: false
        },
        emailAddress: this.contactChangeForm.get('email').value,
        reEnterEmailAddress: this.contactChangeForm.get('confirmEmail').value,
        bestTimeToContact: ""
      }
      this.storeService.updateContactDetails({
        ...contactDetails
      });
      this.reportChangeService.navigateToNextChange('CONTACT_INFORMATION_CHANGE');
    }
  }

  onBack() {
    this.router.navigate([RoutePath.REPORT_CHANGES_GATEPOST]);
  }

  onlyNumberAllowed(event: { which: any; keyCode: any }): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
