import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { AppStoreService } from "../../../app-store-service";
import { RoutePath } from "../../../shared/route-strategies";
import { ApplyNowStoreService } from "../../apply-now-store-service";

@Component({
    selector: "compass-ui-upload-signature",
    templateUrl: "./upload-signature.component.html",
    styleUrls: ["./upload-signature.component.scss"],
})
export class UploadSignatureComponent implements OnInit {
    constructor(private fb: FormBuilder, private router: Router, private service: ApplyNowStoreService, private cd: ChangeDetectorRef, private appService: AppStoreService,) { }
    voterInfoFromState: any;
    showError= false;
    situationSelectedData: any;
    showFileName:any;
    ngOnInit() {
        this.voterInfoFromState = this.service.applyNow.voterRegistration;
        this.situationSelectedData = this.voterInfoFromState.votingApplicationType;
     }

    upload() { }

    next() { 
        this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_UPLOADSIGNATURESUMMARY]);   

    }
    checkFile(value:any){
        if (value == 'wrongfiletype'){
            this.showError= true  
        } else {
            console.log(value.name, "value")
            this.showFileName = value.name;
            this.showError = false  

        }
    }

    back() {
        if (this.voterInfoFromState.voterIndividual?.lastFourSsnDigits !== ""){
            this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_VERIFYSSN]);   

        } else if (this.voterInfoFromState.voterIndividual?.drivingLicenseOrStateId !== "") {
            this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_VERIFYDRIVERSLICENSE]);   

        } else {
            this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_SELECTIDENTITYVERIFYMETHOD]);   

            
        }
     }
}
