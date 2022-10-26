import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AppStoreService } from "../../../app-store-service";
import { RoutePath } from "../../../shared/route-strategies";
import { ApplyNowStoreService } from "../../apply-now-store-service";

@Component({
    selector: "compass-ui-verify-ssn",
    templateUrl: "./verify-ssn.component.html",
    styleUrls: ["./verify-ssn.component.scss"],
})
export class VerifySsnComponent implements OnInit {
    constructor(private fb: FormBuilder, private router: Router, private service: ApplyNowStoreService, private cd: ChangeDetectorRef, private appService: AppStoreService,) { }

    verifySsnGroup: FormGroup | any;
    voterInfoFromState: any;
    situationSelectedData: any;
    ngOnInit() { 
        this.verifySsnGroup = this.fb.group({ 
            ssn4: ['', Validators.required], 
        });
        this.voterInfoFromState = this.service.applyNow.voterRegistration;
        this.situationSelectedData = this.voterInfoFromState.votingApplicationType;
        console.log(this.voterInfoFromState, " this.voterInfoFromState")
        this.verifySsnGroup.get('ssn4').patchValue(this.voterInfoFromState.voterIndividual.lastFourSsnDigits);
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
            this.verifySsnGroup.get(field)?.status !== "VALID" &&
            this.verifySsnGroup.get(field)?.touched
        );
    }
    next() {
        this.verifySsnGroup.markAllAsTouched();
        const lastFourSSN = {
            lastFourSsnDigits: this.verifySsnGroup.get('ssn4').value,
            doNotHaveDriverLicensOrSsnIndicator: "N", 
            drivingLicenseOrStateId: ""
        }
        if (this.verifySsnGroup.valid) {
            const storedVoterIndividual = this.service.applyNow.voterRegistration?.voterIndividual
            const updatedVoterInfo = { ...this.service.applyNow.voterRegistration, voterIndividual: { ...storedVoterIndividual, ...lastFourSSN } };
            console.log(updatedVoterInfo, 'updatedVoterInfo');
            this.service.updatedVoterRegistrationDetails(updatedVoterInfo) 
            this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_UPLOADSIGNATURE]);   


        }
     }

    back() { 
        this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_SELECTIDENTITYVERIFYMETHOD]);   

    }
}
