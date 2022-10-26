import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutePath } from '../../shared/route-strategies';
import { ReportChangesService } from '../report-changes.service';
import { ChangeReportStoreService } from '../../+state/store-service/change-report-store.service';
import { IHouseHoldInformation, IShelterAndUtilitiesExpense } from '../../+state/models/change-report/change-report.model';
import { of } from 'rxjs';

@Component({
  selector: 'compass-ui-housing-utilities-changes',
  templateUrl: './housing-utilities-changes.component.html',
  styleUrls: ['./housing-utilities-changes.component.css']
})
export class HousingUtilitiesChangesComponent implements OnInit {
  selectedBills: string[] = [];
  incomeForm: FormGroup | any;
  displayError: boolean = false;
  error: string = "None of the options are selected";
  expenseUtilitiesState!: IShelterAndUtilitiesExpense;
  householdInformation!: IHouseHoldInformation | any;
  displayDescError: boolean = false;
  descError: string = "No other utilities are description is entered";
  constructor(private router: Router, private fb: FormBuilder, private reportChangesService: ReportChangesService,
     private storeService: ChangeReportStoreService) { }

  ngOnInit(): void {
    this.incomeForm = this.fb.group({
      description: ['', [Validators.required]],
      grossAmount: ['']      
    });
    this.incomeForm.
      patchValue({
        grossAmount: this.storeService.getShelterAndUtilityDetails()?.mortgageOrRentAmount,
        description: this.storeService.getShelterAndUtilityDetails()?.otherTypeComments
      })
    if (this.storeService.getShelterAndUtilityDetails()?.isHeatingAndCoolingType){
      this.selectedBills.push('heating');
    }
    if (this.storeService.getShelterAndUtilityDetails()?.isGasType) {
      this.selectedBills.push('gas');
    }
    if (this.storeService.getShelterAndUtilityDetails()?.isElectricType) {
      this.selectedBills.push('electric');
    }
    if (this.storeService.getShelterAndUtilityDetails()?.isPhoneAndInternetType) {
      this.selectedBills.push('phone');
    }
    if (this.storeService.getShelterAndUtilityDetails()?.isOtherType) {
      this.selectedBills.push('other');
    }

  }


  onBack() {
    this.router.navigate([RoutePath.REPORT_CHANGES_GATEPOST]);
  }

  onNext() {

    if (!this.selectedBills.length) {
      this.displayError = true;
      return;
    }

    if (this.selectedBills.includes('other') && !this.incomeForm.valid) {
      this.displayDescError = true;
      return;
    }
    const updateUtilitiesDetails = {
      mortgageOrRentAmount:
        this.incomeForm.get("grossAmount").value,
      isHeatingAndCoolingType: this.selectedBills.includes('heating'),
      isGasType: this.selectedBills.includes('gas'),
      isElectricType: this.selectedBills.includes('electric'),
      isPhoneAndInternetType: this.selectedBills.includes('phone'),
      isOtherType: this.selectedBills.includes('other'),
      otherTypeComments: this.incomeForm.get("description").value
    }
    const updatedHousehold: any = {
      residentAddress: this.householdInformation?.residentAddress,
      mailingAddress: this.householdInformation?.mailingAddress,
      householdContactInformation: this.householdInformation?.householdContactInformation,
      shelterAndUtilitiesExpense: updateUtilitiesDetails,
      resources: this.householdInformation?.resources,
      otherCommunications: this.householdInformation?.otherCommunications
    };
    this.storeService.updateHouseHoldDetails({
      ...updatedHousehold
    });

    this.reportChangesService.navigateToNextChange('HOUSING_UTILITIES_CHANGES');

  }

  onCheckboxChange(billType: string) {
    if (this.selectedBills.includes(billType)) {
      this.selectedBills = this.selectedBills.filter(bill => bill != billType);
    } else {
      this.selectedBills.push(billType)
    }
  }
  onCheckboxChangeHeating(val: string, e: any) {
    //debugger
  }

}
