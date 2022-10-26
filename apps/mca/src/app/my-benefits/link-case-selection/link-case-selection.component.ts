import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../+state';
import { MyBenefits } from '../../+state/models/my-benefits/my-benefits.model';
import { loadCounties } from '../../+state/ref-data/ref-data.actions';

import { getCounties } from '../../+state/selectors/ref-data.selectors';

import { MyBenefitsStoreService } from '../../+state/store-service/my-benefits-store.service';
import { RefDataStoreService } from '../../+state/store-service/ref-data-store.service';
import { RoutePath } from '../../shared/route-strategies'; 


@Component({
    selector: 'compass-ui-link-case-selection',
    templateUrl: './link-case-selection.component.html',
    styleUrls: ['./link-case-selection.component.scss'],
    // providers: [DashboardStrategy],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkCaseSelectionComponent implements OnInit {
    linkCaseSelectionGroup: FormGroup | any;
    noBenefitsAvailable = false;
    selectedCase: any;
    myBenefitsState: MyBenefits | undefined;
    isCis = false;
    isCaps = false;
    backTobenefits = RoutePath.DASHBOARD
    counties$: Observable<any> | undefined;
    mcifield = false;
    ssnfield = false;
    // counties$!: Observable<any[]>;
    showCaseRecordCard = false;
    showchipUFICard = false;
    counties: any;
    linkcase = RoutePath.LINK_CASE_SELECTION;

    constructor(private refService:RefDataStoreService,
        private route: Router, private fb: FormBuilder, private service: MyBenefitsStoreService, private store: Store<AppState>, private cd: ChangeDetectorRef,) { }

    isFieldValid(field: string): boolean {
        
        return (
            this.linkCaseSelectionGroup.get(field)?.status !== "VALID" &&
            this.linkCaseSelectionGroup.get(field)?.touched
        );
    }
    OnlyNumberAllowed(event: { which: any; keyCode: any }): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    showMCI() {
        this.linkCaseSelectionGroup.get("socialSecurityNumber").clearValidators();
        this.linkCaseSelectionGroup.get("mciOrMedicaidIdOrEbtNumber").setValidators(Validators.required);
        this.mcifield = true;
        this.ssnfield = false;
    }
    showSSN() {
        this.linkCaseSelectionGroup.get("mciOrMedicaidIdOrEbtNumber").clearValidators();
        this.linkCaseSelectionGroup.get("socialSecurityNumber").setValidators(Validators.required);
        this.ssnfield = true;
        this.mcifield = false;

    }
    ngOnInit(): void {
        this.linkCaseSelectionGroup = this.fb.group({
            linkCaseSelection: ['', Validators.required],
            caseNumber: [''],
            ufiNumber: [''],
            eformNumber: [''],
            county: [''],
            socialSecurityNumber: [''],
            mciOrMedicaidIdOrEbtNumber: [''],
            password: [],
        })
        
        this.refService.initCounties().subscribe((c)=>{

            this.counties=c;
        })
       
        this.myBenefitsState = this.service.getMyBenefitsState;
        this.linkCaseSelectionGroup.get("caseNumber").clearValidators();
        this.linkCaseSelectionGroup.get("county").clearValidators();
        this.linkCaseSelectionGroup.get("socialSecurityNumber").clearValidators();
        this.linkCaseSelectionGroup.get("ufiNumber").clearValidators();
        this.linkCaseSelectionGroup.get("mciOrMedicaidIdOrEbtNumber").clearValidators(); 
        this.linkCaseSelectionGroup.get("linkCaseSelection").valueChanges.subscribe((selectedValue: string) => {
            this.selectedCase = selectedValue; 
            if (this.selectedCase == 'caseRecord') {
                this.showCaseRecordCard = true;
                this.showchipUFICard = false;
                this.isCis = true;
                this.isCaps = false;
                this.ssnfield = true;
                this.mcifield = false; 

                this.linkCaseSelectionGroup.get("caseNumber").setValidators(Validators.required);
                this.linkCaseSelectionGroup.get("county").setValidators(Validators.required);
                this.linkCaseSelectionGroup.get("socialSecurityNumber").setValidators(Validators.required);
                this.linkCaseSelectionGroup.get("ufiNumber").clearValidators();
                this.linkCaseSelectionGroup.get("mciOrMedicaidIdOrEbtNumber").clearValidators(); 
            }
            if (this.selectedCase == 'chipUFI') {
                this.showchipUFICard = true;
                this.showCaseRecordCard = false;
                this.isCaps = true;
                this.isCis = false;
                this.mcifield = true; 
                this.ssnfield = false;

                this.linkCaseSelectionGroup.get("ufiNumber").setValidators(Validators.required);
                this.linkCaseSelectionGroup.get("mciOrMedicaidIdOrEbtNumber").setValidators(Validators.required);
                this.linkCaseSelectionGroup.get("caseNumber").clearValidators();
                this.linkCaseSelectionGroup.get("county").clearValidators();
                this.linkCaseSelectionGroup.get("socialSecurityNumber").clearValidators(); 

            }

            this.linkCaseSelectionGroup.get("caseNumber").updateValueAndValidity();
            this.linkCaseSelectionGroup.get("county").updateValueAndValidity();
            this.linkCaseSelectionGroup.get("socialSecurityNumber").updateValueAndValidity();
            this.linkCaseSelectionGroup.get("ufiNumber").updateValueAndValidity();
            this.linkCaseSelectionGroup.get("mciOrMedicaidIdOrEbtNumber").updateValueAndValidity();

        });

        // Patch Values
        if (this.myBenefitsState?.isCis == true){
            this.showCaseRecordCard = true;
            this.linkCaseSelectionGroup.get("linkCaseSelection").patchValue("caseRecord");
            this.linkCaseSelectionGroup.get("county").patchValue(this.myBenefitsState?.county);
            this.linkCaseSelectionGroup.get("caseNumber").patchValue(this.myBenefitsState?.caseNumber);
            if (this.myBenefitsState?.socialSecurityNumber !== ""){
                this.ssnfield= true;
                this.mcifield = false
                this.linkCaseSelectionGroup.get("socialSecurityNumber").patchValue(this.myBenefitsState?.socialSecurityNumber);
                console.log("there is a value of SSN")
            } else{
                this.mcifield = true;
                this.ssnfield = false

                this.linkCaseSelectionGroup.get("mciOrMedicaidIdOrEbtNumber").patchValue(this.myBenefitsState?.mciOrMedicaidIdOrEbtNumber);
            }
        } else if (this.myBenefitsState?.isCaps == true) {
            this.showchipUFICard = true; 
            this.linkCaseSelectionGroup.get("linkCaseSelection").patchValue("chipUFI");
            this.linkCaseSelectionGroup.get("ufiNumber").patchValue(this.myBenefitsState?.ufiNumber);
            if (this.myBenefitsState?.mciOrMedicaidIdOrEbtNumber !== "") { 
                this.mcifield = true;
                this.ssnfield = false
                this.linkCaseSelectionGroup.get("mciOrMedicaidIdOrEbtNumber").patchValue(this.myBenefitsState?.mciOrMedicaidIdOrEbtNumber);
                console.log("there is a value of MCI") 
            } else{
                this.mcifield = false;
                this.ssnfield = true;
                this.linkCaseSelectionGroup.get("socialSecurityNumber").patchValue(this.myBenefitsState?.socialSecurityNumber);

            }


        } 
    }
    next() { 
        this.linkCaseSelectionGroup.markAllAsTouched();
        const county = this.selectedCase == "caserecord" ? this.linkCaseSelectionGroup.get("county").value : this.linkCaseSelectionGroup.get("county").value;
        const caseNumber = this.selectedCase == "caserecord" ? this.linkCaseSelectionGroup.get("caseNumber").value : this.linkCaseSelectionGroup.get("caseNumber").value;
        const socialSecurityNumber = this.ssnfield == true ? this.linkCaseSelectionGroup.get("socialSecurityNumber").value : "";
        const mciOrMedicaidIdOrEbtNumber = this.mcifield == true ? this.linkCaseSelectionGroup.get("mciOrMedicaidIdOrEbtNumber").value : "";
        const ufiNumber = this.selectedCase == "chipUFI" ? this.linkCaseSelectionGroup.get("ufiNumber").value : this.linkCaseSelectionGroup.get("ufiNumber").value;
        const isCis = this.isCis;
        const isCaps = this.isCaps;


        const updatedlinkCaseSelection = {

            county: county,
            caseNumber: caseNumber,
            socialSecurityNumber: socialSecurityNumber,
            mciOrMedicaidIdOrEbtNumber: mciOrMedicaidIdOrEbtNumber,
            ufiNumber: ufiNumber,
            isCis: isCis,
            isCaps: isCaps
        }
        if (this.linkCaseSelectionGroup.valid) {
            this.service.updateMyBenefits(updatedlinkCaseSelection);
            this.route.navigate([RoutePath.LINKING_ONLINE_SELECTION]);
        }
    }


}
