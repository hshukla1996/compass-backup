import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { IApplyNowState, IVoterRegistration } from "../../+state/apply-now.models";
import { RoutePath } from "../../../shared/route-strategies";
import { ApplyNowStoreService } from "../../apply-now-store-service";

@Component({
    selector: "compass-ui-previous-registration",
    templateUrl: "./previous-registration.component.html",
    styleUrls: ["./previous-registration.component.scss"],
})
export class PreviousRegistrationComponent implements OnInit {
    constructor(private fb: FormBuilder, private router: Router, private service: ApplyNowStoreService,) { }

    previousRegistrationGroup!: FormGroup | any;
    voterInfoFromState: any;
    situationSelectedData:any;
    ngOnInit() {
        this.previousRegistrationGroup = this.fb.group({

            registrationNumber: ['',],
            registrationYear: ['',]

        });
        this.voterInfoFromState = this.service.applyNow.voterRegistration;
        this.situationSelectedData = this.voterInfoFromState.votingApplicationType;
        console.log(this.voterInfoFromState, " this.voterInfoFromState")
 
        this.previousRegistrationGroup.get("registrationNumber").patchValue(this.voterInfoFromState.previousRegistrationNumber); 
        this.previousRegistrationGroup.get("registrationYear").patchValue(this.voterInfoFromState.previousRegistrationYear); 

     }

    OnlyNumberAllowed(event: { which: any; keyCode: any }): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }
    next() { 
        const registrationNumYear = {
            previousRegistrationNumber: this.previousRegistrationGroup.get('registrationNumber').value,
            previousRegistrationYear: this.previousRegistrationGroup.get('registrationYear').value,
        }
        const updatedVoterInfo = { ...this.service.applyNow.voterRegistration, ...registrationNumYear };
        this.service.updatedVoterRegistrationDetails({ ...updatedVoterInfo }) 
        if (this.situationSelectedData.indexOf('3') > -1) { 
            this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_CHANGEOFADDRESS]);  
        } else if (this.situationSelectedData.indexOf('2') > -1) {  
            this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_CHANGEOFNAME]); 
        } else {
            this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_BASICDETAILS]); 

        }
        
    }

    back() {
        this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_SITUATIONGATEPOST]); 

     }
}
