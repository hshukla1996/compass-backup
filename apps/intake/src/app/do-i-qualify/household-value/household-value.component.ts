import { TotalHouseHoldValue } from '../+state/do-i-qualify.models';
import {  Component,   OnDestroy, OnInit } from '@angular/core';
import { MenuItemState } from '../../shared/menu-item-state';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { RoutePath } from '../../shared/route-strategies';
import { Router } from '@angular/router';
import { DoIQualifyStoreService } from '../do-i-qualify-store-service';
import { Utility } from '../../shared/utilities/Utility';


@Component({
  selector: 'compass-ui-household-value',
  templateUrl: './household-value.component.html',
  styleUrls: ['./household-value.component.scss']
})
export class HouseholdValueComponent implements OnInit {

  totalValue: FormGroup | any;
  doIQualifyState:any;
  constructor(private formBuilder: FormBuilder, private router: Router, private doIQualifyService: DoIQualifyStoreService) {
    this.totalValue = this.formBuilder.group({
      total: new FormControl(null, [Utility.maxAmountValidator(9999999.99)])
    });

  }





  ngOnInit(): void {
 
    const value = this.doIQualifyService.getHouseHoldValue();
    this.totalValue.patchValue({ total: value})

    this.doIQualifyService.formStateUpdated(RoutePath.DOIQUALIFY_HOUSEHOLDVALUE, MenuItemState.INPROGRESS);
  
  }
  back(){
    this.router.navigate([
      RoutePath.DOIQUALIFY + "/" + RoutePath.DOIQUALIFY_PROGRAMSELECTION,
    ]);
  }
  next(){
    if (!this.totalValue.valid)return
    this.doIQualifyService.houseHoldValueUpdated({ totalvalue: this.totalValue.controls['total'].value } as TotalHouseHoldValue);
    this.router.navigate([
      RoutePath.DOIQUALIFY + "/" + RoutePath.DOIQUALIFY_OTHERHOUSEHOLDSITUATIONS,
    ]);
  }

  ngOnDestroy(): void {

    this.doIQualifyService.formStateUpdated(RoutePath.DOIQUALIFY_HOUSEHOLDVALUE, MenuItemState.COMPLETED);

  }
}
