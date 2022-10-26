import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription, Observable } from "rxjs";
import { AppState } from "../../+state";
import { MyBenefits } from "../../+state/models/my-benefits/my-benefits.model";
import { MyBenefitsStoreService } from "../../+state/store-service/my-benefits-store.service";
import { RoutePath } from "../../shared/route-strategies";
import { MyBenefitsService } from "../../shared/services/my-benefits/my-benefits.service";

@Component({
    selector: "compass-ui-terms-conditions",
    templateUrl: "./terms-conditions.component.html",
    styleUrls: ["./terms-conditions.component.scss"],
})
export class TermsConditionsComponent implements OnInit {
    termsConditionsGroup: FormGroup | any;

    routePath: typeof RoutePath = RoutePath;
    // route: string | undefined = RoutePath.MYBENEFIT;
    caseNumbers: any
    pillExpand = false
    selectedCase = 0
    NaN!: number
    progCardExpand: any[] = [];
    healthcareExpand: any[] = [];
    foodstampsExpand: any[] = [];
    liheapExpand: any[] = [];
    liwhapExpand: any[] = [];
    subscription = new Subscription();
    myBenefitsState: MyBenefits | undefined;
    myBenefitsData: any;
    mycaseInformation: any;
    termsConditions = false;
    displayError = false;
    errorMessage = "This is required."
    linkcaseFlag= ""
    // myBenefitsInformation = myBenefitsData.
    counties!: Observable<any[]>;
    constructor(private route: Router, private store: Store<AppState>,
        private service: MyBenefitsStoreService, private fb: FormBuilder, private cd: ChangeDetectorRef, private myBenefitsService: MyBenefitsService) { }



    isFieldValid(field: string): boolean {
        return (
            this.termsConditionsGroup.get(field)?.status !== "VALID" &&
            this.termsConditionsGroup.get(field)?.touched
        );
    }

    ngOnInit() {
        this.termsConditionsGroup = this.fb.group({
            termsConditionstest: [false, Validators.requiredTrue],

        })
        this.myBenefitsState = this.service.getMyBenefitsState; 


    }

    back() {
        this.route.navigate([RoutePath.LINKING_ONLINE_SELECTION]);

    }

    onCheckboxChange(value: { checked: any; }) {
        if (value.checked) {

            this.termsConditions = true;
            this.displayError = false
        } else {
            this.termsConditions = false;
            // this.displayError = true
        }

    }

    next() {

        this.termsConditionsGroup.markAllAsTouched();
        console.log(this.termsConditionsGroup)
        if (this.termsConditions == false) {
            this.displayError = true
            return
        }
        const termsAndConditions = {
            termsConditions: this.termsConditions
        }
        console.log(this.termsConditions, 'this.termsConditions ')

        // if (this.termsConditionsGroup.valid) {
        this.service.updateMyBenefits(termsAndConditions);

         
        // if(this.myBenefitsState?.isPaperless == true){

        // } else if (this.myBenefitsState?.isPaperless == false){

        // }

        const finalrepsonse ={
            county: this.myBenefitsState?.county,
            caseNumber: this.myBenefitsState?.caseNumber,
            ufiNumber: this.myBenefitsState?.ufiNumber,
            mciOrMedicaidIdOrEbtNumber: this.myBenefitsState?.mciOrMedicaidIdOrEbtNumber,
            socialSecurityNumber: this.myBenefitsState?.socialSecurityNumber,
            isPaperless: this.myBenefitsState?.isPaperless,
            emailAddress: this.myBenefitsState?.emailAddress, 
            confirmEmailAddress: this.myBenefitsState?.confirmEmailAddress,
            termsConditions: this.myBenefitsState?.termsConditions,
            isCis: this.myBenefitsState?.isCis,
            isCaps: this.myBenefitsState?.isCaps,
            // myBenefits: this.myBenefitsState as MyBenefits 
        }
        this.myBenefitsService.linkCasePost(finalrepsonse).subscribe((data: any) => { 
            this.myBenefitsData = data;
            this.linkcaseFlag= "link case";
            const linkCaseF = {
                linkCaseFlag: this.linkcaseFlag
            }
            this.service.updateMyBenefits(linkCaseF); 
            this.route.navigate([RoutePath.DASHBOARD]);

            this.cd.detectChanges();
        })
        // }

    }
}
