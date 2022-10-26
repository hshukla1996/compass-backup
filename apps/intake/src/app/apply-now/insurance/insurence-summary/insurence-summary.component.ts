import { Component} from "@angular/core";
import { Router } from "@angular/router";
import { RoutePath } from "../../../shared/route-strategies";

@Component({
	selector: 'ui-compass-insurence-summary',
	templateUrl: './insurence-summary.component.html',
	styleUrls: ['./insurence-summary.component.css']
})
export class InsurenceSummaryComponent {
  constructor(private router: Router) { 
  }
  previous() {
    this.router.navigate([RoutePath.APPLYNOW, RoutePath.APPLYNOW_INSURANCE, RoutePath.APPLYNOW_INSURANCE_LOST_MEDICAL_SUMMARY]);
  }
  onSubmit(): void {
    this.router.navigate([RoutePath.APPLYNOW, RoutePath.APPLYNOW_INSURANCE, RoutePath.APPLYNOW_INSURANCE_INSURANCEENDING]);
  }
  addEmployer() {
	  
  }
}	