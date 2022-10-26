import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { IApplyNowState } from "../../+state/apply-now.models";
import { AppStoreService } from "../../../app-store-service";
import { RoutePath } from "../../../shared/route-strategies";
import { Utility } from "../../../shared/utilities/Utility";
import { ApplyNowStoreService } from "../../apply-now-store-service";

@Component({
    selector: "compass-ui-voter-basic-details",
    templateUrl: "./voter-basic-details.component.html",
    styleUrls: ["./voter-basic-details.component.scss"],
})
export class VoterBasicDetailsComponent implements OnInit {
    constructor(private fb: FormBuilder, private router: Router, private service: ApplyNowStoreService, private cd: ChangeDetectorRef, private appService: AppStoreService,) { }
    maxDateRange: any;

    basicDetailsGroup: FormGroup |any;
    suffixls: any[] = [];
    voterInfoFromState: any;
    situationSelectedData: any;
    isFieldValid(field: string): boolean {
        if (field === 'dateOfBirth') {
            const isValidDate = this.getAge(this.basicDetailsGroup.controls['dateOfBirth'].value) > 200
            return ((isValidDate) || this.basicDetailsGroup.get('dateOfBirth').value > this.maxDateRange) || (this.basicDetailsGroup.get(field).status !== 'VALID' && (this.basicDetailsGroup.get(field).dirty || this.basicDetailsGroup.get(field).touched))
        }
        return (this.basicDetailsGroup.get(field).status !== 'VALID' && (this.basicDetailsGroup.get(field).dirty || this.basicDetailsGroup.get(field).touched))
    }
    getAge(dateString: any): any {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    ngOnInit() {
        this.maxDateRange = new Date().toISOString().slice(0, 10);

        this.basicDetailsGroup = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            dateOfBirth: ['', Validators.required],
            gender: ['', Validators.required],
            middleInitial:[''],
            suffix: [''],
            email: [''],
            phone: [''], 
        });
        this.appService.getSuffix().subscribe((suffix: any[]) => {
            let newSuffix = [...suffix];
            newSuffix.sort((a: any, b: any) => {
                return a.additionalColumns.FlexOrder - b.additionalColumns.FlexOrder
            });
            this.suffixls = newSuffix;
            this.cd.detectChanges();
        });
        this.voterInfoFromState = this.service.applyNow.voterRegistration;
        this.situationSelectedData = this.voterInfoFromState.votingApplicationType;
        console.log(this.voterInfoFromState, " this.voterInfoFromState")
        this.basicDetailsGroup.get("firstName").patchValue(this.voterInfoFromState.voterIndividual.firstName);
        this.basicDetailsGroup.get("lastName").patchValue(this.voterInfoFromState.voterIndividual.lastName); 
        this.basicDetailsGroup.get("middleInitial").patchValue(this.voterInfoFromState.voterIndividual.middleInitial); 

        this.basicDetailsGroup.get("dateOfBirth").patchValue(Utility.duetFormatDate(this.voterInfoFromState.voterIndividual.birthDate)); 
        if (this.voterInfoFromState.voterIndividual.gender == 'M'){
            this.basicDetailsGroup.get("gender").patchValue('Male'); 

        } else if (this.voterInfoFromState.voterIndividual.gender == 'F' || this.voterInfoFromState.voterIndividual.gender == 'Female'){
            this.basicDetailsGroup.get("gender").patchValue('Female'); 


        }
        this.basicDetailsGroup.get("suffix").patchValue(this.voterInfoFromState.voterIndividual.suffix); 
        this.basicDetailsGroup.get("email").patchValue(this.voterInfoFromState.voterIndividual.emailAddress); 
        this.basicDetailsGroup.get("phone").patchValue(this.voterInfoFromState.voterIndividual.phoneNumber); 


         
        console.log(this.voterInfoFromState, " this.voterInfoFromState")
     }
    // isFieldValid(field: string): boolean {
    //     return (
    //         this.basicDetailsGroup.get(field)?.status !== "VALID" &&
    //         this.basicDetailsGroup.get(field)?.touched
    //     );
    // }
    checkMiddleNameChar(character: any) {
        var k;
        k = character.charCode;
        return ((k > 64 && k < 91) || (k > 96 && k < 123));

    }
    getGender(gender:any){
        if(gender == 'Male'){
            gender ='M'
        } else {
            gender = 'F'

        } 
        return gender
    }
    next() {
        const selectedOptions = { 
            firstName: this.basicDetailsGroup.get('firstName').value,
            lastName: this.basicDetailsGroup.get('lastName').value,
            middleInitial: this.basicDetailsGroup.get('middleInitial').value,
            suffix: this.basicDetailsGroup.get('suffix').value,
            birthDate: this.basicDetailsGroup.get('dateOfBirth').value,
            gender: this.getGender(this.basicDetailsGroup.get('gender').value),
            emailAddress: this.basicDetailsGroup.get('email').value,
            phoneNumber: this.basicDetailsGroup.get('phone').value,
            race: this.basicDetailsGroup.race,
            // residentialAddress: this.headOfHouseholdInformation.firstName,
            // mailingAddress: this.headOfHouseholdInformation.firstName,
            drivingLicenseOrStateId: this.basicDetailsGroup.driversLicenceNumberOrStateId,
            lastFourSsnDigits: this.basicDetailsGroup.socialSecurityNumber,
            doNotHaveDriverLicensOrSsnIndicator: this.basicDetailsGroup.licensedState,
        }
        console.log(selectedOptions, "selectedOptions")
        const storedVoterIndividual = this.service.applyNow.voterRegistration?.voterIndividual 

        this.basicDetailsGroup.markAllAsTouched();
        if (this.basicDetailsGroup.valid) {
            const updatedVoterInfo = { ...this.service.applyNow.voterRegistration, voterIndividual: { ...storedVoterIndividual, ...selectedOptions } }; 
            this.service.updatedVoterRegistrationDetails(updatedVoterInfo) 
            this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_VOTERRACE]);
        }

     }

    back() {
         if (this.situationSelectedData.indexOf('3') > -1 && this.situationSelectedData.indexOf('2') > -1) {
            this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_CHANGEOFNAME]);

        }
        else if (this.situationSelectedData.indexOf('3') > -1 && this.situationSelectedData.indexOf('4') > -1){
            this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_CHANGEOFADDRESS]); 
        }
        else if (this.situationSelectedData.indexOf('2') > -1 && this.situationSelectedData.indexOf('4') > -1 ) {
            this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_CHANGEOFNAME]);

        }
       else  if (this.situationSelectedData.indexOf('3') > -1) {
            console.log("if")
            this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_CHANGEOFADDRESS]);

        } else if (this.situationSelectedData.indexOf('2') > -1) {
            this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_CHANGEOFNAME]);

        } else if (this.situationSelectedData.indexOf('4') > -1) {
            this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_PREVIOUSREGISTRATION]);

        }
        else   {
            this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_SITUATIONGATEPOST]);
        } 
     }

     errorMap(fieldName: string) {
        switch(fieldName) {
            case "dateOfBirth": {
                if (this.basicDetailsGroup.get("dateOfBirth")?.errors?.required) {
                    return "basidDetailRequiredMessage"
                }
                if (this.basicDetailsGroup.get("dateOfBirth")?.errors?.duetInvalidDate) {
                    return "duetInvalidDate"
                }
                return ""
            }
            default: return ""
        }
     }
}
