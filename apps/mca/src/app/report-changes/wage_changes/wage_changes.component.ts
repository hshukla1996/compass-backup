import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Utility } from '../../shared/utilities/Utility';
import { delay, of } from 'rxjs';
import { IChangeReportState, IEmploymentIncome, IIndividualInformation } from '../../+state/models/change-report/change-report.model';
import { ChangeReportStoreService } from '../../+state/store-service/change-report-store.service';
import { RefDataStoreService } from '../../+state/store-service/ref-data-store.service';
import { RoutePath } from '../../shared/route-strategies';
import { ReportChangesService } from '../report-changes.service';

@Component({
  selector: 'compass-ui-wage_changes',
  templateUrl: './wage_changes.component.html',
  styleUrls: ['./wage_changes.component.css']
})
export class WageChangesComponent implements OnInit {
  // wageChanges = new FormArray([]);
  // wageChangeForm: FormGroup | any;
  // changeReportState!: any;
  individualInformations!: IIndividualInformation[] | any;
  today = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
  pays: any[] = [];
  incomeFormIdx: any = {};
  employeeInfoCount = 0;
  constructor(private fb: FormBuilder, private router: Router, private cd: ChangeDetectorRef,
    private reportChangesService: ReportChangesService, private storeService: ChangeReportStoreService,
    private refService: RefDataStoreService) { }

  ngOnInit(): void {
    this.refService.initPays().subscribe((c) => {
      this.pays = c;
      this.cd.detectChanges();
    })
    this.individualInformations = this.storeService.getIndividualInformation();
    if (this.individualInformations?.length) {
      this.individualInformations.forEach((element: IIndividualInformation, index: number) => {
        const employmentIncomes = element.employmentInformation.employmentIncomes;
        if (employmentIncomes.length) {
          employmentIncomes.forEach((income: IEmploymentIncome, idx: number) => {
            const wageChangeForm = this.fb.group({
              name: ['TEST', [Validators.required]],
              changeDuration: ['', [Validators.required]],
              income: ['', [Validators.required]],
              hours: ['', [Validators.required]],
              changeDate: ['', [Validators.required]]
            });
            wageChangeForm.patchValue({
              name: income.employerName,
              changeDuration: income.incomeFrequency,
              income: income.grossIncome,
              hours: income.hoursWorked,
              changeDate: Utility.duetFormatDate(income.dateOfChange)
            });
            this.incomeFormIdx[index] = wageChangeForm;
          });
          this.employeeInfoCount += 1;
        } else {
          const wageChangeForm = this.fb.group({
            name: ['TEST', [Validators.required]],
            changeDuration: ['', [Validators.required]],
            income: ['', [Validators.required]],
            hours: ['', [Validators.required]],
            changeDate: ['', [Validators.required]]
          });
          // this.wageChanges.push(wageChangeForm);
          this.incomeFormIdx[index] = wageChangeForm;
        }
      });
    }
    this.cd.detectChanges();
  }

  onBack() {
    this.router.navigate([RoutePath.INCOME_JOB_CHANGE]);
  }

  onNext() {
    // this.reportChangesService.validateAllFormFields(this.wageChangeForm);
    // if(this.wageChangeForm.valid) {
    let invalidGroups = 0;
    for (let formGroup in this.incomeFormIdx) {
      this.reportChangesService.validateAllFormFields(this.incomeFormIdx[formGroup]);
      if (!this.incomeFormIdx[formGroup].valid) {
        invalidGroups += 1;
      }
    }
    if (invalidGroups === 0 && this.employeeInfoCount > 0) {
      const infos = this.individualInformations.map((indInfo: IIndividualInformation, index: number) => {
        const employmentIncomes: IEmploymentIncome[] = [];
        const formGroup = this.incomeFormIdx[index];
        const obj = {
          employerName: formGroup.get('name')?.value,
          incomeFrequency: formGroup.get('changeDuration')?.value,
          grossIncome: formGroup.get('income')?.value,
          hoursWorked: formGroup.get('hours')?.value,
          dateOfChange: formGroup.get('changeDate')?.value
        }
        employmentIncomes.push(obj);
        return {
          ...indInfo,
          employmentInformation: {
            ...indInfo.employmentInformation,
            employmentIncomes: employmentIncomes
          }
        }
      });
      this.storeService.updateIndividualInformation([...infos]);
      this.reportChangesService.navigateToNextIncomeChange('WAGE_CHANGES');
    } else if(this.employeeInfoCount === 0){
      this.reportChangesService.navigateToNextIncomeChange('WAGE_CHANGES');
    }
  }

  public restrictCurrency(e: any) {
    var charCode = (e.which) ? e.which : e.keyCode;

    if (charCode != 46 && charCode > 31

      && (charCode < 48 || charCode > 57)) {

      e.preventDefault();

      return false;

    }

    return true;

  }

  errorMap(field: string, i: number) {
    const form = this.incomeFormIdx[i];
    if (!this.isFieldValid(field, i)) {
      return ''

    }
    switch (field) {
      case "name":
        if (form.get(field)?.errors?.required) {
          return "No employee name is entered";
        }
        else {
          return 'Enter only alphabets.';
        }
        break;
      case "changeDuration":
        if (form.get(field)?.errors?.required) {
          return "No pay frequency option is selected from the dropdown";
        }
        break;
      case "income":
        if (form.get(field)?.errors?.required) {
          return "No gross income is entered";
        }
        break;
      case "hours":
        if (form.get(field)?.errors?.required) {
          return "No hours per week are entered";
        }
        break;
      case "changeDate":
        if (form.get(field)?.errors?.required) {
          return "No date is entered";
        }
        if (form.get(field)?.errors?.duetInvalidDate) {
          return "duetInvalidDate"
        }
        break;

      default:
        return "";
        break;
    }
    return "";
  }

  isFieldValid(field: string, i: number): boolean | undefined {
    const form = this.incomeFormIdx[i];
    return (form.get(field)?.status !== 'VALID' && (form.get(field)?.dirty || form.get(field)?.touched));
  }

}
