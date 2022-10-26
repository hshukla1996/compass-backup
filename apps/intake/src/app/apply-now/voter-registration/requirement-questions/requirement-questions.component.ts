import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { RoutePath } from "../../../shared/route-strategies";
import { VoterRegistrationService } from "../../../shared/services/voter-registration.service";
import { Utility } from "../../../shared/utilities/Utility";
import { ApplyNowStoreService } from "../../apply-now-store-service";
import { IHouseHoldDetails, IHouseHold } from "../../household/household-model";

@Component({
    selector: "compass-ui-requirement-questions",
    templateUrl: "./requirement-questions.component.html",
    styleUrls: ["./requirement-questions.component.scss"],
})
export class RequirementQuestionsComponent implements OnInit {
    // houseHoldDetails!: IHouseHoldDetails;
    voterDetails:any;
    voterInformation:any;
    houseHoldPersons: IHouseHold[] = [];
    householdMembers: any;
    indAge: any;
    appId:any;
    headOfHouseholdInformation:any;
    constructor(private fb: FormBuilder, private cd: ChangeDetectorRef, private router: Router, private service: ApplyNowStoreService, private voterService: VoterRegistrationService) { }

    requirementQuestionGroup!: FormGroup | any;

    ngOnInit() { 
        this.requirementQuestionGroup = this.fb.group({

            isUsCitizen: ['', Validators.required],
            willBeEighteenYears:['', Validators.required]

        });
        // this.houseHoldDetails = this.service.getHouseHoldDetails;
        // this.houseHoldPersons = this.houseHoldDetails.houseHoldPersons || [];
        // this.householdMembers = this.houseHoldPersons.filter((p) => p.id == parseInt(this.houseHoldDetails?.HeadofHousehold));
        // this.headOfHouseholdInformation  = this.householdMembers[0];
        // this.service.getAppData().subscribe((d) => {
        //     this.appId = d.gettingStartedResponse.id
        // })

    //    this.service.loadVoterData()
        // this.voterService.getVoterRegistration(this.appId).subscribe((data: any) => {
    // this.myBenefitsData = data;

    
    //   this.cd.detectChanges();
    // })
        this.voterDetails = this.service.getVoterInfoFromState;
        this.voterInformation = this.voterDetails.voterRegistration
        console.log(this.voterInformation, " this.voterInformation") 
         
        if (this.voterInformation?.voterIndividual?.willBeEighteenYears == 'Y'){
            this.requirementQuestionGroup.get("willBeEighteenYears").patchValue('Y');
        } else {
            this.requirementQuestionGroup.get("willBeEighteenYears").patchValue('N');

        }
        if (this.voterInformation?.voterIndividual?.isUsCitizen == 'Y'){
            this.requirementQuestionGroup.get("isUsCitizen").patchValue('Y');
        } else {
            this.requirementQuestionGroup.get("isUsCitizen").patchValue('N');
        }
       

    }

    isFieldValid(field: string): boolean { 
        return (
            this.requirementQuestionGroup.get(field)?.status !== "VALID" &&
            this.requirementQuestionGroup.get(field)?.touched
        );
    }
    next() { 
        this.requirementQuestionGroup.markAllAsTouched();
        const selectedOptions = {
            isUsCitizen: this.requirementQuestionGroup.get("isUsCitizen").value,
            willBeEighteenYears: this.requirementQuestionGroup.get("willBeEighteenYears").value,
            // firstName: this.headOfHouseholdInformation.firstName,
            // lastName: this.headOfHouseholdInformation.lastName,
            // middleInitial: this.headOfHouseholdInformation.midName,
            // suffix: this.headOfHouseholdInformation.suffix,
            // birthDate: this.headOfHouseholdInformation.dateOfBirth,
            // gender: this.headOfHouseholdInformation.gender,
            // emailAddress: this.headOfHouseholdInformation.emailAddress,
            // phoneNumber: this.headOfHouseholdInformation.phoneNumber,
            // race: this.headOfHouseholdInformation.race, 
            // residentialAddress: this.headOfHouseholdInformation.firstName,
            // mailingAddress: this.headOfHouseholdInformation.firstName,
            // drivingLicenseOrStateId: this.headOfHouseholdInformation.driversLicenceNumberOrStateId,
            // lastFourSsnDigits: this.headOfHouseholdInformation.socialSecurityNumber,
            // doNotHaveDriverLicensOrSsnIndicator: this.headOfHouseholdInformation.licensedState,
        }
        const storedVoterIndividual = this.service.applyNow.voterRegistration?.voterIndividual 

        if (this.requirementQuestionGroup.valid) {
            if (this.requirementQuestionGroup.get("isUsCitizen").value == "N" || this.requirementQuestionGroup.get("willBeEighteenYears").value == "N"){
                this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_NOTELIGIBLE]); 
            } else { 
                this.service.updatedVoterRegistrationDetails({ ...this.service.applyNow.voterRegistration, voterIndividual: { ...storedVoterIndividual, ...selectedOptions }
})
                this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_SITUATIONGATEPOST]); 
            }
        }
    }

    back() { 
        this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION]);  
    }
}
