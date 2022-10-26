import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItemState } from '../../../shared/menu-item-state';
import { RoutePath } from "../../../shared/route-strategies";
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { TokenService } from '../../../shared/services/authentication/token-service';

@Component({
    selector: "compass-ui-existing-account",
    templateUrl: "./existing-account.component.html",
    styleUrls: ["./existing-account.component.scss"],
})
export class ExistingAccountComponent implements OnInit {
 
    existingAccount: FormGroup | any
    existingAccountGroup: FormGroup = this.fb.group({});
    applynow = RoutePath.APPLYNOW;
    tokenDetectionHandler:any;
    proceedFurther = RoutePath.APPLYNOW_GETTINGSTARTED_FAMILYSAFETY;

    constructor(
      private fb: FormBuilder,
      private route: Router,
      private service: ApplyNowStoreService,
      private tokenService: TokenService
    ) { }

    //show the username and password card
    showCard: boolean = false;
    showUserNameCard() {
        this.showCard = false;
    }
    //hide the username and password card
    hideUserNameCard() {
        this.showCard = true;
    }

    @Output() formState = new EventEmitter<MenuItemState>();

    ngOnInit() {
        this.formState.emit(MenuItemState.INPROGRESS);
        this.existingAccount = this.fb.group({
            gender: ['', Validators.required],
        });
    }
    
    ngOnDestroy(): void {
        //  this.formState.emit(MenuItemState.COMPLETED);
    }

    goTonext() {
        this.route.navigate([
            RoutePath.APPLYNOW +
            "/" +
            RoutePath.APPLYNOW_GETTINGSTARTED_FAMILYSAFETY,
        ]);
    }

    nextRoute(): void {
        // Custom logic here
        this.existingAccount.markAllAsTouched();
        if (this.existingAccount.valid) {
            this.route.navigate([
                RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_GETTINGSTARTED_FAMILYSAFETY,
            ]);
        }
    }

    getModal() {
      this.showCard = false;

      // Is the intent here to logout the user?  If so, logout needs
      // to be called on the OIDC client for revocation.
      // this.tokenService.removeToken();
      // this.tokenService.removeRefreshToken();
      // this.tokenService.removeUserInfo();
    }

    isFieldValid(field: string): boolean {

        // return (this.contactInformationForm.get(field).status !== 'VALID' && (this.contactInformationForm.get(field).dirty || this.contactInformationForm.get(field).touched))

        return (
            this.existingAccount.get(field)?.status !== "VALID" &&
            this.existingAccount.get(field)?.touched
        );
    }

    previousRoute(): void {
        // Custom logic here
        let userType = this.service.getproviderInfoFromState.gettingStarted?.userType
        if (userType == 'elseSome') {
            this.route.navigate([
                RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_GETTINGSTARTED_SOMEONEELSE,
            ]);
        }
        else {
            this.route.navigate([
                RoutePath.APPLYNOW +
                "/" +
                RoutePath.APPLYNOW_GETTINGSTARTED_GATEPOST,
            ]);
        }
    }
}
