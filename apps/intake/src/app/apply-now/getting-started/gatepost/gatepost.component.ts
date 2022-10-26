import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItemState } from '../../../shared/menu-item-state';
import { Router } from "@angular/router";
import { RoutePath } from "../../../shared/route-strategies";
import {
    FormGroup,
    FormControl,
    ReactiveFormsModule,
    FormBuilder,
    Validators,
    AbstractControl,
} from "@angular/forms";
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { GettingStarted } from '../../+state/apply-now.models';
import { state } from '@angular/animations';
import { Subscription } from 'rxjs';
@Component({
    selector: "compass-ui-gatepost",
    templateUrl: "./gatepost.component.html",
    styleUrls: ["./gatepost.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GatepostComponent implements OnInit {
    gettingStartedGatepostForm: FormGroup | any;
    displayError: boolean = false;
    state!: GettingStarted
    stateSub!: Subscription

    constructor(private route: Router, public fb: FormBuilder, private router: Router, private service: ApplyNowStoreService) {}

    @Output() formState = new EventEmitter<MenuItemState>();

    ngOnInit(): void {
        this.gettingStartedGatepostForm = this.fb.group({
            flexRadioDefault: new FormControl("", Validators.required),
        });
        this.formState.emit(MenuItemState.INPROGRESS);
        this.state = this.service.getproviderInfoFromState.gettingStarted!;
        if (!!this.state) {
            this.gettingStartedGatepostForm.get("flexRadioDefault")?.patchValue(this.state.userType ?? "")
        switch(this.state.userType) {
            case "FamMem": document.getElementById("familyMemberRadio")?.parentElement?.classList.add("checked"); break;
            case "elseSome": document.getElementById("householdRadio")?.parentElement?.classList.add("checked"); break;
            case "NonMediAssis": document.getElementById("enrolledRadio")?.parentElement?.classList.add("checked"); break;
            case "CommuOrg": document.getElementById("organizationRadio")?.parentElement?.classList.add("checked"); break;
        }
        }
    }
    ngOnDestroy(): void {
        //  this.formState.emit(MenuItemState.COMPLETED);
    }
    checkedClass(e: Event): void {
        const checkbox = e.target as HTMLInputElement | null;
        document.querySelectorAll("input[formControlName='flexRadioDefault']").forEach(element => {
            element.parentElement?.classList.remove("checked")
        })
        checkbox?.parentElement?.classList.add("checked");
    }
    onWindowScroll() {
        const scrollOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        if (scrollOffset >= 500) {
        document.querySelectorAll('.btn-chatbot').forEach((c) => {
            c.classList.add('scrolled');
        });
        } else {
        document.querySelectorAll('.btn-chatbot').forEach((c) => {
            c.classList.remove('scrolled');
        });
        }
    }
    previous(): void {
        this.route.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_GETTINGSTARTED_IMPORTANTINFORMATION,
        ]);
    }

    submit(): void {
        // save data
        let updatedGettingStarted: GettingStarted = {
            ...this.state,
            userType: this.gettingStartedGatepostForm.controls["flexRadioDefault"].value
        }
        this.service.updateMAProviderInfo(updatedGettingStarted)

        if (this.gettingStartedGatepostForm.controls.flexRadioDefault.value == "FamMem") {
           // alert("Inside the true condition");
            this.route.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_GETTINGSTARTED_EXISTINGACCOUNT,
            ]);
            //return true;
        } 
        else if(this.gettingStartedGatepostForm.controls.flexRadioDefault.value == "elseSome"){
            this.route.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_GETTINGSTARTED_SOMEONEELSE,
            ]);
        }
        else if(this.gettingStartedGatepostForm.controls.flexRadioDefault.value == "NonMediAssis"){
            this.route.navigate([
                RoutePath.APPLYNOW +
                    "/" +
                    RoutePath.APPLYNOW_GETTINGSTARTED_NONMEDICALASSIS,
            ]);
        } else if (this.gettingStartedGatepostForm.controls.flexRadioDefault.value == "CommuOrg") {
            this.route.navigate([
                RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_GETTINGSTARTED_COMMUNITYORGANIZATION,
            ]);
        }
        else {
            this.displayError = true;
            //return false;
            //alert(this.gettingStartedGatepostForm.value);
            //alert("submit else part");
        }
    }
    /*
    submit(): void {
        this.route.navigate([
            RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_GETTINGSTARTED_EXISTINGACCOUNT,
        ]);
    }
    */
    navToreferral(){
        this.router.navigate([RoutePath.REFERRALS]);

    }
}
