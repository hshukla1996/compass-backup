import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IIndividualInformation } from '../../+state/models/change-report/change-report.model';
import { ChangeReportStoreService } from '../../+state/store-service/change-report-store.service';
import { RoutePath } from '../../shared/route-strategies';
import { ReportChangesService } from '../report-changes.service';

@Component({
  selector: 'compass-ui-new-job-changes',
  templateUrl: './new-job-changes.component.html',
  styleUrls: ['./new-job-changes.component.css']
})
export class NewJobChangesComponent implements OnInit {
  displayError: boolean = false;
  individualInformations!: IIndividualInformation[] | any;
  formGroupObj: any = {};
  error: string = "Description is not entered";
  constructor(private router: Router, private fb: FormBuilder,
    private reportChangesService: ReportChangesService, private storeService: ChangeReportStoreService) { }

  ngOnInit(): void {
    this.individualInformations = this.storeService.getIndividualInformation();
    this.individualInformations.forEach((element: IIndividualInformation, index: number) => {
      const formGroup = this.fb.group({
        description: ['']
      });
      formGroup.get('description')?.setValue(element.employmentInformation.reportNewJob);
      this.formGroupObj[index] = formGroup;
    });
  }

  onBack() {
    this.router.navigate([RoutePath.INCOME_JOB_CHANGE]);
  }

  onNext() {
    // if(!this.newJobForm.get('description').value) {
    //   this.displayError = true;
    // } else {
    const infos = this.individualInformations.map((indInfo: IIndividualInformation, index: number) => {
      return {
        ...indInfo,
        employmentInformation: {
          ...indInfo.employmentInformation,
          reportNewJob: this.formGroupObj[index].get('description').value
        }
      }
    });

    this.storeService.updateIndividualInformation(infos);
    this.reportChangesService.navigateToNextIncomeChange('NEW_JOB_CHANGES');
  }
  // }

}
