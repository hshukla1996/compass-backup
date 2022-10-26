import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AppStoreService } from "../../../app-store-service";
import { RoutePath } from "../../../shared/route-strategies";
import { ApplyNowStoreService } from "../../apply-now-store-service";

@Component({
    selector: "compass-ui-select-identity-verify-method",
    templateUrl: "./select-identity-verify-method.component.html",
    styleUrls: ["./select-identity-verify-method.component.scss"],
})
export class SelectIdentityVerifyMethodComponent implements OnInit {
    constructor(private fb: FormBuilder, private router: Router, private service: ApplyNowStoreService, private cd: ChangeDetectorRef, private appService: AppStoreService,) { }
    displayError: boolean = false;
    error: string = "This is required.";
    selectMethodGroup: FormGroup | any;
    radioValues:any;
    voterInfoFromState: any;
    situationSelectedData: any;
    ngOnInit() {
        this.selectMethodGroup = this.fb.group({
            method: new FormControl("", Validators.required), 

        });
        this.voterInfoFromState = this.service.applyNow.voterRegistration;
        this.situationSelectedData = this.voterInfoFromState.votingApplicationType;
        console.log(this.voterInfoFromState, " this.voterInfoFromState")
        if(this.voterInfoFromState.voterIndividual.drivingLicenseOrStateId) {
            this.radioValues = "license" 
        }
      }
    onradioCheck(value: any) {
        if (value == "license") {
            this.radioValues = "license" 
        } else if (value == "ssn") {
            this.radioValues = "ssn" 
        } else if (value == "neither") {
            this.radioValues = "neither"

        }


    }
    next() {
        console.log("this.selectMethodGroup.controls.method.value", this.selectMethodGroup.controls.method.value)
        
        if (this.radioValues == "license") { 
            this.displayError = false 
            this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_VERIFYDRIVERSLICENSE]);  
        } else if (this.radioValues == "ssn"){
            this.displayError = false 
            this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_VERIFYSSN]);   
        }
        else if (this.radioValues == "neither") {
            this.displayError = false;
            const driversLicense = {
                drivingLicenseOrStateId: "",
                doNotHaveDriverLicensOrSsnIndicator: "Y",
                lastFourSsnDigits: ""
            } 
            const storedVoterIndividual = this.service.applyNow.voterRegistration?.voterIndividual
            const updatedVoterInfo = { ...this.service.applyNow.voterRegistration, voterIndividual: { ...storedVoterIndividual, ...driversLicense } };
            this.service.updatedVoterRegistrationDetails(updatedVoterInfo)

            this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_UPLOADSIGNATURE]);  

        } else {
            this.displayError = true
        }
        

     }

    back() { 
        this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_RESIDENTIALADDRESS]); 

    }
}
