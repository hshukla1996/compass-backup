import { Injectable, } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuData } from '@compass-ui/data';
import * as menu from './menu';
import { MenuItemState } from '../shared/menu-item-state';
import { RoutePath } from '../shared/route-strategies';
import { UtilService } from '../shared/services/util.service';
import { Store } from '@ngrx/store';
import { State } from '../+state';
import { ReferralsPageActions } from './+state/actions';
import { BehaviorSubject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { IReferralsState } from './+state/referrals.models';
import { getReferrals } from './+state/referrals.selectors';
import { IIndividual, IServicesSelected } from './+state/household-details-model';
import { IHousehold } from './+state/contact-information-model';
import { Utility } from '../shared/utilities/Utility';
@Injectable({
    providedIn: 'root',
})
export class ReferralStoreService {
    routePath: typeof RoutePath = RoutePath;
    referrals!: IReferralsState;
    referrals$!: Observable<IReferralsState | null>;
    data: any;
    menuData: MenuData = menu.menuData;
    static submitEvent = new BehaviorSubject<string>("");
    submitEvent$ = ReferralStoreService.submitEvent.asObservable();

    constructor(
        private store: Store<State>,
        private utilService: UtilService,
    ) {
        this.referrals$ = this.store.select(getReferrals);
        this.store.select(getReferrals).subscribe(d => {
            this.referrals = { ...d };
        });
    }

    updateHouseholdDetails(updatedHouseholdDetails: IIndividual[]) {
        this.store.dispatch(ReferralsPageActions.storeHouseholdDetails({ householdDetails: updatedHouseholdDetails }))
    }
    //main
    updatedHousehold(updatedHouseholdDetails: IIndividual) {
        this.store.dispatch(ReferralsPageActions.storeHouseHoldDetails({ household: updatedHouseholdDetails }))

    }
    updateIndividualDetails(updatedIndividualDetails: IIndividual[]) {
        this.store.dispatch(ReferralsPageActions.storeIndividuals({ individuals: updatedIndividualDetails }))

    }
    updateServicesSelected(servicesSelected: IServicesSelected[]) {
        this.store.dispatch(ReferralsPageActions.storeServicesSelected({ services: servicesSelected }))

    }
    get getServicesSelected() {
        return this.referrals.servicesselected;
    }
    get getIndividuals() {
        return this.referrals.individuals ?? [];
    }

    get getReferralState() {
        return this.referrals;
    }
    get getHousehold() {
        return this.referrals.household ?? [];
    }
    updatePageAction(updatedpageAction: any) {
        //  const updatedPageAction = { ...this.referrals.pageAction, pageAction } ;
        // console.log("updatedPageAction")
        // console.log(updatedPageAction)

        this.store.dispatch(ReferralsPageActions.updatePageAction({ pageAction: updatedpageAction }))
    }
    clearStore() {
        this.store.dispatch(ReferralsPageActions.clearReferrals())
    }
    //main
    updateHouseholdContact(updateHouseholdContact: IHousehold) {
        console.log(updateHouseholdContact, "updateHouseholdContact");
        this.store.dispatch(ReferralsPageActions.storeHouseholdContact({ householdContact: updateHouseholdContact }))
    }
    getAppData() {
        return this.store.select(getReferrals)
    }
    getCurrentIsInterventionMap() {
        return this.referrals.pageAction?.currentServicesMap ?? {};
    }
    get getPageAction() {
        return this.referrals.pageAction;
    }

    // updateIndividualDetails(updatedIndividualDetails: IIndividualDetails) {
    //     this.store.dispatch(ReferralsPageActions.storeIndividualDetails({ individualDetails: updatedIndividualDetails }))
    // }
    getDisabledMenuForNav(
        menu: MenuData,

    ): MenuData {
        let newMenuItems = menu.menuItems.map((i) => {
            const newMenuItem = { ...i }

            newMenuItem.link = "";
            newMenuItem.status = "Not Started";
            newMenuItem.class = "completed";
            return newMenuItem
        });

        return { ...menu, menuItems: newMenuItems };
    }

    getUpdatedMenuForNav(
        menu: MenuData,
        item: string,
    ): MenuData {
        let newMenuItems = menu.menuItems.map((i) => {
            const newMenuItem = { ...i }
            if (i.text === 'Household Details') {
                newMenuItem.link = item;
            }
            return newMenuItem
        });

        return { ...menu, menuItems: newMenuItems };
    }

    menuStateDisabled() {
        const menu = Utility.getDisabledMenuForNav(this.referrals.menu as MenuData); 

        // const menu = this.getDisabledMenuForNav(this.referrals.menu as MenuData);
        const updatedReferral = { ...this.referrals, menu } as IReferralsState;
        this.store.dispatch(ReferralsPageActions.updateMenuState({ referrals: updatedReferral }))
    }
    menuStateUpdated(sender: string) {
        const menu = this.getUpdatedMenuForNav(this.referrals.menu as MenuData, sender);
        const updatedReferral = { ...this.referrals, menu } as IReferralsState;
        this.store.dispatch(ReferralsPageActions.updateMenuState({ referrals: updatedReferral }))
    }


    formStateUpdated(sender: RoutePath, state: MenuItemState) {
        const menu = this.utilService.getUpdatedMenu(this.referrals.menu as MenuData, sender, state);
        const updatedReferral = { ...this.referrals, menu } as IReferralsState;
        this.store.dispatch(ReferralsPageActions.updateMenuState({ referrals: updatedReferral }))
    }
    setFormSubmitEvent(path: string) {
        ReferralStoreService.submitEvent.next(path)

    }
    validateAllFormFields(formGroup: FormGroup): boolean {
        let validForm = true;
        Object.keys(formGroup.controls).forEach(field => {  //{2}
            const control = formGroup.get(field);             //{3}
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
                if (control.status !== 'VALID') {
                    validForm = false;
                }

            } else if (control instanceof FormGroup) {        //{5}
                this.validateAllFormFields(control);            //{6}
            }
        });
        return validForm;
    }


}
