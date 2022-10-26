import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AppStoreService } from "../../app-store-service";
import { RoutePath } from "../../shared/route-strategies";
import { ApplyNowStoreService } from "../apply-now-store-service";

@Component({
    selector: "compass-ui-voter-registration-getting-started",
    templateUrl: "./voter-registration.component.html",
    styleUrls: ["./voter-registration.component.scss"],
})
export class VoterRegistrationGettingStartedComponent implements OnInit {
    constructor(private fb: FormBuilder, private router: Router, private service: ApplyNowStoreService, private cd: ChangeDetectorRef, private appService: AppStoreService,) { }

    
    electionDueDates$: Observable<any> | undefined;
    electionDueDates: any;
    ovrDeadline:any;
    electionDate: any;
    ngOnInit() {
        this.electionDueDates$ = this.appService.getElectionDueDates();
        this.electionDueDates$?.subscribe((s) => {
            this.electionDueDates = s; 
          this.ovrDeadline= this.electionDueDates.filter((p: any) => p.id.includes('OVR_DeadlineDate')  );
            this.electionDate = this.electionDueDates.filter((p: any) => p.id.includes('OVR_ElectionDate')); 
            this.cd.detectChanges();
        });
        this.service.loadVoterData()

        // this.getData = this.service.
    }

    next() {  
        // const storedVoterIndividual = this.service.applyNow.voterRegistration?.voterIndividual 

        this.service.updatedVoterRegistrationDetails({ ...this.service.applyNow.voterRegistration})

        this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_REQUIREMENTQUESTIONS]); 
    }

    back() {
        this.router.navigate(['/']);

     }
}
