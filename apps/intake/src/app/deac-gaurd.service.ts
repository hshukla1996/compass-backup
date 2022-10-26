import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Store } from '@ngrx/store';
import {State} from "./+state/app.state";
import { MenuData, MenuItem } from '@compass-ui/data';
import {initialState} from "./apply-now/+state/apply-now.models";
import * as menu from "./apply-now/menu";
import {ApplyNowPageActions} from "./apply-now/+state/actions";
import {ReferralsPageActions} from "./referrals/+state/actions";
import {DoIQualifyPageActions} from "./do-i-qualify/+state/actions";
export interface CanComponentDeactivate {
  confirm(): boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DeacGuardService implements CanDeactivate<CanComponentDeactivate>{

  canDeactivate(component: CanComponentDeactivate): boolean| any{
    if(component && !component.confirm()) {
      if (confirm('You have unsaved changes! If you leave, your changes will be lost.')) {
       const appInitState =  {...initialState}
        appInitState.menu = menu.menuData;

        const storageValue = sessionStorage.getItem("state");

        if (storageValue) {

          const storedObj = JSON.parse(storageValue)
          if (storedObj.currentState === 'ApplyNow') {
            sessionStorage.removeItem("state");
            this.store.dispatch(
              ApplyNowPageActions.clearApplyNow()
            );
          }
          else  if (storedObj.currentState === 'Referral') {
           
            setTimeout(()=>{
               sessionStorage.removeItem("state");
              this.store.dispatch(ReferralsPageActions.clearReferrals());
            },500)
            
          }
          else if (storedObj.currentState === 'DoIQualify') {
            sessionStorage.removeItem("state");
            this.store.dispatch(
              DoIQualifyPageActions.clearDoIQualify()
            );
          }

        }

        return true;
      } else {
        return false;
      }
    }
  }

  constructor(
    private store: Store<State>,
  ) { }
}
