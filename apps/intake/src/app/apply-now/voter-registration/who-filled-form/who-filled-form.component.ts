import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AppStoreService } from "../../../app-store-service";
import { RoutePath } from "../../../shared/route-strategies";
import { ApplyNowStoreService } from "../../apply-now-store-service";

@Component({
    selector: "compass-ui-who-filled-form",
    templateUrl: "./who-filled-form.component.html",
    styleUrls: ["./who-filled-form.component.scss"],
})
export class WhoFilledFormComponent implements OnInit {
    constructor(private fb: FormBuilder, private router: Router, private service: ApplyNowStoreService, private cd: ChangeDetectorRef, private appService: AppStoreService,) { }


    wffGroup: FormGroup | any; 
    states$: Observable<any> | undefined;
    states: any;
    showCard= false;
    voterInfoFromState: any;
    situationSelectedData: any;
    termsConditions: any;
    displayError = false;
    errorMessage = "This is required."
    someoneElseBoolean= ""
    testSomeone:any
    ngOnInit() { 
        this.wffGroup = this.fb.group({
            whoFilledYesNo: ['', Validators.required], 
            firstName: ['',],
            lastName: ['',],
            phone:[''],
            street: ['',],
            street2:[''],
            city: ['', ],
            state: ['',], 
            zip: ['', ],
            county: ['',],
            termsConditions: ['']


        });
        this.states$ = this.appService.getStates();
        this.states$?.subscribe((s) => {
            this.states = s;
            console.log(this.states, "states")
            this.cd.detectChanges();
        });
        // this.wffGroup.get('firstName')?.clearValidators();
        // this.wffGroup.get('lastName')?.clearValidators();
        // this.wffGroup.get('street')?.clearValidators();
        // this.wffGroup.get('city')?.clearValidators();
        // this.wffGroup.get('state')?.clearValidators();
        // this.wffGroup.get('zip')?.clearValidators();
        // this.wffGroup.get('termsConditions')?.clearValidators();
        this.voterInfoFromState = this.service.applyNow.voterRegistration;
        this.situationSelectedData = this.voterInfoFromState.votingApplicationType;
        console.log(this.voterInfoFromState, " this.voterInfoFromState")
        if (this.voterInfoFromState?.assistedBySomeone == 'Y') {
            this.wffGroup.get("whoFilledYesNo").patchValue("Yes"); 

        this.showCard = true
        this.wffGroup.get("firstName").patchValue(this.voterInfoFromState?.assistanceFirstName); 
        this.wffGroup.get("lastName").patchValue(this.voterInfoFromState?.assistanceLastName); 
        this.wffGroup.get("street").patchValue(this.voterInfoFromState.assistanceAddress?.addressLine1);
        this.wffGroup.get("street2").patchValue(this.voterInfoFromState.assistanceAddress?.addressline2); 
        this.wffGroup.get("city").patchValue(this.voterInfoFromState.assistanceAddress?.city);
        this.wffGroup.get("state").patchValue(this.voterInfoFromState.assistanceAddress?.state);
        this.wffGroup.get("zip").patchValue(this.voterInfoFromState.assistanceAddress?.zip);  
        this.wffGroup.get("termsConditions").patchValue(this.voterInfoFromState?.assistanceAgreedTermsAndConditions);

           
        } else if (this.voterInfoFromState?.assistedBySomeone == 'N') {
            this.wffGroup.get("whoFilledYesNo").patchValue("No"); 
            this.showCard = false 
        }

    }
    showAddressCard(){
        this.showCard = true;
        // // this.someoneElseBoolean = "true";
        this.testSomeone = "Y"
        // this.wffGroup.get('whoFilledYesNo')?.clearValidators(); 
        this.wffGroup.get('firstName').setValidators(Validators.required);
        this.wffGroup.get('lastName').setValidators(Validators.required);
        this.wffGroup.get('street').setValidators(Validators.required);
        this.wffGroup.get('city').setValidators(Validators.required);
        this.wffGroup.get('state').setValidators(Validators.required);
        this.wffGroup.get('zip').setValidators(Validators.required);
        this.wffGroup.get('termsConditions').setValidators(Validators.required);
        this.wffGroup.get('termsConditions')?.updateValueAndValidity();
        

    }
    hideAddressCard(){
        // this.wffGroup.reset();

        this.showCard = false;
        // // this.someoneElseBoolean = "false";
        this.testSomeone = "N"
        this.wffGroup.get('whoFilledYesNo')?.clearValidators(); 
        this.wffGroup.get('firstName')?.clearValidators();
        this.wffGroup.get('lastName')?.clearValidators();
        this.wffGroup.get('street')?.clearValidators();
        this.wffGroup.get('city')?.clearValidators();
        this.wffGroup.get('state')?.clearValidators();
        this.wffGroup.get('zip')?.clearValidators();
        this.wffGroup.get('termsConditions')?.clearValidators(); 
        this.wffGroup.get('whoFilledYesNo')?.updateValueAndValidity();
        this.wffGroup.get('firstName')?.updateValueAndValidity();
        this.wffGroup.get('lastName')?.updateValueAndValidity();
        this.wffGroup.get('street')?.updateValueAndValidity();
        this.wffGroup.get('city')?.updateValueAndValidity();
        this.wffGroup.get('state')?.updateValueAndValidity();
        this.wffGroup.get('zip')?.updateValueAndValidity();
        this.wffGroup.get('termsConditions')?.updateValueAndValidity();

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
            this.wffGroup.get(field)?.status !== "VALID" &&
            this.wffGroup.get(field)?.touched
        );
    }
    
    confirm(value: { checked: any; }) {
        if (value.checked) {

            this.termsConditions = "Y";
            this.displayError = false
        } else {
            this.termsConditions = null;
            // this.displayError = true
        }

    }
    checkChar(character: any) {
        var k;
        k = character.charCode;
        return ((k > 64 && k < 91) || (k > 96 && k < 123) || (k > 47 && k < 58) || k == 46 || k == 35 || k == 41 || k == 40 || k == 38 || k == 64 || k == 39 || k == 92 || k == 45 || k == 32 || k == 47 || k == 44);

    }
    submit(){

        this.wffGroup.markAllAsTouched(); 
        if (this.testSomeone == "N"){
         this.wffGroup.reset();

        }
        if (this.termsConditions == null && this.testSomeone=='Y') {
            this.displayError = true
             return
        }
        console.log(this.wffGroup.get('termsConditions').value, "  this.wffGroup.get('termsConditions')")

        console.log(this.wffGroup, "this.wffGroup")

        const someoneElseInfo = {
            assistanceFirstName: this.wffGroup.get('firstName').value,
            assistanceLastName: this.wffGroup.get('lastName').value,
            assistancePhoneNumber: this.wffGroup.get('phone').value,
            assistanceAgreedTermsAndConditions: (this.termsConditions=='Y')? true:false,
            assistedBySomeone: this.testSomeone,
        }
        const assistanceAddressInfo = {
            addressLine1: this.wffGroup.get('street').value,
            addressline2: this.wffGroup.get('street2').value, 
            city: this.wffGroup.get('city').value,
            state: this.wffGroup.get('state').value,
            zip: this.wffGroup.get('zip').value,
            zipExtension:"", 
        }
        console.log(someoneElseInfo, "someoneElseInfo")
        console.log(assistanceAddressInfo, "assistanceAddressInfo")

        
        if (this.wffGroup.valid){ 
            const updatedVoterInfo = {
                ...this.service.applyNow.voterRegistration, ...someoneElseInfo, assistanceAddress: assistanceAddressInfo
            };
            this.service.updatedVoterRegistrationDetails(updatedVoterInfo) 
            console.log(updatedVoterInfo)
            this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_VOTERREGISTRATIONENDING]); 

        }

     }

    back() { 
        this.router.navigate([RoutePath.APPLYNOW + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION + '/' + RoutePath.APPLYNOW_VOTERREGISTRATION_REGISTRATIONDECLARATIONS]); 

    }
}
