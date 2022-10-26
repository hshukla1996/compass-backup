import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AppStoreService } from "../../../app-store-service";
import { RoutePath } from "../../../shared/route-strategies";
import { ApplyNowStoreService } from "../../apply-now-store-service";

@Component({
    selector: "compass-ui-verify-drivers-license",
    templateUrl: "./verify-drivers-license.component.html",
    styleUrls: ["./verify-drivers-license.component.scss"],
})
export class VerifyDriversLicenseComponent implements OnInit {
    constructor(private fb: FormBuilder, private router: Router, private service: ApplyNowStoreService, private cd: ChangeDetectorRef, private appService: AppStoreService,) { }

    verifyLicenseGroup: FormGroup | any;
    voterInfoFromState: any;
    situationSelectedData: any;
    ngOnInit() { 
        this.verifyLicenseGroup = this.fb.group({
            cardNumber: ['', Validators.required],
        });
        this.voterInfoFromState = this.service.applyNow.voterRegistration;
        this.situationSelectedData = this.voterInfoFromState.votingApplicationType;
        console.log(this.voterInfoFromState, " this.voterInfoFromState")
        this.verifyLicenseGroup.get('cardNumber').patchValue(this.voterInfoFromState.voterIndividual.drivingLicenseOrStateId);
    }
    OnlyNumberAllowed(event: { which: any; keyCode: any }): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }
    isFieldValid(field: string): boolean {
        return (
            this.verifyLicenseGroup.get(field)?.status !== "VALID" &&
            this.verifyLicenseGroup.get(field)?.touched
        );
    }
    next() { 
        this.verifyLicenseGroup.markAllAsTouched();   
        const driversLicense = {
            drivingLicenseOrStateId: this.verifyLicenseGroup.get('cardNumber').value,
            doNotHaveDriverLicensOrSsnIndicator: "N",
            lastFourSsnDigits: ""
        } 
        console.log(this.verifyLicenseGroup, "this.verifyLicenseGroup")
        if (this.verifyLicenseGroup.valid){
            const storedVoterIndividual = this.service.applyNow.voterRegistration?.voterIndividual 
            const updatedVoterInfo = { ...this.service.applyNow.voterRegistration, voterIndividual: { ...storedVoterIndividual, ...driversLicense } };
            console.log(updatedVoterInfo, 'updatedVoterInfo');
            this.service.updatedVoterRegistrationDetails(updatedVoterInfo) 
           
            this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_UPLOADSIGNATURE]);    


        }
    }

    back() { 
        this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_SELECTIDENTITYVERIFYMETHOD]);   

    }
}
