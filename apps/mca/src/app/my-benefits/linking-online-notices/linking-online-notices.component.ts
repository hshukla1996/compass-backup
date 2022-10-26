import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';   
import { select, Store } from '@ngrx/store'; 
import { AppState } from '../../+state';
import { RoutePath } from '../../shared/route-strategies';
import { MyBenefitsService } from '../../shared/services/my-benefits/my-benefits.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LinkingOnlineNoticesStrategy } from '../../shared/route-strategies/my-benefits/linking-online-notices';
import { MyBenefitsStoreService } from '../../+state/store-service/my-benefits-store.service';
@Component({
    selector: 'compass-ui-my-benefits',
    templateUrl: './linking-online-notices.component.html',
    styleUrls: ['./linking-online-notices.component.scss'],
    providers: [LinkingOnlineNoticesStrategy],
    changeDetection: ChangeDetectionStrategy.OnPush


})
export class LinkingOnlineNoticesComponent implements OnInit {
    linkonlineNoticesGroup: FormGroup | any; 

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
    myBenefitsData: any;
    mycaseInformation: any;
    backTobenefits = RoutePath.DASHBOARD
    showEmailCards= false
    isPaperless=""
    selectedOption:any;
    // myBenefitsInformation = myBenefitsData.
    counties!: Observable<any[]>;
    constructor(private route: Router, private service: MyBenefitsStoreService, private store: Store<AppState>, private fb: FormBuilder, private cd: ChangeDetectorRef, private myBenefitsService: MyBenefitsService) { }


 

    ngOnInit() {
        this.linkonlineNoticesGroup = this.fb.group({
            isPaperless: ['', Validators.required],
            emailAddress:[''],
            confirmEmailAddress:['']
        })
        // this.linkonlineNoticesGroup.get("yes").value.subscribe((selectedValue: string) => {
        //     this.selectedOption = selectedValue
        //     console.log(this.selectedOption, " this.selectedOption")
        // });
    }
    showEmailFields(value: any){
        console.log(value,"value")
        this.showEmailCards= true;
        this.isPaperless = "Y";
        this.linkonlineNoticesGroup.get("emailAddress").setValidators(Validators.required);
        this.linkonlineNoticesGroup.get("confirmEmailAddress").setValidators(Validators.required);
    }
    noRadio(value: any){
        console.log(value, "value")
        this.isPaperless = "N";
        this.showEmailCards = false;

        this.linkonlineNoticesGroup.get("emailAddress").clearValidators();
        this.linkonlineNoticesGroup.get("confirmEmailAddress").clearValidators();
    }
    isFieldValid(field: string): boolean {
        return (
            this.linkonlineNoticesGroup.get(field)?.status !== "VALID" &&
            this.linkonlineNoticesGroup.get(field)?.touched
        );
    }
    
    back(){
        this.route.navigate([RoutePath.LINK_CASE_SELECTION]);

    }

    next() {
        this.linkonlineNoticesGroup.markAllAsTouched(); 
        const updateDetails = {
            isPaperless: this.isPaperless,
            emailAddress: this.linkonlineNoticesGroup.get("emailAddress").value,
            confirmEmailAddress: this.linkonlineNoticesGroup.get("confirmEmailAddress").value
        }
        // if (this.linkonlineNoticesGroup.valid) {
            this.service.updateMyBenefits(updateDetails);

            this.route.navigate([RoutePath.LINKING_TERMS_CONDITIONS]);
        // }

    }


}

