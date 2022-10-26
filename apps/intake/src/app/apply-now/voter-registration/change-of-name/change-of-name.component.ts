import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { IApplyNowState } from "../../+state/apply-now.models";
import { AppStoreService } from "../../../app-store-service";
import { RoutePath } from "../../../shared/route-strategies";
import { ApplyNowStoreService } from "../../apply-now-store-service";

@Component({
    selector: "compass-ui-change-of-name",
    templateUrl: "./change-of-name.component.html",
    styleUrls: ["./change-of-name.component.scss"],
})
export class ChangeOfNameComponent implements OnInit {
    constructor(private fb: FormBuilder, private router: Router, private service: ApplyNowStoreService, private cd: ChangeDetectorRef, private appService: AppStoreService,) { }

    changeOfNameGroup: FormGroup | any;
    voterInfoFromState: any;
    situationSelectedData: any;

   

    ngOnInit() {
        this.changeOfNameGroup = this.fb.group({ 
            previousFirstName: ['', Validators.required],
            previousLastName: ['', Validators.required], 
        });
        this.voterInfoFromState = this.service.applyNow.voterRegistration;
        this.situationSelectedData = this.voterInfoFromState.votingApplicationType;
        console.log(this.voterInfoFromState, " this.voterInfoFromState")
        this.changeOfNameGroup.get("previousFirstName").patchValue(this.voterInfoFromState.previousFirstName);
        this.changeOfNameGroup.get("previousLastName").patchValue(this.voterInfoFromState.previousLastName); 
     }
    isFieldValid(field: string): boolean {
        return (
            this.changeOfNameGroup.get(field)?.status !== "VALID" &&
            this.changeOfNameGroup.get(field)?.touched
        );
    }
    next() { 
        this.changeOfNameGroup.markAllAsTouched();
        if (this.changeOfNameGroup.valid) {
            const previousFirstAndLastName = {
                previousFirstName: this.changeOfNameGroup.get('previousFirstName').value,
                previousLastName: this.changeOfNameGroup.get('previousLastName').value,
            }
            const updatedVoterInfo = { ...this.service.applyNow.voterRegistration, ...previousFirstAndLastName };
            this.service.updatedVoterRegistrationDetails({ ...updatedVoterInfo }) 
            // if (this.situationSelectedData.situationSelected.indexOf('isAddressChange') > -1) {
            //     console.log("if")
            //     this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_CHANGEOFADDRESS]);

            // } else {
                this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_BASICDETAILS]);
            // }
        }
    }

    back() { 
        if (this.situationSelectedData.indexOf('3') > -1) {
            console.log("if")
            this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_CHANGEOFADDRESS]);

        } else if (this.situationSelectedData.indexOf('2') > -1){
            this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_PREVIOUSREGISTRATION]);

        }
        else {
            this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_SITUATIONGATEPOST]);
        }
    }
}
