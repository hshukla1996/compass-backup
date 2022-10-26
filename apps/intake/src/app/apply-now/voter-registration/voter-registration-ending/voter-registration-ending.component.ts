import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RoutePath } from "../../../shared/route-strategies";
import { VoterRegistrationService } from "../../../shared/services/voter-registration.service";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { IVoterRegistrationState } from "../voter-registration-model/voter-registration-model";

@Component({
    selector: "compass-ui-voter-registration-ending",
    templateUrl: "./voter-registration-ending.component.html",
    styleUrls: ["./voter-registration-ending.component.scss"],
})
export class VoterRegistrationEndingComponent implements OnInit {
    constructor(private route: Router, private service: ApplyNowStoreService, private voterService: VoterRegistrationService,) { }
    private voterRegistrationState!: IVoterRegistrationState;
    isLoading = true;
    voterDetails: any;
    voterInformation: any;
    finalresponse: any;
    loadingText = "Loading..."

    ngOnInit() {

        this.service.getAppData().subscribe(d => {
            this.voterDetails = this.service.getVoterInfoFromState;
            this.voterInformation = this.voterDetails.voterRegistration
            // this.household = { ...this.voterRegistrationState };
            // this.individuals = this.voterRegistrationState || [];
 
            try {
                
                this.voterService.postReferrals(this.voterInformation).subscribe(response => {
                    this.isLoading = false
                    console.log(response, "response")
                    this.finalresponse = response;

                })
            } catch (ex) {
                this.loadingText = "Something went wrong"
            }

        });
     }

    back() { 
        this.route.navigate([RoutePath.HOME]);
    }
}
