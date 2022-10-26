import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AppStoreService } from "../../../app-store-service";
import { RoutePath } from "../../../shared/route-strategies";
import { ApplyNowStoreService } from "../../apply-now-store-service";

@Component({
    selector: "compass-ui-registration-declarations",
    templateUrl: "./registration-declarations.component.html",
    styleUrls: ["./registration-declarations.component.scss"],
})
export class RegistrationDeclarationsComponent implements OnInit {
    termsConditions = false;
    displayError = false;
    errorMessage = "This is required."
    declarationsGroup: FormGroup | any;
    voterInfoFromState: any;
    situationSelectedData: any;
    constructor(private fb: FormBuilder, private router: Router, private service: ApplyNowStoreService, private cd: ChangeDetectorRef, private appService: AppStoreService,) { }


    ngOnInit() {
        this.declarationsGroup = this.fb.group({
            termsConditionstest: [false, Validators.requiredTrue],

        })
        this.voterInfoFromState = this.service.applyNow.voterRegistration; 
        if (this.voterInfoFromState.agreedTermsAndConditions  ){
            this.termsConditions = true;
        }
     }

    confirm(value: { checked: any; }) {
        if (value.checked) { 
            this.termsConditions = true;
            this.displayError = false
        } else {
            this.termsConditions = false;
            // this.displayError = true
        }

    }
    
    next() { 
        this.declarationsGroup.markAllAsTouched();
        console.log(this.declarationsGroup.get('termsConditionstest').value, "VALUE")
        if (this.termsConditions == false && this.declarationsGroup.get('termsConditionstest').value == false && this.voterInfoFromState.agreedTermsAndConditions == false) {
            this.displayError = true
            // this.cd.detectChanges();
            return
        }
        const termsAndConditions = {
            agreedTermsAndConditions: this.termsConditions
        }
        console.log(termsAndConditions, "termsAndConditions")
        const updatedVoterInfo = { ...this.service.applyNow.voterRegistration, ...termsAndConditions };
      
        this.service.updatedVoterRegistrationDetails(updatedVoterInfo) 
        this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_WHOFILLEDFORM]); 

    }

    back() {
        this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_POLITICALPARTY]); 

     }

     
}
