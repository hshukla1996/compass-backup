import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILiheapCrisis } from '../../+state/models/change-report/change-report.model';
import { ChangeReportStoreService } from '../../+state/store-service/change-report-store.service';
import { RoutePath } from '../../shared/route-strategies';
import { ReportChangesService } from '../report-changes.service';

@Component({
  selector: 'compass-ui-emergency-situations',
  templateUrl: './emergency-situations.component.html',
  styleUrls: ['./emergency-situations.component.css']
})
export class EmergencySituationsComponent implements OnInit {
  form: FormGroup | any;
  liheapCrisis!: ILiheapCrisis | any;
  constructor(private router: Router, private fb: FormBuilder, 
    private reportChangeService: ReportChangesService, private storeService: ChangeReportStoreService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
        isEmergencySituation: ['', [Validators.required]]
    });
    this.liheapCrisis = this.storeService.getILiheapCrisis();
    this.form.get('isEmergencySituation').setValue(this.liheapCrisis.isEmergencySituation ? 'Yes' : null)
  }

  isFieldValid(field: string): boolean {
    return (this.form.get(field).status !== 'VALID' && (this.form.get(field).dirty || this.form.get(field).touched))

  }

  errorMap(field: string) {
    if (!this.isFieldValid(field)) {
      return '';
    }
    switch (field) {
      case "isEmergencySituation":
        if (this.form.get(field).errors?.required) {
          return "The question is not answered";
        }
        break;
      }
    return "";
  }

  onBack() {
    this.router.navigate([RoutePath.CRISIS_START]);
  }

  onNext() {
    this.reportChangeService.validateAllFormFields(this.form);
    if(this.form.valid) {
      const updatedLiheapCrisis = {
        ...this.liheapCrisis,
        isEmergencySituation: this.form.get('isEmergencySituation').value === 'Yes' ? true : false
      }
      this.storeService.updateILiheapCrisis({
        ...updatedLiheapCrisis
      });
      this.router.navigate([RoutePath.LIHEAP_CONFIRMATION]);
    }
  }

}
