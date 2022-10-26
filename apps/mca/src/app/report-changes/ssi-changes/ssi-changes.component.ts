import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IIndividualInformation } from '../../+state/models/change-report/change-report.model';
import { ChangeReportStoreService } from '../../+state/store-service/change-report-store.service';
import { RefDataStoreService } from '../../+state/store-service/ref-data-store.service';
import { RoutePath } from '../../shared/route-strategies';
import { ReportChangesService } from '../report-changes.service';

@Component({
  selector: 'compass-ui-ssi-changes',
  templateUrl: './ssi-changes.component.html',
  styleUrls: ['./ssi-changes.component.css']
})
export class SSIChangesComponent implements OnInit {

  individualInformations!: IIndividualInformation[] | any;
  pays: any[] = [];
  formGroupObj: any = {};
  constructor(private router: Router, private fb: FormBuilder, private refService: RefDataStoreService,
    private reportChangesService: ReportChangesService, private storeService: ChangeReportStoreService) { }

  ngOnInit(): void {
    this.refService.initPays().subscribe((c) => {
      this.pays = c;
    });
    this.individualInformations = this.storeService.getIndividualInformation();
    this.individualInformations.forEach((element: IIndividualInformation, index: number) => {
      const formGroup = this.fb.group({
        frequency: ['', [Validators.required]],
        grossAmount: ['', [Validators.required]],
      });
      formGroup.get('frequency')?.setValue(element.employmentInformation?.socialSecurityIncome?.frequency);
      formGroup.get('grossAmount')?.setValue(element.employmentInformation?.socialSecurityIncome?.grossAmount);
      this.formGroupObj[index] = formGroup;
    });
  }

  onBack() {
    this.router.navigate([RoutePath.INCOME_JOB_CHANGE]);
  }

  errorMap(field: string, index: number) {
    const form = this.formGroupObj[index];
    if (!this.isFieldValid(field, index)) {
      return ''

    }
    switch (field) {
      case "frequency":
        if (form.get(field).errors?.required) {
          return "No frequency option is selected from the dropdown";
        }
        break;
      case "grossAmount":
        if (form.get(field).errors?.required) {
          return "No gross amount is entered";
        }
        break;
      default:
        return "";
        break;
    }
    return "";
  }

  isFieldValid(field: string, index: number): boolean {
    return (this.formGroupObj[index]?.get(field).status !== 'VALID' && (this.formGroupObj[index]?.get(field).dirty || this.formGroupObj[index]?.get(field).touched));
  }

  onNext() {
    let invalidGroups = 0;
    for (let formGroup in this.formGroupObj) {
      this.reportChangesService.validateAllFormFields(this.formGroupObj[formGroup]);
      if (!this.formGroupObj[formGroup].valid) {
        invalidGroups += 1;
      }
    }
    if (invalidGroups === 0) {
      const infos = this.individualInformations.map((indInfo: IIndividualInformation, index: number) => {
        return {
          ...indInfo,
          employmentInformation: {
            ...indInfo.employmentInformation,
            socialSecurityIncome: {
              frequency: this.formGroupObj[index].get('frequency').value,
              grossAmount: this.formGroupObj[index].get('grossAmount').value,
            }
          }
        }
      });
      this.storeService.updateIndividualInformation(infos);
      this.reportChangesService.navigateToNextIncomeChange('SSI_CHANGES');
    }
  }
}
