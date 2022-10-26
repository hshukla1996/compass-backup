import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { IApplyNowState } from "../../+state/apply-now.models";
import { AppStoreService } from "../../../app-store-service";
import { RoutePath } from "../../../shared/route-strategies";
import { ApplyNowStoreService } from "../../apply-now-store-service";

@Component({
    selector: "compass-ui-change-of-address",
    templateUrl: "./change-of-address.component.html",
    styleUrls: ["./change-of-address.component.scss"],
})
export class ChangeOfAddressComponent implements OnInit {
    changeOfAddressGroup!: FormGroup | any;
    states$: Observable<any> | undefined; 
    states: any;
    voterInfoFromState: any;
    situationSelectedData: any;
    @Input() fieldType: string = '';

    constructor(private fb: FormBuilder, private router: Router, private service: ApplyNowStoreService, private cd: ChangeDetectorRef, private appService: AppStoreService,) {}
 
    ngOnInit() {
        this.changeOfAddressGroup = this.fb.group({ 
            street: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zip: ['', Validators.required], 
        });
        this.states$ = this.appService.getStates();
        this.states$?.subscribe((s) => {
            this.states = s;
            console.log(this.states, "states")
            this.cd.detectChanges();
        });
        this.voterInfoFromState = this.service.applyNow.voterRegistration; 
        this.situationSelectedData = this.voterInfoFromState.votingApplicationType; 
        console.log(this.voterInfoFromState, " this.voterInfoFromState")
        this.changeOfAddressGroup.get("street").patchValue(this.voterInfoFromState.previousAddress.addressLine1);
        this.changeOfAddressGroup.get("city").patchValue(this.voterInfoFromState.previousAddress.city); 
        this.changeOfAddressGroup.get("state").patchValue(this.voterInfoFromState.previousAddress.state); 
        this.changeOfAddressGroup.get("zip").patchValue(this.voterInfoFromState.previousAddress.zip); 


    }

    checkChar(character: any) { 
        var k;
        k = character.charCode;
        return ((k > 64 && k < 91) || (k > 96 && k < 123) || (k > 47 && k < 58) || k == 46 || k == 35 || k == 41 || k == 40 || k == 38 || k == 64 || k == 39 || k == 92 || k == 45 || k==32||k==47||k==44);
        
    }

    checkCityChar(character: any){
        var k;
        k = character.charCode;
        return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 39 || k == 92 || k == 45 || k == 32);

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
            this.changeOfAddressGroup.get(field)?.status !== "VALID" &&
            this.changeOfAddressGroup.get(field)?.touched
        );
    }
    next() {
        this.changeOfAddressGroup.markAllAsTouched();
        if (this.changeOfAddressGroup.valid) { 
            const previousAddressInfo = {
                addressLine1: this.changeOfAddressGroup.get("street").value,
                city: this.changeOfAddressGroup.get("city").value,
                state: this.changeOfAddressGroup.get("state").value,
                zip: this.changeOfAddressGroup.get("zip").value,
            }
            const updatedVoterInfo = { 
                ...this.service.applyNow.voterRegistration,
                previousAddress: previousAddressInfo };
            this.service.updatedVoterRegistrationDetails( updatedVoterInfo) 
            if (this.situationSelectedData.indexOf('2') > -1) {
                console.log("if")
                this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_CHANGEOFNAME]);

            } else {
                this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_BASICDETAILS]); 
            }
        }



    }

    back() {
        this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_PREVIOUSREGISTRATION]); 

    }
}
