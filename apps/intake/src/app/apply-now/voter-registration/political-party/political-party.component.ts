import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AppStoreService } from "../../../app-store-service";
import { RoutePath } from "../../../shared/route-strategies";
import { ApplyNowStoreService } from "../../apply-now-store-service";

@Component({
    selector: "compass-ui-political-party",
    templateUrl: "./political-party.component.html",
    styleUrls: ["./political-party.component.scss"],
})
export class PoliticalPartyComponent implements OnInit {
    politicalPartyGroup: FormGroup | any;
    selectedParty: any;
    politicalParties$: Observable<any> | undefined;
    politicalParty: any;
    showtextBox= false;
    voterInfoFromState: any;
    situationSelectedData: any;
    constructor(private fb: FormBuilder, private router: Router, private service: ApplyNowStoreService, private cd: ChangeDetectorRef, private appService: AppStoreService,) { }


   
    ngOnInit()  {
        this.politicalPartyGroup = this.fb.group({ 
            politicalParty: ['', Validators.required], 
        });
        this.politicalParties$ = this.appService.getPoliticalParties();
        this.politicalParties$?.subscribe((s) => {
            this.politicalParty = s;
            console.log(this.politicalParty, "states")
            this.cd.detectChanges();
        });
        this.politicalPartyGroup.get("politicalParty").valueChanges.subscribe((selectedValue: string) => {
                this.selectedParty = selectedValue;
                if (this.selectedParty == "OTH"){
                    this.showtextBox = true
                } else{
                    this.showtextBox = false

                }
                this.cd.detectChanges();
            });

        this.voterInfoFromState = this.service.applyNow.voterRegistration;
        this.situationSelectedData = this.voterInfoFromState.votingApplicationType;
        console.log(this.voterInfoFromState.politicalParty, " this.voterInfoFromState")
        this.politicalPartyGroup.get("politicalParty").patchValue(this.voterInfoFromState.politicalParty);
        if (this.voterInfoFromState.politicalParty == "OTH"){
            this.showtextBox = true
            this.politicalPartyGroup.get("otherParty").patchValue(this.voterInfoFromState.otherPartyComment);

        }

     }
    isFieldValid(field: string): boolean {
        return (
            this.politicalPartyGroup.get(field)?.status !== "VALID" &&
            this.politicalPartyGroup.get(field)?.touched
        );
    }
    getSelectedParty(selectedValue: any){
        if (selectedValue === "OTH" ) {
            return this.politicalPartyGroup.get("otherParty").value
        } else {
            return "";
        } 
    }
    next() { 
        this.politicalPartyGroup.markAllAsTouched();
        const politicalParty = {
            politicalParty:  this.politicalPartyGroup.get("politicalParty").value,
            otherPartyComment: this.getSelectedParty(this.politicalPartyGroup.get("politicalParty").value)
        }
        if (this.politicalPartyGroup.valid) {
            const updatedVoterInfo = { ...this.service.applyNow.voterRegistration, ...politicalParty };
            console.log(updatedVoterInfo)
            this.service.updatedVoterRegistrationDetails(updatedVoterInfo) 

        this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_REGISTRATIONDECLARATIONS]); 
        }
    }

    back()  { 
        this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_UPLOADSIGNATURESUMMARY]); 

    }
}
