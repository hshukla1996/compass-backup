import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormControl,
    ReactiveFormsModule,
    FormBuilder,
    Validators,
    RequiredValidator,
} from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { IApplyNowState } from '../../+state/apply-now.models';
import { AppStoreService } from '../../../app-store-service';
import { RoutePath } from "../../../shared/route-strategies";
import { ApplyNowGettingStartedNonMedicalAssis } from '../../../shared/route-strategies/apply-now/gettingStarted-NonMedicalAssis';
import { Utility } from '../../../shared/utilities/Utility';
import { ApplyNowStoreService } from '../../apply-now-store-service';

@Component({
    selector: "compass-ui-non-medical-assis",
    templateUrl: "./non-medical-assis.component.html",
    styleUrls: ["./non-medical-assis.component.scss"],
    providers: [ApplyNowGettingStartedNonMedicalAssis],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class NonMedicalAssisComponent implements OnInit {
    nonMedicalForm: FormGroup | any;
    medicalService$: Observable<any> | undefined;
    medicalService: any; 
    maxDateRange: any;
    maProviderNumbers$: Observable<any> | undefined;
    maProviderNumbers:any;
    nonMAProviderNumbers$: Observable<any> | undefined;
    nonMAProviderNumbers:any;
    providerInfoFromState:IApplyNowState |undefined;
    constructor(private nonMedical: FormBuilder, private route: Router, private appService: AppStoreService, private service: ApplyNowStoreService, private cd: ChangeDetectorRef,) {}

    ngOnInit(): void {
        this.maxDateRange = new Date().toISOString().slice(0, 10); 
        this.nonMedicalForm = this.nonMedical.group({
            medicalServiceType: ["", Validators.required],
            yesNoRadio: ["", Validators.required],
            medicalAssistance: ["",],
            medicalAssistanceDate: [  "", Utility.dateMaxValidator()],
            nonMedicalAssistance: ["",],
            nonMedicalAssistanceDate: [  "", Utility.dateMaxValidator()],
        });
        this.maProviderNumbers$ = this.appService.getMAProviderNumbers();
        this.maProviderNumbers$.subscribe((d: any) => {
            this.maProviderNumbers = d;
            console.log(this.maProviderNumbers, " this.maProviderNumbers")

            this.cd.detectChanges();
        });
        this.nonMAProviderNumbers$ = this.appService.getNonMAProvidernumbers();
        this.nonMAProviderNumbers$.subscribe((d: any) => {
            this.nonMAProviderNumbers = d;
            console.log(this.nonMAProviderNumbers, " this.nonMAProviderNumbers")
            this.cd.detectChanges();
        });
        this.medicalService$ = this.appService.getMedicalService();
        this.medicalService$?.subscribe((s) => {
            this.medicalService = s;
            console.log(this.medicalService, " this.medicalService")

            this.cd.detectChanges();
        

        }); 
        this.providerInfoFromState = this.service.getproviderInfoFromState;

        // setTimeout(() => {
            if (this.providerInfoFromState?.gettingStarted?.isMA == true){
                this.nonMedicalForm.get("yesNoRadio").patchValue("MA");

                this.medicalAssis = true

                this.nonMedicalForm.get("medicalServiceType").patchValue(this.providerInfoFromState?.gettingStarted?.medicalServiceType);
                this.nonMedicalForm.get("medicalAssistance").patchValue(this.providerInfoFromState?.gettingStarted?.maProviderNumber);

                this.nonMedicalForm.get("medicalAssistanceDate").patchValue(Utility.duetFormatDate(this.providerInfoFromState?.gettingStarted?.dateOfFirstAdmission));
                console.log(this.medicalAssis, "inside")
                this.cd.detectChanges();
            } else if (this.providerInfoFromState?.gettingStarted?.isMA != undefined) {
                this.nonMedicalForm.get("yesNoRadio").patchValue("NonMA"); 
                this.nonMedicalAssis = true
                this.nonMedicalForm.get("medicalServiceType").patchValue(this.providerInfoFromState?.gettingStarted?.medicalServiceType);
                this.nonMedicalForm.get("nonMedicalAssistance").patchValue(this.providerInfoFromState?.gettingStarted?.nonProviderNumber);

                this.nonMedicalForm.get("nonMedicalAssistanceDate").patchValue(Utility.duetFormatDate(this.providerInfoFromState?.gettingStarted?.dateOfFirstAdmission));
                console.log(this.medicalAssis, "inside")
                this.cd.detectChanges();

            }
           


        // }, 500);
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
    isFieldValid(field: string): boolean {
        
        if (field === 'medicalAssistanceDate') {
            const isInvalidDate = this.getAge(this.nonMedicalForm.controls['medicalAssistanceDate'].value) > 200 || this.nonMedicalForm.get('medicalAssistanceDate').value > this.maxDateRange
            return (isInvalidDate || !this.nonMedicalForm.get('medicalAssistanceDate').valid) && this.nonMedicalForm.get('medicalAssistanceDate').touched
        }
        if (field === 'nonMedicalAssistanceDate') {
            const isInvalidDate = this.getAge(this.nonMedicalForm.controls['nonMedicalAssistanceDate'].value) > 200
            return (isInvalidDate || !this.nonMedicalForm.get('nonMedicalAssistanceDate').valid) && this.nonMedicalForm.get('nonMedicalAssistanceDate').touched
        }
        return (this.nonMedicalForm.get(field).status !== 'VALID' && (this.nonMedicalForm.get(field).dirty || this.nonMedicalForm.get(field).touched))
    }

    errorMap(field: string): string {
        switch(field) {
            case "nonMedicalAssistanceDate": {
                if (this.nonMedicalForm.get('nonMedicalAssistanceDate').errors?.invalidDate) {
                    return 'Date must be in the past.'
                }
                if (this.nonMedicalForm.get("nonMedicalAssistanceDate").errors.duetInvalidDate) {
                    return "duetInvalidDate";
                }
                break;
            }
            case "medicalAssistanceDate": {
                if (this.nonMedicalForm.get('medicalAssistanceDate').errors?.invalidDate) {
                    return 'Date must be in the past.'
                }
                if (this.nonMedicalForm.get("medicalAssistanceDate").errors.duetInvalidDate) {
                    return "duetInvalidDate";
                }
                break;
            }
        }
        return ""
    }

    previous() {
        this.route.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_GETTINGSTARTED_GATEPOST,
        ]);
    }
    submit() {
        console.log(this.nonMedicalForm, "this.nonMedicalForm")
        const maProviderInfo = {
            ...this.providerInfoFromState?.gettingStarted,
            medicalServiceType: this.nonMedicalForm.get("medicalServiceType").value,
            maProviderNumber: this.nonMedicalForm.get("medicalAssistance").value,
            nonProviderNumber: this.nonMedicalForm.get("nonMedicalAssistance").value,
            dateOfFirstAdmission: (this.medicalAssis) ? this.nonMedicalForm.get("medicalAssistanceDate").value: this.nonMedicalForm.get("nonMedicalAssistanceDate").value,

            isMA: this.medicalAssis,
        } 
        this.nonMedicalForm.markAllAsTouched(); 
        if (this.nonMedicalForm.valid) {
            this.service.updateMAProviderInfo(maProviderInfo);
        this.route.navigate([
            RoutePath.APPLYNOW +
                "/" +
            RoutePath.APPLYNOW_GETTINGSTARTED_COMMUNITYPARTNERPASSWORD,
        ]);
    }
    }

    medicalAssis: boolean = false;
    nonMedicalAssis: boolean = false;
    addMedicalAssistance() {
        this.medicalAssis = true;
        this.nonMedicalAssis = false;
        this.nonMedicalForm.get("medicalAssistance").setValidators(Validators.required);
        this.nonMedicalForm.get("medicalAssistanceDate").setValidators(Validators.required); 
        this.nonMedicalForm.get("nonMedicalAssistance").clearValidators();
        this.nonMedicalForm.get("nonMedicalAssistanceDate").clearValidators();
        //alert("show MA");
    }
    addNonMedicalAssistance() {
        this.medicalAssis = false;
        this.nonMedicalAssis = true;
        this.nonMedicalForm.get("nonMedicalAssistance").setValidators(Validators.required);
        this.nonMedicalForm.get("nonMedicalAssistanceDate").setValidators(Validators.required); 
        this.nonMedicalForm.get("medicalAssistance").clearValidators();
        this.nonMedicalForm.get("medicalAssistanceDate").clearValidators();
        //alert("show Non MA");
    }
}
